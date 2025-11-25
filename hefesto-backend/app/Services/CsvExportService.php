<?php

namespace App\Services;

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

class CsvExportService
{
    /**
     * Exportar solicitud administrativa a CSV
     */
    public function exportarSolicitudAdministrativa($id)
    {
        $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados'])
            ->findOrFail($id);
        
        $fileName = storage_path("app/exports/solicitud_administrativa_{$id}.csv");
        
        // Crear directorio si no existe
        if (!file_exists(dirname($fileName))) {
            mkdir(dirname($fileName), 0755, true);
        }
        
        $file = fopen($fileName, 'w');
        
        // BOM para UTF-8 (para que Excel lo abra correctamente)
        fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
        
        // Encabezados
        fputcsv($file, [
            'ID',
            'Nombre Completo',
            'Cédula',
            'Cargo',
            'Área/Servicio',
            'Tipo Vinculación',
            'Estado',
            'Fecha Solicitud',
            'Login Asignado',
            'Creado Por',
        ], ';'); // Usar ; para compatibilidad con Excel en español
        
        // Datos
        fputcsv($file, [
            $solicitud->id,
            $solicitud->nombre_completo,
            $solicitud->cedula,
            $solicitud->cargo,
            $solicitud->area_servicio,
            $solicitud->tipo_vinculacion,
            $solicitud->estado,
            $solicitud->fecha_solicitud?->format('d/m/Y'),
            $solicitud->login_asignado ?? 'N/A',
            $solicitud->usuarioCreador?->nombre ?? 'Sistema',
        ], ';');
        
        fclose($file);
        
        \Log::info("CSV generado exitosamente: {$fileName}");
        
        return $fileName;
    }
    
    /**
     * Exportar solicitud de historia clínica a CSV
     */
    public function exportarSolicitudHistoriaClinica($id)
    {
        $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historialEstados'])
            ->findOrFail($id);
        
        $fileName = storage_path("app/exports/solicitud_historia_clinica_{$id}.csv");
        
        // Crear directorio si no existe
        if (!file_exists(dirname($fileName))) {
            mkdir(dirname($fileName), 0755, true);
        }
        
        $file = fopen($fileName, 'w');
        
        // BOM para UTF-8
        fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
        
        // Encabezados
        fputcsv($file, [
            'ID',
            'Nombre Completo',
            'Cédula',
            'Cargo',
            'Área/Servicio',
            'Perfil',
            'Estado',
            'Fecha Solicitud',
            'Creado Por',
        ], ';');
        
        // Datos
        fputcsv($file, [
            $solicitud->id,
            $solicitud->nombre_completo,
            $solicitud->cedula,
            $solicitud->cargo,
            $solicitud->area_servicio,
            $solicitud->perfil ?? 'N/A',
            $solicitud->estado,
            $solicitud->fecha_solicitud?->format('d/m/Y'),
            $solicitud->usuarioCreador?->nombre ?? 'Sistema',
        ], ';');
        
        fclose($file);
        
        \Log::info("CSV generado exitosamente: {$fileName}");
        
        return $fileName;
    }
}
