<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialSolicitud extends Model
{
    use HasFactory;

    protected $table = 'historial_solicitudes';

    protected $fillable = [
        'solicitud_id',
        'solicitud_type',
        'accion',
        'comentario',
        'usuario_id',
    ];

    // Relaciones
    public function solicitud()
    {
        return $this->morphTo();
    }

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
