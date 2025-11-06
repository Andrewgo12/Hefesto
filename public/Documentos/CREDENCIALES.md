# 🔐 CREDENCIALES DEL SISTEMA HEFESTO

## 👤 USUARIOS DE PRUEBA

Todos los usuarios tienen la misma contraseña: **`password123`**

### 1. **Administrador**
- **Email:** `admin@hefesto.local`
- **Password:** `password123`
- **Rol:** Administrador
- **Permisos:** Acceso completo al sistema

### 2. **Jefe de Área**
- **Email:** `jefe@hefesto.local`
- **Password:** `password123`
- **Rol:** Jefe de Área
- **Permisos:** Aprobación de solicitudes

### 3. **Médico**
- **Email:** `medico@hefesto.local`
- **Password:** `password123`
- **Rol:** Médico
- **Permisos:** Acceso a historia clínica

### 4. **Analista**
- **Email:** `maria.garcia@hefesto.local`
- **Password:** `password123`
- **Rol:** Analista
- **Permisos:** Consulta y análisis

### 5. **Operador**
- **Email:** `juan.perez@hefesto.local`
- **Password:** `password123`
- **Rol:** Operador
- **Permisos:** Operaciones básicas

---

## 🗄️ BASE DE DATOS

### Configuración Local
- **Host:** `localhost`
- **Puerto:** `3306` (MySQL) o `5432` (PostgreSQL)
- **Base de datos:** `hefesto_db`
- **Usuario:** `root` (o según tu configuración)
- **Password:** (según tu configuración local)

---

## 🚀 URLS DEL SISTEMA

### Frontend
- **URL Local:** `http://localhost:5173`
- **Puerto:** `5173` (Vite dev server)

### Backend
- **URL Local:** `http://localhost:8000`
- **API Base:** `http://localhost:8000/api`
- **Puerto:** `8000` (Laravel)

---

## 📊 DATOS DE PRUEBA ACTUALES

### Solicitud Administrativa (ID: 1)
- **Nombre:** Dr. Carlos Andrés Martínez López
- **Cédula:** 1098765432
- **Cargo:** Jefe de Facturación
- **Login:** cmartinez
- **Clave Temporal:** Temp2025!

### Solicitud Historia Clínica (ID: 1)
- **Nombre:** Dra. Laura Beatriz Rodríguez Pérez
- **Cédula:** 1087654321
- **Especialidad:** Cardiología Intervencionista
- **Código:** RM-2025-001

---

## 🔧 COMANDOS ÚTILES

### Limpiar Base de Datos
```bash
php limpiar_bd.php
```

### Crear Datos de Prueba
```bash
php crear_datos_completos.php
```

### Ver Datos Actuales
```bash
php ver_datos_completos.php
```

### Ejecutar Seeders
```bash
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=SolicitudesSeeder
php artisan db:seed --class=ConfiguracionesSeeder
```

### Limpiar y Recrear BD
```bash
php artisan migrate:fresh --seed
```

---

## ⚠️ NOTAS DE SEGURIDAD

- **IMPORTANTE:** Estas credenciales son SOLO para desarrollo local
- **NO** usar estas contraseñas en producción
- Cambiar todas las contraseñas antes de deploy
- Usar variables de entorno para credenciales sensibles
- Implementar 2FA en producción

---

## 📝 ÚLTIMA ACTUALIZACIÓN

**Fecha:** 6 de Noviembre, 2025  
**Estado:** Desarrollo Local  
**Versión:** 1.0.0

---

**🔒 MANTENER ESTE ARCHIVO PRIVADO - NO SUBIR A GITHUB**
#
      $credenciales = [
            [
                'cargo' => 'Jefe inmediato',
                'credencial' => Hash::make('JEFE2024'),
                'descripcion' => 'Credencial para jefe inmediato',
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Talento Humano',
                'credencial' => Hash::make('TALENTO2024'),
                'descripcion' => 'Credencial para jefe de talento humano',
                'activo' => true,
            ],
            [
                'cargo' => 'Jefe de Gestión de la Información',
                'credencial' => Hash::make('GESTION2024'),
                'descripcion' => 'Credencial para jefe de gestión',
                'activo' => true,
            ],
            [
                'cargo' => 'Coordinador de Facturación o Subgerente Financiero',
                'credencial' => Hash::make('FINANZAS2024'),
                'descripcion' => 'Credencial para coordinador financiero',
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de historia clínica',
                'credencial' => Hash::make('CAPACITAHC2024'),
                'descripcion' => 'Credencial para capacitador HC',
                'activo' => true,
            ],
            [
                'cargo' => 'Capacitador de epidemiología',
                'credencial' => Hash::make('CAPACITAEPI2024'),
                'descripcion' => 'Credencial para capacitador epidemiología',
                'activo' => true,
            ],
            [
                'cargo' => 'Aval institucional',
                'credencial' => Hash::make('AVAL2024'),
                'descripcion' => 'Credencial para aval institucional',
                'activo' => true,
            ],
        ];