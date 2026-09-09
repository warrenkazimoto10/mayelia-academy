<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Importe le contenu de production (academy.mayeliamobilite.com) exporté le
 * 28/07/2026 : actualités, certificats, FAQ, domaines/programmes de formation,
 * slides, partenaires, config du site et le compte admin.
 *
 * Usage unique lors de la migration vers mayeliaacademy.com :
 *   php artisan db:seed --class=ProdDataSeeder --force
 *
 * Les tables doivent déjà exister (migrate). Les clés étrangères sont
 * désactivées le temps de l'import pour ne pas dépendre de l'ordre des
 * INSERT (certificates est déchargé avant cert_participants dans le dump).
 *
 * Le fichier SQL est exécuté requête par requête (pas en un seul bloc
 * multi-statements) : plus robuste, et permet de savoir précisément quelle
 * requête pose problème en cas d'erreur.
 */
class ProdDataSeeder extends Seeder
{
    public function run(): void
    {
        $path = __DIR__ . '/data/academy_prod_data.sql';

        if (! file_exists($path)) {
            $this->command?->error("Fichier introuvable : {$path}");
            return;
        }

        $sql = file_get_contents($path);
        $statements = $this->splitStatements($sql);

        Schema::disableForeignKeyConstraints();

        $done = 0;
        foreach ($statements as $statement) {
            $trimmed = trim($statement);
            if ($trimmed === '') {
                continue;
            }

            try {
                DB::unprepared($statement);
                $done++;
            } catch (\Throwable $e) {
                Schema::enableForeignKeyConstraints();
                $snippet = substr($trimmed, 0, 200);
                $this->command?->error("Échec sur la requête : {$snippet}...");
                throw $e;
            }
        }

        Schema::enableForeignKeyConstraints();

        $this->command?->info("Données de production importées avec succès ({$done} requêtes exécutées).");
    }

    /**
     * Découpe un script SQL en requêtes individuelles sur les `;` de premier
     * niveau, en respectant les chaînes entre guillemets simples/doubles
     * (avec échappement par antislash) pour ne pas couper au milieu d'un
     * texte contenant un point-virgule.
     *
     * @return string[]
     */
    private function splitStatements(string $sql): array
    {
        $statements = [];
        $buffer = '';
        $length = strlen($sql);
        $inSingleQuote = false;
        $inDoubleQuote = false;

        for ($i = 0; $i < $length; $i++) {
            $char = $sql[$i];

            if ($inSingleQuote || $inDoubleQuote) {
                $buffer .= $char;

                if ($char === '\\' && $i + 1 < $length) {
                    $buffer .= $sql[$i + 1];
                    $i++;
                    continue;
                }

                if ($inSingleQuote && $char === "'") {
                    $inSingleQuote = false;
                } elseif ($inDoubleQuote && $char === '"') {
                    $inDoubleQuote = false;
                }

                continue;
            }

            if ($char === "'") {
                $inSingleQuote = true;
                $buffer .= $char;
                continue;
            }

            if ($char === '"') {
                $inDoubleQuote = true;
                $buffer .= $char;
                continue;
            }

            if ($char === ';') {
                $statements[] = $buffer;
                $buffer = '';
                continue;
            }

            $buffer .= $char;
        }

        if (trim($buffer) !== '') {
            $statements[] = $buffer;
        }

        return $statements;
    }
}
