# 👥 Usuarios del Sistema HEFESTO

**Fecha de creación:** 06/11/2025  
**Estado:** ✅ Usuarios reales configurados

---

## 🔐 Credenciales de Acceso

### 1️⃣ **ADMINISTRADOR DEL SISTEMA**

**Usuario:** Kevin Administrador  
**Email:** `kevin@admin.com`  
**Contraseña:** `Lesli123`  
**Rol:** Técnico del Sistema  
**Permisos:** ✅ TODOS (60 permisos)

**Puede hacer:**
- Gestionar usuarios
- Asignar roles y permisos
- Ver todas las solicitudes
- Aprobar/Rechazar cualquier solicitud
- Generar reportes
- Configurar el sistema
- Crear respaldos
- Acceso total al sistema

---

### 2️⃣ **JEFE INMEDIATO**

**Usuario:** Carlos Rodríguez  
**Email:** `jefe.inmediato@hospital.com`  
**Contraseña:** `JefeInmediato2024`  
**Rol:** Administrativo - Supervisor  
**Credencial de Firma:** `JEFE2024`

**Puede hacer:**
- Ver todas las solicitudes administrativas
- Aprobar/Rechazar solicitudes
- Firmar solicitudes
- Generar reportes
- Ver usuarios
- Enviar notificaciones

---

### 3️⃣ **JEFE DE TALENTO HUMANO**

**Usuario:** María González  
**Email:** `talento.humano@hospital.com`  
**Contraseña:** `TalentoHumano2024`  
**Rol:** Administrativo - Supervisor  
**Credencial de Firma:** `TALENTO2024`

**Puede hacer:**
- Ver todas las solicitudes administrativas
- Aprobar/Rechazar solicitudes
- Firmar solicitudes
- Generar reportes
- Ver usuarios
- Enviar notificaciones

---

### 4️⃣ **GESTIÓN DE LA INFORMACIÓN (5 Usuarios)**

#### **JEFE DE GESTIÓN**
**Usuario:** Ana Martínez  
**Email:** `gestion.info1@hospital.com`  
**Contraseña:** `GestionInfo2024`  
**Rol:** Administrativo - Supervisor  
**Credencial de Firma:** `GESTION2024`

**Puede hacer:**
- Ver todas las solicitudes
- Aprobar/Rechazar solicitudes
- Firmar solicitudes
- Generar reportes
- Supervisar equipo

---

#### **EQUIPO DE GESTIÓN (4 Usuarios)**

**Usuario 1:** Luis Pérez  
**Email:** `gestion.info2@hospital.com`  
**Contraseña:** `GestionInfo2024`  
**Rol:** Administrativo - Entrada de Datos

**Usuario 2:** Carmen Díaz  
**Email:** `gestion.info3@hospital.com`  
**Contraseña:** `GestionInfo2024`  
**Rol:** Administrativo - Entrada de Datos

**Usuario 3:** Roberto Sánchez  
**Email:** `gestion.info4@hospital.com`  
**Contraseña:** `GestionInfo2024`  
**Rol:** Administrativo - Entrada de Datos

**Usuario 4:** Patricia López  
**Email:** `gestion.info5@hospital.com`  
**Contraseña:** `GestionInfo2024`  
**Rol:** Administrativo - Entrada de Datos

**Pueden hacer:**
- Crear solicitudes administrativas
- Ver sus propias solicitudes
- Editar sus propias solicitudes
- Subir archivos
- Ver notificaciones
- Exportar sus datos

---

### 5️⃣ **CAPACITADOR EN HISTORIA CLÍNICA**

**Usuario:** Dr. Jorge Ramírez  
**Email:** `capacitador.hc@hospital.com`  
**Contraseña:** `CapacitaHC2024`  
**Rol:** Médico - Consulta  
**Credencial de Firma:** `CAPACITAHC2024`

**Puede hacer:**
- Crear solicitudes de historia clínica
- Ver sus propias solicitudes
- Firmar solicitudes médicas
- Exportar sus registros
- Capacitar en historia clínica

---

### 6️⃣ **CAPACITADOR EN EPIDEMIOLOGÍA**

**Usuario:** Dra. Sandra Torres  
**Email:** `capacitador.epi@hospital.com`  
**Contraseña:** `CapacitaEPI2024`  
**Rol:** Médico - Consulta  
**Credencial de Firma:** `CAPACITAEPI2024`

**Puede hacer:**
- Crear solicitudes de historia clínica
- Ver sus propias solicitudes
- Firmar solicitudes médicas
- Exportar sus registros
- Capacitar en epidemiología

---

## 📊 Resumen de Usuarios

| # | Nombre | Email | Rol | Credencial |
|---|--------|-------|-----|------------|
| 1 | Kevin Administrador | kevin@admin.com | Admin Total | - |
| 2 | Carlos Rodríguez | jefe.inmediato@hospital.com | Supervisor | JEFE2024 |
| 3 | María González | talento.humano@hospital.com | Supervisor | TALENTO2024 |
| 4 | Ana Martínez | gestion.info1@hospital.com | Supervisor | GESTION2024 |
| 5 | Luis Pérez | gestion.info2@hospital.com | Entrada Datos | - |
| 6 | Carmen Díaz | gestion.info3@hospital.com | Entrada Datos | - |
| 7 | Roberto Sánchez | gestion.info4@hospital.com | Entrada Datos | - |
| 8 | Patricia López | gestion.info5@hospital.com | Entrada Datos | - |
| 9 | Dr. Jorge Ramírez | capacitador.hc@hospital.com | Médico | CAPACITAHC2024 |
| 10 | Dra. Sandra Torres | capacitador.epi@hospital.com | Médico | CAPACITAEPI2024 |

**Total:** 10 usuarios

---

## 🔑 Credenciales de Firma

| Cargo | Credencial | Usuario Asignado |
|-------|------------|------------------|
| Jefe inmediato | `JEFE2024` | Carlos Rodríguez |
| Jefe de Talento Humano | `TALENTO2024` | María González |
| Jefe de Gestión de la Información | `GESTION2024` | Ana Martínez |
| Capacitador de historia clínica | `CAPACITAHC2024` | Dr. Jorge Ramírez |
| Capacitador de epidemiología | `CAPACITAEPI2024` | Dra. Sandra Torres |

---

## 🎯 Roles y Permisos

### **Técnico del Sistema (Admin)**
- ✅ 60 permisos (TODOS)
- Acceso total al sistema

### **Administrativo - Supervisor**
- ✅ 20 permisos
- Ver/editar todas las solicitudes
- Aprobar/rechazar
- Generar reportes

### **Administrativo - Entrada de Datos**
- ✅ 12 permisos
- Crear/ver/editar propias solicitudes
- Subir archivos
- Exportar datos propios

### **Médico - Consulta**
- ✅ 12 permisos
- Crear/ver propias solicitudes HC
- Firmar solicitudes médicas
- Exportar registros

---

## 🚀 Cómo Inicializar el Sistema

### **Opción 1: Script Automático**
```bash
cd hefesto-backend
.\inicializar_sistema.bat
```

### **Opción 2: Manual**
```bash
php artisan db:seed --class=PermisosSeeder
php artisan db:seed --class=PermisoRoleSeeder
php artisan db:seed --class=UsuariosRealesSeeder
```

---

## 📝 Notas Importantes

1. **Datos de Prueba Eliminados:**
   - ✅ Usuarios de prueba
   - ✅ Solicitudes de prueba
   - ✅ Notificaciones de prueba
   - ✅ Actividades de prueba

2. **Contraseñas:**
   - Kevin: `Lesli123` (personalizada)
   - Otros: `[Cargo]2024` (ej: JefeInmediato2024)

3. **Credenciales de Firma:**
   - Solo usuarios con cargo de jefe/capacitador tienen credencial
   - Se usan para firmar solicitudes

4. **Primer Login:**
   - Usar email y contraseña
   - El sistema retorna token, roles y permisos
   - Guardar token para siguientes peticiones

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens con Sanctum
- ✅ Permisos verificados en cada acción
- ✅ Auditoría de todas las acciones
- ✅ Credenciales de firma encriptadas

---

## 📞 Soporte

Para cambiar contraseñas o credenciales:
1. Login como Kevin (admin)
2. Ir a gestión de usuarios
3. Editar usuario
4. Cambiar contraseña o asignar nueva credencial

---

**Sistema listo para uso en producción con usuarios reales.**
