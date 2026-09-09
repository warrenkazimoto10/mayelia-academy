<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormationProgramme extends Model
{
    protected $table = 'formation_programmes';

    protected $fillable = [
        'domaine_id', 'title', 'description', 'contenus_json', 'objectifs_json', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'contenus_json' => 'array',
            'objectifs_json' => 'array',
        ];
    }

    public function domaine(): BelongsTo
    {
        return $this->belongsTo(FormationDomaine::class, 'domaine_id');
    }
}
