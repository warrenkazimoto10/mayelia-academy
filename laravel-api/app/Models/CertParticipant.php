<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CertParticipant extends Model
{
    protected $table = 'cert_participants';

    protected $fillable = ['civility', 'full_name'];

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'cert_participant_id');
    }
}
