<?php

namespace Database\Seeders;

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use Illuminate\Database\Seeder;

class FirmasDigitalesTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Este seeder agrega firmas digitales de prueba a todas las solicitudes
     * para verificar que se generen correctamente en Excel y PDF.
     */
    public function run(): void
    {
        $this->command->info('🖊️  Agregando firmas digitales de prueba...');
        
        // ===== FIRMAS PARA SOLICITUDES ADMINISTRATIVAS =====
        $this->agregarFirmasAdministrativas();
        
        // ===== FIRMAS PARA SOLICITUDES DE HISTORIA CLÍNICA =====
        $this->agregarFirmasHistoriaClinica();
        
        $this->command->info('✅ Firmas digitales agregadas exitosamente');
    }
    
    /**
     * Agregar firmas a solicitudes administrativas
     */
    private function agregarFirmasAdministrativas(): void
    {
        $solicitudes = SolicitudAdministrativa::all();
        $totalSolicitudes = $solicitudes->count();
        
        if ($totalSolicitudes === 0) {
            $this->command->warn('⚠️  No hay solicitudes administrativas para agregar firmas');
            return;
        }
        
        $this->command->info("📋 Procesando {$totalSolicitudes} solicitudes administrativas...");
        
        // Firmas según el formato institucional:
        // - FIRMA DEL USUARIO → F40
        // - Vo. Bo. Jefe Inmediato → A44
        // - Vo. Bo. Jefe de Talento Humano → G44
        // - Vo. Bo. Jefe Gestión de la Información → O44
        $firmasBase = [
            'Usuario' => [
                'usuario' => 'Juan Pérez García',
                'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Juan Pérez García',
            ],
            'Vo. Bo. Jefe Inmediato' => [
                'usuario' => 'María López Rodríguez',
                'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:María López Rodríguez',
            ],
            'Vo. Bo. Jefe de Talento Humano' => [
                'usuario' => 'Carlos Martínez Sánchez',
                'fecha' => now()->subDays(1)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Carlos Martínez Sánchez',
            ],
            'Vo. Bo. Jefe Gestión de la Información' => [
                'usuario' => 'Ana Gómez Torres',
                'fecha' => now()->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Ana Gómez Torres',
            ],
        ];
        
        $contador = 0;
        foreach ($solicitudes as $solicitud) {
            // Usar el nombre real de la solicitud para la primera firma
            $firmasPersonalizadas = $firmasBase;
            if ($solicitud->nombre_completo) {
                $firmasPersonalizadas['Usuario']['usuario'] = $solicitud->nombre_completo;
                $firmasPersonalizadas['Usuario']['firma'] = 'FIRMA_TEXTO:' . $solicitud->nombre_completo;
            }
            
            $solicitud->update([
                'firmas' => $firmasPersonalizadas,
                'firmas_completadas' => 4,
                'firmas_pendientes' => 0,
            ]);
            
            $contador++;
        }
        
        $this->command->info("   ✓ {$contador} solicitudes administrativas actualizadas con firmas");
    }
    
    /**
     * Agregar firmas a solicitudes de historia clínica
     */
    private function agregarFirmasHistoriaClinica(): void
    {
        $solicitudes = SolicitudHistoriaClinica::all();
        $totalSolicitudes = $solicitudes->count();
        
        if ($totalSolicitudes === 0) {
            $this->command->warn('⚠️  No hay solicitudes de historia clínica para agregar firmas');
            return;
        }
        
        $this->command->info("🏥 Procesando {$totalSolicitudes} solicitudes de historia clínica...");
        
        // Firmas según el mapeo del ExportacionController:
        // - Solicitante/Usuario → A29
        // - Capacitador Historia Clínica → J22
        // - Capacitador Epidemiología → J26
        // - Aval Institucional → M17
        $firmasBase = [
            'Solicitante' => [
                'usuario' => 'Dr. Pedro Ramírez Castro',
                'fecha' => now()->subDays(4)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Dr. Pedro Ramírez Castro',
            ],
            'Capacitador Historia Clínica' => [
                'usuario' => 'Enf. María González López',
                'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Enf. María González López',
            ],
            'Capacitador Epidemiología' => [
                'usuario' => 'Dr. Carlos Méndez Torres',
                'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Dr. Carlos Méndez Torres',
            ],
            'Aval Institucional' => [
                'usuario' => 'Dra. Laura Fernández Díaz - Jefe de Área',
                'fecha' => now()->subDays(1)->format('Y-m-d H:i:s'),
                'firma' => 'FIRMA_TEXTO:Dra. Laura Fernández Díaz',
            ],
        ];
        
        $contador = 0;
        foreach ($solicitudes as $solicitud) {
            // Usar el nombre real de la solicitud para la primera firma
            $firmasPersonalizadas = $firmasBase;
            if ($solicitud->nombre_completo) {
                $firmasPersonalizadas['Solicitante']['usuario'] = $solicitud->nombre_completo;
                $firmasPersonalizadas['Solicitante']['firma'] = 'FIRMA_TEXTO:' . $solicitud->nombre_completo;
            }
            
            $solicitud->update([
                'firmas' => $firmasPersonalizadas,
                'firmas_completadas' => 4,
                'firmas_pendientes' => 0,
            ]);
            
            $contador++;
        }
        
        $this->command->info("   ✓ {$contador} solicitudes de historia clínica actualizadas con firmas");
    }
    
    /**
     * Generar una firma base64 de prueba (imagen PNG simple)
     * Esta es una imagen PNG transparente de 1x1 píxel
     */
    private function generarFirmaBase64Ejemplo(): string
    {
        // PNG transparente de 1x1 píxel en base64
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }
}
