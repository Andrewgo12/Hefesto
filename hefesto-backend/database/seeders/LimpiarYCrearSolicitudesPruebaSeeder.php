<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use Illuminate\Support\Facades\DB;

class LimpiarYCrearSolicitudesPruebaSeeder extends Seeder
{
    /**
     * Firma de texto de ejemplo con formato FIRMA_TEXTO
     */
    private function getFirmaEjemplo($nombreFirmante, $index = 0)
    {
        $fuentes = ['great-vibes', 'dancing-script', 'brush-script', 'edwardian'];
        $tamaños = [16, 18, 20, 22];
        
        $fuente = $fuentes[$index % count($fuentes)];
        $tamaño = $tamaños[$index % count($tamaños)];
        
        return "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamaño}";
    }
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "\n=== LIMPIANDO SOLICITUDES EXISTENTES ===\n";
        
        // Borrar todas las solicitudes
        DB::table('solicitudes_administrativas')->truncate();
        DB::table('solicitudes_historia_clinica')->truncate();
        
        echo "✓ Todas las solicitudes eliminadas\n";
        
        echo "\n=== CREANDO 10 SOLICITUDES ADMINISTRATIVAS ===\n";
        
        // Crear 10 solicitudes administrativas con diferentes estados de firmas
        for ($i = 1; $i <= 10; $i++) {
            $firmas = [];
            $estado = 'Pendiente';
            
            // Determinar cuántas firmas tendrá esta solicitud
            if ($i <= 4) {
                // Primeras 4: Sin firmas
                $firmas = [];
                $estado = 'Pendiente';
                echo "  Solicitud #{$i}: Sin firmas (Pendiente)\n";
            } elseif ($i <= 7) {
                // 5-7: Con todas las firmas pero En revisión
                $firmas = [
                    'Usuario' => [
                        'usuario' => "Usuario Admin {$i}",
                        'fecha' => now()->subDays(5)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo("Usuario Admin {$i}", 0),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe Inmediato' => [
                        'usuario' => 'Jefe Inmediato',
                        'fecha' => now()->subDays(4)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Inmediato', 1),
                        'credencial' => '2203',
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => '1230',
                    ],
                    'Coordinador TIC' => [
                        'usuario' => 'Coordinador TIC',
                        'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Coordinador TIC', 3),
                        'credencial' => '4567',
                    ],
                ];
                $estado = 'En revisión';
                echo "  Solicitud #{$i}: Con todas las firmas (En revisión)\n";
            } else {
                // 8-10: Con firmas parciales (1-3 firmas)
                $numFirmas = rand(1, 3);
                $firmasPosibles = [
                    'Usuario' => [
                        'usuario' => "Usuario Admin {$i}",
                        'fecha' => now()->subDays(5)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo("Usuario Admin {$i}", 0),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe Inmediato' => [
                        'usuario' => 'Jefe Inmediato',
                        'fecha' => now()->subDays(4)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Inmediato', 1),
                        'credencial' => '2203',
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => '1230',
                    ],
                ];
                
                $firmas = array_slice($firmasPosibles, 0, $numFirmas, true);
                $estado = 'En revisión';
                echo "  Solicitud #{$i}: Con {$numFirmas} firma(s) (En revisión)\n";
            }
            
            SolicitudAdministrativa::create([
                'codigo_formato' => 'FOR-GDI-SIS-004',
                'version' => '01',
                'fecha_solicitud' => now()->subDays(rand(1, 15)),
                'nombre_completo' => "Usuario Prueba Admin {$i}",
                'cedula' => '100000' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'cargo' => 'Analista de Sistemas ' . $i,
                'area_servicio' => ['Tecnología', 'Administración', 'Contabilidad', 'Talento Humano'][rand(0, 3)],
                'telefono_extension' => '100' . $i,
                'tipo_vinculacion' => ['Planta', 'Agremiado', 'Contrato'][rand(0, 2)],
                'modulos_administrativos' => [
                    'facturacion' => ['A' => (bool)rand(0, 1), 'C' => true, 'M' => false, 'B' => false],
                    'farmacia' => ['A' => false, 'C' => (bool)rand(0, 1), 'M' => false, 'B' => false],
                ],
                'modulos_financieros' => [
                    'presupuesto' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
                ],
                'perfil_de' => 'Administrativo',
                'opciones_web' => [
                    'internet' => (bool)rand(0, 1),
                    'correoElectronico' => true,
                    'transferenciaArchivos' => (bool)rand(0, 1),
                ],
                'login_asignado' => 'usuario.admin' . $i,
                'clave_temporal' => 'Temp' . rand(1000, 9999),
                'estado' => $estado,
                'acepta_responsabilidad' => true,
                'usuario_creador_id' => null,
                'registrado_por_nombre' => 'Sistema',
                'registrado_por_email' => 'sistema@hefesto.local',
                'firmas' => $firmas,
            ]);
        }
        
        echo "\n=== CREANDO 10 SOLICITUDES HISTORIA CLÍNICA ===\n";
        
        // Crear 10 solicitudes de historia clínica con diferentes estados de firmas
        for ($i = 1; $i <= 10; $i++) {
            $firmas = [];
            $estado = 'Pendiente';
            
            // Determinar cuántas firmas tendrá esta solicitud
            if ($i <= 4) {
                // Primeras 4: Sin firmas
                $firmas = [];
                $estado = 'Pendiente';
                echo "  Solicitud #{$i}: Sin firmas (Pendiente)\n";
            } elseif ($i <= 7) {
                // 5-7: Con todas las firmas pero En revisión
                $firmas = [
                    'Usuario' => [
                        'usuario' => "Dr. Usuario HC {$i}",
                        'fecha' => now()->subDays(5)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo("Dr. Usuario HC {$i}", 0),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe Inmediato' => [
                        'usuario' => 'Jefe Servicio',
                        'fecha' => now()->subDays(4)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Servicio', 1),
                        'credencial' => '2203',
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => '1230',
                    ],
                    'Coordinador TIC' => [
                        'usuario' => 'Coordinador TIC',
                        'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Coordinador TIC', 3),
                        'credencial' => '4567',
                    ],
                ];
                $estado = 'En revisión';
                echo "  Solicitud #{$i}: Con todas las firmas (En revisión)\n";
            } else {
                // 8-10: Con firmas parciales (1-3 firmas)
                $numFirmas = rand(1, 3);
                $firmasPosibles = [
                    'Usuario' => [
                        'usuario' => "Dr. Usuario HC {$i}",
                        'fecha' => now()->subDays(5)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo("Dr. Usuario HC {$i}", 0),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe Inmediato' => [
                        'usuario' => 'Jefe Servicio',
                        'fecha' => now()->subDays(4)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Servicio', 1),
                        'credencial' => '2203',
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => '1230',
                    ],
                ];
                
                $firmas = array_slice($firmasPosibles, 0, $numFirmas, true);
                $estado = 'En revisión';
                echo "  Solicitud #{$i}: Con {$numFirmas} firma(s) (En revisión)\n";
            }
            
            SolicitudHistoriaClinica::create([
                'codigo_formato' => 'FOR-GDI-SIS-005',
                'version' => '01',
                'fecha_solicitud' => now()->subDays(rand(1, 15)),
                'nombre_completo' => "Dr. Usuario Prueba HC {$i}",
                'cedula' => '200000' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'celular' => '300123456' . $i,
                'correo_electronico' => "doctor{$i}@hefesto.local",
                'registro_codigo' => 'RM-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'area_servicio' => ['Medicina Interna', 'Urgencias', 'Cirugía', 'Pediatría'][rand(0, 3)],
                'especialidad' => ['Cardiología', 'Neurología', 'Pediatría', 'Cirugía General'][rand(0, 3)],
                'observaciones' => 'Solicitud de prueba con estado variado',
                'perfil' => 'Médico especialista',
                'tipo_vinculacion' => ['Interno', 'Externo'][rand(0, 1)],
                'terminal_asignado' => ['Tablet', 'Portátil', 'Otro'][rand(0, 2)],
                'capacitacion_historia_clinica' => [
                    'capacitacionRealizada' => true,
                    'nombreCapacitador' => 'Capacitador HC',
                    'fechaCapacitacion' => now()->subDays(30)->format('Y-m-d'),
                ],
                'capacitacion_epidemiologia' => [
                    'capacitacionRealizada' => (bool)rand(0, 1),
                    'nombreCapacitador' => 'Capacitador Epi',
                    'fechaCapacitacion' => now()->subDays(25)->format('Y-m-d'),
                ],
                'aval_institucional' => [
                    'avaladoPor' => 'Jefe de Servicio',
                    'cargo' => 'Jefe Medicina Interna',
                ],
                'estado' => $estado,
                'acepta_responsabilidad' => true,
                'usuario_creador_id' => null,
                'registrado_por_nombre' => 'Sistema',
                'registrado_por_email' => 'sistema@hefesto.local',
                'firmas' => $firmas,
            ]);
        }
        
        echo "\n✅ PROCESO COMPLETADO\n";
        echo "Se crearon:\n";
        echo "- 10 solicitudes administrativas (4 sin firmas, 3 completas, 3 parciales)\n";
        echo "- 10 solicitudes de historia clínica (4 sin firmas, 3 completas, 3 parciales)\n";
        echo "\nEstados:\n";
        echo "- Pendiente: 8 solicitudes (sin firmas)\n";
        echo "- En revisión: 12 solicitudes (con firmas completas o parciales)\n";
        echo "- Aprobado: 0 solicitudes (ninguna aprobada)\n";
        echo "\nCredenciales de 4 dígitos activas:\n";
        echo "- Jefe Inmediato: 2203\n";
        echo "- Jefe de Talento Humano: 1230\n";
        echo "- Coordinador TIC: 4567\n";
    }
}
