<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SolicitudAdministrativa;

class VerDatosSolicitud extends Command
{
    protected $signature = 'solicitud:ver {id}';
    protected $description = 'Ver datos de una solicitud administrativa';

    public function handle()
    {
        $id = $this->argument('id');
        
        $solicitud = SolicitudAdministrativa::find($id);
        
        if (!$solicitud) {
            $this->error("Solicitud no encontrada con ID: {$id}");
            return Command::FAILURE;
        }
        
        $this->info("=== SOLICITUD ADMINISTRATIVA #{$id} ===");
        $this->newLine();
        
        $this->line("Nombre: {$solicitud->nombre_completo}");
        $this->line("Cédula: {$solicitud->cedula}");
        $this->line("Estado: {$solicitud->estado}");
        $this->newLine();
        
        $this->info("=== MÓDULOS ADMINISTRATIVOS (RAW) ===");
        $this->line(print_r($solicitud->modulos_administrativos, true));
        $this->newLine();
        
        $this->info("=== MÓDULOS ADMINISTRATIVOS (DECODIFICADO) ===");
        $modulos = is_string($solicitud->modulos_administrativos) 
            ? json_decode($solicitud->modulos_administrativos, true)
            : $solicitud->modulos_administrativos;
        
        if (is_array($modulos)) {
            foreach ($modulos as $nombre => $permisos) {
                $this->line("- {$nombre}:");
                if (is_array($permisos)) {
                    foreach ($permisos as $key => $value) {
                        $valor = $value ? '✓' : '✗';
                        $this->line("    {$key}: {$valor}");
                    }
                } else {
                    $this->line("    Valor: " . ($permisos ? 'true' : 'false'));
                }
            }
        } else {
            $this->warn("No es un array válido");
        }
        
        $this->newLine();
        $this->info("=== MÓDULOS FINANCIEROS (RAW) ===");
        $this->line(print_r($solicitud->modulos_financieros, true));
        $this->newLine();
        
        $this->info("=== MÓDULOS FINANCIEROS (DECODIFICADO) ===");
        $modulos = is_string($solicitud->modulos_financieros) 
            ? json_decode($solicitud->modulos_financieros, true)
            : $solicitud->modulos_financieros;
        
        if (is_array($modulos)) {
            foreach ($modulos as $nombre => $permisos) {
                $this->line("- {$nombre}:");
                if (is_array($permisos)) {
                    foreach ($permisos as $key => $value) {
                        $valor = $value ? '✓' : '✗';
                        $this->line("    {$key}: {$valor}");
                    }
                } else {
                    $this->line("    Valor: " . ($permisos ? 'true' : 'false'));
                }
            }
        } else {
            $this->warn("No es un array válido");
        }
        
        return Command::SUCCESS;
    }
}
