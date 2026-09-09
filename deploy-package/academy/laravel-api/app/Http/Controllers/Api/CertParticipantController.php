<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CertParticipant;
use Illuminate\Http\Request;

class CertParticipantController extends Controller
{
    public function index(Request $request)
    {
        $query = CertParticipant::withCount('certificates')->orderBy('full_name');

        if ($q = trim((string) $request->query('q', ''))) {
            $query->where('full_name', 'like', '%'.$q.'%');
        }

        $items = $query->get()->map(fn (CertParticipant $p) => $this->serialize($p));

        return response()->json(['success' => true, 'data' => $items, 'count' => $items->count()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'civility' => 'required|string|max:10',
            'full_name' => 'required|string|max:255',
        ]);

        $participant = CertParticipant::create($data);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($participant),
            'message' => 'Participant créé avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $participant = CertParticipant::find($id);
        if (! $participant) {
            return response()->json(['success' => false, 'error' => 'Participant non trouvé'], 404);
        }

        $data = $request->validate([
            'civility' => 'required|string|max:10',
            'full_name' => 'required|string|max:255',
        ]);

        $participant->update($data);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($participant),
            'message' => 'Participant mis à jour avec succès',
        ]);
    }

    public function destroy(string $id)
    {
        $participant = CertParticipant::find($id);
        if (! $participant) {
            return response()->json(['success' => false, 'error' => 'Participant non trouvé'], 404);
        }
        $participant->delete();

        return response()->json(['success' => true, 'message' => 'Participant supprimé avec succès']);
    }

    private function serialize(CertParticipant $p): array
    {
        return [
            'id' => $p->id,
            'civility' => $p->civility,
            'full_name' => $p->full_name,
            'certificates_count' => $p->certificates_count ?? $p->certificates()->count(),
        ];
    }
}
