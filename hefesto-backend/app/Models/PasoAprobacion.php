<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PasoAprobacion extends Model
{
    protected $table = 'pasos_aprobacion';

    protected $fillable = [
        'flujo_id',
        'orden',
        'nombre_paso',
        'cargo_requerido',
        'credencial_firma_id',
        'descripcion',
        'obligatorio',
        'permite_rechazo',
    ];

    protected $casts = [
        'obligatorio' => 'boolean',
        'permite_rechazo' => 'boolean',
        'orden' => 'integer',
    ];

    public function flujo(): BelongsTo
    {
        return $this->belongsTo(FlujoAprobacion::class, 'flujo_id');
    }

    public function credencialFirma(): BelongsTo
    {
        return $this->belongsTo(CredencialFirma::class, 'credencial_firma_id');
    }
}
