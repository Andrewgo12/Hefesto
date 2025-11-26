<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Html;
use App\Services\OpenSpoutExportService;
use App\Services\CsvExportService;

class ExportacionController extends Controller
{
    protected $openSpoutService;
    protected $csvService;
    
    public function __construct(
        OpenSpoutExportService $openSpoutService,
        CsvExportService $csvService
    ) {
        $this->openSpoutService = $openSpoutService;
        $this->csvService = $csvService;
    }
    /**
     * Normalizar texto para comparación robusta
     * Elimina tildes, espacios, guiones y convierte a minúsculas
     */
    private function normalizarTexto($texto)
    {
        if (empty($texto)) {
            return '';
        }
        
        // Convertir a minúsculas
        $texto = mb_strtolower($texto, 'UTF-8');
        
        // Eliminar tildes y caracteres especiales
        $texto = str_replace(
            ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', 'à', 'è', 'ì', 'ò', 'ù'],
            ['a', 'e', 'i', 'o', 'u', 'n', 'u', 'a', 'e', 'i', 'o', 'u'],
            $texto
        );
        
        // Eliminar espacios, guiones, guiones bajos
        $texto = str_replace([' ', '-', '_'], '', $texto);
        
        return $texto;
    }
    
    /**
     * Verificar si un cargo coincide con alguna de las variantes
     */
    private function cargoCoincide($cargo, $variantes)
    {
        $cargoNormalizado = $this->normalizarTexto($cargo);
        
        foreach ($variantes as $variante) {
            $varianteNormalizada = $this->normalizarTexto($variante);
            
            // Buscar si la variante está contenida en el cargo
            if (stripos($cargoNormalizado, $varianteNormalizada) !== false) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Convertir cualquier dato a array de forma segura
     * Maneja: JSON string, JSON corrupto, array, objeto, null, string vacío
     */
    private function toArray($data)
    {
        // Si ya es null o vacío, retornar array vacío
        if (empty($data)) {
            return [];
        }
        
        // Si ya es array, retornarlo
        if (is_array($data)) {
            return $data;
        }
        
        // Si es objeto, convertir a array
        if (is_object($data)) {
            return json_decode(json_encode($data), true) ?: [];
        }
        
        // Si es string, intentar decodificar como JSON
        if (is_string($data)) {
            // Limpiar JSON corrupto (comillas extras, escapes dobles, etc.)
            $cleaned = $this->cleanJSON($data);
            
            $decoded = json_decode($cleaned, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
            
            // Si aún falla, intentar con stripslashes
            $decoded = json_decode(stripslashes($cleaned), true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
            
            // Si no es JSON válido, retornar array vacío
            return [];
        }
        
        // Para cualquier otro tipo, retornar array vacío
        return [];
    }
    
    /**
     * Limpiar JSON corrupto
     * Elimina comillas extras, escapes dobles, etc.
     */
    private function cleanJSON($json)
    {
        if (!is_string($json)) {
            return $json;
        }
        
        $json = trim($json);
        
        // Eliminar comillas dobles extras al inicio y final: ""{"key":"value"}""
        while (substr($json, 0, 2) === '""' && substr($json, -2) === '""') {
            $json = substr($json, 2, -2);
        }
        
        // Eliminar comilla simple extra al inicio y final: "{"key":"value"}"
        if (substr($json, 0, 1) === '"' && substr($json, -1) === '"' && substr($json, 1, 1) === '{') {
            $json = substr($json, 1, -1);
        }
        
        // Reemplazar escapes dobles: \\\" -> \"
        $json = str_replace('\\"', '"', $json);
        $json = str_replace('\\\\', '\\', $json);
        
        return $json;
    }
    
    /**
     * Obtener valor de array/JSON de forma segura
     * Maneja cualquier formato y retorna el valor o default
     */
    private function getValue($data, $key, $default = null)
    {
        $array = $this->toArray($data);
        return $array[$key] ?? $default;
    }
    
    /**
     * Verificar si un valor booleano es verdadero
     * Maneja: true, 1, "1", "true", "yes", "si", "sí"
     */
    private function isTrue($value)
    {
        if (is_bool($value)) {
            return $value;
        }
        
        if (is_numeric($value)) {
            return (int)$value === 1;
        }
        
        if (is_string($value)) {
            $value = strtolower(trim($value));
            return in_array($value, ['1', 'true', 'yes', 'si', 'sí', 'verdadero']);
        }
        
        return false;
    }
    
    /**
     * Obtener fecha formateada de forma segura
     * Maneja: DateTime, string, timestamp, null
     */
    private function getFormattedDate($date, $format = 'd/m/Y')
    {
        if (empty($date)) {
            return '';
        }
        
        try {
            if ($date instanceof \DateTime) {
                return $date->format($format);
            }
            
            if (is_string($date) || is_numeric($date)) {
                $dateTime = new \DateTime($date);
                return $dateTime->format($format);
            }
        } catch (\Exception $e) {
            // Si falla, retornar vacío
            return '';
        }
        
        return '';
    }
    
    /**
     * Obtener firmas para exportación desde la base de datos
     * Prioriza firmas_solicitud si tiene firma_guardado/firma_base64, sino usa columna JSON
     */
    private function obtenerFirmasParaExportacion($solicitud)
    {
        $firmasExportacion = [];
        
        \Log::info('=== OBTENIENDO FIRMAS PARA EXPORTACIÓN ===');
        \Log::info('Solicitud ID: ' . $solicitud->id);
        \Log::info('Tipo: ' . get_class($solicitud));
        
        // Opción 1: Firmas desde relación firmasSolicitud (si tiene firma_guardado o firma_base64)
        if ($solicitud->relationLoaded('firmasSolicitud') && $solicitud->firmasSolicitud->count() > 0) {
            \Log::info('Revisando firmas en tabla firmas_solicitud: ' . $solicitud->firmasSolicitud->count() . ' registros');
            
            foreach ($solicitud->firmasSolicitud as $firmaSol) {
                $firmaData = $firmaSol->firma_guardado ?? $firmaSol->firma_base64 ?? $firmaSol->firma ?? null;
                
                if ($firmaData) {
                    $firmasExportacion[] = [
                        'cargo' => $firmaSol->cargo_firmante,
                        'usuario' => $firmaSol->nombre_firmante,
                        'fecha' => $firmaSol->fecha_firma ? $firmaSol->fecha_firma->format('Y-m-d H:i:s') : date('Y-m-d H:i:s'),
                        'firma' => $firmaData
                    ];
                    \Log::info("Firma cargada desde firmas_solicitud para {$firmaSol->cargo_firmante}");
                }
            }
            
            if (!empty($firmasExportacion)) {
                \Log::info('Total firmas cargadas desde tabla firmas_solicitud: ' . count($firmasExportacion));
                return $firmasExportacion;
            }
        }
        
        // Opción 2: Fallback a columna JSON firmas
        if ($solicitud->firmas) {
            \Log::info('Usando fallback: cargando firmas desde columna JSON');
            
            $firmas = is_string($solicitud->firmas) 
                ? json_decode($solicitud->firmas, true)
                : $solicitud->firmas;
            
            if (is_array($firmas)) {
                foreach ($firmas as $cargo => $firma) {
                    // Soportar ambos formatos: indexed array y associative array
                    if (is_numeric($cargo) && isset($firma['cargo'])) {
                        // Formato: [0 => ['cargo' => ..., 'usuario' => ..., 'firma' => ...]]
                        $firmasExportacion[] = [
                            'cargo' => $firma['cargo'] ?? $firma['tipo'] ?? '',
                            'usuario' => $firma['usuario'] ?? $firma['nombre'] ?? '',
                            'fecha' => $firma['fecha'] ?? date('Y-m-d H:i:s'),
                            'firma' => $firma['firma'] ?? ''
                        ];
                    } else {
                        // Formato: ['Jefe Inmediato' => ['usuario' => ..., 'firma' => ...]]
                        $firmasExportacion[] = [
                            'cargo' => $cargo,
                            'usuario' => $firma['usuario'] ?? $firma['nombre'] ?? '',
                            'fecha' => $firma['fecha'] ?? date('Y-m-d H:i:s'),
                            'firma' => $firma['firma'] ?? ''
                        ];
                    }
                }
                
                \Log::info('Total firmas cargadas desde JSON: ' . count($firmasExportacion));
            }
        }
        
        if (empty($firmasExportacion)) {
            \Log::warning('No se encontraron firmas para esta solicitud');
        }
        
        return $firmasExportacion;
    }
    
    /**
     * Previsualizar solicitud administrativa como HTML
     */
    public function previsualizarAdministrativa($id)
    {
        try {
            // Primero exportar el Excel normalmente
            $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados'])->findOrFail($id);
            
            // Usar template para previsualización
            $templatePath = public_path('Documentos/Mapeado/formato_administrativo_MAPEADO.xlsx');
            
            if (!file_exists($templatePath)) {
                return response()->json(['error' => 'Template no encontrado: ' . $templatePath], 404);
            }
            
            // Cargar y procesar el template
            $spreadsheet = IOFactory::load($templatePath);
            $sheet = $spreadsheet->getActiveSheet();
            
            // ===== MAPEO COMPLETO (copiado de exportarAdministrativa) =====
            
            // FECHA
            $fecha = $solicitud->fecha_solicitud ? $solicitud->fecha_solicitud : now();
            $sheet->setCellValue('C6', is_object($fecha) ? $fecha->format('d') : date('d'));
            $sheet->setCellValue('E6', is_object($fecha) ? $fecha->format('m') : date('m'));
            $sheet->setCellValue('H6', is_object($fecha) ? $fecha->format('Y') : date('Y'));
            
            // DATOS BÁSICOS
            $sheet->setCellValue('C8', $solicitud->nombre_completo ?? '');
            $sheet->setCellValue('C10', $solicitud->cedula ?? '');
            $sheet->setCellValue('C11', $solicitud->area_servicio ?? '');
            $sheet->setCellValue('P10', $solicitud->cargo ?? '');
            $sheet->setCellValue('P11', $solicitud->telefono_extension ?? '');
            
            // VINCULACIÓN
            $vinculacion = strtolower($solicitud->tipo_vinculacion ?? '');
            if (stripos($vinculacion, 'planta') !== false) {
                $sheet->setCellValue('P9', 'X');
            } elseif (stripos($vinculacion, 'asociado') !== false || stripos($vinculacion, 'agremiado') !== false) {
                $sheet->setCellValue('R9', 'X');
            } elseif (stripos($vinculacion, 'contrato') !== false) {
                $sheet->setCellValue('T9', 'X');
            }
            
            // MÓDULOS ADMINISTRATIVOS - Usar método robusto
            $modulos = $this->toArray($solicitud->modulos_administrativos);
            if (!empty($modulos)) {
                $filaInicio = 20;
                $modulosNombres = ['facturacion', 'anticipos', 'farmacia', 'suministros', 'cartera', 'glosas', 
                                  'admisiones', 'ayudasDiagnosticas', 'citasMedicas', 'cirugia', 'rips', 'anexos'];
                
                foreach ($modulosNombres as $index => $modulo) {
                    $fila = $filaInicio + $index;
                    if (isset($modulos[$modulo])) {
                        if (is_array($modulos[$modulo])) {
                            // Soportar formato nuevo (A,C,M,B) y formato viejo (adicionar, consultar, etc.)
                            $adicionar = $this->isTrue($modulos[$modulo]['A'] ?? $modulos[$modulo]['adicionar'] ?? false);
                            $consultar = $this->isTrue($modulos[$modulo]['C'] ?? $modulos[$modulo]['consultar'] ?? false);
                            $modificar = $this->isTrue($modulos[$modulo]['M'] ?? $modulos[$modulo]['modificar'] ?? false);
                            $borrar = $this->isTrue($modulos[$modulo]['B'] ?? $modulos[$modulo]['borrar'] ?? false);
                            
                            if ($adicionar) $sheet->setCellValue('D' . $fila, 'X');
                            if ($consultar) $sheet->setCellValue('F' . $fila, 'X');
                            if ($modificar) $sheet->setCellValue('H' . $fila, 'X');
                            if ($borrar) $sheet->setCellValue('J' . $fila, 'X');
                        } elseif ($modulos[$modulo]) {
                            $sheet->setCellValue('F' . $fila, 'X');
                        }
                    }
                }
            }
            
            // MÓDULOS FINANCIEROS - Usar método robusto
            $modulos = $this->toArray($solicitud->modulos_financieros);
            if (!empty($modulos)) {
                $filaInicio = 20;
                $modulosNombres = ['presupuesto', 'activosFijos', 'contabilidad', 'cuentasPorPagar', 
                                  'cajaYBancos', 'costos', 'administracionDocumentos'];
                
                foreach ($modulosNombres as $index => $modulo) {
                    $fila = $filaInicio + $index;
                    if (isset($modulos[$modulo])) {
                        if (is_array($modulos[$modulo])) {
                            // Soportar formato nuevo (A,C,M,B) y formato viejo (adicionar, consultar, etc.)
                            $adicionar = $this->isTrue($modulos[$modulo]['A'] ?? $modulos[$modulo]['adicionar'] ?? false);
                            $consultar = $this->isTrue($modulos[$modulo]['C'] ?? $modulos[$modulo]['consultar'] ?? false);
                            $modificar = $this->isTrue($modulos[$modulo]['M'] ?? $modulos[$modulo]['modificar'] ?? false);
                            $borrar = $this->isTrue($modulos[$modulo]['B'] ?? $modulos[$modulo]['borrar'] ?? false);
                            
                            if ($adicionar) $sheet->setCellValue('Q' . $fila, 'X');
                            if ($consultar) $sheet->setCellValue('R' . $fila, 'X');
                            if ($modificar) $sheet->setCellValue('S' . $fila, 'X');
                            if ($borrar) $sheet->setCellValue('U' . $fila, 'X');
                        } elseif ($modulos[$modulo]) {
                            $sheet->setCellValue('R' . $fila, 'X');
                        }
                    }
                }
            }
            
            // PERFIL DE
            $sheet->setCellValue('I33', $solicitud->perfil_de ?? '');
            
            // OPCIONES WEB - Usar método robusto
            $opciones = $this->toArray($solicitud->opciones_web);
            if (!empty($opciones)) {
                if ($opciones['internet'] ?? false) $sheet->setCellValue('D34', 'X');
                if ($opciones['correoElectronico'] ?? false) $sheet->setCellValue('D35', 'X');
                if ($opciones['transferenciaArchivos'] ?? false) $sheet->setCellValue('D36', 'X');
            }
            
            // LOGIN Y CLAVE
            $sheet->setCellValue('C39', $solicitud->login_asignado ?? '');
            $sheet->setCellValue('P39', $solicitud->clave_temporal ?? '');
            
            // FIRMAS (con imágenes) - Usar método robusto
            $firmas = $this->toArray($solicitud->firmas);
            if (!empty($firmas)) {
                foreach ($firmas as $cargo => $firma) {
                    $cargoLower = strtolower($cargo);
                    $usuario = $firma['usuario'] ?? '';
                    $fecha = $firma['fecha'] ?? date('Y-m-d H:i:s');
                    $fechaFormateada = date('d/m/Y H:i', strtotime($fecha));
                    $firmaData = $firma['firma'] ?? '';
                    
                    // Mapear celda usando función normalizada (soporta tildes, espacios, mayúsculas)
                    $celda = null;
                    if ($this->cargoCoincide($cargo, ['usuario', 'solicitante', 'firma usuario'])) {
                        $celda = 'F40';
                    } elseif ($this->cargoCoincide($cargo, ['jefe inmediato', 'inmediato', 'jefe directo', 'avalado', 'avalado por', 'vo bo jefe inmediato'])) {
                        $celda = 'A44';
                    } elseif ($this->cargoCoincide($cargo, ['talento humano', 'recursos humanos', 'RRHH', 'jefe talento', 'vo bo talento humano'])) {
                        $celda = 'G44';
                    } elseif ($this->cargoCoincide($cargo, ['gestión', 'gestion', 'información', 'informacion', 'coordinador', 'sistemas', 'TI', 'vo bo gestion'])) {
                        $celda = 'O44';
                    }
                    
                    if ($celda) {
                        if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                            try {
                                $imageData = explode(',', $firmaData);
                                if (count($imageData) === 2) {
                                    $imageBase64 = $imageData[1];
                                    $imageContent = base64_decode($imageBase64);
                                    
                                    // Crear carpeta organizada para firmas: storage/app/firmas/administrativa/{id}/
                                    $firmasDir = storage_path("app/firmas/administrativa/{$solicitud->id}");
                                    if (!file_exists($firmasDir)) {
                                        mkdir($firmasDir, 0755, true);
                                    }
                                    
                                    // Nombre descriptivo: cargo_fecha.png
                                    $cargoSlug = str_replace(' ', '_', strtolower($cargo));
                                    $timestamp = date('YmdHis');
                                    $tempImagePath = "{$firmasDir}/{$cargoSlug}_{$timestamp}.png";
                                    file_put_contents($tempImagePath, $imageContent);
                                    
                                    $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                    $drawing->setName('Firma ' . $cargo);
                                    $drawing->setDescription('Firma de ' . $usuario);
                                    $drawing->setPath($tempImagePath);
                                    $drawing->setCoordinates($celda);
                                    $drawing->setHeight(60);
                                    // Centrar imagen en la celda
                                    $drawing->setOffsetX(10);
                                    $drawing->setOffsetY(5);
                                    $drawing->setWorksheet($sheet);
                                }
                            } catch (\Exception $e) {
                                $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                            }
                        } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                            // Parsear formato: FIRMA_TEXTO:nombre|FONT:id|SIZE:num|STYLE:style
                            $parts = explode('|', $firmaData);
                            $textoFirma = str_replace('FIRMA_TEXTO:', '', $parts[0]);
                            $fontName = 'Brush Script MT';
                            $fontSize = 16;
                            foreach ($parts as $part) {
                                if (strpos($part, 'SIZE:') === 0) {
                                    $fontSize = (int)str_replace('SIZE:', '', $part);
                                }
                            }
                            $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                            $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                            $sheet->getStyle($celda)->getFont()->setName($fontName)->setSize($fontSize);
                        } else {
                            $sheet->setCellValue($celda, $usuario . "\n" . $fechaFormateada);
                            $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                        }
                    }
                }
            }
            
            // Convertir a HTML
            $writer = new Html($spreadsheet);
            
            // Guardar temporalmente
            $tempFile = storage_path('app/temp/preview_admin_' . $id . '.html');
            if (!file_exists(dirname($tempFile))) {
                mkdir(dirname($tempFile), 0755, true);
            }
            
            $writer->save($tempFile);
            
            // Retornar el HTML
            return response()->file($tempFile, [
                'Content-Type' => 'text/html',
                'Content-Disposition' => 'inline; filename="preview_administrativa_' . $id . '.html"'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error en previsualización administrativa: ' . $e->getMessage());
            return response()->json(['error' => 'Error al generar previsualización: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Previsualizar solicitud de historia clínica como HTML
     */
    public function previsualizarHistoriaClinica($id)
    {
        try {
            $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historialEstados'])->findOrFail($id);
            
            // Usar template para previsualización
            $templatePath = public_path('Documentos/Mapeado/formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx');
            
            if (!file_exists($templatePath)) {
                return response()->json(['error' => 'Template no encontrado: ' . $templatePath], 404);
            }
            
            // Cargar template
            $spreadsheet = IOFactory::load($templatePath);
            $sheet = $spreadsheet->getActiveSheet();
            
            // MAPEO DE DATOS
            // Fecha de solicitud
            $fecha = $solicitud->fecha_solicitud ? $solicitud->fecha_solicitud : now();
            $sheet->setCellValue('N6', is_object($fecha) ? $fecha->format('d') : date('d'));
            $sheet->setCellValue('O6', is_object($fecha) ? $fecha->format('m') : date('m'));
            $sheet->setCellValue('Q6', is_object($fecha) ? $fecha->format('Y') : date('Y'));
            
            // Datos básicos
            $sheet->setCellValue('F5', $solicitud->nombre_completo ?? '');
            $sheet->setCellValue('F7', $solicitud->cedula ?? '');
            $sheet->setCellValue('N7', $solicitud->celular ?? '');
            $sheet->setCellValue('F8', $solicitud->area_servicio ?? '');
            $sheet->setCellValue('N8', $solicitud->registro_codigo ?? '');
            $sheet->setCellValue('F9', $solicitud->especialidad ?? '');
            $sheet->setCellValue('K10', $solicitud->observaciones ?? '');
            $sheet->setCellValue('F10', $solicitud->correo_electronico ?? '');
            
            // Perfil
            $perfil = strtolower($solicitud->perfil ?? '');
            if (stripos($perfil, 'medico general') !== false) $sheet->setCellValue('G13', 'X');
            if (stripos($perfil, 'especialista') !== false) $sheet->setCellValue('G14', 'X');
            if (stripos($perfil, 'residente') !== false) $sheet->setCellValue('G15', 'X');
            if (stripos($perfil, 'enfermero jefe') !== false) $sheet->setCellValue('L13', 'X');
            if (stripos($perfil, 'auxiliar') !== false) $sheet->setCellValue('L14', 'X');
            if (stripos($perfil, 'terapeuta') !== false) $sheet->setCellValue('L15', 'X');
            if (stripos($perfil, 'auditor') !== false) $sheet->setCellValue('Q13', 'X');
            // Si es "Otro", escribir el texto
            if (stripos($perfil, 'otro') !== false && isset($solicitud->perfil_otro)) {
                $sheet->setCellValue('Q14', $solicitud->perfil_otro);
            }
            
            // Tipo de Vinculación (Interno/Externo) - M14
            $vinculacion = strtolower($solicitud->tipo_vinculacion ?? '');
            if (stripos($vinculacion, 'interno') !== false) {
                $sheet->setCellValue('M14', 'Interno (X)  Externo ( )');
            } elseif (stripos($vinculacion, 'externo') !== false) {
                $sheet->setCellValue('M14', 'Interno ( )  Externo (X)');
            }
            
            // Terminal
            $terminal = strtolower($solicitud->terminal_asignado ?? '');
            if (stripos($terminal, 'tablet') !== false) $sheet->setCellValue('G17', 'X');
            if (stripos($terminal, 'portatil') !== false) $sheet->setCellValue('G18', 'X');
            
            // Aval Institucional - M16 - Usar método robusto
            $aval = $this->toArray($solicitud->aval_institucional);
            if (!empty($aval)) {
                $textoAval = ($aval['avaladoPor'] ?? '') . ' - ' . ($aval['cargo'] ?? '');
                $sheet->setCellValue('M16', $textoAval);
            }
            
            // Capacitación Historia Clínica - Usar método robusto
            $cap = $this->toArray($solicitud->capacitacion_historia_clinica);
            if (!empty($cap)) {
                if ($cap['capacitacionRealizada'] ?? false) {
                    $sheet->setCellValue('B23', 'X');
                    $sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? $cap['instructor'] ?? $cap['capacitador'] ?? '');
                    $fechaCap = $cap['fechaCapacitacion'] ?? $cap['fecha'] ?? null;
                    if ($fechaCap) {
                        try {
                            $fechaCap = new \DateTime($fechaCap);
                            $sheet->setCellValue('N23', $fechaCap->format('d'));
                            $sheet->setCellValue('O23', $fechaCap->format('m'));
                            $sheet->setCellValue('Q23', $fechaCap->format('Y'));
                        } catch (\Exception $e) {
                            \Log::error('Error parseando fecha capacitación HC: ' . $e->getMessage());
                        }
                    }
                } else {
                    $sheet->setCellValue('D23', 'X');
                }
            }
            
            // Capacitación Epidemiología - Usar método robusto
            $cap = $this->toArray($solicitud->capacitacion_epidemiologia);
            if (!empty($cap)) {
                if ($cap['capacitacionRealizada'] ?? false) {
                    $sheet->setCellValue('B27', 'X');
                    $sheet->setCellValue('I26', $cap['nombreCapacitador'] ?? $cap['instructor'] ?? $cap['capacitador'] ?? '');
                    $fechaCap = $cap['fechaCapacitacion'] ?? $cap['fecha'] ?? null;
                    if ($fechaCap) {
                        try {
                            $fechaCap = new \DateTime($fechaCap);
                            $sheet->setCellValue('N27', $fechaCap->format('d'));
                            $sheet->setCellValue('O27', $fechaCap->format('m'));
                            $sheet->setCellValue('Q27', $fechaCap->format('Y'));
                        } catch (\Exception $e) {
                            \Log::error('Error parseando fecha capacitación Epi: ' . $e->getMessage());
                        }
                    }
                } else {
                    $sheet->setCellValue('D27', 'X');
                }
            }
            
            // Firmas (con imágenes)
            if ($solicitud->firmas) {
                $firmas = is_string($solicitud->firmas) 
                    ? json_decode($solicitud->firmas, true)
                    : $solicitud->firmas;
                
                if (is_array($firmas)) {
                    foreach ($firmas as $cargo => $firma) {
                        $cargoLower = strtolower($cargo);
                        $usuario = $firma['usuario'] ?? '';
                        $fecha = $firma['fecha'] ?? date('Y-m-d H:i:s');
                        $fechaFormateada = date('d/m/Y H:i', strtotime($fecha));
                        $firmaData = $firma['firma'] ?? '';
                        
                        // Mapear celda usando función normalizada (soporta tildes, espacios, mayúsculas)
                        $celda = null;
                        if ($this->cargoCoincide($cargo, ['usuario', 'solicitante', 'firma usuario'])) {
                            $celda = 'A29';
                        } elseif ($this->cargoCoincide($cargo, ['capacitador historia', 'capacitador HC', 'capacitador clínica', 'capacitador clinica'])) {
                            $celda = 'J22';
                        } elseif ($this->cargoCoincide($cargo, ['capacitador epidemiología', 'capacitador epidemiologia', 'capacitador epi'])) {
                            $celda = 'J26';
                        } elseif ($this->cargoCoincide($cargo, ['aval', 'aval institucional', 'avalado'])) {
                            $celda = 'M17';
                        }
                        
                        if ($celda) {
                            if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                                try {
                                    $imageData = explode(',', $firmaData);
                                    if (count($imageData) === 2) {
                                        $imageBase64 = $imageData[1];
                                        $imageContent = base64_decode($imageBase64);
                                        
                                        // Crear carpeta organizada para firmas: storage/app/firmas/historia_clinica/{id}/
                                        $firmasDir = storage_path("app/firmas/historia_clinica/{$solicitud->id}");
                                        if (!file_exists($firmasDir)) {
                                            mkdir($firmasDir, 0755, true);
                                        }
                                        
                                        // Nombre descriptivo: cargo_fecha.png
                                        $cargoSlug = str_replace(' ', '_', strtolower($cargo));
                                        $timestamp = date('YmdHis');
                                        $tempImagePath = "{$firmasDir}/{$cargoSlug}_{$timestamp}.png";
                                        file_put_contents($tempImagePath, $imageContent);
                                        
                                        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                        $drawing->setName('Firma ' . $cargo);
                                        $drawing->setDescription('Firma de ' . $usuario);
                                        $drawing->setPath($tempImagePath);
                                        $drawing->setCoordinates($celda);
                                        $drawing->setHeight(50);
                                        // Centrar imagen en la celda
                                        $drawing->setOffsetX(10);
                                        $drawing->setOffsetY(5);
                                        $drawing->setWorksheet($sheet);
                                    }
                                } catch (\Exception $e) {
                                    $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                                }
                            } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                                // Parsear formato: FIRMA_TEXTO:nombre|FONT:id|SIZE:num|STYLE:style
                                $parts = explode('|', $firmaData);
                                $textoFirma = str_replace('FIRMA_TEXTO:', '', $parts[0]);
                                $fontName = 'Brush Script MT';
                                $fontSize = 14;
                                foreach ($parts as $part) {
                                    if (strpos($part, 'SIZE:') === 0) {
                                        $fontSize = (int)str_replace('SIZE:', '', $part);
                                    }
                                }
                                $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                                $sheet->getStyle($celda)->getFont()->setName($fontName)->setSize($fontSize);
                            } else {
                                $sheet->setCellValue($celda, $usuario . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                            }
                        }
                    }
                }
            }
            
            // Convertir a HTML
            $writer = new Html($spreadsheet);
            $tempFile = storage_path('app/temp/preview_clinica_' . $id . '.html');
            if (!file_exists(dirname($tempFile))) {
                mkdir(dirname($tempFile), 0755, true);
            }
            
            $writer->save($tempFile);
            
            return response()->file($tempFile, [
                'Content-Type' => 'text/html',
                'Content-Disposition' => 'inline; filename="preview_historia_clinica_' . $id . '.html"'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error en previsualización historia clínica: ' . $e->getMessage());
            return response()->json(['error' => 'Error al generar previsualización: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Exportar solicitud administrativa individual a Excel
     */
    public function exportarAdministrativa($id)
    {
        \Illuminate\Support\Facades\Log::info("Iniciando exportación administrativa para ID: $id");
        $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados', 'firmasSolicitud.paso'])->findOrFail($id);
        
        // Usar el template VACÍO para exportación (sin texto descriptivo)
        $templatePath = public_path('Documentos/formato_administrativo_MAPEADOVacio.xlsx');
        
        if (!file_exists($templatePath)) {
            return response()->json([
                'error' => 'Template no encontrado: ' . $templatePath
            ], 404);
        }
        
        try {
            // DEBUG: Ver qué datos tiene la solicitud
            \Log::info('=== EXPORTANDO SOLICITUD ADMINISTRATIVA ===');
            \Log::info('ID: ' . $solicitud->id);
            \Log::info('Nombre completo: ' . ($solicitud->nombre_completo ?? 'NULL'));
            \Log::info('Cédula: ' . ($solicitud->cedula ?? 'NULL'));
            \Log::info('Todos los datos:', $solicitud->toArray());
            
            // Cargar el template
            $spreadsheet = IOFactory::load($templatePath);
            $sheet = $spreadsheet->getActiveSheet();
            
            // ===== MAPEO COMPLETO SEGÚN FORMATO INSTITUCIONAL =====
            // FOR-GDI-SIS-004 - FORMATO CREACIÓN USUARIOS ADMINISTRATIVOS
            
            // ===== FECHA (Fila 6: C6=DÍA, E6=MES, H6=AÑO) =====
            $fecha = $solicitud->fecha_solicitud ? $solicitud->fecha_solicitud : now();
            $sheet->setCellValue('C6', is_object($fecha) ? $fecha->format('d') : date('d'));
            $sheet->setCellValue('E6', is_object($fecha) ? $fecha->format('m') : date('m'));
            $sheet->setCellValue('H6', is_object($fecha) ? $fecha->format('Y') : date('Y'));
            
            // ===== DATOS BÁSICOS (según Excel mapeado) =====
            // Fila 8: NOMBRE COMPLETO → C8
            $sheet->setCellValue('C8', $solicitud->nombre_completo ?? '');
            
            // Fila 10: CÉDULA → C10
            $sheet->setCellValue('C10', $solicitud->cedula ?? '');
            
            // Fila 11: ÁREA/SERVICIO → C11
            $sheet->setCellValue('C11', $solicitud->area_servicio ?? '');
            
            // Fila 10: CARGO → P10
            $sheet->setCellValue('P10', $solicitud->cargo ?? '');
            
            // Fila 11: TELÉFONO O EXTENSIÓN → P11
            $sheet->setCellValue('P11', $solicitud->telefono_extension ?? '');
            
            // ===== VINCULACIÓN (Fila 9: P9=Planta, R9=Agremiado, T9=Contrato) =====
            $vinculacion = strtolower($solicitud->tipo_vinculacion ?? '');
            if (stripos($vinculacion, 'planta') !== false) {
                $sheet->setCellValue('P9', 'X');
            } elseif (stripos($vinculacion, 'asociado') !== false || stripos($vinculacion, 'agremiado') !== false) {
                $sheet->setCellValue('R9', 'X');
            } elseif (stripos($vinculacion, 'contrato') !== false) {
                $sheet->setCellValue('T9', 'X');
            }
            
            // ===== MÓDULOS ADMINISTRATIVOS Y FINANCIEROS =====
            \Log::info('Módulos administrativos raw:', ['data' => $solicitud->modulos_administrativos]);
            
            // Mapeo de nombres de módulos a filas del Excel
            $mapeoModulosAdmin = [
                'facturacion' => 20, 'facturación' => 20,
                'anticipos' => 21,
                'farmacia' => 22,
                'suministros' => 23,
                'cartera' => 24,
                'glosas' => 25,
                'admisiones' => 26,
                'ayudas diagnosticas' => 27, 'ayudas diagnósticas' => 27,
                'citas medicas' => 28, 'citas médicas' => 28,
                'cirugia' => 29, 'cirugía' => 29,
                'rips' => 30,
                'anexos' => 31
            ];
            
            // Procesar módulos administrativos
            if ($solicitud->modulos_administrativos) {
                $modulos = is_string($solicitud->modulos_administrativos) 
                    ? json_decode($solicitud->modulos_administrativos, true)
                    : $solicitud->modulos_administrativos;
                
                \Log::info('Módulos administrativos procesados:', ['modulos' => $modulos]);
                
                if (is_array($modulos)) {
                    // Verificar si tiene estructura modulo/opciones (formato nuevo)
                    if (isset($modulos['opciones']) && is_array($modulos['opciones'])) {
                        foreach ($modulos['opciones'] as $opcion) {
                            if (isset($opcion['nombre']) && isset($opcion['seleccionado']) && $opcion['seleccionado']) {
                                $nombreNormalizado = $this->normalizarTexto($opcion['nombre']);
                                
                                // Buscar en el mapeo
                                foreach ($mapeoModulosAdmin as $clave => $fila) {
                                    if (stripos($nombreNormalizado, $this->normalizarTexto($clave)) !== false) {
                                        // Si tiene permisos específicos (A,C,M,B), usarlos
                                        if (isset($opcion['permisos']) && is_array($opcion['permisos'])) {
                                            if ($this->isTrue($opcion['permisos']['A'] ?? false)) $sheet->setCellValue('D' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['C'] ?? false)) $sheet->setCellValue('F' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['M'] ?? false)) $sheet->setCellValue('H' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['B'] ?? false)) $sheet->setCellValue('J' . $fila, 'X');
                                        } else {
                                            // Si solo está seleccionado, marcar solo Consultar por defecto
                                            $sheet->setCellValue('F' . $fila, 'X');
                                        }
                                        \Log::info("Módulo marcado: {$opcion['nombre']} en fila {$fila}");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    // Formato antiguo con claves directas (facturacion, anticipos, etc.)
                    else {
                        foreach ($mapeoModulosAdmin as $clave => $fila) {
                            if (isset($modulos[$clave])) {
                                if (is_array($modulos[$clave])) {
                                    $adicionar = $this->isTrue($modulos[$clave]['A'] ?? $modulos[$clave]['adicionar'] ?? false);
                                    $consultar = $this->isTrue($modulos[$clave]['C'] ?? $modulos[$clave]['consultar'] ?? false);
                                    $modificar = $this->isTrue($modulos[$clave]['M'] ?? $modulos[$clave]['modificar'] ?? false);
                                    $borrar = $this->isTrue($modulos[$clave]['B'] ?? $modulos[$clave]['borrar'] ?? false);
                                    
                                    if ($adicionar) $sheet->setCellValue('D' . $fila, 'X');
                                    if ($consultar) $sheet->setCellValue('F' . $fila, 'X');
                                    if ($modificar) $sheet->setCellValue('H' . $fila, 'X');
                                    if ($borrar) $sheet->setCellValue('J' . $fila, 'X');
                                    \Log::info("Módulo marcado (formato antiguo): {$clave} en fila {$fila}");
                                } elseif ($modulos[$clave]) {
                                    $sheet->setCellValue('F' . $fila, 'X');
                                }
                            }
                        }
                    }
                }
            }
            
            // ===== MÓDULOS FINANCIEROS =====
            $mapeoModulosFinan = [
                'presupuesto' => 20,
                'activos fijos' => 21,
                'contabilidad' => 22,
                'cuentas por pagar' => 23,
                'caja y bancos' => 24,
                'costos' => 25,
                'administracion documentos' => 26, 'administración documentos' => 26, 'adm. de documentos' => 26
            ];
            
            if ($solicitud->modulos_financieros) {
                $modulos = is_string($solicitud->modulos_financieros) 
                    ? json_decode($solicitud->modulos_financieros, true)
                    : $solicitud->modulos_financieros;
                
                if (is_array($modulos)) {
                    // Verificar si tiene estructura modulo/opciones (formato nuevo)
                    if (isset($modulos['opciones']) && is_array($modulos['opciones'])) {
                        foreach ($modulos['opciones'] as $opcion) {
                            if (isset($opcion['nombre']) && isset($opcion['seleccionado']) && $opcion['seleccionado']) {
                                $nombreNormalizado = $this->normalizarTexto($opcion['nombre']);
                                
                                // Buscar en el mapeo
                                foreach ($mapeoModulosFinan as $clave => $fila) {
                                    if (stripos($nombreNormalizado, $this->normalizarTexto($clave)) !== false) {
                                        // Si tiene permisos específicos (A,C,M,B), usarlos
                                        if (isset($opcion['permisos']) && is_array($opcion['permisos'])) {
                                            if ($this->isTrue($opcion['permisos']['A'] ?? false)) $sheet->setCellValue('Q' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['C'] ?? false)) $sheet->setCellValue('R' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['M'] ?? false)) $sheet->setCellValue('S' . $fila, 'X');
                                            if ($this->isTrue($opcion['permisos']['B'] ?? false)) $sheet->setCellValue('U' . $fila, 'X');
                                        } else {
                                            // Si solo está seleccionado, marcar solo Consultar por defecto
                                            $sheet->setCellValue('R' . $fila, 'X');
                                        }
                                        \Log::info("Módulo financiero marcado: {$opcion['nombre']} en fila {$fila}");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    // Formato antiguo con claves directas
                    else {
                        foreach ($mapeoModulosFinan as $clave => $fila) {
                            if (isset($modulos[$clave])) {
                                if (is_array($modulos[$clave])) {
                                    $adicionar = $this->isTrue($modulos[$clave]['A'] ?? $modulos[$clave]['adicionar'] ?? false);
                                    $consultar = $this->isTrue($modulos[$clave]['C'] ?? $modulos[$clave]['consultar'] ?? false);
                                    $modificar = $this->isTrue($modulos[$clave]['M'] ?? $modulos[$clave]['modificar'] ?? false);
                                    $borrar = $this->isTrue($modulos[$clave]['B'] ?? $modulos[$clave]['borrar'] ?? false);
                                    
                                    if ($adicionar) $sheet->setCellValue('Q' . $fila, 'X');
                                    if ($consultar) $sheet->setCellValue('R' . $fila, 'X');
                                    if ($modificar) $sheet->setCellValue('S' . $fila, 'X');
                                    if ($borrar) $sheet->setCellValue('U' . $fila, 'X');
                                    \Log::info("Módulo financiero marcado (formato antiguo): {$clave} en fila {$fila}");
                                } elseif ($modulos[$clave]) {
                                    $sheet->setCellValue('R' . $fila, 'X');
                                }
                            }
                        }
                    }
                }
            }
            
            // ===== TIPO DE PERMISO (convertir checkboxes a "X") =====
            if ($solicitud->tipo_permiso) {
                $permisos = is_string($solicitud->tipo_permiso) 
                    ? json_decode($solicitud->tipo_permiso, true)
                    : $solicitud->tipo_permiso;
                
                // Normalizar a array si no lo es
                if (!is_array($permisos)) {
                    $permisos = [];
                }

                // Caso 1: Estructura compleja {"nivel_acceso": "...", "permisos_especiales": [...]}
                if (isset($permisos['nivel_acceso']) || isset($permisos['permisos_especiales'])) {
                    $nivelAcceso = $permisos['nivel_acceso'] ?? '';
                    $permisosEspeciales = $permisos['permisos_especiales'] ?? [];
                    
                    // Manejar nivel de acceso (puede ser string o array)
                    if (is_array($nivelAcceso)) {
                        foreach ($nivelAcceso as $acc) {
                            if (is_string($acc)) {
                                if (stripos($acc, 'consulta') !== false) $sheet->setCellValue('A23', 'X');
                                if (stripos($acc, 'modificacion') !== false || stripos($acc, 'modificación') !== false) $sheet->setCellValue('B23', 'X');
                                if (stripos($acc, 'anulacion') !== false || stripos($acc, 'anulación') !== false) $sheet->setCellValue('C23', 'X');
                                if (stripos($acc, 'borrado') !== false) $sheet->setCellValue('D23', 'X');
                            }
                        }
                    } else if (is_string($nivelAcceso)) {
                        if (stripos($nivelAcceso, 'consulta') !== false) $sheet->setCellValue('A23', 'X');
                        if (stripos($nivelAcceso, 'modificacion') !== false || stripos($nivelAcceso, 'modificación') !== false) $sheet->setCellValue('B23', 'X');
                        if (stripos($nivelAcceso, 'anulacion') !== false || stripos($nivelAcceso, 'anulación') !== false) $sheet->setCellValue('C23', 'X');
                        if (stripos($nivelAcceso, 'borrado') !== false) $sheet->setCellValue('D23', 'X');
                    }
                    
                    // Manejar permisos especiales
                    if (is_array($permisosEspeciales)) {
                        foreach ($permisosEspeciales as $permisoEsp) {
                            if (is_string($permisoEsp)) {
                                if (stripos($permisoEsp, 'consulta') !== false) $sheet->setCellValue('A23', 'X');
                                if (stripos($permisoEsp, 'modificacion') !== false || stripos($permisoEsp, 'modificación') !== false) $sheet->setCellValue('B23', 'X');
                                if (stripos($permisoEsp, 'anulacion') !== false || stripos($permisoEsp, 'anulación') !== false) $sheet->setCellValue('C23', 'X');
                                if (stripos($permisoEsp, 'borrado') !== false) $sheet->setCellValue('D23', 'X');
                            }
                        }
                    }
                }
            }
            
            // ===== PERFIL DE (texto) → I33 =====
            $sheet->setCellValue('I33', $solicitud->perfil_de ?? '');
            
            // ===== OPCIONES WEB → D34, D35, D36 =====
            if ($solicitud->opciones_web) {
                $opciones = is_string($solicitud->opciones_web) 
                    ? json_decode($solicitud->opciones_web, true)
                    : $solicitud->opciones_web;
                
                if (is_array($opciones)) {
                    if ($opciones['internet'] ?? false) $sheet->setCellValue('D34', 'X');
                    if ($opciones['correoElectronico'] ?? false) $sheet->setCellValue('D35', 'X');
                    if ($opciones['transferenciaArchivos'] ?? false) $sheet->setCellValue('D36', 'X');
                }
            }
            
            // ===== LOGIN → C39 =====
            $sheet->setCellValue('C39', $solicitud->login_asignado ?? '');
            
            // ===== CLAVE → P39 =====
            $sheet->setCellValue('P39', $solicitud->clave_temporal ?? '');
            
            // ===== FIRMAS DIGITALES (insertar imágenes y texto) =====
            // Usar el nuevo método unificado para obtener firmas
            $firmasParaExportar = $this->obtenerFirmasParaExportacion($solicitud);
            
            if (!empty($firmasParaExportar)) {
                \Log::info('Procesando ' . count($firmasParaExportar) . ' firmas para exportación');
                
                foreach ($firmasParaExportar as $firma) {
                    $cargo = $firma['cargo'] ?? '';
                    $usuario = $firma['usuario'] ?? '';
                    $fecha = $firma['fecha'] ?? date('Y-m-d H:i:s');
                    $fechaFormateada = date('d/m/Y H:i', strtotime($fecha));
                    $firmaData = $firma['firma'] ?? '';
                    
                    \Log::info("Procesando firma de: {$cargo}", [
                        'usuario' => $usuario,
                        'tiene_firma' => !empty($firmaData),
                        'tipo' => strpos($firmaData, 'data:image') === 0 ? 'imagen' : (strpos($firmaData, 'FIRMA_TEXTO:') === 0 ? 'texto_firma' : 'texto_simple')
                    ]);
                    
                    // Determinar celda según cargo
                    $celda = null;
                    if ($this->cargoCoincide($cargo, ['usuario', 'solicitante', 'firma usuario'])) {
                        $celda = 'F40';
                    } elseif ($this->cargoCoincide($cargo, ['jefe inmediato', 'inmediato', 'jefe directo', 'avalado', 'avalado por', 'vo bo jefe inmediato'])) {
                        $celda = 'A44';
                    } elseif ($this->cargoCoincide($cargo, ['jefe de area', 'jefe area', 'jefe del area', 'coordinador area', 'vo bo jefe area'])) {
                        $celda = 'D44';
                    } elseif ($this->cargoCoincide($cargo, ['talento humano', 'recursos humanos', 'RRHH', 'jefe talento', 'vo bo talento humano', 'gestion humana'])) {
                        $celda = 'G44';
                    } elseif ($this->cargoCoincide($cargo, ['gestión', 'gestion', 'información', 'informacion', 'coordinador', 'sistemas', 'TI', 'vo bo gestion', 'coordinador tic'])) {
                        $celda = 'O44';
                    }
                    
                    \Log::info("Celda asignada para {$cargo}: " . ($celda ?? 'NINGUNA'));
                    
                    if ($celda) {
                        // Insertar imagen si es base64
                        if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                            try {
                                // Extraer datos base64
                                $imageData = explode(',', $firmaData);
                                if (count($imageData) === 2) {
                                    $imageBase64 = $imageData[1];
                                    $imageContent = base64_decode($imageBase64);
                                    
                                    // Crear carpeta organizada para firmas
                                    $firmasDir = storage_path("app/firmas/administrativa/{$solicitud->id}");
                                    if (!file_exists($firmasDir)) {
                                        mkdir($firmasDir, 0755, true);
                                    }
                                    
                                    // Nombre descriptivo
                                    $cargoSlug = str_replace(' ', '_', strtolower($cargo));
                                    $timestamp = date('YmdHis');
                                    $tempImagePath = "{$firmasDir}/{$cargoSlug}_{$timestamp}.png";
                                    file_put_contents($tempImagePath, $imageContent);
                                    
                                    // Insertar imagen en Excel
                                    $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                    $drawing->setName('Firma ' . $cargo);
                                    $drawing->setDescription('Firma de ' . $usuario);
                                    $drawing->setPath($tempImagePath);
                                    $drawing->setCoordinates($celda);
                                    $drawing->setHeight(60);
                                    $drawing->setOffsetX(10);
                                    $drawing->setOffsetY(5);
                                    $drawing->setWorksheet($sheet);
                                    
                                    \Log::info("Imagen de firma insertada exitosamente en celda {$celda}");
                                }
                            } catch (\Exception $e) {
                                \Log::error('Error insertando imagen de firma: ' . $e->getMessage());
                                // Fallback a texto - solo nombre
                                $sheet->setCellValue($celda, $usuario);
                            }
                        } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                            // Firma de texto con formato - solo nombre
                            $parts = explode('|', $firmaData);
                            $textoFirma = trim(str_replace('FIRMA_TEXTO:', '', $parts[0]));
                            $fontName = 'Brush Script MT';
                            $fontSize = 16;
                            
                            foreach ($parts as $part) {
                                if (strpos($part, 'SIZE:') === 0) {
                                    $fontSize = (int)str_replace('SIZE:', '', $part);
                                }
                            }
                            
                            \Log::info("Insertando firma de texto en {$celda}: '{$textoFirma}'");
                            
                            // Solo el nombre, sin saltos de línea
                            $sheet->setCellValue($celda, $textoFirma);
                            $sheet->getStyle($celda)->getFont()->setName($fontName)->setSize($fontSize);
                            $sheet->getStyle($celda)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        } else {
                            // Solo texto del usuario, sin fecha
                            $usuarioLimpio = trim($usuario);
                            \Log::info("Insertando nombre de usuario en {$celda}: '{$usuarioLimpio}'");
                            $sheet->setCellValue($celda, $usuarioLimpio);
                            $sheet->getStyle($celda)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        }
                    }
                }
            } else {
                \Log::warning('No se encontraron firmas para exportar en solicitud ' . $solicitud->id);
            }
            
            // ===== ACEPTA RESPONSABILIDAD (convertir a texto) =====
            $sheet->setCellValue('B52', $solicitud->acepta_responsabilidad ? 'X' : '');
            
            // LOGIN y CREADO POR (en las celdas correspondientes del template)
            $loginRow = 30; // Ajustar según el template
            $sheet->setCellValue('F' . $loginRow, $solicitud->login_creado_por ?? '');
            $sheet->setCellValue('N' . $loginRow, $solicitud->registrado_por_nombre ?? 'Sistema');
            
            // Agregar información adicional al final del documento
            $lastRow = $sheet->getHighestRow() + 3;
            
            $sheet->setCellValue('A' . $lastRow, '=== INFORMACIÓN ADICIONAL DEL SISTEMA ===');
            $sheet->getStyle('A' . $lastRow)->getFont()->setBold(true);
            
            $lastRow++;
            if ($solicitud->login_asignado) {
                $sheet->setCellValue('A' . $lastRow, 'Login asignado:');
                $sheet->setCellValue('B' . $lastRow, $solicitud->login_asignado);
                $lastRow++;
            }
            
            $sheet->setCellValue('A' . $lastRow, 'Estado:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->estado);
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Fase actual:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->fase_actual ?? 'N/A');
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Registrado por:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->registrado_por_nombre ?? 'Sistema');
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Fecha de registro:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->created_at->format('d/m/Y H:i:s'));
            $lastRow++;
            
            if ($solicitud->fecha_aprobacion) {
                $sheet->setCellValue('A' . $lastRow, 'Fecha de aprobación:');
                $sheet->setCellValue('B' . $lastRow, $solicitud->fecha_aprobacion->format('d/m/Y H:i:s'));
                $lastRow++;
            }
            
            if ($solicitud->observaciones_estado) {
                $sheet->setCellValue('A' . $lastRow, 'Observaciones:');
                $sheet->setCellValue('B' . $lastRow, $solicitud->observaciones_estado);
            }
            
            // Guardar en archivo temporal
            $fileName = 'Solicitud_Administrativa_' . $solicitud->id . '_' . date('YmdHis') . '.xlsx';
            $tempPath = storage_path('app/temp/' . $fileName);
            
            // Crear directorio si no existe
            if (!file_exists(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0755, true);
            }
            
            $writer = new Xlsx($spreadsheet);
            $writer->save($tempPath);
            
            // Retornar el archivo
            return response()->download($tempPath, $fileName)->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al generar el archivo',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Exportar solicitud de historia clínica individual a Excel
     */
    public function exportarHistoriaClinica($id)
    {
        $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historialEstados', 'firmasSolicitud.paso'])->findOrFail($id);
        
        // Usar el template VACÍO para exportación (sin texto descriptivo)
        $templatePath = public_path('Documentos/formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx');
        
        if (!file_exists($templatePath)) {
            return response()->json([
                'error' => 'Template no encontrado: ' . $templatePath
            ], 404);
        }
        
        try {
            // Cargar el template
            $spreadsheet = IOFactory::load($templatePath);
            $sheet = $spreadsheet->getActiveSheet();
            
            // ===== MAPEO COMPLETO (igual que previsualización) =====
            
            // Fecha de solicitud
            $fecha = $solicitud->fecha_solicitud ? $solicitud->fecha_solicitud : now();
            $sheet->setCellValue('N6', is_object($fecha) ? $fecha->format('d') : date('d'));
            $sheet->setCellValue('O6', is_object($fecha) ? $fecha->format('m') : date('m'));
            $sheet->setCellValue('Q6', is_object($fecha) ? $fecha->format('Y') : date('Y'));
            
            // Datos básicos
            $sheet->setCellValue('F5', $solicitud->nombre_completo ?? '');
            $sheet->setCellValue('F7', $solicitud->cedula ?? '');
            $sheet->setCellValue('N7', $solicitud->celular ?? '');
            $sheet->setCellValue('F8', $solicitud->area_servicio ?? '');
            $sheet->setCellValue('N8', $solicitud->registro_codigo ?? '');
            $sheet->setCellValue('F9', $solicitud->especialidad ?? '');
            $sheet->setCellValue('K10', $solicitud->observaciones ?? '');
            $sheet->setCellValue('F10', $solicitud->correo_electronico ?? '');
            
            // Perfil
            $perfil = strtolower($solicitud->perfil ?? '');
            if (stripos($perfil, 'medico general') !== false) $sheet->setCellValue('G13', 'X');
            if (stripos($perfil, 'especialista') !== false) $sheet->setCellValue('G14', 'X');
            if (stripos($perfil, 'residente') !== false) $sheet->setCellValue('G15', 'X');
            if (stripos($perfil, 'enfermero jefe') !== false) $sheet->setCellValue('L13', 'X');
            if (stripos($perfil, 'auxiliar') !== false) $sheet->setCellValue('L14', 'X');
            if (stripos($perfil, 'terapeuta') !== false) $sheet->setCellValue('L15', 'X');
            if (stripos($perfil, 'auditor') !== false) $sheet->setCellValue('Q13', 'X');
            // Si es "Otro", escribir el texto
            if (stripos($perfil, 'otro') !== false && isset($solicitud->perfil_otro)) {
                $sheet->setCellValue('Q14', $solicitud->perfil_otro);
            }
            
            // Tipo de Vinculación (Interno/Externo) - M14
            $vinculacion = strtolower($solicitud->tipo_vinculacion ?? '');
            if (stripos($vinculacion, 'interno') !== false) {
                $sheet->setCellValue('M14', 'Interno (X)  Externo ( )');
            } elseif (stripos($vinculacion, 'externo') !== false) {
                $sheet->setCellValue('M14', 'Interno ( )  Externo (X)');
            }
            
            // Terminal
            $terminal = strtolower($solicitud->terminal_asignado ?? '');
            if (stripos($terminal, 'tablet') !== false) $sheet->setCellValue('G17', 'X');
            if (stripos($terminal, 'portatil') !== false) $sheet->setCellValue('G18', 'X');
            
            // Aval Institucional - M16 - Usar método robusto
            $aval = $this->toArray($solicitud->aval_institucional);
            if (!empty($aval)) {
                $textoAval = ($aval['avaladoPor'] ?? '') . ' - ' . ($aval['cargo'] ?? '');
                $sheet->setCellValue('M16', $textoAval);
            }
            
            // Capacitación Historia Clínica - Usar método robusto
            $cap = $this->toArray($solicitud->capacitacion_historia_clinica);
            if (!empty($cap)) {
                if ($cap['capacitacionRealizada'] ?? false) {
                    $sheet->setCellValue('B23', 'X');
                    $sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? $cap['instructor'] ?? $cap['capacitador'] ?? '');
                    $fechaCap = $cap['fechaCapacitacion'] ?? $cap['fecha'] ?? null;
                    if ($fechaCap) {
                        try {
                            $fechaCap = new \DateTime($fechaCap);
                            $sheet->setCellValue('N23', $fechaCap->format('d'));
                            $sheet->setCellValue('O23', $fechaCap->format('m'));
                            $sheet->setCellValue('Q23', $fechaCap->format('Y'));
                        } catch (\Exception $e) {
                            \Log::error('Error parseando fecha capacitación HC: ' . $e->getMessage());
                        }
                    }
                } else {
                    $sheet->setCellValue('D23', 'X');
                }
            }
            
            // Capacitación Epidemiología - Usar método robusto
            $cap = $this->toArray($solicitud->capacitacion_epidemiologia);
            if (!empty($cap)) {
                if ($cap['capacitacionRealizada'] ?? false) {
                    $sheet->setCellValue('B27', 'X');
                    $sheet->setCellValue('I26', $cap['nombreCapacitador'] ?? $cap['instructor'] ?? $cap['capacitador'] ?? '');
                    $fechaCap = $cap['fechaCapacitacion'] ?? $cap['fecha'] ?? null;
                    if ($fechaCap) {
                        try {
                            $fechaCap = new \DateTime($fechaCap);
                            $sheet->setCellValue('N27', $fechaCap->format('d'));
                            $sheet->setCellValue('O27', $fechaCap->format('m'));
                            $sheet->setCellValue('Q27', $fechaCap->format('Y'));
                        } catch (\Exception $e) {
                            \Log::error('Error parseando fecha capacitación Epi: ' . $e->getMessage());
                        }
                    }
                } else {
                    $sheet->setCellValue('D27', 'X');
                }
            }
            
            // Firmas (con imágenes) - Usar método unificado
            $firmasParaExportar = $this->obtenerFirmasParaExportacion($solicitud);
            
            if (!empty($firmasParaExportar)) {
                \Log::info('Procesando ' . count($firmasParaExportar) . ' firmas para exportación HC');
                
                foreach ($firmasParaExportar as $firma) {
                    $cargo = $firma['cargo'] ?? '';
                    $usuario = $firma['usuario'] ?? '';
                    $fecha = $firma['fecha'] ?? date('Y-m-d H:i:s');
                    $fechaFormateada = date('d/m/Y H:i', strtotime($fecha));
                    $firmaData = $firma['firma'] ?? '';
                    
                    // Mapear celda según cargo
                    $celda = null;
                    if ($this->cargoCoincide($cargo, ['usuario', 'solicitante', 'firma usuario'])) {
                        $celda = 'B30';
                    } elseif ($this->cargoCoincide($cargo, ['jefe inmediato', 'inmediato', 'jefe directo', 'avalado', 'avalado por', 'vo bo jefe inmediato'])) {
                        $celda = 'B33';
                    } elseif ($this->cargoCoincide($cargo, ['coordinador tic', 'coordinador', 'sistemas', 'TI', 'gestion informacion', 'gestión información', 'jefe gestion'])) {
                        $celda = 'N33';
                    } elseif ($this->cargoCoincide($cargo, ['talento humano', 'recursos humanos', 'RRHH', 'jefe talento'])) {
                        $celda = 'G33';
                    } elseif ($this->cargoCoincide($cargo, ['capacitador historia', 'capacitador HC', 'capacitador clínica', 'capacitador clinica'])) {
                        $celda = 'D22';
                    } elseif ($this->cargoCoincide($cargo, ['capacitador epidemiología', 'capacitador epidemiologia', 'capacitador epi'])) {
                        $celda = 'D26';
                    } elseif ($this->cargoCoincide($cargo, ['aval', 'aval institucional', 'avalado'])) {
                        $celda = 'B17';
                    }
                    
                    if ($celda) {
                        if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                            try {
                                $imageData = explode(',', $firmaData);
                                if (count($imageData) === 2) {
                                    $imageBase64 = $imageData[1];
                                    $imageContent = base64_decode($imageBase64);
                                    
                                    $firmasDir = storage_path("app/firmas/historia_clinica/{$solicitud->id}");
                                    if (!file_exists($firmasDir)) {
                                        mkdir($firmasDir, 0755, true);
                                    }
                                    
                                    $cargoSlug = str_replace(' ', '_', strtolower($cargo));
                                    $timestamp = date('YmdHis');
                                    $tempImagePath = "{$firmasDir}/{$cargoSlug}_{$timestamp}.png";
                                    file_put_contents($tempImagePath, $imageContent);
                                    
                                    $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                    $drawing->setName('Firma ' . $cargo);
                                    $drawing->setDescription('Firma de ' . $usuario);
                                    $drawing->setPath($tempImagePath);
                                    $drawing->setCoordinates($celda);
                                    $drawing->setHeight(50);
                                    $drawing->setOffsetX(10);
                                    $drawing->setOffsetY(5);
                                    $drawing->setWorksheet($sheet);
                                    
                                    \Log::info("Imagen de firma HC insertada exitosamente en celda {$celda}");
                                }
                            } catch (\Exception $e) {
                                \Log::error('Error insertando imagen de firma HC: ' . $e->getMessage());
                                // Fallback a texto - solo nombre
                                $sheet->setCellValue($celda, $usuario);
                            }
                        } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                            // Firma de texto con formato - solo nombre
                            $parts = explode('|', $firmaData);
                            $textoFirma = trim(str_replace('FIRMA_TEXTO:', '', $parts[0]));
                            $fontName = 'Brush Script MT';
                            $fontSize = 14;
                            
                            foreach ($parts as $part) {
                                if (strpos($part, 'SIZE:') === 0) {
                                    $fontSize = (int)str_replace('SIZE:', '', $part);
                                }
                            }
                            
                            \Log::info("Insertando firma HC de texto en {$celda}: '{$textoFirma}'");
                            
                            // Solo el nombre, sin saltos de línea
                            $sheet->setCellValue($celda, $textoFirma);
                            $sheet->getStyle($celda)->getFont()->setName($fontName)->setSize($fontSize);
                            $sheet->getStyle($celda)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        } else {
                            // Solo texto del usuario, sin fecha
                            $usuarioLimpio = trim($usuario);
                            \Log::info("Insertando nombre HC en {$celda}: '{$usuarioLimpio}'");
                            $sheet->setCellValue($celda, $usuarioLimpio);
                            $sheet->getStyle($celda)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        }
                    }
                }
            } else {
                \Log::warning('No se encontraron firmas para exportar en solicitud HC ' . $solicitud->id);
            }
            
            // LOGIN y CREADO POR (en las celdas correspondientes del template)
            $loginRow = 30; // Ajustar según el template
            $sheet->setCellValue('F' . $loginRow, $solicitud->login_creado_por ?? '');
            $sheet->setCellValue('N' . $loginRow, $solicitud->registrado_por_nombre ?? 'Sistema');
            
            // Agregar información adicional al final del documento
            $lastRow = $sheet->getHighestRow() + 3;
            
            $sheet->setCellValue('A' . $lastRow, '=== INFORMACIÓN ADICIONAL DEL SISTEMA ===');
            $sheet->getStyle('A' . $lastRow)->getFont()->setBold(true);
            
            $lastRow++;
            $sheet->setCellValue('A' . $lastRow, 'Estado:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->estado);
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Fase actual:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->fase_actual ?? 'N/A');
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Registrado por:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->registrado_por_nombre ?? 'Sistema');
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Email registrador:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->registrado_por_email ?? 'N/A');
            $lastRow++;
            
            $sheet->setCellValue('A' . $lastRow, 'Fecha de registro:');
            $sheet->setCellValue('B' . $lastRow, $solicitud->created_at->format('d/m/Y H:i:s'));
            $lastRow++;
            
            if ($solicitud->fecha_aprobacion) {
                $sheet->setCellValue('A' . $lastRow, 'Fecha de aprobación:');
                $sheet->setCellValue('B' . $lastRow, $solicitud->fecha_aprobacion->format('d/m/Y H:i:s'));
                $lastRow++;
            }
            
            if ($solicitud->observaciones_estado) {
                $sheet->setCellValue('A' . $lastRow, 'Observaciones:');
                $sheet->setCellValue('B' . $lastRow, $solicitud->observaciones_estado);
            }
            
            // Guardar en archivo temporal
            $fileName = 'Solicitud_HistoriaClinica_' . $solicitud->id . '_' . date('YmdHis') . '.xlsx';
            $tempPath = storage_path('app/temp/' . $fileName);
            
            // Crear directorio si no existe
            if (!file_exists(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0755, true);
            }
            
            $writer = new Xlsx($spreadsheet);
            $writer->save($tempPath);
            
            // Retornar el archivo
            return response()->download($tempPath, $fileName)->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al generar el archivo',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Obtener metadatos de una solicitud para vista previa
     */
    public function obtenerMetadatos(Request $request)
    {
        $tipo = $request->input('tipo'); // 'administrativa' o 'historia_clinica'
        $id = $request->input('id');
        
        if ($tipo === 'administrativa') {
            $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'usuarioAprobador', 'historialEstados'])
                ->findOrFail($id);
                
            return response()->json([
                'id_unico' => $solicitud->id,
                'solicitante_nombre' => $solicitud->nombre_completo,
                'solicitante_telefono' => $solicitud->telefono_extension,
                'solicitante_cedula' => $solicitud->cedula,
                'usuario_creador' => $solicitud->registrado_por_nombre ?? $solicitud->usuarioCreador?->name ?? 'Sistema',
                'tipo_solicitud' => 'Administrativa',
                'fase_actual' => $solicitud->estado,
                'fecha_registro' => $solicitud->created_at->format('d/m/Y H:i:s'),
                'fecha_aprobacion' => $solicitud->fecha_aprobacion?->format('d/m/Y H:i:s'),
                'usuario_aprobador' => $solicitud->usuarioAprobador?->name,
                'historial' => $solicitud->historialEstados->map(function($h) {
                    return [
                        'estado' => $h->estado_nuevo,
                        'usuario' => $h->usuario_nombre,
                        'fecha' => $h->created_at->format('d/m/Y H:i:s'),
                        'observaciones' => $h->observaciones
                    ];
                })
            ]);
        } else {
            $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'usuarioAprobador', 'historialEstados'])
                ->findOrFail($id);
                
            return response()->json([
                'id_unico' => $solicitud->id,
                'solicitante_nombre' => $solicitud->nombre_completo,
                'solicitante_telefono' => $solicitud->celular,
                'solicitante_correo' => $solicitud->correo_electronico,
                'solicitante_cedula' => $solicitud->cedula,
                'usuario_creador' => $solicitud->registrado_por_nombre ?? $solicitud->usuarioCreador?->name ?? 'Sistema',
                'tipo_solicitud' => 'Historia Clínica',
                'fase_actual' => $solicitud->estado,
                'fecha_registro' => $solicitud->created_at->format('d/m/Y H:i:s'),
                'fecha_aprobacion' => $solicitud->fecha_aprobacion?->format('d/m/Y H:i:s'),
                'usuario_aprobador' => $solicitud->usuarioAprobador?->name,
                'historial' => $solicitud->historialEstados->map(function($h) {
                    return [
                        'estado' => $h->estado_nuevo,
                        'usuario' => $h->usuario_nombre,
                        'fecha' => $h->created_at->format('d/m/Y H:i:s'),
                        'observaciones' => $h->observaciones
                    ];
                })
            ]);
        }
    }
    
    /**
     * NUEVO: Exportar administrativa con sistema de respaldo automático
     * Nivel 1: OpenSpout (ultra-rápido, memoria mínima)
     * Nivel 2: CSV Nativo (fallback garantizado)
     */
    public function exportarAdministrativaConRespaldo($id)
    {
        \Log::info("🚀 Exportación con respaldo - Administrativa ID: {$id}");
        
        try {
            // NIVEL 1: OpenSpout (Principal - Ultra rápido)
            \Log::info("📊 Intentando exportación con OpenSpout");
            
            $filePath = $this->openSpoutService->exportarSolicitudAdministrativa($id);
            
            return response()->download($filePath, basename($filePath), [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ])->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            \Log::warning("⚠️ OpenSpout falló: " . $e->getMessage());
            
            try {
                // NIVEL 2: CSV Nativo (Fallback - Garantizado)
                \Log::info("📄 Intentando exportación con CSV nativo");
                
                $filePath = $this->csvService->exportarSolicitudAdministrativa($id);
                
                return response()->download($filePath, basename($filePath), [
                    'Content-Type' => 'text/csv; charset=UTF-8',
                ])->deleteFileAfterSend(true);
                
            } catch (\Exception $e2) {
                \Log::error("❌ Todos los métodos de exportación fallaron");
                \Log::error("OpenSpout: " . $e->getMessage());
                \Log::error("CSV: " . $e2->getMessage());
                
                return response()->json([
                    'error' => 'No se pudo exportar la solicitud',
                    'message' => 'Todos los métodos de exportación fallaron',
                    'details' => [
                        'openspout' => $e->getMessage(),
                        'csv' => $e2->getMessage(),
                    ]
                ], 500);
            }
        }
    }
    
    /**
     * NUEVO: Exportar historia clínica con sistema de respaldo automático
     */
    public function exportarHistoriaClinicaConRespaldo($id)
    {
        \Log::info("🚀 Exportación con respaldo - Historia Clínica ID: {$id}");
        
        try {
            // NIVEL 1: OpenSpout
            \Log::info("📊 Intentando exportación con OpenSpout");
            
            $filePath = $this->openSpoutService->exportarSolicitudHistoriaClinica($id);
            
            return response()->download($filePath, basename($filePath), [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ])->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            \Log::warning("⚠️ OpenSpout falló: " . $e->getMessage());
            
            try {
                // NIVEL 2: CSV Nativo
                \Log::info("📄 Intentando exportación con CSV nativo");
                
                $filePath = $this->csvService->exportarSolicitudHistoriaClinica($id);
                
                return response()->download($filePath, basename($filePath), [
                    'Content-Type' => 'text/csv; charset=UTF-8',
                ])->deleteFileAfterSend(true);
                
            } catch (\Exception $e2) {
                \Log::error("❌ Todos los métodos de exportación fallaron");
                
                return response()->json([
                    'error' => 'No se pudo exportar la solicitud',
                    'message' => 'Todos los métodos de exportación fallaron',
                    'details' => [
                        'openspout' => $e->getMessage(),
                        'csv' => $e2->getMessage(),
                    ]
                ], 500);
            }
        }
    }
    
    /**
     * Exportar administrativa como CSV directamente
     */
    public function exportarAdministrativaCSV($id)
    {
        try {
            $filePath = $this->csvService->exportarSolicitudAdministrativa($id);
            
            return response()->download($filePath, basename($filePath), [
                'Content-Type' => 'text/csv; charset=UTF-8',
            ])->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            \Log::error("CSV export failed: " . $e->getMessage());
            
            return response()->json([
                'error' => 'No se pudo exportar como CSV',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Exportar historia clínica como CSV directamente
     */
    public function exportarHistoriaClinicaCSV($id)
    {
        try {
            $filePath = $this->csvService->exportarSolicitudHistoriaClinica($id);
            
            return response()->download($filePath, basename($filePath), [
                'Content-Type' => 'text/csv; charset=UTF-8',
            ])->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            \Log::error("CSV export failed: " . $e->getMessage());
            
            return response()->json([
                'error' => 'No se pudo exportar como CSV',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
