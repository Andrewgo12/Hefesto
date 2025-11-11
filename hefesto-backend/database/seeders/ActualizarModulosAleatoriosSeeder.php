<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

class ActualizarModulosAleatoriosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🔄 Actualizando solicitudes con módulos aleatorios...');
        
        // Actualizar solicitudes administrativas
        $this->actualizarAdministrativas();
        
        // Actualizar solicitudes de historia clínica
        $this->actualizarHistoriaClinica();
        
        $this->command->info('✅ Actualización completada!');
    }
    
    private function actualizarAdministrativas()
    {
        $solicitudes = SolicitudAdministrativa::all();
        
        $this->command->info("\n📋 Actualizando {$solicitudes->count()} solicitudes administrativas...");
        
        foreach ($solicitudes as $solicitud) {
            // Módulos administrativos con permisos aleatorios
            $modulosAdmin = [
                'facturacion' => $this->permisosAleatorios(),
                'anticipos' => $this->permisosAleatorios(),
                'farmacia' => $this->permisosAleatorios(),
                'suministros' => $this->permisosAleatorios(),
                'cartera' => $this->permisosAleatorios(),
                'glosas' => $this->permisosAleatorios(),
                'admisiones' => $this->permisosAleatorios(),
                'ayudasDiagnosticas' => $this->permisosAleatorios(),
                'citasMedicas' => $this->permisosAleatorios(),
                'cirugia' => $this->permisosAleatorios(),
                'rips' => $this->permisosAleatorios(),
                'anexos' => $this->permisosAleatorios(),
            ];
            
            // Módulos financieros con permisos aleatorios
            $modulosFinan = [
                'presupuesto' => $this->permisosAleatorios(),
                'activosFijos' => $this->permisosAleatorios(),
                'contabilidad' => $this->permisosAleatorios(),
                'cuentasPorPagar' => $this->permisosAleatorios(),
                'cajaYBancos' => $this->permisosAleatorios(),
                'costos' => $this->permisosAleatorios(),
                'administracionDocumentos' => $this->permisosAleatorios(),
            ];
            
            // Opciones web aleatorias
            $opcionesWeb = [
                'internet' => rand(0, 1) === 1,
                'correoElectronico' => rand(0, 1) === 1,
                'transferenciaArchivos' => rand(0, 1) === 1,
            ];
            
            $solicitud->update([
                'modulos_administrativos' => $modulosAdmin,
                'modulos_financieros' => $modulosFinan,
                'opciones_web' => $opcionesWeb,
            ]);
            
            $this->command->line("  ✓ Solicitud #{$solicitud->id} - {$solicitud->nombre_completo}");
        }
    }
    
    private function actualizarHistoriaClinica()
    {
        $solicitudes = SolicitudHistoriaClinica::all();
        
        $this->command->info("\n🏥 Actualizando {$solicitudes->count()} solicitudes de historia clínica...");
        
        $perfiles = [
            'Médico General',
            'Médico Especialista',
            'Médico Residente',
            'Enfermero Jefe',
            'Auxiliar de Enfermería',
            'Terapeuta',
            'Auditor',
        ];
        
        $terminales = ['Tablet', 'Portátil', 'Otro'];
        $vinculaciones = ['Interno', 'Externo'];
        
        foreach ($solicitudes as $solicitud) {
            $solicitud->update([
                'perfil' => $perfiles[array_rand($perfiles)],
                'terminal_asignado' => $terminales[array_rand($terminales)],
                'tipo_vinculacion' => $vinculaciones[array_rand($vinculaciones)],
                'capacitacion_historia_clinica' => [
                    'capacitacionRealizada' => rand(0, 1) === 1,
                    'nombreCapacitador' => 'Lic. ' . $this->nombreAleatorio(),
                    'fechaCapacitacion' => now()->subDays(rand(1, 30))->format('Y-m-d'),
                ],
                'capacitacion_epidemiologia' => [
                    'capacitacionRealizada' => rand(0, 1) === 1,
                    'nombreCapacitador' => 'Dr. ' . $this->nombreAleatorio(),
                    'fechaCapacitacion' => now()->subDays(rand(1, 30))->format('Y-m-d'),
                ],
                'aval_institucional' => [
                    'avaladoPor' => 'Dr. ' . $this->nombreAleatorio(),
                    'cargo' => 'Jefe de ' . ['Urgencias', 'Cirugía', 'Medicina Interna', 'Pediatría'][array_rand(['Urgencias', 'Cirugía', 'Medicina Interna', 'Pediatría'])],
                ],
            ]);
            
            $this->command->line("  ✓ Solicitud #{$solicitud->id} - {$solicitud->nombre_completo}");
        }
    }
    
    /**
     * Generar permisos aleatorios para un módulo
     * Al menos uno debe estar marcado
     */
    private function permisosAleatorios()
    {
        $permisos = [
            'adicionar' => rand(0, 1) === 1 ? 1 : '',
            'consultar' => rand(0, 1) === 1 ? 1 : '',
            'modificar' => rand(0, 1) === 1 ? 1 : '',
            'borrar' => rand(0, 1) === 1 ? 1 : '',
        ];
        
        // Asegurar que al menos uno esté marcado
        $tieneAlgunPermiso = false;
        foreach ($permisos as $valor) {
            if ($valor === 1) {
                $tieneAlgunPermiso = true;
                break;
            }
        }
        
        // Si ninguno está marcado, marcar "consultar" por defecto
        if (!$tieneAlgunPermiso) {
            $permisos['consultar'] = 1;
        }
        
        return $permisos;
    }
    
    /**
     * Generar nombre aleatorio
     */
    private function nombreAleatorio()
    {
        $nombres = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'José', 'Carmen', 'Luis', 'Patricia'];
        $apellidos = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'];
        
        return $nombres[array_rand($nombres)] . ' ' . $apellidos[array_rand($apellidos)];
    }
}
