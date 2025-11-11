import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para analizar la estructura del Excel
function analyzeStructure(jsonPath, name) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 ANÁLISIS: ${name}`);
  console.log('='.repeat(80));
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  
  console.log(`\n📏 Dimensiones:`);
  console.log(`   - Total de filas: ${data.length}`);
  console.log(`   - Total de columnas: ${data[0]?.length || 0}`);
  
  // Analizar encabezado
  console.log(`\n📋 ENCABEZADO (Filas 1-5):`);
  data.slice(0, 5).forEach((row, idx) => {
    const content = row.filter(cell => cell && cell.toString().trim()).join(' | ');
    if (content) {
      console.log(`   Fila ${idx + 1}: ${content}`);
    }
  });
  
  // Buscar secciones principales
  console.log(`\n📑 SECCIONES DETECTADAS:`);
  const sections = [];
  
  data.forEach((row, idx) => {
    const firstCell = row.find(cell => cell && cell.toString().trim());
    if (firstCell) {
      const cellStr = firstCell.toString().toUpperCase();
      
      // Detectar secciones numeradas o en mayúsculas
      if (
        cellStr.match(/^\d+\./) || // Comienza con número y punto
        (cellStr === cellStr.toUpperCase() && cellStr.length > 10) || // Todo mayúsculas
        cellStr.includes('DATOS') ||
        cellStr.includes('APLICACIONES') ||
        cellStr.includes('MÓDULOS') ||
        cellStr.includes('PERFIL') ||
        cellStr.includes('FIRMA') ||
        cellStr.includes('CAPACITACIÓN') ||
        cellStr.includes('AVAL')
      ) {
        sections.push({ row: idx + 1, content: firstCell.toString() });
      }
    }
  });
  
  sections.forEach(section => {
    console.log(`   Fila ${String(section.row).padStart(2, '0')}: ${section.content}`);
  });
  
  // Buscar tablas (filas con múltiples columnas llenas)
  console.log(`\n📊 TABLAS DETECTADAS:`);
  const tables = [];
  let currentTable = null;
  
  data.forEach((row, idx) => {
    const filledCells = row.filter(cell => cell && cell.toString().trim()).length;
    
    if (filledCells >= 4) { // Tabla con al menos 4 columnas
      if (!currentTable) {
        currentTable = { start: idx + 1, rows: [row], filledCells: [] };
      }
      currentTable.rows.push(row);
      currentTable.filledCells.push(filledCells);
    } else if (currentTable && currentTable.rows.length >= 2) {
      currentTable.end = idx;
      tables.push(currentTable);
      currentTable = null;
    }
  });
  
  tables.forEach((table, idx) => {
    console.log(`\n   Tabla ${idx + 1}: Filas ${table.start}-${table.end}`);
    console.log(`   - Total de filas: ${table.rows.length}`);
    console.log(`   - Promedio de columnas llenas: ${Math.round(table.filledCells.reduce((a, b) => a + b, 0) / table.filledCells.length)}`);
    
    // Mostrar encabezados de la tabla
    const headers = table.rows[0].filter(cell => cell && cell.toString().trim());
    if (headers.length > 0) {
      console.log(`   - Encabezados: ${headers.join(' | ')}`);
    }
    
    // Mostrar primera fila de datos
    if (table.rows.length > 1) {
      const firstDataRow = table.rows[1].filter(cell => cell && cell.toString().trim());
      console.log(`   - Ejemplo: ${firstDataRow.slice(0, 5).join(' | ')}`);
    }
  });
  
  // Buscar checkboxes o campos de selección
  console.log(`\n☑️  CAMPOS DE SELECCIÓN:`);
  const checkboxFields = [];
  
  data.forEach((row, idx) => {
    row.forEach((cell, colIdx) => {
      if (cell) {
        const cellStr = cell.toString().toUpperCase();
        if (
          cellStr.includes('☐') || 
          cellStr.includes('☑') || 
          cellStr.includes('□') ||
          cellStr.includes('✓') ||
          cellStr.includes('SI') && cellStr.includes('NO') ||
          cellStr.match(/\[\s*\]/)
        ) {
          checkboxFields.push({ 
            row: idx + 1, 
            col: colIdx + 1, 
            content: cell.toString().substring(0, 50) 
          });
        }
      }
    });
  });
  
  if (checkboxFields.length > 0) {
    checkboxFields.slice(0, 10).forEach(field => {
      console.log(`   Fila ${field.row}, Col ${field.col}: ${field.content}`);
    });
    if (checkboxFields.length > 10) {
      console.log(`   ... y ${checkboxFields.length - 10} más`);
    }
  } else {
    console.log(`   (No se detectaron checkboxes explícitos)`);
  }
  
  // Buscar campos de firma
  console.log(`\n✍️  CAMPOS DE FIRMA:`);
  const firmaFields = [];
  
  data.forEach((row, idx) => {
    row.forEach((cell, colIdx) => {
      if (cell) {
        const cellStr = cell.toString().toUpperCase();
        if (
          cellStr.includes('FIRMA') ||
          cellStr.includes('AUTORIZA') ||
          cellStr.includes('APRUEBA') ||
          cellStr.includes('Vo. Bo.')
        ) {
          firmaFields.push({ 
            row: idx + 1, 
            content: cell.toString() 
          });
        }
      }
    });
  });
  
  firmaFields.forEach(field => {
    console.log(`   Fila ${String(field.row).padStart(2, '0')}: ${field.content}`);
  });
  
  // Resumen de campos importantes
  console.log(`\n🔑 CAMPOS CLAVE DETECTADOS:`);
  const keyFields = [
    'NOMBRE', 'CEDULA', 'CARGO', 'AREA', 'SERVICIO', 
    'TELEFONO', 'EXTENSION', 'CORREO', 'CELULAR',
    'ESPECIALIDAD', 'PERFIL', 'VINCULACION', 'TERMINAL',
    'FECHA', 'CODIGO', 'VERSION'
  ];
  
  const foundFields = new Set();
  
  data.forEach((row, idx) => {
    row.forEach(cell => {
      if (cell) {
        const cellStr = cell.toString().toUpperCase();
        keyFields.forEach(key => {
          if (cellStr.includes(key)) {
            foundFields.add(key);
          }
        });
      }
    });
  });
  
  Array.from(foundFields).sort().forEach(field => {
    console.log(`   ✓ ${field}`);
  });
  
  return { sections, tables, checkboxFields, firmaFields, foundFields };
}

// Analizar ambos archivos
const files = [
  {
    path: path.join(__dirname, '../public/Documentos/formatoAdministrativo.json'),
    name: 'FORMATO ADMINISTRATIVO (FOR-GDI-SIS-004)'
  },
  {
    path: path.join(__dirname, '../public/Documentos/formatoHistoriaClinica.json'),
    name: 'FORMATO HISTORIA CLÍNICA (FOR-GDI-SIS-003)'
  }
];

console.log('\n🔍 ANÁLISIS DETALLADO DE ESTRUCTURA DE EXCEL');

const results = {};

files.forEach(file => {
  if (fs.existsSync(file.path)) {
    results[file.name] = analyzeStructure(file.path, file.name);
  } else {
    console.log(`\n❌ Archivo no encontrado: ${file.path}`);
  }
});

// Guardar análisis en archivo
const outputPath = path.join(__dirname, '../public/Documentos/ANALISIS_ESTRUCTURA_EXCEL.md');
let markdown = '# Análisis de Estructura de Formularios Excel\n\n';
markdown += `Generado: ${new Date().toLocaleString('es-CO')}\n\n`;

files.forEach(file => {
  const result = results[file.name];
  if (result) {
    markdown += `## ${file.name}\n\n`;
    markdown += `### Secciones (${result.sections.length})\n\n`;
    result.sections.forEach(s => {
      markdown += `- Fila ${s.row}: ${s.content}\n`;
    });
    markdown += `\n### Tablas (${result.tables.length})\n\n`;
    result.tables.forEach((t, i) => {
      markdown += `- Tabla ${i + 1}: Filas ${t.start}-${t.end} (${t.rows.length} filas)\n`;
    });
    markdown += `\n### Campos de Firma (${result.firmaFields.length})\n\n`;
    result.firmaFields.forEach(f => {
      markdown += `- Fila ${f.row}: ${f.content}\n`;
    });
    markdown += `\n### Campos Clave Detectados\n\n`;
    Array.from(result.foundFields).sort().forEach(field => {
      markdown += `- ${field}\n`;
    });
    markdown += '\n---\n\n';
  }
});

fs.writeFileSync(outputPath, markdown, 'utf-8');

console.log(`\n${'='.repeat(80)}`);
console.log(`✅ Análisis completado!`);
console.log(`📄 Reporte guardado en: ${outputPath}`);
console.log('='.repeat(80));
console.log('');
