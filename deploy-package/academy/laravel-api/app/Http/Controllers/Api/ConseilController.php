<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conseil;
use App\Models\ConseilParagraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ConseilController extends Controller
{
    public function index()
    {
        $items = Conseil::with('paragraphs')
            ->where('published', true)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Conseil $c) => $this->serialize($c));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function show(string $id)
    {
        $c = Conseil::with('paragraphs')->find($id);
        if (! $c) {
            return response()->json(['success' => false, 'error' => 'Conseil non trouvé'], 404);
        }
        if (! $c->published) {
            return response()->json(['success' => false, 'error' => 'Conseil non trouvé'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($c),
        ]);
    }

    public function indexAdmin()
    {
        $items = Conseil::with('paragraphs')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Conseil $c) => $this->serialize($c));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function showAdmin(string $id)
    {
        $c = Conseil::with('paragraphs')->find($id);
        if (! $c) {
            return response()->json(['success' => false, 'error' => 'Conseil non trouvé'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($c),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedPayload($request);

        $conseil = DB::transaction(function () use ($data) {
            $c = Conseil::create([
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'date' => $data['date'],
                'read_time' => $data['readTime'],
                'image' => $this->normalizeImage($data['image'] ?? null),
                'content' => null,
                'published' => $data['published'] ?? false,
            ]);
            $this->syncParagraphs($c, $data['content']['paragraphs'] ?? []);

            return $c->fresh('paragraphs');
        });

        return response()->json([
            'success' => true,
            'data' => $this->serialize($conseil),
            'message' => 'Conseil créé avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $c = Conseil::find($id);
        if (! $c) {
            return response()->json(['success' => false, 'error' => 'Conseil non trouvé'], 404);
        }

        $data = $this->validatedPayload($request);

        $conseil = DB::transaction(function () use ($c, $data) {
            $c->update([
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'date' => $data['date'],
                'read_time' => $data['readTime'],
                'image' => $this->normalizeImage($data['image'] ?? null),
                'content' => null,
                'published' => $data['published'] ?? false,
            ]);
            $c->paragraphs()->delete();
            $this->syncParagraphs($c, $data['content']['paragraphs'] ?? []);

            return $c->fresh('paragraphs');
        });

        return response()->json([
            'success' => true,
            'data' => $this->serialize($conseil),
            'message' => 'Conseil mis à jour avec succès',
        ]);
    }

    public function destroy(string $id)
    {
        $c = Conseil::find($id);
        if (! $c) {
            return response()->json(['success' => false, 'error' => 'Conseil non trouvé'], 404);
        }
        $c->delete();

        return response()->json([
            'success' => true,
            'message' => 'Conseil supprimé avec succès',
        ]);
    }

    private function normalizeImage(?string $image): ?string
    {
        $t = trim((string) $image);

        return $t === '' ? null : $t;
    }

    private function validatedPayload(Request $request): array
    {
        $validated = $request->validate([
            'title' => 'required|string|max:500',
            'excerpt' => 'required|string',
            'date' => 'required|string|max:50',
            'readTime' => 'required|string|max:20',
            'image' => 'nullable|string|max:500',
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
            if (strlen(trim($validated['image'] ?? '')) === 0) {
                throw ValidationException::withMessages([
                    'image' => ['Une image de couverture est requise pour publier.'],
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

    private function syncParagraphs(Conseil $c, array $paragraphs): void
    {
        $filtered = array_values(array_filter(
            $paragraphs,
            fn (array $para) => strlen(trim($para['text'] ?? '')) > 0
        ));

        foreach ($filtered as $i => $para) {
            ConseilParagraph::create([
                'conseil_id' => $c->id,
                'text' => $para['text'],
                'image_src' => $para['image']['src'] ?? null,
                'image_alt' => $para['image']['alt'] ?? null,
                'image_caption' => $para['image']['caption'] ?? null,
                'display_order' => $i,
            ]);
        }
    }

    private function serialize(Conseil $c): array
    {
        return [
            'id' => $c->id,
            'title' => $c->title,
            'excerpt' => $c->excerpt,
            'date' => $c->date,
            'readTime' => $c->read_time,
            'image' => $c->image,
            'published' => (bool) $c->published,
            'content' => [
                'paragraphs' => $c->paragraphs->map(function (ConseilParagraph $p) {
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
