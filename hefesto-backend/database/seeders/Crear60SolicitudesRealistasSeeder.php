<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\FirmaSolicitud;
use Illuminate\Support\Facades\DB;

class Crear60SolicitudesRealistasSeeder extends Seeder
{
    private $personasAdministrativas = [
        ['nombre' => 'María Camila Rodríguez Pérez', 'cargo' => 'Auxiliar Administrativa', 'area' => 'Recursos Humanos'],
        ['nombre' => 'Carlos Andrés Martínez Gómez', 'cargo' => 'Contador Senior', 'area' => 'Contabilidad'],
        ['nombre' => 'Ana Sofía Hernández Castro', 'cargo' => 'Coordinadora de Facturación', 'area' => 'Facturación'],
        ['nombre' => 'Luis Fernando García Ruiz', 'cargo' => 'Analista de Sistemas', 'area' => 'Tecnología'],
        ['nombre' => 'Diana Carolina Jiménez Vargas', 'cargo' => 'Asistente de Cartera', 'area' => 'Cartera'],
        ['nombre' => 'Jorge Iván Torres Ramírez', 'cargo' => 'Jefe de Compras', 'area' => 'Suministros'],
        ['nombre' => 'Valentina Gómez Ortiz', 'cargo' => 'Auxiliar de Farmacia', 'area' => 'Farmacia'],
        ['nombre' => 'Santiago Muñoz Delgado', 'cargo' => 'Coordinador de Admisiones', 'area' => 'Admisiones'],
        ['nombre' => 'Isabella Rojas Mendoza', 'cargo' => 'Analista Financiera', 'area' => 'Finanzas'],
        ['nombre' => 'Sebastián Castro Herrera', 'cargo' => 'Auxiliar de Archivo', 'area' => 'Administración'],
        ['nombre' => 'Camila Díaz Flores', 'cargo' => 'Secretaria Ejecutiva', 'area' => 'Gerencia'],
        ['nombre' => 'Mateo Silva Reyes', 'cargo' => 'Técnico de Mantenimiento', 'area' => 'Servicios Generales'],
        ['nombre' => 'Lucía Moreno Gutiérrez', 'cargo' => 'Coordinadora de Calidad', 'area' => 'Calidad'],
        ['nombre' => 'Daniel Vargas Acosta', 'cargo' => 'Auxiliar de Tesorería', 'area' => 'Tesorería'],
        ['nombre' => 'Gabriela Ríos Salazar', 'cargo' => 'Asistente de Gerencia', 'area' => 'Gerencia'],
        ['nombre' => 'Andrés Felipe Cortés Parra', 'cargo' => 'Analista de Costos', 'area' => 'Costos'],
        ['nombre' => 'Natalia Suárez Medina', 'cargo' => 'Coordinadora de Talento Humano', 'area' => 'Recursos Humanos'],
        ['nombre' => 'Miguel Ángel Navarro Cruz', 'cargo' => 'Jefe de Sistemas', 'area' => 'Tecnología'],
        ['nombre' => 'Paula Andrea Vega Romero', 'cargo' => 'Auxiliar de Nómina', 'area' => 'Recursos Humanos'],
        ['nombre' => 'Ricardo Molina Estrada', 'cargo' => 'Coordinador de Glosas', 'area' => 'Glosas'],
        ['nombre' => 'Juliana Campos Aguilar', 'cargo' => 'Asistente Contable', 'area' => 'Contabilidad'],
        ['nombre' => 'Felipe Cardona Mejía', 'cargo' => 'Analista de Presupuesto', 'area' => 'Presupuesto'],
        ['nombre' => 'Daniela Ospina Valencia', 'cargo' => 'Coordinadora de Compras', 'area' => 'Suministros'],
        ['nombre' => 'Alejandro Arias Quintero', 'cargo' => 'Auxiliar de Activos Fijos', 'area' => 'Activos Fijos'],
        ['nombre' => 'Laura Cristina Patiño León', 'cargo' => 'Jefe de Facturación', 'area' => 'Facturación'],
        ['nombre' => 'Nicolás Ramírez Duarte', 'cargo' => 'Técnico de Soporte', 'area' => 'Tecnología'],
        ['nombre' => 'Andrea Milena Soto Castaño', 'cargo' => 'Coordinadora Administrativa', 'area' => 'Administración'],
        ['nombre' => 'Jorge Enrique Montoya Giraldo', 'cargo' => 'Auxiliar de Cuentas por Pagar', 'area' => 'Cuentas por Pagar'],
        ['nombre' => 'Catalina Escobar Marín', 'cargo' => 'Asistente de Auditoría', 'area' => 'Auditoría'],
        ['nombre' => 'David Alfonso Henao Zapata', 'cargo' => 'Coordinador de Servicios', 'area' => 'Servicios Generales']
    ];

    private $personasMedicas = [
        ['nombre' => 'Dr. Juan Carlos Ramírez López', 'especialidad' => 'Medicina General', 'area' => 'Consulta Externa'],
        ['nombre' => 'Dra. María Fernanda Sánchez Ruiz', 'especialidad' => 'Pediatría', 'area' => 'Pediatría'],
        ['nombre' => 'Dr. Luis Eduardo Pérez Morales', 'especialidad' => 'Cardiología', 'area' => 'Cardiología'],
        ['nombre' => 'Dra. Carolina Jiménez Vargas', 'especialidad' => 'Ginecología', 'area' => 'Ginecología'],
        ['nombre' => 'Dr. Diego Alejandro Torres Ramírez', 'especialidad' => 'Cirugía General', 'area' => 'Cirugía'],
        ['nombre' => 'Dra. Valentina Gómez Ortiz', 'especialidad' => 'Medicina Interna', 'area' => 'Hospitalización'],
        ['nombre' => 'Dr. Santiago Muñoz Delgado', 'especialidad' => 'Ortopedia', 'area' => 'Ortopedia'],
        ['nombre' => 'Dra. Isabella Rojas Mendoza', 'especialidad' => 'Dermatología', 'area' => 'Consulta Externa'],
        ['nombre' => 'Dr. Sebastián Castro Herrera', 'especialidad' => 'Neurología', 'area' => 'Neurología'],
        ['nombre' => 'Dra. Camila Díaz Flores', 'especialidad' => 'Psiquiatría', 'area' => 'Salud Mental'],
        ['nombre' => 'Dr. Mateo Silva Reyes', 'especialidad' => 'Medicina General', 'area' => 'Urgencias'],
        ['nombre' => 'Dra. Lucía Moreno Gutiérrez', 'especialidad' => 'Pediatría', 'area' => 'Pediatría'],
        ['nombre' => 'Dr. Daniel Vargas Acosta', 'especialidad' => 'Anestesiología', 'area' => 'Cirugía'],
        ['nombre' => 'Dra. Gabriela Ríos Salazar', 'especialidad' => 'Radiología', 'area' => 'Imágenes Diagnósticas'],
        ['nombre' => 'Dr. Andrés Felipe Cortés Parra', 'especialidad' => 'Urología', 'area' => 'Urología'],
        ['nombre' => 'Dra. Natalia Suárez Medina', 'especialidad' => 'Oftalmología', 'area' => 'Oftalmología'],
        ['nombre' => 'Dr. Miguel Ángel Navarro Cruz', 'especialidad' => 'Otorrinolaringología', 'area' => 'ORL'],
        ['nombre' => 'Dra. Paula Andrea Vega Romero', 'especialidad' => 'Endocrinología', 'area' => 'Consulta Externa'],
        ['nombre' => 'Dr. Ricardo Molina Estrada', 'especialidad' => 'Gastroenterología', 'area' => 'Gastroenterología'],
        ['nombre' => 'Dra. Juliana Campos Aguilar', 'especialidad' => 'Reumatología', 'area' => 'Consulta Externa'],
        ['nombre' => 'Dr. Felipe Cardona Mejía', 'especialidad' => 'Medicina General', 'area' => 'Urgencias'],
        ['nombre' => 'Dra. Daniela Ospina Valencia', 'especialidad' => 'Ginecología', 'area' => 'Ginecología'],
        ['nombre' => 'Dr. Alejandro Arias Quintero', 'especialidad' => 'Cirugía Plástica', 'area' => 'Cirugía'],
        ['nombre' => 'Dra. Laura Cristina Patiño León', 'especialidad' => 'Medicina Interna', 'area' => 'Hospitalización'],
        ['nombre' => 'Dr. Nicolás Ramírez Duarte', 'especialidad' => 'Neumología', 'area' => 'Neumología'],
        ['nombre' => 'Dra. Andrea Milena Soto Castaño', 'especialidad' => 'Hematología', 'area' => 'Hematología'],
        ['nombre' => 'Dr. Jorge Enrique Montoya Giraldo', 'especialidad' => 'Nefrología', 'area' => 'Nefrología'],
        ['nombre' => 'Dra. Catalina Escobar Marín', 'especialidad' => 'Infectología', 'area' => 'Infectología'],
        ['nombre' => 'Dr. David Alfonso Henao Zapata', 'especialidad' => 'Medicina General', 'area' => 'Consulta Externa'],
        ['nombre' => 'Dra. Sofía Alejandra Mejía Ríos', 'especialidad' => 'Pediatría', 'area' => 'Pediatría']
    ];

    private $firmantes = [
        'Dr. Roberto Carlos Mendoza Silva',
        'Dra. Patricia Elena Gómez Ruiz',
        'Ing. Fernando Andrés López Castro',
        'Lic. Gloria María Hernández Pérez',
        'Dr. Alberto José Ramírez Vargas',
        'Dra. Claudia Marcela Torres Jiménez',
        'Lic. Eduardo Antonio Díaz Morales',
        'Dra. Beatriz Elena Rojas Sánchez',
        'Ing. Mauricio Alejandro Castro Ortiz',
        'Lic. Sandra Milena Vargas Delgado'
    ];

    private $fuentes = [
        'papyrus', 'brush-script', 'great-vibes', 'dancing-script',
        'pacifico', 'sacramento', 'allura', 'tangerine'
    ];

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        SolicitudAdministrativa::truncate();
        SolicitudHistoriaClinica::truncate();
        FirmaSolicitud::truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        echo "🗑️  Base de datos limpiada\n";
        echo "📝 Creando 60 solicitudes con datos realistas...\n\n";

        // Crear 30 solicitudes administrativas
        for ($i = 0; $i < 30; $i++) {
            $this->crearSolicitudAdministrativa($i);
        }

        // Crear 30 solicitudes de historia clínica
        for ($i = 0; $i < 30; $i++) {
            $this->crearSolicitudHistoriaClinica($i);
        }

        echo "\n✅ Seeder completado: 60 solicitudes creadas (30 administrativas + 30 médicas)\n";
        echo "   Estados: Aprobado, En revisión, Pendiente, Rechazado (variados)\n";
        echo "   Firmas: Entre 1 y 4 firmas por solicitud\n";
    }

    private function crearSolicitudAdministrativa($index)
    {
        $persona = $this->personasAdministrativas[$index];
        $cedula = '10' . str_pad(rand(100000, 999999), 8, '0', STR_PAD_LEFT);
        
        $numFirmas = rand(1, 4);
        $estado = $this->determinarEstado($numFirmas);
        $firmas = $this->generarFirmasAdministrativas($numFirmas);

        $solicitud = SolicitudAdministrativa::create([
            'fecha_solicitud' => now()->subDays(rand(1, 45))->format('Y-m-d H:i:s'),
            'nombre_completo' => $persona['nombre'],
            'cedula' => $cedula,
            'cargo' => $persona['cargo'],
            'area_servicio' => $persona['area'],
            'telefono_extension' => '(601) ' . rand(300, 399) . '-' . rand(1000, 9999),
            'tipo_vinculacion' => ['Planta', 'Agremiado', 'Contrato'][rand(0, 2)],
            'modulos_administrativos' => json_encode($this->generarModulosAleatorios()),
            'modulos_financieros' => json_encode($this->generarModulosAleatorios()),
            'anexos_nivel' => rand(1, 3),
            'tipo_permiso' => json_encode([]),
            'perfil_de' => $persona['cargo'],
            'opciones_web' => json_encode([
                'internet' => (bool)rand(0, 1),
                'correoElectronico' => true,
                'transferenciaArchivos' => (bool)rand(0, 1),
                'otros' => ''
            ]),
            'firmas' => json_encode($firmas),
            'acepta_responsabilidad' => true,
            'estado' => $estado,
            'fase_actual' => $this->obtenerFaseActual($estado, $numFirmas),
            'firmas_pendientes' => 4 - $numFirmas,
            'firmas_completadas' => $numFirmas,
            'usuario_creador_id' => null,
            'registrado_por_nombre' => $this->firmantes[rand(0, count($this->firmantes) - 1)],
            'registrado_por_email' => $this->generarEmail($persona['nombre'])
        ]);

        $this->guardarFirmasEnTabla($solicitud, $firmas, 'App\Models\SolicitudAdministrativa');

        echo "✓ Admin #{$solicitud->id}: {$persona['nombre']} - {$numFirmas} firma(s) - {$estado}\n";
    }

    private function crearSolicitudHistoriaClinica($index)
    {
        $persona = $this->personasMedicas[$index];
        $cedula = '20' . str_pad(rand(100000, 999999), 8, '0', STR_PAD_LEFT);
        
        $numFirmas = rand(1, 4);
        $estado = $this->determinarEstado($numFirmas);
        $firmas = $this->generarFirmasHistoriaClinica($numFirmas);

        $solicitud = SolicitudHistoriaClinica::create([
            'fecha_solicitud' => now()->subDays(rand(1, 45))->format('Y-m-d H:i:s'),
            'nombre_completo' => $persona['nombre'],
            'cedula' => $cedula,
            'celular' => '(+57) ' . rand(300, 321) . ' ' . rand(100, 999) . ' ' . rand(1000, 9999),
            'correo_electronico' => $this->generarEmail($persona['nombre']),
            'registro_codigo' => 'RM-' . str_pad(rand(1000, 9999), 6, '0', STR_PAD_LEFT),
            'area_servicio' => $persona['area'],
            'especialidad' => $persona['especialidad'],
            'perfil' => 'Médico general',
            'tipo_vinculacion' => ['Interno', 'Externo'][rand(0, 1)],
            'terminal_asignado' => ['Tablet', 'Portátil'][rand(0, 1)],
            'capacitacion_historia_clinica' => json_encode(['capacitacionRealizada' => true]),
            'capacitacion_epidemiologia' => json_encode(['capacitacionRealizada' => (bool)rand(0, 1)]),
            'aval_institucional' => json_encode([$this->firmantes[rand(0, count($this->firmantes) - 1)]]),
            'observaciones' => $this->generarObservacion(),
            'firmas' => json_encode($firmas),
            'login_creado_por' => $this->generarEmail($this->firmantes[0]),
            'acepta_responsabilidad' => true,
            'estado' => $estado,
            'fase_actual' => $this->obtenerFaseActual($estado, $numFirmas),
            'firmas_pendientes' => 4 - $numFirmas,
            'firmas_completadas' => $numFirmas,
            'registrado_por_nombre' => $this->firmantes[rand(0, count($this->firmantes) - 1)],
            'registrado_por_email' => $this->generarEmail($this->firmantes[1])
        ]);

        $this->guardarFirmasEnTabla($solicitud, $firmas, 'App\Models\SolicitudHistoriaClinica');

        echo "✓ HC #{$solicitud->id}: {$persona['nombre']} - {$numFirmas} firma(s) - {$estado}\n";
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
            $nombreFirmante = $this->firmantes[rand(0, count($this->firmantes) - 1)];
            $fuente = $this->fuentes[array_rand($this->fuentes)];
            $tamano = rand(20, 26);

            $firmas[$cargo] = [
                'firma' => "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamano}|STYLE:normal",
                'usuario' => $nombreFirmante,
                'fecha' => now()->subDays(rand(0, 15))->subHours(rand(0, 23))->toISOString()
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
            $nombreFirmante = $this->firmantes[rand(0, count($this->firmantes) - 1)];
            $fuente = $this->fuentes[array_rand($this->fuentes)];
            $tamano = rand(20, 26);

            $firmas[$cargo] = [
                'firma' => "FIRMA_TEXTO:{$nombreFirmante}|FONT:{$fuente}|SIZE:{$tamano}|STYLE:normal",
                'usuario' => $nombreFirmante,
                'fecha' => now()->subDays(rand(0, 15))->subHours(rand(0, 23))->toISOString()
            ];
        }

        return $firmas;
    }

    private function guardarFirmasEnTabla($solicitud, $firmas, $tipo)
    {
        $mapaCargos = [
            'firmaUsuarioSolicitante' => 'Usuario Solicitante',
            'jefeInmediato' => 'Jefe Inmediato',
            'jefeTalentoHumano' => 'Jefe de Talento Humano',
            'jefeGestionInformacion' => 'Coordinador TIC',
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
                'ip_address' => '10.0.' . rand(1, 255) . '.' . rand(1, 255)
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
            $tienePermiso = (bool)rand(0, 1);
            $resultado[$modulo] = [
                'A' => $tienePermiso && (bool)rand(0, 1),
                'C' => $tienePermiso,
                'M' => $tienePermiso && (bool)rand(0, 1),
                'B' => $tienePermiso && (bool)rand(0, 2) === 0
            ];
        }

        return $resultado;
    }

    private function determinarEstado($numFirmas)
    {
        if ($numFirmas === 4) {
            return ['Aprobado', 'En revisión', 'Pendiente'][rand(0, 2)];
        } elseif ($numFirmas >= 2) {
            return ['En revisión', 'Pendiente'][rand(0, 1)];
        } else {
            return 'Pendiente';
        }
    }

    private function obtenerFaseActual($estado, $numFirmas)
    {
        if ($estado === 'Aprobado') {
            return 'Solicitud aprobada';
        } elseif ($estado === 'Rechazado') {
            return 'Solicitud rechazada';
        } elseif ($numFirmas === 4) {
            return 'Pendiente aprobación final';
        } elseif ($numFirmas >= 2) {
            return 'En proceso de revisión';
        } else {
            return 'Pendiente de firmas';
        }
    }

    private function generarEmail($nombreCompleto)
    {
        $nombre = strtolower(str_replace(['Dr. ', 'Dra. ', 'Ing. ', 'Lic. ', ' '], ['', '', '', '', '.'], $nombreCompleto));
        return $nombre . '@hospital.gov.co';
    }

    private function generarObservacion()
    {
        $observaciones = [
            'Solicitud de acceso para atención de pacientes en área asignada',
            'Requiere acceso urgente por inicio de labores',
            'Renovación de credenciales por cambio de área',
            'Acceso temporal por reemplazo de personal',
            'Solicitud estándar de acceso al sistema',
            'Requiere permisos adicionales para consulta de historias',
            'Acceso necesario para cumplimiento de funciones',
            'Solicitud por traslado interno de área',
            'Requiere actualización de permisos existentes',
            'Acceso para personal nuevo en el servicio'
        ];

        return $observaciones[array_rand($observaciones)];
    }
}
