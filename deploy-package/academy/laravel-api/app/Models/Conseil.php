<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conseil extends Model
{
    protected $table = 'conseils';

    protected $fillable = [
        'title', 'excerpt', 'date', 'read_time', 'image', 'content', 'published',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function paragraphs(): HasMany
    {
        return $this->hasMany(ConseilParagraph::class, 'conseil_id')->orderBy('display_order');
    }
}
