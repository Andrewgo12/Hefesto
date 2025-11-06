<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    protected $table = 'configuraciones';

    protected $fillable = [
        'categoria',
        'clave',
        'nombre',
        'valor',
        'descripcion',
        'tipo',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
