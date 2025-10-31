# Script para copiar los archivos Excel a la carpeta public
# Ejecutar este script desde la raíz del proyecto

Write-Host "Configurando archivos Excel para HEFESTO..." -ForegroundColor Green

# Crear directorio si no existe
$targetDir = "public\lib\Documentos"
if (-not (Test-Path $targetDir)) {
    Write-Host "Creando directorio $targetDir..." -ForegroundColor Yellow
    New-Item -Path $targetDir -ItemType Directory -Force | Out-Null
}

# Copiar archivos Excel
$sourceDir = "client\lib\Documentos"

Write-Host "Copiando archivos Excel..." -ForegroundColor Yellow

$file1 = "formato_creacion_usuarios_administrativosv1 (3).xlsx"
$file2 = "formato_creacion_usuarios_historia_clinica_electronicav2 (2) (1).xlsx"

Copy-Item -Path "$sourceDir\$file1" -Destination "$targetDir\$file1" -Force
Write-Host "✓ Copiado: $file1" -ForegroundColor Green

Copy-Item -Path "$sourceDir\$file2" -Destination "$targetDir\$file2" -Force
Write-Host "✓ Copiado: $file2" -ForegroundColor Green

Write-Host "`n✅ Archivos Excel configurados correctamente!" -ForegroundColor Green
Write-Host "`nAhora puedes:" -ForegroundColor Cyan
Write-Host "1. Ejecutar 'pnpm dev' para iniciar el servidor" -ForegroundColor White
Write-Host "2. Navegar a /registro/administrativo o /registro/medico" -ForegroundColor White
Write-Host "3. Llenar el formulario y descargar el Excel con los datos" -ForegroundColor White
Write-Host "`n⚠️  IMPORTANTE: Ajusta las referencias de celdas en client/lib/excelExporter.ts" -ForegroundColor Yellow
Write-Host "    según la estructura real de tus archivos Excel." -ForegroundColor Yellow
