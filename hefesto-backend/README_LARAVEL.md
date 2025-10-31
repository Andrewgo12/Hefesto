# 🚀 HEFESTO Backend Laravel - Completamente Funcional

## ✅ Backend 100% Completo

### 📦 Componentes Implementados:

#### **Modelos (4)**
- ✅ `User` - Usuarios del sistema
- ✅ `SolicitudAdministrativa` - FOR-GDI-SIS-004
- ✅ `SolicitudHistoriaClinica` - FOR-GDI-SIS-003
- ✅ `HistorialSolicitud` - Auditoría polimórfica

#### **Controladores API (3)**
- ✅ `AuthController` - Login, logout, verificar credenciales
- ✅ `SolicitudAdministrativaController` - CRUD completo
- ✅ `SolicitudHistoriaClinicaController` - CRUD completo

#### **Requests (2)**
- ✅ `StoreSolicitudAdministrativaRequest` - Validación formulario admin
- ✅ `StoreSolicitudHistoriaClinicaRequest` - Validación formulario HC

#### **Resources (2)**
- ✅ `SolicitudAdministrativaResource` - Transformación de datos
- ✅ `SolicitudHistoriaClinicaResource` - Transformación de datos

#### **Servicios (1)**
- ✅ `ExcelExportService` - Exportación a Excel

#### **Migraciones (5)**
- ✅ `create_users_table`
- ✅ `create_cache_table`
- ✅ `create_jobs_table`
- ✅ `create_solicitudes_administrativas_table`
- ✅ `create_solicitudes_historia_clinica_table`
- ✅ `create_historial_solicitudes_table`

#### **Seeders (1)**
- ✅ `SolicitudesSeeder` - 6 solicitudes de prueba

---

## 🔧 Instalación

```bash
cd hefesto-backend

# Instalar dependencias
composer install

# Configurar entorno
copy .env.example .env

# Generar clave
php artisan key:generate

# Crear base de datos SQLite
type nul > database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# Cargar datos de prueba
php artisan db:seed

# Iniciar servidor
php artisan serve
```

---

## 📡 Endpoints Disponibles

### Autenticación
```
POST   /api/login                          - Iniciar sesión
POST   /api/logout                         - Cerrar sesión
GET    /api/me                             - Usuario actual
POST   /api/verificar-credencial-firma    - Verificar credencial de firma
```

### Solicitudes Administrativas
```
GET    /api/solicitudes/administrativas                    - Listar todas
POST   /api/solicitudes/administrativas                    - Crear nueva
GET    /api/solicitudes/administrativas/{id}               - Ver detalle
PUT    /api/solicitudes/administrativas/{id}               - Actualizar
DELETE /api/solicitudes/administrativas/{id}               - Eliminar
POST   /api/solicitudes/administrativas/{id}/aprobar       - Aprobar
POST   /api/solicitudes/administrativas/{id}/rechazar      - Rechazar
GET    /api/solicitudes/administrativas/estadisticas       - Estadísticas
```

### Solicitudes Historia Clínica
```
GET    /api/solicitudes/historia-clinica                   - Listar todas
POST   /api/solicitudes/historia-clinica                   - Crear nueva
GET    /api/solicitudes/historia-clinica/{id}              - Ver detalle
PUT    /api/solicitudes/historia-clinica/{id}              - Actualizar
DELETE /api/solicitudes/historia-clinica/{id}              - Eliminar
POST   /api/solicitudes/historia-clinica/{id}/aprobar      - Aprobar
POST   /api/solicitudes/historia-clinica/{id}/rechazar     - Rechazar
GET    /api/solicitudes/historia-clinica/estadisticas      - Estadísticas
```

---

## 🗄️ Estructura de Base de Datos

### Tabla: `users`
- id, name, email, password, timestamps

### Tabla: `solicitudes_administrativas`
- Datos del solicitante
- Tipo de vinculación
- Módulos SERVINTE (JSON)
- Permisos (JSON)
- Opciones Web (JSON)
- Firmas (JSON)
- Login asignado
- Estado, timestamps, soft deletes

### Tabla: `solicitudes_historia_clinica`
- Datos del solicitante
- Perfil profesional
- Vinculación y terminal
- Capacitaciones (JSON)
- Aval institucional (JSON)
- Firmas (JSON)
- Login creado por
- Estado, timestamps, soft deletes

### Tabla: `historial_solicitudes`
- Relación polimórfica
- Acción, comentario
- Usuario, timestamps

---

## 🔒 Autenticación

Usa Laravel Sanctum para tokens de API:

```php
// Login
$response = Http::post('http://localhost:8000/api/login', [
    'email' => 'admin@hefesto.local',
    'password' => 'password123'
]);

$token = $response->json('token');

// Usar token en requests
$response = Http::withToken($token)->get('/api/me');
```

---

## 📝 Uso de Validaciones

```php
// Crear solicitud administrativa
POST /api/solicitudes/administrativas
{
  "nombre_completo": "Juan Pérez",
  "cedula": "1234567890",
  "cargo": "Analista",
  "area_servicio": "Facturación",
  "telefono_extension": "555-1234",
  "tipo_vinculacion": "Planta",
  "modulos_administrativos": {
    "facturacion": true,
    "cartera": true
  },
  "acepta_responsabilidad": true
}
```

---

## 🧪 Testing

```bash
# Ejecutar tests
php artisan test

# Crear factories
php artisan make:factory SolicitudAdministrativaFactory
```

---

## 📊 Comandos Artisan Útiles

```bash
# Ver rutas
php artisan route:list

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Recrear base de datos
php artisan migrate:fresh --seed

# Generar key
php artisan key:generate
```

---

## ✅ Features Implementadas

- ✅ CRUD completo para solicitudes
- ✅ Autenticación con Sanctum
- ✅ Validación de datos (Request classes)
- ✅ Transformación de respuestas (Resources)
- ✅ Auditoría de cambios (Historial)
- ✅ Relaciones Eloquent
- ✅ Scopes para consultas
- ✅ Soft deletes
- ✅ CORS configurado
- ✅ Seeders con datos de prueba
- ✅ Servicio de exportación
- ✅ Filtros y búsqueda
- ✅ Paginación
- ✅ Estadísticas

---

## 🚀 El Backend Laravel Está COMPLETO y LISTO

**Todos los endpoints funcionan correctamente con el frontend React!**
