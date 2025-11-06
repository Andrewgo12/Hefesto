<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;

echo "=== SOLICITUDES ADMINISTRATIVAS ===\n";
$admins = SolicitudAdministrativa::all();
echo "Total: " . $admins->count() . "\n\n";

foreach ($admins as $admin) {
    echo "ID: {$admin->id}\n";
    echo "Nombre: {$admin->nombre_completo}\n";
    echo "Cédula: {$admin->cedula}\n";
    echo "Cargo: {$admin->cargo}\n";
    echo "Área: {$admin->area_servicio}\n";
    echo "Teléfono: {$admin->telefono_extension}\n";
    echo "Vinculación: {$admin->tipo_vinculacion}\n";
    echo "Login: {$admin->login_asignado}\n";
    echo "Clave: {$admin->clave_temporal}\n";
    echo "Perfil de: {$admin->perfil_de}\n";
    
    echo "\nMódulos Administrativos:\n";
    $modulos = is_string($admin->modulos_administrativos) 
        ? json_decode($admin->modulos_administrativos, true) 
        : $admin->modulos_administrativos;
    print_r($modulos);
    
    echo "\nMódulos Financieros:\n";
    $modFinan = is_string($admin->modulos_financieros) 
        ? json_decode($admin->modulos_financieros, true) 
        : $admin->modulos_financieros;
    print_r($modFinan);
    
    echo "\nOpciones Web:\n";
    $opciones = is_string($admin->opciones_web) 
        ? json_decode($admin->opciones_web, true) 
        : $admin->opciones_web;
    print_r($opciones);
    
    echo "\nFirmas:\n";
    $firmas = is_string($admin->firmas) 
        ? json_decode($admin->firmas, true) 
        : $admin->firmas;
    print_r($firmas);
    
    echo "\n" . str_repeat("=", 80) . "\n\n";
}

echo "\n=== SOLICITUDES HISTORIA CLÍNICA ===\n";
$clinicas = SolicitudHistoriaClinica::all();
echo "Total: " . $clinicas->count() . "\n\n";

foreach ($clinicas as $clinica) {
    echo "ID: {$clinica->id}\n";
    echo "Nombre: {$clinica->nombre_completo}\n";
    echo "Cédula: {$clinica->cedula}\n";
    echo "Celular: {$clinica->celular}\n";
    echo "Correo: {$clinica->correo_electronico}\n";
    echo "Área: {$clinica->area_servicio}\n";
    echo "Especialidad: {$clinica->especialidad}\n";
    echo "Registro/Código: {$clinica->registro_codigo}\n";
    echo "Perfil: {$clinica->perfil}\n";
    echo "Vinculación: {$clinica->tipo_vinculacion}\n";
    echo "Terminal: {$clinica->terminal_asignado}\n";
    echo "Observaciones: {$clinica->observaciones}\n";
    
    echo "\nCapacitación Historia Clínica:\n";
    $capHC = is_string($clinica->capacitacion_historia_clinica) 
        ? json_decode($clinica->capacitacion_historia_clinica, true) 
        : $clinica->capacitacion_historia_clinica;
    print_r($capHC);
    
    echo "\nCapacitación Epidemiología:\n";
    $capEpi = is_string($clinica->capacitacion_epidemiologia) 
        ? json_decode($clinica->capacitacion_epidemiologia, true) 
        : $clinica->capacitacion_epidemiologia;
    print_r($capEpi);
    
    echo "\nAval Institucional:\n";
    $aval = is_string($clinica->aval_institucional) 
        ? json_decode($clinica->aval_institucional, true) 
        : $clinica->aval_institucional;
    print_r($aval);
    
    echo "\nFirmas:\n";
    $firmas = is_string($clinica->firmas) 
        ? json_decode($clinica->firmas, true) 
        : $clinica->firmas;
    print_r($firmas);
    
    echo "\n" . str_repeat("=", 80) . "\n\n";
}
