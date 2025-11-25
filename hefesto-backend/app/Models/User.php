<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\HasPermissions;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'rol',
        'estado',
        'cargo_id',
        'area_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Verificar si el usuario está activo
     */
    public function estaActivo(): bool
    {
        return $this->estado === 'activo';
    }

    /**
     * Verificar si el usuario es administrador
     */
    public function esAdministrador(): bool
    {
        return strtolower($this->rol) === 'administrador' || $this->tienePermiso('admin.acceso_total');
    }
    /**
     * Obtener el nombre completo del usuario
     */
    public function getNombreCompletoAttribute(): string
    {
        return $this->name;
    }

    /**
     * Relación con solicitudes administrativas
     */
    public function solicitudesAdministrativas()
    {
        return $this->hasMany(SolicitudAdministrativa::class, 'user_id');
    }

    /**
     * Relación con solicitudes de historia clínica
     */
    public function solicitudesHistoriaClinica()
    {
        return $this->hasMany(SolicitudHistoriaClinica::class, 'user_id');
    }

    /**
     * Relación con notificaciones
     */
    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'user_id');
    }

    /**
     * Relación con actividades
     */
    public function actividades()
    {
        return $this->hasMany(Actividad::class, 'user_id');
    }

    /**
     * Relación con credencial de firma
     */
    public function credencialFirma()
    {
        return $this->hasOne(CredencialFirma::class, 'usuario_id');
    }
}
