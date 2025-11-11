<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class AnalizarTemplateExcel extends Command
{
    protected $signature = 'template:analizar {archivo}';
    protected $description = 'Analizar template Excel para encontrar celdas de firmas';

    public function handle()
    {
        $archivo = $this->argument('archivo');
        $path = storage_path('app/templates/' . $archivo);
        
        if (!file_exists($path)) {
            $this->error("Archivo no encontrado: {$path}");
            return Command::FAILURE;
        }
        
        $this->info("📄 Analizando: {$archivo}");
        $this->newLine();
        
        try {
            $spreadsheet = IOFactory::load($path);
            $sheet = $spreadsheet->getActiveSheet();
            $highestRow = $sheet->getHighestRow();
            $highestColumn = $sheet->getHighestColumn();
            
            $this->info("📊 Dimensiones: {$highestColumn}{$highestRow}");
            $this->newLine();
            
            // Buscar palabras clave relacionadas con firmas
            $keywords = ['firma', 'vo. bo', 'jefe', 'usuario', 'talento', 'gestión', 'gestion', 'inmediato'];
            
            $this->info("🔍 Buscando celdas con palabras clave de firmas...");
            $this->newLine();
            
            $encontradas = [];
            
            for ($row = 1; $row <= $highestRow; $row++) {
                for ($col = 'A'; $col <= $highestColumn; $col++) {
                    $celda = $col . $row;
                    $valor = $sheet->getCell($celda)->getValue();
                    
                    if (empty($valor)) continue;
                    
                    $valorLower = mb_strtolower($valor, 'UTF-8');
                    
                    foreach ($keywords as $keyword) {
                        if (stripos($valorLower, $keyword) !== false) {
                            $encontradas[] = [
                                'celda' => $celda,
                                'valor' => $valor,
                                'keyword' => $keyword
                            ];
                            break;
                        }
                    }
                }
            }
            
            // Agrupar por filas
            $porFila = [];
            foreach ($encontradas as $item) {
                preg_match('/([A-Z]+)(\d+)/', $item['celda'], $matches);
                $fila = $matches[2];
                if (!isset($porFila[$fila])) {
                    $porFila[$fila] = [];
                }
                $porFila[$fila][] = $item;
            }
            
            // Mostrar resultados agrupados
            ksort($porFila);
            foreach ($porFila as $fila => $items) {
                $this->line("--- Fila {$fila} ---");
                foreach ($items as $item) {
                    $this->line("  {$item['celda']}: " . substr($item['valor'], 0, 80));
                }
                $this->newLine();
            }
            
            $this->info("✅ Total de celdas encontradas: " . count($encontradas));
            
        } catch (\Exception $e) {
            $this->error("Error: " . $e->getMessage());
            return Command::FAILURE;
        }
        
        return Command::SUCCESS;
    }
}
