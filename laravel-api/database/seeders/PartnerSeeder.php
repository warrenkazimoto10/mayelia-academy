<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PartnerSeeder extends Seeder
{
    /**
     * Partenaires par défaut (même contenu que l’ancien composant statique).
     */
    public function run(): void
    {
        DB::table('partners')->delete();

        $rows = [
            ['name' => 'Mayelia Automotive', 'logo_url' => 'src/assets/partenaire/LOGO-MAYELIA-AUTOMOTIVE.png', 'website_url' => null],
            ['name' => 'Mayelia Participations', 'logo_url' => 'src/assets/partenaire/LOGO-MAYELIA-PARTICIPATIONS.png', 'website_url' => null],
            ['name' => 'Cieria', 'logo_url' => 'src/assets/partenaire/cieria.png', 'website_url' => null],
            ['name' => 'Sicta', 'logo_url' => 'src/assets/partenaire/sicta.png', 'website_url' => null],
            ['name' => 'Emploi Jeune', 'logo_url' => 'src/assets/partenaire/emploi-jeune.png', 'website_url' => null],
            ['name' => 'La Tulipe', 'logo_url' => 'src/assets/partenaire/la-tulipe.png', 'website_url' => null],
            ['name' => 'LRA', 'logo_url' => 'src/assets/partenaire/lra.png', 'website_url' => null],
            ['name' => 'Neemba', 'logo_url' => 'src/assets/partenaire/neemba.png', 'website_url' => null],
            ['name' => 'SST', 'logo_url' => 'src/assets/partenaire/sst.png', 'website_url' => null],
        ];

        foreach ($rows as $i => $row) {
            Partner::create([
                'name' => $row['name'],
                'logo_url' => $row['logo_url'],
                'website_url' => $row['website_url'],
                'sort_order' => $i,
            ]);
        }
    }
}
