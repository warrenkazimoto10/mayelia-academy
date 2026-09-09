<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActualiteParagraph extends Model
{
    protected $table = 'actualite_paragraphs';

    protected $fillable = [
        'actualite_id', 'text', 'image_src', 'image_alt', 'image_caption', 'display_order',
    ];

    public function actualite(): BelongsTo
    {
        return $this->belongsTo(Actualite::class, 'actualite_id');
    }
}
