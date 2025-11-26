# Manual de Programación: Sistema HEFESTO

**Sistema de Gestión de Solicitudes para Instituciones de Salud**

---

**Versión:** 1.0  
**Última Actualización:** Noviembre 2024  
**Autor:** Equipo de Desarrollo HEFESTO  

---

## Tabla de Contenidos

1. [Introducción](#introducción)
   - 1.1 [Objetivos del Sistema](#objetivos-del-sistema)
   - 1.2 [Alcance del Manual](#alcance-del-manual)
   - 1.3 [Público Objetivo](#público-objetivo)
   - 1.4 [Convenciones del Documento](#convenciones-del-documento)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
   - 2.1 [Arquitectura General](#arquitectura-general)
   - 2.2 [Patrón de Diseño](#patrón-de-diseño)
   - 2.3 [Arquitectura de Capas](#arquitectura-de-capas)
   - 2.4 [Comunicación Entre Componentes](#comunicación-entre-componentes)
   - 2.5 [Diagrama de Componentes](#diagrama-de-componentes)
3. [Stack Tecnológico](#stack-tecnológico)
   - 3.1 [Backend](#backend)
   - 3.2 [Frontend](#frontend-1)
   - 3.3 [Herramientas de Desarrollo](#herramientas-de-desarrollo)
   - 3.4 [Dependencias y Versiones](#dependencias-y-versiones)
4. [Estructura del Proyecto](#estructura-del-proyecto)
   - 4.1 [Estructura General](#estructura-general)
   - 4.2 [Organización del Backend](#organización-del-backend)
   - 4.3 [Organización del Frontend](#organización-del-frontend)
5. [Backend - Laravel](#backend---laravel)
   - 5.1 [Configuración Inicial](#configuración-inicial)
   - 5.2 [Modelos Principales](#modelos-principales)
   - 5.3 [Controladores](#controladores)
   - 5.4 [Traits](#traits)
   - 5.5 [Middleware](#middleware)
   - 5.6 [Servicios y Repositorios](#servicios-y-repositorios)
   - 5.7 [Validaciones Personalizadas](#validaciones-personalizadas)
   - 5.8 [Eventos y Listeners](#eventos-y-listeners)
   - 5.9 [Jobs y Colas](#jobs-y-colas)
6. [Frontend - React/Vite](#frontend---reactvite)
   - 6.1 [Configuración Inicial](#configuración-inicial-1)
   - 6.2 [Arquitectura Frontend](#arquitectura-frontend)
   - 6.3 [Componentes Principales](#componentes-principales)
   - 6.4 [Routing](#routing)
   - 6.5 [Gestión de Estado](#gestión-de-estado)
   - 6.6 [Hooks Personalizados](#hooks-personalizados)
   - 6.7 [Integración con API](#integración-con-api)
   - 6.8 [Optimización de Rendimiento](#optimización-de-rendimiento)
7. [Base de Datos](#base-de-datos)
   - 7.1 [Esquema Principal](#esquema-principal)
   - 7.2 [Relaciones Entre Tablas](#relaciones-entre-tablas)
   - 7.3 [Índices y Optimización](#índices-y-optimización)
   - 7.4 [Migraciones](#migraciones)
   - 7.5 [Seeders](#seeders)
   - 7.6 [Consultas Optimizadas](#consultas-optimizadas)
8. [Autenticación y Permisos](#autenticación-y-permisos)
   - 8.1 [Flujo de Autenticación](#flujo-de-autenticación)
   - 8.2 [Sistema de Permisos](#sistema-de-permisos)
   - 8.3 [Middleware Personalizado](#middleware-personalizado)
   - 8.4 [Roles y Capacidades](#roles-y-capacidades)
   - 8.5 [Seguridad de Sesiones](#seguridad-de-sesiones)
9. [Flujos de Trabajo](#flujos-de-trabajo)
   - 9.1 [Flujo de Registro de Solicitud](#flujo-de-registro-de-solicitud)
   - 9.2 [Flujo de Aprobación](#flujo-de-aprobación)
   - 9.3 [Flujo de Firmas](#flujo-de-firmas)
   - 9.4 [Flujo de Notificaciones](#flujo-de-notificaciones)
   - 9.5 [Flujo de Auditoría](#flujo-de-auditoría)
10. [API Endpoints](#api-endpoints)
    - 10.1 [Documentación de Endpoints](#documentación-de-endpoints)
    - 10.2 [Autenticación](#autenticación-endpoints)
    - 10.3 [Solicitudes](#solicitudes-endpoints)
    - 10.4 [Usuarios](#usuarios-endpoints)
    - 10.5 [Configuración](#configuración-endpoints)
    - 10.6 [Reportes](#reportes-endpoints)
11. [Casos de Uso](#casos-de-uso)
    - 11.1 [Caso de Uso: Crear Solicitud Administrativa](#caso-de-uso-crear-solicitud-administrativa)
    - 11.2 [Caso de Uso: Aprobar Solicitud](#caso-de-uso-aprobar-solicitud)
    - 11.3 [Caso de Uso: Gestionar Firmas](#caso-de-uso-gestionar-firmas)
    - 11.4 [Caso de Uso: Generar Reporte](#caso-de-uso-generar-reporte)
12. [Patrones de Diseño](#patrones-de-diseño)
    - 12.1 [Repository Pattern](#repository-pattern)
    - 12.2 [Service Layer Pattern](#service-layer-pattern)
    - 12.3 [Observer Pattern](#observer-pattern)
    - 12.4 [Factory Pattern](#factory-pattern)
13. [Deployment](#deployment)
    - 13.1 [Backend - Laravel](#backend---laravel-1)
    - 13.2 [Frontend - React](#frontend---react)
    - 13.3 [Docker](#docker)
    - 13.4 [CI/CD](#cicd)
    - 13.5 [Monitoreo y Logging](#monitoreo-y-logging)
14. [Testing](#testing)
    - 14.1 [Testing Backend](#testing-backend)
    - 14.2 [Testing Frontend](#testing-frontend)
    - 14.3 [Testing de Integración](#testing-de-integración)
    - 14.4 [Testing E2E](#testing-e2e)
15. [Optimización](#optimización)
    - 15.1 [Optimización de Base de Datos](#optimización-de-base-de-datos)
    - 15.2 [Caché](#caché)
    - 15.3 [Lazy Loading](#lazy-loading)
    - 15.4 [Code Splitting](#code-splitting)
16. [Seguridad](#seguridad)
    - 16.1 [Autenticación Segura](#autenticación-segura)
    - 16.2 [Protección CSRF](#protección-csrf)
    - 16.3 [Protección XSS](#protección-xss)
    - 16.4 [SQL Injection](#sql-injection)
    - 16.5 [Rate Limiting](#rate-limiting)
17. [Troubleshooting](#troubleshooting)
    - 17.1 [Errores Comunes](#errores-comunes)
    - 17.2 [Logs](#logs)
    - 17.3 [Debugging](#debugging)
18. [Mejores Prácticas](#mejores-prácticas)
    - 18.1 [Backend](#mejores-prácticas-backend)
    - 18.2 [Frontend](#mejores-prácticas-frontend)
    - 18.3 [Base de Datos](#mejores-prácticas-base-de-datos)
    - 18.4 [Git Workflow](#git-workflow)
19. [Extensión del Sistema](#extensión-del-sistema)
    - 19.1 [Agregar Nuevo Módulo](#agregar-nuevo-módulo)
    - 19.2 [Agregar Nuevos Permisos](#agregar-nuevos-permisos)
    - 19.3 [Crear Reportes Personalizados](#crear-reportes-personalizados)
20. [Apéndices](#apéndices)
    - 20.1 [Glosario](#glosario)
    - 20.2 [Comandos Útiles](#comandos-útiles)
    - 20.3 [Configuraciones Avanzadas](#configuraciones-avanzadas)

---

## 1. Introducción

HEFESTO es una aplicación web full-stack diseñada para la gestión de solicitudes de usuarios administrativos y asistenciales en instituciones de salud. Este manual está dirigido a desarrolladores que necesiten mantener, extender o modificar el sistema.

### 1.1 Objetivos del Sistema

El sistema HEFESTO tiene como objetivos principales:

- Registrar solicitudes de usuarios con flujos de aprobación estructurados
- Gestionar firmas electrónicas para validación de solicitudes
- Proporcionar control y auditoría completa de solicitudes
- Implementar un sistema de permisos basado en roles
- Generar reportes y exportación de datos

---

## 2. Arquitectura del Sistema

### 2.1 Arquitectura General

```
┌─────────────┐      HTTP/REST      ┌──────────────┐
│   Frontend  │ ◄─────────────────► │   Backend    │
│ React/Vite  │      (API JSON)     │   Laravel    │
└─────────────┘                     └──────────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │    MySQL     │
                                    │   Database   │
                                    └──────────────┘
```

### 2.2 Patrón de Diseño

El sistema HEFESTO implementa los siguientes patrones:

- **Frontend:** Arquitectura basada en componentes con React
- **Backend:** MVC (Model-View-Controller) con Laravel
- **API:** RESTful API con autenticación Sanctum
- **Estado:** Context API + Local Storage

---

## 3. Stack Tecnológico

### 3.1 Backend

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Framework | Laravel | 10.x |
| Lenguaje | PHP | 8.1+ |
| Base de Datos | MySQL | 8.0+ |
| Autenticación | Laravel Sanctum | - |
| Validación | Laravel Validation Rules | - |
| ORM | Eloquent | - |

### 3.2 Frontend

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Lenguaje | TypeScript | - |
| UI Library | Custom components + Radix UI | - |
| Estilos | TailwindCSS | 3.x |
| Routing | React Router | v6 |
| HTTP Client | Axios | - |
| State Management | React Context API | - |
| Animations | Framer Motion | - |

### 3.3 Herramientas de Desarrollo

- **Package Manager:** npm
- **Version Control:** Git
- **Code Editor:** VS Code (recomendado)
- **API Testing:** Postman / Insomnia
- **Database Tool:** PHPMyAdmin / MySQL Workbench

---

## 4. Estructura del Proyecto

```
Hefesto/
├── client/                    # Frontend React
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/              # Componentes UI (botones, inputs, etc.)
│   │   ├── Layout.tsx       # Layout principal
│   │   ├── LayoutAdministrador.tsx
│   │   ├── LayoutUsuarios.tsx
│   │   └── Modal*.tsx       # Modales del sistema
│   ├── contexts/            # Context providers
│   │   └── AppContext.tsx   # Estado global
│   ├── lib/                 # Utilidades
│   │   ├── api.ts          # Cliente Axios
│   │   ├── toast.ts        # Notificaciones
│   │   └── utils.ts        # Funciones helper
│   ├── pages/              # Páginas/Vistas
│   │   ├── Login.tsx
│   │   ├── Index.tsx       # Dashboard
│   │   ├── Registro/       # Formularios de registro
│   │   ├── Control/        # Vistas de control
│   │   └── Perfil/         # Perfil de usuario
│   └── App.tsx             # Componente raíz
│
├── hefesto-backend/         # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/    # Controladores API
│   │   │   └── Middleware/ # Middlewares
│   │   ├── Models/         # Modelos Eloquent
│   │   └── Traits/         # Traits reutilizables
│   ├── config/             # Configuración
│   ├── database/
│   │   ├── migrations/     # Migraciones
│   │   └── seeders/        # Seeders
│   ├── routes/
│   │   ├── api.php         # Rutas API
│   │   └── web.php         # Rutas web
│   └── storage/            # Almacenamiento
│
└── README.md
```

---

## 5. Backend - Laravel

### 5.1 Configuración Inicial

#### 5.1.1 Requisitos

- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Extensiones PHP: `pdo_mysql`, `mbstring`, `openssl`, `json`

#### 5.1.2 Instalación

```bash
cd hefesto-backend
composer install
cp .env.example .env
php artisan key:generate
```

#### 5.1.3 Configurar Base de Datos

Edita `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hefesto_db
DB_USERNAME=root
DB_PASSWORD=tu_password
```

#### 5.1.4 Migrar Base de Datos

```bash
php artisan migrate
php artisan db:seed
```

#### 5.1.5 Iniciar Servidor

```bash
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

---

### 5.2 Modelos Principales

#### 5.2.1 User.php

Modelo de usuario del sistema.

```php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\HasPermissions;

class User extends Authenticatable
{
    use HasApiTokens, HasPermissions;
    
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'rol',
        'estado',
        'telefono',
        'direccion',
        'cargo'
    ];
    
    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    // Relaciones
    public function roles() {
        return $this->belongsToMany(Role::class, 'role_user');
    }
    
    // Métodos helper
    public function esAdministrador(): bool {
        return strtolower($this->rol) === 'administrador';
    }
    
    public function estaActivo(): bool {
        return strtolower($this->estado) === 'activo';
    }
}
```

#### 5.2.2 SolicitudAdministrativa.php

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudAdministrativa extends Model
{
    protected $table = 'solicitudes_administrativas';
    
    protected $fillable = [
        'nombre_completo',
        'cedula',
        'cargo',
        'area_servicio',
        'telefono_extension',
        'tipo_vinculacion',
        'modulos_administrativos',
        'modulos_financieros',
        'anexos_nivel',
        'tipo_permiso',
        'perfil_de',
        'opciones_web',
        'firmas',
        'login_asignado',
        'clave_temporal',
        'acepta_responsabilidad',
        'estado',
        'fase_actual',
        'fecha_solicitud',
        'usuario_creador_id',
        'registrado_por_nombre',
        'registrado_por_email',
        'firmas_pendientes',
        'firmas_completadas'
    ];
    
    protected $casts = [
        'fecha_solicitud' => 'datetime',
        'acepta_responsabilidad' => 'boolean',
        'modulos_administrativos' => 'array',
        'modulos_financieros' => 'array',
        'tipo_permiso' => 'array',
        'opciones_web' => 'array',
        'firmas' => 'array'
    ];
    
    // Relaciones
    public function usuarioCreador() {
        return $this->belongsTo(User::class, 'usuario_creador_id');
    }
    
    public function historial() {
        return $this->hasMany(HistorialSolicitud::class, 'solicitud_id');
    }
    
    public function historialEstados() {
        return $this->morphMany(HistorialEstado::class, 'solicitud');
    }
}
```

#### 5.2.3 SolicitudHistoriaClinica.php

Estructura similar a `SolicitudAdministrativa` pero con campos específicos para personal asistencial.

---

### 5.3 Controladores

#### 5.3.1 AuthController.php

Maneja autenticación y gestión de sesiones.

**Métodos principales:**

```php
public function login(Request $request)
{
    // Validación
    $validator = Validator::make($request->all(), [
        'email' => 'required|string',
        'password' => 'required',
    ]);
    
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    
    // Buscar usuario (Email O Username)
    $user = User::where('email', $request->email)
        ->orWhere('username', $request->email)
        ->first();
    
    // Verificar contraseña
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }
    
    // Verificar estado
    if (isset($user->estado) && strtolower($user->estado) !== 'activo') {
        return response()->json([
            'message' => 'Usuario inactivo'
        ], 403);
    }
    
    // Generar Token
    $token = $user->createToken('auth-token')->plainTextToken;
    
    // Respuesta
    return response()->json([
        'success' => true,
        'message' => 'Login exitoso',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'rol' => $user->rol,
        ],
        'token' => $token,
        'es_administrador' => $user->esAdministrador(),
        'roles' => $user->roles()->get(),
        'permisos' => $user->permisos(),
    ]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logout exitoso']);
}

public function me(Request $request)
{
    $user = $request->user();
    return response()->json([
        'user' => $user,
        'permisos' => $user->obtenerPermisos(),
        'es_administrador' => $user->esAdministrador(),
    ]);
}
```

#### 5.3.2 SolicitudAdministrativaController.php

CRUD completo para solicitudes administrativas.

**Métodos principales:**

```php
public function index(Request $request)
{
    $query = SolicitudAdministrativa::query();
    
    // Filtros
    if ($request->has('estado')) {
        $query->where('estado', $request->estado);
    }
    
    if ($request->has('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('nombre_completo', 'LIKE', "%{$search}%")
              ->orWhere('cedula', 'LIKE', "%{$search}%");
        });
    }
    
    $solicitudes = $query->with('usuarioCreador')
        ->latest('created_at')
        ->paginate($request->get('per_page', 15));
        
    return response()->json($solicitudes);
}

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nombre_completo' => 'required|string|max:255',
        'cedula' => 'required|string|max:50',
        'cargo' => 'required|string|max:255',
        // ... más validaciones
    ]);
    
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    
    $data = $validator->validated();
    $usuario = auth()->user();
    
    // Metadatos automáticos
    $data['fecha_solicitud'] = now();
    $data['usuario_creador_id'] = $usuario?->id;
    $data['registrado_por_nombre'] = $usuario?->name ?? 'Sistema';
    $data['registrado_por_email'] = $usuario?->email ?? 'sistema@hefesto.local';
    $data['estado'] = 'Pendiente';
    $data['fase_actual'] = 'Registro inicial';
    
    $solicitud = SolicitudAdministrativa::create($data);
    
    // Registrar en historial
    $solicitud->historialEstados()->create([
        'estado_anterior' => null,
        'estado_nuevo' => 'Pendiente',
        'fase' => 'Registro inicial',
        'usuario_id' => $usuario?->id,
        'usuario_nombre' => $data['registrado_por_nombre'],
        'usuario_email' => $data['registrado_por_email'],
        'observaciones' => 'Solicitud creada en el sistema',
        'ip_address' => $request->ip(),
        'user_agent' => $request->userAgent(),
    ]);
    
    return response()->json([
        'message' => 'Solicitud creada exitosamente',
        'data' => $solicitud->load(['usuarioCreador', 'historialEstados']),
    ], 201);
}

public function aprobar(Request $request, $id)
{
    $solicitud = SolicitudAdministrativa::findOrFail($id);
    
    $solicitud->update([
        'estado' => 'Aprobado',
        'fase_actual' => 'Aprobado',
    ]);
    
    // Registrar en historial
    $solicitud->historialEstados()->create([
        'estado_anterior' => 'Pendiente',
        'estado_nuevo' => 'Aprobado',
        'fase' => 'Aprobado',
        'usuario_id' => auth()->id(),
        'usuario_nombre' => auth()->user()->name,
        'observaciones' => $request->comentario ?? 'Solicitud aprobada',
    ]);
    
    return response()->json([
        'message' => 'Solicitud aprobada exitosamente',
        'data' => $solicitud->fresh()
    ]);
}
```

---

### 5.4 Traits

#### 5.4.1 HasPermissions.php

Trait para gestión de permisos.

```php
namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait HasPermissions
{
    public function roles()
    {
        return $this->belongsToMany(
            \App\Models\Role::class,
            'role_user',
            'user_id',
            'role_id'
        )->withTimestamps();
    }
    
    public function permisos()
    {
        return DB::table('permisos')
            ->join('permiso_role', 'permisos.id', '=', 'permiso_role.permiso_id')
            ->join('role_user', 'permiso_role.role_id', '=', 'role_user.role_id')
            ->where('role_user.user_id', $this->id)
            ->where('permisos.activo', 1)
            ->select('permisos.*')
            ->distinct()
            ->get();
    }
    
    public function obtenerPermisos()
    {
        return $this->permisos();
    }
    
    public function tienePermiso(string $permiso): bool
    {
        if ($this->email === 'admin@hefesto.local' || $this->rol === 'Administrador') {
            return true;
        }
        
        $roles = DB::table('role_user')
            ->where('user_id', $this->id)
            ->pluck('role_id');
        
        if ($roles->isEmpty()) {
            return false;
        }
        
        return DB::table('permiso_role')
            ->join('permisos', 'permiso_role.permiso_id', '=', 'permisos.id')
            ->whereIn('permiso_role.role_id', $roles)
            ->where('permisos.nombre', $permiso)
            ->where('permisos.activo', 1)
            ->exists();
    }
    
    public function esAdministrador(): bool
    {
        return strtolower($this->rol) === 'administrador' || 
               $this->tienePermiso('admin.acceso_total');
    }
}
```

---

### 5.5 Middleware

#### 5.5.1 CORS

Configuración en `config/cors.php`:

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
    ],
    'allowed_origins_patterns' => [
        '/^http:\/\/localhost(:\d+)?$/',
        '/^http:\/\/127\.0\.0\.1(:\d+)?$/',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 6. Frontend - React/Vite

### 6.1 Configuración Inicial

#### 6.1.1 Requisitos

- Node.js >= 18.x
- npm >= 9.x

#### 6.1.2 Instalación

```bash
cd client
npm install
```

#### 6.1.3 Variables de Entorno

Crear `.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

#### 6.1.4 Iniciar Desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:8080`

---

### 6.2 Arquitectura Frontend

#### 6.2.1 Cliente API (lib/api.ts)

```typescript
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    login: (credentials: { email: string; password: string; remember?: boolean }) =>
        api.post('/login', credentials),
    register: (data: any) => api.post('/register', data),
    logout: () => api.post('/logout'),
    me: () => api.get('/me'),
};

export default api;
```

#### 6.2.2 Context Provider (contexts/AppContext.tsx)

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface AppContextType {
    solicitudes: any[];
    usuarios: any[];
    loading: boolean;
    refreshSolicitudes: () => Promise<void>;
    refreshUsuarios: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [solicitudes, setSolicitudes] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const refreshSolicitudes = async () => {
        setLoading(true);
        try {
            const [admin, clinica] = await Promise.all([
                api.get('/solicitudes/administrativas'),
                api.get('/solicitudes/historia-clinica'),
            ]);
            setSolicitudes([...admin.data.data, ...clinica.data.data]);
        } catch (error) {
            console.error('Error fetching solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const refreshUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
    };
    
    useEffect(() => {
        refreshSolicitudes();
        refreshUsuarios();
    }, []);
    
    return (
        <AppContext.Provider value={{
            solicitudes,
            usuarios,
            loading,
            refreshSolicitudes,
            refreshUsuarios
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
```

---

### 6.3 Componentes Principales

#### 6.3.1 Layout.tsx

Decide qué layout usar según el modo de vista:

```typescript
export default function Layout({ children }: LayoutProps) {
    const [viewMode, setViewMode] = useState<string | null>(null);
    
    useEffect(() => {
        const savedViewMode = localStorage.getItem('view_mode') || 'user';
        setViewMode(savedViewMode);
    }, []);
    
    if (!viewMode) {
        return <div>Loading...</div>;
    }
    
    if (viewMode === 'admin') {
        return <LayoutAdministrador>{children}</LayoutAdministrador>;
    }
    
    return <LayoutUsuarios>{children}</LayoutUsuarios>;
}
```

#### 6.3.2 ModalRegistroUsuario.tsx

Modal para registrar usuarios:

```typescript
export default function ModalRegistroUsuario({ open, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: 'Usuario',
        estado: 'activo'
    });
    
    useEffect(() => {
        if (open) {
            // Limpiar formulario al abrir
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                rol: 'Usuario',
                estado: 'activo'
            });
        }
    }, [open]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await auth.register(formData);
            toast.success('Usuario creado exitosamente');
            onClose();
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error('Error al crear usuario');
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

---

### 6.4 Routing

Configurado en `App.tsx`:

```typescript
const App = () => (
    <QueryClientProvider client={queryClient}>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta pública */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* Rutas protegidas */}
                    <Route path="/" element={
                        localStorage.getItem('auth_token') 
                            ? <Layout><Outlet /></Layout>
                            : <Navigate to="/login" replace />
                    }>
                        <Route index element={<Index />} />
                        <Route path="registro/administrativo" element={<RegistroAdministrativo />} />
                        <Route path="registro/historia-clinica" element={<RegistroHistoriaClinica />} />
                        <Route path="control/:view" element={<Control />} />
                        <Route path="perfil/:view" element={<Perfil />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    </QueryClientProvider>
);
```

---

## 7. Base de Datos

### 7.1 Esquema Principal

#### 7.1.1 Tabla users

```sql
CREATE TABLE `users` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `username` varchar(100) DEFAULT NULL,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `rol` varchar(50) DEFAULT 'Usuario',
    `estado` varchar(20) DEFAULT 'activo',
    `telefono` varchar(50) DEFAULT NULL,
    `direccion` text,
    `cargo` varchar(255) DEFAULT NULL,
    `remember_token` varchar(100) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`),
    UNIQUE KEY `users_username_unique` (`username`)
);
```

#### 7.1.2 Tabla solicitudes_administrativas

```sql
CREATE TABLE `solicitudes_administrativas` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `nombre_completo` varchar(255) NOT NULL,
    `cedula` varchar(50) NOT NULL,
    `cargo` varchar(255) NOT NULL,
    `area_servicio` varchar(255) NOT NULL,
    `telefono_extension` varchar(50) NOT NULL,
    `tipo_vinculacion` enum('Planta','Agremiado','Contrato') DEFAULT 'Planta',
    `modulos_administrativos` json DEFAULT NULL,
    `modulos_financieros` json DEFAULT NULL,
    `anexos_nivel` enum('1','2','3') DEFAULT NULL,
    `tipo_permiso` json DEFAULT NULL,
    `perfil_de` varchar(255) DEFAULT NULL,
    `opciones_web` json DEFAULT NULL,
    `firmas` json DEFAULT NULL,
    `login_asignado` varchar(100) DEFAULT NULL,
    `clave_temporal` varchar(100) DEFAULT NULL,
    `acepta_responsabilidad` tinyint(1) DEFAULT '0',
    `estado` varchar(50) DEFAULT 'Pendiente',
    `fase_actual` varchar(100) DEFAULT 'Registro inicial',
    `fecha_solicitud` datetime DEFAULT NULL,
    `usuario_creador_id` bigint unsigned DEFAULT NULL,
    `registrado_por_nombre` varchar(255) DEFAULT NULL,
    `registrado_por_email` varchar(255) DEFAULT NULL,
    `firmas_pendientes` int DEFAULT '0',
    `firmas_completadas` int DEFAULT '0',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `solicitudes_admin_user_fk` (`usuario_creador_id`),
    CONSTRAINT `solicitudes_admin_user_fk` 
        FOREIGN KEY (`usuario_creador_id`) REFERENCES `users` (`id`)
);
```

#### 7.1.3 Tabla solicitudes_historia_clinica

Similar a `solicitudes_administrativas` pero con campos específicos para personal asistencial.

#### 7.1.4 Tabla roles

```sql
CREATE TABLE `roles` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` text,
    `activo` tinyint(1) DEFAULT '1',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `roles_nombre_unique` (`nombre`)
);
```

#### 7.1.5 Tabla permisos

```sql
CREATE TABLE `permisos` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` text,
    `activo` tinyint(1) DEFAULT '1',
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `permisos_nombre_unique` (`nombre`)
);
```

#### 7.1.6 Tablas Pivot

**role_user:**

```sql
CREATE TABLE `role_user` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `user_id` bigint unsigned NOT NULL,
    `role_id` bigint unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `role_user_user_fk` (`user_id`),
    KEY `role_user_role_fk` (`role_id`),
    CONSTRAINT `role_user_user_fk` 
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `role_user_role_fk` 
        FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
);
```

**permiso_role:**

```sql
CREATE TABLE `permiso_role` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `permiso_id` bigint unsigned NOT NULL,
    `role_id` bigint unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `permiso_role_permiso_fk` (`permiso_id`),
    KEY `permiso_role_role_fk` (`role_id`),
    CONSTRAINT `permiso_role_permiso_fk` 
        FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE,
    CONSTRAINT `permiso_role_role_fk` 
        FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
);
```

---

## 8. Autenticación y Permisos

### 8.1 Flujo de Autenticación

#### 8.1.1 Login

1. Usuario envía credenciales a `/api/login`
2. Backend valida y genera token Sanctum
3. Frontend guarda token en localStorage
4. Se determina modo de vista (user/admin)

#### 8.1.2 Requests Autenticados

- Interceptor de Axios agrega header `Authorization: Bearer {token}`
- Backend valida token con middleware `auth:sanctum`

#### 8.1.3 Logout

1. Frontend llama `/api/logout`
2. Backend revoca token actual
3. Frontend limpia localStorage

---

### 8.2 Sistema de Permisos

#### 8.2.1 Verificar permiso en controlador

```php
// Verificar permiso en controlador
if (!auth()->user()->tienePermiso('solicitudes.crear')) {
    return response()->json(['message' => 'No autorizado'], 403);
}

// Verificar rol
if (!auth()->user()->esAdministrador()) {
    return response()->json(['message' => 'Solo administradores'], 403);
}
```

---

### 8.3 Middleware Personalizado

#### 8.3.1 Crear middleware para verificar permisos

```bash
php artisan make:middleware CheckPermission
```

```php
public function handle($request, Closure $next, $permission)
{
    if (!auth()->user()->tienePermiso($permission)) {
        return response()->json(['message' => 'No autorizado'], 403);
    }
    return $next($request);
}
```

#### 8.3.2 Registrar en app/Http/Kernel.php

```php
protected $middlewareAliases = [
    'permission' => \App\Http\Middleware\CheckPermission::class,
];
```

#### 8.3.3 Usar en rutas

```php
Route::middleware(['auth:sanctum', 'permission:solicitudes.aprobar'])
    ->post('/solicitudes/{id}/aprobar', [SolicitudController::class, 'aprobar']);
```

---

## 9. API Endpoints

### 9.1 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/login` | Iniciar sesión |
| POST | `/api/logout` | Cerrar sesión |
| POST | `/api/register` | Registrar usuario |
| GET | `/api/me` | Obtener usuario autenticado |

### 9.2 Solicitudes Administrativas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/solicitudes/administrativas` | Listar solicitudes |
| POST | `/api/solicitudes/administrativas` | Crear solicitud |
| GET | `/api/solicitudes/administrativas/{id}` | Ver solicitud |
| PUT | `/api/solicitudes/administrativas/{id}` | Actualizar solicitud |
| DELETE | `/api/solicitudes/administrativas/{id}` | Eliminar solicitud |
| POST | `/api/solicitudes/administrativas/{id}/aprobar` | Aprobar solicitud |
| POST | `/api/solicitudes/administrativas/{id}/rechazar` | Rechazar solicitud |
| GET | `/api/solicitudes/administrativas/estadisticas` | Estadísticas |

### 9.3 Solicitudes Historia Clínica

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/solicitudes/historia-clinica` | Listar solicitudes |
| POST | `/api/solicitudes/historia-clinica` | Crear solicitud |
| GET | `/api/solicitudes/historia-clinica/{id}` | Ver solicitud |
| PUT | `/api/solicitudes/historia-clinica/{id}` | Actualizar solicitud |
| DELETE | `/api/solicitudes/historia-clinica/{id}` | Eliminar solicitud |

### 9.4 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Listar usuarios |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### 9.5 Perfil

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| PUT | `/api/perfil` | Actualizar perfil |
| POST | `/api/perfil/cambiar-password` | Cambiar contraseña |

---

## 10. Deployment

### 10.1 Backend - Laravel

#### 10.1.1 Configuración de Producción

**Optimizar Composer:**

```bash
composer install --optimize-autoloader --no-dev
```

**Configurar .env para producción:**

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-dominio.com

DB_CONNECTION=mysql
DB_HOST=tu-servidor-db
DB_PORT=3306
DB_DATABASE=hefesto_prod
DB_USERNAME=usuario_prod
DB_PASSWORD=contraseña_segura
```

**Optimizar Laravel:**

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Permisos:**

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

### 10.2 Frontend - React

#### 10.2.1 Build de Producción

```bash
cd client
npm run build
```

Esto genera los archivos en `dist/`.

#### 10.2.2 Deploy en Servidor Web

**Nginx:**

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/hefesto/client/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Apache (.htaccess):**

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 11. Troubleshooting

### 11.1 Errores Comunes

#### 11.1.1 Error 401 en todas las peticiones

**Causa:** Token inválido o expirado

**Solución:**
- Verificar que el token se está guardando en localStorage
- Verificar interceptor de Axios
- Limpiar localStorage y hacer login nuevamente

#### 11.1.2 Error CORS

**Causa:** Configuración incorrecta de CORS

**Solución:**
- Verificar `config/cors.php`
- Asegurar que la URL del frontend esté en `allowed_origins`
- Verificar que `supports_credentials` esté en `true`

#### 11.1.3 Migraciones fallan

**Causa:** Tablas conflictivas o base de datos corrupta

**Solución:**

```bash
php artisan migrate:fresh --seed
```

> **Advertencia:** Esto elimina todos los datos.

#### 11.1.4 Frontend no conecta con backend

**Causa:** URL incorrecta en variables de entorno

**Solución:**
- Verificar `.env.local` en frontend
- Verificar que `VITE_API_URL` apunte al backend correcto
- Reiniciar servidor de desarrollo

#### 11.1.5 Permisos no funcionan

**Causa:** Trait no aplicado o tablas pivot vacías

**Solución:**
- Verificar que el modelo `User` usa el trait `HasPermissions`
- Verificar que existen roles y permisos en BD
- Verificar que el usuario tiene roles asignados

---

### 11.2 Logs

#### 11.2.1 Backend (Laravel)

```bash
tail -f storage/logs/laravel.log
```

#### 11.2.2 Frontend (Vite)

Abrir DevTools del navegador → Console

---

## 12. Testing

### 12.1 Backend

```bash
php artisan test
```

### 12.2 Frontend

```bash
npm run test
```

---

## 13. Mejores Prácticas

### 13.1 Backend

- **Validación:** Siempre validar inputs en controladores
- **Sanitización:** Usar Eloquent para prevenir SQL injection
- **Transacciones:** Usar DB transactions para operaciones críticas
- **Logging:** Registrar errores importantes
- **API Versioning:** Considerar versionar la API (`/api/v1/`)

### 13.2 Frontend

- **Componentes:** Mantener componentes pequeños y reutilizables
- **Estado:** Usar Context API para estado global, `useState` para estado local
- **TypeScript:** Tipar todas las props e interfaces
- **Error Handling:** Manejar errores con try-catch y mostrar feedback al usuario
- **Loading States:** Siempre mostrar estados de carga

### 13.3 Seguridad

- Nunca exponer claves privadas en el código
- Siempre validar y sanitizar inputs
- Usar HTTPS en producción
- Actualizar dependencias regularmente
- Implementar rate limiting en endpoints críticos

---

## 14. Extensión del Sistema

### 14.1 Agregar Nuevo Tipo de Solicitud

#### 14.1.1 Crear Migración

```bash
php artisan make:migration create_solicitudes_nuevo_tipo_table
```

#### 14.1.2 Crear Modelo

```bash
php artisan make:model SolicitudNuevoTipo
```

#### 14.1.3 Crear Controlador

```bash
php artisan make:controller Api/SolicitudNuevoTipoController --api
```

#### 14.1.4 Agregar Rutas en `routes/api.php`

#### 14.1.5 Crear Vista en el frontend

---

### 14.2 Agregar Nuevo Permiso

```php
DB::table('permisos')->insert([
    'nombre' => 'nuevo.permiso',
    'descripcion' => 'Descripción del permiso',
    'activo' => true,
]);
```

---

### 14.3 Crear Reporte Personalizado

#### 14.3.1 Backend - crear endpoint

```php
public function reportePersonalizado(Request $request)
{
    $data = SolicitudAdministrativa::with('usuarioCreador')
        ->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin])
        ->get();
    
    return response()->json($data);
}
```

#### 14.3.2 Frontend - consumir endpoint

```typescript
const fetchReporte = async () => {
    const response = await api.get('/reportes/personalizado', {
        params: { fecha_inicio, fecha_fin }
    });
    return response.data;
};
```

---

### 1.2 Alcance del Manual

Este manual cubre los siguientes aspectos del sistema HEFESTO:

- **Arquitectura técnica completa**: Descripción detallada de componentes backend y frontend
- **Guías de desarrollo**: Instrucciones paso a paso para configuración y desarrollo
- **Patrones de diseño**: Implementación de patrones arquitectónicos y mejores prácticas
- **Operaciones**: Deployment, monitoreo y mantenimiento del sistema
- **Seguridad**: Implementación de controles y medidas de seguridad
- **Extensibilidad**: Guías para agregar nueva funcionalidad

**Fuera de alcance:**
- Requisitos de negocio específicos de cada implementación
- Configuraciones de infraestructura cloud específicas
- Detalles de implementación de terceros externos

---

### 1.3 Público Objetivo

Este manual está dirigido a:

- **Desarrolladores Full Stack**: Profesionales con experiencia en PHP/Laravel y React/TypeScript
- **Arquitectos de Software**: Responsables de diseño y evolución del sistema
- **DevOps Engineers**: Encargados de deployment y operaciones
- **Líderes Técnicos**: Supervisores de desarrollo y mantenimiento

**Conocimientos previos requeridos:**
- PHP 8.1+ y programación orientada a objetos
- Framework Laravel 10.x
- JavaScript/TypeScript ES6+
- React 18.x y hooks
- Bases de datos relacionales (MySQL)
- Git y control de versiones
- RESTful APIs

---

### 1.4 Convenciones del Documento

#### 1.4.1 Formato de Código

- **Bloques de código**: Identificados con sintaxis específica del lenguaje
- **Comandos de terminal**: Precedidos por `$` o sin prefijo
- **Rutas de archivo**: Formato absoluto o relativo al proyecto

#### 1.4.2 Símbolos y Notación

| Símbolo | Significado |
|---------|-------------|
| ⚠️ | Advertencia importante |
| ✅ | Recomendación o buena práctica |
| 🔒 | Relacionado con seguridad |
| 📝 | Nota informativa |
| 🚀 | Optimización de rendimiento |

#### 1.4.3 Convenciones de Nomenclatura

- **Clases**: PascalCase (ej: `SolicitudAdministrativa`)
- **Métodos**: camelCase (ej: `obtenerPermisos`)
- **Variables**: camelCase (ej: `usuarioActual`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_ATTEMPTS`)
- **Archivos**: kebab-case o PascalCase según contexto

---

### 2.3 Arquitectura de Capas

El sistema HEFESTO implementa una arquitectura en capas claramente definida:

```
┌─────────────────────────────────────────┐
│         Capa de Presentación            │
│    (React Components, UI, Routing)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Capa de Lógica de Negocio          │
│   (Controllers, Services, Validators)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        Capa de Acceso a Datos           │
│     (Models, Repositories, ORM)          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Capa de Datos                  │
│         (MySQL Database)                 │
└─────────────────────────────────────────┘
```

#### 2.3.1 Capa de Presentación

**Responsabilidades:**
- Renderizar interfaz de usuario
- Capturar interacciones del usuario
- Validación de formularios en cliente
- Navegación y routing

**Componentes principales:**
- Componentes React
- Context Providers
- Custom Hooks
- Router Configuration

#### 2.3.2 Capa de Lógica de Negocio

**Responsabilidades:**
- Procesar solicitudes HTTP
- Aplicar reglas de negocio
- Validar datos
- Orquestar operaciones complejas

**Componentes principales:**
- Controllers (Laravel)
- Services
- Validators
- Middleware

#### 2.3.3 Capa de Acceso a Datos

**Responsabilidades:**
- Abstraer acceso a base de datos
- Implementar consultas optimizadas
- Gestionar relaciones entre entidades
- Cache de datos

**Componentes principales:**
- Models (Eloquent)
- Repositories
- Query Builders

#### 2.3.4 Capa de Datos

**Responsabilidades:**
- Almacenamiento persistente
- Integridad referencial
- Optimización de consultas mediante índices

---

### 2.4 Comunicación Entre Componentes

#### 2.4.1 Frontend → Backend

```
Usuario Interactúa
    ↓
Componente React
    ↓
Event Handler
    ↓
API Call (Axios)
    ↓
HTTP Request (JSON)
    ↓
Laravel Route
    ↓
Middleware (Auth)
    ↓
Controller
    ↓
Response (JSON)
```

**Ejemplo de flujo:**

```typescript
// 1. Usuario hace clic en botón
const handleSubmit = async () => {
  try {
    // 2. Llamada API
    const response = await api.post('/solicitudes/administrativas', formData);
    
    // 3. Procesar respuesta
    if (response.data.success) {
      toast.success('Solicitud creada exitosamente');
      navigate('/solicitudes');
    }
  } catch (error) {
    // 4. Manejo de errores
    toast.error('Error al crear solicitud');
  }
};
```

#### 2.4.2 Backend → Base de Datos

```
Controller
    ↓
Service Layer (opcional)
    ↓
Model/Repository
    ↓
Query Builder (Eloquent)
    ↓
SQL Query
    ↓
MySQL Database
    ↓
Result Set
    ↓
Eloquent Collection
    ↓
JSON Response
```

#### 2.4.3 Patrón Request-Response

**Request típico:**

```http
POST /api/solicitudes/administrativas HTTP/1.1
Host: localhost:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: application/json

{
  "nombre_completo": "Juan Pérez",
  "cedula": "123456789",
  "cargo": "Médico General"
}
```

**Response típico:**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Solicitud creada exitosamente",
  "data": {
    "id": 42,
    "nombre_completo": "Juan Pérez",
    "estado": "Pendiente",
    "created_at": "2024-11-26T08:00:00.000000Z"
  }
}
```

---

### 2.5 Diagrama de Componentes

```
┌───────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                      │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Pages/     │  │ Components/  │  │  Contexts/   │  │
│  │   Views      │  │     UI       │  │   State      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │           │
│         └──────────────────┴──────────────────┘           │
│                            │                              │
│                    ┌───────▼────────┐                    │
│                    │   API Client    │                    │
│                    │    (Axios)      │                    │
│                    └───────┬────────┘                    │
└────────────────────────────┼──────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼──────────────────────────────┐
│                    BACKEND (Laravel)                       │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Routes     │→ │ Middleware   │→ │ Controllers  │  │
│  │  (api.php)   │  │ (Sanctum)    │  │   (API)      │  │
│  └──────────────┘  └──────────────┘  └──────┬───────┘  │
│                                               │           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────▼───────┐  │
│  │   Services   │  │    Traits    │  │    Models    │  │
│  │   (Logic)    │  │ (Permissions)│  │  (Eloquent)  │  │
│  └──────────────┘  └──────────────┘  └──────┬───────┘  │
│                                               │           │
└───────────────────────────────────────────────┼───────────┘
                                                │
┌───────────────────────────────────────────────▼───────────┐
│                    DATABASE (MySQL)                        │
├───────────────────────────────────────────────────────────┤
│  users │ solicitudes_* │ roles │ permisos │ historial    │
└───────────────────────────────────────────────────────────┘
```

---

### 3.4 Dependencias y Versiones

#### 3.4.1 Backend Dependencies (composer.json)

```json
{
  "require": {
    "php": "^8.1",
    "laravel/framework": "^10.0",
    "laravel/sanctum": "^3.2",
    "laravel/tinker": "^2.8"
  },
  "require-dev": {
    "fakerphp/faker": "^1.21",
    "laravel/pint": "^1.0",
    "laravel/sail": "^1.18",
    "mockery/mockery": "^1.5",
    "nunomaduro/collision": "^7.0",
    "phpunit/phpunit": "^10.0",
    "spatie/laravel-ignition": "^2.0"
  }
}
```

#### 3.4.2 Frontend Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "@tanstack/react-query": "^4.29.0",
    "axios": "^1.4.0",
    "framer-motion": "^10.12.0",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "clsx": "^1.2.1",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.1.6",
    "vite": "^4.4.5"
  }
}
```

---

## 9. Flujos de Trabajo

### 9.1 Flujo de Registro de Solicitud

#### 9.1.1 Diagrama de Flujo

```
INICIO
  │
  ▼
Usuario accede a formulario
  │
  ▼
Completa campos requeridos
  │
  ▼
¿Datos válidos? ──NO──► Mostrar errores
  │                            │
  SÍ                           │
  │                            │
  ▼                            │
Enviar a backend ◄─────────────┘
  │
  ▼
Validación servidor
  │
  ▼
¿Válido? ──NO──► Retornar error 422
  │
  SÍ
  │
  ▼
Crear registro en BD
  │
  ▼
Registrar en historial
  │
  ▼
Asignar firmas requeridas
  │
  ▼
Enviar notificaciones
  │
  ▼
Retornar éxito
  │
  ▼
Mostrar confirmación
  │
  ▼
FIN
```

#### 9.1.2 Código Backend

```php
public function store(Request $request)
{
    // 1. Validación
    $validated = $request->validate([
        'nombre_completo' => 'required|string|max:255',
        'cedula' => 'required|string|max:50',
        'cargo' => 'required|string|max:255',
        'area_servicio' => 'required|string',
        'telefono_extension' => 'required|string',
        'tipo_vinculacion' => 'required|in:Planta,Agremiado,Contrato',
        'acepta_responsabilidad' => 'required|boolean',
    ]);
    
    // 2. Preparar datos adicionales
    $usuario = auth()->user();
    $validated['fecha_solicitud'] = now();
    $validated['usuario_creador_id'] = $usuario->id;
    $validated['registrado_por_nombre'] = $usuario->name;
    $validated['registrado_por_email'] = $usuario->email;
    $validated['estado'] = 'Pendiente';
    $validated['fase_actual'] = 'Registro inicial';
    
    // 3. Usar transacción para atomicidad
    DB::beginTransaction();
    
    try {
        // 4. Crear solicitud
        $solicitud = SolicitudAdministrativa::create($validated);
        
        // 5. Registrar en historial
        $solicitud->historialEstados()->create([
            'estado_anterior' => null,
            'estado_nuevo' => 'Pendiente',
            'fase' => 'Registro inicial',
            'usuario_id' => $usuario->id,
            'usuario_nombre' => $usuario->name,
            'usuario_email' => $usuario->email,
            'observaciones' => 'Solicitud creada en el sistema',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        
        // 6. Asignar firmas según configuración
        $this->asignarFirmas($solicitud);
        
        // 7. Enviar notificaciones
        event(new SolicitudCreada($solicitud));
        
        DB::commit();
        
        // 8. Retornar respuesta exitosa
        return response()->json([
            'success' => true,
            'message' => 'Solicitud creada exitosamente',
            'data' => $solicitud->load(['usuarioCreador', 'historialEstados']),
        ], 201);
        
    } catch (\Exception $e) {
        DB::rollBack();
        
        Log::error('Error creando solicitud: ' . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => 'Error al crear la solicitud',
            'error' => $e->getMessage()
        ], 500);
    }
}

private function asignarFirmas($solicitud)
{
    // Lógica para asignar firmas requeridas
    $firmasConfig = config('hefesto.firmas_requeridas');
    
    foreach ($firmasConfig as $firma) {
        $solicitud->firmas()->create([
            'cargo' => $firma['cargo'],
            'nivel' => $firma['nivel'],
            'estado' => 'Pendiente',
        ]);
    }
    
    $solicitud->update([
        'firmas_pendientes' => count($firmasConfig),
        'firmas_completadas' => 0,
    ]);
}
```

#### 9.1.3 Código Frontend

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export default function RegistroAdministrativo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    cedula: '',
    cargo: '',
    area_servicio: '',
    telefono_extension: '',
    tipo_vinculacion: 'Planta',
    acepta_responsabilidad: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Limpiar error al modificar campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validarFormulario = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre completo es requerido';
    }
    
    if (!formData.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (!/^\d{6,12}$/.test(formData.cedula)) {
      newErrors.cedula = 'La cédula debe tener entre 6 y 12 dígitos';
    }
    
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'El cargo es requerido';
    }
    
    if (!formData.acepta_responsabilidad) {
      newErrors.acepta_responsabilidad = 'Debe aceptar la responsabilidad';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      toast.error('Por favor corrija los errores en el formulario');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/solicitudes/administrativas', formData);
      
      if (response.data.success) {
        toast.success('Solicitud creada exitosamente');
        navigate('/solicitudes');
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        // Errores de validación del servidor
        setErrors(error.response.data.errors || {});
        toast.error('Por favor corrija los errores del formulario');
      } else {
        toast.error('Error al crear la solicitud');
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Formulario aquí */}
      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Guardando...' : 'Crear Solicitud'}
      </button>
    </form>
  );
}
```

---

### 9.2 Flujo de Aprobación

#### 9.2.1 Estados de Solicitud

```
┌─────────────┐
│  Pendiente  │
└──────┬──────┘
       │
       ├──────► En Revisión
       │            │
       │            ├──────► Aprobado ──────► Completado
       │            │
       │            └──────► Rechazado
       │
       └──────► Cancelado
```

#### 9.2.2 Lógica de Aprobación

```php
public function aprobar(Request $request, $id)
{
    $solicitud = SolicitudAdministrativa::findOrFail($id);
    $usuario = auth()->user();
    
    // Verificar permisos
    if (!$usuario->tienePermiso('solicitudes.aprobar')) {
        return response()->json([
            'message' => 'No tiene permisos para aprobar solicitudes'
        ], 403);
    }
    
    // Verificar estado actual
    if ($solicitud->estado !== 'Pendiente' && $solicitud->estado !== 'En Revisión') {
        return response()->json([
            'message' => 'La solicitud no puede ser aprobada en su estado actual'
        ], 400);
    }
    
    DB::beginTransaction();
    
    try {
        $estadoAnterior = $solicitud->estado;
        
        // Actualizar solicitud
        $solicitud->update([
            'estado' => 'Aprobado',
            'fase_actual' => 'Aprobado por ' . $usuario->name,
            'aprobado_por_id' => $usuario->id,
            'fecha_aprobacion' => now(),
        ]);
        
        // Registrar en historial
        $solicitud->historialEstados()->create([
            'estado_anterior' => $estadoAnterior,
            'estado_nuevo' => 'Aprobado',
            'fase' => 'Aprobado',
            'usuario_id' => $usuario->id,
            'usuario_nombre' => $usuario->name,
            'usuario_email' => $usuario->email,
            'observaciones' => $request->comentario ?? 'Solicitud aprobada',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        
        // Enviar notificaciones
        event(new SolicitudAprobada($solicitud));
        
        DB::commit();
        
        return response()->json([
            'success' => true,
            'message' => 'Solicitud aprobada exitosamente',
            'data' => $solicitud->fresh()->load(['usuarioCreador', 'historialEstados'])
        ]);
        
    } catch (\Exception $e) {
        DB::rollBack();
        
        Log::error('Error aprobando solicitud: ' . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => 'Error al aprobar la solicitud'
        ], 500);
    }
}
```

---

### 9.3 Flujo de Firmas

#### 9.3.1 Sistema de Firmas Electrónicas

```php
// Model: Firma.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Firma extends Model
{
    protected $fillable = [
        'solicitud_id',
        'solicitud_type',
        'cargo_firmante',
        'nombre_firmante',
        'email_firmante',
        'estado',
        'fecha_firma',
        'ip_firma',
        'observaciones',
        'orden',
    ];
    
    protected $casts = [
        'fecha_firma' => 'datetime',
    ];
    
    public function solicitud()
    {
        return $this->morphTo();
    }
    
    public function firmar($usuario, $observaciones = null)
    {
        $this->update([
            'estado' => 'Firmado',
            'nombre_firmante' => $usuario->name,
            'email_firmante' => $usuario->email,
            'fecha_firma' => now(),
            'ip_firma' => request()->ip(),
            'observaciones' => $observaciones,
        ]);
        
        // Actualizar contador en solicitud
        $this->solicitud->increment('firmas_completadas');
        $this->solicitud->decrement('firmas_pendientes');
        
        // Verificar si todas las firmas están completas
        if ($this->solicitud->firmas_pendientes === 0) {
            $this->solicitud->update([
                'estado' => 'Firmas Completadas',
                'fase_actual' => 'Todas las firmas recopiladas',
            ]);
        }
    }
}
```

---

## 11. Casos de Uso

### 11.1 Caso de Uso: Crear Solicitud Administrativa

**Actor Principal:** Usuario del sistema (Administrativo)

**Precondiciones:**
- Usuario autenticado
- Usuario tiene permiso `solicitudes.crear`

**Flujo Principal:**

1. Usuario accede al módulo de registro
2. Sistema presenta formulario de solicitud administrativa
3. Usuario completa campos obligatorios:
   - Nombre completo
   - Cédula
   - Cargo
   - Área/Servicio
   - Teléfono/Extensión
   - Tipo de vinculación
4. Usuario selecciona módulos y permisos requeridos
5. Usuario acepta carta de responsabilidad
6. Usuario envía formulario
7. Sistema valida datos
8. Sistema crea registro en base de datos
9. Sistema asigna firmas requeridas según configuración
10. Sistema registra en historial de auditoría
11. Sistema envía notificaciones a aprobadores
12. Sistema muestra confirmación al usuario

**Flujos Alternativos:**

**7a. Datos inválidos:**
- 7a1. Sistema muestra errores de validación
- 7a2. Usuario corrige errores
- 7a3. Continúa en paso 6

**8a. Error en base de datos:**
- 8a1. Sistema revierte transacción
- 8a2. Sistema muestra mensaje de error
- 8a3. Usuario puede reintentar

**Postcondiciones:**
- Solicitud creada en estado "Pendiente"
- Historial de auditoría actualizado
- Notificaciones enviadas

---

### 11.2 Caso de Uso: Aprobar Solicitud

**Actor Principal:** Administrador o Aprobador

**Precondiciones:**
- Usuario autenticado
- Usuario tiene permiso `solicitudes.aprobar`
- Solicitud en estado "Pendiente" o "En Revisión"

**Flujo Principal:**

1. Usuario accede a lista de solicitudes pendientes
2. Sistema muestra solicitudes filtrables
3. Usuario selecciona solicitud para revisar
4. Sistema muestra detalles completos de solicitud
5. Usuario revisa información
6. Usuario hace clic en "Aprobar"
7. Sistema solicita confirmación y comentarios opcionales
8. Usuario confirma aprobación
9. Sistema valida permisos
10. Sistema actualiza estado a "Aprobado"
11. Sistema registra en historial
12. Sistema envía notificaciones
13. Sistema muestra confirmación

**Flujos Alternativos:**

**6a. Usuario decide rechazar:**
- 6a1. Usuario hace clic en "Rechazar"
- 6a2. Sistema solicita motivo del rechazo (obligatorio)
- 6a3. Usuario ingresa motivo
- 6a4. Sistema actualiza estado a "Rechazado"
- 6a5. Sistema registra en historial
- 6a6. Sistema notifica al solicitante

**9a. Usuario sin permisos:**
- 9a1. Sistema muestra error 403
- 9a2. Proceso termina

---

## 12. Patrones de Diseño

### 12.1 Repository Pattern

#### 12.1.1 Implementación

```php
// app/Repositories/SolicitudRepository.php
namespace App\Repositories;

use App\Models\SolicitudAdministrativa;
use Illuminate\Database\Eloquent\Collection;

interface SolicitudRepositoryInterface
{
    public function findById(int $id);
    public function findByEstado(string $estado);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}

class SolicitudRepository implements SolicitudRepositoryInterface
{
    protected $model;
    
    public function __construct(SolicitudAdministrativa $model)
    {
        $this->model = $model;
    }
    
    public function findById(int $id)
    {
        return $this->model
            ->with(['usuarioCreador', 'historialEstados', 'firmas'])
            ->findOrFail($id);
    }
    
    public function findByEstado(string $estado): Collection
    {
        return $this->model
            ->where('estado', $estado)
            ->with('usuarioCreador')
            ->latest()
            ->get();
    }
    
    public function create(array $data)
    {
        return $this->model->create($data);
    }
    
    public function update(int $id, array $data)
    {
        $solicitud = $this->findById($id);
        $solicitud->update($data);
        return $solicitud->fresh();
    }
    
    public function delete(int $id): bool
    {
        $solicitud = $this->findById($id);
        return $solicitud->delete();
    }
    
    public function findPendientesPorUsuario(int $usuarioId): Collection
    {
        return $this->model
            ->where('usuario_creador_id', $usuarioId)
            ->where('estado', 'Pendiente')
            ->latest()
            ->get();
    }
}
```

#### 12.1.2 Registro en Service Provider

```php
// app/Providers/AppServiceProvider.php
public function register()
{
    $this->app->bind(
        \App\Repositories\SolicitudRepositoryInterface::class,
        \App\Repositories\SolicitudRepository::class
    );
}
```

#### 12.1.3 Uso en Controller

```php
use App\Repositories\SolicitudRepositoryInterface;

class SolicitudAdministrativaController extends Controller
{
    protected $solicitudRepo;
    
    public function __construct(SolicitudRepositoryInterface $solicitudRepo)
    {
        $this->solicitudRepo = $solicitudRepo;
    }
    
    public function show($id)
    {
        $solicitud = $this->solicitudRepo->findById($id);
        return response()->json($solicitud);
    }
}
```

---

### 12.2 Service Layer Pattern

```php
// app/Services/SolicitudService.php
namespace App\Services;

use App\Repositories\SolicitudRepositoryInterface;
use App\Events\SolicitudCreada;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SolicitudService
{
    protected $solicitudRepo;
    
    public function __construct(SolicitudRepositoryInterface $solicitudRepo)
    {
        $this->solicitudRepo = $solicitudRepo;
    }
    
    public function crearSolicitud(array $data, $usuario)
    {
        DB::beginTransaction();
        
        try {
            // Preparar datos
            $data['fecha_solicitud'] = now();
            $data['usuario_creador_id'] = $usuario->id;
            $data['registrado_por_nombre'] = $usuario->name;
            $data['registrado_por_email'] = $usuario->email;
            $data['estado'] = 'Pendiente';
            
            // Crear solicitud
            $solicitud = $this->solicitudRepo->create($data);
            
            // Registrar historial
            $this->registrarHistorial($solicitud, null, 'Pendiente', 'Solicitud creada');
            
            // Asignar firmas
            $this->asignarFirmasRequeridas($solicitud);
            
            // Disparar evento
            event(new SolicitudCreada($solicitud));
            
            DB::commit();
            
            return $solicitud;
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creando solicitud: ' . $e->getMessage());
            throw $e;
        }
    }
    
    private function registrarHistorial($solicitud, $estadoAnterior, $estadoNuevo, $observaciones)
    {
        $solicitud->historialEstados()->create([
            'estado_anterior' => $estadoAnterior,
            'estado_nuevo' => $estadoNuevo,
            'fase' => $estadoNuevo,
            'usuario_id' => auth()->id(),
            'usuario_nombre' => auth()->user()->name,
            'observaciones' => $observaciones,
            'ip_address' => request()->ip(),
        ]);
    }
    
    private function asignarFirmasRequeridas($solicitud)
    {
        $firmas = config('hefesto.firmas_requeridas.administrativa', []);
        
        foreach ($firmas as $index => $firma) {
            $solicitud->firmas()->create([
                'cargo_firmante' => $firma['cargo'],
                'estado' => 'Pendiente',
                'orden' => $index + 1,
            ]);
        }
        
        $solicitud->update([
            'firmas_pendientes' => count($firmas),
            'firmas_completadas' => 0,
        ]);
    }
}
```

---

## 13. Deployment

### 13.3 Docker

#### 13.3.1 Dockerfile Backend

```dockerfile
# Dockerfile
FROM php:8.1-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Obtener Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar directorio de trabajo
WORKDIR /var/www

# Copiar archivos
COPY . .

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader

# Permisos
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
```

#### 13.3.2 Dockerfile Frontend

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Producción
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 13.3.3 docker-compose.yml

```yaml
version: '3.8'

services:
  # MySQL
  db:
    image: mysql:8.0
    container_name: hefesto_db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: hefesto_db
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: hefesto
      MYSQL_PASSWORD: hefesto123
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - hefesto_network

  # Backend Laravel
  backend:
    build:
      context: ./hefesto-backend
      dockerfile: Dockerfile
    container_name: hefesto_backend
    restart: unless-stopped
    environment:
      DB_HOST: db
      DB_DATABASE: hefesto_db
      DB_USERNAME: hefesto
      DB_PASSWORD: hefesto123
    ports:
      - "8000:9000"
    volumes:
      - ./hefesto-backend:/var/www
      - php_storage:/var/www/storage
    depends_on:
      - db
    networks:
      - hefesto_network

  # Frontend React
  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: hefesto_frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - hefesto_network

volumes:
  db_data:
  php_storage:

networks:
  hefesto_network:
    driver: bridge
```

---

### 13.4 CI/CD

#### 13.4.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy HEFESTO

on:
  push:
    branches: [ main, production ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.1'
        extensions: mbstring, xml, ctype, json, mysql
        
    - name: Install Dependencies
      run: |
        cd hefesto-backend
        composer install --prefer-dist --no-progress
        
    - name: Run Tests
      run: |
        cd hefesto-backend
        php artisan test
  
  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: |
        cd client
        npm ci
        
    - name: Run Tests
      run: |
        cd client
        npm run test
        
    - name: Build
      run: |
        cd client
        npm run build
  
  deploy:
    needs: [test-backend, test-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/production'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/hefesto
          git pull origin production
          cd hefesto-backend
          composer install --no-dev --optimize-autoloader
          php artisan migrate --force
          php artisan config:cache
          php artisan route:cache
          cd ../client
          npm ci
          npm run build
          sudo systemctl restart php8.1-fpm
          sudo systemctl reload nginx
```

---

## 15. Optimización

### 15.1 Optimización de Base de Datos

#### 15.1.1 Índices Estratégicos

```sql
-- Índices para búsquedas frecuentes
CREATE INDEX idx_solicitudes_estado 
ON solicitudes_administrativas(estado);

CREATE INDEX idx_solicitudes_fecha 
ON solicitudes_administrativas(fecha_solicitud);

CREATE INDEX idx_solicitudes_usuario 
ON solicitudes_administrativas(usuario_creador_id);

-- Índice compuesto para consultas complejas
CREATE INDEX idx_solicitudes_estado_fecha 
ON solicitudes_administrativas(estado, fecha_solicitud);

-- Full-text search para búsquedas de texto
CREATE FULLTEXT INDEX idx_solicitudes_busqueda 
ON solicitudes_administrativas(nombre_completo, cedula, cargo);
```

#### 15.1.2 Consultas Optimizadas

```php
// ❌ MAL - N+1 Problem
$solicitudes = SolicitudAdministrativa::all();
foreach ($solicitudes as $solicitud) {
    echo $solicitud->usuarioCreador->name; // Query adicional por cada solicitud
}

// ✅ BIEN - Eager Loading
$solicitudes = SolicitudAdministrativa::with('usuarioCreador')->get();
foreach ($solicitudes as $solicitud) {
    echo $solicitud->usuarioCreador->name; // Sin queries adicionales
}

// ✅ EXCELENTE - Eager Loading con selección de campos
$solicitudes = SolicitudAdministrativa::with(['usuarioCreador:id,name,email'])
    ->select('id', 'nombre_completo', 'estado', 'usuario_creador_id')
    ->latest()
    ->get();
```

---

### 15.2 Caché

#### 15.2.1 Configuración Redis

```env
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

#### 15.2.2 Implementación de Caché

```php
use Illuminate\Support\Facades\Cache;

class SolicitudController extends Controller
{
    public function estadisticas()
    {
        // Cache por 1 hora
        $stats = Cache::remember('solicitudes.estadisticas', 3600, function () {
            return [
                'total' => SolicitudAdministrativa::count(),
                'pendientes' => SolicitudAdministrativa::where('estado', 'Pendiente')->count(),
                'aprobadas' => SolicitudAdministrativa::where('estado', 'Aprobado')->count(),
                'rechazadas' => SolicitudAdministrativa::where('estado', 'Rechazado')->count(),
            ];
        });
        
        return response()->json($stats);
    }
    
    public function store(Request $request)
    {
        // ... crear solicitud ...
        
        // Invalidar cache de estadísticas
        Cache::forget('solicitudes.estadisticas');
        
        return response()->json($solicitud, 201);
    }
}
```

---

## 16. Seguridad

### 16.1 Autenticación Segura

#### 16.1.1 Rate Limiting en Login

```php
// app/Http/Controllers/Api/AuthController.php
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

public function login(Request $request)
{
    $key = 'login.' . $request->ip();
    
    // Verificar rate limit
    if (RateLimiter::tooManyAttempts($key, 5)) {
        $seconds = RateLimiter::availableIn($key);
        
        throw ValidationException::withMessages([
            'email' => ['Demasiados intentos de login. Por favor intente en ' . $seconds . ' segundos.'],
        ]);
    }
    
    // ... lógica de login ...
    
    if ($loginFailed) {
        RateLimiter::hit($key, 60); // Bloquear por 60 segundos
        
        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }
    
    RateLimiter::clear($key);
    
    // ... retornar token ...
}
```

#### 16.1.2 Tokens Seguros

```php
// Revocar todos los tokens al cambiar contraseña
public function cambiarPassword(Request $request)
{
    $user = auth()->user();
    
    // Validar contraseña actual
    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Contraseña actual incorrecta'], 401);
    }
    
    // Actualizar contraseña
    $user->password = Hash::make($request->new_password);
    $user->save();
    
    // Revocar todos los tokens excepto el actual
    $user->tokens()->where('id', '!=', $user->currentAccessToken()->id)->delete();
    
    return response()->json(['message' => 'Contraseña actualizada exitosamente']);
}
```

---

### 16.2 Protección CSRF

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1,localhost:8080'
)),
```

---

### 16.3 Protección XSS

#### 16.3.1 Sanitización en Frontend

```typescript
// lib/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
};
```

#### 16.3.2 Escape en Backend

```php
// Uso automático con Blade (se escapa por defecto)
{{ $usuario->name }}  // Escapado automáticamente

// Raw output (solo si es necesario y seguro)
{!! $contenidoHTML !!}

// En respuestas JSON, Laravel escapa automáticamente
return response()->json(['name' => $user->name]); // Seguro
```

---

### 16.4 SQL Injection

```php
// ❌ MAL - Vulnerable a SQL Injection
$cedula = $request->cedula;
$results = DB::select("SELECT * FROM solicitudes WHERE cedula = '$cedula'");

// ✅ BIEN - Usar parámetros seguros
$cedula = $request->cedula;
$results = DB::select("SELECT * FROM solicitudes WHERE cedula = ?", [$cedula]);

// ✅ MEJOR - Usar Eloquent
$results = SolicitudAdministrativa::where('cedula', $request->cedula)->get();
```

---

### 16.5 Rate Limiting

```php
// routes/api.php
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

RateLimiter::for('solicitudes', function (Request $request) {
    return Limit::perMinute(10)->by($request->user()->id);
});

// Aplicar en rutas
Route::middleware(['auth:sanctum', 'throttle:solicitudes'])->group(function () {
    Route::post('/solicitudes/administrativas', [SolicitudController::class, 'store']);
});
```

---

## 20. Apéndices

### 20.1 Glosario

| Término | Definición |
|---------|------------|
| **Eloquent** | ORM (Object-Relational Mapping) de Laravel para interactuar con la base de datos |
| **Middleware** | Capa intermedia que filtra requests HTTP |
| **Sanctum** | Sistema de autenticación basado en tokens de Laravel |
| **SPA** | Single Page Application - Aplicación de página única |
| **JWT** | JSON Web Token - Estándar para tokens de autenticación |
| **CORS** | Cross-Origin Resource Sharing - Política de recursos compartidos entre orígenes |
| **Eager Loading** | Técnica de optimización que carga relaciones anticipadamente |
| **N+1 Problem** | Problema de rendimiento causado por queries múltiples innecesarias |
| **Repository Pattern** | Patrón que abstrae la capa de acceso a datos |
| **Service Layer** | Capa que contiene lógica de negocio |
| **Trait** | Mecanismo de reutilización de código en PHP |

---

### 20.2 Comandos Útiles

#### 20.2.1 Laravel Artisan

```bash
# Desarrollo
php artisan serve                    # Iniciar servidor desarrollo
php artisan migrate                  # Ejecutar migraciones
php artisan migrate:fresh --seed     # Resetear BD y ejecutar seeders
php artisan db:seed                  # Ejecutar seeders
php artisan tinker                   # REPL interactivo

# Creación de archivos
php artisan make:model Post          # Crear modelo
php artisan make:controller PostController  # Crear controlador
php artisan make:migration create_posts_table  # Crear migración
php artisan make:seeder PostSeeder   # Crear seeder
php artisan make:middleware CheckAge # Crear middleware

# Optimización
php artisan config:cache             # Cachear configuración
php artisan route:cache              # Cachear rutas
php artisan view:cache               # Cachear vistas
php artisan optimize                 # Optimizar aplicación
php artisan config:clear             # Limpiar cache de config
php artisan cache:clear              # Limpiar cache aplicación

# Testing
php artisan test                     # Ejecutar tests
php artisan test --filter=UserTest   # Ejecutar test específico
```

#### 20.2.2 NPM/Vite

```bash
# Desarrollo
npm run dev                          # Servidor desarrollo
npm run build                        # Build producción
npm run preview                      # Preview build

# Testing
npm run test                         # Ejecutar tests
npm run test:watch                   # Tests en modo watch
npm run test:coverage                # Tests con cobertura

# Linting
npm run lint                         # Ejecutar linter
npm run lint:fix                     # Arreglar errores linting

# Dependencias
npm install                          # Instalar dependencias
npm update                           # Actualizar dependencias
npm audit                            # Revisar vulnerabilidades
npm audit fix                        # Arreglar vulnerabilidades
```

#### 20.2.3 Git

```bash
# Flujo básico
git status                           # Ver estado
git add .                            # Agregar todos los cambios
git commit -m "mensaje"              # Commit con mensaje
git push origin main                 # Push a rama main

# Branches
git branch                           # Listar branches
git checkout -b feature/nueva        # Crear y cambiar a nueva branch
git merge feature/nueva              # Mergear branch
git branch -d feature/nueva          # Eliminar branch

# Histórico
git log --oneline                    # Ver commits
git log --graph --all                # Ver árbol de commits
git diff                             # Ver cambios no commiteados

# Deshacer cambios
git checkout -- archivo.txt          # Descartar cambios en archivo
git reset HEAD~1                     # Deshacer último commit (mantener cambios)
git reset --hard HEAD~1              # Deshacer último commit (eliminar cambios)
```

---

### 20.3 Configuraciones Avanzadas

#### 20.3.1 Optimización de Imágenes

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: {
        format: 'webp',
        quality: 80,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

#### 20.3.2 Laravel Queue con Redis

```env
QUEUE_CONNECTION=redis
```

```php
// Crear Job
php artisan make:job EnviarNotificacionSolicitud

// app/Jobs/EnviarNotificacionSolicitud.php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\SolicitudAdministrativa;
use Illuminate\Support\Facades\Mail;

class EnviarNotificacionSolicitud implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $solicitud;

    public function __construct(SolicitudAdministrativa $solicitud)
    {
        $this->solicitud = $solicitud;
    }

    public function handle()
    {
        // Lógica para enviar notificación
        Mail::to($this->solicitud->usuarioCreador->email)
            ->send(new SolicitudCreada($this->solicitud));
    }
}

// Dispatch del Job
EnviarNotificacionSolicitud::dispatch($solicitud);

// Worker para procesar jobs
php artisan queue:work
```

#### 20.3.3 Monitoring con Laravel Telescope

```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

```env
TELESCOPE_ENABLED=true
```

Acceder en: `http://localhost:8000/telescope`

---

## Referencias

American Psychological Association. (2020). *Publication manual of the American Psychological Association* (7th ed.). https://doi.org/10.1037/0000165-000

Laravel. (2024). *Laravel 10.x Documentation*. https://laravel.com/docs/10.x

React. (2024). *React Documentation*. https://react.dev

---

**Fin del Manual de Programación**
