<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

class ActualizarCredencialesYCrearSolicitudesSeeder extends Seeder
{
    /**
     * Firma de texto de ejemplo con formato FIRMA_TEXTO
     */
    private function getFirmaEjemplo($nombreFirmante, $index = 0)
    {
        // Diferentes fuentes para variedad
        $fuentes = ['great-vibes', 'dancing-script', 'brush-script', 'edwardian'];
        $tamaños = [16, 18, 20, 22];
        
        $fuente = $fuentes[$index % count($fuentes)];
        $tamaño = $tamaños[$index % count($tamaños)];
        
        // Formato: FIRMA_TEXTO:nombre|FONT:id|SIZE:num
        return "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamaño}";
    }
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "\n=== CREANDO SOLICITUDES ADMINISTRATIVAS CON FIRMAS ===\n";
        
        // Crear 3 solicitudes administrativas
        for ($i = 1; $i <= 3; $i++) {
            $solicitud = SolicitudAdministrativa::create([
                'codigo_formato' => 'FOR-GDI-SIS-004',
                'version' => '01',
                'fecha_solicitud' => now()->subDays(rand(1, 10)),
                'nombre_completo' => "Usuario Prueba Admin {$i}",
                'cedula' => '100000' . $i,
                'cargo' => 'Analista de Sistemas ' . $i,
                'area_servicio' => 'Tecnología',
                'telefono_extension' => '100' . $i,
                'tipo_vinculacion' => 'Planta',
                'modulos_administrativos' => [
                    'facturacion' => ['A' => true, 'C' => true, 'M' => false, 'B' => false],
                    'farmacia' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
                ],
                'modulos_financieros' => [
                    'presupuesto' => ['A' => false, 'C' => true, 'M' => false, 'B' => false],
                ],
                'perfil_de' => 'Administrativo',
                'opciones_web' => [
                    'internet' => true,
                    'correoElectronico' => true,
                    'transferenciaArchivos' => false,
                ],
                'login_asignado' => 'usuario.admin' . $i,
                'clave_temporal' => 'Temp' . rand(1000, 9999),
                'estado' => 'Aprobado',
                'acepta_responsabilidad' => true,
                'usuario_creador_id' => null,
                'registrado_por_nombre' => 'Sistema',
                'registrado_por_email' => 'sistema@hefesto.local',
                // Agregar firmas directamente en la columna JSON
                'firmas' => [
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
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Coordinador TIC' => [
                        'usuario' => 'Coordinador TIC',
                        'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Coordinador TIC', 3),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                ],
            ]);
            
            echo "✓ Solicitud administrativa #{$solicitud->id} creada con 4 firmas\n";
        }
        
        echo "\n=== CREANDO SOLICITUDES HISTORIA CLÍNICA CON FIRMAS ===\n";
        
        // Crear 3 solicitudes de historia clínica
        for ($i = 1; $i <= 3; $i++) {
            $solicitud = SolicitudHistoriaClinica::create([
                'codigo_formato' => 'FOR-GDI-SIS-005',
                'version' => '01',
                'fecha_solicitud' => now()->subDays(rand(1, 10)),
                'nombre_completo' => "Dr. Usuario Prueba HC {$i}",
                'cedula' => '200000' . $i,
                'celular' => '300123456' . $i,
                'correo_electronico' => "doctor{$i}@hefesto.local",
                'registro_codigo' => 'RM-00' . $i,
                'area_servicio' => 'Medicina Interna',
                'especialidad' => 'Cardiología',
                'observaciones' => 'Solicitud de prueba con firmas completas',
                'perfil' => 'Médico especialista',
                'tipo_vinculacion' => 'Interno',
                'terminal_asignado' => 'Tablet',
                'capacitacion_historia_clinica' => [
                    'capacitacionRealizada' => true,
                    'nombreCapacitador' => 'Capacitador HC',
                    'fechaCapacitacion' => now()->subDays(30)->format('Y-m-d'),
                ],
                'capacitacion_epidemiologia' => [
                    'capacitacionRealizada' => true,
                    'nombreCapacitador' => 'Capacitador Epi',
                    'fechaCapacitacion' => now()->subDays(25)->format('Y-m-d'),
                ],
                'aval_institucional' => [
                    'avaladoPor' => 'Jefe de Servicio',
                    'cargo' => 'Jefe Medicina Interna',
                ],
                'estado' => 'Aprobado',
                'acepta_responsabilidad' => true,
                'usuario_creador_id' => null,
                'registrado_por_nombre' => 'Sistema',
                'registrado_por_email' => 'sistema@hefesto.local',
                // Agregar firmas directamente en la columna JSON
                'firmas' => [
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
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Jefe de Talento Humano' => [
                        'usuario' => 'Jefe Talento Humano',
                        'fecha' => now()->subDays(3)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Jefe Talento Humano', 2),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                    'Coordinador TIC' => [
                        'usuario' => 'Coordinador TIC',
                        'fecha' => now()->subDays(2)->format('Y-m-d H:i:s'),
                        'firma' => $this->getFirmaEjemplo('Coordinador TIC', 3),
                        'credencial' => str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                    ],
                ],
            ]);
            
            echo "✓ Solicitud historia clínica #{$solicitud->id} creada con 4 firmas\n";
        }
        
        echo "\n✅ PROCESO COMPLETADO\n";
        echo "Se crearon:\n";
        echo "- 3 solicitudes administrativas con firmas completas (credenciales de 4 dígitos)\n";
        echo "- 3 solicitudes de historia clínica con firmas completas (credenciales de 4 dígitos)\n";
        echo "\nAhora puedes exportar estas solicitudes a Excel para verificar las firmas.\n";
    }
}
