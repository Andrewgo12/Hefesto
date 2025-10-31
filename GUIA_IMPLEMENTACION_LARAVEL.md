# 🚀 Guía de Implementación con Laravel

Esta guía te ayudará a implementar el backend de HEFESTO usando Laravel y conectarlo con el frontend React existente.

## 📋 Tabla de Contenidos
1. [Preparación del Entorno](#preparación-del-entorno)
2. [Estructura de Base de Datos](#estructura-de-base-de-datos)
3. [API REST](#api-rest)
4. [Generación de PDFs/Excel](#generación-de-pdfsexcel)
5. [Autenticación y Autorización](#autenticación-y-autorización)
6. [Integración Frontend-Backend](#integración-frontend-backend)

---

## 1. Preparación del Entorno

### Crear Proyecto Laravel

```bash
# Instalar Laravel
composer create-project laravel/laravel hefesto-backend

cd hefesto-backend

# Instalar dependencias necesarias
composer require laravel/sanctum
composer require maatwebsite/excel
composer require barryvdh/laravel-dompdf
```

### Configurar Base de Datos

Editar `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hefesto
DB_USERNAME=root
DB_PASSWORD=tu_password
```

---

## 2. Estructura de Base de Datos

### Migración: Usuarios Administrativos

```php
// database/migrations/xxxx_create_solicitudes_administrativas_table.php

Schema::create('solicitudes_administrativas', function (Blueprint $table) {
    $table->id();
    
    // Encabezado
    $table->string('codigo_formato')->default('FOR-GDI-SIS-004');
    $table->string('version')->default('1');
    $table->date('fecha_solicitud');
    
    // Datos del solicitante
    $table->string('nombre_completo');
    $table->string('cedula')->unique();
    $table->string('cargo');
    $table->string('area_servicio');
    $table->string('telefono_extension');
    
    // Tipo de vinculación
    $table->enum('tipo_vinculacion', ['Planta', 'Agremiado', 'Contrato']);
    
    // Módulos SERVINTE (JSON)
    $table->json('modulos_administrativos')->nullable();
    $table->json('modulos_financieros')->nullable();
    
    // Permisos
    $table->json('tipo_permiso')->nullable(); // ['A', 'C', 'M', 'B']
    $table->string('perfil_de')->nullable();
    
    // Opciones Web (JSON)
    $table->json('opciones_web')->nullable();
    
    // Firmas (JSON)
    $table->json('firmas')->nullable();
    
    // Sistemas
    $table->string('login_asignado')->nullable();
    $table->string('clave_temporal')->nullable();
    
    // Estado y control
    $table->enum('estado', ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'])->default('Pendiente');
    $table->boolean('acepta_responsabilidad')->default(false);
    
    // Auditoría
    $table->foreignId('usuario_creador_id')->nullable()->constrained('users');
    $table->timestamps();
    $table->softDeletes();
});
```

### Migración: Usuarios Historia Clínica

```php
// database/migrations/xxxx_create_solicitudes_historia_clinica_table.php

Schema::create('solicitudes_historia_clinica', function (Blueprint $table) {
    $table->id();
    
    // Encabezado
    $table->string('codigo_formato')->default('FOR-GDI-SIS-003');
    $table->string('version')->default('2');
    $table->date('fecha_solicitud');
    
    // Datos del solicitante
    $table->string('nombre_completo');
    $table->string('cedula')->unique();
    $table->string('celular');
    $table->string('correo_electronico');
    $table->string('registro_codigo');
    $table->string('area_servicio');
    $table->string('especialidad');
    $table->text('observaciones')->nullable();
    
    // Perfil
    $table->enum('perfil', [
        'Médico especialista',
        'Médico residente',
        'Médico general',
        'Auditor',
        'Enfermero jefe',
        'Auxiliar de enfermería',
        'Terapeuta',
        'Otro'
    ]);
    $table->string('perfil_otro')->nullable();
    
    // Vinculación y terminal
    $table->enum('tipo_vinculacion', ['Interno', 'Externo']);
    $table->enum('terminal_asignado', ['Tablet', 'Portátil', 'Otro']);
    $table->string('terminal_otro')->nullable();
    
    // Capacitaciones (JSON)
    $table->json('capacitacion_historia_clinica');
    $table->json('capacitacion_epidemiologia')->nullable();
    
    // Aval institucional (JSON)
    $table->json('aval_institucional');
    
    // Firmas (JSON)
    $table->json('firmas')->nullable();
    
    // Sistemas
    $table->string('login_creado_por')->nullable();
    
    // Estado y control
    $table->enum('estado', ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'])->default('Pendiente');
    $table->boolean('acepta_responsabilidad')->default(false);
    
    // Auditoría
    $table->foreignId('usuario_creador_id')->nullable()->constrained('users');
    $table->timestamps();
    $table->softDeletes();
});
```

### Migración: Historial de Cambios

```php
// database/migrations/xxxx_create_historial_solicitudes_table.php

Schema::create('historial_solicitudes', function (Blueprint $table) {
    $table->id();
    $table->morphs('solicitud'); // solicitud_id, solicitud_type
    $table->enum('accion', ['Creada', 'En revisión', 'Aprobada', 'Rechazada', 'Modificada']);
    $table->text('comentario')->nullable();
    $table->foreignId('usuario_id')->constrained('users');
    $table->timestamps();
});
```

---

## 3. API REST

### Rutas API

```php
// routes/api.php

use App\Http\Controllers\Api\SolicitudAdministrativaController;
use App\Http\Controllers\Api\SolicitudHistoriaClinicaController;

Route::middleware('auth:sanctum')->group(function () {
    
    // Solicitudes Administrativas
    Route::prefix('solicitudes/administrativas')->group(function () {
        Route::get('/', [SolicitudAdministrativaController::class, 'index']);
        Route::post('/', [SolicitudAdministrativaController::class, 'store']);
        Route::get('/{id}', [SolicitudAdministrativaController::class, 'show']);
        Route::put('/{id}', [SolicitudAdministrativaController::class, 'update']);
        Route::delete('/{id}', [SolicitudAdministrativaController::class, 'destroy']);
        Route::post('/{id}/aprobar', [SolicitudAdministrativaController::class, 'aprobar']);
        Route::post('/{id}/rechazar', [SolicitudAdministrativaController::class, 'rechazar']);
        Route::get('/{id}/exportar-excel', [SolicitudAdministrativaController::class, 'exportarExcel']);
    });
    
    // Solicitudes Historia Clínica
    Route::prefix('solicitudes/historia-clinica')->group(function () {
        Route::get('/', [SolicitudHistoriaClinicaController::class, 'index']);
        Route::post('/', [SolicitudHistoriaClinicaController::class, 'store']);
        Route::get('/{id}', [SolicitudHistoriaClinicaController::class, 'show']);
        Route::put('/{id}', [SolicitudHistoriaClinicaController::class, 'update']);
        Route::delete('/{id}', [SolicitudHistoriaClinicaController::class, 'destroy']);
        Route::post('/{id}/aprobar', [SolicitudHistoriaClinicaController::class, 'aprobar']);
        Route::post('/{id}/rechazar', [SolicitudHistoriaClinicaController::class, 'rechazar']);
        Route::get('/{id}/exportar-excel', [SolicitudHistoriaClinicaController::class, 'exportarExcel']);
    });
});
```

### Controlador Ejemplo

```php
// app/Http/Controllers/Api/SolicitudAdministrativaController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudAdministrativa;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSolicitudAdministrativaRequest;

class SolicitudAdministrativaController extends Controller
{
    public function index(Request $request)
    {
        $query = SolicitudAdministrativa::query();
        
        // Filtros
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }
        
        if ($request->has('fecha_desde')) {
            $query->whereDate('fecha_solicitud', '>=', $request->fecha_desde);
        }
        
        $solicitudes = $query->with('usuarioCreador')
            ->latest()
            ->paginate(15);
            
        return response()->json($solicitudes);
    }
    
    public function store(StoreSolicitudAdministrativaRequest $request)
    {
        $solicitud = SolicitudAdministrativa::create([
            ...$request->validated(),
            'usuario_creador_id' => auth()->id(),
        ]);
        
        // Registrar en historial
        $solicitud->historial()->create([
            'accion' => 'Creada',
            'usuario_id' => auth()->id(),
        ]);
        
        return response()->json($solicitud, 201);
    }
    
    public function aprobar(Request $request, $id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        
        $solicitud->update([
            'estado' => 'Aprobado',
            'login_asignado' => $request->login_asignado,
            'clave_temporal' => bcrypt(Str::random(12)),
        ]);
        
        $solicitud->historial()->create([
            'accion' => 'Aprobada',
            'comentario' => $request->comentario,
            'usuario_id' => auth()->id(),
        ]);
        
        return response()->json($solicitud);
    }
    
    public function exportarExcel($id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        
        return Excel::download(
            new SolicitudAdministrativaExport($solicitud),
            "Solicitud_Administrativa_{$solicitud->cedula}.xlsx"
        );
    }
}
```

### Request Validation

```php
// app/Http/Requests/StoreSolicitudAdministrativaRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudAdministrativaRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nombre_completo' => 'required|string|max:255',
            'cedula' => 'required|string|unique:solicitudes_administrativas,cedula',
            'cargo' => 'required|string|max:255',
            'area_servicio' => 'required|string|max:255',
            'telefono_extension' => 'required|string|max:50',
            'tipo_vinculacion' => 'required|in:Planta,Agremiado,Contrato',
            'modulos_administrativos' => 'nullable|array',
            'modulos_financieros' => 'nullable|array',
            'tipo_permiso' => 'nullable|array',
            'tipo_permiso.*' => 'in:A,C,M,B',
            'perfil_de' => 'nullable|string|max:255',
            'opciones_web' => 'nullable|array',
            'acepta_responsabilidad' => 'required|boolean',
        ];
    }
}
```

---

## 4. Generación de PDFs/Excel

### Export Class (Excel)

```php
// app/Exports/SolicitudAdministrativaExport.php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class SolicitudAdministrativaExport implements FromView, WithEvents
{
    protected $solicitud;
    
    public function __construct($solicitud)
    {
        $this->solicitud = $solicitud;
    }
    
    public function view(): View
    {
        return view('exports.solicitud-administrativa', [
            'solicitud' => $this->solicitud
        ]);
    }
    
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                // Cargar plantilla Excel y llenar celdas
                $sheet = $event->sheet->getDelegate();
                
                // Ejemplo: llenar celdas específicas
                $sheet->setCellValue('B5', $this->solicitud->nombre_completo);
                $sheet->setCellValue('B6', $this->solicitud->cedula);
                // ... continuar con todos los campos
            },
        ];
    }
}
```

---

## 5. Autenticación y Autorización

### Sanctum Setup

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

```php
// app/Http/Kernel.php

'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### Auth Controller

```php
// app/Http/Controllers/Api/AuthController.php

public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    
    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }
    
    $user = Auth::user();
    $token = $user->createToken('auth-token')->plainTextToken;
    
    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}
```

---

## 6. Integración Frontend-Backend

### Configurar Axios en React

```typescript
// client/lib/api.ts

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
```

### Enviar Solicitud desde React

```typescript
// client/pages/Registro.tsx

import api from '@/lib/api';

const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await api.post('/solicitudes/administrativas', formDataAdmin);
        
        alert('Solicitud enviada correctamente');
        
        // Descargar Excel
        const excelResponse = await api.get(
            `/solicitudes/administrativas/${response.data.id}/exportar-excel`,
            { responseType: 'blob' }
        );
        
        const url = window.URL.createObjectURL(new Blob([excelResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `Solicitud_${formDataAdmin.cedula}.xlsx`;
        link.click();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud');
    }
};
```

---

## 📝 Checklist de Implementación

- [ ] Crear proyecto Laravel
- [ ] Configurar base de datos
- [ ] Crear migraciones y ejecutarlas
- [ ] Crear modelos Eloquent
- [ ] Implementar controladores API
- [ ] Configurar validaciones (Requests)
- [ ] Implementar autenticación Sanctum
- [ ] Crear exports para Excel
- [ ] Configurar CORS en Laravel
- [ ] Actualizar frontend para usar API
- [ ] Probar endpoints con Postman
- [ ] Implementar tests unitarios
- [ ] Documentar API (Swagger/OpenAPI)
- [ ] Configurar entorno de producción

---

## 🔒 Configurar CORS

```php
// config/cors.php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8080', 'http://localhost:3000'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 🚀 Deployment

Ver documentación de Laravel para deploy en:
- [Laravel Forge](https://forge.laravel.com/)
- [Laravel Vapor](https://vapor.laravel.com/)
- VPS con Nginx/Apache

---

¿Necesitas ayuda con alguna parte específica de la implementación?
