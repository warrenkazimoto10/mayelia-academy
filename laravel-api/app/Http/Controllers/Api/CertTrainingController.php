<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CertTraining;
use Illuminate\Http\Request;

class CertTrainingController extends Controller
{
    public function index()
    {
        $items = CertTraining::withCount('certificates')
            ->orderByDesc('start_date')
            ->get()
            ->map(fn (CertTraining $t) => $this->serialize($t));

        return response()->json(['success' => true, 'data' => $items, 'count' => $items->count()]);
    }

    public function show(string $id)
    {
        $training = CertTraining::with(['certificates.participant'])->find($id);
        if (! $training) {
            return response()->json(['success' => false, 'error' => 'Formation non trouvée'], 404);
        }

        $data = $this->serialize($training);
        $data['certificates'] = $training->certificates->map(fn ($c) => [
            'id' => $c->id,
            'ref' => $c->ref,
            'validated' => (bool) $c->validated,
            'show_signature' => (bool) $c->show_signature,
            'note' => $c->note !== null ? (string) $c->note : null,
            'participant' => [
                'id' => $c->participant->id,
                'civility' => $c->participant->civility,
                'full_name' => $c->participant->full_name,
            ],
        ])->values()->all();

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedPayload($request);
        $training = CertTraining::create($data);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($training),
            'message' => 'Formation créée avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $training = CertTraining::find($id);
        if (! $training) {
            return response()->json(['success' => false, 'error' => 'Formation non trouvée'], 404);
        }

        $training->update($this->validatedPayload($request));

        return response()->json([
            'success' => true,
            'data' => $this->serialize($training),
            'message' => 'Formation mise à jour avec succès',
        ]);
    }

    public function destroy(string $id)
    {
        $training = CertTraining::find($id);
        if (! $training) {
            return response()->json(['success' => false, 'error' => 'Formation non trouvée'], 404);
        }
        $training->delete();

        return response()->json(['success' => true, 'message' => 'Formation supprimée avec succès']);
    }

    private function validatedPayload(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:500',
            'client' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'training_place' => 'nullable|string|max:255',
            'issue_place' => 'required|string|max:255',
            'issue_date' => 'required|date',
        ]);
    }

    private function serialize(CertTraining $t): array
    {
        return [
            'id' => $t->id,
            'title' => $t->title,
            'client' => $t->client,
            'start_date' => $t->start_date->toDateString(),
            'end_date' => $t->end_date->toDateString(),
            'training_place' => $t->training_place,
            'issue_place' => $t->issue_place,
            'issue_date' => $t->issue_date->toDateString(),
            'certificates_count' => $t->certificates_count ?? $t->certificates()->count(),
        ];
    }
}
