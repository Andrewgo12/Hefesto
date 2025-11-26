<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FirmaSolicitud extends Model
{
    protected $table = 'firmas_solicitud';

    protected $fillable = [
        'solicitud_type',
        'solicitud_id',
        'paso_aprobacion_id',
        'firmado_por',
        'nombre_firmante',
        'cargo_firmante',
        'firma',
        'firma_guardado',
        'firma_base64',
        'credencial_usada',
        'estado',
        'observaciones',
        'motivo_rechazo',
        'fecha_firma',
        'ip_address',
    ];

    protected $casts = [
        'fecha_firma' => 'datetime',
    ];

    public function solicitud(): MorphTo
    {
        return $this->morphTo();
    }

    public function paso(): BelongsTo
    {
        return $this->belongsTo(PasoAprobacion::class, 'paso_aprobacion_id');
    }

    public function firmante(): BelongsTo
    {
        return $this->belongsTo(User::class, 'firmado_por');
    }
}
