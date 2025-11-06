<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class HistorialEstado extends Model
{
    use HasFactory;

    protected $table = 'historial_estados';

    protected $fillable = [
        'solicitable_id',
        'solicitable_type',
        'estado_anterior',
        'estado_nuevo',
        'fase',
        'usuario_id',
        'usuario_nombre',
        'usuario_email',
        'observaciones',
        'motivo',
        'datos_adicionales',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'datos_adicionales' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relación polimórfica con la solicitud
     */
    public function solicitable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Usuario que realizó el cambio
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    /**
     * Scope para filtrar por tipo de solicitud
     */
    public function scopePorTipo($query, string $tipo)
    {
        return $query->where('solicitable_type', $tipo);
    }

    /**
     * Scope para filtrar por estado
     */
    public function scopePorEstado($query, string $estado)
    {
        return $query->where('estado_nuevo', $estado);
    }

    /**
     * Obtener el nombre del tipo de solicitud de forma legible
     */
    public function getTipoSolicitudAttribute(): string
    {
        return match($this->solicitable_type) {
            'App\\Models\\SolicitudAdministrativa' => 'Administrativa',
            'App\\Models\\SolicitudHistoriaClinica' => 'Historia Clínica',
            default => 'Desconocido'
        };
    }
}
