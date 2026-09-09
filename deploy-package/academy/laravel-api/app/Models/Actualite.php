<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Actualite extends Model
{
    protected $table = 'actualites';

    protected $fillable = [
        'title', 'excerpt', 'category', 'date', 'read_time', 'category_color', 'hero_image', 'published',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function paragraphs(): HasMany
    {
        return $this->hasMany(ActualiteParagraph::class, 'actualite_id')->orderBy('display_order');
    }
}
