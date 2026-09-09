<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index()
    {
        $items = Partner::query()->orderBy('sort_order')->orderBy('id')->get()
            ->map(fn (Partner $p) => $this->serialize($p));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function show(string $id)
    {
        $p = Partner::find($id);
        if (! $p) {
            return response()->json(['success' => false, 'error' => 'Partenaire non trouvé'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($p),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        if (($data['sortOrder'] ?? null) === null) {
            $data['sortOrder'] = (int) ((Partner::max('sort_order') ?? -1) + 1);
        }
        $partner = Partner::create($this->toModel($data));

        return response()->json([
            'success' => true,
            'data' => $this->serialize($partner),
            'message' => 'Partenaire créé',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $p = Partner::find($id);
        if (! $p) {
            return response()->json(['success' => false, 'error' => 'Partenaire non trouvé'], 404);
        }
        $data = $this->validated($request);
        $p->update($this->toModel($data));

        return response()->json([
            'success' => true,
            'data' => $this->serialize($p->fresh()),
            'message' => 'Partenaire mis à jour',
        ]);
    }

    public function destroy(string $id)
    {
        $p = Partner::find($id);
        if (! $p) {
            return response()->json(['success' => false, 'error' => 'Partenaire non trouvé'], 404);
        }
        $p->delete();

        return response()->json([
            'success' => true,
            'message' => 'Partenaire supprimé',
        ]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'logoUrl' => 'required|string|max:800',
            'websiteUrl' => 'nullable|string|max:500',
            'sortOrder' => 'nullable|integer|min:0',
        ]);
    }

    private function toModel(array $data): array
    {
        return [
            'name' => $data['name'],
            'logo_url' => $data['logoUrl'],
            'website_url' => $data['websiteUrl'] ?? null,
            'sort_order' => (int) ($data['sortOrder'] ?? 0),
        ];
    }

    private function serialize(Partner $p): array
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'logoUrl' => $p->logo_url,
            'websiteUrl' => $p->website_url,
            'sortOrder' => $p->sort_order,
        ];
    }
}
