<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolicitudAdministrativa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'solicitudes_administrativas';

    protected $fillable = [
        'codigo_formato',
        'version',
        'fecha_solicitud',
        'nombre_completo',
        'cedula',
        'cargo',
        'area_servicio',
        'telefono_extension',
        'tipo_vinculacion',
        'modulos_administrativos',
        'modulos_financieros',
        'tipo_permiso',
        'perfil_de',
        'opciones_web',
        'firmas',
        'login_asignado',
        'clave_temporal',
        'estado',
        'acepta_responsabilidad',
        'usuario_creador_id',
    ];

    protected $casts = [
        'fecha_solicitud' => 'date',
        'modulos_administrativos' => 'array',
        'modulos_financieros' => 'array',
        'tipo_permiso' => 'array',
        'opciones_web' => 'array',
        'firmas' => 'array',
        'acepta_responsabilidad' => 'boolean',
    ];

    // Relaciones
    public function usuarioCreador()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }

    public function historial()
    {
        return $this->morphMany(HistorialSolicitud::class, 'solicitud');
    }

    // Scopes
    public function scopePendientes($query)
    {
        return $query->where('estado', 'Pendiente');
    }

    public function scopeEnRevision($query)
    {
        return $query->where('estado', 'En revisión');
    }

    public function scopeAprobadas($query)
    {
        return $query->where('estado', 'Aprobado');
    }

    public function scopeRechazadas($query)
    {
        return $query->where('estado', 'Rechazado');
    }
}
