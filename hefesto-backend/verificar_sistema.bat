@echo off
echo ========================================
echo   HEFESTO - Verificacion del Sistema
echo ========================================
echo.

echo Verificando configuracion...
echo.

echo [Base de Datos]
php artisan db:show
echo.

echo [Migraciones]
php artisan migrate:status
echo.

echo [Rutas API]
php artisan route:list --path=api | findstr "GET POST PUT DELETE"
echo.

echo [Permisos en BD]
php artisan tinker --execute="echo 'Total permisos: ' . App\Models\Permission::count(); echo PHP_EOL;"
echo.

echo [Usuarios en BD]
php artisan tinker --execute="echo 'Total usuarios: ' . App\Models\User::count(); echo PHP_EOL;"
echo.

echo [Flujos de Aprobacion]
php artisan tinker --execute="echo 'Total flujos: ' . App\Models\FlujoAprobacion::count(); echo PHP_EOL;"
echo.

echo ========================================
echo   Verificacion Completada
echo ========================================
pause
