<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'usuarios_count',
        'permisos',
        'activo',
    ];

    protected $casts = [
        'permisos' => 'array',
        'activo' => 'boolean',
        'usuarios_count' => 'integer',
    ];

    /**
     * Relación con usuarios
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Relación con permisos
     */
    public function permisosGranulares(): BelongsToMany
    {
        return $this->belongsToMany(Permiso::class, 'permiso_role');
    }
}
