<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class VerificarTemplates extends Command
{
    protected $signature = 'templates:verificar';
    protected $description = 'Verificar que todos los templates Excel estén correctamente configurados';

    public function handle()
    {
        $this->info('🔍 VERIFICACIÓN DE TEMPLATES EXCEL');
        $this->newLine();
        
        $templates = [
            [
                'nombre' => 'Administrativo MAPEADO (Previsualización)',
                'archivo' => 'formato_administrativo_MAPEADO.xlsx',
                'tipo' => 'mapeado',
                'celdas_criticas' => [
                    'C6' => 'Fecha Día',
                    'C8' => 'Nombre Completo',
                    'C10' => 'Cédula',
                    'P10' => 'Cargo',
                    'C39' => 'Login',
                    'F40' => 'Firma Usuario',
                    'A44' => 'Firma Jefe Inmediato',
                ]
            ],
            [
                'nombre' => 'Administrativo VACÍO (Exportación)',
                'archivo' => 'formato_administrativo_MAPEADOVacio.xlsx',
                'tipo' => 'vacio',
                'celdas_criticas' => [
                    'C6' => 'Fecha Día',
                    'C8' => 'Nombre Completo',
                    'C10' => 'Cédula',
                    'P10' => 'Cargo',
                    'C39' => 'Login',
                ]
            ],
            [
                'nombre' => 'Historia Clínica MAPEADO (Previsualización)',
                'archivo' => 'formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx',
                'tipo' => 'mapeado',
                'celdas_criticas' => [
                    'F5' => 'Nombre Completo',
                    'N6' => 'Fecha Día',
                    'F7' => 'Cédula',
                    'N7' => 'Celular',
                    'F8' => 'Área/Servicio',
                    'A29' => 'Firma Usuario',
                ]
            ],
            [
                'nombre' => 'Historia Clínica VACÍO (Exportación)',
                'archivo' => 'formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx',
                'tipo' => 'vacio',
                'celdas_criticas' => [
                    'F5' => 'Nombre Completo',
                    'N6' => 'Fecha Día',
                    'F7' => 'Cédula',
                    'N7' => 'Celular',
                    'F8' => 'Área/Servicio',
                ]
            ],
        ];
        
        $todosOk = true;
        
        foreach ($templates as $template) {
            $this->verificarTemplate($template, $todosOk);
        }
        
        $this->newLine();
        if ($todosOk) {
            $this->info('✅ TODOS LOS TEMPLATES ESTÁN CORRECTAMENTE CONFIGURADOS');
            return Command::SUCCESS;
        } else {
            $this->error('❌ ALGUNOS TEMPLATES TIENEN PROBLEMAS');
            return Command::FAILURE;
        }
    }
    
    private function verificarTemplate($template, &$todosOk)
    {
        $this->line("📄 {$template['nombre']}");
        $this->line("   Archivo: {$template['archivo']}");
        
        $path = storage_path('app/templates/' . $template['archivo']);
        
        // Verificar existencia
        if (!file_exists($path)) {
            $this->error("   ❌ Archivo no encontrado: {$path}");
            $todosOk = false;
            $this->newLine();
            return;
        }
        
        $this->info("   ✅ Archivo existe");
        
        // Verificar tamaño
        $size = filesize($path);
        $sizeKB = round($size / 1024, 2);
        $this->line("   📊 Tamaño: {$sizeKB} KB");
        
        if ($size < 1000) {
            $this->warn("   ⚠️  Archivo muy pequeño, podría estar corrupto");
            $todosOk = false;
        }
        
        // Verificar estructura Excel
        try {
            $spreadsheet = IOFactory::load($path);
            $sheet = $spreadsheet->getActiveSheet();
            
            $highestRow = $sheet->getHighestRow();
            $highestColumn = $sheet->getHighestColumn();
            
            $this->line("   📐 Dimensiones: {$highestColumn}{$highestRow}");
            
            // Verificar celdas críticas
            $celdasOk = 0;
            $celdasTotal = count($template['celdas_criticas']);
            
            foreach ($template['celdas_criticas'] as $celda => $descripcion) {
                $valor = $sheet->getCell($celda)->getValue();
                
                if ($template['tipo'] === 'mapeado') {
                    // En templates mapeados, las celdas deben tener texto descriptivo
                    if (!empty($valor) && strlen($valor) > 5) {
                        $celdasOk++;
                    } else {
                        $this->warn("   ⚠️  Celda {$celda} ({$descripcion}) vacía o sin descripción");
                    }
                } else {
                    // En templates vacíos, las celdas deben estar vacías o con encabezados
                    $celdasOk++;
                }
            }
            
            if ($celdasOk === $celdasTotal) {
                $this->info("   ✅ Todas las celdas críticas verificadas ({$celdasOk}/{$celdasTotal})");
            } else {
                $this->warn("   ⚠️  Celdas verificadas: {$celdasOk}/{$celdasTotal}");
            }
            
            // Verificar que tenga contenido en las primeras filas
            $contenidoInicial = false;
            for ($row = 1; $row <= 10; $row++) {
                for ($col = 'A'; $col <= 'E'; $col++) {
                    $valor = $sheet->getCell($col . $row)->getValue();
                    if (!empty($valor) && strlen($valor) > 3) {
                        $contenidoInicial = true;
                        break 2;
                    }
                }
            }
            
            if ($contenidoInicial) {
                $this->info("   ✅ Template tiene contenido inicial");
            } else {
                $this->error("   ❌ Template parece estar vacío");
                $todosOk = false;
            }
            
            // Buscar palabras clave según el tipo
            $keywords = $template['archivo'] === 'formato_administrativo_MAPEADO.xlsx' || 
                        $template['archivo'] === 'formato_administrativo_MAPEADOVacio.xlsx'
                ? ['HOSPITAL', 'ADMINISTRATIVOS', 'SERVINTE']
                : ['HOSPITAL', 'HISTORIA', 'CLINICA', 'ELECTRONICA'];
            
            $keywordsEncontradas = 0;
            for ($row = 1; $row <= 20; $row++) {
                for ($col = 'A'; $col <= 'T'; $col++) {
                    $valor = $sheet->getCell($col . $row)->getValue();
                    if (empty($valor)) continue;
                    
                    $valorUpper = mb_strtoupper($valor, 'UTF-8');
                    foreach ($keywords as $keyword) {
                        if (stripos($valorUpper, $keyword) !== false) {
                            $keywordsEncontradas++;
                            break;
                        }
                    }
                }
            }
            
            if ($keywordsEncontradas >= 2) {
                $this->info("   ✅ Palabras clave del formato encontradas ({$keywordsEncontradas})");
            } else {
                $this->warn("   ⚠️  Pocas palabras clave encontradas ({$keywordsEncontradas})");
            }
            
        } catch (\Exception $e) {
            $this->error("   ❌ Error al leer Excel: " . $e->getMessage());
            $todosOk = false;
        }
        
        $this->newLine();
    }
}
