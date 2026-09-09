<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConseilParagraph extends Model
{
    protected $table = 'conseil_paragraphs';

    protected $fillable = [
        'conseil_id', 'text', 'image_src', 'image_alt', 'image_caption', 'display_order',
    ];

    public function conseil(): BelongsTo
    {
        return $this->belongsTo(Conseil::class, 'conseil_id');
    }
}
