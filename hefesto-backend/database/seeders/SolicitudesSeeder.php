<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\User;

class SolicitudesSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuario de prueba si no existe
        $user = User::firstOrCreate(
            ['email' => 'admin@hefesto.local'],
            [
                'name' => 'Administrador HEFESTO',
                'password' => bcrypt('password123'),
            ]
        );

        // Solicitudes Administrativas
        SolicitudAdministrativa::create([
            'codigo_formato' => 'FOR-GDI-SIS-004',
            'version' => '1',
            'fecha_solicitud' => now()->subDays(3),
            'nombre_completo' => 'Ana María Rodríguez López',
            'cedula' => '1023456789',
            'cargo' => 'Analista de Facturación',
            'area_servicio' => 'Facturación',
            'telefono_extension' => '555-1234 ext 101',
            'tipo_vinculacion' => 'Planta',
            'modulos_administrativos' => [
                'facturacion' => true,
                'cartera' => true,
                'glosas' => true,
                'anticipos' => false,
                'farmacia' => false,
                'suministros' => false,
                'admisiones' => false,
                'ayudasDiagnosticas' => false,
                'citasMedicas' => false,
                'cirugia' => false,
                'rips' => true,
                'anexos' => true,
            ],
            'modulos_financieros' => [],
            'tipo_permiso' => ['C', 'M'],
            'perfil_de' => 'Facturador Senior',
            'opciones_web' => [
                'internet' => true,
                'correoElectronico' => true,
                'transferenciaArchivos' => false,
                'otros' => '',
            ],
            'estado' => 'Pendiente',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);

        SolicitudAdministrativa::create([
            'codigo_formato' => 'FOR-GDI-SIS-004',
            'version' => '1',
            'fecha_solicitud' => now()->subDays(1),
            'nombre_completo' => 'Carlos Eduardo Martínez',
            'cedula' => '1098765432',
            'cargo' => 'Contador',
            'area_servicio' => 'Contabilidad',
            'telefono_extension' => '555-5678 ext 202',
            'tipo_vinculacion' => 'Contrato',
            'modulos_administrativos' => [],
            'modulos_financieros' => [
                'presupuesto' => true,
                'contabilidad' => true,
                'activosFijos' => true,
                'cuentasPorPagar' => true,
                'cajaYBancos' => true,
                'costos' => true,
                'administracionDocumentos' => true,
            ],
            'tipo_permiso' => ['C', 'M', 'A'],
            'perfil_de' => 'Contador General',
            'opciones_web' => [
                'internet' => true,
                'correoElectronico' => true,
                'transferenciaArchivos' => true,
                'otros' => '',
            ],
            'estado' => 'En revisión',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);

        SolicitudAdministrativa::create([
            'codigo_formato' => 'FOR-GDI-SIS-004',
            'version' => '1',
            'fecha_solicitud' => now()->subDays(7),
            'nombre_completo' => 'Laura Fernández García',
            'cedula' => '1034567890',
            'cargo' => 'Auxiliar Administrativo',
            'area_servicio' => 'Talento Humano',
            'telefono_extension' => '555-9999 ext 303',
            'tipo_vinculacion' => 'Planta',
            'modulos_administrativos' => [
                'admisiones' => true,
                'citasMedicas' => true,
                'facturacion' => false,
                'anticipos' => false,
                'farmacia' => false,
                'suministros' => false,
                'cartera' => false,
                'glosas' => false,
                'ayudasDiagnosticas' => false,
                'cirugia' => false,
                'rips' => false,
                'anexos' => false,
            ],
            'modulos_financieros' => [],
            'tipo_permiso' => ['C'],
            'perfil_de' => 'Auxiliar',
            'opciones_web' => [
                'internet' => true,
                'correoElectronico' => true,
                'transferenciaArchivos' => false,
                'otros' => '',
            ],
            'estado' => 'Aprobado',
            'login_asignado' => 'lfernandez',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);

        // Solicitudes Historia Clínica
        SolicitudHistoriaClinica::create([
            'codigo_formato' => 'FOR-GDI-SIS-003',
            'version' => '2',
            'fecha_solicitud' => now()->subDays(2),
            'nombre_completo' => 'Dr. Juan Carlos Pérez Gómez',
            'cedula' => '1045678901',
            'celular' => '300-1234567',
            'correo_electronico' => 'jperez@hospital.local',
            'registro_codigo' => 'RM-2024-001',
            'area_servicio' => 'Cardiología',
            'especialidad' => 'Cardiólogo',
            'observaciones' => 'Especialista en arritmias cardíacas',
            'perfil' => 'Médico especialista',
            'tipo_vinculacion' => 'Interno',
            'terminal_asignado' => 'Tablet',
            'capacitacion_historia_clinica' => [
                'capacitacionRealizada' => true,
                'nombreCapacitador' => 'Dr. Roberto Silva',
                'fechaCapacitacion' => now()->subDays(10)->format('Y-m-d'),
            ],
            'capacitacion_epidemiologia' => [
                'capacitacionRealizada' => true,
                'nombreCapacitador' => 'Dra. María González',
                'fechaCapacitacion' => now()->subDays(9)->format('Y-m-d'),
            ],
            'aval_institucional' => [
                'avaladoPor' => 'Dr. Fernando Castro',
                'cargo' => 'Jefe de Cardiología',
                'fecha' => now()->format('Y-m-d'),
            ],
            'estado' => 'Pendiente',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);

        SolicitudHistoriaClinica::create([
            'codigo_formato' => 'FOR-GDI-SIS-003',
            'version' => '2',
            'fecha_solicitud' => now()->subDays(5),
            'nombre_completo' => 'Enf. María Isabel Sánchez',
            'cedula' => '1056789012',
            'celular' => '310-9876543',
            'correo_electronico' => 'msanchez@hospital.local',
            'registro_codigo' => 'ENF-2024-015',
            'area_servicio' => 'Urgencias',
            'especialidad' => 'Enfermería de Urgencias',
            'observaciones' => '',
            'perfil' => 'Enfermero jefe',
            'tipo_vinculacion' => 'Interno',
            'terminal_asignado' => 'Portátil',
            'capacitacion_historia_clinica' => [
                'capacitacionRealizada' => true,
                'nombreCapacitador' => 'Ing. Ana López',
                'fechaCapacitacion' => now()->subDays(15)->format('Y-m-d'),
            ],
            'aval_institucional' => [
                'avaladoPor' => 'Dr. Luis Ramírez',
                'cargo' => 'Jefe de Urgencias',
                'fecha' => now()->format('Y-m-d'),
            ],
            'estado' => 'Aprobado',
            'login_creado_por' => 'Sistemas - Jorge Méndez',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);

        SolicitudHistoriaClinica::create([
            'codigo_formato' => 'FOR-GDI-SIS-003',
            'version' => '2',
            'fecha_solicitud' => now(),
            'nombre_completo' => 'Dr. Andrés Felipe Torres',
            'cedula' => '1067890123',
            'celular' => '320-5551234',
            'correo_electronico' => 'atorres@hospital.local',
            'registro_codigo' => 'MR-2024-008',
            'area_servicio' => 'Medicina Interna',
            'especialidad' => 'Medicina General',
            'observaciones' => 'Residente de segundo año',
            'perfil' => 'Médico residente',
            'tipo_vinculacion' => 'Interno',
            'terminal_asignado' => 'Tablet',
            'capacitacion_historia_clinica' => [
                'capacitacionRealizada' => false,
            ],
            'aval_institucional' => [
                'avaladoPor' => 'Dra. Patricia Moreno',
                'cargo' => 'Jefa de Medicina Interna',
                'fecha' => now()->format('Y-m-d'),
            ],
            'estado' => 'Pendiente',
            'acepta_responsabilidad' => true,
            'usuario_creador_id' => $user->id,
        ]);
    }
}
