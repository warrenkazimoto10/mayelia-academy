<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormationDomaine;
use App\Models\FormationProgramme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormationController extends Controller
{
    public function index()
    {
        $domaines = FormationDomaine::with('programmes')->orderBy('sort_order')->orderBy('id')->get();

        $payload = [
            'domaines' => $domaines->map(function (FormationDomaine $d) {
                return [
                    'id' => $d->slug,
                    'title' => $d->title,
                    'iconKey' => $d->icon_key,
                    'color' => $d->color_tailwind,
                    'gradient' => $d->gradient_tailwind,
                    'image' => $d->image_url,
                    'formations' => $d->programmes->map(function (FormationProgramme $p) {
                        return [
                            'id' => $p->id,
                            'title' => $p->title,
                            'description' => $p->description,
                            'contenus' => $p->contenus_json ?? [],
                            'objectifs' => $p->objectifs_json ?? [],
                        ];
                    })->values()->all(),
                ];
            })->values()->all(),
        ];

        return response()->json([
            'success' => true,
            'data' => $payload,
            'count' => count($payload['domaines']),
        ]);
    }

    public function replace(Request $request)
    {
        $validated = $request->validate([
            'domaines' => 'required|array',
            'domaines.*.id' => 'required|string|max:120',
            'domaines.*.title' => 'required|string|max:500',
            'domaines.*.iconKey' => 'nullable|string|max:50',
            'domaines.*.color' => 'required|string|max:200',
            'domaines.*.gradient' => 'required|string|max:200',
            'domaines.*.image' => 'required|string|max:800',
            'domaines.*.formations' => 'present|array',
            'domaines.*.formations.*.title' => 'required|string|max:500',
            'domaines.*.formations.*.description' => 'required|string',
            'domaines.*.formations.*.contenus' => 'required|array',
            'domaines.*.formations.*.objectifs' => 'required|array',
        ]);

        DB::transaction(function () use ($validated) {
            FormationProgramme::query()->delete();
            FormationDomaine::query()->delete();

            foreach ($validated['domaines'] as $sortD => $d) {
                $dom = FormationDomaine::create([
                    'slug' => $d['id'],
                    'title' => $d['title'],
                    'icon_key' => $d['iconKey'] ?? 'truck',
                    'color_tailwind' => $d['color'],
                    'gradient_tailwind' => $d['gradient'],
                    'image_url' => $d['image'],
                    'sort_order' => $sortD,
                ]);

                foreach ($d['formations'] as $sortP => $f) {
                    FormationProgramme::create([
                        'domaine_id' => $dom->id,
                        'title' => $f['title'],
                        'description' => $f['description'],
                        'contenus_json' => $f['contenus'],
                        'objectifs_json' => $f['objectifs'],
                        'sort_order' => $sortP,
                    ]);
                }
            }
        });

        return $this->index();
    }
}
