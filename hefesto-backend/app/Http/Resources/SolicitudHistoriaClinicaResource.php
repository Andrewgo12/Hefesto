<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitudHistoriaClinicaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'codigo_formato' => $this->codigo_formato,
            'version' => $this->version,
            'fecha_solicitud' => $this->fecha_solicitud->format('Y-m-d'),
            'nombre_completo' => $this->nombre_completo,
            'cedula' => $this->cedula,
            'celular' => $this->celular,
            'correo_electronico' => $this->correo_electronico,
            'registro_codigo' => $this->registro_codigo,
            'area_servicio' => $this->area_servicio,
            'especialidad' => $this->especialidad,
            'observaciones' => $this->observaciones,
            'perfil' => $this->perfil,
            'perfil_otro' => $this->perfil_otro,
            'tipo_vinculacion' => $this->tipo_vinculacion,
            'terminal_asignado' => $this->terminal_asignado,
            'terminal_otro' => $this->terminal_otro,
            'capacitacion_historia_clinica' => $this->capacitacion_historia_clinica,
            'capacitacion_epidemiologia' => $this->capacitacion_epidemiologia,
            'aval_institucional' => $this->aval_institucional,
            'firmas' => $this->firmas,
            'login_creado_por' => $this->login_creado_por,
            'estado' => $this->estado,
            'acepta_responsabilidad' => (bool) $this->acepta_responsabilidad,
            'necesita_epidemiologia' => $this->necesita_epidemiologia,
            'usuario_creador' => $this->whenLoaded('usuarioCreador', function () {
                return [
                    'id' => $this->usuarioCreador->id,
                    'name' => $this->usuarioCreador->name,
                    'email' => $this->usuarioCreador->email,
                ];
            }),
            'historial' => $this->whenLoaded('historial', function () {
                return $this->historial->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'accion' => $item->accion,
                        'comentario' => $item->comentario,
                        'usuario' => $item->usuario->name ?? 'Sistema',
                        'fecha' => $item->created_at->format('Y-m-d H:i:s'),
                    ];
                });
            }),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
