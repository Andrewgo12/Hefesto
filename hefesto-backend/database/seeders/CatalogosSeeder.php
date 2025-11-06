<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;
use App\Models\Cargo;
use App\Models\Especialidad;

class CatalogosSeeder extends Seeder
{
    public function run(): void
    {
        // ÁREAS (20)
        $areas = [
            ['nombre' => 'Dirección General', 'codigo' => 'DIR-001'],
            ['nombre' => 'Administración', 'codigo' => 'ADM-001'],
            ['nombre' => 'Talento Humano', 'codigo' => 'TH-001'],
            ['nombre' => 'Contabilidad', 'codigo' => 'CON-001'],
            ['nombre' => 'Facturación', 'codigo' => 'FAC-001'],
            ['nombre' => 'Sistemas', 'codigo' => 'SIS-001'],
            ['nombre' => 'Medicina General', 'codigo' => 'MED-001'],
            ['nombre' => 'Urgencias', 'codigo' => 'URG-001'],
            ['nombre' => 'Hospitalización', 'codigo' => 'HOS-001'],
            ['nombre' => 'Cirugía', 'codigo' => 'CIR-001'],
            ['nombre' => 'Pediatría', 'codigo' => 'PED-001'],
            ['nombre' => 'Ginecología', 'codigo' => 'GIN-001'],
            ['nombre' => 'Laboratorio Clínico', 'codigo' => 'LAB-001'],
            ['nombre' => 'Imagenología', 'codigo' => 'IMG-001'],
            ['nombre' => 'Farmacia', 'codigo' => 'FAR-001'],
            ['nombre' => 'Enfermería', 'codigo' => 'ENF-001'],
            ['nombre' => 'Servicios Generales', 'codigo' => 'SER-001'],
            ['nombre' => 'Mantenimiento', 'codigo' => 'MAN-001'],
            ['nombre' => 'Seguridad', 'codigo' => 'SEG-001'],
            ['nombre' => 'Archivo', 'codigo' => 'ARC-001'],
        ];

        foreach ($areas as $area) {
            Area::create(array_merge($area, ['activo' => true]));
        }

        // ESPECIALIDADES MÉDICAS (30)
        $especialidades = [
            'Medicina General', 'Medicina Interna', 'Cardiología', 'Neurología',
            'Gastroenterología', 'Neumología', 'Nefrología', 'Endocrinología',
            'Reumatología', 'Hematología', 'Oncología', 'Dermatología',
            'Pediatría', 'Neonatología', 'Ginecología', 'Obstetricia',
            'Cirugía General', 'Cirugía Cardiovascular', 'Neurocirugía', 'Ortopedia',
            'Urología', 'Oftalmología', 'Otorrinolaringología', 'Psiquiatría',
            'Anestesiología', 'Radiología', 'Patología', 'Medicina Física',
            'Infectología', 'Geriatría'
        ];

        foreach ($especialidades as $index => $esp) {
            Especialidad::create([
                'nombre' => $esp,
                'codigo' => 'ESP-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'activo' => true
            ]);
        }

        // CARGOS (60+)
        $cargos = [
            // Administrativos
            ['nombre' => 'Director General', 'tipo' => 'administrativo', 'area_id' => 1],
            ['nombre' => 'Subdirector Administrativo', 'tipo' => 'administrativo', 'area_id' => 2],
            ['nombre' => 'Jefe de Talento Humano', 'tipo' => 'administrativo', 'area_id' => 3],
            ['nombre' => 'Analista de Talento Humano', 'tipo' => 'administrativo', 'area_id' => 3],
            ['nombre' => 'Auxiliar de Talento Humano', 'tipo' => 'administrativo', 'area_id' => 3],
            ['nombre' => 'Contador General', 'tipo' => 'administrativo', 'area_id' => 4],
            ['nombre' => 'Auxiliar Contable', 'tipo' => 'administrativo', 'area_id' => 4],
            ['nombre' => 'Jefe de Facturación', 'tipo' => 'administrativo', 'area_id' => 5],
            ['nombre' => 'Facturador', 'tipo' => 'administrativo', 'area_id' => 5],
            ['nombre' => 'Auditor de Cuentas', 'tipo' => 'administrativo', 'area_id' => 5],
            ['nombre' => 'Jefe de Sistemas', 'tipo' => 'tecnico', 'area_id' => 6],
            ['nombre' => 'Desarrollador', 'tipo' => 'tecnico', 'area_id' => 6],
            ['nombre' => 'Soporte Técnico', 'tipo' => 'tecnico', 'area_id' => 6],
            ['nombre' => 'Administrador de Base de Datos', 'tipo' => 'tecnico', 'area_id' => 6],
            ['nombre' => 'Secretaria Ejecutiva', 'tipo' => 'administrativo', 'area_id' => 1],
            ['nombre' => 'Recepcionista', 'tipo' => 'administrativo', 'area_id' => 2],
            ['nombre' => 'Auxiliar Administrativo', 'tipo' => 'administrativo', 'area_id' => 2],
            
            // Médicos
            ['nombre' => 'Médico General', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Médico Internista', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Cardiólogo', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Neurólogo', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Gastroenterólogo', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Neumólogo', 'tipo' => 'medico', 'area_id' => 7],
            ['nombre' => 'Médico de Urgencias', 'tipo' => 'medico', 'area_id' => 8],
            ['nombre' => 'Jefe de Urgencias', 'tipo' => 'medico', 'area_id' => 8],
            ['nombre' => 'Cirujano General', 'tipo' => 'medico', 'area_id' => 10],
            ['nombre' => 'Cirujano Cardiovascular', 'tipo' => 'medico', 'area_id' => 10],
            ['nombre' => 'Neurocirujano', 'tipo' => 'medico', 'area_id' => 10],
            ['nombre' => 'Pediatra', 'tipo' => 'medico', 'area_id' => 11],
            ['nombre' => 'Neonatólogo', 'tipo' => 'medico', 'area_id' => 11],
            ['nombre' => 'Ginecólogo', 'tipo' => 'medico', 'area_id' => 12],
            ['nombre' => 'Obstetra', 'tipo' => 'medico', 'area_id' => 12],
            
            // Enfermería
            ['nombre' => 'Jefe de Enfermería', 'tipo' => 'medico', 'area_id' => 16],
            ['nombre' => 'Enfermero Jefe', 'tipo' => 'medico', 'area_id' => 16],
            ['nombre' => 'Enfermero Profesional', 'tipo' => 'medico', 'area_id' => 16],
            ['nombre' => 'Auxiliar de Enfermería', 'tipo' => 'medico', 'area_id' => 16],
            ['nombre' => 'Instrumentador Quirúrgico', 'tipo' => 'medico', 'area_id' => 10],
            
            // Laboratorio e Imagenología
            ['nombre' => 'Jefe de Laboratorio', 'tipo' => 'tecnico', 'area_id' => 13],
            ['nombre' => 'Bacteriólogo', 'tipo' => 'tecnico', 'area_id' => 13],
            ['nombre' => 'Auxiliar de Laboratorio', 'tipo' => 'tecnico', 'area_id' => 13],
            ['nombre' => 'Radiólogo', 'tipo' => 'medico', 'area_id' => 14],
            ['nombre' => 'Técnico Radiólogo', 'tipo' => 'tecnico', 'area_id' => 14],
            ['nombre' => 'Ecografista', 'tipo' => 'tecnico', 'area_id' => 14],
            
            // Farmacia
            ['nombre' => 'Jefe de Farmacia', 'tipo' => 'tecnico', 'area_id' => 15],
            ['nombre' => 'Químico Farmacéutico', 'tipo' => 'tecnico', 'area_id' => 15],
            ['nombre' => 'Regente de Farmacia', 'tipo' => 'tecnico', 'area_id' => 15],
            ['nombre' => 'Auxiliar de Farmacia', 'tipo' => 'tecnico', 'area_id' => 15],
            
            // Servicios Generales
            ['nombre' => 'Jefe de Servicios Generales', 'tipo' => 'otro', 'area_id' => 17],
            ['nombre' => 'Auxiliar de Servicios Generales', 'tipo' => 'otro', 'area_id' => 17],
            ['nombre' => 'Conductor', 'tipo' => 'otro', 'area_id' => 17],
            ['nombre' => 'Camillero', 'tipo' => 'otro', 'area_id' => 17],
            ['nombre' => 'Jefe de Mantenimiento', 'tipo' => 'tecnico', 'area_id' => 18],
            ['nombre' => 'Técnico de Mantenimiento', 'tipo' => 'tecnico', 'area_id' => 18],
            ['nombre' => 'Electricista', 'tipo' => 'tecnico', 'area_id' => 18],
            ['nombre' => 'Plomero', 'tipo' => 'tecnico', 'area_id' => 18],
            ['nombre' => 'Jefe de Seguridad', 'tipo' => 'otro', 'area_id' => 19],
            ['nombre' => 'Vigilante', 'tipo' => 'otro', 'area_id' => 19],
            ['nombre' => 'Archivista', 'tipo' => 'administrativo', 'area_id' => 20],
            ['nombre' => 'Auxiliar de Archivo', 'tipo' => 'administrativo', 'area_id' => 20],
        ];

        foreach ($cargos as $index => $cargo) {
            Cargo::create(array_merge($cargo, [
                'codigo' => 'CAR-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'activo' => true
            ]));
        }

        $this->command->info('✅ Catálogos creados: 20 áreas, 30 especialidades, 60+ cargos');
    }
}
