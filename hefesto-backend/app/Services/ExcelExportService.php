<?php

namespace App\Services;

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

class ExcelExportService
{
    /**
     * Exportar solicitud administrativa a Excel
     */
    public function exportarAdministrativa(SolicitudAdministrativa $solicitud)
    {
        // Aquí iría la lógica para exportar a Excel usando PhpSpreadsheet
        // Por ahora retornamos un array con los datos formateados
        
        return [
            'formato' => $solicitud->codigo_formato,
            'version' => $solicitud->version,
            'fecha_solicitud' => $solicitud->fecha_solicitud->format('d/m/Y'),
            'datos_personales' => [
                'nombre_completo' => $solicitud->nombre_completo,
                'cedula' => $solicitud->cedula,
                'cargo' => $solicitud->cargo,
                'area_servicio' => $solicitud->area_servicio,
                'telefono_extension' => $solicitud->telefono_extension,
            ],
            'vinculacion' => $solicitud->tipo_vinculacion,
            'modulos_administrativos' => $solicitud->modulos_administrativos,
            'modulos_financieros' => $solicitud->modulos_financieros,
            'permisos' => $solicitud->tipo_permiso,
            'perfil_de' => $solicitud->perfil_de,
            'opciones_web' => $solicitud->opciones_web,
            'firmas' => $solicitud->firmas,
            'login_asignado' => $solicitud->login_asignado,
        ];
    }

    /**
     * Exportar solicitud historia clínica a Excel
     */
    public function exportarHistoriaClinica(SolicitudHistoriaClinica $solicitud)
    {
        return [
            'formato' => $solicitud->codigo_formato,
            'version' => $solicitud->version,
            'fecha_solicitud' => $solicitud->fecha_solicitud->format('d/m/Y'),
            'datos_personales' => [
                'nombre_completo' => $solicitud->nombre_completo,
                'cedula' => $solicitud->cedula,
                'celular' => $solicitud->celular,
                'correo_electronico' => $solicitud->correo_electronico,
                'registro_codigo' => $solicitud->registro_codigo,
                'area_servicio' => $solicitud->area_servicio,
                'especialidad' => $solicitud->especialidad,
            ],
            'perfil' => $solicitud->perfil,
            'perfil_otro' => $solicitud->perfil_otro,
            'vinculacion' => $solicitud->tipo_vinculacion,
            'terminal' => $solicitud->terminal_asignado,
            'terminal_otro' => $solicitud->terminal_otro,
            'capacitacion_hc' => $solicitud->capacitacion_historia_clinica,
            'capacitacion_epi' => $solicitud->capacitacion_epidemiologia,
            'aval' => $solicitud->aval_institucional,
            'firmas' => $solicitud->firmas,
            'login_creado_por' => $solicitud->login_creado_por,
        ];
    }
}
