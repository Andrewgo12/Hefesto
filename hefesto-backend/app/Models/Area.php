<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Area extends Model
{
    protected $table = 'areas';

    protected $fillable = [
        'nombre',
        'codigo',
        'descripcion',
        'area_padre_id',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function areaPadre(): BelongsTo
    {
        return $this->belongsTo(Area::class, 'area_padre_id');
    }

    public function subAreas(): HasMany
    {
        return $this->hasMany(Area::class, 'area_padre_id');
    }

    public function cargos(): HasMany
    {
        return $this->hasMany(Cargo::class);
    }
}
