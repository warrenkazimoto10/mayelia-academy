<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::query()->orderBy('sort_order')->orderBy('id')->get();

        return response()->json([
            'success' => true,
            'data' => $slides->map(fn (HeroSlide $s) => $this->serialize($s))->values()->all(),
        ]);
    }

    public function replace(Request $request)
    {
        $validated = $request->validate([
            'slides' => 'present|array|max:12',
            'slides.*.imageUrl' => 'required|string|max:800',
            'slides.*.overlayOpacity' => 'nullable|integer|min:0|max:100',
            'slides.*.description' => 'required|string|max:8000',
            'slides.*.linkUrl' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($validated) {
            HeroSlide::query()->delete();
            foreach ($validated['slides'] as $i => $row) {
                HeroSlide::create([
                    'sort_order' => $i,
                    'image_url' => $row['imageUrl'],
                    'overlay_opacity' => $row['overlayOpacity'] ?? 90,
                    'description' => $row['description'],
                    'link_url' => isset($row['linkUrl']) && $row['linkUrl'] !== '' ? $row['linkUrl'] : null,
                ]);
            }
        });

        return $this->index();
    }

    private function serialize(HeroSlide $s): array
    {
        return [
            'id' => $s->id,
            'sortOrder' => (int) $s->sort_order,
            'imageUrl' => $s->image_url,
            'overlayOpacity' => (int) ($s->overlay_opacity ?? 90),
            'description' => $s->description,
            'linkUrl' => $s->link_url,
        ];
    }
}
