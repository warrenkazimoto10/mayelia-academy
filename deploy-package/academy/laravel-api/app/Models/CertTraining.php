<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CertTraining extends Model
{
    protected $table = 'cert_trainings';

    protected $fillable = ['title', 'client', 'start_date', 'end_date', 'issue_place', 'issue_date'];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'issue_date' => 'date',
    ];

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'cert_training_id');
    }
}
