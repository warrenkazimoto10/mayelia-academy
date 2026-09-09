<?php

namespace App\Services\Certificates;

use Illuminate\Support\Facades\DB;

class RefGenerator
{
    /** Génère une référence séquentielle "MAY-YYYY-NNNN" pour l'année donnée, sans collision possible. */
    public function generate(int $year): string
    {
        return DB::transaction(function () use ($year) {
            $counter = DB::table('cert_ref_counters')->where('year', $year)->lockForUpdate()->first();

            if (! $counter) {
                DB::table('cert_ref_counters')->insert([
                    'year' => $year,
                    'last_number' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $counter = DB::table('cert_ref_counters')->where('year', $year)->lockForUpdate()->first();
            }

            $next = $counter->last_number + 1;
            DB::table('cert_ref_counters')->where('year', $year)->update([
                'last_number' => $next,
                'updated_at' => now(),
            ]);

            return sprintf('MAY-%d-%04d', $year, $next);
        });
    }
}
