import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de los archivos Excel
const excelFiles = [
  {
    input: path.join(__dirname, '../public/Documentos/formatocreacionusuariosAdministrativosv1.xlsx'),
    outputCSV: path.join(__dirname, '../public/Documentos/formatoAdministrativo.csv'),
    outputJSON: path.join(__dirname, '../public/Documentos/formatoAdministrativo.json'),
    name: 'Formato Administrativo'
  },
  {
    input: path.join(__dirname, '../public/Documentos/formatocreacionusuarioshistoriaclinicaelectronicav.xlsx'),
    outputCSV: path.join(__dirname, '../public/Documentos/formatoHistoriaClinica.csv'),
    outputJSON: path.join(__dirname, '../public/Documentos/formatoHistoriaClinica.json'),
    name: 'Formato Historia Clínica'
  }
];

console.log('🔄 Iniciando conversión de Excel a CSV...\n');

excelFiles.forEach(file => {
  try {
    console.log(`📄 Procesando: ${file.name}`);
    console.log(`   Entrada: ${file.input}`);
    
    // Leer el archivo Excel
    const workbook = XLSX.readFile(file.input);
    
    // Obtener la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    console.log(`   Hoja: ${sheetName}`);
    
    // Convertir a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1, // Usar arrays en lugar de objetos
      defval: '', // Valor por defecto para celdas vacías
      raw: false // Convertir todo a string
    });
    
    console.log(`   Filas encontradas: ${jsonData.length}`);
    
    // Guardar como JSON
    fs.writeFileSync(file.outputJSON, JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log(`   ✅ JSON guardado: ${file.outputJSON}`);
    
    // Convertir JSON a CSV usando Papa Parse
    const csv = Papa.unparse(jsonData, {
      quotes: true, // Entrecomillar todos los campos
      delimiter: ',',
      newline: '\n'
    });
    
    // Guardar como CSV
    fs.writeFileSync(file.outputCSV, csv, 'utf-8');
    console.log(`   ✅ CSV guardado: ${file.outputCSV}`);
    
    // Mostrar preview de las primeras 5 filas
    console.log(`\n   📋 Preview (primeras 5 filas):`);
    jsonData.slice(0, 5).forEach((row, idx) => {
      console.log(`   ${idx + 1}. ${row.slice(0, 3).join(' | ')}...`);
    });
    
    console.log('\n' + '='.repeat(80) + '\n');
    
  } catch (error) {
    console.error(`   ❌ Error procesando ${file.name}:`, error.message);
    console.log('\n' + '='.repeat(80) + '\n');
  }
});

console.log('✅ Conversión completada!\n');
console.log('📁 Archivos generados:');
excelFiles.forEach(file => {
  console.log(`   - ${path.basename(file.outputCSV)}`);
  console.log(`   - ${path.basename(file.outputJSON)}`);
});
