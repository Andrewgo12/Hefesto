<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParametroSistema extends Model
{
    protected $table = 'parametros_sistema';

    protected $fillable = [
        'clave',
        'nombre',
        'valor',
        'descripcion',
        'tipo',
        'editable',
    ];

    protected $casts = [
        'editable' => 'boolean',
    ];
}
