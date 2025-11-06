<?php

require __DIR__.'/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$spreadsheet = IOFactory::load('storage/app/templates/formato_administrativo.xlsx');
$sheet = $spreadsheet->getActiveSheet();

echo "=== MAPEO DE CAMPOS IMPORTANTES ===\n\n";

// Buscar campos clave
$campos = [
    'NOMBRE', 'CEDULA', 'CARGO', 'AREA', 'TELEFONO', 'VINCULACION',
    'Facturacion', 'Anticipos', 'Farmacia', 'Cartera', 'Glosas',
    'PERFIL', 'OPCIONES WEB', 'Internet', 'Correo', 'LOGIN', 'CLAVE',
    'FIRMA', 'Jefe', 'Talento', 'Gestion', 'Usuario'
];

for ($row = 1; $row <= 50; $row++) {
    for ($col = 'A'; $col <= 'U'; $col++) {
        $cell = $col . $row;
        $value = $sheet->getCell($cell)->getCalculatedValue();
        
        if ($value) {
            $value = trim($value);
            foreach ($campos as $campo) {
                if (stripos($value, $campo) !== false) {
                    echo "Fila $row, Celda $cell: $value\n";
                    break;
                }
            }
        }
    }
}
