/**
 * Script para copiar templates Excel desde public/Documentos/Mapeado
 * hacia hefesto-backend/storage/app/templates/
 * 
 * Uso: node scripts/copiar-templates.js
 */

const fs = require('fs');
const path = require('path');

// Rutas
const sourceDir = path.join(__dirname, '..', 'public', 'Documentos', 'Mapeado');
const targetDir = path.join(__dirname, '..', 'hefesto-backend', 'storage', 'app', 'templates');

// Templates a copiar
const templates = [
    {
        source: 'formato_administrativo_MAPEADO.xlsx',
        target: 'formato_administrativo_MAPEADO.xlsx',
        descripcion: 'Formato Administrativo con Mapeo (Previsualización)'
    },
    {
        source: 'formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx',
        target: 'formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx',
        descripcion: 'Formato Historia Clínica con Mapeo (Previsualización)'
    }
];

console.log('🔄 COPIANDO TEMPLATES EXCEL\n');

// Verificar que exista el directorio de origen
if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Directorio de origen no encontrado: ${sourceDir}`);
    process.exit(1);
}

// Crear directorio de destino si no existe
if (!fs.existsSync(targetDir)) {
    console.log(`📁 Creando directorio de destino: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
}

let copiadosExitosos = 0;
let errores = 0;

// Copiar cada template
templates.forEach(template => {
    const sourcePath = path.join(sourceDir, template.source);
    const targetPath = path.join(targetDir, template.target);
    
    console.log(`📄 ${template.descripcion}`);
    console.log(`   Origen: ${template.source}`);
    
    // Verificar que exista el archivo de origen
    if (!fs.existsSync(sourcePath)) {
        console.error(`   ❌ Archivo de origen no encontrado`);
        errores++;
        console.log('');
        return;
    }
    
    try {
        // Copiar archivo
        fs.copyFileSync(sourcePath, targetPath);
        
        // Verificar que se copió correctamente
        const sourceStats = fs.statSync(sourcePath);
        const targetStats = fs.statSync(targetPath);
        
        if (sourceStats.size === targetStats.size) {
            console.log(`   ✅ Copiado exitosamente (${Math.round(targetStats.size / 1024)} KB)`);
            copiadosExitosos++;
        } else {
            console.error(`   ⚠️  Copiado pero tamaños no coinciden`);
            console.error(`      Origen: ${sourceStats.size} bytes`);
            console.error(`      Destino: ${targetStats.size} bytes`);
            errores++;
        }
    } catch (error) {
        console.error(`   ❌ Error al copiar: ${error.message}`);
        errores++;
    }
    
    console.log('');
});

// Resumen
console.log('═══════════════════════════════════════');
console.log(`✅ Copiados exitosamente: ${copiadosExitosos}`);
if (errores > 0) {
    console.log(`❌ Errores: ${errores}`);
}
console.log('═══════════════════════════════════════\n');

// Listar archivos en el directorio de destino
console.log('📂 Archivos en directorio de destino:\n');
try {
    const files = fs.readdirSync(targetDir);
    files.forEach(file => {
        const filePath = path.join(targetDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && file.endsWith('.xlsx')) {
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`   ${file} (${sizeKB} KB)`);
        }
    });
} catch (error) {
    console.error(`❌ Error listando archivos: ${error.message}`);
}

console.log('\n✨ Proceso completado\n');

// Exit code
process.exit(errores > 0 ? 1 : 0);
