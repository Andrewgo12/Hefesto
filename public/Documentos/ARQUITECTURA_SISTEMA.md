# 🏗️ ARQUITECTURA DEL SISTEMA HEFESTO

**Fecha:** 6 de Noviembre, 2025  
**Versión:** 1.0

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura Backend](#arquitectura-backend)
4. [Arquitectura Frontend](#arquitectura-frontend)
5. [Base de Datos](#base-de-datos)
6. [Flujo de Datos](#flujo-de-datos)
7. [Seguridad](#seguridad)
8. [Patrones de Diseño](#patrones-de-diseño)

---

## 🎯 Visión General

HEFESTO es un sistema de gestión de solicitudes de acceso a sistemas administrativos y de historia clínica para instituciones de salud. Implementa un flujo de aprobación con firmas digitales y exportación a Excel.

### Características Principales:
- ✅ Gestión de solicitudes (Administrativas y Historia Clínica)
- ✅ Sistema de firmas digitales con credenciales
- ✅ Flujo de aprobación multinivel
- ✅ Exportación a Excel con templates
- ✅ Sistema de permisos granular (60 permisos)
- ✅ Dashboard con estadísticas
- ✅ Notificaciones en tiempo real

---

## 💻 Stack Tecnológico

### Backend
- **Framework:** Laravel 10.x
- **Lenguaje:** PHP 8.2+
- **Base de Datos:** MySQL 8.0
- **Autenticación:** Laravel Sanctum (JWT)
- **Exportación:** PhpSpreadsheet
- **ORM:** Eloquent

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Estado:** Context API
- **HTTP Client:** Axios
- **UI Components:** shadcn/ui + Tailwind CSS
- **Animaciones:** Framer Motion
- **Firmas:** react-signature-canvas

### DevOps
- **Control de Versiones:** Git
- **Package Manager:** npm / Composer
- **Servidor:** Apache/Nginx + PHP-FPM

---

## 🔧 Arquitectura Backend

### Estructura de Carpetas

```
hefesto-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php
│   │   │       ├── SolicitudAdministrativaController.php
│   │   │       ├── SolicitudHistoriaClinicaController.php
│   │   │       ├── FlujoAprobacionController.php
│   │   │       ├── ExportacionController.php
│   │   │       ├── DashboardController.php
│   │   │       ├── NotificacionController.php
│   │   │       ├── UsuarioController.php
│   │   │       └── ...
│   │   ├── Middleware/
│   │   │   ├── VerificarPermiso.php
│   │   │   └── ...
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── SolicitudAdministrativa.php
│   │   ├── SolicitudHistoriaClinica.php
│   │   ├── FlujoAprobacion.php
│   │   ├── PasoAprobacion.php
│   │   ├── FirmaSolicitud.php
│   │   ├── CredencialFirma.php
│   │   └── ...
│   └── Traits/
│       └── HasPermissions.php
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── PermisosSeeder.php
│       ├── UsuariosSeeder.php
│       └── FlujosAprobacionSeeder.php
├── routes/
│   └── api.php
└── storage/
    └── app/
        └── templates/
            ├── formato_administrativo_MAPEADO.xlsx
            └── formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx
```

### Controladores Principales

#### 1. AuthController
- `POST /api/login` - Autenticación
- `POST /api/register` - Registro
- `POST /api/logout` - Cerrar sesión
- `GET /api/me` - Usuario actual
- `POST /api/verificar-credencial-firma` - Validar credencial

#### 2. SolicitudAdministrativaController
- CRUD completo de solicitudes
- Aprobar/Rechazar solicitudes
- Estadísticas

#### 3. SolicitudHistoriaClinicaController
- CRUD completo de solicitudes
- Aprobar/Rechazar solicitudes
- Estadísticas

#### 4. FlujoAprobacionController
- Buscar solicitudes
- Obtener progreso de firmas
- Firmar paso
- Rechazar paso

#### 5. ExportacionController
- Exportar a Excel (Administrativo/HC)
- Previsualizar como HTML
- Obtener metadatos

#### 6. DashboardController
- Estadísticas generales
- Estadísticas por rol
- Actividad reciente

---

## ⚛️ Arquitectura Frontend

### Estructura de Carpetas

```
client/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── FirmaDigital.tsx
│   ├── AnimatedSection.tsx
│   └── ...
├── contexts/
│   └── AppContext.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── api.ts
│   ├── animations.ts
│   ├── credenciales.ts
│   └── utils.ts
├── pages/
│   ├── Index.tsx (Dashboard)
│   ├── Login.tsx
│   ├── Registro.tsx
│   ├── RegistroAdministrativo.tsx
│   ├── RegistroHistoriaClinica.tsx
│   ├── ControlAprobacion.tsx
│   ├── Control.tsx
│   ├── Movimientos.tsx
│   └── ...
└── App.tsx
```

### Componentes Clave

#### 1. AppContext
- Gestión de estado global
- Solicitudes
- Usuarios
- Autenticación

#### 2. FirmaDigital
- Canvas de firma
- Firma de texto
- Validación de credenciales

#### 3. api.ts
- Cliente Axios configurado
- Interceptores de token
- 80 endpoints organizados

### Flujo de Autenticación

```
1. Usuario ingresa credenciales
2. POST /api/login
3. Backend valida y retorna token JWT
4. Token se guarda en localStorage
5. Interceptor agrega token a todas las peticiones
6. Si 401, redirige a login
```

---

## 🗄️ Base de Datos

### Tablas Principales

#### users
```sql
- id
- name
- email
- password
- rol
- estado
- timestamps
```

#### solicitudes_administrativas
```sql
- id
- user_id
- nombre_completo
- cedula
- cargo
- area_servicio
- tipo_vinculacion
- modulos_administrativos (JSON)
- modulos_financieros (JSON)
- opciones_web (JSON)
- firmas (JSON)
- estado
- fase_actual
- timestamps
```

#### solicitudes_historia_clinica
```sql
- id
- user_id
- nombre_completo
- cedula
- perfil
- especialidad
- capacitacion_historia_clinica (JSON)
- capacitacion_epidemiologia (JSON)
- aval_institucional (JSON)
- firmas (JSON)
- estado
- timestamps
```

#### flujos_aprobacion
```sql
- id
- nombre
- tipo_solicitud (administrativo/historia_clinica)
- descripcion
- total_pasos
- activo
- timestamps
```

#### pasos_aprobacion
```sql
- id
- flujo_id
- orden
- nombre_paso
- cargo_requerido
- credencial_firma_id
- obligatorio
- permite_rechazo
- timestamps
```

#### firmas_solicitud
```sql
- id
- solicitud_type (polimórfica)
- solicitud_id
- paso_aprobacion_id
- firmado_por
- nombre_firmante
- cargo_firmante
- credencial_usada
- estado
- observaciones
- fecha_firma
- ip_address
- timestamps
```

#### credenciales_firma
```sql
- id
- cargo
- credencial (hash)
- usuario_id
- activo
- ultimo_uso
- timestamps
```

#### permissions
```sql
- id
- name
- slug
- descripcion
- categoria
- timestamps
```

#### roles
```sql
- id
- nombre
- slug
- descripcion
- timestamps
```

#### notificaciones
```sql
- id
- user_id
- titulo
- mensaje
- tipo
- leida
- importante
- timestamps
```

### Relaciones

```
User
├── hasMany: SolicitudAdministrativa
├── hasMany: SolicitudHistoriaClinica
├── hasMany: Notificacion
├── hasOne: CredencialFirma
└── belongsToMany: Role

SolicitudAdministrativa
├── belongsTo: User
└── morphMany: FirmaSolicitud

SolicitudHistoriaClinica
├── belongsTo: User
└── morphMany: FirmaSolicitud

FlujoAprobacion
└── hasMany: PasoAprobacion

PasoAprobacion
├── belongsTo: FlujoAprobacion
├── belongsTo: CredencialFirma
└── hasMany: FirmaSolicitud

FirmaSolicitud
├── morphTo: Solicitud
├── belongsTo: PasoAprobacion
└── belongsTo: User (firmante)
```

---

## 🔄 Flujo de Datos

### Crear Solicitud

```
1. Usuario llena formulario en frontend
2. Firma digitalmente (canvas o texto)
3. POST /api/solicitudes/{tipo}
4. Backend valida datos
5. Guarda en BD con estado "Pendiente"
6. Retorna solicitud creada
7. Frontend muestra confirmación
```

### Aprobar Solicitud (Actual)

```
1. Usuario busca solicitud en Control
2. Click en "Aprobar"
3. POST /api/solicitudes/{tipo}/{id}/aprobar
4. Backend actualiza estado a "Aprobado"
5. Retorna solicitud actualizada
6. Frontend actualiza lista
```

### Aprobar con Flujo (Futuro)

```
1. Usuario busca solicitud
2. GET /api/flujos/progreso/{tipo}/{id}
3. Muestra pasos pendientes
4. Usuario ingresa credencial
5. POST /api/flujos/firmar
6. Backend valida credencial
7. Guarda firma en firmas_solicitud
8. Actualiza progreso
9. Si todos los pasos completados → Aprobado
```

### Exportar a Excel

```
1. Usuario click en "Descargar"
2. GET /api/exportar/{tipo}/{id}
3. Backend carga template Excel
4. Mapea datos de solicitud
5. Inserta firmas como imágenes
6. Genera archivo .xlsx
7. Retorna archivo para descarga
8. Frontend inicia descarga
```

---

## 🔒 Seguridad

### Autenticación
- **Método:** Laravel Sanctum (JWT)
- **Token:** Guardado en localStorage
- **Expiración:** Configurable en backend
- **Refresh:** Pendiente implementar

### Autorización
- **Sistema:** Permisos granulares (60 permisos)
- **Middleware:** VerificarPermiso
- **Trait:** HasPermissions en User
- **Roles:** 4 roles predefinidos

### Validación
- **Backend:** Form Requests de Laravel
- **Frontend:** Validación en tiempo real
- **Sanitización:** Inputs sanitizados

### Credenciales de Firma
- **Almacenamiento:** Hash con bcrypt
- **Validación:** Hash::check()
- **Auditoría:** Registro de uso

### CORS
- **Configuración:** config/cors.php
- **Orígenes:** Configurables por entorno
- **Headers:** Authorization permitido

---

## 🎨 Patrones de Diseño

### Backend

#### 1. Repository Pattern (Implícito con Eloquent)
```php
// Eloquent actúa como repository
$solicitudes = SolicitudAdministrativa::where('estado', 'Pendiente')->get();
```

#### 2. Trait Pattern
```php
// HasPermissions trait
class User extends Authenticatable
{
    use HasPermissions;
    
    public function tienePermiso($permiso) {
        // Lógica de verificación
    }
}
```

#### 3. Observer Pattern (Futuro)
```php
// Para notificaciones automáticas
class SolicitudObserver
{
    public function created(Solicitud $solicitud) {
        // Enviar notificación
    }
}
```

#### 4. Factory Pattern
```php
// Seeders usan factories
User::factory()->count(10)->create();
```

### Frontend

#### 1. Context Pattern
```typescript
// AppContext para estado global
const { solicitudes, agregarSolicitud } = useApp();
```

#### 2. Custom Hooks Pattern
```typescript
// useAuth hook
const { user, login, logout } = useAuth();
```

#### 3. Component Composition
```typescript
// Componentes reutilizables
<FirmaDigital 
  cargo="Jefe Inmediato"
  onFirmaCompleta={handleFirma}
/>
```

#### 4. Render Props Pattern
```typescript
// AnimatedSection con children
<AnimatedSection>
  <Card>...</Card>
</AnimatedSection>
```

---

## 📊 Métricas del Sistema

### Código
- **Backend:** ~15,000 líneas PHP
- **Frontend:** ~8,000 líneas TypeScript/TSX
- **Controladores:** 12 controladores API
- **Modelos:** 15 modelos Eloquent
- **Migraciones:** 20 migraciones
- **Seeders:** 3 seeders principales

### API
- **Endpoints:** 80 endpoints RESTful
- **Autenticación:** 4 endpoints
- **Solicitudes:** 16 endpoints
- **Flujos:** 4 endpoints
- **Exportación:** 5 endpoints
- **Dashboard:** 2 endpoints

### Base de Datos
- **Tablas:** 20 tablas
- **Permisos:** 60 permisos
- **Roles:** 4 roles
- **Usuarios:** 10 usuarios de prueba

---

## 🚀 Escalabilidad

### Backend
- **Cache:** Redis (futuro)
- **Queue:** Laravel Queue (futuro)
- **Storage:** S3 para archivos (futuro)
- **Load Balancer:** Nginx (producción)

### Frontend
- **Code Splitting:** Por rutas
- **Lazy Loading:** Componentes pesados
- **CDN:** Para assets estáticos
- **Service Worker:** PWA (futuro)

### Base de Datos
- **Índices:** En campos de búsqueda
- **Particionamiento:** Por fecha (futuro)
- **Réplicas:** Read replicas (producción)
- **Backup:** Automático diario

---

## 📝 Mejores Prácticas Implementadas

### Backend
✅ RESTful API design
✅ Validación de datos
✅ Manejo de errores
✅ Logging
✅ Seeders para datos iniciales
✅ Migrations versionadas
✅ Eloquent ORM
✅ Middleware de autenticación

### Frontend
✅ TypeScript para type safety
✅ Component composition
✅ Custom hooks
✅ Context API para estado
✅ Axios interceptors
✅ Error boundaries
✅ Responsive design
✅ Animaciones suaves

### General
✅ Git para control de versiones
✅ Documentación completa
✅ Scripts de automatización
✅ Separación de concerns
✅ DRY (Don't Repeat Yourself)
✅ SOLID principles

---

## 🔮 Roadmap Técnico

### Corto Plazo
- [ ] Implementar testing (Jest + PHPUnit)
- [ ] Agregar refresh token
- [ ] Implementar cache de permisos
- [ ] Optimizar queries N+1

### Mediano Plazo
- [ ] Implementar WebSockets para notificaciones
- [ ] Agregar sistema de logs avanzado
- [ ] Implementar CI/CD
- [ ] Agregar monitoring (Sentry)

### Largo Plazo
- [ ] Migrar a microservicios
- [ ] Implementar GraphQL
- [ ] PWA con offline support
- [ ] Machine Learning para análisis

---

**Última actualización:** 6 de Noviembre, 2025 - 12:30 PM
