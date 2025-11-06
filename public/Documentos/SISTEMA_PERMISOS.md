# 🔐 Sistema de Permisos - HEFESTO

## 📋 Tabla de Contenidos
1. [Estructura del Sistema](#estructura-del-sistema)
2. [Instalación](#instalación)
3. [Uso en Controladores](#uso-en-controladores)
4. [Uso en Rutas](#uso-en-rutas)
5. [Uso en Blade/Frontend](#uso-en-bladefrontend)
6. [Gestión de Usuarios](#gestión-de-usuarios)
7. [Permisos Disponibles](#permisos-disponibles)

---

## 🏗️ Estructura del Sistema

### Tablas Principales
- **`users`** - Usuarios del sistema
- **`roles`** - Roles (Administrativo, Médico, Técnico)
- **`permisos`** - Permisos granulares (crear, ver, editar, etc.)
- **`role_user`** - Relación usuarios-roles (muchos a muchos)
- **`permiso_role`** - Relación roles-permisos (muchos a muchos)

### Flujo de Permisos
```
Usuario → role_user → Roles → permiso_role → Permisos
```

---

## 🚀 Instalación

### 1. Ejecutar Seeders

```bash
# 1. Crear permisos del sistema (60 permisos)
php artisan db:seed --class=PermisosSeeder

# 2. Asignar permisos a roles
php artisan db:seed --class=PermisoRoleSeeder

# 3. Asignar roles a usuarios existentes
php artisan db:seed --class=RoleUserSeeder
```

### 2. Agregar Trait al Modelo User

Editar `app/Models/User.php`:

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\HasPermissions; // ← Importar

class User extends Authenticatable
{
    use HasPermissions; // ← Agregar trait
    
    // ... resto del código
}
```

### 3. Registrar Middleware

Editar `bootstrap/app.php` o `app/Http/Kernel.php`:

```php
protected $middlewareAliases = [
    // ... otros middlewares
    'permission' => \App\Http\Middleware\CheckPermission::class,
];
```

---

## 🎯 Uso en Controladores

### Verificar Permisos Manualmente

```php
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        
        // Verificar un permiso
        if (!$user->tienePermiso('solicitudes_administrativas.crear')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para crear solicitudes'
            ], 403);
        }
        
        // Crear solicitud...
    }
    
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Verificar múltiples permisos (OR)
        if (!$user->tieneAlgunPermiso([
            'solicitudes_administrativas.ver_propias',
            'solicitudes_administrativas.ver_todas'
        ])) {
            return response()->json(['message' => 'Sin permisos'], 403);
        }
        
        // Si solo puede ver propias, filtrar
        if ($user->tienePermiso('solicitudes_administrativas.ver_propias') 
            && !$user->tienePermiso('solicitudes_administrativas.ver_todas')) {
            return Solicitud::where('user_id', $user->id)->get();
        }
        
        // Si puede ver todas
        return Solicitud::all();
    }
}
```

### Verificar Roles

```php
public function dashboard(Request $request)
{
    $user = $request->user();
    
    // Verificar rol específico
    if ($user->esAdministrador()) {
        return view('admin.dashboard');
    }
    
    if ($user->esSupervisor()) {
        return view('supervisor.dashboard');
    }
    
    if ($user->esMedico()) {
        return view('medico.dashboard');
    }
    
    return view('user.dashboard');
}
```

---

## 🛣️ Uso en Rutas

### Proteger Rutas con Middleware

```php
use Illuminate\Support\Facades\Route;

// Rutas protegidas por permiso
Route::middleware(['auth', 'permission:solicitudes_administrativas.crear'])
    ->post('/solicitudes', [SolicitudController::class, 'store']);

Route::middleware(['auth', 'permission:solicitudes_administrativas.ver_todas'])
    ->get('/solicitudes', [SolicitudController::class, 'index']);

Route::middleware(['auth', 'permission:solicitudes_administrativas.editar_todas'])
    ->put('/solicitudes/{id}', [SolicitudController::class, 'update']);

Route::middleware(['auth', 'permission:solicitudes_administrativas.eliminar'])
    ->delete('/solicitudes/{id}', [SolicitudController::class, 'destroy']);

// Agrupar rutas con el mismo permiso
Route::middleware(['auth', 'permission:usuarios.ver'])->group(function () {
    Route::get('/usuarios', [UserController::class, 'index']);
    Route::get('/usuarios/{id}', [UserController::class, 'show']);
});

// Rutas de administración
Route::middleware(['auth', 'permission:configuracion.editar'])->group(function () {
    Route::get('/configuracion', [ConfigController::class, 'index']);
    Route::put('/configuracion', [ConfigController::class, 'update']);
});
```

---

## 🖥️ Uso en Blade/Frontend

### En Vistas Blade

```blade
@if(auth()->user()->tienePermiso('solicitudes_administrativas.crear'))
    <button class="btn btn-primary">Nueva Solicitud</button>
@endif

@if(auth()->user()->tienePermiso('solicitudes_administrativas.exportar'))
    <button class="btn btn-success">Exportar a Excel</button>
@endif

@if(auth()->user()->esAdministrador())
    <a href="/admin/configuracion">Configuración del Sistema</a>
@endif

@if(auth()->user()->esSupervisor())
    <a href="/reportes">Ver Reportes</a>
@endif
```

### En API (Frontend React/Vue)

```javascript
// Obtener permisos del usuario al login
const login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    
    // Guardar permisos en localStorage
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('permisos', JSON.stringify(response.data.permisos));
};

// Verificar permisos en componentes
const tienePermiso = (permiso) => {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    return permisos.some(p => p.nombre === permiso);
};

// Uso en componente
{tienePermiso('solicitudes_administrativas.crear') && (
    <button onClick={crearSolicitud}>Nueva Solicitud</button>
)}
```

---

## 👥 Gestión de Usuarios

### Asignar Rol a Usuario

```php
use App\Models\User;
use Illuminate\Support\Facades\DB;

// Obtener usuario
$user = User::find(1);

// Obtener ID del rol
$roleId = DB::table('roles')->where('nombre', 'Administrativo - Supervisor')->value('id');

// Asignar rol
$user->asignarRol($roleId);
```

### Cambiar Roles de Usuario

```php
// Remover rol
$user->removerRol($roleId);

// Sincronizar roles (reemplaza todos)
$user->sincronizarRoles([1, 2]); // IDs de roles
```

### Crear Usuario con Rol

```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

// Crear usuario
$user = User::create([
    'name' => 'Juan Pérez',
    'email' => 'juan.perez@hospital.com',
    'password' => Hash::make('password123'),
    'cargo_id' => 1,
    'area_id' => 1,
]);

// Asignar rol
$roleId = DB::table('roles')
    ->where('nombre', 'Administrativo - Entrada de Datos')
    ->value('id');

$user->asignarRol($roleId);
```

---

## 📜 Permisos Disponibles

### Solicitudes Administrativas
- `solicitudes_administrativas.crear`
- `solicitudes_administrativas.ver_propias`
- `solicitudes_administrativas.ver_todas`
- `solicitudes_administrativas.editar_propias`
- `solicitudes_administrativas.editar_todas`
- `solicitudes_administrativas.eliminar`
- `solicitudes_administrativas.aprobar`
- `solicitudes_administrativas.rechazar`
- `solicitudes_administrativas.firmar`
- `solicitudes_administrativas.exportar`

### Solicitudes Historia Clínica
- `solicitudes_historia_clinica.crear`
- `solicitudes_historia_clinica.ver_propias`
- `solicitudes_historia_clinica.ver_todas`
- `solicitudes_historia_clinica.editar_propias`
- `solicitudes_historia_clinica.editar_todas`
- `solicitudes_historia_clinica.eliminar`
- `solicitudes_historia_clinica.aprobar`
- `solicitudes_historia_clinica.rechazar`
- `solicitudes_historia_clinica.firmar`
- `solicitudes_historia_clinica.exportar`

### Credenciales de Firma
- `credenciales_firma.crear`
- `credenciales_firma.ver`
- `credenciales_firma.editar`
- `credenciales_firma.eliminar`
- `credenciales_firma.asignar`

### Usuarios
- `usuarios.crear`
- `usuarios.ver`
- `usuarios.editar`
- `usuarios.eliminar`
- `usuarios.asignar_roles`
- `usuarios.cambiar_password`

### Roles
- `roles.crear`
- `roles.ver`
- `roles.editar`
- `roles.eliminar`
- `roles.asignar_permisos`

### Reportes
- `reportes.generar`
- `reportes.ver`
- `reportes.exportar`

### Exportaciones
- `exportaciones.crear`
- `exportaciones.ver`
- `exportaciones.descargar`

### Notificaciones
- `notificaciones.ver`
- `notificaciones.marcar_leida`
- `notificaciones.enviar`

### Actividades (Auditoría)
- `actividades.ver`
- `actividades.exportar`

### Configuración
- `configuracion.ver`
- `configuracion.editar`

### Respaldos
- `respaldos.crear`
- `respaldos.ver`
- `respaldos.restaurar`
- `respaldos.eliminar`

### Archivos
- `archivos.subir`
- `archivos.ver`
- `archivos.descargar`
- `archivos.eliminar`

---

## 🔑 Roles Predefinidos

### 1. Administrativo - Entrada de Datos
**Permisos:**
- Crear y ver sus propias solicitudes administrativas
- Subir, ver y descargar archivos
- Ver notificaciones
- Crear y ver exportaciones propias

**Uso:** Personal administrativo básico que solo gestiona sus propios registros.

---

### 2. Administrativo - Supervisor
**Permisos:**
- Ver y editar TODAS las solicitudes administrativas
- Aprobar, rechazar y firmar solicitudes
- Generar reportes
- Ver credenciales de firma
- Enviar notificaciones
- Ver listado de usuarios

**Uso:** Jefes de área, coordinadores que supervisan solicitudes de su equipo.

---

### 3. Médico - Consulta
**Permisos:**
- Crear y ver sus propias solicitudes de historia clínica
- Firmar solicitudes médicas
- Subir, ver y descargar archivos
- Exportar sus propios registros

**Uso:** Personal médico que gestiona historias clínicas.

---

### 4. Técnico del Sistema (Administrador)
**Permisos:** TODOS (60 permisos)

**Uso:** Administradores del sistema con acceso total.

---

## 🛡️ Seguridad

### Auditoría Automática
Cada vez que se verifica un permiso, se registra en la tabla `actividades`:
- ✅ Accesos exitosos
- ❌ Intentos de acceso no autorizado
- 📊 IP, User Agent, ruta, método HTTP

### Consultar Log de Actividades

```php
use Illuminate\Support\Facades\DB;

// Ver intentos de acceso no autorizado
$intentos = DB::table('actividades')
    ->where('tipo', 'acceso_denegado')
    ->orderBy('created_at', 'desc')
    ->get();

// Ver actividad de un usuario
$actividad = DB::table('actividades')
    ->where('user_id', 1)
    ->orderBy('created_at', 'desc')
    ->get();
```

---

## 📞 Soporte

Para dudas o problemas con el sistema de permisos, contactar al equipo de desarrollo.
