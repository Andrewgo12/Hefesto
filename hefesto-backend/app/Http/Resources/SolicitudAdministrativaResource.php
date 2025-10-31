<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitudAdministrativaResource extends JsonResource
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
            'cargo' => $this->cargo,
            'area_servicio' => $this->area_servicio,
            'telefono_extension' => $this->telefono_extension,
            'tipo_vinculacion' => $this->tipo_vinculacion,
            'modulos_administrativos' => $this->modulos_administrativos,
            'modulos_financieros' => $this->modulos_financieros,
            'tipo_permiso' => $this->tipo_permiso,
            'perfil_de' => $this->perfil_de,
            'opciones_web' => $this->opciones_web,
            'firmas' => $this->firmas,
            'login_asignado' => $this->login_asignado,
            'estado' => $this->estado,
            'acepta_responsabilidad' => (bool) $this->acepta_responsabilidad,
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
