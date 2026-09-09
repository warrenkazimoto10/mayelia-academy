<?php

namespace Database\Seeders;

use App\Models\FormationDomaine;
use App\Models\FormationProgramme;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

/**
 * Importe les domaines de formation et leurs programmes depuis
 * database/data/mayelia-formations.json (copie de src/data/mayelia-formations.json).
 *
 * Source front : formationsSeedExport.ts / mayelia-formations.json
 * (5 domaines, 21 programmes au total).
 */
class FormationSeeder extends Seeder
{
    public function run(): void
    {
        $path = $this->resolveFormationsJsonPath();

        if ($path === null) {
            $this->command?->error(
                'Fichier mayelia-formations.json introuvable. '.
                'Placez-le dans database/data/ ou src/data/ (racine du front).'
            );

            return;
        }

        $payload = json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);
        $domaines = $payload['domaines'] ?? [];

        if ($domaines === []) {
            $this->command?->warn('Aucun domaine dans le JSON — rien à importer.');

            return;
        }

        Schema::disableForeignKeyConstraints();
        FormationProgramme::query()->delete();
        FormationDomaine::query()->delete();
        Schema::enableForeignKeyConstraints();

        DB::transaction(function () use ($domaines) {
            foreach ($domaines as $sortD => $d) {
                $dom = FormationDomaine::create([
                    'slug' => $d['id'],
                    'title' => $d['title'],
                    'icon_key' => $d['iconKey'] ?? 'truck',
                    'color_tailwind' => $d['color'],
                    'gradient_tailwind' => $d['gradient'],
                    'image_url' => $d['image'],
                    'sort_order' => $sortD,
                ]);

                foreach ($d['formations'] ?? [] as $sortP => $f) {
                    FormationProgramme::create([
                        'domaine_id' => $dom->id,
                        'title' => $f['title'],
                        'description' => $f['description'],
                        'contenus_json' => $f['contenus'] ?? [],
                        'objectifs_json' => $f['objectifs'] ?? [],
                        'sort_order' => $sortP,
                    ]);
                }
            }
        });

        $domainCount = FormationDomaine::count();
        $programmeCount = FormationProgramme::count();

        $this->command?->info(sprintf(
            'Formations importées : %d domaine(s), %d programme(s) (source: %s).',
            $domainCount,
            $programmeCount,
            $path
        ));
    }

    private function resolveFormationsJsonPath(): ?string
    {
        $candidates = [
            database_path('data/mayelia-formations.json'),
            base_path('../src/data/mayelia-formations.json'),
        ];

        foreach ($candidates as $path) {
            if (File::isReadable($path)) {
                return $path;
            }
        }

        return null;
    }
}
