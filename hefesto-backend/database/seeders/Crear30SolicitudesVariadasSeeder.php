<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\FirmaSolicitud;
use App\Models\PasoAprobacion;
use Illuminate\Support\Facades\DB;

class Crear30SolicitudesVariadasSeeder extends Seeder
{
    private $nombresCompletos = [
        'Dr. Carlos Andrés Martínez López',
        'Dra. María Fernanda García Ruiz',
        'Dr. Juan Pablo Rodríguez Sánchez',
        'Dra. Ana Sofía Hernández Castro',
        'Dr. Luis Eduardo Pérez Morales',
        'Dra. Carolina Jiménez Vargas',
        'Dr. Diego Alejandro Torres Ramírez',
        'Dra. Valentina Gómez Ortiz',
        'Dr. Santiago Muñoz Delgado',
        'Dra. Isabella Rojas Mendoza',
        'Dr. Sebastián Castro Herrera',
        'Dra. Camila Díaz Flores',
        'Dr. Mateo Silva Reyes',
        'Dra. Lucía Moreno Gutiérrez',
        'Dr. Daniel Vargas Acosta',
        'Dra. Gabriela Ríos Salazar',
        'Dr. Andrés Felipe Cortés Parra',
        'Dra. Natalia Suárez Medina',
        'Dr. Miguel Ángel Navarro Cruz',
        'Dra. Paula Andrea Vega Romero',
        'Dr. Ricardo Molina Estrada',
        'Dra. Juliana Campos Aguilar',
        'Dr. Felipe Cardona Mejía',
        'Dra. Daniela Ospina Valencia',
        'Dr. Alejandro Arias Quintero',
        'Dra. Laura Cristina Patiño León',
        'Dr. Nicolás Ramírez Duarte',
        'Dra. Andrea Milena Soto Castaño',
        'Dr. Jorge Iván Montoya Giraldo',
        'Dra. Catalina Escobar Marín'
    ];

    private $cargos = [
        'Médico General', 'Enfermera Jefe', 'Auxiliar Administrativo',
        'Coordinador de Área', 'Especialista en Cardiología', 'Terapeuta Físico',
        'Auxiliar de Enfermería', 'Administrador', 'Contador', 'Analista de Sistemas'
    ];

    private $areas = [
        'Urgencias', 'Consulta Externa', 'Hospitalización', 'Cirugía',
        'Pediatría', 'Ginecología', 'Administración', 'Contabilidad',
        'Recursos Humanos', 'Sistemas'
    ];

    private $especialidades = [
        'Medicina General', 'Cardiología', 'Pediatría', 'Ginecología',
        'Cirugía General', 'Ortopedia', 'Dermatología', 'Neurología',
        'Psiquiatría', 'Medicina Interna'
    ];

    private $fuentes = [
        'papyrus', 'brush-script', 'great-vibes', 'dancing-script',
        'pacifico', 'sacramento', 'allura', 'tangerine'
    ];

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Limpiar tablas
        SolicitudAdministrativa::truncate();
        SolicitudHistoriaClinica::truncate();
        FirmaSolicitud::truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        echo "🗑️  Tablas limpiadas\n";
        echo "📝 Creando 30 solicitudes variadas...\n\n";

        // Crear 15 solicitudes administrativas
        for ($i = 0; $i < 15; $i++) {
            $this->crearSolicitudAdministrativa($i);
        }

        // Crear 15 solicitudes de historia clínica
        for ($i = 0; $i < 15; $i++) {
            $this->crearSolicitudHistoriaClinica($i);
        }

        echo "\n✅ Seeder completado: 30 solicitudes creadas (15 admin + 15 HC)\n";
    }

    private function crearSolicitudAdministrativa($index)
    {
        $nombre = $this->nombresCompletos[$index];
        $cedula = '10' . str_pad($index + 1, 8, '0', STR_PAD_LEFT);
        
        // Determinar número de firmas (mínimo 1, máximo 4)
        $numFirmas = rand(1, 4);
        
        // Determinar estado basado en número de firmas
        $estados = ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'];
        if ($numFirmas === 4) {
            $estado = $estados[rand(0, 3)]; // Puede ser cualquiera
        } elseif ($numFirmas >= 2) {
            $estado = $estados[rand(0, 2)]; // Pendiente, En revisión o Aprobado
        } else {
            $estado = $estados[rand(0, 1)]; // Solo Pendiente o En revisión
        }

        $firmas = $this->generarFirmasAdministrativas($numFirmas);

        $solicitud = SolicitudAdministrativa::create([
            'codigo_formato' => 'FOR-GDI-SIS-004',
            'version' => '1',
            'fecha_emision' => '23/11/2020',
            'fecha_solicitud' => now()->subDays(rand(0, 30))->format('Y-m-d H:i:s'),
            'nombre_completo' => $nombre,
            'cedula' => $cedula,
            'cargo' => $this->cargos[array_rand($this->cargos)],
            'area_servicio' => $this->areas[array_rand($this->areas)],
            'telefono_extension' => '300' . rand(1000000, 9999999),
            'tipo_vinculacion' => ['Planta', 'Agremiado', 'Contrato'][rand(0, 2)],
            'modulos_administrativos' => json_encode($this->generarModulosAleatorios()),
            'modulos_financieros' => json_encode($this->generarModulosAleatorios()),
            'anexos_nivel' => rand(1, 3),
            'tipo_permiso' => json_encode([]),
            'perfil_de' => 'Perfil ' . ($index + 1),
            'opciones_web' => json_encode([
                'internet' => (bool)rand(0, 1),
                'correoElectronico' => (bool)rand(0, 1),
                'transferenciaArchivos' => (bool)rand(0, 1),
                'otros' => ''
            ]),
            'firmas' => json_encode($firmas),
            'login_asignado' => null,
            'clave_temporal' => null,
            'acepta_responsabilidad' => true,
            'estado' => $estado,
            'fase_actual' => $this->obtenerFaseActual($estado, $numFirmas),
            'firmas_pendientes' => 4 - $numFirmas,
            'firmas_completadas' => $numFirmas,
            'usuario_creador_id' => null,
            'registrado_por_nombre' => 'Sistema Seeder',
            'registrado_por_email' => 'seeder@hefesto.local'
        ]);

        // Guardar firmas en tabla firmas_solicitud
        $this->guardarFirmasEnTabla($solicitud, $firmas, 'App\Models\SolicitudAdministrativa');

        echo "✓ Admin #{$solicitud->id}: {$nombre} - {$numFirmas} firma(s) - {$estado}\n";
    }

    private function crearSolicitudHistoriaClinica($index)
    {
        $nombre = $this->nombresCompletos[$index + 15] ?? $this->nombresCompletos[$index];
        $cedula = '20' . str_pad($index + 1, 8, '0', STR_PAD_LEFT);
        
        // Determinar número de firmas (mínimo 1, máximo 4)
        $numFirmas = rand(1, 4);
        
        // Determinar estado
        $estados = ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'];
        if ($numFirmas === 4) {
            $estado = $estados[rand(0, 3)];
        } elseif ($numFirmas >= 2) {
            $estado = $estados[rand(0, 2)];
        } else {
            $estado = $estados[rand(0, 1)];
        }

        $firmas = $this->generarFirmasHistoriaClinica($numFirmas);

        $solicitud = SolicitudHistoriaClinica::create([
            'codigo_formato' => 'FOR-GDI-SIS-003',
            'version' => '2',
            'fecha_emision' => '18/08/2021',
            'fecha_solicitud' => now()->subDays(rand(0, 30))->format('Y-m-d H:i:s'),
            'nombre_completo' => $nombre,
            'cedula' => $cedula,
            'celular' => '310' . rand(1000000, 9999999),
            'correo_electronico' => strtolower(str_replace(' ', '.', explode(' Dr', $nombre)[0])) . '@hospital.com',
            'registro_codigo' => 'REG-' . str_pad($index + 1, 6, '0', STR_PAD_LEFT),
            'area_servicio' => $this->areas[array_rand($this->areas)],
            'especialidad' => $this->especialidades[array_rand($this->especialidades)],
            'perfil' => ['Médico General', 'Especialista', 'Enfermero Jefe'][rand(0, 2)],
            'tipo_vinculacion' => ['Interno', 'Externo'][rand(0, 1)],
            'terminal_asignado' => ['Tablet', 'Portátil', 'Otro'][rand(0, 2)],
            'capacitacion_historia_clinica' => json_encode(['capacitacionRealizada' => true]),
            'capacitacion_epidemiologia' => json_encode(['capacitacionRealizada' => (bool)rand(0, 1)]),
            'aval_institucional' => json_encode(['Dr. ' . $this->nombresCompletos[rand(0, 14)]]),
            'observaciones' => 'Solicitud generada automáticamente para pruebas',
            'firmas' => json_encode($firmas),
            'login_creado_por' => 'seeder@hefesto.local',
            'acepta_responsabilidad' => true,
            'estado' => $estado,
            'fase_actual' => $this->obtenerFaseActual($estado, $numFirmas),
            'firmas_pendientes' => 4 - $numFirmas,
            'firmas_completadas' => $numFirmas,
            'registrado_por_nombre' => 'Sistema Seeder',
            'registrado_por_email' => 'seeder@hefesto.local'
        ]);

        // Guardar firmas en tabla firmas_solicitud
        $this->guardarFirmasEnTabla($solicitud, $firmas, 'App\Models\SolicitudHistoriaClinica');

        echo "✓ HC #{$solicitud->id}: {$nombre} - {$numFirmas} firma(s) - {$estado}\n";
    }

    private function generarFirmasAdministrativas($cantidad)
    {
        $firmas = [];
        $cargosDisponibles = [
            'firmaUsuarioSolicitante',
            'jefeInmediato',
            'jefeTalentoHumano',
            'jefeGestionInformacion'
        ];

        for ($i = 0; $i < $cantidad; $i++) {
            $cargo = $cargosDisponibles[$i];
            $nombreFirmante = $this->nombresCompletos[rand(0, count($this->nombresCompletos) - 1)];
            $fuente = $this->fuentes[array_rand($this->fuentes)];
            $tamano = rand(18, 28);

            $firmas[$cargo] = [
                'firma' => "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamano}|STYLE:normal",
                'usuario' => $nombreFirmante,
                'fecha' => now()->subDays(rand(0, 10))->toISOString()
            ];
        }

        return $firmas;
    }

    private function generarFirmasHistoriaClinica($cantidad)
    {
        $firmas = [];
        $cargosDisponibles = [
            'firmaUsuarioSolicitante',
            'capacitadorHistoriaClinica',
            'capacitadorEpidemiologia',
            'avalInstitucional'
        ];

        for ($i = 0; $i < $cantidad; $i++) {
            $cargo = $cargosDisponibles[$i];
            $nombreFirmante = $this->nombresCompletos[rand(0, count($this->nombresCompletos) - 1)];
            $fuente = $this->fuentes[array_rand($this->fuentes)];
            $tamano = rand(18, 28);

            $firmas[$cargo] = [
                'firma' => "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamano}|STYLE:normal",
                'usuario' => $nombreFirmante,
                'fecha' => now()->subDays(rand(0, 10))->toISOString()
            ];
        }

        return $firmas;
    }

    private function guardarFirmasEnTabla($solicitud, $firmas, $tipo)
    {
        $mapaCargos = [
            'firmaUsuarioSolicitante' => 'Usuario solicitante',
            'jefeInmediato' => 'Jefe inmediato',
            'jefeTalentoHumano' => 'Jefe de Talento Humano',
            'jefeGestionInformacion' => 'Jefe de Gestión de la Información',
            'capacitadorHistoriaClinica' => 'Capacitador Historia Clínica',
            'capacitadorEpidemiologia' => 'Capacitador Epidemiología',
            'avalInstitucional' => 'Aval Institucional'
        ];

        foreach ($firmas as $cargoKey => $firmaData) {
            FirmaSolicitud::create([
                'solicitud_type' => $tipo,
                'solicitud_id' => $solicitud->id,
                'paso_aprobacion_id' => rand(1, 4),
                'firmado_por' => null,
                'nombre_firmante' => $firmaData['usuario'],
                'cargo_firmante' => $mapaCargos[$cargoKey] ?? $cargoKey,
                'firma_guardado' => $firmaData['firma'],
                'credencial_usada' => null,
                'estado' => 'aprobado',
                'fecha_firma' => $firmaData['fecha'],
                'ip_address' => '127.0.0.1'
            ]);
        }
    }

    private function generarModulosAleatorios()
    {
        $modulos = [
            'facturacion', 'anticipos', 'farmacia', 'suministros',
            'cartera', 'glosas', 'admisiones', 'ayudasDiagnosticas',
            'citasMedicas', 'cirugia', 'rips', 'anexos'
        ];

        $resultado = [];
        foreach ($modulos as $modulo) {
            $resultado[$modulo] = [
                'A' => (bool)rand(0, 1),
                'C' => (bool)rand(0, 1),
                'M' => (bool)rand(0, 1),
                'B' => (bool)rand(0, 1)
            ];
        }

        return $resultado;
    }

    private function obtenerFaseActual($estado, $numFirmas)
    {
        if ($estado === 'Aprobado') {
            return 'Aprobado';
        } elseif ($estado === 'Rechazado') {
            return 'Rechazado';
        } elseif ($numFirmas === 4) {
            return 'Pendiente aprobación final';
        } elseif ($numFirmas >= 2) {
            return 'En proceso de firmas';
        } else {
            return 'Pendiente firma(s)';
        }
    }
}
