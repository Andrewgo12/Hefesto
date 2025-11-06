<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FlujoAprobacion extends Model
{
    protected $table = 'flujos_aprobacion';

    protected $fillable = [
        'nombre',
        'tipo_solicitud',
        'descripcion',
        'total_pasos',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'total_pasos' => 'integer',
    ];

    public function pasos(): HasMany
    {
        return $this->hasMany(PasoAprobacion::class, 'flujo_id')->orderBy('orden');
    }
}
