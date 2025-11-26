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
        'anexos_nivel',
        'tipo_permiso',
        'perfil_de',
        'opciones_web',
        'firmas',
        'login_asignado',
        'clave_temporal',
        'estado',
        'fase_actual',
        'firmas_pendientes',
        'firmas_completadas',
        'observaciones_estado',
        'fecha_aprobacion',
        'fecha_rechazo',
        'usuario_aprobador_id',
        'usuario_rechazador_id',
        'acepta_responsabilidad',
        'usuario_creador_id',
        'registrado_por_nombre',
        'registrado_por_email',
    ];

    protected $casts = [
        'fecha_solicitud' => 'date',
        'modulos_administrativos' => 'array',
        'modulos_financieros' => 'array',
        'tipo_permiso' => 'array',
        'opciones_web' => 'array',
        'firmas' => 'array',
        'acepta_responsabilidad' => 'boolean',
        'fecha_aprobacion' => 'datetime',
        'fecha_rechazo' => 'datetime',
        'firmas_pendientes' => 'integer',
        'firmas_completadas' => 'integer',
    ];

    // Relaciones
    public function usuarioCreador()
    {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }

    public function usuarioAprobador()
    {
        return $this->belongsTo(User::class, 'usuario_aprobador_id');
    }

    public function usuarioRechazador()
    {
        return $this->belongsTo(User::class, 'usuario_rechazador_id');
    }

    public function historial()
    {
        return $this->morphMany(HistorialSolicitud::class, 'solicitud');
    }

    public function historialEstados()
    {
        return $this->morphMany(HistorialEstado::class, 'solicitable')->orderBy('created_at', 'desc');
    }

    public function firmasSolicitud()
    {
        return $this->morphMany(FirmaSolicitud::class, 'solicitud');
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

    public function scopePendienteFirmas($query)
    {
        return $query->where('estado', 'Pendiente firma(s)');
    }

    public function scopeEnProceso($query)
    {
        return $query->where('estado', 'En proceso');
    }

    // Métodos auxiliares
    public function registrarCambioEstado(string $estadoNuevo, ?User $usuario = null, ?string $observaciones = null, ?string $motivo = null)
    {
        $estadoAnterior = $this->estado;
        
        $this->historialEstados()->create([
            'estado_anterior' => $estadoAnterior,
            'estado_nuevo' => $estadoNuevo,
            'fase' => $this->fase_actual,
            'usuario_id' => $usuario?->id,
            'usuario_nombre' => $usuario?->name ?? 'Sistema',
            'usuario_email' => $usuario?->email,
            'observaciones' => $observaciones,
            'motivo' => $motivo,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
        
        $this->update(['estado' => $estadoNuevo]);
    }

    public function calcularFirmasPendientes(): int
    {
        if (!$this->firmas || !is_array($this->firmas)) {
            return 0;
        }
        
        $totalFirmas = count($this->firmas);
        $firmasCompletadas = collect($this->firmas)->filter(fn($firma) => !empty($firma['firma']))->count();
        
        return $totalFirmas - $firmasCompletadas;
    }
}
