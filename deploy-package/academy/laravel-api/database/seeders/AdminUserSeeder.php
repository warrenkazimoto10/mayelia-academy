<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Compte super-administrateur initial (connexion /admin + Sanctum).
     * Idempotent : ne touche plus aux comptes existants une fois qu'un
     * super-administrateur est en place (évite d'effacer les comptes créés
     * depuis le backoffice à chaque ré-exécution de la liste de seeders).
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@mayelia.ci')],
            [
                'name' => 'Administrateur Mayelia',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'changeme')),
                'is_super_admin' => true,
                'permissions' => [],
            ]
        );
    }
}
