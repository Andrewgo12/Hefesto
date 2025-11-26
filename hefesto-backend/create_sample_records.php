<?php

require __DIR__.'/vendor/autoload.php';

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== Creando Registros de Prueba ===\n\n";

// Obtener usuario autenticado (usaremos el primero disponible)
$user = \App\Models\User::first();
if (!$user) {
    echo "❌ No hay usuarios en la base de datos\n";
    exit(1);
}

echo "👤 Usuario creador: {$user->name} (ID: {$user->id})\n\n";

// ===== SOLICITUDES ADMINISTRATIVAS =====
echo "📋 Creando Solicitudes Administrativas...\n";

$solAdmin1 = SolicitudAdministrativa::create([
    'nombre_completo' => 'Carlos Andrés Martínez López',
    'cedula' => '1098765432',
    'cargo' => 'Contador',
    'area_servicio' => 'Contabilidad',
    'telefono_extension' => '3001234567',
    'tipo_vinculacion' => 'Planta',
    'modulos_administrativos' => json_encode(['Contabilidad', 'Presupuesto', 'Tesorería']),
    'modulos_financieros' => json_encode(['Cartera', 'Cuentas por pagar']),
    'anexos_nivel' => '2',
    'tipo_permiso' => json_encode(['Consulta', 'Modificación']),
    'perfil_de' => 'Contador Principal',
    'opciones_web' => json_encode(['Módulo Web Financiero']),
    'login_asignado' => 'cmartinez',
    'clave_temporal' => 'Temp2024!',
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 4,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Admin 1: {$solAdmin1->nombre_completo} - ID: {$solAdmin1->id}\n";

$solAdmin2 = SolicitudAdministrativa::create([
    'nombre_completo' => 'María Fernanda Rodríguez Pérez',
    'cedula' => '52345678',
    'cargo' => 'Auxiliar Administrativo',
    'area_servicio' => 'Recursos Humanos',
    'telefono_extension' => '3109876543',
    'tipo_vinculacion' => 'Contrato',
    'modulos_administrativos' => json_encode(['Nómina', 'Personal', 'Selección']),
    'anexos_nivel' => '1',
    'tipo_permiso' => json_encode(['Consulta']),
    'perfil_de' => 'Auxiliar RRHH',
    'login_asignado' => 'mrodriguez',
    'clave_temporal' => 'Temp2024!',
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 4,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Admin 2: {$solAdmin2->nombre_completo} - ID: {$solAdmin2->id}\n";

$solAdmin3 = SolicitudAdministrativa::create([
    'nombre_completo' => 'Jorge Luis Sánchez Torres',
    'cedula' => '80123456',
    'cargo' => 'Jefe de Compras',
    'area_servicio' => 'Logística y Compras',
    'telefono_extension' => '3157654321',
    'tipo_vinculacion' => 'Planta',
    'modulos_administrativos' => json_encode(['Compras', 'Inventarios', 'Proveedores']),
    'modulos_financieros' => json_encode(['Cuentas por pagar', 'Presupuesto']),
    'anexos_nivel' => '3',
    'tipo_permiso' => json_encode(['Consulta', 'Modificación', 'Aprobación']),
    'perfil_de' => 'Jefe de Área',
    'opciones_web' => json_encode(['Portal de Proveedores', 'Módulo Web Compras']),
    'login_asignado' => 'jsanchez',
    'clave_temporal' => 'Temp2024!',
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 4,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Admin 3: {$solAdmin3->nombre_completo} - ID: {$solAdmin3->id}\n\n";

// ===== SOLICITUDES ASISTENCIALES (HISTORIA CLÍNICA) =====
echo "🏥 Creando Solicitudes Asistenciales...\n";

$solHC1 = SolicitudHistoriaClinica::create([
    'nombre_completo' => 'Dra. Ana María Gómez Ruiz',
    'cedula' => '41234567',
    'registro_codigo' => 'RM-2024-001',
    'especialidad' => 'Medicina Interna',
    'correo_electronico' => 'ana.gomez@hospital.com',
    'celular' => '3201234567',
    'area_servicio' => 'Hospitalización - Piso 3',
    'tipo_vinculacion' => 'Planta',
    'capacitacion_historia_clinica' => true,
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 3,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Asistencial 1: {$solHC1->nombre_completo} - ID: {$solHC1->id}\n";

$solHC2 = SolicitudHistoriaClinica::create([
    'nombre_completo' => 'Enf. Patricia Ramírez Castro',
    'cedula' => '52987654',
    'registro_codigo' => 'ENF-2024-045',
    'especialidad' => 'Enfermería',
    'correo_electronico' => 'patricia.ramirez@hospital.com',
    'celular' => '3159876543',
    'area_servicio' => 'Urgencias',
    'tipo_vinculacion' => 'Planta',
    'capacitacion_historia_clinica' => true,
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 3,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Asistencial 2: {$solHC2->nombre_completo} - ID: {$solHC2->id}\n";

$solHC3 = SolicitudHistoriaClinica::create([
    'nombre_completo' => 'Dr. Roberto Jiménez Mora',
    'cedula' => '79456123',
    'registro_codigo' => 'RM-2024-089',
    'especialidad' => 'Cirugía General',
    'correo_electronico' => 'roberto.jimenez@hospital.com',
    'celular' => '3187654321',
    'area_servicio' => 'Cirugía - Quirófanos',
    'tipo_vinculacion' => 'Contrato',
    'capacitacion_historia_clinica' => true,
    'acepta_responsabilidad' => true,
    'estado' => 'Pendiente',
    'fase_actual' => 'Registro inicial',
    'fecha_solicitud' => now(),
    'usuario_creador_id' => $user->id,
    'registrado_por_nombre' => $user->name,
    'registrado_por_email' => $user->email,
    'firmas_pendientes' => 3,
    'firmas_completadas' => 0,
]);

echo "✅ Solicitud Asistencial 3: {$solHC3->nombre_completo} - ID: {$solHC3->id}\n\n";

echo "✅ COMPLETADO - Se crearon 6 registros de prueba (3 administrativos + 3 asistenciales)\n";
echo "\n📊 Resumen:\n";
echo "   - Solicitudes Administrativas: 3\n";
echo "   - Solicitudes Asistenciales: 3\n";
echo "   - Estado: Todas en 'Pendiente'\n";
echo "   - Creador: {$user->name}\n";
