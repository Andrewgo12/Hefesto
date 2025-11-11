<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SolicitudAdministrativa;

class VerFirmasSolicitud extends Command
{
    protected $signature = 'solicitud:ver-firmas {id}';
    protected $description = 'Ver firmas de una solicitud';

    public function handle()
    {
        $id = $this->argument('id');
        $solicitud = SolicitudAdministrativa::find($id);
        
        if (!$solicitud) {
            $this->error("Solicitud no encontrada");
            return Command::FAILURE;
        }
        
        $this->info("=== FIRMAS DE SOLICITUD #{$id} ===");
        $this->newLine();
        
        if (!$solicitud->firmas) {
            $this->warn("No hay firmas registradas");
            return Command::SUCCESS;
        }
        
        $firmas = is_string($solicitud->firmas) 
            ? json_decode($solicitud->firmas, true)
            : $solicitud->firmas;
        
        if (!is_array($firmas)) {
            $this->error("Formato de firmas inválido");
            return Command::FAILURE;
        }
        
        foreach ($firmas as $cargo => $firma) {
            $this->line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            $this->line("Cargo: {$cargo}");
            $this->line("Usuario: " . ($firma['usuario'] ?? 'N/A'));
            $this->line("Fecha: " . ($firma['fecha'] ?? 'N/A'));
            
            $firmaData = $firma['firma'] ?? '';
            if (strpos($firmaData, 'data:image') === 0) {
                $this->line("Tipo: Imagen Base64");
                $this->line("Tamaño: " . strlen($firmaData) . " caracteres");
            } elseif (strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                $texto = str_replace('FIRMA_TEXTO:', '', $firmaData);
                $this->line("Tipo: Texto firma");
                $this->line("Texto: {$texto}");
            } else {
                $this->line("Tipo: Texto simple");
                $this->line("Contenido: {$firmaData}");
            }
            $this->newLine();
        }
        
        return Command::SUCCESS;
    }
}
