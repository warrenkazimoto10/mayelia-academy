<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'sort_order',
        'image_url',
        'overlay_opacity',
        'description',
        'link_url',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'overlay_opacity' => 'integer',
        ];
    }
}
