<?php

namespace Database\Seeders;

use App\Models\Actualite;
use App\Models\ActualiteParagraph;
use App\Models\Conseil;
use App\Models\ConseilParagraph;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class MayeliaContentSeeder extends Seeder
{
    public function run(): void
    {
        $contentPath = base_path('../src/data/mayelia-academy-content.json');

        if (! File::isReadable($contentPath)) {
            $this->command?->error('Fichier introuvable : '.$contentPath);

            return;
        }

        $payload = json_decode(File::get($contentPath), true, 512, JSON_THROW_ON_ERROR);

        Schema::disableForeignKeyConstraints();

        DB::table('conseil_paragraphs')->delete();
        DB::table('conseils')->delete();
        DB::table('actualite_paragraphs')->delete();
        DB::table('actualites')->delete();

        Schema::enableForeignKeyConstraints();

        DB::transaction(function () use ($payload) {
            foreach ($payload['actualites'] ?? [] as $item) {
                $a = Actualite::create([
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'category' => $item['category'],
                    'date' => $item['date'],
                    'read_time' => $item['readTime'],
                    'category_color' => $item['categoryColor'],
                    'hero_image' => $item['heroImage'],
                    'published' => true,
                ]);

                foreach ($item['content']['paragraphs'] ?? [] as $i => $para) {
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

            foreach ($payload['conseils'] ?? [] as $item) {
                $c = Conseil::create([
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'date' => $item['date'],
                    'read_time' => $item['readTime'],
                    'image' => $item['image'] ?? null,
                    'content' => null,
                    'published' => true,
                ]);

                foreach ($item['content']['paragraphs'] ?? [] as $i => $para) {
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
        });

        $this->command?->info('Contenu Mayelia importé (actualités, conseils).');
    }
}
