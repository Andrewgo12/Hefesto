<?php

require __DIR__.'/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

echo "=== ANÁLISIS DE CELDAS COMBINADAS ===\n\n";

$spreadsheet = IOFactory::load('storage/app/templates/formato_administrativo.xlsx');
$sheet = $spreadsheet->getActiveSheet();

echo "CELDAS COMBINADAS:\n";
foreach ($sheet->getMergeCells() as $mergeRange) {
    echo "- $mergeRange\n";
}

echo "\n\n=== VALORES EN TODAS LAS FILAS ===\n";
for ($row = 1; $row <= 50; $row++) {
    echo "\nFila $row:\n";
    for ($col = 'A'; $col <= 'U'; $col++) {
        $cell = $col . $row;
        $value = $sheet->getCell($cell)->getValue();
        if ($value) {
            echo "  $cell: $value\n";
        }
    }
}
