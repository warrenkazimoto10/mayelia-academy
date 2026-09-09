<?php

namespace Database\Seeders;

use App\Models\SiteConfig;
use Illuminate\Database\Seeder;

class SiteConfigSeeder extends Seeder
{
    public function run(): void
    {
        if (SiteConfig::query()->exists()) {
            return;
        }

        SiteConfig::query()->create([
            'data' => SiteConfig::defaultData(),
        ]);
    }
}
