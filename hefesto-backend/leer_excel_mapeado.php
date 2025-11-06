<?php

require __DIR__.'/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

echo "=== LEYENDO EXCEL MAPEADO ===\n\n";

$spreadsheet = IOFactory::load('storage/app/templates/formato_administrativo_MAPEADO.xlsx');
$sheet = $spreadsheet->getActiveSheet();

echo "DATOS ENCONTRADOS EN EL EXCEL:\n\n";

// Leer todas las filas hasta la 50
for ($row = 1; $row <= 50; $row++) {
    $hayDatos = false;
    $linea = "Fila $row: ";
    
    for ($col = 'A'; $col <= 'U'; $col++) {
        $cell = $col . $row;
        $value = $sheet->getCell($cell)->getValue();
        
        if ($value && trim($value) != '') {
            $value = trim($value);
            // Mostrar solo si no es una etiqueta común
            if (strlen($value) > 0) {
                $linea .= "$cell=[$value] ";
                $hayDatos = true;
            }
        }
    }
    
    if ($hayDatos) {
        echo $linea . "\n";
    }
}

echo "\n\n=== CELDAS COMBINADAS ===\n";
foreach ($sheet->getMergeCells() as $mergeRange) {
    echo "- $mergeRange\n";
}
