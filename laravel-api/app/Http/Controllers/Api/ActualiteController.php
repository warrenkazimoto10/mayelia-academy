<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actualite;
use App\Models\ActualiteParagraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ActualiteController extends Controller
{
    /** Liste publique : actualités publiées uniquement. */
    public function index()
    {
        $items = Actualite::with('paragraphs')
            ->where('published', true)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Actualite $a) => $this->serialize($a));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    /** Détail public : 404 si brouillon. */
    public function show(string $id)
    {
        $a = Actualite::with('paragraphs')->find($id);
        if (! $a) {
            return response()->json(['success' => false, 'error' => 'Actualité non trouvée'], 404);
        }
        if (! $a->published) {
            return response()->json(['success' => false, 'error' => 'Actualité non trouvée'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($a),
        ]);
    }

    /** Admin : toutes les actualités (brouillons inclus). */
    public function indexAdmin()
    {
        $items = Actualite::with('paragraphs')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Actualite $a) => $this->serialize($a));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    /** Admin : détail y compris brouillon. */
    public function showAdmin(string $id)
    {
        $a = Actualite::with('paragraphs')->find($id);
        if (! $a) {
            return response()->json(['success' => false, 'error' => 'Actualité non trouvée'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($a),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedPayload($request);

        $actualite = DB::transaction(function () use ($data) {
            $a = Actualite::create([
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'category' => $data['category'],
                'date' => $data['date'],
                'read_time' => $data['readTime'],
                'category_color' => $data['categoryColor'],
                'hero_image' => $data['heroImage'] ?? '',
                'published' => $data['published'] ?? false,
            ]);
            $this->syncParagraphs($a, $data['content']['paragraphs'] ?? []);

            return $a->fresh('paragraphs');
        });

        return response()->json([
            'success' => true,
            'data' => $this->serialize($actualite),
            'message' => 'Actualité créée avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $a = Actualite::find($id);
        if (! $a) {
            return response()->json(['success' => false, 'error' => 'Actualité non trouvée'], 404);
        }

        $data = $this->validatedPayload($request);

        $actualite = DB::transaction(function () use ($a, $data) {
            $a->update([
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'category' => $data['category'],
                'date' => $data['date'],
                'read_time' => $data['readTime'],
                'category_color' => $data['categoryColor'],
                'hero_image' => $data['heroImage'] ?? '',
                'published' => $data['published'] ?? false,
            ]);
            $a->paragraphs()->delete();
            $this->syncParagraphs($a, $data['content']['paragraphs'] ?? []);

            return $a->fresh('paragraphs');
        });

        return response()->json([
            'success' => true,
            'data' => $this->serialize($actualite),
            'message' => 'Actualité mise à jour avec succès',
        ]);
    }

    public function destroy(string $id)
    {
        $a = Actualite::find($id);
        if (! $a) {
            return response()->json(['success' => false, 'error' => 'Actualité non trouvée'], 404);
        }
        $a->delete();

        return response()->json([
            'success' => true,
            'message' => 'Actualité supprimée avec succès',
        ]);
    }

    private function validatedPayload(Request $request): array
    {
        $validated = $request->validate([
            'title' => 'required|string|max:500',
            'excerpt' => 'required|string',
            'category' => 'required|string|max:100',
            'date' => 'required|string|max:50',
            'readTime' => 'required|string|max:20',
            'categoryColor' => 'required|string|max:100',
            'heroImage' => 'nullable|string|max:500',
            'content' => 'required|array',
            'content.paragraphs' => 'present|array',
            'content.paragraphs.*.text' => 'nullable|string',
            'content.paragraphs.*.image' => 'nullable|array',
            'content.paragraphs.*.image.src' => 'nullable|string|max:500',
            'content.paragraphs.*.image.alt' => 'nullable|string|max:255',
            'content.paragraphs.*.image.caption' => 'nullable|string',
        ]);

        $validated['published'] = $request->boolean('published');

        $published = $validated['published'];
        if ($published) {
            if (strlen(trim($validated['heroImage'] ?? '')) === 0) {
                throw ValidationException::withMessages([
                    'heroImage' => ['Une image hero est requise pour publier.'],
                ]);
            }
            $paragraphs = $validated['content']['paragraphs'] ?? [];
            $hasText = false;
            foreach ($paragraphs as $para) {
                if (strlen(trim($para['text'] ?? '')) > 0) {
                    $hasText = true;
                    break;
                }
            }
            if (! $hasText) {
                throw ValidationException::withMessages([
                    'content' => ['Au moins un paragraphe avec du texte est requis pour publier.'],
                ]);
            }
        }

        return $validated;
    }

    private function syncParagraphs(Actualite $a, array $paragraphs): void
    {
        $filtered = array_values(array_filter(
            $paragraphs,
            fn (array $para) => strlen(trim($para['text'] ?? '')) > 0
        ));

        foreach ($filtered as $i => $para) {
            ActualiteParagraph::create([
                'actualite_id' => $a->id,
                'text' => $para['text'],
                'image_src' => $para['image']['src'] ?? null,
                'image_alt' => $para['image']['alt'] ?? null,
                'image_caption' => $para['image']['caption'] ?? null,
                'display_order' => $i,
            ]);
        }
    }

    private function serialize(Actualite $a): array
    {
        return [
            'id' => $a->id,
            'title' => $a->title,
            'excerpt' => $a->excerpt,
            'category' => $a->category,
            'date' => $a->date,
            'readTime' => $a->read_time,
            'categoryColor' => $a->category_color,
            'heroImage' => $a->hero_image,
            'published' => (bool) $a->published,
            'content' => [
                'paragraphs' => $a->paragraphs->map(function (ActualiteParagraph $p) {
                    $row = ['text' => $p->text];
                    if ($p->image_src) {
                        $row['image'] = [
                            'src' => $p->image_src,
                            'alt' => $p->image_alt ?? '',
                            'caption' => $p->image_caption ?? '',
                        ];
                    }

                    return $row;
                })->values()->all(),
            ],
        ];
    }
}
