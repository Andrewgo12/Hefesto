<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CredencialFirma;

class ListarCredenciales extends Command
{
    protected $signature = 'credenciales:listar';
    protected $description = 'Listar todas las credenciales de firmas';

    public function handle()
    {
        $credenciales = CredencialFirma::ordenado()->get();
        
        $this->info('=== CREDENCIALES DE FIRMAS REGISTRADAS ===');
        $this->newLine();
        
        if ($credenciales->isEmpty()) {
            $this->warn('No hay credenciales registradas');
            return Command::SUCCESS;
        }
        
        foreach ($credenciales as $credencial) {
            $this->line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            $this->line("ID: {$credencial->id}");
            $this->line("Cargo: {$credencial->cargo}");
            $this->line("Nombre: {$credencial->nombre_completo}");
            $this->line("Email: {$credencial->email}");
            if ($credencial->cedula) {
                $this->line("Cédula: {$credencial->cedula}");
            }
            if ($credencial->area_departamento) {
                $this->line("Área: {$credencial->area_departamento}");
            }
            $this->line("Tipo: {$credencial->tipo_formulario}");
            $this->line("Orden: {$credencial->orden}");
            $this->line("Estado: " . ($credencial->activo ? '✅ Activo' : '❌ Inactivo'));
            if ($credencial->descripcion) {
                $this->line("Descripción: {$credencial->descripcion}");
            }
            $this->newLine();
        }
        
        $this->info("Total: {$credenciales->count()} credencial(es)");
        
        return Command::SUCCESS;
    }
}
