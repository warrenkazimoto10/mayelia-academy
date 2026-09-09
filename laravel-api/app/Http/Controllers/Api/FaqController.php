<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index()
    {
        $items = Faq::where('published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Faq $f) => $this->serialize($f));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function indexAdmin()
    {
        $items = Faq::orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Faq $f) => $this->serialize($f));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function show(string $id)
    {
        $f = Faq::find($id);
        if (! $f || ! $f->published) {
            return response()->json(['success' => false, 'error' => 'FAQ non trouvée'], 404);
        }

        return response()->json(['success' => true, 'data' => $this->serialize($f)]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string|max:1000',
            'answer' => 'required|string',
            'sort_order' => 'nullable|integer|min:0',
            'published' => 'nullable|boolean',
        ]);

        $faq = Faq::create([
            'question' => $data['question'],
            'answer' => $data['answer'],
            'sort_order' => $data['sort_order'] ?? 0,
            'published' => $request->boolean('published', true),
        ]);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($faq),
            'message' => 'FAQ créée avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $f = Faq::find($id);
        if (! $f) {
            return response()->json(['success' => false, 'error' => 'FAQ non trouvée'], 404);
        }

        $data = $request->validate([
            'question' => 'required|string|max:1000',
            'answer' => 'required|string',
            'sort_order' => 'nullable|integer|min:0',
            'published' => 'nullable|boolean',
        ]);

        $f->update([
            'question' => $data['question'],
            'answer' => $data['answer'],
            'sort_order' => $data['sort_order'] ?? $f->sort_order,
            'published' => $request->boolean('published', $f->published),
        ]);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($f->fresh()),
            'message' => 'FAQ mise à jour avec succès',
        ]);
    }

    public function destroy(string $id)
    {
        $f = Faq::find($id);
        if (! $f) {
            return response()->json(['success' => false, 'error' => 'FAQ non trouvée'], 404);
        }
        $f->delete();

        return response()->json(['success' => true, 'message' => 'FAQ supprimée avec succès']);
    }

    /** Réordonner en masse : reçoit un tableau [{id, sort_order}] */
    public function reorder(Request $request)
    {
        $items = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.sort_order' => 'required|integer|min:0',
        ])['items'];

        foreach ($items as $item) {
            Faq::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['success' => true, 'message' => 'Ordre mis à jour']);
    }

    private function serialize(Faq $f): array
    {
        return [
            'id' => $f->id,
            'question' => $f->question,
            'answer' => $f->answer,
            'sort_order' => $f->sort_order,
            'published' => (bool) $f->published,
        ];
    }
}
