<?php

require __DIR__.'/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

echo "=== LEYENDO EXCEL HISTORIA CLINICA MAPEADO ===\n\n";

$spreadsheet = IOFactory::load('storage/app/templates/formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx');
$sheet = $spreadsheet->getActiveSheet();

echo "DATOS ENCONTRADOS:\n\n";

for ($row = 1; $row <= 40; $row++) {
    $hayDatos = false;
    $linea = "Fila $row: ";
    
    for ($col = 'A'; $col <= 'U'; $col++) {
        $cell = $col . $row;
        $value = $sheet->getCell($cell)->getValue();
        
        if ($value && trim($value) != '') {
            $value = trim($value);
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
