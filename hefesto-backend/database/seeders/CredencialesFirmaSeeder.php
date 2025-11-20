<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CredencialFirma;
use Illuminate\Support\Facades\Hash;

class CredencialesFirmaSeeder extends Seeder
{
    public function run(): void
    {
        $credenciales = [
            [
                'cargo' => 'Jefe inmediato',
                'credencial' => Hash::make('JEFE2024'),
                'nombre_completo' => 'Jefe Inmediato',
                'email' => 'jefe.inmediato@hefesto.local',
                'descripcion' => 'Credencial para jefe inmediato',
                'tipo_formulario' => 'ambos',
                'orden' => 1,
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Talento Humano',
                'credencial' => Hash::make('TALENTO2024'),
                'nombre_completo' => 'Jefe Talento Humano',
                'email' => 'talento.humano@hefesto.local',
                'descripcion' => 'Credencial para jefe de talento humano',
                'tipo_formulario' => 'administrativa',
                'orden' => 2,
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Gestión de la Información',
                'credencial' => Hash::make('GESTION2024'),
                'nombre_completo' => 'Jefe Gestión Información',
                'email' => 'gestion.informacion@hefesto.local',
                'descripcion' => 'Credencial para jefe de gestión',
                'tipo_formulario' => 'ambos',
                'orden' => 3,
                'activo' => true,
            ],
            [
                'cargo' => 'Coordinador de Facturación o Subgerente Financiero',
                'credencial' => Hash::make('FINANZAS2024'),
                'nombre_completo' => 'Coordinador Financiero',
                'email' => 'coordinador.financiero@hefesto.local',
                'descripcion' => 'Credencial para coordinador financiero',
                'tipo_formulario' => 'administrativa',
                'orden' => 4,
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de historia clínica',
                'credencial' => Hash::make('CAPACITAHC2024'),
                'nombre_completo' => 'Capacitador HC',
                'email' => 'capacitador.hc@hefesto.local',
                'descripcion' => 'Credencial para capacitador HC',
                'tipo_formulario' => 'historia_clinica',
                'orden' => 5,
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de epidemiología',
                'credencial' => Hash::make('CAPACITAEPI2024'),
                'nombre_completo' => 'Capacitador Epidemiología',
                'email' => 'capacitador.epi@hefesto.local',
                'descripcion' => 'Credencial para capacitador epidemiología',
                'tipo_formulario' => 'historia_clinica',
                'orden' => 6,
                'activo' => true,
            ],
            [
                'cargo' => 'Aval institucional',
                'credencial' => Hash::make('AVAL2024'),
                'nombre_completo' => 'Aval Institucional',
                'email' => 'aval.institucional@hefesto.local',
                'descripcion' => 'Credencial para aval institucional',
                'tipo_formulario' => 'ambos',
                'orden' => 7,
                'activo' => true,
            ],
        ];

        foreach ($credenciales as $cred) {
            CredencialFirma::create($cred);
        }

        $this->command->info('✅ Credenciales de firma creadas');
        $this->command->info('🔑 Credenciales: JEFE2024, TALENTO2024, GESTION2024, etc.');
    }
}
