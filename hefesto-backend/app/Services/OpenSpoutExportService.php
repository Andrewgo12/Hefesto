<?php

namespace App\Services;

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use OpenSpout\Writer\XLSX\Writer;
use OpenSpout\Writer\XLSX\Options;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\Border;
use OpenSpout\Common\Entity\Style\BorderPart;

class OpenSpoutExportService
{
    /**
     * Exportar solicitud administrativa con OpenSpout
     */
    public function exportarSolicitudAdministrativa($id)
    {
        $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados'])
            ->findOrFail($id);
        
        $fileName = storage_path("app/exports/solicitud_administrativa_{$id}.xlsx");
        
        // Crear directorio si no existe
        if (!file_exists(dirname($fileName))) {
            mkdir(dirname($fileName), 0755, true);
        }
        
        $writer = new Writer();
        $writer->openToFile($fileName);
        
        // Estilo para encabezados
        $headerStyle = (new Style())
            ->setFontBold()
            ->setFontSize(12)
            ->setFontColor(Color::WHITE)
            ->setBackgroundColor(Color::rgb(68, 114, 196));
        
        // Escribir encabezados
        $headers = Row::fromValues([
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
        ], $headerStyle);
        
        $writer->addRow($headers);
        
        // Estilo para datos
        $dataStyle = (new Style())
            ->setFontSize(11);
        
        // Escribir datos
        $data = Row::fromValues([
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
        ], $dataStyle);
        
        $writer->addRow($data);
        $writer->close();
        
        \Log::info("OpenSpout: Archivo generado exitosamente - {$fileName}");
        
        return $fileName;
    }
    
    /**
     * Exportar solicitud de historia clínica con OpenSpout
     */
    public function exportarSolicitudHistoriaClinica($id)
    {
        $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historialEstados'])
            ->findOrFail($id);
        
        $fileName = storage_path("app/exports/solicitud_historia_clinica_{$id}.xlsx");
        
        // Crear directorio si no existe
        if (!file_exists(dirname($fileName))) {
            mkdir(dirname($fileName), 0755, true);
        }
        
        $writer = new Writer();
        $writer->openToFile($fileName);
        
        // Estilo para encabezados
        $headerStyle = (new Style())
            ->setFontBold()
            ->setFontSize(12)
            ->setFontColor(Color::WHITE)
            ->setBackgroundColor(Color::rgb(0, 150, 136)); // Teal
        
        // Escribir encabezados
        $headers = Row::fromValues([
            'ID',
            'Nombre Completo',
            'Cédula',
            'Cargo',
            'Área/Servicio',
            'Perfil',
            'Estado',
            'Fecha Solicitud',
            'Creado Por',
        ], $headerStyle);
        
        $writer->addRow($headers);
        
        // Estilo para datos
        $dataStyle = (new Style())
            ->setFontSize(11);
        
        // Escribir datos
        $data = Row::fromValues([
            $solicitud->id,
            $solicitud->nombre_completo,
            $solicitud->cedula,
            $solicitud->cargo,
            $solicitud->area_servicio,
            $solicitud->perfil ?? 'N/A',
            $solicitud->estado,
            $solicitud->fecha_solicitud?->format('d/m/Y'),
            $solicitud->usuarioCreador?->nombre ?? 'Sistema',
        ], $dataStyle);
        
        $writer->addRow($data);
        $writer->close();
        
        \Log::info("OpenSpout: Archivo generado exitosamente - {$fileName}");
        
        return $fileName;
    }
}
