<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SolicitudAdministrativa;
use App\Http\Controllers\Api\ExportacionController;

class ProbarExportacion extends Command
{
    protected $signature = 'exportacion:probar {id}';
    protected $description = 'Probar exportación de una solicitud';

    public function handle()
    {
        $id = $this->argument('id');
        
        $solicitud = SolicitudAdministrativa::find($id);
        
        if (!$solicitud) {
            $this->error("Solicitud no encontrada con ID: {$id}");
            return Command::FAILURE;
        }
        
        $this->info("=== PROBANDO EXPORTACIÓN DE SOLICITUD #{$id} ===");
        $this->newLine();
        
        // Simular el proceso de exportación
        $modulos = is_string($solicitud->modulos_administrativos) 
            ? json_decode($solicitud->modulos_administrativos, true)
            : $solicitud->modulos_administrativos;
        
        $this->info("MÓDULOS ADMINISTRATIVOS:");
        $modulosNombres = ['facturacion', 'anticipos', 'farmacia', 'suministros', 'cartera', 'glosas', 
                          'admisiones', 'ayudasDiagnosticas', 'citasMedicas', 'cirugia', 'rips', 'anexos'];
        
        $filaInicio = 20;
        foreach ($modulosNombres as $index => $modulo) {
            $fila = $filaInicio + $index;
            
            if (isset($modulos[$modulo])) {
                $this->line("\nFila {$fila} - {$modulo}:");
                
                if (is_array($modulos[$modulo])) {
                    $adicionar = $this->isTrue($modulos[$modulo]['A'] ?? $modulos[$modulo]['adicionar'] ?? false);
                    $consultar = $this->isTrue($modulos[$modulo]['C'] ?? $modulos[$modulo]['consultar'] ?? false);
                    $modificar = $this->isTrue($modulos[$modulo]['M'] ?? $modulos[$modulo]['modificar'] ?? false);
                    $borrar = $this->isTrue($modulos[$modulo]['B'] ?? $modulos[$modulo]['borrar'] ?? false);
                    
                    $this->line("  D{$fila} (Adicionar): " . ($adicionar ? '✓ X' : '✗'));
                    $this->line("  F{$fila} (Consultar): " . ($consultar ? '✓ X' : '✗'));
                    $this->line("  H{$fila} (Modificar): " . ($modificar ? '✓ X' : '✗'));
                    $this->line("  J{$fila} (Borrar): " . ($borrar ? '✓ X' : '✗'));
                }
            }
        }
        
        $this->newLine();
        $this->info("MÓDULOS FINANCIEROS:");
        
        $modulos = is_string($solicitud->modulos_financieros) 
            ? json_decode($solicitud->modulos_financieros, true)
            : $solicitud->modulos_financieros;
        
        $modulosNombres = ['presupuesto', 'activosFijos', 'contabilidad', 'cuentasPorPagar', 
                          'cajaYBancos', 'costos', 'administracionDocumentos'];
        
        foreach ($modulosNombres as $index => $modulo) {
            $fila = $filaInicio + $index;
            
            if (isset($modulos[$modulo])) {
                $this->line("\nFila {$fila} - {$modulo}:");
                
                if (is_array($modulos[$modulo])) {
                    $adicionar = $this->isTrue($modulos[$modulo]['A'] ?? $modulos[$modulo]['adicionar'] ?? false);
                    $consultar = $this->isTrue($modulos[$modulo]['C'] ?? $modulos[$modulo]['consultar'] ?? false);
                    $modificar = $this->isTrue($modulos[$modulo]['M'] ?? $modulos[$modulo]['modificar'] ?? false);
                    $borrar = $this->isTrue($modulos[$modulo]['B'] ?? $modulos[$modulo]['borrar'] ?? false);
                    
                    $this->line("  Q{$fila} (Adicionar): " . ($adicionar ? '✓ X' : '✗'));
                    $this->line("  R{$fila} (Consultar): " . ($consultar ? '✓ X' : '✗'));
                    $this->line("  S{$fila} (Modificar): " . ($modificar ? '✓ X' : '✗'));
                    $this->line("  U{$fila} (Borrar): " . ($borrar ? '✓ X' : '✗'));
                }
            }
        }
        
        $this->newLine();
        $this->info("✅ Prueba completada. Ahora exporta el archivo para verificar.");
        
        return Command::SUCCESS;
    }
    
    private function isTrue($value)
    {
        if (is_bool($value)) {
            return $value;
        }
        
        if (is_numeric($value)) {
            return (int)$value === 1;
        }
        
        if (is_string($value)) {
            $value = strtolower(trim($value));
            return in_array($value, ['1', 'true', 'yes', 'si', 'sí', 'verdadero']);
        }
        
        return false;
    }
}
