<?php

$file = __DIR__ . '/app/Http/Controllers/Api/ExportacionController.php';
$content = file_get_contents($file);

// Corrección 1: Capacitación Historia Clínica - cambiar nombreCapacitador por múltiples opciones
$content = str_replace(
    "\$sheet->setCellValue('I22', \$cap['nombreCapacitador'] ?? '');",
    "\$sheet->setCellValue('I22', \$cap['nombreCapacitador'] ?? \$cap['instructor'] ?? \$cap['capacitador'] ?? '');",
    $content
);

// Corrección 2: Capacitación Historia Clínica - cambiar fechaCapacitacion por múltiples opciones
$content = str_replace(
    "if (isset(\$cap['fechaCapacitacion'])) {\n                        \$fechaCap = new \\DateTime(\$cap['fechaCapacitacion']);",
    "\$fechaCap = \$cap['fechaCapacitacion'] ?? \$cap['fecha'] ?? null;\n                    if (\$fechaCap) {\n                        try {\n                            \$fechaCap = new \\DateTime(\$fechaCap);",
    $content
);

// Corrección 3: Agregar cierre de try-catch para fechaCapacitacion HC
$content = str_replace(
    "                        \$sheet->setCellValue('N23', \$fechaCap->format('d'));\n                        \$sheet->setCellValue('O23', \$fechaCap->format('m'));\n                        \$sheet->setCellValue('Q23', \$fechaCap->format('Y'));\n                    }",
    "                            \$sheet->setCellValue('N23', \$fechaCap->format('d'));\n                            \$sheet->setCellValue('O23', \$fechaCap->format('m'));\n                            \$sheet->setCellValue('Q23', \$fechaCap->format('Y'));\n                        } catch (\\Exception \$e) {\n                            \\Log::error('Error parseando fecha capacitación HC: ' . \$e->getMessage());\n                        }\n                    }",
    $content
);

// Corrección 4: Capacitación Epidemiología - cambiar nombreCapacitador
$content = str_replace(
    "\$sheet->setCellValue('I26', \$cap['nombreCapacitador'] ?? '');",
    "\$sheet->setCellValue('I26', \$cap['nombreCapacitador'] ?? \$cap['instructor'] ?? \$cap['capacitador'] ?? '');",
    $content
);

// Corrección 5: Capacitación Epidemiología - cambiar fechaCapacitacion
$content = str_replace(
    "if (isset(\$cap['fechaCapacitacion'])) {\n                        \$fechaCap = new \\DateTime(\$cap['fechaCapacitacion']);",
    "\$fechaCap = \$cap['fechaCapacitacion'] ?? \$cap['fecha'] ?? null;\n                    if (\$fechaCap) {\n                        try {\n                            \$fechaCap = new \\DateTime(\$fechaCap);",
    $content
);

// Corrección 6: Agregar cierre de try-catch para fechaCapacitacion Epi
$content = str_replace(
    "                        \$sheet->setCellValue('N27', \$fechaCap->format('d'));\n                        \$sheet->setCellValue('O27', \$fechaCap->format('m'));\n                        \$sheet->setCellValue('Q27', \$fechaCap->format('Y'));\n                    }",
    "                            \$sheet->setCellValue('N27', \$fechaCap->format('d'));\n                            \$sheet->setCellValue('O27', \$fechaCap->format('m'));\n                            \$sheet->setCellValue('Q27', \$fechaCap->format('Y'));\n                        } catch (\\Exception \$e) {\n                            \\Log::error('Error parseando fecha capacitación Epi: ' . \$e->getMessage());\n                        }\n                    }",
    $content
);

// Corrección 7: Agregar LOGIN y CREADO POR después de las firmas (buscar la línea específica)
$content = str_replace(
    "            // Agregar información adicional al final del documento\n            \$lastRow = \$sheet->getHighestRow() + 3;",
    "            // LOGIN y CREADO POR (en las celdas correspondientes del template)\n            \$loginRow = 30; // Ajustar según el template\n            \$sheet->setCellValue('F' . \$loginRow, \$solicitud->login_creado_por ?? '');\n            \$sheet->setCellValue('N' . \$loginRow, \$solicitud->registrado_por_nombre ?? 'Sistema');\n            \n            // Agregar información adicional al final del documento\n            \$lastRow = \$sheet->getHighestRow() + 3;",
    $content
);

// Guardar el archivo
file_put_contents($file, $content);

echo "✅ Archivo corregido exitosamente\n";
echo "📝 Correcciones aplicadas:\n";
echo "  1. Capacitación HC: nombreCapacitador con fallbacks\n";
echo "  2. Capacitación HC: fechaCapacitacion con fallbacks y try-catch\n";
echo "  3. Capacitación Epi: nombreCapacitador con fallbacks\n";
echo "  4. Capacitación Epi: fechaCapacitacion con fallbacks y try-catch\n";
echo "  5. Agregado mapeo de LOGIN y CREADO POR\n";
