<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Actividad extends Model
{
    protected $table = 'actividades';

    protected $fillable = [
        'user_id',
        'usuario_email',
        'accion',
        'descripcion',
        'modulo',
        'ip_address',
        'user_agent',
        'datos_adicionales',
    ];

    protected $casts = [
        'datos_adicionales' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
