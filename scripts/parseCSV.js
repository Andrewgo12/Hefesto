import Papa from 'papaparse';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para parsear CSV
function parseCSVFile(filePath, fileName) {
  console.log(`\n📄 Parseando: ${fileName}`);
  console.log(`   Archivo: ${filePath}\n`);
  
  try {
    // Leer el archivo CSV
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parsear con Papa Parse
    const result = Papa.parse(csvContent, {
      header: false, // Sin encabezados automáticos
      skipEmptyLines: true,
      dynamicTyping: true, // Convertir números y booleanos automáticamente
      transform: (value) => {
        // Limpiar espacios en blanco
        return typeof value === 'string' ? value.trim() : value;
      }
    });
    
    if (result.errors.length > 0) {
      console.log('   ⚠️  Errores encontrados:');
      result.errors.forEach(error => {
        console.log(`      - Fila ${error.row}: ${error.message}`);
      });
    }
    
    console.log(`   ✅ Filas parseadas: ${result.data.length}`);
    console.log(`   ✅ Columnas: ${result.data[0]?.length || 0}`);
    
    // Mostrar estructura
    console.log(`\n   📊 Estructura del archivo:`);
    result.data.slice(0, 10).forEach((row, idx) => {
      const preview = row.slice(0, 5).map(cell => 
        cell === null || cell === undefined ? '(vacío)' : 
        typeof cell === 'string' && cell.length > 20 ? cell.substring(0, 20) + '...' : 
        cell
      );
      console.log(`   ${String(idx + 1).padStart(2, '0')}. ${preview.join(' | ')}`);
    });
    
    // Analizar contenido
    console.log(`\n   🔍 Análisis:`);
    
    // Buscar encabezados
    const possibleHeaders = result.data.slice(0, 20).filter(row => 
      row.some(cell => 
        typeof cell === 'string' && 
        (cell.includes('NOMBRE') || cell.includes('CÓDIGO') || cell.includes('MÓDULO'))
      )
    );
    
    if (possibleHeaders.length > 0) {
      console.log(`   - Posibles encabezados encontrados en filas: ${possibleHeaders.map((_, i) => i + 1).join(', ')}`);
    }
    
    // Buscar secciones
    const sections = result.data
      .map((row, idx) => ({ row, idx }))
      .filter(({ row }) => 
        row.some(cell => 
          typeof cell === 'string' && 
          (cell.match(/^\d+\./) || cell.toUpperCase() === cell && cell.length > 5)
        )
      );
    
    if (sections.length > 0) {
      console.log(`\n   📑 Secciones detectadas:`);
      sections.slice(0, 10).forEach(({ row, idx }) => {
        const sectionTitle = row.find(cell => 
          typeof cell === 'string' && cell.length > 3
        );
        console.log(`      Fila ${idx + 1}: ${sectionTitle}`);
      });
    }
    
    return result.data;
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

// Archivos CSV a parsear
const csvFiles = [
  {
    path: path.join(__dirname, '../public/Documentos/formatoAdministrativo.csv'),
    name: 'Formato Administrativo'
  },
  {
    path: path.join(__dirname, '../public/Documentos/formatoHistoriaClinica.csv'),
    name: 'Formato Historia Clínica'
  }
];

console.log('🔄 Iniciando parseo de archivos CSV...');
console.log('='.repeat(80));

csvFiles.forEach(file => {
  if (fs.existsSync(file.path)) {
    parseCSVFile(file.path, file.name);
    console.log('\n' + '='.repeat(80));
  } else {
    console.log(`\n❌ Archivo no encontrado: ${file.path}`);
    console.log('   Ejecuta primero: node scripts/convertExcelToCSV.js\n');
    console.log('='.repeat(80));
  }
});

console.log('\n✅ Parseo completado!\n');
