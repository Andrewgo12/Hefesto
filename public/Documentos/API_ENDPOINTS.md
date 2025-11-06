# 📡 API Endpoints - HEFESTO

## 🔐 Autenticación

### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "usuario@hospital.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "user": { ... },
  "roles": [ ... ],
  "permisos": [ ... ],
  "token": "...",
  "es_administrador": false,
  "es_supervisor": false,
  "es_medico": false
}
```

### Registro
```http
POST /api/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@hospital.com",
  "password": "password123",
  "password_confirmation": "password123",
  "cargo_id": 1,
  "area_id": 1
}
```

### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

### Verificar Credencial de Firma
```http
POST /api/verificar-credencial-firma
Content-Type: application/json

{
  "cargo": "Jefe inmediato",
  "credencial": "JEFE2024"
}
```

---

## 👤 Usuarios

### Listar Usuarios
```http
GET /api/usuarios?search=juan&estado=activo&per_page=15
Authorization: Bearer {token}
```

### Ver Usuario
```http
GET /api/usuarios/{id}
Authorization: Bearer {token}
```

### Crear Usuario
```http
POST /api/usuarios
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "María López",
  "email": "maria@hospital.com",
  "password": "password123",
  "rol": "usuario",
  "estado": "activo",
  "cargo_id": 2,
  "area_id": 1,
  "role_ids": [1, 2]
}
```

### Actualizar Usuario
```http
PUT /api/usuarios/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "María López García",
  "email": "maria.lopez@hospital.com",
  "role_ids": [2]
}
```

### Eliminar Usuario
```http
DELETE /api/usuarios/{id}
Authorization: Bearer {token}
```

### Cambiar Estado
```http
PUT /api/usuarios/{id}/estado
Authorization: Bearer {token}
Content-Type: application/json

{
  "estado": "inactivo"
}
```

### Cambiar Contraseña
```http
POST /api/usuarios/{id}/cambiar-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "nuevaPassword123",
  "password_confirmation": "nuevaPassword123"
}
```

### Perfil del Usuario Autenticado
```http
GET /api/perfil
Authorization: Bearer {token}
```

### Actualizar Perfil
```http
PUT /api/perfil
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nuevo Nombre",
  "email": "nuevo@email.com"
}
```

---

## 📊 Dashboard

### Estadísticas del Usuario
```http
GET /api/dashboard
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "estadisticas": {
      "solicitudes_pendientes": 5,
      "solicitudes_aprobadas": 10,
      "solicitudes_rechazadas": 2,
      "solicitudes_totales": 17,
      "notificaciones_no_leidas": 3
    },
    "actividad_reciente": [ ... ],
    "solicitudes_recientes": [ ... ]
  }
}
```

### Estadísticas de Administrador
```http
GET /api/dashboard/admin
Authorization: Bearer {token}
```

---

## 📝 Solicitudes Administrativas

### Listar Solicitudes
```http
GET /api/solicitudes/administrativas?estado=pendiente&per_page=20
Authorization: Bearer {token}
```

### Ver Solicitud
```http
GET /api/solicitudes/administrativas/{id}
Authorization: Bearer {token}
```

### Crear Solicitud
```http
POST /api/solicitudes/administrativas
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipo_solicitud": "creacion_usuario",
  "datos_personales": { ... },
  "datos_laborales": { ... },
  "capacitaciones": [ ... ],
  "firmas": [ ... ]
}
```

### Actualizar Solicitud
```http
PUT /api/solicitudes/administrativas/{id}
Authorization: Bearer {token}
```

### Eliminar Solicitud
```http
DELETE /api/solicitudes/administrativas/{id}
Authorization: Bearer {token}
```

### Aprobar Solicitud
```http
POST /api/solicitudes/administrativas/{id}/aprobar
Authorization: Bearer {token}
```

### Rechazar Solicitud
```http
POST /api/solicitudes/administrativas/{id}/rechazar
Authorization: Bearer {token}
Content-Type: application/json

{
  "motivo": "Documentación incompleta"
}
```

### Estadísticas
```http
GET /api/solicitudes/administrativas/estadisticas
Authorization: Bearer {token}
```

---

## 🏥 Solicitudes Historia Clínica

### Listar Solicitudes
```http
GET /api/solicitudes/historia-clinica
Authorization: Bearer {token}
```

### Ver Solicitud
```http
GET /api/solicitudes/historia-clinica/{id}
Authorization: Bearer {token}
```

### Crear Solicitud
```http
POST /api/solicitudes/historia-clinica
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipo_solicitud": "creacion_usuario_hc",
  "datos_personales": { ... },
  "datos_profesionales": { ... },
  "capacitaciones": [ ... ]
}
```

---

## 📁 Catálogos

### Obtener Todos los Catálogos
```http
GET /api/catalogos/todos

Response:
{
  "success": true,
  "data": {
    "areas": [ ... ],
    "cargos": [ ... ],
    "especialidades": [ ... ]
  }
}
```

### Listar Áreas
```http
GET /api/catalogos/areas
```

### Listar Cargos
```http
GET /api/catalogos/cargos?tipo=administrativo&area_id=1
```

### Listar Especialidades
```http
GET /api/catalogos/especialidades
```

### Crear Cargo
```http
POST /api/catalogos/cargos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Enfermero Jefe",
  "descripcion": "Responsable del área de enfermería",
  "tipo": "medico",
  "area_id": 2
}
```

### Actualizar Cargo
```http
PUT /api/catalogos/cargos/{id}
Authorization: Bearer {token}
```

### Crear Área
```http
POST /api/catalogos/areas
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Urgencias",
  "descripcion": "Área de atención de urgencias",
  "area_padre_id": null
}
```

### Crear Especialidad
```http
POST /api/catalogos/especialidades
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Cardiología",
  "descripcion": "Especialidad en enfermedades del corazón"
}
```

---

## 🔔 Notificaciones

### Listar Notificaciones
```http
GET /api/notificaciones?leida=false&per_page=20
Authorization: Bearer {token}
```

### Contador de No Leídas
```http
GET /api/notificaciones/no-leidas
Authorization: Bearer {token}

Response:
{
  "count": 5
}
```

### Marcar como Leída
```http
PUT /api/notificaciones/{id}/leer
Authorization: Bearer {token}
```

### Marcar Todas como Leídas
```http
POST /api/notificaciones/leer-todas
Authorization: Bearer {token}
```

### Crear Notificación
```http
POST /api/notificaciones
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 5,
  "titulo": "Nueva solicitud",
  "mensaje": "Tienes una nueva solicitud pendiente de revisión",
  "tipo": "info",
  "importante": false
}
```

### Eliminar Notificación
```http
DELETE /api/notificaciones/{id}
Authorization: Bearer {token}
```

---

## 📊 Reportes

### Listar Reportes
```http
GET /api/reportes
Authorization: Bearer {token}
```

### Generar Reporte
```http
POST /api/reportes/generar
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipo": "solicitudes",
  "fecha_inicio": "2025-01-01",
  "fecha_fin": "2025-01-31"
}

Tipos disponibles:
- solicitudes
- usuarios
- actividad
- exportaciones
```

### Exportar Reporte
```http
GET /api/reportes/{id}/exportar
Authorization: Bearer {token}
```

---

## 🔐 Permisos y Roles

### Mis Permisos
```http
GET /api/permisos/mis-permisos
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "usuario": { ... },
    "roles": [ ... ],
    "permisos": [ ... ],
    "permisos_por_modulo": { ... },
    "es_administrador": false,
    "es_supervisor": true,
    "es_medico": false
  }
}
```

### Verificar Permiso
```http
POST /api/permisos/verificar
Authorization: Bearer {token}
Content-Type: application/json

{
  "permiso": "solicitudes_administrativas.crear"
}
```

### Listar Todos los Permisos
```http
GET /api/permisos/listar
Authorization: Bearer {token}
```

### Listar Roles
```http
GET /api/permisos/roles
Authorization: Bearer {token}
```

### Asignar Rol a Usuario
```http
POST /api/permisos/asignar-rol
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 5,
  "role_id": 2
}
```

### Remover Rol de Usuario
```http
DELETE /api/permisos/remover-rol
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 5,
  "role_id": 2
}
```

---

## 📤 Exportaciones

### Exportar Solicitud Administrativa
```http
GET /api/exportar/administrativa/{id}
Authorization: Bearer {token}

Response: Archivo Excel
```

### Exportar Solicitud Historia Clínica
```http
GET /api/exportar/historia-clinica/{id}
Authorization: Bearer {token}

Response: Archivo Excel
```

### Previsualizar Administrativa
```http
GET /api/exportar/preview/administrativa/{id}
Authorization: Bearer {token}

Response: HTML
```

### Previsualizar Historia Clínica
```http
GET /api/exportar/preview/historia-clinica/{id}
Authorization: Bearer {token}

Response: HTML
```

---

## ✅ Flujo de Aprobaciones

### Buscar Solicitud
```http
GET /api/flujos/buscar?cedula=1234567890
Authorization: Bearer {token}
```

### Obtener Progreso de Firmas
```http
GET /api/flujos/progreso/{tipo}/{id}
Authorization: Bearer {token}

Tipos: administrativa | historia-clinica
```

### Firmar Paso
```http
POST /api/flujos/firmar
Authorization: Bearer {token}
Content-Type: application/json

{
  "solicitud_id": 1,
  "tipo": "administrativa",
  "paso": "jefe_inmediato",
  "credencial": "JEFE2024"
}
```

### Rechazar Paso
```http
POST /api/flujos/rechazar
Authorization: Bearer {token}
Content-Type: application/json

{
  "solicitud_id": 1,
  "tipo": "administrativa",
  "paso": "jefe_inmediato",
  "motivo": "Documentación incompleta"
}
```

---

## 🎛️ Roles (CRUD)

### Listar Roles
```http
GET /api/roles
Authorization: Bearer {token}
```

### Ver Rol
```http
GET /api/roles/{id}
Authorization: Bearer {token}
```

### Crear Rol
```http
POST /api/roles
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Supervisor de Área",
  "descripcion": "Supervisor con permisos de aprobación",
  "permisos": ["ver_solicitudes", "aprobar_solicitudes"]
}
```

### Actualizar Rol
```http
PUT /api/roles/{id}
Authorization: Bearer {token}
```

### Eliminar Rol
```http
DELETE /api/roles/{id}
Authorization: Bearer {token}
```

---

## ⚙️ Parámetros del Sistema

### Listar Parámetros
```http
GET /api/parametros
Authorization: Bearer {token}
```

### Ver Parámetro
```http
GET /api/parametros/{key}
Authorization: Bearer {token}
```

### Actualizar Parámetro
```http
PUT /api/parametros/{key}
Authorization: Bearer {token}
Content-Type: application/json

{
  "valor": "nuevo_valor"
}
```

---

## 🧪 Utilidades

### Ping (Test de Conexión)
```http
GET /api/ping

Response:
{
  "message": "pong",
  "timestamp": "2025-11-06T16:20:00.000000Z"
}
```

---

## 📌 Notas Importantes

### Headers Requeridos
```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

### Paginación
La mayoría de endpoints que retornan listas soportan paginación:
```
?page=1&per_page=20
```

### Filtros Comunes
```
?search=texto
?estado=activo|inactivo|pendiente|aprobada|rechazada
?fecha_inicio=2025-01-01
?fecha_fin=2025-01-31
```

### Códigos de Respuesta
- `200` - OK
- `201` - Created
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

**Última actualización:** 06/11/2025  
**Versión:** 1.0
