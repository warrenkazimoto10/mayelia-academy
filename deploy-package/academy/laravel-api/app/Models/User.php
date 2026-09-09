<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'is_super_admin', 'permissions'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /** Modules du backoffice pouvant être attribués individuellement. */
    public const MODULES = [
        'actualites', 'conseils', 'formations', 'accueil-slider',
        'partenaires', 'faq', 'certificats', 'reglages', 'messages',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_super_admin' => 'boolean',
            'permissions' => 'array',
        ];
    }

    public function canAccessModule(string $module): bool
    {
        return $this->is_super_admin || in_array($module, $this->permissions ?? [], true);
    }
}
