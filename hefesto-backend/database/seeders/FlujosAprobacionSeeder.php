<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlujosAprobacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // FLUJO 1: Solicitud Administrativa
        $flujoAdmin = DB::table('flujos_aprobacion')->insertGetId([
            'nombre' => 'Flujo Solicitud Administrativa',
            'tipo_solicitud' => 'administrativo',
            'descripcion' => 'Flujo de aprobación para solicitudes administrativas',
            'total_pasos' => 4,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pasos del flujo administrativo
        $credenciales = DB::table('credenciales_firmas')->pluck('id', 'cargo');
        
        DB::table('pasos_aprobacion')->insert([
            [
                'flujo_id' => $flujoAdmin,
                'orden' => 1,
                'nombre_paso' => 'Aprobación Jefe Inmediato',
                'cargo_requerido' => 'Jefe inmediato',
                'credencial_firma_id' => $credenciales['Jefe inmediato'] ?? null,
                'descripcion' => 'El jefe inmediato debe aprobar la solicitud',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'flujo_id' => $flujoAdmin,
                'orden' => 2,
                'nombre_paso' => 'Aprobación Talento Humano',
                'cargo_requerido' => 'Jefe de Talento Humano',
                'credencial_firma_id' => $credenciales['Jefe de Talento Humano'] ?? null,
                'descripcion' => 'Talento Humano valida la información',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'flujo_id' => $flujoAdmin,
                'orden' => 3,
                'nombre_paso' => 'Aprobación Gestión de la Información',
                'cargo_requerido' => 'Jefe de Gestión de la Información',
                'credencial_firma_id' => $credenciales['Jefe de Gestión de la Información'] ?? null,
                'descripcion' => 'Gestión de la Información verifica accesos',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'flujo_id' => $flujoAdmin,
                'orden' => 4,
                'nombre_paso' => 'Aprobación Financiera',
                'cargo_requerido' => 'Coordinador de Facturación o Subgerente Financiero',
                'credencial_firma_id' => $credenciales['Coordinador de Facturación o Subgerente Financiero'] ?? null,
                'descripcion' => 'Aprobación financiera final',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // FLUJO 2: Solicitud Historia Clínica
        $flujoMedico = DB::table('flujos_aprobacion')->insertGetId([
            'nombre' => 'Flujo Solicitud Historia Clínica',
            'tipo_solicitud' => 'historia_clinica',
            'descripcion' => 'Flujo de aprobación para solicitudes de historia clínica',
            'total_pasos' => 3,
            'activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pasos del flujo médico
        DB::table('pasos_aprobacion')->insert([
            [
                'flujo_id' => $flujoMedico,
                'orden' => 1,
                'nombre_paso' => 'Capacitación Historia Clínica',
                'cargo_requerido' => 'Capacitador de historia clínica',
                'credencial_firma_id' => $credenciales['Capacitador de historia clínica'] ?? null,
                'descripcion' => 'Validación de capacitación en historia clínica',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'flujo_id' => $flujoMedico,
                'orden' => 2,
                'nombre_paso' => 'Capacitación Epidemiología',
                'cargo_requerido' => 'Capacitador de epidemiología',
                'credencial_firma_id' => $credenciales['Capacitador de epidemiología'] ?? null,
                'descripcion' => 'Validación de capacitación en epidemiología',
                'obligatorio' => false,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'flujo_id' => $flujoMedico,
                'orden' => 3,
                'nombre_paso' => 'Aval Institucional',
                'cargo_requerido' => 'Aval institucional',
                'credencial_firma_id' => $credenciales['Aval institucional'] ?? null,
                'descripcion' => 'Aval institucional final',
                'obligatorio' => true,
                'permite_rechazo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('✅ Flujos de aprobación creados');
        $this->command->info('📋 Flujo Administrativo: 4 pasos');
        $this->command->info('📋 Flujo Historia Clínica: 3 pasos');
    }
}
