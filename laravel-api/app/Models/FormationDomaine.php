<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormationDomaine extends Model
{
    protected $table = 'formation_domaines';

    protected $fillable = [
        'slug', 'title', 'icon_key', 'color_tailwind', 'gradient_tailwind', 'image_url', 'sort_order',
    ];

    public function programmes(): HasMany
    {
        return $this->hasMany(FormationProgramme::class, 'domaine_id')->orderBy('sort_order');
    }
}
