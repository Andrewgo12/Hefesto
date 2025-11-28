# Script de diagnóstico para ejecutar desde OTRO EQUIPO en la red
# Este script verifica la conectividad hacia el servidor Hefesto

$serverIP = "192.168.2.146"
$frontendPort = 8080
$backendPort = 8000

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIAGNOSTICO DE CONEXION A HEFESTO" -ForegroundColor Cyan
Write-Host "  Desde otro equipo en la red" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar IP del equipo actual
Write-Host "1. Tu IP actual:" -ForegroundColor Yellow
$miIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}).IPAddress
Write-Host "   $miIP" -ForegroundColor White
Write-Host ""

# 2. Verificar si puede hacer ping al servidor
Write-Host "2. Probando conectividad con el servidor ($serverIP):" -ForegroundColor Yellow
$ping = Test-Connection -ComputerName $serverIP -Count 2 -Quiet
if ($ping) {
    Write-Host "   OK - El servidor responde a ping" -ForegroundColor Green
} else {
    Write-Host "   FALLO - No se puede hacer ping al servidor" -ForegroundColor Red
    Write-Host "   Verifica que ambos equipos esten en la misma red" -ForegroundColor Gray
}
Write-Host ""

# 3. Probar puerto del frontend (8080)
Write-Host "3. Probando puerto Frontend ($frontendPort):" -ForegroundColor Yellow
try {
    $testFrontend = Test-NetConnection -ComputerName $serverIP -Port $frontendPort -WarningAction SilentlyContinue -InformationLevel Quiet
    if ($testFrontend) {
        Write-Host "   OK - Puerto $frontendPort esta accesible" -ForegroundColor Green
        
        # Intentar hacer petición HTTP
        try {
            $response = Invoke-WebRequest -Uri "http://${serverIP}:${frontendPort}" -UseBasicParsing -TimeoutSec 5
            Write-Host "   OK - Frontend responde correctamente (HTTP $($response.StatusCode))" -ForegroundColor Green
        } catch {
            Write-Host "   ADVERTENCIA - Puerto abierto pero no responde HTTP: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   FALLO - Puerto $frontendPort NO es accesible" -ForegroundColor Red
        Write-Host "   El firewall del servidor puede estar bloqueando la conexion" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ERROR - No se pudo probar el puerto: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 4. Probar puerto del backend (8000)
Write-Host "4. Probando puerto Backend ($backendPort):" -ForegroundColor Yellow
try {
    $testBackend = Test-NetConnection -ComputerName $serverIP -Port $backendPort -WarningAction SilentlyContinue -InformationLevel Quiet
    if ($testBackend) {
        Write-Host "   OK - Puerto $backendPort esta accesible" -ForegroundColor Green
        
        # Intentar hacer petición HTTP
        try {
            $response = Invoke-WebRequest -Uri "http://${serverIP}:${backendPort}" -UseBasicParsing -TimeoutSec 5
            Write-Host "   OK - Backend responde correctamente (HTTP $($response.StatusCode))" -ForegroundColor Green
        } catch {
            Write-Host "   ADVERTENCIA - Puerto abierto pero no responde HTTP: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   FALLO - Puerto $backendPort NO es accesible" -ForegroundColor Red
        Write-Host "   El firewall del servidor puede estar bloqueando la conexion" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ERROR - No se pudo probar el puerto: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 5. Resumen
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($ping -and $testFrontend -and $testBackend) {
    Write-Host "TODO OK - Puedes acceder a:" -ForegroundColor Green
    Write-Host "  http://${serverIP}:${frontendPort}" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Abre tu navegador e ingresa esa URL" -ForegroundColor White
} else {
    Write-Host "HAY PROBLEMAS DE CONECTIVIDAD" -ForegroundColor Red
    Write-Host ""
    Write-Host "Posibles causas:" -ForegroundColor Yellow
    
    if (-not $ping) {
        Write-Host "  - Los equipos no estan en la misma red" -ForegroundColor White
        Write-Host "  - El servidor esta apagado o desconectado" -ForegroundColor White
    }
    
    if ($ping -and (-not $testFrontend -or -not $testBackend)) {
        Write-Host "  - El firewall del SERVIDOR esta bloqueando las conexiones" -ForegroundColor White
        Write-Host "  - Los servidores no estan corriendo en el servidor" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "SOLUCION:" -ForegroundColor Green
    Write-Host "  En el SERVIDOR (IP: $serverIP), ejecuta:" -ForegroundColor White
    Write-Host "  .\desactivar-firewall.ps1 (como Administrador)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Presiona Enter para salir"
