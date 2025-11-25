<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompletarFirmasSolicitudesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Firmas con diferentes estilos para demostración
        $firmasEjemplo = [
            'FIRMA_TEXTO:Dr. Juan Pérez|FONT:brush-script|SIZE:32|STYLE:normal',
            'FIRMA_TEXTO:Dra. María González|FONT:dancing-script|SIZE:28|STYLE:normal',
            'FIRMA_TEXTO:Lic. Carlos Rodríguez|FONT:great-vibes|SIZE:30|STYLE:normal',
            'FIRMA_TEXTO:Ing. Ana Martínez|FONT:sacramento|SIZE:26|STYLE:normal',
            'FIRMA_TEXTO:Dr. Luis Fernández|FONT:allura|SIZE:32|STYLE:normal',
            'FIRMA_TEXTO:Dra. Patricia López|FONT:pacifico|SIZE:24|STYLE:normal',
            'FIRMA_TEXTO:Lic. Roberto Sánchez|FONT:playfair|SIZE:28|STYLE:normal',
            'FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal',
        ];

        $nombresEjemplo = [
            'Dr. Juan Pérez',
            'Dra. María González',
            'Lic. Carlos Rodríguez',
            'Ing. Ana Martínez',
            'Dr. Luis Fernández',
            'Dra. Patricia López',
            'Lic. Roberto Sánchez',
            'Ing. Laura Torres',
        ];

        // Actualizar solicitudes administrativas con firmas completas
        $solicitudesAdmin = DB::table('solicitudes_administrativas')
            ->whereNull('deleted_at')
            ->get();

        foreach ($solicitudesAdmin as $index => $solicitud) {
            $firmas = [
                [
                    'tipo' => 'solicitante',
                    'nombre' => $solicitud->nombre_completo,
                    'cargo' => 'Solicitante',
                    'firma' => $firmasEjemplo[$index % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 10))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'jefe_inmediato',
                    'nombre' => $nombresEjemplo[($index + 1) % count($nombresEjemplo)],
                    'cargo' => 'Jefe Inmediato',
                    'firma' => $firmasEjemplo[($index + 1) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 8))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'jefe_area',
                    'nombre' => $nombresEjemplo[($index + 2) % count($nombresEjemplo)],
                    'cargo' => 'Jefe de Área',
                    'firma' => $firmasEjemplo[($index + 2) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 6))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'gestion_humana',
                    'nombre' => $nombresEjemplo[($index + 3) % count($nombresEjemplo)],
                    'cargo' => 'Gestión Humana',
                    'firma' => $firmasEjemplo[($index + 3) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 4))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'sistemas',
                    'nombre' => $nombresEjemplo[($index + 4) % count($nombresEjemplo)],
                    'cargo' => 'Sistemas',
                    'firma' => $firmasEjemplo[($index + 4) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 2))->format('Y-m-d H:i:s'),
                ],
            ];

            DB::table('solicitudes_administrativas')
                ->where('id', $solicitud->id)
                ->update([
                    'firmas' => json_encode($firmas),
                    'firmas_completadas' => 5,
                    'firmas_pendientes' => 0,
                    'updated_at' => now(),
                ]);
        }

        // Actualizar solicitudes de historia clínica con firmas completas
        $solicitudesHC = DB::table('solicitudes_historia_clinica')
            ->whereNull('deleted_at')
            ->get();

        foreach ($solicitudesHC as $index => $solicitud) {
            $firmas = [
                [
                    'tipo' => 'solicitante',
                    'nombre' => $solicitud->nombre_completo,
                    'cargo' => 'Solicitante',
                    'firma' => $firmasEjemplo[$index % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 10))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'jefe_inmediato',
                    'nombre' => $nombresEjemplo[($index + 1) % count($nombresEjemplo)],
                    'cargo' => 'Jefe Inmediato',
                    'firma' => $firmasEjemplo[($index + 1) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 8))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'coordinador',
                    'nombre' => $nombresEjemplo[($index + 2) % count($nombresEjemplo)],
                    'cargo' => 'Coordinador',
                    'firma' => $firmasEjemplo[($index + 2) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 6))->format('Y-m-d H:i:s'),
                ],
                [
                    'tipo' => 'sistemas',
                    'nombre' => $nombresEjemplo[($index + 3) % count($nombresEjemplo)],
                    'cargo' => 'Sistemas',
                    'firma' => $firmasEjemplo[($index + 3) % count($firmasEjemplo)],
                    'fecha' => now()->subDays(rand(1, 2))->format('Y-m-d H:i:s'),
                ],
            ];

            DB::table('solicitudes_historia_clinica')
                ->where('id', $solicitud->id)
                ->update([
                    'firmas' => json_encode($firmas),
                    'firmas_completadas' => 4,
                    'firmas_pendientes' => 0,
                    'updated_at' => now(),
                ]);
        }

        $this->command->info('✅ Firmas completadas para todas las solicitudes');
        $this->command->info("   - {$solicitudesAdmin->count()} solicitudes administrativas actualizadas");
        $this->command->info("   - {$solicitudesHC->count()} solicitudes de historia clínica actualizadas");
    }
}
