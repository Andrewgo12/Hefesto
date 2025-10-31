<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolicitudHistoriaClinica extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'solicitudes_historia_clinica';

    protected $fillable = [
        'codigo_formato',
        'version',
        'fecha_solicitud',
        'nombre_completo',
        'cedula',
        'celular',
        'correo_electronico',
        'registro_codigo',
        'area_servicio',
        'especialidad',
        'observaciones',
        'perfil',
        'perfil_otro',
        'tipo_vinculacion',
        'terminal_asignado',
        'terminal_otro',
        'capacitacion_historia_clinica',
        'capacitacion_epidemiologia',
        'aval_institucional',
        'firmas',
        'login_creado_por',
        'estado',
        'acepta_responsabilidad',
        'usuario_creador_id',
    ];

    protected $casts = [
        'fecha_solicitud' => 'date',
        'capacitacion_historia_clinica' => 'array',
        'capacitacion_epidemiologia' => 'array',
        'aval_institucional' => 'array',
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
        return $this->where('estado', 'Pendiente');
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

    // Accessor para verificar si necesita capacitación en epidemiología
    public function getNecesitaEpidemiologiaAttribute()
    {
        return in_array($this->perfil, ['Médico general', 'Médico especialista']);
    }
}
