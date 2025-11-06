# 🚀 GUÍA RÁPIDA - PROYECTO HEFESTO

**Fecha:** 6 de Noviembre, 2025  
**Versión:** 1.0

---

## 📋 Tabla de Contenidos

1. [Inicialización del Sistema](#inicialización-del-sistema)
2. [Usuarios de Prueba](#usuarios-de-prueba)
3. [Flujo de Trabajo](#flujo-de-trabajo)
4. [Endpoints Principales](#endpoints-principales)
5. [Comandos Útiles](#comandos-útiles)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Inicialización del Sistema

### Opción 1: Script Automático (Recomendado)

```bash
cd hefesto-backend
inicializar_sistema_completo.bat
```

Este script ejecuta:
- ✅ Limpieza de cache
- ✅ Migraciones frescas
- ✅ Seeders de permisos
- ✅ Seeders de usuarios
- ✅ Seeders de flujos de aprobación

### Opción 2: Manual

```bash
cd hefesto-backend

# Limpiar cache
php artisan cache:clear
php artisan config:clear

# Migraciones
php artisan migrate:fresh

# Seeders
php artisan db:seed --class=PermisosSeeder
php artisan db:seed --class=UsuariosSeeder
php artisan db:seed --class=FlujosAprobacionSeeder
```

---

## 👥 Usuarios de Prueba

### Administrador
- **Email:** kevin@admin.com
- **Password:** Lesli123
- **Permisos:** Todos (60 permisos)
- **Rol:** Administrador

### Jefe Inmediato
- **Email:** jefe.inmediato@hospital.com
- **Password:** password123
- **Credencial Firma:** JEFE2024
- **Rol:** Aprobador

### Jefe de Talento Humano
- **Email:** talento.humano@hospital.com
- **Password:** password123
- **Credencial Firma:** TALENTO2024
- **Rol:** Aprobador

### Jefe de Gestión de la Información
- **Email:** gestion.info@hospital.com
- **Password:** password123
- **Credencial Firma:** GESTION2024
- **Rol:** Aprobador

### Coordinador Financiero
- **Email:** coordinador.financiero@hospital.com
- **Password:** password123
- **Credencial Firma:** FINANZAS2024
- **Rol:** Aprobador

### Capacitadores
- **HC:** capacitador.hc@hospital.com / password123 (Credencial: CAPACITADOR_HC2024)
- **Epi:** capacitador.epi@hospital.com / password123 (Credencial: CAPACITADOR_EPI2024)

---

## 🔄 Flujo de Trabajo

### 1. Crear Solicitud

**Frontend:**
- Ir a "Registro Administrativo" o "Registro Historia Clínica"
- Llenar formulario completo
- Firmar como usuario solicitante
- Enviar solicitud

**Backend:**
- Se guarda en tabla `solicitudes_administrativas` o `solicitudes_historia_clinica`
- Estado inicial: "Pendiente"
- Firmas guardadas en campo JSON

### 2. Aprobar Solicitud

**Opción A: Control de Aprobación (Actual)**
- Ir a "Control de Aprobación"
- Buscar solicitud por cédula o nombre
- Aprobar o rechazar
- Se actualiza estado en BD

**Opción B: Flujo de Firmas (Futuro)**
- Usar endpoint `/api/flujos/firmar`
- Firmas se guardan en tabla `firmas_solicitud`
- Progreso visible en `/api/flujos/progreso/{tipo}/{id}`

### 3. Exportar a Excel

**Frontend:**
- Botón "Descargar Excel" en Control de Aprobación
- O usar endpoint directo

**Backend:**
- Preview: `/api/exportar/preview/{tipo}/{id}` (HTML)
- Descarga: `/api/exportar/{tipo}/{id}` (Excel)

---

## 🌐 Endpoints Principales

### Autenticación
```
POST /api/login
POST /api/register
POST /api/logout
GET  /api/me
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
```

### Flujo de Aprobaciones
```
GET  /api/flujos/buscar?cedula={cedula}
GET  /api/flujos/progreso/{tipo}/{id}
POST /api/flujos/firmar
POST /api/flujos/rechazar
```

### Exportación
```
GET /api/exportar/preview/administrativa/{id}
GET /api/exportar/preview/historia-clinica/{id}
GET /api/exportar/administrativa/{id}
GET /api/exportar/historia-clinica/{id}
GET /api/exportar/metadatos?tipo={tipo}&id={id}
```

### Dashboard
```
GET /api/dashboard
GET /api/dashboard/estadisticas-admin
```

### Notificaciones
```
GET  /api/notificaciones
GET  /api/notificaciones/no-leidas
PUT  /api/notificaciones/{id}/leer
POST /api/notificaciones/leer-todas
```

### Usuarios
```
GET    /api/usuarios
POST   /api/usuarios
GET    /api/usuarios/{id}
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
PUT    /api/usuarios/{id}/estado
```

---

## 🛠️ Comandos Útiles

### Verificar Estado del Sistema
```bash
cd hefesto-backend
verificar_sistema.bat
```

### Ver Rutas API
```bash
php artisan route:list --path=api
```

### Limpiar Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Ejecutar Migraciones
```bash
php artisan migrate
php artisan migrate:fresh  # ⚠️ Borra todos los datos
```

### Ejecutar Seeders Individuales
```bash
php artisan db:seed --class=PermisosSeeder
php artisan db:seed --class=UsuariosSeeder
php artisan db:seed --class=FlujosAprobacionSeeder
```

### Iniciar Servidor
```bash
# Backend
cd hefesto-backend
php artisan serve

# Frontend
cd ..
npm run dev
```

### Tinker (Consola Interactiva)
```bash
php artisan tinker

# Ejemplos:
User::count()
Permission::all()
SolicitudAdministrativa::latest()->first()
```

---

## 🔧 Solución de Problemas

### Error: "Token not found"
**Solución:**
1. Verificar que el token esté en localStorage
2. Verificar headers en axios interceptor
3. Re-login si es necesario

### Error: "CORS policy"
**Solución:**
1. Verificar `config/cors.php` en backend
2. Agregar dominio frontend a `allowed_origins`
3. Reiniciar servidor

### Error: "Class not found"
**Solución:**
```bash
composer dump-autoload
php artisan config:clear
```

### Error: "Connection refused"
**Solución:**
1. Verificar que el servidor esté corriendo
2. Verificar puerto en `.env` (default: 8000)
3. Verificar `VITE_API_URL` en frontend

### Exportaciones no funcionan
**Solución:**
1. Verificar que existan templates en `storage/app/templates/`
2. Verificar permisos de carpeta `storage/`
3. Ver logs: `storage/logs/laravel.log`

### Firmas no aparecen en Excel
**Solución:**
1. ✅ Ya corregido con fallbacks múltiples
2. Verificar que el campo JSON tenga la estructura correcta
3. Ver logs de exportación

---

## 📊 Estructura de Datos

### Solicitud Administrativa
```json
{
  "nombre_completo": "Juan Pérez",
  "cedula": "1234567890",
  "cargo": "Médico",
  "area_servicio": "Urgencias",
  "tipo_vinculacion": "Planta",
  "modulos_administrativos": {...},
  "modulos_financieros": {...},
  "opciones_web": {...},
  "firmas": {
    "firmaUsuarioSolicitante": {
      "firma": "data:image/png;base64,...",
      "usuario": "Juan Pérez",
      "fecha": "2025-11-06 12:00:00"
    }
  },
  "estado": "Pendiente"
}
```

### Solicitud Historia Clínica
```json
{
  "nombre_completo": "María García",
  "cedula": "9876543210",
  "perfil": "Médico General",
  "especialidad": "Medicina General",
  "capacitacion_historia_clinica": {
    "capacitacionRealizada": true,
    "instructor": "Dr. Carlos López",
    "fecha": "2025-01-12"
  },
  "capacitacion_epidemiologia": {...},
  "firmas": {...},
  "estado": "Pendiente"
}
```

---

## 🎯 Próximos Pasos

1. **Ejecutar seeder de flujos:**
   ```bash
   php artisan db:seed --class=FlujosAprobacionSeeder
   ```

2. **Crear solicitud de prueba:**
   - Login con usuario de prueba
   - Crear solicitud administrativa
   - Verificar que se guarde en BD

3. **Probar exportación:**
   - Exportar solicitud a Excel
   - Verificar todos los campos

4. **Probar flujo de aprobación:**
   - Aprobar solicitud desde Control
   - Verificar cambio de estado

---

## 📞 Contacto y Soporte

Para más información, consultar:
- `API_ENDPOINTS.md` - Documentación completa de API
- `SISTEMA_PERMISOS.md` - Sistema de permisos
- `USUARIOS_SISTEMA.md` - Lista de usuarios
- `TAREAS_ACTUALIZADAS.md` - Estado del proyecto

---

**Última actualización:** 6 de Noviembre, 2025 - 12:20 PM
