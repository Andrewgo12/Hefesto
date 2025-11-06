<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CredencialFirma extends Model
{
    protected $table = 'credenciales_firma';

    protected $fillable = [
        'cargo',
        'credencial',
        'descripcion',
        'activo',
        'intentos_fallidos',
        'ultimo_uso',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'intentos_fallidos' => 'integer',
        'ultimo_uso' => 'datetime',
    ];

    protected $hidden = [
        'credencial', // No exponer la credencial en JSON
    ];
}
