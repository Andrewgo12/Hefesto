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
                'descripcion' => 'Credencial para jefe inmediato',
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Talento Humano',
                'credencial' => Hash::make('TALENTO2024'),
                'descripcion' => 'Credencial para jefe de talento humano',
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Gestión de la Información',
                'credencial' => Hash::make('GESTION2024'),
                'descripcion' => 'Credencial para jefe de gestión',
                'activo' => true,
            ],
            [
                'cargo' => 'Coordinador de Facturación o Subgerente Financiero',
                'credencial' => Hash::make('FINANZAS2024'),
                'descripcion' => 'Credencial para coordinador financiero',
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de historia clínica',
                'credencial' => Hash::make('CAPACITAHC2024'),
                'descripcion' => 'Credencial para capacitador HC',
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de epidemiología',
                'credencial' => Hash::make('CAPACITAEPI2024'),
                'descripcion' => 'Credencial para capacitador epidemiología',
                'activo' => true,
            ],
            [
                'cargo' => 'Aval institucional',
                'credencial' => Hash::make('AVAL2024'),
                'descripcion' => 'Credencial para aval institucional',
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
