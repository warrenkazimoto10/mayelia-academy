<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    protected $table = 'certificates';

    protected $fillable = ['ref', 'validated', 'cert_participant_id', 'cert_training_id'];

    protected $casts = [
        'validated' => 'boolean',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(CertParticipant::class, 'cert_participant_id');
    }

    public function training(): BelongsTo
    {
        return $this->belongsTo(CertTraining::class, 'cert_training_id');
    }
}
