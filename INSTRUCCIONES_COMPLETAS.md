# 🚀 HEFESTO - Instrucciones Completas de Instalación y Uso

## ✅ Sistema 100% Funcional

### 📋 Lo que ESTÁ funcionando:

✅ **Login y Autenticación**
- Sistema de login con credenciales
- Protección de rutas
- Logout funcional
- Usuarios de prueba pre-configurados

✅ **Dashboard Principal**
- Estadísticas en tiempo real desde la API
- Gráficos de solicitudes
- Links funcionales a todas las secciones

✅ **Formularios Compactos Estilo Excel**
- Formulario Administrativo (FOR-GDI-SIS-004)
- Formulario Historia Clínica (FOR-GDI-SIS-003)
- Conectados con API Laravel
- Firmas digitales con credenciales

✅ **Sistema de Firmas Digitales**
- Firma con canvas (mouse/tableta)
- Firma de texto (teclado)
- Credenciales estáticas por cargo
- Validación de permisos

✅ **Control de Aprobaciones**
- Tabla funcional con datos reales
- Aprobar/Rechazar solicitudes
- Filtros y búsqueda
- Asignación de login

✅ **Backend Laravel Completo**
- API REST funcional
- Base de datos SQLite
- Datos de prueba (seeders)
- Autenticación Sanctum

---

## 🔧 Instalación

### 1. Requisitos Previos

- **Node.js** 18 o superior
- **PHP** 8.1 o superior
- **Composer**
- **PNPM** (recomendado) o NPM

### 2. Clonar el Repositorio

```bash
git clone https://github.com/Andrewgo12/Hefesto.git
cd Hefesto
```

### 3. Configurar Backend Laravel

```bash
cd hefesto-backend

# Instalar dependencias
composer install

# Copiar archivo de configuración
copy .env.example .env

# Generar clave de aplicación
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

El backend estará en: **http://localhost:8000**

### 4. Configurar Frontend React

```bash
# Volver a la raíz del proyecto
cd ..

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El frontend estará en: **http://localhost:8080**

---

## 👤 Usuarios de Prueba

El sistema incluye usuarios pre-configurados:

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@hefesto.local | password123 | Administrador |
| jefe@hefesto.local | password123 | Jefe de Área |
| medico@hefesto.local | password123 | Médico |

---

## 🔑 Credenciales de Firma

Para firmar documentos, usa estas credenciales según el cargo:

| Cargo | Credencial |
|-------|------------|
| Jefe inmediato | JEFE2024 |
| Jefe de Talento Humano | TALENTO2024 |
| Jefe de Gestión de la Información | GESTION2024 |
| Coordinador de Facturación | FINANZAS2024 |
| Capacitador de historia clínica | CAPACITAHC2024 |
| Capacitador de epidemiología | CAPACITAEPI2024 |
| Aval institucional | AVAL2024 |

---

## 📖 Guía de Uso

### 1. Iniciar Sesión

1. Abrir **http://localhost:8080**
2. Se redirige automáticamente a **/login**
3. Usar uno de los usuarios de prueba
4. Click en "Iniciar Sesión"

### 2. Dashboard

- Ver estadísticas de solicitudes
- Acceder a formularios
- Ver solicitudes pendientes

### 3. Crear Solicitud

#### Solicitud Administrativa:
1. Ir a **Registro → Usuario Administrativo**
2. Llenar todos los campos obligatorios:
   - Datos personales
   - Tipo de vinculación
   - Módulos SERVINTE (marcar los necesarios)
   - Permisos (A/C/M/B)
   - Opciones Web
3. Firmas (5 requeridas):
   - Cada firma requiere su credencial
   - Puede ser firma dibujada o texto
4. Aceptar declaración de responsabilidad
5. Click "Enviar Solicitud"

#### Solicitud Historia Clínica:
1. Ir a **Registro → Usuario Médico**
2. Llenar campos:
   - Datos personales
   - Perfil profesional
   - Vinculación y terminal
   - Capacitaciones
   - Aval institucional
3. Firmas (5-6 según perfil):
   - Médico general/especialista: 6 firmas
   - Otros perfiles: 5 firmas
4. Click "Enviar Solicitud"

### 4. Aprobar Solicitudes

1. Ir a **Control → Aprobación de Solicitudes**
2. Ver tabla con solicitudes
3. Filtrar por estado:
   - Pendiente
   - En revisión
   - Aprobado
   - Rechazado
4. Para aprobar:
   - Click en ✓ (check verde)
   - Ingresar login a asignar
   - Agregar comentario (opcional)
   - Click "Aprobar"
5. Para rechazar:
   - Click en ✗ (X roja)
   - Agregar motivo de rechazo
   - Click "Rechazar"

### 5. Cerrar Sesión

- Click en "Cerrar Sesión" en el menú lateral
- Redirige automáticamente a /login

---

## 🗂️ Estructura del Proyecto

```
HEFESTO/
├── client/                          # Frontend React
│   ├── components/
│   │   ├── ui/                     # Componentes shadcn/ui
│   │   ├── Layout.tsx              # Layout con sidebar
│   │   └── FirmaDigital.tsx        # Componente de firmas
│   ├── pages/
│   │   ├── Index.tsx               # Dashboard (con API)
│   │   ├── Login.tsx               # Login funcional
│   │   ├── RegistroAdministrativo.tsx  # Formulario compacto
│   │   ├── RegistroHistoriaClinica.tsx # Formulario compacto
│   │   └── ControlAprobacion.tsx   # Control funcional
│   ├── lib/
│   │   └── api.ts                  # Cliente API Laravel
│   └── App.tsx                     # Rutas protegidas
│
├── hefesto-backend/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── SolicitudAdministrativaController.php
│   │   │   └── SolicitudHistoriaClinicaController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── SolicitudAdministrativa.php
│   │       ├── SolicitudHistoriaClinica.php
│   │       └── HistorialSolicitud.php
│   ├── database/
│   │   ├── migrations/             # 3 migraciones
│   │   └── seeders/
│   │       └── SolicitudesSeeder.php  # Datos de prueba
│   └── routes/
│       └── api.php                 # Rutas API
│
└── shared/
    └── types/
        └── formularios.ts          # Interfaces TypeScript
```

---

## 🔌 Endpoints API

### Autenticación
```
POST   /api/login
POST   /api/logout
GET    /api/me
POST   /api/verificar-credencial-firma
```

### Solicitudes Administrativas
```
GET    /api/solicitudes/administrativas
POST   /api/solicitudes/administrativas
GET    /api/solicitudes/administrativas/{id}
PUT    /api/solicitudes/administrativas/{id}
DELETE /api/solicitudes/administrativas/{id}
POST   /api/solicitudes/administrativas/{id}/aprobar
POST   /api/solicitudes/administrativas/{id}/rechazar
GET    /api/solicitudes/administrativas/estadisticas
```

### Solicitudes Historia Clínica
```
GET    /api/solicitudes/historia-clinica
POST   /api/solicitudes/historia-clinica
GET    /api/solicitudes/historia-clinica/{id}
PUT    /api/solicitudes/historia-clinica/{id}
DELETE /api/solicitudes/historia-clinica/{id}
POST   /api/solicitudes/historia-clinica/{id}/aprobar
POST   /api/solicitudes/historia-clinica/{id}/rechazar
GET    /api/solicitudes/historia-clinica/estadisticas
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"
```bash
# Verificar que Laravel esté corriendo
cd hefesto-backend
php artisan serve
```

### Error: "Unauthorized"
```bash
# Limpiar localStorage y volver a hacer login
# En el navegador: localStorage.clear()
```

### Error: "Migration failed"
```bash
# Recrear base de datos
cd hefesto-backend
rm database/database.sqlite
type nul > database/database.sqlite
php artisan migrate:fresh --seed
```

### Frontend no carga
```bash
# Reinstalar dependencias
rm -rf node_modules
pnpm install
pnpm dev
```

---

## 📝 Datos de Prueba Incluidos

El seeder crea:

**3 Solicitudes Administrativas:**
- Ana María Rodríguez - Facturación (Pendiente)
- Carlos Eduardo Martínez - Contabilidad (En revisión)
- Laura Fernández - Talento Humano (Aprobado)

**3 Solicitudes Historia Clínica:**
- Dr. Juan Carlos Pérez - Cardiología (Pendiente)
- Enf. María Isabel Sánchez - Urgencias (Aprobado)
- Dr. Andrés Felipe Torres - Medicina Interna (Pendiente)

---

## ✅ TODO Funciona

- ✅ Login y autenticación
- ✅ Protección de rutas
- ✅ Dashboard con API
- ✅ Formularios compactos Excel
- ✅ Firmas digitales con credenciales
- ✅ Control de aprobaciones
- ✅ Tabla funcional con datos reales
- ✅ Aprobar/Rechazar solicitudes
- ✅ Búsqueda y filtros
- ✅ Logout funcional
- ✅ Base de datos conectada
- ✅ Backend Laravel completo
- ✅ Seeders con datos de prueba

---

## 🚀 El Sistema Está LISTO Para Usar

**¡Disfruta de HEFESTO!** 🎉
