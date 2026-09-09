<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CertTraining;
use App\Models\Certificate;
use App\Services\Certificates\CertificatePdfBuilder;
use App\Services\Certificates\AttestationPdfBuilder;
use App\Services\Certificates\FrenchDate;
use App\Services\Certificates\RefGenerator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use ZipArchive;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $query = Certificate::with(['participant', 'training'])->orderByDesc('created_at');

        if ($trainingId = $request->query('training_id')) {
            $query->where('cert_training_id', $trainingId);
        }
        if ($participantId = $request->query('participant_id')) {
            $query->where('cert_participant_id', $participantId);
        }

        $items = $query->get()->map(fn (Certificate $c) => $this->serialize($c));

        return response()->json(['success' => true, 'data' => $items, 'count' => $items->count()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'cert_participant_id' => 'required|integer|exists:cert_participants,id',
            'cert_training_id' => 'required|integer|exists:cert_trainings,id',
        ]);

        $certificate = $this->createOrGetExisting($data['cert_participant_id'], $data['cert_training_id']);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($certificate),
            'message' => 'Certificat généré avec succès',
        ], 201);
    }

    public function bulkStore(Request $request)
    {
        $data = $request->validate([
            'cert_training_id' => 'required|integer|exists:cert_trainings,id',
            'participant_ids' => 'required|array|min:1',
            'participant_ids.*' => 'integer|exists:cert_participants,id',
        ]);

        $results = [];
        foreach ($data['participant_ids'] as $participantId) {
            try {
                $certificate = $this->createOrGetExisting($participantId, $data['cert_training_id']);
                $results[] = ['participant_id' => $participantId, 'certificate' => $this->serialize($certificate)];
            } catch (\Throwable $e) {
                $results[] = ['participant_id' => $participantId, 'error' => $e->getMessage()];
            }
        }

        return response()->json(['success' => true, 'data' => $results]);
    }

    public function destroy(string $id)
    {
        $certificate = Certificate::find($id);
        if (! $certificate) {
            return response()->json(['success' => false, 'error' => 'Certificat non trouvé'], 404);
        }
        $certificate->delete();

        return response()->json(['success' => true, 'message' => 'Certificat supprimé avec succès']);
    }

    /**
     * Valide ou invalide la réussite d'un participant pour sa formation.
     * La génération de la référence (et donc du PDF) n'a lieu qu'à la validation.
     */
    public function setValidated(Request $request, string $id)
    {
        $certificate = Certificate::with('training')->find($id);
        if (! $certificate) {
            return response()->json(['success' => false, 'error' => 'Certificat non trouvé'], 404);
        }

        $data = $request->validate([
            'validated' => 'required|boolean'
        ]);

        $validated = $data['validated'];

        if ($validated) {
            if (! $certificate->ref) {
                $certificate->ref = app(RefGenerator::class)->generate($certificate->training->issue_date->year);
            }
            $certificate->validated = true;
        } else {
            $certificate->validated = false;
            $certificate->ref = null;
        }
        $certificate->save();

        return response()->json([
            'success' => true,
            'data' => $this->serialize($certificate->refresh()->load('participant', 'training')),
            'message' => $validated ? 'Participant validé, certificat généré' : 'Validation retirée',
        ]);
    }

    /** Téléchargement PDF par ID numérique — réservé admin. */
    public function pdf(string $id, CertificatePdfBuilder $builder): Response
    {
        $certificate = Certificate::find($id);
        if (! $certificate) {
            abort(404, 'Certificat non trouvé');
        }
        if (! $certificate->validated || ! $certificate->ref) {
            abort(422, "Ce participant n'est pas encore validé — le certificat ne peut pas être généré.");
        }

        $pdf = $builder->build($certificate);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="certificat-'.$certificate->ref.'.pdf"',
        ]);
    }

    /** Téléchargement PDF de l'attestation par ID numérique — réservé admin. */
    public function attestation(string $id, AttestationPdfBuilder $builder): Response
    {
        $certificate = Certificate::find($id);
        if (! $certificate) {
            abort(404, 'Certificat non trouvé');
        }

        $pdf = $builder->build($certificate);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="attestation-'.$certificate->id.'.pdf"',
        ]);
    }

    /** ZIP de tous les certificats d'une formation — réservé admin. */
    public function zip(string $trainingId, CertificatePdfBuilder $certBuilder, AttestationPdfBuilder $attBuilder): BinaryFileResponse
    {
        $training = CertTraining::with('certificates.participant')->find($trainingId);
        if (! $training) {
            abort(404, 'Formation non trouvée');
        }

        $tmpPath = tempnam(sys_get_temp_dir(), 'certs_');
        $zip = new ZipArchive();
        $zip->open($tmpPath, ZipArchive::OVERWRITE);

        foreach ($training->certificates as $certificate) {
            $safeName = preg_replace('/[^A-Za-z0-9_-]+/', '_', $certificate->participant->full_name);

            // Attestation (always generated)
            $attPdfBytes = $attBuilder->build($certificate);
            $zip->addFromString("Attestation_{$safeName}_{$certificate->id}.pdf", $attPdfBytes);

            // Certificate (only if validated)
            if ($certificate->validated && $certificate->ref) {
                $certPdfBytes = $certBuilder->build($certificate);
                $zip->addFromString("Certificat_{$safeName}_{$certificate->ref}.pdf", $certPdfBytes);
            }
        }
        $zip->close();

        $zipName = 'certificats_'.preg_replace('/[^A-Za-z0-9_-]+/', '_', $training->title).'.zip';

        return response()->download($tmpPath, $zipName, ['Content-Type' => 'application/zip'])->deleteFileAfterSend(true);
    }

    /** Vérification publique par référence — pas d'auth (c'est le but du QR code). */
    public function verify(string $ref)
    {
        $certificate = Certificate::with(['participant', 'training'])
            ->where('ref', $ref)->where('validated', true)->first();
        if (! $certificate) {
            return response()->json(['success' => false, 'error' => 'Certificat non trouvé'], 404);
        }

        return response()->json(['success' => true, 'data' => $this->serialize($certificate)]);
    }

    /** Téléchargement PDF public par référence — pas d'auth. */
    public function verifyPdf(string $ref, CertificatePdfBuilder $builder): Response
    {
        $certificate = Certificate::where('ref', $ref)->where('validated', true)->first();
        if (! $certificate) {
            abort(404, 'Certificat non trouvé');
        }

        $pdf = $builder->build($certificate);

        return response($pdf, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="certificat-'.$certificate->ref.'.pdf"',
        ]);
    }

    private function createOrGetExisting(int $participantId, int $trainingId): Certificate
    {
        $existing = Certificate::where('cert_participant_id', $participantId)
            ->where('cert_training_id', $trainingId)
            ->first();
        if ($existing) {
            return $existing;
        }

        CertTraining::findOrFail($trainingId);

        // Inscription uniquement : pas de référence générée avant validation explicite.
        return Certificate::create([
            'ref' => null,
            'validated' => false,
            'cert_participant_id' => $participantId,
            'cert_training_id' => $trainingId,
        ]);
    }

    private function serialize(Certificate $c): array
    {
        return [
            'id' => $c->id,
            'ref' => $c->ref,
            'validated' => (bool) $c->validated,
            'created_at' => $c->created_at?->toIso8601String(),
            'participant' => $c->relationLoaded('participant') && $c->participant ? [
                'id' => $c->participant->id,
                'civility' => $c->participant->civility,
                'full_name' => $c->participant->full_name,
            ] : null,
            'training' => $c->relationLoaded('training') && $c->training ? [
                'id' => $c->training->id,
                'title' => $c->training->title,
                'client' => $c->training->client,
                'start_date' => $c->training->start_date->toDateString(),
                'end_date' => $c->training->end_date->toDateString(),
                'issue_place' => $c->training->issue_place,
                'issue_date' => $c->training->issue_date->toDateString(),
                'period_text' => FrenchDate::formatPeriod($c->training->start_date, $c->training->end_date),
            ] : null,
        ];
    }
}
