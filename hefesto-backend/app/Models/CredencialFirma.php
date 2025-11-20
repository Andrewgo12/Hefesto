<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CredencialFirma extends Model
{
    protected $table = 'credenciales_firmas';

    protected $fillable = [
        'user_id',
        'cargo',
        'credencial',
        'nombre_completo',
        'email',
        'cedula',
        'area_departamento',
        'activo',
        'descripcion',
        'tipo_formulario',
        'orden',
        'firma_digital',
        'firma_tipo',
        'firma_actualizada_en',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'orden' => 'integer',
        'firma_actualizada_en' => 'datetime',
    ];

    /**
     * Relación con el usuario
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Verificar credencial con hash
     */
    public function verificarCredencial($credencial)
    {
        return \Hash::check($credencial, $this->credencial);
    }


    /**
     * Scope para obtener solo credenciales activas
     */
    public function scopeActivas($query)
    {
        return $query->where('activo', true);
    }

    /**
     * Scope para filtrar por tipo de formulario
     */
    public function scopePorTipo($query, $tipo)
    {
        return $query->where(function($q) use ($tipo) {
            $q->where('tipo_formulario', $tipo)
              ->orWhere('tipo_formulario', 'ambos');
        });
    }

    /**
     * Scope para ordenar por orden
     */
    public function scopeOrdenado($query)
    {
        return $query->orderBy('orden', 'asc')->orderBy('cargo', 'asc');
    }
}
