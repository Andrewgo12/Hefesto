<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    protected $fillable = [
        'user_id',
        'tipo',
        'titulo',
        'mensaje',
        'icono',
        'url',
        'datos_adicionales',
        'leida',
        'fecha_lectura',
        'importante',
        'expira_en',
    ];

    protected $casts = [
        'leida' => 'boolean',
        'importante' => 'boolean',
        'fecha_lectura' => 'datetime',
        'expira_en' => 'datetime',
        'datos_adicionales' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function marcarComoLeida()
    {
        $this->update([
            'leida' => true,
            'fecha_lectura' => now(),
        ]);
    }
}
