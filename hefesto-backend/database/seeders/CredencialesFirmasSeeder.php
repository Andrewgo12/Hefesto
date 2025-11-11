<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CredencialFirma;

class CredencialesFirmasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $credenciales = [
            // Credenciales para formularios administrativos
            [
                'cargo' => 'Usuario',
                'nombre_completo' => 'Usuario Solicitante',
                'email' => 'usuario@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Variable',
                'activo' => true,
                'descripcion' => 'Usuario que solicita el acceso',
                'tipo_formulario' => 'ambos',
                'orden' => 1,
            ],
            [
                'cargo' => 'Vo. Bo. Jefe Inmediato',
                'nombre_completo' => 'Jefe de Área',
                'email' => 'jefe.inmediato@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Variable',
                'activo' => true,
                'descripcion' => 'Jefe inmediato que aprueba la solicitud',
                'tipo_formulario' => 'administrativa',
                'orden' => 2,
            ],
            [
                'cargo' => 'Vo. Bo. Jefe de Talento Humano',
                'nombre_completo' => 'Director de Talento Humano',
                'email' => 'talento.humano@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Talento Humano',
                'activo' => true,
                'descripcion' => 'Jefe de Talento Humano que valida la vinculación',
                'tipo_formulario' => 'administrativa',
                'orden' => 3,
            ],
            [
                'cargo' => 'Vo. Bo. Jefe Gestión de la Información',
                'nombre_completo' => 'Coordinador de Sistemas',
                'email' => 'sistemas@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Gestión de la Información',
                'activo' => true,
                'descripcion' => 'Jefe de Sistemas que crea el usuario',
                'tipo_formulario' => 'administrativa',
                'orden' => 4,
            ],
            
            // Credenciales para historia clínica
            [
                'cargo' => 'Aval Institucional',
                'nombre_completo' => 'Jefe de Servicio',
                'email' => 'jefe.servicio@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Variable',
                'activo' => true,
                'descripcion' => 'Jefe de servicio que avala al usuario',
                'tipo_formulario' => 'historia_clinica',
                'orden' => 2,
            ],
            [
                'cargo' => 'Capacitador Historia Clínica',
                'nombre_completo' => 'Capacitador HC',
                'email' => 'capacitador.hc@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Capacitación',
                'activo' => true,
                'descripcion' => 'Persona que capacita en historia clínica',
                'tipo_formulario' => 'historia_clinica',
                'orden' => 3,
            ],
            [
                'cargo' => 'Capacitador Epidemiología',
                'nombre_completo' => 'Capacitador Epidemiología',
                'email' => 'capacitador.epi@hospital.gov.co',
                'cedula' => null,
                'area_departamento' => 'Epidemiología',
                'activo' => true,
                'descripcion' => 'Persona que capacita en epidemiología',
                'tipo_formulario' => 'historia_clinica',
                'orden' => 4,
            ],
        ];

        foreach ($credenciales as $credencial) {
            CredencialFirma::create($credencial);
        }

        $this->command->info('✅ Credenciales de firmas creadas exitosamente');
    }
}
