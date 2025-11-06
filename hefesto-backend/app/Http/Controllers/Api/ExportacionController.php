<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Html;

class ExportacionController extends Controller
{
    /**
     * Previsualizar solicitud administrativa como HTML
     */
    public function previsualizarAdministrativa($id)
    {
        try {
            // Primero exportar el Excel normalmente
            $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados'])->findOrFail($id);
            
            // Usar el template LIMPIO original
            $templatePath = storage_path('app/temp/formatocreacionusuariosAdministrativosv1.xlsx');
            
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
            
            // MÓDULOS ADMINISTRATIVOS
            if ($solicitud->modulos_administrativos) {
                $modulos = is_string($solicitud->modulos_administrativos) 
                    ? json_decode($solicitud->modulos_administrativos, true)
                    : $solicitud->modulos_administrativos;
                
                if (is_array($modulos)) {
                    $filaInicio = 20;
                    $modulosNombres = ['facturacion', 'anticipos', 'farmacia', 'suministros', 'cartera', 'glosas', 
                                      'admisiones', 'ayudasDiagnosticas', 'citasMedicas', 'cirugia', 'rips', 'anexos'];
                    
                    foreach ($modulosNombres as $index => $modulo) {
                        $fila = $filaInicio + $index;
                        if (isset($modulos[$modulo])) {
                            if (is_array($modulos[$modulo])) {
                                if ($modulos[$modulo]['adicionar'] ?? false) $sheet->setCellValue('D' . $fila, 'X');
                                if ($modulos[$modulo]['consultar'] ?? false) $sheet->setCellValue('F' . $fila, 'X');
                                if ($modulos[$modulo]['modificar'] ?? false) $sheet->setCellValue('H' . $fila, 'X');
                                if ($modulos[$modulo]['borrar'] ?? false) $sheet->setCellValue('J' . $fila, 'X');
                            } elseif ($modulos[$modulo]) {
                                $sheet->setCellValue('F' . $fila, 'X');
                            }
                        }
                    }
                }
            }
            
            // MÓDULOS FINANCIEROS
            if ($solicitud->modulos_financieros) {
                $modulos = is_string($solicitud->modulos_financieros) 
                    ? json_decode($solicitud->modulos_financieros, true)
                    : $solicitud->modulos_financieros;
                
                if (is_array($modulos)) {
                    $filaInicio = 20;
                    $modulosNombres = ['presupuesto', 'activosFijos', 'contabilidad', 'cuentasPorPagar', 
                                      'cajaYBancos', 'costos', 'administracionDocumentos'];
                    
                    foreach ($modulosNombres as $index => $modulo) {
                        $fila = $filaInicio + $index;
                        if (isset($modulos[$modulo])) {
                            if (is_array($modulos[$modulo])) {
                                if ($modulos[$modulo]['adicionar'] ?? false) $sheet->setCellValue('Q' . $fila, 'X');
                                if ($modulos[$modulo]['consultar'] ?? false) $sheet->setCellValue('R' . $fila, 'X');
                                if ($modulos[$modulo]['modificar'] ?? false) $sheet->setCellValue('S' . $fila, 'X');
                                if ($modulos[$modulo]['borrar'] ?? false) $sheet->setCellValue('U' . $fila, 'X');
                            } elseif ($modulos[$modulo]) {
                                $sheet->setCellValue('R' . $fila, 'X');
                            }
                        }
                    }
                }
            }
            
            // PERFIL DE
            $sheet->setCellValue('I33', $solicitud->perfil_de ?? '');
            
            // OPCIONES WEB
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
            
            // LOGIN Y CLAVE
            $sheet->setCellValue('C39', $solicitud->login_asignado ?? '');
            $sheet->setCellValue('P39', $solicitud->clave_temporal ?? '');
            
            // FIRMAS (con imágenes)
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
                        
                        $celda = null;
                        if (stripos($cargoLower, 'usuario') !== false || stripos($cargoLower, 'solicitante') !== false) {
                            $celda = 'F40';
                        } elseif (stripos($cargoLower, 'jefe inmediato') !== false) {
                            $celda = 'A45';
                        } elseif (stripos($cargoLower, 'talento humano') !== false) {
                            $celda = 'G45';
                        } elseif (stripos($cargoLower, 'gestion') !== false || stripos($cargoLower, 'informacion') !== false || stripos($cargoLower, 'coordinador') !== false) {
                            $celda = 'O45';
                        }
                        
                        if ($celda) {
                            if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                                try {
                                    $imageData = explode(',', $firmaData);
                                    if (count($imageData) === 2) {
                                        $imageBase64 = $imageData[1];
                                        $imageContent = base64_decode($imageBase64);
                                        $tempImagePath = storage_path('app/temp/firma_prev_' . md5($cargo . $solicitud->id) . '.png');
                                        file_put_contents($tempImagePath, $imageContent);
                                        
                                        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                        $drawing->setName('Firma ' . $cargo);
                                        $drawing->setDescription('Firma de ' . $usuario);
                                        $drawing->setPath($tempImagePath);
                                        $drawing->setCoordinates($celda);
                                        $drawing->setHeight(60);
                                        $drawing->setWorksheet($sheet);
                                        
                                        $filaTexto = (int)filter_var($celda, FILTER_SANITIZE_NUMBER_INT) + 3;
                                        $columnaTexto = preg_replace('/[0-9]+/', '', $celda);
                                        $sheet->setCellValue($columnaTexto . $filaTexto, $usuario . "\n" . $fechaFormateada);
                                        $sheet->getStyle($columnaTexto . $filaTexto)->getAlignment()->setWrapText(true);
                                    }
                                } catch (\Exception $e) {
                                    $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                                }
                            } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                                $textoFirma = str_replace('FIRMA_TEXTO:', '', $firmaData);
                                $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                                $sheet->getStyle($celda)->getFont()->setName('Brush Script MT')->setSize(16);
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
            
            // Usar el template LIMPIO original
            $templatePath = storage_path('app/temp/formatocreacionusuarioshistoriaclinicaelectronicav.xlsx');
            
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
            
            // Aval Institucional - M16
            if ($solicitud->aval_institucional) {
                $aval = is_string($solicitud->aval_institucional) 
                    ? json_decode($solicitud->aval_institucional, true)
                    : $solicitud->aval_institucional;
                
                if (is_array($aval)) {
                    $textoAval = ($aval['avaladoPor'] ?? '') . ' - ' . ($aval['cargo'] ?? '');
                    $sheet->setCellValue('M16', $textoAval);
                }
            }
            
            // Capacitación Historia Clínica
            if ($solicitud->capacitacion_historia_clinica) {
                $cap = is_string($solicitud->capacitacion_historia_clinica) 
                    ? json_decode($solicitud->capacitacion_historia_clinica, true)
                    : $solicitud->capacitacion_historia_clinica;
                
                if (is_array($cap)) {
                    if ($cap['capacitacionRealizada'] ?? false) {
                        $sheet->setCellValue('B23', 'X');
                        $sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? '');
                        if (isset($cap['fechaCapacitacion'])) {
                            $fechaCap = new \DateTime($cap['fechaCapacitacion']);
                            $sheet->setCellValue('N23', $fechaCap->format('d'));
                            $sheet->setCellValue('O23', $fechaCap->format('m'));
                            $sheet->setCellValue('Q23', $fechaCap->format('Y'));
                        }
                    } else {
                        $sheet->setCellValue('D23', 'X');
                    }
                }
            }
            
            // Capacitación Epidemiología
            if ($solicitud->capacitacion_epidemiologia) {
                $cap = is_string($solicitud->capacitacion_epidemiologia) 
                    ? json_decode($solicitud->capacitacion_epidemiologia, true)
                    : $solicitud->capacitacion_epidemiologia;
                
                if (is_array($cap)) {
                    if ($cap['capacitacionRealizada'] ?? false) {
                        $sheet->setCellValue('B27', 'X');
                        $sheet->setCellValue('I26', $cap['nombreCapacitador'] ?? '');
                        if (isset($cap['fechaCapacitacion'])) {
                            $fechaCap = new \DateTime($cap['fechaCapacitacion']);
                            $sheet->setCellValue('N27', $fechaCap->format('d'));
                            $sheet->setCellValue('O27', $fechaCap->format('m'));
                            $sheet->setCellValue('Q27', $fechaCap->format('Y'));
                        }
                    } else {
                        $sheet->setCellValue('D27', 'X');
                    }
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
                        
                        // Mapear celdas según cargo
                        $celda = null;
                        if (stripos($cargoLower, 'usuario') !== false || stripos($cargoLower, 'solicitante') !== false) {
                            $celda = 'A29';
                        } elseif (stripos($cargoLower, 'capacitador') !== false && stripos($cargoLower, 'historia') !== false) {
                            $celda = 'I24';
                        } elseif (stripos($cargoLower, 'capacitador') !== false && stripos($cargoLower, 'epidemiologia') !== false) {
                            $celda = 'I28';
                        } elseif (stripos($cargoLower, 'aval') !== false) {
                            $celda = 'M17';
                        }
                        
                        if ($celda) {
                            if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                                try {
                                    $imageData = explode(',', $firmaData);
                                    if (count($imageData) === 2) {
                                        $imageBase64 = $imageData[1];
                                        $imageContent = base64_decode($imageBase64);
                                        $tempImagePath = storage_path('app/temp/firma_hc_prev_' . md5($cargo . $solicitud->id) . '.png');
                                        file_put_contents($tempImagePath, $imageContent);
                                        
                                        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                        $drawing->setName('Firma ' . $cargo);
                                        $drawing->setDescription('Firma de ' . $usuario);
                                        $drawing->setPath($tempImagePath);
                                        $drawing->setCoordinates($celda);
                                        $drawing->setHeight(50);
                                        $drawing->setWorksheet($sheet);
                                    }
                                } catch (\Exception $e) {
                                    $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                                }
                            } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                                $textoFirma = str_replace('FIRMA_TEXTO:', '', $firmaData);
                                $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                                $sheet->getStyle($celda)->getFont()->setName('Brush Script MT')->setSize(14);
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
        $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historialEstados'])->findOrFail($id);
        
        // Usar el template LIMPIO original
        $templatePath = storage_path('app/temp/formatocreacionusuariosAdministrativosv1.xlsx');
        
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
            
            // ===== MÓDULOS ADMINISTRATIVOS (Columnas: A=Adicionar, C=Consultar, M=Modificar, B=Borrar) =====
            \Log::info('Módulos administrativos raw:', ['data' => $solicitud->modulos_administrativos]);
            if ($solicitud->modulos_administrativos) {
                $modulos = is_string($solicitud->modulos_administrativos) 
                    ? json_decode($solicitud->modulos_administrativos, true)
                    : $solicitud->modulos_administrativos;
                
                \Log::info('Módulos administrativos procesados:', ['modulos' => $modulos, 'es_array' => is_array($modulos)]);
                if (is_array($modulos)) {
                    // Filas 20-31: Facturación, Anticipos, Farmacia, Suministros, Cartera, Glosas, 
                    // Admisiones, Ayudas Diagnósticas, Citas Médicas, Cirugía, RIPS, Anexos
                    // Columnas según mapeo: D=A, F=C, H=M, J=B
                    $filaInicio = 20;
                    $modulosNombres = ['facturacion', 'anticipos', 'farmacia', 'suministros', 'cartera', 'glosas', 
                                      'admisiones', 'ayudasDiagnosticas', 'citasMedicas', 'cirugia', 'rips', 'anexos'];
                    
                    foreach ($modulosNombres as $index => $modulo) {
                        $fila = $filaInicio + $index;
                        
                        if (isset($modulos[$modulo])) {
                            if (is_array($modulos[$modulo])) {
                                // Formato completo con permisos
                                if ($modulos[$modulo]['adicionar'] ?? false) $sheet->setCellValue('D' . $fila, 'X');
                                if ($modulos[$modulo]['consultar'] ?? false) $sheet->setCellValue('F' . $fila, 'X');
                                if ($modulos[$modulo]['modificar'] ?? false) $sheet->setCellValue('H' . $fila, 'X');
                                if ($modulos[$modulo]['borrar'] ?? false) $sheet->setCellValue('J' . $fila, 'X');
                            } elseif ($modulos[$modulo]) {
                                // Formato simple: marcar solo Consultar
                                $sheet->setCellValue('F' . $fila, 'X');
                            }
                        }
                    }
                }
            }
            
            // ===== MÓDULOS FINANCIEROS (Columnas: A=Adicionar, C=Consultar, M=Modificar, B=Borrar) =====
            if ($solicitud->modulos_financieros) {
                $modulos = is_string($solicitud->modulos_financieros) 
                    ? json_decode($solicitud->modulos_financieros, true)
                    : $solicitud->modulos_financieros;
                
                if (is_array($modulos)) {
                    // Filas 20-26: Presupuesto, Activos Fijos, Contabilidad, Cuentas por Pagar, 
                    // Caja y Bancos, Costos, Adm. De Documentos
                    // Columnas según mapeo: Q=A, R=C, S=M, U=B
                    $filaInicio = 20;
                    $modulosNombres = ['presupuesto', 'activosFijos', 'contabilidad', 'cuentasPorPagar', 
                                      'cajaYBancos', 'costos', 'administracionDocumentos'];
                    
                    foreach ($modulosNombres as $index => $modulo) {
                        $fila = $filaInicio + $index;
                        
                        if (isset($modulos[$modulo])) {
                            if (is_array($modulos[$modulo])) {
                                // Formato completo con permisos
                                if ($modulos[$modulo]['adicionar'] ?? false) $sheet->setCellValue('Q' . $fila, 'X');
                                if ($modulos[$modulo]['consultar'] ?? false) $sheet->setCellValue('R' . $fila, 'X');
                                if ($modulos[$modulo]['modificar'] ?? false) $sheet->setCellValue('S' . $fila, 'X');
                                if ($modulos[$modulo]['borrar'] ?? false) $sheet->setCellValue('U' . $fila, 'X');
                            } elseif ($modulos[$modulo]) {
                                // Formato simple: marcar solo Consultar
                                $sheet->setCellValue('R' . $fila, 'X');
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
                
                if (is_array($permisos)) {
                    foreach ($permisos as $permiso) {
                        // Mapear según tipo de permiso - ajustar según Excel
                        if (stripos($permiso, 'consulta') !== false) $sheet->setCellValue('A23', 'X');
                        if (stripos($permiso, 'modificacion') !== false) $sheet->setCellValue('B23', 'X');
                        if (stripos($permiso, 'anulacion') !== false) $sheet->setCellValue('C23', 'X');
                        if (stripos($permiso, 'borrado') !== false) $sheet->setCellValue('D23', 'X');
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
                        
                        // Determinar celda según cargo
                        $celda = null;
                        if (stripos($cargoLower, 'usuario') !== false || stripos($cargoLower, 'solicitante') !== false) {
                            $celda = 'F40';
                        } elseif (stripos($cargoLower, 'jefe inmediato') !== false) {
                            $celda = 'A45';
                        } elseif (stripos($cargoLower, 'talento humano') !== false) {
                            $celda = 'G45';
                        } elseif (stripos($cargoLower, 'gestion') !== false || stripos($cargoLower, 'informacion') !== false || stripos($cargoLower, 'coordinador') !== false) {
                            $celda = 'O45';
                        }
                        
                        if ($celda) {
                            // Insertar imagen si es base64
                            if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                                try {
                                    // Extraer datos base64
                                    $imageData = explode(',', $firmaData);
                                    if (count($imageData) === 2) {
                                        $imageBase64 = $imageData[1];
                                        $imageContent = base64_decode($imageBase64);
                                        
                                        // Guardar temporalmente
                                        $tempImagePath = storage_path('app/temp/firma_' . md5($cargo . $solicitud->id) . '.png');
                                        file_put_contents($tempImagePath, $imageContent);
                                        
                                        // Insertar imagen en Excel
                                        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                        $drawing->setName('Firma ' . $cargo);
                                        $drawing->setDescription('Firma de ' . $usuario);
                                        $drawing->setPath($tempImagePath);
                                        $drawing->setCoordinates($celda);
                                        $drawing->setHeight(60); // Altura en píxeles
                                        $drawing->setWorksheet($sheet);
                                        
                                        // Agregar texto debajo de la imagen
                                        $filaTexto = (int)filter_var($celda, FILTER_SANITIZE_NUMBER_INT) + 3;
                                        $columnaTexto = preg_replace('/[0-9]+/', '', $celda);
                                        $sheet->setCellValue($columnaTexto . $filaTexto, $usuario . "\n" . $fechaFormateada);
                                        $sheet->getStyle($columnaTexto . $filaTexto)->getAlignment()->setWrapText(true);
                                    }
                                } catch (\Exception $e) {
                                    \Log::error('Error insertando imagen de firma: ' . $e->getMessage());
                                    // Fallback a texto
                                    $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                                }
                            } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                                // Firma de texto
                                $textoFirma = str_replace('FIRMA_TEXTO:', '', $firmaData);
                                $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                                $sheet->getStyle($celda)->getFont()->setName('Brush Script MT')->setSize(16);
                            } else {
                                // Solo texto del usuario
                                $sheet->setCellValue($celda, $usuario . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                            }
                        }
                    }
                }
            }
            
            // ===== ACEPTA RESPONSABILIDAD (convertir a texto) =====
            $sheet->setCellValue('B52', $solicitud->acepta_responsabilidad ? 'X' : '');
            
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
        $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historialEstados'])->findOrFail($id);
        
        // Usar el template LIMPIO original
        $templatePath = storage_path('app/temp/formatocreacionusuarioshistoriaclinicaelectronicav.xlsx');
        
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
            
            // Aval Institucional - M16
            if ($solicitud->aval_institucional) {
                $aval = is_string($solicitud->aval_institucional) 
                    ? json_decode($solicitud->aval_institucional, true)
                    : $solicitud->aval_institucional;
                
                if (is_array($aval)) {
                    $textoAval = ($aval['avaladoPor'] ?? '') . ' - ' . ($aval['cargo'] ?? '');
                    $sheet->setCellValue('M16', $textoAval);
                }
            }
            
            // Capacitación Historia Clínica
            if ($solicitud->capacitacion_historia_clinica) {
                $cap = is_string($solicitud->capacitacion_historia_clinica) 
                    ? json_decode($solicitud->capacitacion_historia_clinica, true)
                    : $solicitud->capacitacion_historia_clinica;
                
                if (is_array($cap)) {
                    if ($cap['capacitacionRealizada'] ?? false) {
                        $sheet->setCellValue('B23', 'X');
                        $sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? '');
                        if (isset($cap['fechaCapacitacion'])) {
                            $fechaCap = new \DateTime($cap['fechaCapacitacion']);
                            $sheet->setCellValue('N23', $fechaCap->format('d'));
                            $sheet->setCellValue('O23', $fechaCap->format('m'));
                            $sheet->setCellValue('Q23', $fechaCap->format('Y'));
                        }
                    } else {
                        $sheet->setCellValue('D23', 'X');
                    }
                }
            }
            
            // Capacitación Epidemiología
            if ($solicitud->capacitacion_epidemiologia) {
                $cap = is_string($solicitud->capacitacion_epidemiologia) 
                    ? json_decode($solicitud->capacitacion_epidemiologia, true)
                    : $solicitud->capacitacion_epidemiologia;
                
                if (is_array($cap)) {
                    if ($cap['capacitacionRealizada'] ?? false) {
                        $sheet->setCellValue('B27', 'X');
                        $sheet->setCellValue('I26', $cap['nombreCapacitador'] ?? '');
                        if (isset($cap['fechaCapacitacion'])) {
                            $fechaCap = new \DateTime($cap['fechaCapacitacion']);
                            $sheet->setCellValue('N27', $fechaCap->format('d'));
                            $sheet->setCellValue('O27', $fechaCap->format('m'));
                            $sheet->setCellValue('Q27', $fechaCap->format('Y'));
                        }
                    } else {
                        $sheet->setCellValue('D27', 'X');
                    }
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
                        
                        // Mapear celdas según cargo
                        $celda = null;
                        if (stripos($cargoLower, 'usuario') !== false || stripos($cargoLower, 'solicitante') !== false) {
                            $celda = 'A29';
                        } elseif (stripos($cargoLower, 'capacitador') !== false && stripos($cargoLower, 'historia') !== false) {
                            $celda = 'I24';
                        } elseif (stripos($cargoLower, 'capacitador') !== false && stripos($cargoLower, 'epidemiologia') !== false) {
                            $celda = 'I28';
                        } elseif (stripos($cargoLower, 'aval') !== false) {
                            $celda = 'M17';
                        }
                        
                        if ($celda) {
                            if (!empty($firmaData) && strpos($firmaData, 'data:image') === 0) {
                                try {
                                    $imageData = explode(',', $firmaData);
                                    if (count($imageData) === 2) {
                                        $imageBase64 = $imageData[1];
                                        $imageContent = base64_decode($imageBase64);
                                        $tempImagePath = storage_path('app/temp/firma_hc_' . md5($cargo . $solicitud->id) . '.png');
                                        file_put_contents($tempImagePath, $imageContent);
                                        
                                        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                                        $drawing->setName('Firma ' . $cargo);
                                        $drawing->setDescription('Firma de ' . $usuario);
                                        $drawing->setPath($tempImagePath);
                                        $drawing->setCoordinates($celda);
                                        $drawing->setHeight(50);
                                        $drawing->setWorksheet($sheet);
                                    }
                                } catch (\Exception $e) {
                                    \Log::error('Error insertando imagen de firma HC: ' . $e->getMessage());
                                    $sheet->setCellValue($celda, $usuario . ' - ' . $fechaFormateada);
                                }
                            } elseif (!empty($firmaData) && strpos($firmaData, 'FIRMA_TEXTO:') === 0) {
                                $textoFirma = str_replace('FIRMA_TEXTO:', '', $firmaData);
                                $sheet->setCellValue($celda, $textoFirma . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                                $sheet->getStyle($celda)->getFont()->setName('Brush Script MT')->setSize(14);
                            } else {
                                $sheet->setCellValue($celda, $usuario . "\n" . $fechaFormateada);
                                $sheet->getStyle($celda)->getAlignment()->setWrapText(true);
                            }
                        }
                    }
                }
            }
            
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
}
