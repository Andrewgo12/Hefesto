# 📋 TAREAS PENDIENTES - PROYECTO HEFESTO

**Fecha de creación:** 4 de Noviembre, 2025  
**Progreso general:** 50% (Frontend 90%, Backend 10%)

---

## 🎯 ESTADO GENERAL

- [x] Frontend base implementado
- [x] Sistema de autenticación
- [x] Formularios principales
- [x] Sistema de firmas digitales
- [x] Sistema de notificaciones
- [ ] Backend completo
- [ ] Base de datos configurada
- [ ] Integración frontend-backend
- [ ] Testing implementado
- [ ] Documentación API

---

## 🔴 URGENTE - Prioridad Alta

### 1. Backend - Base de Datos
- [ ] Configurar base de datos (PostgreSQL/MySQL)
- [ ] Instalar dependencias: `pg` o `mysql2`
- [ ] Instalar ORM: `prisma` o `typeorm`
- [ ] Crear archivo de configuración de BD
- [ ] Crear modelos/schemas de datos
- [ ] Implementar migraciones
- [ ] Configurar variables de entorno para BD

#### Tablas necesarias:
- [ ] `usuarios` - Usuarios del sistema
- [ ] `roles` - Roles y permisos
- [ ] `solicitudes_administrativas` - Solicitudes admin
- [ ] `solicitudes_historia_clinica` - Solicitudes HC
- [ ] `aprobaciones` - Registro de aprobaciones
- [ ] `firmas_digitales` - Firmas almacenadas
- [ ] `credenciales_firmas` - Credenciales válidas
- [ ] `permisos` - Permisos granulares
- [ ] `parametros_sistema` - Configuración
- [ ] `logs_actividad` - Auditoría

---

### 2. Backend - Autenticación
- [ ] Instalar `jsonwebtoken`
- [ ] Instalar `bcrypt`
- [ ] Crear endpoint `/api/auth/login`
- [ ] Crear endpoint `/api/auth/register`
- [ ] Crear endpoint `/api/auth/logout`
- [ ] Crear endpoint `/api/auth/refresh`
- [ ] Implementar middleware de autenticación
- [ ] Implementar middleware de autorización
- [ ] Validar tokens JWT
- [ ] Hash de contraseñas con bcrypt

---

### 3. Backend - Endpoints de Solicitudes
- [ ] `POST /api/solicitudes/administrativa` - Crear solicitud admin
- [ ] `POST /api/solicitudes/historia-clinica` - Crear solicitud HC
- [ ] `GET /api/solicitudes` - Listar solicitudes
- [ ] `GET /api/solicitudes/:id` - Obtener solicitud específica
- [ ] `PUT /api/solicitudes/:id` - Actualizar solicitud
- [ ] `DELETE /api/solicitudes/:id` - Eliminar solicitud
- [ ] `GET /api/solicitudes/usuario/:userId` - Solicitudes por usuario

---

### 4. Backend - Endpoints de Aprobación
- [ ] `POST /api/aprobaciones/:id/aprobar` - Aprobar solicitud
- [ ] `POST /api/aprobaciones/:id/rechazar` - Rechazar solicitud
- [ ] `GET /api/aprobaciones/pendientes` - Listar pendientes
- [ ] `GET /api/aprobaciones/historial` - Historial de aprobaciones
- [ ] `POST /api/aprobaciones/:id/comentario` - Agregar comentario

---

### 5. Backend - Endpoints de Usuarios
- [ ] `GET /api/usuarios` - Listar usuarios
- [ ] `GET /api/usuarios/:id` - Obtener usuario
- [ ] `POST /api/usuarios` - Crear usuario
- [ ] `PUT /api/usuarios/:id` - Actualizar usuario
- [ ] `DELETE /api/usuarios/:id` - Eliminar usuario
- [ ] `PUT /api/usuarios/:id/permisos` - Actualizar permisos
- [ ] `PUT /api/usuarios/:id/rol` - Cambiar rol

---

### 6. Backend - Validación de Credenciales
- [ ] `POST /api/credenciales/validar` - Validar credencial de firma
- [ ] `GET /api/credenciales` - Listar credenciales activas
- [ ] `POST /api/credenciales` - Crear credencial
- [ ] `PUT /api/credenciales/:id` - Actualizar credencial
- [ ] `DELETE /api/credenciales/:id` - Eliminar credencial
- [ ] Migrar credenciales de `client/lib/credenciales.ts` a BD

---

### 7. Completar Configuracion.tsx
- [ ] Implementar `handleCreateRole()` - Crear nuevo rol
- [ ] Implementar `handleEditRole()` - Editar rol existente
- [ ] Implementar `handleDeleteRole()` - Eliminar rol
- [ ] Implementar `handleSaveRoleChanges()` - Guardar cambios
- [ ] Implementar 4 handlers de configuración de credenciales
- [ ] Implementar `handleEditParameter()` - Editar parámetro
- [ ] Implementar `handleBackupNow()` - Respaldo inmediato
- [ ] Implementar `handleScheduleBackup()` - Programar respaldo
- [ ] Implementar `handleViewBackupDetails()` - Ver detalles
- [ ] Conectar todos los handlers con API

---

## 🟡 IMPORTANTE - Prioridad Media

### 8. Mejorar Control.tsx
- [ ] Crear componente `ConfirmModal` reutilizable
- [ ] Reemplazar `confirm()` en línea 117 con modal
- [ ] Crear componente `InputModal` reutilizable
- [ ] Reemplazar `prompt()` en línea 135 con modal
- [ ] Implementar handlers de Ver/Editar usuarios
- [ ] Conectar con endpoints reales de API
- [ ] Agregar loading states en todas las operaciones

---

### 9. Conectar Formularios con Backend
- [ ] `RegistroAdministrativo.tsx` - Conectar con POST `/api/solicitudes/administrativa`
- [ ] `RegistroHistoriaClinica.tsx` - Conectar con POST `/api/solicitudes/historia-clinica`
- [ ] `Registro.tsx` - Conectar formularios rápidos con API
- [ ] Manejar respuestas de error del servidor
- [ ] Implementar retry logic para fallos de red
- [ ] Agregar validación de respuestas

---

### 10. Decidir sobre Movimientos.tsx
- [ ] Revisar diferencias entre `Configuracion.tsx` y `Movimientos.tsx`
- [ ] Decidir cuál página mantener
- [ ] Fusionar funcionalidades si es necesario
- [ ] Eliminar página redundante
- [ ] Actualizar rutas en `App.tsx`
- [ ] Actualizar navegación en `Layout.tsx`

---

### 11. Backend - Endpoints de Configuración
- [ ] `GET /api/configuracion/roles` - Listar roles
- [ ] `POST /api/configuracion/roles` - Crear rol
- [ ] `PUT /api/configuracion/roles/:id` - Actualizar rol
- [ ] `DELETE /api/configuracion/roles/:id` - Eliminar rol
- [ ] `GET /api/configuracion/parametros` - Listar parámetros
- [ ] `PUT /api/configuracion/parametros/:id` - Actualizar parámetro
- [ ] `POST /api/configuracion/respaldo` - Crear respaldo
- [ ] `GET /api/configuracion/respaldos` - Listar respaldos

---

### 12. Backend - Validación de Datos
- [ ] Instalar `express-validator`
- [ ] Crear validators para solicitudes administrativas
- [ ] Crear validators para solicitudes HC
- [ ] Crear validators para usuarios
- [ ] Crear validators para roles
- [ ] Implementar middleware de validación
- [ ] Manejar errores de validación

---

## 🟢 MEJORAS - Prioridad Baja

### 13. Validación con Zod
- [ ] Crear schema Zod para formulario administrativo
- [ ] Crear schema Zod para formulario HC
- [ ] Crear schema Zod para login
- [ ] Crear schema Zod para cambio de contraseña
- [ ] Integrar validación en formularios
- [ ] Mostrar errores de validación en UI

---

### 14. React Query para Cache
- [ ] Configurar React Query DevTools
- [ ] Crear query para solicitudes
- [ ] Crear query para usuarios
- [ ] Crear query para roles
- [ ] Crear mutations para crear/actualizar/eliminar
- [ ] Implementar invalidación de cache
- [ ] Configurar retry y stale time

---

### 15. Testing
- [ ] Configurar Jest/Vitest
- [ ] Tests unitarios para componentes
- [ ] Tests para hooks personalizados
- [ ] Tests para utilidades
- [ ] Tests de integración para formularios
- [ ] Tests E2E con Playwright
- [ ] Configurar CI/CD para tests

---

### 16. Documentación API
- [ ] Instalar Swagger/OpenAPI
- [ ] Documentar endpoints de autenticación
- [ ] Documentar endpoints de solicitudes
- [ ] Documentar endpoints de aprobación
- [ ] Documentar endpoints de usuarios
- [ ] Documentar endpoints de configuración
- [ ] Agregar ejemplos de requests/responses
- [ ] Publicar documentación

---

### 17. Limpieza de Código
- [ ] Revisar `Configuracion_BACKUP.tsx`
- [ ] Revisar `Configuracion_NEW.tsx`
- [ ] Eliminar archivos de respaldo innecesarios
- [ ] Remover `console.log()` de producción
- [ ] Remover código comentado
- [ ] Limpiar imports no utilizados
- [ ] Formatear código con Prettier

---

### 18. Optimizaciones de Performance
- [ ] Implementar `useCallback` en handlers
- [ ] Implementar `useMemo` en cálculos pesados
- [ ] Code splitting por rutas
- [ ] Lazy loading de componentes pesados
- [ ] Optimizar imágenes
- [ ] Implementar virtual scrolling en tablas grandes
- [ ] Analizar bundle size

---

### 19. Seguridad
- [ ] Implementar rate limiting
- [ ] Sanitizar inputs del usuario
- [ ] Prevenir SQL injection
- [ ] Prevenir XSS
- [ ] Implementar CORS correctamente
- [ ] Configurar CSP headers
- [ ] Implementar HTTPS en producción
- [ ] Auditoría de dependencias

---

### 20. Perfil de Usuario - Mejoras
- [ ] Hacer checkboxes de notificaciones controlados
- [ ] Implementar `handleSavePreferences()`
- [ ] Conectar con endpoint de preferencias
- [ ] Agregar validación de cambio de contraseña
- [ ] Implementar 2FA (opcional)

---

## 📊 PROGRESO POR CATEGORÍA

### Frontend
- [x] Estructura base (100%)
- [x] Autenticación UI (100%)
- [x] Formularios principales (100%)
- [x] Sistema de firmas (100%)
- [x] Notificaciones (100%)
- [ ] Configuración completa (60%)
- [ ] Modales personalizados (0%)
- [ ] Validación Zod (0%)

### Backend
- [ ] Configuración base (10%)
- [ ] Base de datos (0%)
- [ ] Autenticación (0%)
- [ ] Endpoints solicitudes (0%)
- [ ] Endpoints aprobación (0%)
- [ ] Endpoints usuarios (0%)
- [ ] Endpoints configuración (0%)
- [ ] Validación (0%)

### Testing
- [ ] Tests unitarios (0%)
- [ ] Tests integración (0%)
- [ ] Tests E2E (0%)

### Documentación
- [x] Documentación frontend (100%)
- [ ] Documentación API (0%)
- [ ] Guías de usuario (0%)

---

## 🎯 HITOS DEL PROYECTO

### Hito 1: Backend Funcional (0/7)
- [ ] Base de datos configurada
- [ ] Autenticación implementada
- [ ] Endpoints de solicitudes
- [ ] Endpoints de aprobación
- [ ] Endpoints de usuarios
- [ ] Validación de datos
- [ ] Migración de credenciales a BD

### Hito 2: Integración Completa (0/4)
- [ ] Formularios conectados a API
- [ ] Control conectado a API
- [ ] Configuración conectada a API
- [ ] Perfil conectado a API

### Hito 3: Optimización (0/5)
- [ ] Validación con Zod
- [ ] React Query implementado
- [ ] Modales personalizados
- [ ] Code splitting
- [ ] Performance optimizada

### Hito 4: Producción (0/6)
- [ ] Tests implementados
- [ ] Documentación API completa
- [ ] Seguridad auditada
- [ ] CI/CD configurado
- [ ] Monitoreo implementado
- [ ] Deploy en producción

---

## 📈 MÉTRICAS DE PROGRESO

**Total de tareas:** 150+  
**Completadas:** ~45 (30%)  
**En progreso:** 0  
**Pendientes:** ~105 (70%)

### Por Prioridad
- 🔴 **Urgente:** 7 categorías (60+ tareas)
- 🟡 **Importante:** 5 categorías (30+ tareas)
- 🟢 **Mejoras:** 8 categorías (60+ tareas)

---

## 🚀 PLAN DE ACCIÓN SUGERIDO

### Semana 1-2: Backend Base
1. Configurar base de datos
2. Implementar autenticación
3. Crear endpoints básicos de solicitudes

### Semana 3-4: Backend Completo
4. Endpoints de aprobación
5. Endpoints de usuarios
6. Endpoints de configuración
7. Validación de datos

### Semana 5-6: Integración
8. Conectar formularios
9. Conectar control
10. Completar Configuracion.tsx
11. Testing básico

### Semana 7-8: Optimización
12. Validación Zod
13. React Query
14. Modales personalizados
15. Performance

### Semana 9-10: Producción
16. Tests completos
17. Documentación API
18. Seguridad
19. Deploy

---

## 📝 NOTAS

- Marcar con `[x]` las tareas completadas
- Actualizar este archivo regularmente
- Priorizar según necesidades del proyecto
- Agregar nuevas tareas según surjan

---

**Última actualización:** 4 de Noviembre, 2025  
**Próxima revisión:** Semanal
