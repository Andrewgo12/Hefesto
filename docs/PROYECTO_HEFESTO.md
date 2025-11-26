# Manual de Uso - Sistema HEFESTO

**Versión:** 1.0  
**Última Actualización:** Noviembre 2024  
**Sistema:** HEFESTO - Gestión de Solicitudes de Usuarios

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Navegación General](#navegación-general)
4. [Registro de Solicitudes](#registro-de-solicitudes)
5. [Control y Seguimiento](#control-y-seguimiento)
6. [Gestión de Usuarios](#gestión-de-usuarios)
7. [Configuración](#configuración)
8. [Perfil de Usuario](#perfil-de-usuario)
9. [Exportación de Datos](#exportación-de-datos)
10. [Notificaciones](#notificaciones)
11. [Preguntas Frecuentes](#preguntas-frecuentes)
12. [Soporte Técnico](#soporte-técnico)

---

## Introducción

### ¿Qué es HEFESTO?

**HEFESTO** es un sistema integral de gestión para el registro, seguimiento y control de solicitudes de usuarios administrativos y asistenciales en instituciones de salud. El sistema permite:

- ✅ Registro de solicitudes de usuarios administrativos con permisos específicos
- ✅ Registro de personal asistencial (médicos, enfermeras, etc.)
- ✅ Seguimiento de aprobaciones mediante flujos de firma electrónica
- ✅ Control y auditoría de todas las solicitudes
- ✅ Gestión de permisos y roles de usuario
- ✅ Reportes y exportación de datos en múltiples formatos

### Objetivos del Sistema

El sistema HEFESTO fue diseñado para:

1. **Centralizar** el proceso de solicitud de accesos y permisos
2. **Automatizar** los flujos de aprobación con firmas electrónicas
3. **Auditar** todas las acciones realizadas en el sistema
4. **Facilitar** la gestión de usuarios y permisos
5. **Optimizar** los tiempos de respuesta en aprobaciones

### Usuarios del Sistema

El sistema tiene dos tipos de usuarios principales:

#### 1. Usuarios Normales
- Pueden registrar solicitudes propias
- Ver el estado de sus solicitudes
- Hacer seguimiento a aprobaciones
- Actualizar su perfil personal
- Recibir notificaciones

#### 2. Administradores
- Acceso completo a todas las funcionalidades
- Aprobación y rechazo de solicitudes
- Gestión de usuarios del sistema
- Configuración de flujos de aprobación
- Generación de reportes
- Gestión de credenciales de firma

---

## Acceso al Sistema

### Primera vez en el sistema

#### 1. Registro de Usuario

Para registrarte en el sistema por primera vez:

**Paso 1:** Accede a la URL del sistema HEFESTO proporcionada por tu institución

**Paso 2:** En la pantalla de login, localiza y haz clic en el botón **"Registrar Nuevo Usuario"**

**Paso 3:** Completa el formulario de registro con los siguientes datos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Nombre Completo** | Tu nombre completo como aparece en documentos oficiales | Juan Pérez García |
| **Correo Electrónico** | Dirección de correo institucional | juan.perez@hospital.com |
| **Contraseña** | Mínimo 6 caracteres (se recomienda usar letras, números y símbolos) | Hosp1tal@2024 |
| **Confirmar Contraseña** | Repite exactamente la misma contraseña | Hosp1tal@2024 |

**Paso 4:** Haz clic en **"Registrar Usuario"**

**Paso 5:** El sistema te mostrará un mensaje de confirmación

> **Nota Importante:** El rol por defecto es "Usuario". Si necesitas permisos de administrador, contacta al administrador del sistema después de registrarte.

#### 2. Inicio de Sesión

Para iniciar sesión en el sistema:

**Paso 1:** Accede a la URL del sistema HEFESTO

**Paso 2:** Ingresa tus credenciales:
- **Usuario o Correo:** Puedes usar tu correo electrónico o nombre de usuario
- **Contraseña:** La contraseña que configuraste durante el registro

**Paso 3:** (Opcional) Marca la casilla **"Recordarme"** si deseas mantener tu sesión activa en este dispositivo

**Paso 4:** Haz clic en **"Iniciar Sesión"**

##### Seguridad de Contraseñas

El sistema implementa las siguientes medidas de seguridad:

- ✅ Contraseñas hasheadas con algoritmo bcrypt
- ✅ Bloqueo temporal después de 5 intentos fallidos
- ✅ Tokens de sesión con expiración automática
- ✅ Cierre de sesión automático por inactividad (30 minutos)

#### 3. Completar Perfil

Al iniciar sesión por primera vez, el sistema puede solicitarte completar tu perfil con información adicional:

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| **Nombre de usuario** | Identificador único en el sistema | Sí |
| **Teléfono** | Número de contacto (móvil o extensión) | Sí |
| **Dirección** | Dirección personal o institucional | No |
| **Cargo** | Posición o rol en la institución | No |

Esta información es necesaria para:
- Identificación en el sistema
- Contacto en caso de notificaciones
- Asociación con flujos de aprobación
- Generación de reportes

---

## Navegación General

### Menú lateral (Sidebar)

El menú lateral es tu principal herramienta de navegación. Está organizado en secciones jerárquicas:

#### Para Usuarios Normales:

##### 🏠 Inicio
- **Dashboard** con resumen de solicitudes
- Estadísticas personales
- Solicitudes recientes
- Notificaciones pendientes

##### 📝 Registro
Crear nuevas solicitudes:
- **Usuario Administrativo:** Para personal que requiere acceso a módulos administrativos
- **Usuario Asistencial:** Para personal médico y asistencial

##### 🔍 Control
Seguimiento de solicitudes:
- **Seguimiento por Fases:** Ver estado de tus solicitudes
- **Historial:** Consultar solicitudes anteriores
- **Firmas Pendientes:** Ver firmas que requieren tu aprobación

##### 👤 Perfil
Gestión de tu cuenta:
- **Información Personal:** Actualizar datos personales
- **Registro de Actividad:** Ver tu historial de acciones
- **Seguridad:** Cambiar contraseña y configurar seguridad

#### Para Administradores (solo con modo AD activado):

Además de las opciones anteriores:

##### ⚙️ Configuración
Ajustes del sistema:
- **Gestión de Llaves/Credenciales:** Administrar credenciales de firma
- **Flujos de Aprobación:** Configurar pasos de aprobación
- **Roles y Permisos:** Gestionar roles y permisos de usuarios
- **Parámetros del Sistema:** Configuraciones generales

##### 🔐 Control Avanzado
Todas las solicitudes del sistema:
- **Aprobación de Solicitudes:** Aprobar o rechazar solicitudes pendientes
- **Movimientos:** Ver todas las transacciones del sistema
- **Auditoría:** Consultar logs y registros de auditoría
- **Reportes:** Generar reportes personalizados

### Dashboard (Inicio)

El dashboard muestra información relevante según tu rol:

#### Estadísticas Generales

| Métrica | Descripción |
|---------|-------------|
| **Total de solicitudes** | Número total de solicitudes registradas |
| **Solicitudes pendientes** | Solicitudes esperando aprobación |
| **Solicitudes en revisión** | Solicitudes en proceso de aprobación |
| **Solicitudes aprobadas** | Solicitudes completadas exitosamente |
| **Solicitudes rechazadas** | Solicitudes que no fueron aprobadas |

#### Solicitudes Recientes

Lista de las últimas 10 solicitudes creadas o modificadas, mostrando:
- ID de la solicitud
- Nombre del solicitante
- Tipo de solicitud
- Estado actual
- Fecha de creación
- Acciones rápidas (Ver, Editar, Exportar)

#### Gráficos

Visualización de datos mediante:
- **Gráfico de barras:** Solicitudes por estado
- **Gráfico circular:** Distribución por tipo
- **Gráfico de líneas:** Tendencia temporal
- **Indicadores:** KPIs principales

---

## Registro de Solicitudes

### Solicitud de Usuario Administrativo

Este tipo de solicitud se usa para personal que requiere acceso a módulos administrativos o financieros del sistema institucional.

#### Paso 1: Acceder al Formulario

1. En el menú lateral, haz clic en **"Registro"**
2. Selecciona **"Usuario Administrativo"**
3. El sistema abrirá el formulario de solicitud

#### Paso 2: Información del Solicitante

Completa los datos básicos del usuario que solicita acceso:

| Campo | Descripción | Validación |
|-------|-------------|------------|
| **Nombre Completo** | Nombre completo del usuario | Requerido, mínimo 3 caracteres |
| **Cédula** | Número de identificación | Requerido, numérico, único |
| **Cargo** | Posición en la institución | Requerido |
| **Área de Servicio** | Departamento o área | Requerido |
| **Teléfono/Extensión** | Número de contacto | Requerido, formato válido |

**Ejemplo:**
```
Nombre Completo: María Fernanda López Rodríguez
Cédula: 1234567890
Cargo: Contador Principal
Área de Servicio: Departamento de Contabilidad
Teléfono/Extensión: 3001234567 / Ext. 2345
```

#### Paso 3: Tipo de Vinculación

Selecciona el tipo de contrato del usuario:

| Tipo | Descripción | Características |
|------|-------------|-----------------|
| **Planta** | Empleado de planta permanente | Contrato indefinido, prestaciones completas |
| **Agremiado** | Personal sindicalizado | Vinculación especial, beneficios sindicales |
| **Contrato** | Personal contratado temporalmente | Contrato a término fijo, prestaciones proporcionales |

#### Paso 4: Permisos y Módulos

##### Módulos Administrativos

Selecciona los módulos a los que el usuario necesita acceso:

- ☐ **Contabilidad:** Registro y consulta de movimientos contables
- ☐ **Presupuesto:** Gestión y seguimiento presupuestal
- ☐ **Tesorería:** Manejo de caja y bancos
- ☐ **Nómina:** Procesamiento de nómina y prestaciones
- ☐ **Recursos Humanos:** Gestión de personal
- ☐ **Compras:** Proceso de adquisiciones
- ☐ **Inventarios:** Control de existencias
- ☐ **Activos Fijos:** Gestión de activos
- ☐ **Costos:** Análisis y distribución de costos

##### Módulos Financieros

Si requiere acceso a módulos financieros:

- ☐ **Cartera:** Gestión de cuentas por cobrar
- ☐ **Cuentas por Pagar:** Gestión de obligaciones
- ☐ **Facturación:** Emisión y control de facturas
- ☐ **Presupuesto Financiero:** Planeación financiera
- ☐ **Flujo de Caja:** Proyecciones de tesorería
- ☐ **Indicadores Financieros:** Análisis financiero

##### Nivel de Anexos

Selecciona el nivel de acceso a anexos:

| Nivel | Descripción | Alcance |
|-------|-------------|---------|
| **N1** | Nivel básico | Consulta de anexos generales |
| **N2** | Nivel intermedio | Consulta y modificación de anexos |
| **N3** | Nivel avanzado | Acceso completo a todos los anexos |

##### Tipo de Permiso

Define qué puede hacer el usuario en los módulos seleccionados:

- ☐ **Solo consulta:** Ver información sin modificar
- ☐ **Consulta y modificación:** Ver y editar información
- ☐ **Consulta, modificación y aprobación:** Acceso completo incluyendo aprobaciones

##### Perfil de

Define el perfil base del usuario (ejemplos):
- "Contador Principal"
- "Auxiliar Contable"
- "Jefe de Recursos Humanos"
- "Auxiliar de Nómina"
- "Coordinador de Compras"

##### Opciones Web

Acceso a portales web específicos:
- ☐ Portal de Empleados
- ☐ Portal de Proveedores
- ☐ Portal de Clientes
- ☐ Intranet Institucional

#### Paso 5: Credenciales

Asigna las credenciales de acceso para el usuario:

| Campo | Descripción | Recomendaciones |
|-------|-------------|-----------------|
| **Login Asignado** | Nombre de usuario para el sistema | Usar formato: nombre.apellido o iniciales |
| **Clave Temporal** | Contraseña inicial | Mínimo 8 caracteres, el usuario deberá cambiarla al primer ingreso |

**Ejemplo:**
```
Login Asignado: maria.lopez
Clave Temporal: Temp2024!
```

> **Nota de Seguridad:** El usuario recibirá un correo con instrucciones para cambiar la contraseña temporal en el primer inicio de sesión.

#### Paso 6: Firmas Electrónicas

El sistema requerirá firmas de aprobación según el flujo configurado:

##### Firmas Requeridas (Típicamente):

1. **Usuario Solicitante**
   - Firma del usuario que solicita el acceso
   - Acepta responsabilidad por el uso del sistema

2. **Jefe Inmediato**
   - Aprueba la necesidad del acceso
   - Valida el cargo y área del solicitante

3. **Jefe de Talento Humano**
   - Verifica la vinculación del usuario
   - Confirma la vigencia del contrato

4. **Jefe de Gestión de la Información**
   - Aprueba los permisos solicitados
   - Valida la seguridad de la información

5. **Coordinador de Facturación** (si aplica)
   - Requerido para módulos financieros
   - Aprueba acceso a facturación

6. **Subgerente Financiero** (si aplica)
   - Requerido para permisos de alto nivel
   - Aprobación final para módulos críticos

##### Captura de Firmas

Puedes:
- ✅ Capturar las firmas directamente en el formulario usando el pad de firma
- ✅ Dejar pendientes para capturar después
- ✅ Solicitar firmas por correo electrónico
- ✅ Usar firmas pre-configuradas (si tienes credenciales)

#### Paso 7: Aceptación de Responsabilidad

Marca la casilla de aceptación de responsabilidad después de leer los términos:

**Términos de Responsabilidad:**
- Uso adecuado de los sistemas asignados
- Confidencialidad de la información
- Cumplimiento de políticas institucionales
- Responsabilidad por acciones realizadas
- Reporte de incidentes de seguridad

#### Paso 8: Enviar Solicitud

Haz clic en **"Guardar Solicitud"**. El sistema:

1. ✅ Validará todos los campos obligatorios
2. ✅ Generará un ID único para la solicitud
3. ✅ Registrará la fecha y hora de creación
4. ✅ Asociará tu usuario como creador
5. ✅ Iniciará el flujo de aprobación configurado
6. ✅ Enviará notificaciones a los aprobadores
7. ✅ Mostrará un mensaje de confirmación con el ID de la solicitud

**Mensaje de Confirmación:**
```
✓ Solicitud creada exitosamente
ID: SA-2024-00123
Estado: Pendiente
Siguiente paso: Aprobación de Jefe Inmediato
```

---

### Solicitud de Usuario Asistencial

Para personal asistencial (médicos, enfermeras, personal clínico) que requiere acceso al sistema de Historia Clínica Electrónica.

#### Paso 1: Acceder al Formulario

1. En el menú lateral, haz clic en **"Registro"**
2. Selecciona **"Usuario Asistencial"**
3. El sistema abrirá el formulario específico para personal asistencial

#### Paso 2: Información del Solicitante

Completa los datos del profesional de salud:

| Campo | Descripción | Validación |
|-------|-------------|------------|
| **Nombre Completo** | Nombre completo del profesional | Requerido |
| **Cédula** | Número de identificación | Requerido, único |
| **Registro/Código** | Registro médico o código profesional | Requerido, formato: RM-YYYY-NNN |
| **Especialidad** | Especialidad médica o profesional | Requerido |
| **Correo Electrónico** | Email institucional | Requerido, formato válido |
| **Celular** | Número de contacto móvil | Requerido |
| **Área de Servicio** | Servicio donde laborará | Requerido |

**Ejemplo:**
```
Nombre Completo: Dr. Carlos Alberto Martínez Gómez
Cédula: 9876543210
Registro/Código: RM-2024-001
Especialidad: Medicina Interna
Correo Electrónico: carlos.martinez@hospital.com
Celular: 3209876543
Área de Servicio: Hospitalización - Piso 3
```

##### Especialidades Comunes:

- Medicina Interna
- Cirugía General
- Pediatría
- Ginecología y Obstetricia
- Anestesiología
- Radiología
- Patología
- Medicina de Urgencias
- Enfermería
- Terapia Respiratoria
- Fisioterapia
- Nutrición y Dietética

#### Paso 3: Tipo de Vinculación

Similar a solicitudes administrativas:

| Tipo | Descripción |
|------|-------------|
| **Planta** | Personal de planta permanente |
| **Contrato** | Personal contratado por prestación de servicios |
| **Otro** | Otras modalidades (especificar) |

#### Paso 4: Capacitación

**Capacitación en Historia Clínica:**

Indica si el usuario ha recibido capacitación en el uso del sistema de historia clínica electrónica:

- ☐ **Sí, ha recibido capacitación completa**
  - Fecha de capacitación: ___________
  - Instructor: ___________
  - Duración: ___________ horas

- ☐ **No, requiere capacitación**
  - Se programará capacitación antes de activar el acceso

> **Importante:** La capacitación es obligatoria antes de otorgar acceso al sistema de Historia Clínica Electrónica.

#### Paso 5: Recursos Solicitados

Selecciona los recursos que requiere el usuario:

- ☐ **Terminal de consulta** (Cantidad: ___)
- ☐ **Tablet para rondas** (Cantidad: ___)
- ☐ **Acceso móvil** (Smartphone institucional)
- ☐ **Lector de código de barras**
- ☐ **Impresora de etiquetas**

#### Paso 6: Aceptación de Responsabilidad

Marca la casilla después de leer y aceptar:

**Términos Específicos para Personal Asistencial:**
- Confidencialidad de información médica (HIPAA)
- Uso ético de la historia clínica
- Registro oportuno de atenciones
- Responsabilidad profesional
- Cumplimiento de protocolos institucionales

#### Paso 7: Enviar

Haz clic en **"Guardar Solicitud"**.

El sistema iniciará el flujo de aprobación correspondiente para solicitudes asistenciales, que típicamente incluye:

1. Jefe de Servicio
2. Coordinación de Enfermería (si aplica)
3. Jefe de Gestión de la Información
4. Comité de Historias Clínicas

---

## Control y Seguimiento

### Seguimiento por Fases

Esta vista te permite ver el estado de tus solicitudes y las de tu área (si tienes permisos).

#### Acceso a la Vista

1. En el menú lateral, haz clic en **"Control"**
2. Selecciona **"Seguimiento por Fases"**

#### Filtros Disponibles

##### Por Estado:

| Estado | Descripción | Color |
|--------|-------------|-------|
| **Pendientes** | Solicitudes creadas, esperando revisión | 🟡 Amarillo |
| **En revisión** | En proceso de aprobación | 🔵 Azul |
| **Aprobadas** | Solicitudes aprobadas completamente | 🟢 Verde |
| **Rechazadas** | Solicitudes que no fueron aprobadas | 🔴 Rojo |

##### Por Fecha:

Filtra solicitudes por rango de fechas:
- **Fecha desde:** Selecciona fecha inicial
- **Fecha hasta:** Selecciona fecha final
- **Presets rápidos:**
  - Hoy
  - Última semana
  - Último mes
  - Último trimestre
  - Año actual

##### Por Búsqueda:

Busca por múltiples criterios:
- Nombre del solicitante
- Número de cédula
- Cargo
- Área de servicio
- ID de solicitud
- Correo electrónico

**Ejemplo de búsqueda:**
```
Búsqueda: "contador"
Resultados: Todas las solicitudes que contengan "contador" en cualquier campo
```

#### Información de cada solicitud

Cada solicitud muestra:

| Campo | Descripción |
|-------|-------------|
| **ID** | Identificador único (ej: SA-2024-00123) |
| **Solicitante** | Nombre completo del usuario |
| **Tipo** | Administrativa o Asistencial |
| **Estado** | Estado actual de la solicitud |
| **Fase** | Fase del flujo de aprobación |
| **Firmas** | Firmas completadas vs firmas requeridas (ej: 3/5) |
| **Fecha** | Fecha de creación |
| **Última actualización** | Fecha de última modificación |

#### Acciones disponibles

Para cada solicitud puedes:

##### 👁️ Ver Detalle
- Click en la solicitud para ver toda la información
- Muestra todos los campos del formulario
- Historial completo de cambios
- Firmas registradas
- Comentarios y observaciones

##### ✏️ Editar
- Disponible solo si tienes permisos
- Solo para solicitudes en estado "Pendiente"
- Permite modificar datos antes de aprobación
- Registra quién y cuándo modificó

##### 📝 Ver Firmas
- Ver el historial de firmas electrónicas
- Muestra quién firmó y cuándo
- Permite ver la imagen de la firma
- Muestra comentarios de cada firmante

##### 📊 Exportar
- Descargar datos en formato Excel
- Generar PDF de la solicitud
- Incluye todas las firmas
- Formato institucional oficial

### Vista de Aprobación (Solo Administradores)

Los administradores pueden gestionar todas las solicitudes pendientes:

#### Funcionalidades

1. **Ver todas las solicitudes pendientes de aprobación**
   - Lista completa de solicitudes en espera
   - Ordenadas por fecha de creación
   - Filtros avanzados

2. **Aprobar o rechazar solicitudes**
   - Botones de acción rápida
   - Aprobación masiva (múltiples solicitudes)
   - Rechazo con motivo obligatorio

3. **Agregar comentarios u observaciones**
   - Campo de texto para comentarios
   - Historial de comentarios
   - Notificación al solicitante

4. **Ver el historial completo de cambios**
   - Quién creó la solicitud
   - Quién la modificó
   - Todas las aprobaciones/rechazos
   - Cambios de estado

#### Proceso de Aprobación/Rechazo

**Para aprobar:**

1. Haz clic en la solicitud
2. Revisa cuidadosamente la información
3. Verifica que cumple con los requisitos
4. Haz clic en **"Aprobar"**
5. (Opcional) Agrega un comentario
6. Confirma la acción

**Para rechazar:**

1. Haz clic en la solicitud
2. Identifica el motivo del rechazo
3. Haz clic en **"Rechazar"**
4. **Agrega un comentario explicando el motivo** (obligatorio)
5. Confirma la acción

> **Buena Práctica:** Siempre agrega comentarios explicativos, especialmente al rechazar solicitudes. Esto ayuda al solicitante a entender y corregir.

---

## Gestión de Usuarios

### Crear Nuevo Usuario (Administradores)

Los administradores pueden crear usuarios directamente sin pasar por el formulario de registro público.

#### Proceso de Creación

**Paso 1:** Acceder al módulo
- Ve a **Configuración → Usuarios**
- O usa el botón **"Registrar Nuevo Usuario"** en login (con permisos de admin)

**Paso 2:** Completar el formulario

| Campo | Descripción | Requerido |
|-------|-------------|-----------|
| **Nombre completo** | Nombre del usuario | Sí |
| **Email** | Correo electrónico único | Sí |
| **Username** | Nombre de usuario único | No |
| **Contraseña** | Contraseña inicial | Sí |
| **Rol** | Usuario o Administrador | Sí |
| **Estado** | Activo/Inactivo | Sí |
| **Teléfono** | Número de contacto | No |
| **Cargo** | Posición en la institución | No |

**Paso 3:** Guardar los cambios

El sistema:
- Validará que el email sea único
- Hasheará la contraseña
- Enviará email de bienvenida (opcional)
- Registrará la acción en auditoría

### Modificar Usuario

**Paso 1:** Ve a **Configuración → Usuarios**

**Paso 2:** Busca el usuario en la lista usando:
- Barra de búsqueda
- Filtros por rol
- Filtros por estado
- Ordenamiento por columnas

**Paso 3:** Haz clic en el ícono de edición (✏️)

**Paso 4:** Modifica los campos necesarios:
- Información personal
- Rol y permisos
- Estado
- Configuraciones

**Paso 5:** Guarda los cambios

> **Nota:** Los cambios en roles y permisos se aplican inmediatamente. El usuario deberá cerrar sesión y volver a iniciar para ver los cambios.

### Desactivar/Activar Usuario

**Para desactivar:**

1. En la lista de usuarios, localiza el usuario
2. Haz clic en el toggle de estado (cambiará de verde a rojo)
3. Confirma la acción en el diálogo
4. El usuario desactivado no podrá iniciar sesión

**Para reactivar:**

1. Filtra por usuarios inactivos
2. Localiza el usuario
3. Haz clic en el toggle de estado
4. Confirma la reactivación
5. El usuario podrá iniciar sesión nuevamente

> **Importante:** Desactivar un usuario no elimina sus datos ni su historial. Solo impide el acceso al sistema.

### Cambiar Contraseña de Usuario

**Como Administrador:**

1. Ve al perfil del usuario
2. Haz clic en **"Cambiar Contraseña"**
3. Ingresa la nueva contraseña temporal
4. Confirma
5. **Notifica al usuario de su nueva contraseña** (por email o llamada)
6. Marca la opción "Requerir cambio en próximo inicio de sesión"

**Como Usuario (cambio propio):**

1. Ve a **Perfil → Seguridad**
2. Haz clic en **"Cambiar Contraseña"**
3. Ingresa contraseña actual
4. Ingresa nueva contraseña
5. Confirma nueva contraseña
6. Guarda cambios

---

## Configuración

### Gestión de Llaves/Credenciales de Firma

Esta sección permite gestionar las credenciales utilizadas para firmas electrónicas en el sistema.

#### ¿Qué son las Credenciales de Firma?

Las credenciales de firma son identificadores únicos asociados a cargos o usuarios específicos que tienen autoridad para aprobar solicitudes mediante firma electrónica.

#### Crear Credencial

**Paso 1:** Ve a **Configuración → Llaves**

**Paso 2:** Haz clic en **"Nueva Credencial"**

**Paso 3:** Completa el formulario:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Cargo Asociado** | Cargo que puede usar esta credencial | Jefe de RRHH |
| **Código/Credencial** | Código único identificador | RRHH-001 |
| **Usuario Asignado** | Usuario específico (opcional) | maria.lopez |
| **Tipo de Firma** | Imagen, Texto o Simple | Imagen Base64 |
| **Estado** | Activa/Inactiva | Activa |

**Paso 4:** Guarda la credencial

#### Tipos de Firma

##### 1. Imagen Base64
- Firma manuscrita capturada desde canvas
- Se almacena como imagen PNG en base64
- Recomendado para mayor autenticidad
- Tamaño máximo: 500KB

##### 2. Texto Firma
- Renderiza el nombre con estilo cursivo
- Formato: `FIRMA_TEXTO:Nombre Completo`
- Útil cuando no se tiene firma manuscrita
- Incluye metadatos de fecha/hora

##### 3. Texto Simple
- Solo texto plano con nombre
- Incluye fecha y hora de firma
- Menos formal pero válido
- Útil para aprobaciones internas

#### Editar Credencial

1. Busca la credencial en la lista
2. Haz clic en el ícono de edición
3. Modifica los campos necesarios
4. Guarda cambios

> **Advertencia:** Modificar una credencial afecta todas las solicitudes futuras que la usen.

#### Historial de Uso

Cada credencial muestra estadísticas de uso:

| Métrica | Descripción |
|---------|-------------|
| **Fecha de creación** | Cuándo se creó la credencial |
| **Última vez usada** | Última firma realizada |
| **Cantidad de veces utilizada** | Total de firmas |
| **Solicitudes firmadas** | Lista de solicitudes |
| **Usuario actual** | Quién la está usando |

### Flujos de Aprobación

Define los pasos necesarios para aprobar cada tipo de solicitud.

#### ¿Qué es un Flujo de Aprobación?

Un flujo de aprobación es una secuencia ordenada de pasos que una solicitud debe completar para ser aprobada. Cada paso requiere la firma de un cargo específico.

#### Configurar Flujo

**Paso 1:** Ve a **Configuración → Flujos de Aprobación**

**Paso 2:** Selecciona el tipo de solicitud:
- Administrativa
- Asistencial (Historia Clínica)

**Paso 3:** Define los pasos del flujo:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Nombre del paso** | Descripción del paso | Aprobación Jefe Inmediato |
| **Cargo requerido** | Cargo que debe firmar | Jefe de Área |
| **Orden** | Posición en la secuencia | 1, 2, 3... |
| **Obligatorio** | Si es requerido u opcional | Sí/No |
| **Tiempo máximo** | Días para completar | 3 días |

**Paso 4:** Guarda el flujo

#### Ejemplo de Flujo Administrativo

```
Flujo: Solicitud Usuario Administrativo

Paso 1: Registro Inicial
- Usuario: Solicitante
- Acción: Crear solicitud
- Obligatorio: Sí

Paso 2: Aprobación Jefe Inmediato
- Cargo: Jefe de Área
- Tiempo: 2 días
- Obligatorio: Sí

Paso 3: Validación RRHH
- Cargo: Jefe de Talento Humano
- Tiempo: 3 días
- Obligatorio: Sí

Paso 4: Aprobación TI
- Cargo: Jefe de Gestión de la Información
- Tiempo: 2 días
- Obligatorio: Sí

Paso 5: Aprobación Final
- Cargo: Subgerente Administrativo
- Tiempo: 1 día
- Obligatorio: No (solo para permisos críticos)
```

---

## Perfil de Usuario

### Información Personal

Actualiza tus datos personales en el sistema.

#### Datos Editables

| Campo | Descripción | Editable |
|-------|-------------|----------|
| **Nombre** | Nombre completo | Sí |
| **Email** | Correo electrónico | Sí (requiere verificación) |
| **Username** | Nombre de usuario | No (contactar admin) |
| **Teléfono** | Número de contacto | Sí |
| **Dirección** | Dirección personal | Sí |
| **Cargo** | Posición actual | Sí |
| **Foto de perfil** | Imagen de perfil | Sí |

#### Proceso de Modificación

1. Ve a **Perfil → Información Personal**
2. Click en **"Editar"**
3. Modifica los campos deseados
4. Guarda cambios
5. Verifica el email de confirmación (si cambiaste email)

### Cambiar Contraseña

Actualiza tu contraseña periódicamente por seguridad.

#### Requisitos de Contraseña

- ✅ Mínimo 6 caracteres (recomendado 8+)
- ✅ Al menos una letra mayúscula
- ✅ Al menos una letra minúscula
- ✅ Al menos un número
- ✅ Al menos un carácter especial (@, #, $, etc.)
- ❌ No usar contraseñas anteriores
- ❌ No usar datos personales obvios

#### Proceso

1. Ve a **Perfil → Seguridad**
2. Haz clic en **"Cambiar Contraseña"**
3. Ingresa:
   - Contraseña actual
   - Nueva contraseña
   - Confirmar nueva contraseña
4. Click en **"Actualizar Contraseña"**
5. Recibirás confirmación por email

> **Recomendación:** Cambia tu contraseña cada 90 días y nunca la compartas con nadie.

### Registro de Actividad

Consulta tu historial de acciones en el sistema.

#### Tipos de Actividad Registrada

| Tipo | Descripción |
|------|-------------|
| **Inicio de sesión** | Cada vez que inicias sesión (con IP y dispositivo) |
| **Solicitudes creadas** | Solicitudes que has registrado |
| **Solicitudes modificadas** | Cambios realizados a solicitudes |
| **Firmas realizadas** | Aprobaciones que has dado |
| **Cambios de configuración** | Modificaciones a tu perfil |
| **Exportaciones** | Reportes y datos exportados |
| **Accesos denegados** | Intentos de acceso sin permisos |

#### Consultar Actividad

1. Ve a **Perfil → Registro de Actividad**
2. Usa los filtros:
   - Por fecha
   - Por tipo de actividad
   - Por resultado (exitoso/fallido)
3. Exporta el reporte si es necesario

---

## Exportación de Datos

### Formatos Disponibles

El sistema permite exportar datos en múltiples formatos:

#### 1. Excel (.xlsx)
- Formato completo con todas las columnas
- Incluye formato y estilos
- Firmas embebidas como imágenes
- Ideal para análisis y reportes

#### 2. PDF
- Formato oficial institucional
- Incluye firmas y sellos
- No editable
- Ideal para archivo y presentación

#### 3. CSV
- Formato de texto plano
- Compatible con cualquier sistema
- Sin formato ni imágenes
- Ideal para importación a otros sistemas

### Exportar Solicitudes

**Paso 1:** Ve a la vista de solicitudes

**Paso 2:** Aplica los filtros deseados

**Paso 3:** Haz clic en **"Exportar"**

**Paso 4:** Selecciona el formato:
- Excel completo
- PDF individual
- CSV para múltiples registros

**Paso 5:** El archivo se descargará automáticamente

### Exportar Reportes

Los administradores pueden generar reportes personalizados:

1. Ve a **Control Avanzado → Reportes**
2. Selecciona el tipo de reporte:
   - Solicitudes por estado
   - Solicitudes por área
   - Tiempos de aprobación
   - Usuarios activos
   - Firmas pendientes
3. Configura parámetros:
   - Rango de fechas
   - Filtros específicos
   - Campos a incluir
4. Genera el reporte
5. Descarga en el formato deseado

---

## Notificaciones

### Tipos de Notificaciones

El sistema envía notificaciones automáticas para:

| Evento | Destinatario | Canal |
|--------|--------------|-------|
| **Solicitud creada** | Aprobadores | Email + Sistema |
| **Solicitud aprobada** | Solicitante | Email + Sistema |
| **Solicitud rechazada** | Solicitante | Email + Sistema |
| **Firma pendiente** | Aprobador | Email + Sistema |
| **Solicitud modificada** | Todos los involucrados | Sistema |
| **Contraseña cambiada** | Usuario | Email |
| **Inicio de sesión nuevo** | Usuario | Email |

### Configurar Notificaciones

1. Ve a **Perfil → Configuración**
2. Sección **"Notificaciones"**
3. Activa/desactiva según preferencia:
   - ☐ Notificaciones por email
   - ☐ Notificaciones en el sistema
   - ☐ Resumen diario
   - ☐ Alertas urgentes
4. Guarda cambios

### Ver Notificaciones

**En el sistema:**
- Ícono de campana en la barra superior
- Número indica notificaciones no leídas
- Click para ver lista completa
- Marcar como leída/no leída

**Por email:**
- Revisa tu bandeja de entrada
- Busca emails de: noreply@hefesto.local
- No responder a estos emails

---

## Guía Completa de Vistas del Sistema

Esta sección documenta exhaustivamente todas las vistas disponibles en el sistema HEFESTO, tanto para usuarios normales como para administradores.

### Vistas de Usuario Normal

#### 1. Vista: Dashboard / Inicio

**Ruta:** `/` o `/dashboard`  
**Acceso:** Todos los usuarios autenticados  
**Componente:** `Index.tsx`

##### Descripción
Panel principal que muestra un resumen de la actividad del usuario en el sistema.

##### Elementos de la Vista

**Tarjetas de Estadísticas:**
| Tarjeta | Información | Acción |
|---------|-------------|--------|
| **Mis Solicitudes** | Total de solicitudes creadas | Click para ver listado |
| **Pendientes** | Solicitudes en espera de aprobación | Click para filtrar |
| **En Revisión** | Solicitudes en proceso | Click para ver detalles |
| **Aprobadas** | Solicitudes completadas | Click para exportar |

**Solicitudes Recientes:**
- Lista de las últimas 5 solicitudes
- Muestra: ID, Tipo, Estado, Fecha
- Acciones rápidas: Ver, Editar (si aplica)

**Gráficos:**
- Gráfico de barras: Solicitudes por mes
- Gráfico circular: Distribución por tipo
- Línea de tiempo: Progreso de aprobaciones

**Notificaciones:**
- Panel lateral con últimas notificaciones
- Indicador de firmas pendientes
- Alertas de solicitudes rechazadas

##### Funcionalidades
- ✅ Ver resumen de actividad personal
- ✅ Acceso rápido a solicitudes recientes
- ✅ Notificaciones en tiempo real
- ✅ Navegación rápida a otras secciones

---

#### 2. Vista: Registro de Usuario Administrativo

**Ruta:** `/registro/administrativo`  
**Acceso:** Usuarios autenticados  
**Componente:** `RegistroAdministrativo.tsx`

##### Descripción
Formulario completo para registrar solicitudes de usuarios administrativos.

##### Secciones del Formulario

**Sección 1: Información Personal**
```
Campos:
- Nombre Completo (text, required)
- Cédula (number, required, unique)
- Cargo (text, required)
- Área de Servicio (select, required)
- Teléfono/Extensión (text, required)
- Tipo de Vinculación (radio: Planta/Agremiado/Contrato)
```

**Sección 2: Permisos y Módulos**
```
Módulos Administrativos (checkboxes):
☐ Contabilidad
☐ Presupuesto
☐ Tesorería
☐ Nómina
☐ Recursos Humanos
☐ Compras
☐ Inventarios
☐ Activos Fijos

Módulos Financieros (checkboxes):
☐ Cartera
☐ Cuentas por Pagar
☐ Facturación
☐ Presupuesto Financiero

Nivel de Anexos (select):
- N1: Básico
- N2: Intermedio
- N3: Avanzado

Tipo de Permiso (checkboxes):
☐ Solo consulta
☐ Consulta y modificación
☐ Consulta, modificación y aprobación
```

**Sección 3: Credenciales**
```
- Login Asignado (text, required)
- Clave Temporal (password, required)
- Perfil de (text)
- Opciones Web (checkboxes)
```

**Sección 4: Firmas Electrónicas**
```
Firmas Requeridas:
1. Usuario Solicitante
2. Jefe Inmediato
3. Jefe de Talento Humano
4. Jefe de Gestión de la Información
5. Coordinador de Facturación (condicional)
6. Subgerente Financiero (condicional)

Para cada firma:
- Pad de firma digital (canvas)
- Opción de firma pre-configurada
- Campo de observaciones
- Fecha y hora automática
```

**Sección 5: Aceptación**
```
☐ Acepto la responsabilidad por el uso de los sistemas asignados
☐ He leído y acepto las políticas institucionales
```

##### Validaciones
- Cédula única en el sistema
- Email válido y único
- Contraseña temporal mínimo 6 caracteres
- Al menos un módulo seleccionado
- Firma del solicitante obligatoria

##### Botones de Acción
- **Guardar Borrador:** Guarda sin enviar
- **Guardar y Enviar:** Envía a aprobación
- **Cancelar:** Limpia el formulario
- **Vista Previa:** Muestra cómo se verá el documento final

---

#### 3. Vista: Registro de Usuario Asistencial

**Ruta:** `/registro/historia-clinica`  
**Acceso:** Usuarios autenticados  
**Componente:** `RegistroHistoriaClinica.tsx`

##### Descripción
Formulario especializado para registro de personal asistencial (médicos, enfermeras, etc.).

##### Secciones del Formulario

**Sección 1: Datos del Profesional**
```
- Nombre Completo (text, required)
- Cédula (number, required, unique)
- Registro/Código Profesional (text, required, formato: RM-YYYY-NNN)
- Especialidad (select, required)
  * Medicina Interna
  * Cirugía General
  * Pediatría
  * Ginecología
  * Anestesiología
  * Enfermería
  * Terapia Respiratoria
  * Fisioterapia
  * Nutrición
  * Otro (especificar)
- Correo Electrónico (email, required)
- Celular (text, required, 10 dígitos)
- Área de Servicio (select, required)
  * Urgencias
  * UCI
  * Hospitalización
  * Quirófanos
  * Consulta Externa
  * Laboratorio
  * Imagenología
```

**Sección 2: Vinculación**
```
- Tipo de Vinculación (radio):
  ○ Planta
  ○ Contrato
  ○ Otro (especificar)
- Fecha de Inicio (date, required)
- Fecha de Finalización (date, condicional)
```

**Sección 3: Capacitación**
```
☐ Ha recibido capacitación en Historia Clínica Electrónica
  Si marcado:
  - Fecha de capacitación (date)
  - Instructor (text)
  - Duración (number, horas)
  - Certificado (file upload, PDF)
```

**Sección 4: Recursos Solicitados**
```
☐ Terminal de consulta (Cantidad: ___)
☐ Tablet para rondas (Cantidad: ___)
☐ Acceso móvil
☐ Lector de código de barras
☐ Impresora de etiquetas
```

**Sección 5: Aceptación de Responsabilidad**
```
☐ Acepto cumplir con las normas de confidencialidad (HIPAA)
☐ Me comprometo al registro oportuno de atenciones
☐ Acepto la responsabilidad profesional por el uso del sistema
```

##### Validaciones Especiales
- Registro profesional válido y único
- Email institucional (@hospital.com)
- Capacitación obligatoria para acceso a HCE
- Al menos un recurso solicitado

---

#### 4. Vista: Control - Seguimiento por Fases

**Ruta:** `/control/seguimiento`  
**Acceso:** Usuarios autenticados  
**Componente:** `Control.tsx` (view: seguimiento)

##### Descripción
Vista principal para seguimiento del estado de solicitudes.

##### Estructura de la Vista

**Barra de Filtros:**
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Buscar: [_______________]  📅 Desde: [____] Hasta: [____] │
│                                                         │
│ Estado: [Todos ▼] Tipo: [Todos ▼] Área: [Todas ▼]     │
│                                                         │
│ [Aplicar Filtros] [Limpiar] [Exportar]                │
└─────────────────────────────────────────────────────────┘
```

**Tabla de Solicitudes:**
| ID | Solicitante | Tipo | Estado | Fase | Firmas | Fecha | Acciones |
|----|-------------|------|--------|------|--------|-------|----------|
| SA-2024-001 | Juan Pérez | Admin | Pendiente | Jefe Inmediato | 1/5 | 2024-11-20 | 👁️ ✏️ 📊 |
| HC-2024-002 | María López | Asist | En Revisión | RRHH | 2/4 | 2024-11-19 | 👁️ 📊 |

**Leyenda de Estados:**
- 🟡 Pendiente
- 🔵 En Revisión
- 🟢 Aprobado
- 🔴 Rechazado

**Panel de Detalles (al hacer click):**
```
┌─────────────────────────────────────────────────────────┐
│ Solicitud: SA-2024-001                                  │
│ Estado: Pendiente                                       │
│ Fase Actual: Aprobación Jefe Inmediato                │
│                                                         │
│ Información del Solicitante:                           │
│ - Nombre: Juan Pérez García                           │
│ - Cédula: 1234567890                                  │
│ - Cargo: Contador Principal                           │
│                                                         │
│ Progreso de Aprobación:                               │
│ ✅ Registro Inicial (Juan Pérez - 2024-11-20)        │
│ ⏳ Jefe Inmediato (Pendiente)                         │
│ ⏹️ Jefe de RRHH (No iniciado)                        │
│ ⏹️ Jefe de TI (No iniciado)                          │
│                                                         │
│ [Ver Documento Completo] [Exportar PDF]               │
└─────────────────────────────────────────────────────────┘
```

##### Funcionalidades
- ✅ Búsqueda en tiempo real
- ✅ Filtros múltiples combinables
- ✅ Ordenamiento por columnas
- ✅ Paginación (15 registros por página)
- ✅ Exportación masiva
- ✅ Vista de detalles expandible

---

#### 5. Vista: Perfil - Información Personal

**Ruta:** `/perfil/informacion`  
**Acceso:** Usuarios autenticados  
**Componente:** `Perfil.tsx` (view: informacion)

##### Descripción
Gestión de datos personales del usuario.

##### Formulario de Perfil

**Datos Personales:**
```
┌─────────────────────────────────────────────────────────┐
│ Foto de Perfil:                                        │
│ [   📷   ]  [Cambiar Foto] [Eliminar]                 │
│                                                         │
│ Nombre Completo: [Juan Pérez García____________]      │
│ Email: [juan.perez@hospital.com_____________]          │
│ Username: [juan.perez] (No editable)                   │
│                                                         │
│ Teléfono: [3001234567_______]                         │
│ Dirección: [Calle 123 #45-67, Bogotá________]        │
│ Cargo: [Contador Principal______________]             │
│                                                         │
│ Fecha de Registro: 2024-01-15 (Solo lectura)         │
│ Último Acceso: 2024-11-26 07:30 AM (Solo lectura)    │
│                                                         │
│ [Guardar Cambios] [Cancelar]                          │
└─────────────────────────────────────────────────────────┘
```

**Configuración de Notificaciones:**
```
Preferencias de Notificación:
☑ Recibir notificaciones por email
☑ Notificaciones en el sistema
☐ Resumen diario
☑ Alertas urgentes
☐ Notificaciones de marketing

Frecuencia de Resumen:
○ Diario
● Semanal
○ Mensual
```

##### Validaciones
- Email debe ser único
- Teléfono formato válido
- Foto máximo 2MB, formatos: JPG, PNG

---

#### 6. Vista: Perfil - Seguridad

**Ruta:** `/perfil/seguridad`  
**Acceso:** Usuarios autenticados  
**Componente:** `Perfil.tsx` (view: seguridad)

##### Descripción
Gestión de contraseña y configuración de seguridad.

##### Sección: Cambiar Contraseña

**Formulario:**
```
┌─────────────────────────────────────────────────────────┐
│ Cambiar Contraseña                                     │
│                                                         │
│ Contraseña Actual:                                     │
│ [••••••••••••]                                        │
│                                                         │
│ Nueva Contraseña:                                      │
│ [••••••••••••]                                        │
│ Fortaleza: ████████░░ Fuerte                          │
│                                                         │
│ Requisitos:                                            │
│ ✅ Mínimo 6 caracteres                                │
│ ✅ Al menos una mayúscula                             │
│ ✅ Al menos una minúscula                             │
│ ✅ Al menos un número                                 │
│ ⏹️ Al menos un carácter especial (recomendado)       │
│                                                         │
│ Confirmar Nueva Contraseña:                           │
│ [••••••••••••]                                        │
│                                                         │
│ [Actualizar Contraseña]                               │
└─────────────────────────────────────────────────────────┘
```

##### Sección: Sesiones Activas

**Tabla de Sesiones:**
| Dispositivo | Ubicación | IP | Último Acceso | Acción |
|-------------|-----------|-----|---------------|--------|
| Chrome - Windows | Bogotá, CO | 192.168.1.100 | Hace 5 min (Actual) | - |
| Firefox - Android | Bogotá, CO | 192.168.1.101 | Hace 2 horas | ❌ Cerrar |
| Safari - iOS | Medellín, CO | 10.0.0.50 | Hace 1 día | ❌ Cerrar |

**Opciones:**
- [Cerrar Todas las Sesiones Excepto Esta]
- [Ver Historial Completo de Accesos]

##### Sección: Autenticación de Dos Factores (2FA)

```
┌─────────────────────────────────────────────────────────┐
│ Autenticación de Dos Factores                          │
│ Estado: ⏹️ Desactivado                                 │
│                                                         │
│ Agrega una capa adicional de seguridad a tu cuenta.   │
│                                                         │
│ [Activar 2FA]                                          │
│                                                         │
│ Métodos disponibles:                                   │
│ • Aplicación de autenticación (Google Authenticator)  │
│ • SMS al número registrado                            │
│ • Email de verificación                               │
└─────────────────────────────────────────────────────────┘
```

---

#### 7. Vista: Perfil - Registro de Actividad

**Ruta:** `/perfil/actividad`  
**Acceso:** Usuarios autenticados  
**Componente:** `Perfil.tsx` (view: actividad)

##### Descripción
Historial completo de acciones del usuario en el sistema.

##### Filtros de Actividad

```
Filtrar por:
Tipo: [Todas las actividades ▼]
Fecha: [Último mes ▼]
Resultado: [Todos ▼]

[Aplicar] [Exportar Historial]
```

##### Tabla de Actividad

| Fecha/Hora | Tipo | Descripción | IP | Dispositivo | Resultado |
|------------|------|-------------|-----|-------------|-----------|
| 2024-11-26 07:30 | Login | Inicio de sesión exitoso | 192.168.1.100 | Chrome/Windows | ✅ |
| 2024-11-25 16:45 | Solicitud | Creó solicitud SA-2024-001 | 192.168.1.100 | Chrome/Windows | ✅ |
| 2024-11-25 14:20 | Perfil | Actualizó información personal | 192.168.1.100 | Chrome/Windows | ✅ |
| 2024-11-24 09:15 | Login | Intento de inicio de sesión | 192.168.1.101 | Firefox/Android | ❌ |
| 2024-11-23 11:30 | Exportación | Exportó solicitud a PDF | 192.168.1.100 | Chrome/Windows | ✅ |

##### Tipos de Actividad Registrada

**Autenticación:**
- Inicio de sesión exitoso
- Inicio de sesión fallido
- Cierre de sesión
- Cambio de contraseña
- Restablecimiento de contraseña

**Solicitudes:**
- Creación de solicitud
- Modificación de solicitud
- Eliminación de solicitud
- Firma de solicitud
- Aprobación/Rechazo

**Perfil:**
- Actualización de datos personales
- Cambio de foto de perfil
- Modificación de configuración

**Exportaciones:**
- Exportación a Excel
- Exportación a PDF
- Generación de reportes

**Accesos:**
- Acceso a vistas protegidas
- Intentos de acceso denegado
- Cambios de permisos

---

### Vistas de Administrador

#### 8. Vista: Configuración - Gestión de Usuarios

**Ruta:** `/configuracion/usuarios`  
**Acceso:** Solo Administradores  
**Componente:** `Configuracion.tsx` (view: usuarios)

##### Descripción
Gestión completa de usuarios del sistema.

##### Barra de Herramientas

```
┌─────────────────────────────────────────────────────────┐
│ [+ Nuevo Usuario] [Importar CSV] [Exportar]           │
│                                                         │
│ 🔍 Buscar: [_______________]                           │
│ Rol: [Todos ▼] Estado: [Todos ▼] Área: [Todas ▼]     │
└─────────────────────────────────────────────────────────┘
```

##### Tabla de Usuarios

| ID | Nombre | Email | Rol | Estado | Último Acceso | Acciones |
|----|--------|-------|-----|--------|---------------|----------|
| 1 | Admin Sistema | admin@hefesto.local | Admin | 🟢 Activo | Hace 5 min | ✏️ 🔑 📊 |
| 2 | Juan Pérez | juan.perez@hospital.com | Usuario | 🟢 Activo | Hace 1 hora | ✏️ 🔑 ⏸️ 📊 |
| 3 | María López | maria.lopez@hospital.com | Usuario | 🔴 Inactivo | Hace 30 días | ✏️ 🔑 ▶️ ❌ |

**Leyenda de Acciones:**
- ✏️ Editar
- 🔑 Cambiar Contraseña
- ⏸️ Desactivar
- ▶️ Activar
- ❌ Eliminar
- 📊 Ver Actividad

##### Modal: Crear/Editar Usuario

```
┌─────────────────────────────────────────────────────────┐
│ Crear Nuevo Usuario                                    │
│                                                         │
│ Información Básica:                                    │
│ Nombre Completo: [_________________________]          │
│ Email: [_________________________]                     │
│ Username: [_________________________] (opcional)       │
│                                                         │
│ Contraseña:                                            │
│ Contraseña: [_________________________]               │
│ Confirmar: [_________________________]                 │
│ ☑ Requerir cambio en próximo inicio de sesión        │
│                                                         │
│ Rol y Permisos:                                        │
│ Rol: ○ Usuario  ○ Administrador                       │
│                                                         │
│ Estado:                                                │
│ ○ Activo  ○ Inactivo                                  │
│                                                         │
│ Información Adicional:                                 │
│ Teléfono: [_________________________]                 │
│ Cargo: [_________________________]                     │
│ Área: [_________________________]                      │
│                                                         │
│ [Guardar] [Cancelar]                                   │
└─────────────────────────────────────────────────────────┘
```

##### Funcionalidades Especiales

**Importación Masiva:**
```
Formato CSV requerido:
nombre,email,password,rol,estado,telefono,cargo

Ejemplo:
Juan Pérez,juan@hospital.com,temp123,Usuario,activo,3001234567,Contador
María López,maria@hospital.com,temp456,Usuario,activo,3009876543,Enfermera
```

**Exportación:**
- Excel con todos los datos
- CSV para importación
- PDF para reporte

**Acciones Masivas:**
- Activar/Desactivar múltiples usuarios
- Asignar rol masivamente
- Enviar email de bienvenida masivo

---

#### 9. Vista: Configuración - Gestión de Llaves/Credenciales

**Ruta:** `/configuracion/llaves`  
**Acceso:** Solo Administradores  
**Componente:** `Llaves.tsx`

##### Descripción
Gestión de credenciales de firma electrónica.

##### Barra de Herramientas

```
┌─────────────────────────────────────────────────────────┐
│ [+ Nueva Credencial] [Importar] [Exportar]            │
│                                                         │
│ 🔍 Buscar: [_______________]                           │
│ Tipo: [Todos ▼] Estado: [Activas ▼] Cargo: [Todos ▼] │
└─────────────────────────────────────────────────────────┘
```

##### Tabla de Credenciales

| ID | Cargo | Código | Usuario | Tipo | Estado | Usos | Última Uso | Acciones |
|----|-------|--------|---------|------|--------|------|------------|----------|
| 1 | Jefe RRHH | RRHH-001 | maria.lopez | Imagen | 🟢 | 45 | 2024-11-25 | ✏️ 👁️ ⏸️ |
| 2 | Jefe TI | TI-001 | carlos.gomez | Texto | 🟢 | 32 | 2024-11-24 | ✏️ 👁️ ⏸️ |
| 3 | Coordinador | COORD-001 | - | Simple | 🔴 | 0 | Nunca | ✏️ 👁️ ▶️ ❌ |

##### Modal: Crear/Editar Credencial

```
┌─────────────────────────────────────────────────────────┐
│ Nueva Credencial de Firma                              │
│                                                         │
│ Información de la Credencial:                          │
│ Cargo Asociado: [Jefe de Recursos Humanos_____]      │
│ Código/Credencial: [RRHH-001___________]              │
│                                                         │
│ Asignación:                                            │
│ Usuario Asignado: [Seleccionar usuario ▼] (opcional)  │
│                                                         │
│ Tipo de Firma:                                         │
│ ○ Imagen Base64 (Firma manuscrita)                    │
│ ○ Texto Firma (Estilo cursivo)                        │
│ ○ Texto Simple (Solo nombre)                          │
│                                                         │
│ [Si Imagen Base64 seleccionado]                       │
│ ┌─────────────────────────────────────────┐           │
│ │                                         │           │
│ │     Pad de Firma Digital                │           │
│ │                                         │           │
│ │     [Firme aquí con el mouse/touch]    │           │
│ │                                         │           │
│ └─────────────────────────────────────────┘           │
│ [Limpiar] [Cargar Imagen]                             │
│                                                         │
│ [Si Texto Firma seleccionado]                         │
│ Nombre Completo: [María Fernanda López____]          │
│ Vista Previa: María Fernanda López                    │
│                                                         │
│ Estado:                                                │
│ ○ Activa  ○ Inactiva                                  │
│                                                         │
│ Configuración Avanzada:                               │
│ ☑ Requerir contraseña al firmar                       │
│ ☑ Registrar IP y dispositivo                          │
│ ☐ Permitir firma offline                              │
│ ☑ Notificar al usuario cada uso                       │
│                                                         │
│ [Guardar] [Cancelar]                                   │
└─────────────────────────────────────────────────────────┘
```

##### Vista de Detalles de Credencial

```
┌─────────────────────────────────────────────────────────┐
│ Credencial: RRHH-001                                   │
│ Cargo: Jefe de Recursos Humanos                       │
│ Usuario: María Fernanda López                         │
│                                                         │
│ Estadísticas de Uso:                                   │
│ Total de Firmas: 45                                    │
│ Última Firma: 2024-11-25 14:30                        │
│ Promedio Mensual: 15 firmas                           │
│                                                         │
│ Historial Reciente:                                    │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Fecha       │ Solicitud   │ Acción   │ IP      │   │
│ ├─────────────────────────────────────────────────┤   │
│ │ 2024-11-25  │ SA-2024-045 │ Aprobó   │ 192...  │   │
│ │ 2024-11-24  │ SA-2024-044 │ Aprobó   │ 192...  │   │
│ │ 2024-11-23  │ SA-2024-043 │ Rechazó  │ 192...  │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ Firma Actual:                                          │
│ [Imagen de la firma]                                   │
│                                                         │
│ [Editar] [Desactivar] [Ver Historial Completo]       │
└─────────────────────────────────────────────────────────┘
```

##### Gestión de Contraseñas de Firma

**Configuración de Seguridad:**
```
Para credenciales que requieren contraseña:

Contraseña de Firma:
- Diferente a la contraseña de login
- Mínimo 4 dígitos (PIN)
- Máximo 3 intentos fallidos
- Bloqueo temporal de 15 minutos

Proceso de Firma con Contraseña:
1. Usuario selecciona "Firmar"
2. Sistema solicita PIN de firma
3. Usuario ingresa PIN
4. Sistema valida
5. Si correcto: Firma se registra
6. Si incorrecto: Contador de intentos
```

---

#### 10. Vista: Configuración - Flujos de Aprobación

**Ruta:** `/configuracion/flujos`  
**Acceso:** Solo Administradores  
**Componente:** `Configuracion.tsx` (view: flujos)

##### Descripción
Configuración de flujos de aprobación para cada tipo de solicitud.

##### Selector de Tipo de Solicitud

```
┌─────────────────────────────────────────────────────────┐
│ Configurar Flujo para:                                 │
│ ○ Solicitudes Administrativas                          │
│ ○ Solicitudes Asistenciales (Historia Clínica)        │
└─────────────────────────────────────────────────────────┘
```

##### Editor de Flujo (Drag & Drop)

```
┌─────────────────────────────────────────────────────────┐
│ Flujo: Solicitud Administrativa                        │
│                                                         │
│ Pasos del Flujo:                                       │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 1. Registro Inicial                             │   │
│ │    Usuario: Solicitante                         │   │
│ │    Obligatorio: Sí                              │   │
│ │    Tiempo: N/A                                  │   │
│ │    [✏️ Editar] [❌ Eliminar]                    │   │
│ └─────────────────────────────────────────────────┘   │
│                      ↓                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 2. Aprobación Jefe Inmediato                    │   │
│ │    Cargo: Jefe de Área                          │   │
│ │    Obligatorio: Sí                              │   │
│ │    Tiempo: 2 días hábiles                       │   │
│ │    [✏️ Editar] [❌ Eliminar] [↑] [↓]           │   │
│ └─────────────────────────────────────────────────┘   │
│                      ↓                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 3. Validación RRHH                              │   │
│ │    Cargo: Jefe de Talento Humano                │   │
│ │    Obligatorio: Sí                              │   │
│ │    Tiempo: 3 días hábiles                       │   │
│ │    [✏️ Editar] [❌ Eliminar] [↑] [↓]           │   │
│ └─────────────────────────────────────────────────┘   │
│                      ↓                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 4. Aprobación TI                                │   │
│ │    Cargo: Jefe de Gestión de la Información     │   │
│ │    Obligatorio: Sí                              │   │
│ │    Tiempo: 2 días hábiles                       │   │
│ │    [✏️ Editar] [❌ Eliminar] [↑] [↓]           │   │
│ └─────────────────────────────────────────────────┘   │
│                      ↓                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 5. Aprobación Final (Condicional)               │   │
│ │    Cargo: Subgerente Administrativo             │   │
│ │    Obligatorio: No                              │   │
│ │    Condición: Si módulos financieros            │   │
│ │    Tiempo: 1 día hábil                          │   │
│ │    [✏️ Editar] [❌ Eliminar] [↑] [↓]           │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [+ Agregar Paso] [Guardar Flujo] [Vista Previa]      │
└─────────────────────────────────────────────────────────┘
```

##### Modal: Editar Paso

```
┌─────────────────────────────────────────────────────────┐
│ Editar Paso del Flujo                                  │
│                                                         │
│ Nombre del Paso:                                       │
│ [Aprobación Jefe Inmediato______________]             │
│                                                         │
│ Cargo Requerido:                                       │
│ [Jefe de Área_________________________]               │
│                                                         │
│ Orden en el Flujo:                                     │
│ [2] (Posición en la secuencia)                        │
│                                                         │
│ ¿Es Obligatorio?                                       │
│ ● Sí  ○ No                                            │
│                                                         │
│ Tiempo Máximo para Completar:                         │
│ [2] días hábiles                                       │
│                                                         │
│ Condiciones (Opcional):                                │
│ ☐ Solo si módulos financieros seleccionados          │
│ ☐ Solo si tipo de vinculación es "Planta"            │
│ ☐ Solo si nivel de anexos es N3                       │
│                                                         │
│ Acciones Automáticas:                                  │
│ ☑ Notificar por email al aprobador                   │
│ ☑ Recordatorio diario si no se completa              │
│ ☐ Escalar al superior si excede tiempo                │
│                                                         │
│ Plantilla de Notificación:                            │
│ [Seleccionar plantilla ▼]                             │
│                                                         │
│ [Guardar] [Cancelar]                                   │
└─────────────────────────────────────────────────────────┘
```

---

#### 11. Vista: Control Avanzado - Aprobación de Solicitudes

**Ruta:** `/control/aprobacion`  
**Acceso:** Solo Administradores  
**Componente:** `Control.tsx` (view: aprobacion)

##### Descripción
Vista centralizada para aprobar/rechazar todas las solicitudes pendientes.

##### Panel de Control

```
┌─────────────────────────────────────────────────────────┐
│ Solicitudes Pendientes de Mi Aprobación                │
│                                                         │
│ Total: 12 solicitudes                                  │
│ Urgentes (>3 días): 3                                  │
│ Vencidas: 1                                            │
└─────────────────────────────────────────────────────────┘
```

##### Filtros Avanzados

```
Filtrar por:
Estado: [Pendientes ▼]
Tipo: [Todas ▼]
Urgencia: [Todas ▼]
Área: [Todas ▼]
Fecha: [Últimos 30 días ▼]

Ordenar por:
○ Fecha de creación (más antiguas primero)
○ Urgencia (más urgentes primero)
○ Tipo de solicitud

[Aplicar Filtros]
```

##### Lista de Solicitudes

```
┌─────────────────────────────────────────────────────────┐
│ 🔴 URGENTE - SA-2024-045                               │
│ Solicitante: Juan Pérez García                        │
│ Tipo: Administrativa                                   │
│ Cargo: Contador Principal                             │
│ Módulos: Contabilidad, Presupuesto                    │
│ Creada: 2024-11-20 (6 días)                           │
│ Fase Actual: Aprobación Jefe de RRHH (Tu turno)      │
│                                                         │
│ [Ver Detalles] [✅ Aprobar] [❌ Rechazar]             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🟡 HC-2024-032                                         │
│ Solicitante: Dra. María López                         │
│ Tipo: Asistencial                                      │
│ Especialidad: Medicina Interna                        │
│ Área: Hospitalización Piso 3                          │
│ Creada: 2024-11-23 (3 días)                           │
│ Fase Actual: Aprobación Jefe de Servicio (Tu turno)  │
│                                                         │
│ [Ver Detalles] [✅ Aprobar] [❌ Rechazar]             │
└─────────────────────────────────────────────────────────┘
```

##### Modal: Aprobar Solicitud

```
┌─────────────────────────────────────────────────────────┐
│ Aprobar Solicitud SA-2024-045                          │
│                                                         │
│ Solicitante: Juan Pérez García                        │
│ Cargo: Contador Principal                             │
│                                                         │
│ Resumen de la Solicitud:                              │
│ - Módulos Administrativos: Contabilidad, Presupuesto │
│ - Tipo de Permiso: Consulta y modificación           │
│ - Nivel de Anexos: N2                                 │
│                                                         │
│ Firma Electrónica:                                     │
│ Credencial: RRHH-001 (María Fernanda López)          │
│                                                         │
│ ┌─────────────────────────────────────────┐           │
│ │                                         │           │
│ │     [Imagen de firma pre-configurada]  │           │
│ │                                         │           │
│ └─────────────────────────────────────────┘           │
│                                                         │
│ Contraseña de Firma (PIN):                            │
│ [••••]                                                 │
│                                                         │
│ Comentarios (Opcional):                               │
│ [_________________________________________]           │
│ [_________________________________________]           │
│                                                         │
│ ☑ Notificar al solicitante por email                 │
│ ☑ Avanzar automáticamente al siguiente paso          │
│                                                         │
│ [Confirmar Aprobación] [Cancelar]                     │
└─────────────────────────────────────────────────────────┘
```

##### Modal: Rechazar Solicitud

```
┌─────────────────────────────────────────────────────────┐
│ Rechazar Solicitud SA-2024-045                         │
│                                                         │
│ ⚠️ IMPORTANTE: Debes proporcionar un motivo           │
│                                                         │
│ Motivo del Rechazo: (Obligatorio)                     │
│ [_________________________________________]           │
│ [_________________________________________]           │
│ [_________________________________________]           │
│                                                         │
│ Categoría del Rechazo:                                │
│ ○ Información incompleta                              │
│ ○ Documentación faltante                              │
│ ○ No cumple requisitos                                │
│ ○ Duplicado                                           │
│ ○ Otro (especificar arriba)                          │
│                                                         │
│ Firma Electrónica:                                     │
│ Credencial: RRHH-001                                  │
│ Contraseña de Firma (PIN): [••••]                    │
│                                                         │
│ ☑ Notificar al solicitante por email                 │
│ ☑ Permitir corrección y reenvío                       │
│                                                         │
│ [Confirmar Rechazo] [Cancelar]                        │
└─────────────────────────────────────────────────────────┘
```

##### Aprobación Masiva

```
Seleccionadas: 5 solicitudes

[✅ Aprobar Todas] [❌ Rechazar Todas]

Advertencia: La aprobación masiva requiere:
- Mismo comentario para todas
- Misma firma electrónica
- Confirmación adicional
```

---

#### 12. Vista: Control Avanzado - Movimientos

**Ruta:** `/control/movimientos`  
**Acceso:** Solo Administradores  
**Componente:** `Control.tsx` (view: movimientos)

##### Descripción
Registro completo de todos los movimientos y transacciones del sistema.

##### Filtros de Auditoría

```
┌─────────────────────────────────────────────────────────┐
│ Filtros de Auditoría                                   │
│                                                         │
│ Rango de Fechas:                                       │
│ Desde: [2024-11-01] Hasta: [2024-11-26]              │
│                                                         │
│ Tipo de Movimiento:                                    │
│ ☑ Creación de solicitudes                             │
│ ☑ Modificación de solicitudes                         │
│ ☑ Aprobaciones                                        │
│ ☑ Rechazos                                            │
│ ☑ Cambios de usuario                                  │
│ ☑ Cambios de configuración                            │
│ ☐ Exportaciones                                       │
│ ☐ Inicios de sesión                                   │
│                                                         │
│ Usuario: [Todos ▼]                                     │
│ Área: [Todas ▼]                                        │
│                                                         │
│ [Aplicar Filtros] [Limpiar] [Exportar Auditoría]     │
└─────────────────────────────────────────────────────────┘
```

##### Tabla de Movimientos

| Fecha/Hora | Usuario | Tipo | Descripción | Solicitud | IP | Detalles |
|------------|---------|------|-------------|-----------|-----|----------|
| 2024-11-26 07:30 | maria.lopez | Aprobación | Aprobó solicitud | SA-2024-045 | 192.168.1.50 | 👁️ |
| 2024-11-25 16:45 | juan.perez | Creación | Creó solicitud administrativa | SA-2024-045 | 192.168.1.100 | 👁️ |
| 2024-11-25 14:20 | admin | Configuración | Modificó flujo de aprobación | - | 192.168.1.1 | 👁️ |
| 2024-11-24 11:30 | carlos.gomez | Rechazo | Rechazó solicitud | HC-2024-030 | 192.168.1.75 | 👁️ |

##### Modal: Detalles del Movimiento

```
┌─────────────────────────────────────────────────────────┐
│ Detalles del Movimiento                                │
│                                                         │
│ ID del Movimiento: MOV-2024-1234                       │
│ Fecha/Hora: 2024-11-26 07:30:15                       │
│                                                         │
│ Usuario:                                               │
│ - Nombre: María Fernanda López                        │
│ - Email: maria.lopez@hospital.com                     │
│ - Rol: Administrador                                  │
│ - Cargo: Jefe de RRHH                                 │
│                                                         │
│ Acción Realizada:                                      │
│ Tipo: Aprobación                                       │
│ Descripción: Aprobó solicitud administrativa          │
│ Solicitud: SA-2024-045                                │
│                                                         │
│ Datos Técnicos:                                        │
│ - IP: 192.168.1.50                                    │
│ - Dispositivo: Chrome 119 / Windows 10                │
│ - Ubicación: Bogotá, Colombia                         │
│ - Sesión ID: sess_abc123xyz                           │
│                                                         │
│ Datos Modificados:                                     │
│ Campo: estado                                          │
│ Valor Anterior: "Pendiente"                           │
│ Valor Nuevo: "Aprobado"                               │
│                                                         │
│ Comentarios:                                           │
│ "Aprobado. Cumple con todos los requisitos."         │
│                                                         │
│ Firma Utilizada:                                       │
│ Credencial: RRHH-001                                  │
│ [Imagen de la firma]                                   │
│                                                         │
│ [Cerrar] [Exportar Detalles]                          │
└─────────────────────────────────────────────────────────┘
```

---

#### 13. Vista: Control Avanzado - Auditoría

**Ruta:** `/control/auditoria`  
**Acceso:** Solo Administradores  
**Componente:** `Control.tsx` (view: auditoria)

##### Descripción
Sistema de auditoría avanzado con análisis de seguridad y cumplimiento.

##### Dashboard de Auditoría

```
┌─────────────────────────────────────────────────────────┐
│ Resumen de Auditoría - Últimos 30 Días                │
│                                                         │
│ ┌───────────────┬───────────────┬───────────────┐     │
│ │ Total Eventos │ Eventos Críticos │ Anomalías │     │
│ │     1,234     │        12        │     3     │     │
│ └───────────────┴───────────────┴───────────────┘     │
│                                                         │
│ Eventos por Tipo:                                      │
│ ████████████ Autenticación (45%)                      │
│ ██████ Solicitudes (25%)                              │
│ ████ Configuración (15%)                              │
│ ███ Exportaciones (10%)                               │
│ █ Otros (5%)                                          │
└─────────────────────────────────────────────────────────┘
```

##### Alertas de Seguridad

```
┌─────────────────────────────────────────────────────────┐
│ 🔴 Alertas Críticas                                    │
│                                                         │
│ ⚠️ Múltiples intentos de acceso fallidos              │
│ Usuario: juan.perez                                    │
│ IP: 192.168.1.100                                     │
│ Intentos: 5 en 10 minutos                             │
│ Fecha: 2024-11-26 07:00                               │
│ [Investigar] [Bloquear IP] [Contactar Usuario]       │
│                                                         │
│ ⚠️ Acceso desde ubicación inusual                     │
│ Usuario: maria.lopez                                   │
│ IP: 10.0.0.50 (Medellín)                              │
│ Ubicación habitual: Bogotá                            │
│ Fecha: 2024-11-25 22:30                               │
│ [Investigar] [Verificar con Usuario]                 │
│                                                         │
│ ⚠️ Exportación masiva de datos                        │
│ Usuario: carlos.gomez                                  │
│ Registros: 500 solicitudes                            │
│ Fecha: 2024-11-24 18:00                               │
│ [Investigar] [Ver Detalles]                           │
└─────────────────────────────────────────────────────────┘
```

##### Análisis de Cumplimiento

```
┌─────────────────────────────────────────────────────────┐
│ Cumplimiento Normativo                                 │
│                                                         │
│ HIPAA (Confidencialidad Médica):                      │
│ ████████████████████░ 95% Cumplimiento                │
│ - Accesos a HCE registrados: ✅                       │
│ - Firmas electrónicas válidas: ✅                     │
│ - Auditoría completa: ✅                              │
│ - Encriptación de datos: ⚠️ Revisar                  │
│                                                         │
│ ISO 27001 (Seguridad de la Información):              │
│ ███████████████████░░ 90% Cumplimiento                │
│ - Control de accesos: ✅                              │
│ - Gestión de contraseñas: ✅                          │
│ - Respaldo de datos: ✅                               │
│ - Revisión de logs: ⚠️ Pendiente                     │
│                                                         │
│ [Generar Reporte de Cumplimiento]                     │
└─────────────────────────────────────────────────────────┘
```

##### Búsqueda Avanzada de Auditoría

```
Buscar en Logs:
┌─────────────────────────────────────────────────────────┐
│ Criterios de Búsqueda:                                 │
│                                                         │
│ Usuario: [Todos ▼]                                     │
│ Acción: [Todas ▼]                                      │
│ Resultado: [Todos ▼]                                   │
│ IP: [_______________]                                  │
│ Rango de Fechas: [Últimos 30 días ▼]                 │
│                                                         │
│ Búsqueda Avanzada:                                     │
│ ☐ Solo eventos críticos                               │
│ ☐ Solo accesos fallidos                               │
│ ☐ Solo cambios de configuración                       │
│ ☐ Solo exportaciones de datos                         │
│                                                         │
│ Texto Libre:                                           │
│ [_________________________________________]           │
│                                                         │
│ [Buscar] [Limpiar] [Exportar Resultados]             │
└─────────────────────────────────────────────────────────┘
```

---

#### 14. Vista: Reportes

**Ruta:** `/reportes`  
**Acceso:** Solo Administradores  
**Componente:** `Reportes.tsx`

##### Descripción
Generación de reportes personalizados y análisis estadístico.

##### Tipos de Reportes Disponibles

```
┌─────────────────────────────────────────────────────────┐
│ Seleccionar Tipo de Reporte:                          │
│                                                         │
│ 📊 Reportes de Solicitudes:                           │
│ ○ Solicitudes por Estado                              │
│ ○ Solicitudes por Área                                │
│ ○ Solicitudes por Tipo                                │
│ ○ Tiempos de Aprobación                               │
│ ○ Solicitudes Rechazadas (con motivos)                │
│                                                         │
│ 👥 Reportes de Usuarios:                              │
│ ○ Usuarios Activos/Inactivos                          │
│ ○ Usuarios por Rol                                    │
│ ○ Actividad de Usuarios                               │
│ ○ Últimos Accesos                                     │
│                                                         │
│ ✍️ Reportes de Firmas:                                │
│ ○ Firmas Pendientes                                   │
│ ○ Firmas por Usuario                                  │
│ ○ Uso de Credenciales                                 │
│ ○ Tiempos de Firma                                    │
│                                                         │
│ 📈 Reportes Estadísticos:                             │
│ ○ Tendencias Mensuales                                │
│ ○ Comparativo Anual                                   │
│ ○ Eficiencia de Procesos                              │
│ ○ Indicadores de Gestión (KPIs)                       │
└─────────────────────────────────────────────────────────┘
```

##### Configurador de Reporte

```
┌─────────────────────────────────────────────────────────┐
│ Configurar Reporte: Solicitudes por Estado             │
│                                                         │
│ Parámetros:                                            │
│                                                         │
│ Rango de Fechas:                                       │
│ Desde: [2024-01-01] Hasta: [2024-11-26]              │
│                                                         │
│ Filtros:                                               │
│ Tipo de Solicitud: [Todas ▼]                          │
│ Área: [Todas ▼]                                        │
│ Usuario Creador: [Todos ▼]                            │
│                                                         │
│ Campos a Incluir:                                      │
│ ☑ ID de Solicitud                                     │
│ ☑ Solicitante                                         │
│ ☑ Tipo                                                │
│ ☑ Estado                                              │
│ ☑ Fecha de Creación                                   │
│ ☑ Fecha de Última Actualización                       │
│ ☐ Firmas Completadas                                  │
│ ☐ Comentarios                                         │
│                                                         │
│ Agrupación:                                            │
│ ○ Por Estado                                          │
│ ○ Por Tipo                                            │
│ ○ Por Mes                                             │
│ ○ Por Área                                            │
│                                                         │
│ Formato de Salida:                                     │
│ ○ Excel (.xlsx)                                       │
│ ○ PDF                                                 │
│ ○ CSV                                                 │
│                                                         │
│ Opciones Adicionales:                                  │
│ ☑ Incluir gráficos                                    │
│ ☑ Incluir resumen ejecutivo                           │
│ ☐ Incluir firmas (solo PDF)                          │
│                                                         │
│ [Generar Reporte] [Vista Previa] [Programar]         │
└─────────────────────────────────────────────────────────┘
```

##### Vista Previa de Reporte

```
┌─────────────────────────────────────────────────────────┐
│ Vista Previa: Solicitudes por Estado                   │
│                                                         │
│ Período: 01/01/2024 - 26/11/2024                      │
│                                                         │
│ Resumen Ejecutivo:                                     │
│ - Total de Solicitudes: 234                           │
│ - Pendientes: 45 (19%)                                │
│ - En Revisión: 32 (14%)                               │
│ - Aprobadas: 142 (61%)                                │
│ - Rechazadas: 15 (6%)                                 │
│                                                         │
│ [Gráfico de Barras]                                    │
│ ████████████████████████████ Aprobadas (142)          │
│ ██████████ Pendientes (45)                            │
│ ███████ En Revisión (32)                              │
│ ██ Rechazadas (15)                                    │
│                                                         │
│ Detalles por Mes:                                      │
│ ┌─────────┬──────┬──────┬──────┬──────┐             │
│ │   Mes   │ Pend │ Rev  │ Aprob│ Rech │             │
│ ├─────────┼──────┼──────┼──────┼──────┤             │
│ │ Enero   │  5   │  3   │  12  │  1   │             │
│ │ Febrero │  4   │  2   │  15  │  2   │             │
│ │ ...     │ ...  │ ...  │ ...  │ ...  │             │
│ └─────────┴──────┴──────┴──────┴──────┘             │
│                                                         │
│ [Descargar] [Modificar] [Cerrar]                      │
└─────────────────────────────────────────────────────────┘
```

---

## Preguntas Frecuentes

### Acceso y Seguridad

**¿Qué hago si olvidé mi contraseña?**

Actualmente debes contactar al administrador del sistema para que restablezca tu contraseña. El administrador te enviará una contraseña temporal que deberás cambiar en el primer inicio de sesión.

**¿Por qué mi cuenta está bloqueada?**

Tu cuenta se bloquea automáticamente después de 5 intentos fallidos de inicio de sesión. El bloqueo dura 15 minutos. Si necesitas acceso urgente, contacta al administrador.

**¿Puedo usar el mismo usuario en múltiples dispositivos?**

Sí, puedes iniciar sesión desde múltiples dispositivos simultáneamente. Sin embargo, por seguridad, se recomienda cerrar sesión cuando termines de usar un dispositivo compartido.

### Solicitudes

**¿Puedo editar una solicitud ya enviada?**

Solo si la solicitud está en estado "Pendiente" y tienes los permisos necesarios. Una vez que la solicitud entra en revisión o es aprobada, no se puede editar. Si necesitas hacer cambios, debes crear una nueva solicitud.

**¿Cómo sé en qué estado está mi solicitud?**

Ve a **Control → Seguimiento por Fases** y busca tu solicitud por nombre o cédula. También recibirás notificaciones por email cada vez que cambie el estado.

**¿Puedo eliminar una solicitud?**

Solo los administradores pueden eliminar solicitudes, y generalmente solo aquellas que no han iniciado el flujo de aprobación. Si necesitas eliminar una solicitud, contacta al administrador explicando el motivo.

**¿Cuánto tiempo tarda una aprobación?**

Depende del flujo configurado y la disponibilidad de los aprobadores. Generalmente:
- Solicitudes administrativas: 2-5 días hábiles
- Solicitudes asistenciales: 3-7 días hábiles

**¿Puedo ver solicitudes de otros usuarios?**

Los usuarios normales solo ven sus propias solicitudes. Los administradores pueden ver todas las solicitudes del sistema.

### Estados y Flujos

**¿Qué significa cada estado?**

| Estado | Significado |
|--------|-------------|
| **Pendiente** | Solicitud creada, esperando primera revisión |
| **En Revisión** | En proceso de aprobación, esperando firmas |
| **Aprobado** | Solicitud aprobada completamente, lista para implementar |
| **Rechazado** | Solicitud no aprobada (ver comentarios para el motivo) |

**¿Qué pasa si un aprobador rechaza mi solicitud?**

Recibirás una notificación con el motivo del rechazo. Puedes:
1. Corregir los datos según las observaciones
2. Crear una nueva solicitud con la información correcta
3. Contactar al aprobador para aclarar dudas

### Exportación y Reportes

**¿Puedo exportar datos?**

Sí, usa el botón **"Exportar"** en las vistas de control. Puedes exportar a:
- Excel (formato completo)
- PDF (formato oficial)
- CSV (datos planos)

**¿Los reportes incluyen las firmas?**

Sí, las exportaciones en Excel y PDF incluyen las firmas electrónicas como imágenes embebidas.

### Sistema y Funcionalidad

**¿El sistema guarda mi historial?**

Sí, todas las acciones quedan registradas en el sistema para auditoría. Puedes consultar tu historial en **Perfil → Registro de Actividad**.

**¿Puedo usar el sistema desde mi celular?**

Sí, el sistema es completamente responsivo y se adapta a dispositivos móviles (smartphones y tablets). Todas las funcionalidades están disponibles en móvil.

**¿Qué navegadores son compatibles?**

El sistema es compatible con:
- ✅ Google Chrome (recomendado)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ⚠️ Internet Explorer (no recomendado)

**¿Necesito instalar algo?**

No, HEFESTO es una aplicación web que funciona completamente en el navegador. No requiere instalación de software adicional.

---

## Soporte Técnico

### Canales de Soporte

Para soporte técnico o consultas adicionales, contacta a:

#### Email
📧 **soporte@hefesto.local**
- Tiempo de respuesta: 24 horas hábiles
- Incluye capturas de pantalla si es posible
- Describe detalladamente el problema

#### Teléfono
📞 **Extensión XXX**
- Horario: Lunes a Viernes, 8:00 AM - 5:00 PM
- Para problemas urgentes
- Ten a mano tu número de usuario

#### Mesa de Ayuda
🖥️ **Portal de soporte interno**
- Crea tickets de soporte
- Seguimiento en línea
- Base de conocimientos

### Información a Proporcionar

Cuando contactes soporte, ten lista la siguiente información:

1. **Tu información:**
   - Nombre completo
   - Email o usuario
   - Cargo y área

2. **Descripción del problema:**
   - ¿Qué estabas haciendo?
   - ¿Qué esperabas que pasara?
   - ¿Qué pasó en realidad?
   - ¿Cuándo ocurrió?

3. **Información técnica:**
   - Navegador y versión
   - Sistema operativo
   - Capturas de pantalla
   - Mensajes de error

### Problemas Comunes y Soluciones

#### No puedo iniciar sesión

**Solución:**
1. Verifica que estés usando el email o usuario correcto
2. Verifica que Caps Lock esté desactivado
3. Intenta restablecer tu contraseña
4. Si el problema persiste, contacta al administrador

#### La página no carga

**Solución:**
1. Refresca la página (F5 o Ctrl+R)
2. Limpia el caché del navegador
3. Intenta con otro navegador
4. Verifica tu conexión a internet

#### No puedo subir archivos

**Solución:**
1. Verifica el tamaño del archivo (máximo 10MB)
2. Verifica el formato (solo PDF, JPG, PNG)
3. Intenta con otro archivo
4. Contacta soporte si persiste

---

## Glosario de Términos

| Término | Definición |
|---------|------------|
| **Administrador** | Usuario con permisos completos en el sistema |
| **Aprobación** | Acción de autorizar una solicitud |
| **Credencial** | Identificador para firma electrónica |
| **Dashboard** | Panel principal con resumen de información |
| **Firma Electrónica** | Firma digital que valida aprobación |
| **Flujo** | Secuencia de pasos para aprobar solicitud |
| **HCE** | Historia Clínica Electrónica |
| **Módulo** | Sección funcional del sistema institucional |
| **Perfil** | Conjunto de permisos y configuración de usuario |
| **Rol** | Tipo de usuario (Usuario o Administrador) |
| **Solicitud** | Petición de acceso o permisos |
| **Token** | Código de autenticación de sesión |

---

## Anexos

### Anexo A: Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + S` | Guardar formulario actual |
| `Ctrl + F` | Buscar en la página |
| `Esc` | Cerrar modal/diálogo |
| `Alt + N` | Nueva solicitud |
| `Alt + H` | Ir a inicio |

### Anexo B: Códigos de Error

| Código | Significado | Solución |
|--------|-------------|----------|
| **401** | No autorizado | Inicia sesión nuevamente |
| **403** | Acceso denegado | Verifica tus permisos |
| **404** | No encontrado | Verifica la URL |
| **500** | Error del servidor | Contacta soporte |

### Anexo C: Formatos de Datos

**Formato de Cédula:** Solo números, sin puntos ni guiones
```
Correcto: 1234567890
Incorrecto: 1.234.567.890
```

**Formato de Teléfono:** 10 dígitos para móvil, 7 para fijo
```
Móvil: 3001234567
Fijo: 6012345
```

**Formato de Email:** Debe ser válido y único
```
Correcto: usuario@hospital.com
Incorrecto: usuario@
```

---

## Casos de Uso Detallados

### Caso 1: Solicitud de Acceso para Nuevo Contador

**Contexto:**  
María López es una contadora recién contratada que necesita acceso a los módulos de Contabilidad y Presupuesto para realizar su trabajo diario.

**Actores:**
- María López (Solicitante)
- Jefe de Contabilidad (Aprobador)
- Jefe de RRHH (Aprobador)
- Jefe de TI (Aprobador final)

**Flujo Completo:**

#### Paso 1: Registro en el Sistema

María recibe un correo de bienvenida con la URL del sistema HEFESTO.

1. Accede a `https://hefesto.hospital.com`
2. Hace clic en "Registrar Nuevo Usuario"
3. Completa el formulario:
   ```
   Nombre: María López García
   Email: maria.lopez@hospital.com
   Contraseña: Contador2024!
   Confirmar: Contador2024!
   ```
4. Recibe confirmación de registro exitoso
5. Inicia sesión con sus credenciales

#### Paso 2: Completar Perfil

Al primer ingreso, el sistema solicita completar el perfil:

```
Username: maria.lopez
Teléfono: 3001234567
Cargo: Contador Principal
Dirección: Calle 123 #45-67
```

#### Paso 3: Crear Solicitud Administrativa

María navega a **Registro → Usuario Administrativo**:

**Información del Solicitante:**
```
Nombre Completo: María López García
Cédula: 1234567890
Cargo: Contador Principal
Área de Servicio: Departamento de Contabilidad
Teléfono/Extensión: 3001234567 / Ext. 2301
Tipo de Vinculación: Planta
```

**Módulos Administrativos Seleccionados:**
- ✅ Contabilidad
- ✅ Presupuesto
- ✅ Tesorería
- ☐ Nómina
- ☐ Recursos Humanos

**Módulos Financieros:**
- ✅ Cartera
- ✅ Cuentas por Pagar
- ☐ Facturación

**Permisos:**
- Nivel de Anexos: N2 (Intermedio)
- Tipo de Permiso: Consulta y modificación
- Perfil de: Contador Principal

**Credenciales:**
```
Login Asignado: maria.lopez
Clave Temporal: TempMariaL2024!
```

**Firmas Requeridas:**
1. ✅ Usuario Solicitante (María López) - Capturada
2. ⏳ Jefe de Contabilidad - Pendiente
3. ⏳ Jefe de RRHH - Pendiente
4. ⏳ Jefe de TI - Pendiente

María acepta la carta de responsabilidad y hace clic en **"Guardar Solicitud"**.

#### Paso 4: Confirmación

El sistema muestra:
```
✓ Solicitud creada exitosamente
ID: SA-2024-00456
Estado: Pendiente
Siguiente paso: Aprobación de Jefe de Contabilidad
Fecha: 2024-11-26 09:30:00

Recibirás notificaciones por correo sobre el progreso de tu solicitud.
```

#### Paso 5: Flujo de Aprobaciones

**Día 1 - 10:00 AM:**  
El Jefe de Contabilidad recibe notificación por correo:

```
Asunto: Nueva solicitud de acceso - SA-2024-00456

Estimado Jefe de Contabilidad,

María López García ha solicitado acceso a los siguientes módulos:
- Contabilidad
- Presupuesto
- Tesorería

Por favor revise y apruebe/rechace la solicitud en:
https://hefesto.hospital.com/control/aprobaciones

Solicitud ID: SA-2024-00456
```

El Jefe de Contabilidad:
1. Ingresa al sistema
2. Va a **Control → Aprobaciones**
3. Localiza la solicitud SA-2024-00456
4. Revisa los módulos solicitados
5. Verifica que María efectivamente trabaja en su departamento
6. Hace clic en **"Aprobar"**
7. Agrega comentario: "Aprobado. María es la nueva contadora principal."
8. Confirma la aprobación

**Día 1 - 14:30 PM:**  
El Jefe de RRHH recibe notificación similar y aprueba la solicitud después de verificar que María está en nómina activa.

**Día 2 - 09:00 AM:**  
El Jefe de TI revisa la solicitud:
1. Verifica los módulos solicitados
2. Confirma que los permisos son apropiados para el cargo
3. Valida que no hay conflictos de seguridad
4. Aprueba la solicitud
5. Agrega comentario: "Aprobado. Accesos creados en el sistema."

#### Paso 6: Notificación Final

María recibe un correo:

```
Asunto: Solicitud Aprobada - SA-2024-00456

Estimada María López,

Tu solicitud de acceso ha sido APROBADA.

Detalles:
- ID: SA-2024-00456
- Estado: Aprobado
- Fecha de aprobación: 2024-11-27 09:15:00

Tus credenciales de acceso:
- Usuario: maria.lopez
- Contraseña temporal: TempMariaL2024!

IMPORTANTE: Debes cambiar tu contraseña temporal en el primer inicio de sesión.

Accede al sistema en: https://sistema.hospital.com
```

#### Paso 7: Primer Acceso al Sistema Institucional

María accede al sistema institucional:
1. Ingresa usuario: `maria.lopez`
2. Ingresa contraseña temporal: `TempMariaL2024!`
3. El sistema solicita cambio de contraseña
4. Ingresa nueva contraseña segura
5. Accede exitosamente a los módulos aprobados

**Resultado Final:**
- ✅ Solicitud completada en 2 días
- ✅ Todas las firmas obtenidas
- ✅ Accesos creados correctamente
- ✅ Usuario operativo

---

### Caso 2: Solicitud de Acceso para Médico Especialista

**Contexto:**  
Dr. Carlos Martínez es un médico internista que se incorpora al servicio de hospitalización y requiere acceso a la Historia Clínica Electrónica.

**Actores:**
- Dr. Carlos Martínez (Solicitante)
- Jefe de Medicina Interna (Aprobador)
- Coordinadora de Enfermería (Aprobador)
- Jefe de TI Médica (Aprobador)
- Comité de Historias Clínicas (Aprobador final)

**Flujo Completo:**

#### Paso 1: Registro y Perfil

El Dr. Martínez:
1. Se registra en HEFESTO
2. Completa su perfil con datos profesionales
3. Adjunta copia de su registro médico

#### Paso 2: Crear Solicitud Asistencial

Navega a **Registro → Usuario Asistencial**:

**Información del Solicitante:**
```
Nombre Completo: Dr. Carlos Alberto Martínez Gómez
Cédula: 9876543210
Registro/Código: RM-2024-001
Especialidad: Medicina Interna
Correo Electrónico: carlos.martinez@hospital.com
Celular: 3209876543
Área de Servicio: Hospitalización - Piso 3
Tipo de Vinculación: Planta
```

**Capacitación:**
```
✅ Sí, ha recibido capacitación completa
Fecha de capacitación: 2024-11-20
Instructor: Dra. Ana Gómez (Jefe de TI Médica)
Duración: 8 horas
```

**Recursos Solicitados:**
- ✅ Terminal de consulta (Cantidad: 1)
- ✅ Tablet para rondas (Cantidad: 1)
- ✅ Acceso móvil
- ☐ Lector de código de barras
- ☐ Impresora de etiquetas

**Aceptación de Responsabilidad:**
✅ Acepta términos de confidencialidad HIPAA  
✅ Acepta uso ético de historia clínica  
✅ Acepta responsabilidad profesional

#### Paso 3: Flujo de Aprobaciones Específico

**Día 1:**
- Jefe de Medicina Interna aprueba (verifica especialidad y área)
- Coordinadora de Enfermería aprueba (coordina recursos)

**Día 2:**
- Jefe de TI Médica aprueba (verifica capacitación completada)

**Día 3:**
- Comité de Historias Clínicas revisa y aprueba en reunión semanal

#### Paso 4: Configuración de Accesos

Una vez aprobado:
1. TI crea usuario en sistema HCE
2. Asigna tablet con código QR
3. Configura acceso móvil
4. Programa sesión de inducción

#### Paso 5: Inducción Final

El Dr. Martínez asiste a sesión de inducción:
- Revisión de políticas de uso
- Práctica con casos de prueba
- Configuración de firma electrónica médica
- Validación de accesos

**Resultado:**
- ✅ Acceso completo a HCE
- ✅ Tablet configurada
- ✅ App móvil instalada
- ✅ Firma electrónica activa
- ✅ Listo para atender pacientes

---

### Caso 3: Rechazo y Corrección de Solicitud

**Contexto:**  
Juan Pérez solicita acceso a módulos financieros pero su solicitud tiene errores y es rechazada.

**Flujo:**

#### Paso 1: Solicitud Inicial

Juan crea solicitud SA-2024-00789 solicitando:
- Módulo de Tesorería
- Módulo de Facturación
- Nivel de acceso: N3 (Avanzado)

#### Paso 2: Rechazo

El Jefe de Finanzas revisa y encuentra problemas:
- Juan es auxiliar, no requiere nivel N3
- No tiene capacitación en facturación
- Falta justificación del jefe inmediato

**Acción:**
1. Hace clic en **"Rechazar"**
2. Agrega comentario detallado:
```
Motivo de Rechazo:
1. El nivel N3 es solo para jefes de área. Como auxiliar, corresponde nivel N1.
2. No se evidencia capacitación en módulo de facturación.
3. Falta aprobación del jefe inmediato.

Por favor corrija estos puntos y vuelva a enviar la solicitud.
```
3. Confirma el rechazo

#### Paso 3: Notificación a Juan

Juan recibe correo:
```
Asunto: Solicitud Rechazada - SA-2024-00789

Tu solicitud ha sido RECHAZADA.

Motivos:
[Comentario del aprobador]

Acciones requeridas:
1. Corregir los puntos mencionados
2. Crear nueva solicitud con la información correcta
3. Obtener aprobación previa del jefe inmediato
```

#### Paso 4: Corrección

Juan:
1. Habla con su jefe inmediato
2. Obtiene aprobación verbal
3. Se inscribe en capacitación de facturación
4. Crea nueva solicitud SA-2024-00812 con:
   - Nivel N1 (Básico)
   - Solo módulo de Tesorería
   - Carta de aprobación del jefe adjunta
   - Certificado de capacitación adjunto

#### Paso 5: Aprobación

La nueva solicitud es revisada y aprobada sin problemas.

**Lecciones Aprendidas:**
- Verificar requisitos antes de solicitar
- Consultar con jefe inmediato
- Completar capacitaciones necesarias
- Solicitar nivel de acceso apropiado al cargo

---

## Tutoriales Paso a Paso

### Tutorial 1: Cómo Exportar Reportes Personalizados

**Objetivo:** Generar un reporte Excel con todas las solicitudes aprobadas del último mes.

**Requisitos:**
- Rol: Administrador
- Permisos: Acceso a módulo de reportes

**Pasos:**

#### 1. Acceder al Módulo de Reportes

```
Menú Lateral → Control → Reportes
```

#### 2. Configurar Filtros

**Filtro por Estado:**
- Selecciona: ✅ Aprobadas
- Deselecciona: ☐ Pendientes, ☐ Rechazadas, ☐ En Revisión

**Filtro por Fecha:**
- Tipo: Rango personalizado
- Desde: 2024-10-01
- Hasta: 2024-10-31

**Filtro por Tipo:**
- ✅ Solicitudes Administrativas
- ✅ Solicitudes Asistenciales

#### 3. Seleccionar Campos a Exportar

Marca los campos que deseas incluir:
- ✅ ID de Solicitud
- ✅ Nombre Completo
- ✅ Cédula
- ✅ Cargo
- ✅ Área de Servicio
- ✅ Fecha de Solicitud
- ✅ Fecha de Aprobación
- ✅ Módulos Solicitados
- ✅ Usuario Creador
- ☐ Firmas (opcional)
- ☐ Historial Completo (opcional)

#### 4. Configurar Formato de Exportación

**Formato:** Excel (.xlsx)

**Opciones:**
- ✅ Incluir encabezados
- ✅ Aplicar formato de tabla
- ✅ Incluir totales
- ☐ Incluir gráficos
- ✅ Ajustar columnas automáticamente

**Nombre del archivo:**
```
Solicitudes_Aprobadas_Octubre_2024
```

#### 5. Generar Reporte

Haz clic en **"Generar Reporte"**

El sistema:
1. Procesa los filtros
2. Consulta la base de datos
3. Genera el archivo Excel
4. Muestra vista previa

#### 6. Descargar

Haz clic en **"Descargar"**

El archivo se descarga a tu carpeta de Descargas:
```
Solicitudes_Aprobadas_Octubre_2024.xlsx
```

#### 7. Verificar Contenido

Abre el archivo Excel y verifica:
- ✅ Todas las columnas seleccionadas están presentes
- ✅ Los datos son correctos
- ✅ El formato es legible
- ✅ Los totales son precisos

**Resultado Esperado:**

Archivo Excel con estructura:

| ID | Nombre | Cédula | Cargo | Área | Fecha Solicitud | Fecha Aprobación | Módulos |
|----|--------|--------|-------|------|-----------------|------------------|---------|
| SA-2024-001 | María López | 123456 | Contador | Contabilidad | 2024-10-05 | 2024-10-07 | Contabilidad, Presupuesto |
| SA-2024-002 | Juan Pérez | 789012 | Auxiliar | RRHH | 2024-10-12 | 2024-10-15 | Nómina |
| ... | ... | ... | ... | ... | ... | ... | ... |

**Total de registros:** 45 solicitudes aprobadas

---

### Tutorial 2: Configurar Flujo de Aprobación Personalizado

**Objetivo:** Crear un flujo de aprobación específico para solicitudes del área de Sistemas.

**Requisitos:**
- Rol: Administrador
- Permisos: Gestión de configuración

**Pasos:**

#### 1. Acceder a Configuración de Flujos

```
Menú → Configuración → Flujos de Aprobación
```

#### 2. Crear Nuevo Flujo

Haz clic en **"Nuevo Flujo"**

**Información Básica:**
```
Nombre del Flujo: Aprobación Área de Sistemas
Descripción: Flujo específico para solicitudes de personal de TI
Tipo de Solicitud: Administrativa
Estado: Activo
```

#### 3. Definir Condiciones de Activación

**¿Cuándo se aplica este flujo?**

Condiciones:
- Campo: Área de Servicio
- Operador: Contiene
- Valor: "Sistemas" O "TI" O "Tecnología"

```javascript
// Lógica de activación
if (solicitud.area_servicio.includes("Sistemas") || 
    solicitud.area_servicio.includes("TI") ||
    solicitud.area_servicio.includes("Tecnología")) {
    aplicar_flujo = "Aprobación Área de Sistemas";
}
```

#### 4. Configurar Pasos de Aprobación

**Paso 1: Jefe Inmediato**
```
Cargo: Jefe de Área Solicitante
Tipo: Aprobación Obligatoria
Tiempo límite: 2 días hábiles
Acción si expira: Notificar escalamiento
```

**Paso 2: Jefe de Sistemas**
```
Cargo: Jefe de Sistemas
Tipo: Aprobación Obligatoria
Tiempo límite: 1 día hábil
Acción si expira: Aprobar automáticamente
```

**Paso 3: Seguridad de la Información**
```
Cargo: Oficial de Seguridad
Tipo: Aprobación Obligatoria
Tiempo límite: 3 días hábiles
Acción si expira: Notificar escalamiento
```

**Paso 4: Director de TI** (Condicional)
```
Cargo: Director de TI
Tipo: Aprobación Condicional
Condición: Si solicita módulos críticos (Facturación, Nómina, Tesorería)
Tiempo límite: 2 días hábiles
```

#### 5. Configurar Notificaciones

**Notificaciones Automáticas:**

Para cada paso:
- ✅ Email al aprobador cuando le llega la solicitud
- ✅ Email de recordatorio 1 día antes de expirar
- ✅ Email de escalamiento si expira
- ✅ Email al solicitante cuando se aprueba/rechaza

**Plantilla de Email:**
```
Asunto: Solicitud de Aprobación - {ID_SOLICITUD}

Estimado/a {NOMBRE_APROBADOR},

Tiene una solicitud pendiente de aprobación:

Solicitante: {NOMBRE_SOLICITANTE}
Área: {AREA_SERVICIO}
Módulos: {MODULOS_SOLICITADOS}

Por favor revise en: {LINK_SOLICITUD}

Tiempo límite: {FECHA_LIMITE}
```

#### 6. Configurar Acciones Automáticas

**Al Aprobar Todos los Pasos:**
- ✅ Cambiar estado a "Aprobado"
- ✅ Enviar email al solicitante
- ✅ Crear usuario en sistema (si está integrado)
- ✅ Registrar en auditoría

**Al Rechazar Cualquier Paso:**
- ✅ Cambiar estado a "Rechazado"
- ✅ Enviar email al solicitante con motivo
- ✅ Registrar en auditoría
- ✅ Notificar a aprobadores anteriores

#### 7. Probar el Flujo

**Crear Solicitud de Prueba:**
1. Crea una solicitud con Área = "Sistemas"
2. Verifica que se active el flujo correcto
3. Simula aprobaciones en cada paso
4. Verifica notificaciones
5. Confirma que las acciones automáticas funcionan

#### 8. Activar en Producción

Una vez probado:
1. Haz clic en **"Activar Flujo"**
2. Confirma la activación
3. El flujo estará disponible para solicitudes reales

**Resultado:**
- ✅ Flujo personalizado creado
- ✅ Condiciones configuradas
- ✅ Notificaciones automáticas
- ✅ Acciones automáticas
- ✅ Probado y activo

---

### Tutorial 3: Gestión de Firmas Electrónicas Masivas

**Objetivo:** Aprobar múltiples solicitudes pendientes de manera eficiente.

**Escenario:** Tienes 20 solicitudes pendientes de tu firma como Jefe de RRHH.

**Pasos:**

#### 1. Acceder a Firmas Pendientes

```
Menú → Control → Firmas Pendientes
```

El sistema muestra todas las solicitudes que requieren tu firma.

#### 2. Filtrar Solicitudes

**Filtros Disponibles:**
- Por fecha (más antiguas primero)
- Por área de servicio
- Por tipo de solicitud
- Por urgencia

**Aplicar Filtro:**
```
Ordenar por: Fecha (más antiguas primero)
Tipo: Todas
Área: Todas
```

#### 3. Revisión Rápida

Para cada solicitud, el sistema muestra:
- ID y nombre del solicitante
- Cargo y área
- Módulos solicitados
- Fecha de solicitud
- Días pendientes

**Vista de Lista:**
```
┌─────────────┬──────────────────┬─────────────┬──────────┐
│ ID          │ Solicitante      │ Cargo       │ Días     │
├─────────────┼──────────────────┼─────────────┼──────────┤
│ SA-2024-100 │ Ana García       │ Auxiliar    │ 5 días   │
│ SA-2024-101 │ Pedro Ruiz       │ Contador    │ 4 días   │
│ SA-2024-102 │ Laura Díaz       │ Enfermera   │ 3 días   │
└─────────────┴──────────────────┴─────────────┴──────────┘
```

#### 4. Selección Múltiple

**Opción A: Seleccionar Todas**
- Checkbox en encabezado: ✅ Seleccionar todas (20)

**Opción B: Selección Individual**
- Marca solo las que deseas aprobar
- Ejemplo: 15 de 20 seleccionadas

**Opción C: Selección por Criterio**
- Seleccionar todas del área de Contabilidad
- Seleccionar todas con más de 3 días pendientes

#### 5. Revisión Detallada (Opcional)

Para solicitudes que requieren revisión especial:
1. Haz clic en el ID
2. Revisa información completa
3. Verifica documentos adjuntos
4. Vuelve a la lista

#### 6. Aprobación Masiva

**Método 1: Aprobación Simple**
1. Con solicitudes seleccionadas
2. Haz clic en **"Aprobar Seleccionadas"**
3. Confirma la acción
4. El sistema procesa todas

**Método 2: Aprobación con Comentario**
1. Selecciona solicitudes
2. Haz clic en **"Aprobar con Comentario"**
3. Ingresa comentario general:
```
"Aprobado. Verificado cumplimiento de requisitos de RRHH."
```
4. El comentario se aplica a todas
5. Confirma

**Método 3: Aprobación con Firma Digital**
1. Selecciona solicitudes
2. Haz clic en **"Firmar Digitalmente"**
3. Ingresa tu credencial de firma:
```
Credencial: RRHH-001
PIN: ****
```
4. El sistema captura tu firma
5. Aplica a todas las seleccionadas
6. Confirma

#### 7. Confirmación

El sistema muestra:
```
✓ Aprobación Masiva Exitosa

Solicitudes aprobadas: 15
Solicitudes pendientes: 5
Tiempo total: 2 minutos

Detalles:
- SA-2024-100: Aprobado ✓
- SA-2024-101: Aprobado ✓
- SA-2024-102: Aprobado ✓
...

Notificaciones enviadas a solicitantes.
```

#### 8. Gestionar Pendientes

Para las 5 solicitudes no aprobadas:
1. Revisa individualmente
2. Solicita información adicional
3. Rechaza con motivo específico
4. O deja pendiente para después

**Resultado:**
- ✅ 15 solicitudes aprobadas en 2 minutos
- ✅ Firmas registradas correctamente
- ✅ Notificaciones enviadas
- ✅ Historial actualizado
- ✅ Proceso eficiente

---

## Escenarios Comunes y Soluciones

### Escenario 1: Usuario Olvidó su Contraseña

**Situación:**  
Un usuario no puede iniciar sesión porque olvidó su contraseña.

**Solución como Usuario:**

#### Opción A: Recuperación Automática

1. En la pantalla de login, haz clic en **"¿Olvidaste tu contraseña?"**
2. Ingresa tu correo electrónico registrado
3. Haz clic en **"Enviar enlace de recuperación"**
4. Revisa tu correo (puede tardar hasta 5 minutos)
5. Haz clic en el enlace recibido
6. Ingresa nueva contraseña
7. Confirma nueva contraseña
8. Haz clic en **"Restablecer Contraseña"**
9. Inicia sesión con la nueva contraseña

**Email Recibido:**
```
Asunto: Restablecimiento de Contraseña - HEFESTO

Hola [Nombre],

Recibimos una solicitud para restablecer tu contraseña.

Haz clic en el siguiente enlace para crear una nueva contraseña:
[ENLACE DE RESTABLECIMIENTO]

Este enlace expira en 1 hora.

Si no solicitaste este cambio, ignora este correo.
```

#### Opción B: Contactar Administrador

Si no recibes el correo:
1. Contacta al administrador del sistema
2. Proporciona tu nombre y correo registrado
3. El administrador restablecerá tu contraseña
4. Recibirás una contraseña temporal
5. Cambia la contraseña en el primer inicio de sesión

**Solución como Administrador:**

1. Ve a **Configuración → Usuarios**
2. Busca el usuario
3. Haz clic en **"Restablecer Contraseña"**
4. Genera contraseña temporal
5. Copia la contraseña
6. Envía al usuario por canal seguro (email o llamada)
7. Marca **"Requerir cambio en próximo login"**

---

### Escenario 2: Solicitud Urgente Requiere Aprobación Rápida

**Situación:**  
Un nuevo médico debe empezar a trabajar mañana pero su solicitud aún no ha sido aprobada.

**Solución:**

#### Paso 1: Identificar la Solicitud

1. Contacta al administrador
2. Proporciona ID de solicitud o nombre del médico
3. Explica la urgencia

#### Paso 2: Escalamiento (Administrador)

El administrador:
1. Localiza la solicitud
2. Verifica el estado actual
3. Identifica aprobadores pendientes
4. Contacta directamente a los aprobadores

**Contacto Directo:**
```
Llamada telefónica o mensaje directo:
"Hola [Aprobador], tenemos una solicitud urgente SA-2024-XXX 
que requiere tu aprobación hoy. El médico inicia mañana. 
¿Puedes revisarla ahora?"
```

#### Paso 3: Aprobación Expedita

Los aprobadores:
1. Revisan la solicitud inmediatamente
2. Aprueban si cumple requisitos
3. O solicitan información faltante urgente

#### Paso 4: Activación Inmediata

Una vez aprobada:
1. TI crea accesos inmediatamente
2. Configura credenciales
3. Notifica al médico
4. Programa inducción express

#### Paso 5: Seguimiento

Al día siguiente:
1. Verificar que el médico pudo acceder
2. Confirmar que todo funciona
3. Programar capacitación completa posterior

**Resultado:**
- ✅ Solicitud aprobada en horas
- ✅ Accesos creados el mismo día
- ✅ Médico puede trabajar al día siguiente
- ✅ Capacitación programada

---

### Escenario 3: Error en Datos de Solicitud Aprobada

**Situación:**  
Una solicitud fue aprobada pero tiene un error en el nombre del usuario o en los módulos asignados.

**Solución:**

#### Paso 1: Identificar el Error

Usuario o administrador detecta:
```
Error encontrado:
Nombre en solicitud: "María Lópes" (error tipográfico)
Nombre correcto: "María López"

O

Módulos aprobados: Contabilidad, Nómina
Módulos requeridos: Contabilidad, Presupuesto
```

#### Paso 2: Reportar el Error

**Como Usuario:**
1. Contacta al administrador
2. Proporciona ID de solicitud
3. Describe el error
4. Proporciona datos correctos

**Como Administrador:**
1. Verifica el error en el sistema
2. Confirma con el usuario
3. Documenta el cambio necesario

#### Paso 3: Corrección (Administrador)

**Opción A: Edición Directa** (si está permitido)
1. Ve a la solicitud
2. Haz clic en **"Editar"**
3. Corrige los datos erróneos
4. Agrega nota en historial:
```
"Corrección realizada: Nombre actualizado de 'María Lópes' a 'María López'.
Solicitado por: Usuario
Fecha: 2024-11-26
Autorizado por: Admin"
```
5. Guarda cambios

**Opción B: Crear Solicitud de Modificación**
1. Crea nueva solicitud de tipo "Modificación"
2. Referencia la solicitud original
3. Indica los cambios requeridos
4. Pasa por flujo de aprobación simplificado

#### Paso 4: Actualizar Sistemas Externos

Si los accesos ya fueron creados:
1. Actualiza el nombre en el sistema institucional
2. Modifica los módulos asignados
3. Verifica que los cambios se aplicaron
4. Notifica al usuario

#### Paso 5: Documentación

Registra en historial:
```
Modificación post-aprobación:
- Campo modificado: Nombre completo
- Valor anterior: María Lópes
- Valor nuevo: María López
- Motivo: Error tipográfico
- Autorizado por: Admin
- Fecha: 2024-11-26 10:30:00
```

**Resultado:**
- ✅ Error corregido
- ✅ Sistemas actualizados
- ✅ Cambio documentado
- ✅ Usuario notificado

---

## Mejores Prácticas

### Para Usuarios

#### 1. Completar Solicitudes Correctamente

**✅ Hacer:**
- Verificar todos los datos antes de enviar
- Usar nombres completos y oficiales
- Proporcionar números de contacto actualizados
- Seleccionar solo los módulos realmente necesarios
- Leer y entender la carta de responsabilidad

**❌ Evitar:**
- Enviar solicitudes con datos incompletos
- Usar abreviaturas o apodos
- Solicitar accesos "por si acaso"
- Enviar sin revisar
- Dejar campos opcionales importantes vacíos

#### 2. Seguimiento Proactivo

**✅ Hacer:**
- Revisar el estado de tus solicitudes regularmente
- Responder rápidamente a solicitudes de información
- Notificar cambios en tu situación laboral
- Mantener actualizado tu perfil

**❌ Evitar:**
- Esperar pasivamente sin hacer seguimiento
- Ignorar correos de notificación
- No actualizar información de contacto

#### 3. Comunicación Efectiva

**✅ Hacer:**
- Usar el sistema de comentarios para aclaraciones
- Contactar al administrador si hay urgencias
- Proporcionar contexto cuando sea necesario
- Ser claro y conciso en las comunicaciones

**❌ Evitar:**
- Enviar múltiples solicitudes duplicadas
- Usar canales informales para temas formales
- Ser impaciente o descortés

#### 4. Seguridad

**✅ Hacer:**
- Cambiar contraseñas temporales inmediatamente
- Usar contraseñas fuertes y únicas
- Cerrar sesión al terminar
- Reportar actividad sospechosa

**❌ Evitar:**
- Compartir contraseñas
- Dejar sesiones abiertas en computadoras públicas
- Usar contraseñas débiles
- Ignorar alertas de seguridad

---

### Para Administradores

#### 1. Gestión de Aprobaciones

**✅ Hacer:**
- Revisar solicitudes diariamente
- Aprobar/rechazar en tiempo razonable (máximo 48 horas)
- Proporcionar comentarios claros en rechazos
- Documentar decisiones importantes
- Mantener comunicación con solicitantes

**❌ Evitar:**
- Dejar solicitudes pendientes por semanas
- Rechazar sin explicación
- Aprobar sin revisar
- Ignorar solicitudes urgentes

#### 2. Configuración del Sistema

**✅ Hacer:**
- Revisar y actualizar flujos de aprobación periódicamente
- Mantener credenciales de firma actualizadas
- Configurar notificaciones apropiadas
- Documentar cambios en configuración
- Hacer respaldos antes de cambios importantes

**❌ Evitar:**
- Cambiar configuraciones sin probar
- Eliminar flujos en uso
- Modificar sin documentar
- Ignorar errores de configuración

#### 3. Gestión de Usuarios

**✅ Hacer:**
- Revisar permisos de usuarios regularmente
- Desactivar usuarios que ya no laboran
- Mantener roles actualizados
- Auditar accesos periódicamente
- Capacitar nuevos usuarios

**❌ Evitar:**
- Mantener usuarios inactivos con acceso
- Otorgar permisos excesivos
- No revisar logs de auditoría
- Ignorar reportes de problemas

#### 4. Reportes y Auditoría

**✅ Hacer:**
- Generar reportes mensuales
- Revisar logs de auditoría
- Identificar patrones y tendencias
- Documentar incidentes
- Compartir métricas con dirección

**❌ Evitar:**
- Ignorar datos de auditoría
- No generar reportes periódicos
- Ocultar problemas
- No analizar tendencias

#### 5. Soporte a Usuarios

**✅ Hacer:**
- Responder consultas rápidamente
- Proporcionar capacitación cuando sea necesario
- Documentar problemas comunes
- Crear guías y tutoriales
- Ser paciente y empático

**❌ Evitar:**
- Ignorar solicitudes de ayuda
- Ser condescendiente
- No documentar soluciones
- Culpar al usuario por errores

---

## Gestión Avanzada de Solicitudes

### Aprobaciones Condicionales

**Concepto:**  
Aprobaciones que se activan solo si se cumplen ciertas condiciones.

**Ejemplo 1: Aprobación por Monto**

```
Si módulos solicitados incluyen "Tesorería" O "Facturación":
    Requiere aprobación adicional de:
    - Subgerente Financiero
    - Auditor Interno
```

**Configuración:**
1. Ve a **Configuración → Flujos de Aprobación**
2. Edita el flujo deseado
3. Agrega paso condicional:
```
Nombre: Aprobación Financiera
Condición: modulos.includes("Tesorería") || modulos.includes("Facturación")
Aprobador: Subgerente Financiero
Obligatorio: Sí
```

**Ejemplo 2: Aprobación por Nivel de Acceso**

```
Si nivel_anexos == "N3":
    Requiere aprobación de:
    - Director de Área
    - Comité de Seguridad
```

### Delegación de Aprobaciones

**Escenario:**  
Un aprobador estará de vacaciones y necesita delegar sus aprobaciones.

**Proceso:**

#### 1. Configurar Delegación

El aprobador:
1. Ve a **Perfil → Delegaciones**
2. Haz clic en **"Nueva Delegación"**
3. Completa:
```
Delegar a: Juan Pérez (Subjefe)
Desde: 2024-12-01
Hasta: 2024-12-15
Tipo: Todas las aprobaciones
Notificar: Sí
```
4. Guarda

#### 2. Activación

Durante el período de delegación:
- Todas las solicitudes que requieren aprobación del titular
- Se envían automáticamente al delegado
- El delegado recibe notificaciones
- Las aprobaciones quedan registradas como "Aprobado por [Delegado] en nombre de [Titular]"

#### 3. Finalización

Al regresar:
- La delegación expira automáticamente
- Las aprobaciones vuelven al titular
- Se genera reporte de aprobaciones delegadas

### Aprobaciones en Paralelo vs. Secuenciales

**Aprobaciones Secuenciales:**
```
Paso 1: Jefe Inmediato
    ↓ (solo si aprueba)
Paso 2: Jefe de RRHH
    ↓ (solo si aprueba)
Paso 3: Jefe de TI
    ↓ (solo si aprueba)
Aprobado
```

**Ventajas:**
- Control estricto del flujo
- Cada aprobador ve decisión anterior
- Proceso ordenado

**Desventajas:**
- Más lento
- Un rechazo detiene todo

**Aprobaciones en Paralelo:**
```
Paso 1: ┌─ Jefe Inmediato
         ├─ Jefe de RRHH
         └─ Jefe de TI
              ↓ (cuando todos aprueban)
         Aprobado
```

**Ventajas:**
- Más rápido
- Aprobadores trabajan simultáneamente

**Desventajas:**
- Menos control
- Posibles conflictos

**Configuración Mixta:**
```
Paso 1: Jefe Inmediato (secuencial)
    ↓
Paso 2: ┌─ Jefe de RRHH    ┐
         └─ Jefe de TI      ┘ (paralelo)
              ↓
Paso 3: Director (secuencial)
    ↓
Aprobado
```

---

## Workflows Completos Documentados

### Workflow 1: Onboarding de Nuevo Empleado

**Objetivo:** Proceso completo desde la contratación hasta el acceso operativo.

**Participantes:**
- RRHH (Recursos Humanos)
- Jefe de Área
- TI (Tecnología de la Información)
- Nuevo Empleado

**Duración Estimada:** 3-5 días hábiles

#### Fase 1: Pre-registro (Día -1)

**Responsable:** RRHH

**Actividades:**
1. Recibir documentación del nuevo empleado
2. Verificar contrato firmado
3. Crear expediente en sistema de RRHH
4. Notificar a Jefe de Área sobre fecha de ingreso
5. Enviar email de bienvenida con información básica

**Documentos Requeridos:**
- Copia de cédula
- Hoja de vida
- Certificados de estudio
- Exámenes médicos
- Contrato firmado

**Checklist Pre-registro:**
```
☐ Documentación completa recibida
☐ Expediente creado en sistema RRHH
☐ Jefe de Área notificado
☐ Email de bienvenida enviado
☐ Fecha de ingreso confirmada
```

#### Fase 2: Registro en HEFESTO (Día 1 - Mañana)

**Responsable:** Jefe de Área o RRHH

**Paso 1: Crear cuenta de usuario**
1. Acceder a HEFESTO
2. Ir a **Registro → Usuario Administrativo** (o Asistencial según el caso)
3. Completar formulario con datos del nuevo empleado
4. Generar credenciales temporales
5. Guardar solicitud

**Datos a Ingresar:**
```
Información Personal:
- Nombre completo: [Según cédula]
- Cédula: [Número de identificación]
- Cargo: [Según contrato]
- Área: [Departamento asignado]
- Teléfono: [Contacto]
- Email: [Correo institucional]

Accesos Requeridos:
- Módulos: [Según perfil del cargo]
- Nivel de acceso: [Según responsabilidades]
- Permisos especiales: [Si aplica]

Credenciales:
- Usuario: [nombre.apellido]
- Contraseña temporal: [Generada automáticamente]
```

**Paso 2: Adjuntar documentación**
- Copia de cédula (PDF)
- Contrato firmado (PDF)
- Certificado de capacitación (si aplica)

#### Fase 3: Aprobaciones (Día 1-2)

**Flujo de Aprobación Estándar:**

**Aprobación 1: Jefe Inmediato**
- Tiempo: 2-4 horas
- Verifica: Cargo, área, módulos solicitados
- Acción: Aprobar/Rechazar/Solicitar modificaciones

**Aprobación 2: RRHH**
- Tiempo: 2-4 horas
- Verifica: Vinculación activa, contrato vigente
- Acción: Aprobar/Rechazar

**Aprobación 3: TI**
- Tiempo: 4-8 horas
- Verifica: Disponibilidad de recursos, seguridad
- Acción: Aprobar y crear accesos

**Notificaciones Automáticas:**
```
Para cada aprobación:
- Email al aprobador
- Recordatorio a las 24 horas si no hay respuesta
- Escalamiento a las 48 horas
- Notificación al solicitante cuando se aprueba/rechaza
```

#### Fase 4: Creación de Accesos (Día 2-3)

**Responsable:** TI

**Actividades:**
1. Crear usuario en Active Directory
2. Asignar grupos de seguridad
3. Crear buzón de correo electrónico
4. Configurar acceso a módulos aprobados
5. Asignar recursos físicos (PC, teléfono, etc.)
6. Generar credenciales de acceso
7. Documentar en inventario de TI

**Recursos Asignados:**
```
Hardware:
☐ Computador de escritorio/portátil
☐ Monitor(es)
☐ Teclado y mouse
☐ Teléfono IP (extensión)
☐ Tablet (si aplica)

Software:
☐ Sistema operativo
☐ Office 365
☐ Módulos institucionales
☐ VPN (si requiere acceso remoto)
☐ Aplicaciones específicas del cargo

Accesos:
☐ Email institucional
☐ Intranet
☐ Sistemas administrativos
☐ Sistemas asistenciales (si aplica)
```

#### Fase 5: Inducción y Capacitación (Día 3)

**Responsable:** Jefe de Área + TI

**Inducción General (2 horas):**
1. Bienvenida institucional
2. Presentación del equipo
3. Tour por las instalaciones
4. Entrega de manual del empleado
5. Explicación de políticas y procedimientos

**Capacitación en Sistemas (2-3 horas):**
1. Entrega de credenciales
2. Primer inicio de sesión
3. Cambio de contraseña temporal
4. Navegación por módulos asignados
5. Funcionalidades básicas
6. Políticas de seguridad
7. Contactos de soporte

**Material Entregado:**
```
☐ Credenciales de acceso (sobre sellado)
☐ Manual de usuario de sistemas
☐ Políticas de seguridad informática
☐ Directorio telefónico
☐ Organigrama del área
☐ Procedimientos del cargo
```

#### Fase 6: Seguimiento (Día 4-5)

**Responsable:** Jefe de Área

**Actividades:**
1. Verificar que el empleado puede acceder a todos los sistemas
2. Resolver dudas o problemas de acceso
3. Confirmar que los permisos son correctos
4. Programar capacitaciones adicionales si es necesario
5. Registrar en sistema de onboarding

**Checklist de Verificación:**
```
☐ Empleado puede iniciar sesión en todos los sistemas
☐ Permisos funcionan correctamente
☐ Email operativo
☐ Acceso a módulos requeridos
☐ Sin problemas reportados
☐ Capacitación completada
☐ Documentación firmada
```

#### Fase 7: Cierre del Proceso (Día 5)

**Responsable:** RRHH

**Actividades:**
1. Confirmar que todos los pasos se completaron
2. Archivar documentación
3. Actualizar expediente del empleado
4. Cerrar solicitud en HEFESTO
5. Generar reporte de onboarding

**Reporte Final:**
```
REPORTE DE ONBOARDING

Empleado: [Nombre completo]
Cargo: [Cargo asignado]
Área: [Departamento]
Fecha de ingreso: [DD/MM/YYYY]

Proceso completado: ✓
Duración total: [X días]

Accesos creados:
- Email: ✓
- Sistemas administrativos: ✓
- Sistemas asistenciales: ✓ (si aplica)

Capacitaciones:
- Inducción general: ✓
- Capacitación en sistemas: ✓
- Capacitación específica del cargo: ✓

Observaciones:
[Cualquier nota relevante]

Responsable RRHH: [Nombre]
Fecha de cierre: [DD/MM/YYYY]
```

---

### Workflow 2: Offboarding de Empleado

**Objetivo:** Proceso ordenado de desvinculación y revocación de accesos.

**Participantes:**
- RRHH
- Jefe de Área
- TI
- Empleado saliente

**Duración:** 1-3 días

#### Fase 1: Notificación de Desvinculación

**Responsable:** RRHH

**Actividades:**
1. Recibir carta de renuncia o notificación de terminación
2. Registrar fecha de retiro en sistema
3. Notificar a Jefe de Área
4. Notificar a TI
5. Programar entrevista de salida

**Información Requerida:**
```
- Nombre del empleado
- Fecha de retiro
- Motivo (renuncia/terminación/jubilación)
- Último día laboral
- Pendientes de entrega
```

#### Fase 2: Inventario y Entrega (Último día laboral)

**Responsable:** Jefe de Área + TI

**Checklist de Entrega:**
```
Equipos:
☐ Computador
☐ Monitor(es)
☐ Teclado y mouse
☐ Teléfono IP
☐ Tablet/celular institucional
☐ Llaves de oficina
☐ Tarjeta de acceso
☐ Uniformes (si aplica)

Documentación:
☐ Manuales
☐ Documentos confidenciales
☐ Archivos físicos del área
☐ Firma de paz y salvo

Información:
☐ Transferencia de conocimiento
☐ Entrega de proyectos en curso
☐ Passwords de cuentas compartidas
☐ Contactos importantes
```

#### Fase 3: Revocación de Accesos

**Responsable:** TI

**Proceso de Desactivación:**

**Inmediato (Último día laboral):**
1. Desactivar cuenta de Active Directory
2. Revocar acceso a sistemas institucionales
3. Desactivar email (redirigir a jefe de área)
4. Revocar acceso VPN
5. Desactivar teléfono IP
6. Revocar acceso físico (tarjetas)

**Comando de Desactivación:**
```powershell
# Desactivar usuario en AD
Disable-ADAccount -Identity "usuario.apellido"

# Mover a OU de usuarios inactivos
Move-ADObject -Identity "CN=Usuario Apellido,OU=Usuarios,DC=hospital,DC=com" `
              -TargetPath "OU=Usuarios Inactivos,DC=hospital,DC=com"

# Revocar membresías de grupos
Get-ADUser "usuario.apellido" -Properties MemberOf | 
    ForEach-Object { $_.MemberOf | Remove-ADGroupMember -Members $_.DistinguishedName }

# Ocultar de lista global de direcciones
Set-ADUser "usuario.apellido" -Replace @{msExchHideFromAddressLists=$true}
```

**En HEFESTO:**
1. Ir a **Configuración → Usuarios**
2. Buscar el usuario
3. Cambiar estado a "Inactivo"
4. Agregar nota: "Desvinculado - Fecha: [DD/MM/YYYY]"
5. Revocar todas las credenciales de firma
6. Archivar solicitudes asociadas

**Después de 30 días:**
- Eliminar buzón de correo (después de backup)
- Eliminar archivos personales
- Liberar licencias de software
- Actualizar inventario

#### Fase 4: Documentación y Cierre

**Responsable:** RRHH

**Actividades:**
1. Confirmar que todos los accesos fueron revocados
2. Verificar entrega de equipos
3. Procesar paz y salvo
4. Archivar documentación
5. Generar reporte de offboarding

**Reporte de Offboarding:**
```
REPORTE DE OFFBOARDING

Empleado: [Nombre completo]
Cargo: [Cargo que ocupaba]
Fecha de retiro: [DD/MM/YYYY]
Motivo: [Renuncia/Terminación/Otro]

Accesos revocados:
- Active Directory: ✓ [Fecha]
- Email: ✓ [Fecha]
- Sistemas institucionales: ✓ [Fecha]
- Acceso físico: ✓ [Fecha]

Equipos entregados:
- Computador: ✓
- Teléfono: ✓
- Otros: ✓

Paz y salvo: ✓
Entrevista de salida: ✓

Observaciones:
[Notas relevantes]

Responsable: [Nombre RRHH]
Fecha de cierre: [DD/MM/YYYY]
```

---

## Integración con Sistemas Externos

### Integración con Active Directory

**Objetivo:** Sincronizar usuarios y permisos entre HEFESTO y Active Directory.

#### Configuración de Integración

**Requisitos:**
- Servidor AD accesible desde HEFESTO
- Credenciales de servicio con permisos de lectura/escritura
- Protocolo LDAP habilitado

**Configuración en Backend:**

```php
// config/ldap.php
return [
    'connections' => [
        'default' => [
            'hosts' => [env('LDAP_HOST', 'ldap.hospital.com')],
            'username' => env('LDAP_USERNAME', 'svc_hefesto@hospital.com'),
            'password' => env('LDAP_PASSWORD'),
            'port' => env('LDAP_PORT', 389),
            'base_dn' => env('LDAP_BASE_DN', 'DC=hospital,DC=com'),
            'timeout' => 5,
            'use_ssl' => env('LDAP_SSL', false),
            'use_tls' => env('LDAP_TLS', true),
        ],
    ],
];
```

**Variables de Entorno (.env):**
```env
LDAP_HOST=ad.hospital.com
LDAP_USERNAME=svc_hefesto@hospital.com
LDAP_PASSWORD=SecurePassword123!
LDAP_PORT=389
LDAP_BASE_DN=DC=hospital,DC=com
LDAP_SSL=false
LDAP_TLS=true
```

#### Sincronización de Usuarios

**Comando Artisan:**
```bash
php artisan ldap:sync-users
```

**Código de Sincronización:**

```php
// app/Console/Commands/SyncLdapUsers.php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use LdapRecord\Models\ActiveDirectory\User as LdapUser;
use App\Models\User;

class SyncLdapUsers extends Command
{
    protected $signature = 'ldap:sync-users';
    protected $description = 'Sincronizar usuarios desde Active Directory';

    public function handle()
    {
        $this->info('Iniciando sincronización con AD...');
        
        // Obtener usuarios de AD
        $ldapUsers = LdapUser::get();
        $synced = 0;
        $created = 0;
        $updated = 0;
        
        foreach ($ldapUsers as $ldapUser) {
            // Verificar si el usuario existe en HEFESTO
            $user = User::where('email', $ldapUser->mail[0])->first();
            
            if (!$user) {
                // Crear nuevo usuario
                $user = User::create([
                    'name' => $ldapUser->cn[0],
                    'email' => $ldapUser->mail[0],
                    'username' => $ldapUser->samaccountname[0],
                    'password' => bcrypt(Str::random(32)), // Password aleatorio
                    'cargo' => $ldapUser->title[0] ?? null,
                    'telefono' => $ldapUser->telephonenumber[0] ?? null,
                    'estado' => $ldapUser->useraccountcontrol[0] == 512 ? 'activo' : 'inactivo',
                ]);
                $created++;
            } else {
                // Actualizar usuario existente
                $user->update([
                    'name' => $ldapUser->cn[0],
                    'cargo' => $ldapUser->title[0] ?? $user->cargo,
                    'telefono' => $ldapUser->telephonenumber[0] ?? $user->telefono,
                    'estado' => $ldapUser->useraccountcontrol[0] == 512 ? 'activo' : 'inactivo',
                ]);
                $updated++;
            }
            
            $synced++;
        }
        
        $this->info("Sincronización completada:");
        $this->info("- Total procesados: {$synced}");
        $this->info("- Nuevos: {$created}");
        $this->info("- Actualizados: {$updated}");
        
        return 0;
    }
}
```

**Programar Sincronización Automática:**

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Sincronizar usuarios cada 6 horas
    $schedule->command('ldap:sync-users')
             ->everySixHours()
             ->withoutOverlapping();
}
```

#### Autenticación con AD

**Configuración:**

```php
// config/auth.php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'ldap',
    ],
],

'providers' => [
    'ldap' => [
        'driver' => 'ldap',
        'model' => LdapRecord\Models\ActiveDirectory\User::class,
        'rules' => [],
    ],
],
```

**Proceso de Login con AD:**

```php
// app/Http/Controllers/Api/AuthController.php
public function loginWithAD(Request $request)
{
    $credentials = [
        'mail' => $request->email,
        'password' => $request->password,
    ];
    
    try {
        // Intentar autenticación con AD
        if (Auth::guard('ldap')->attempt($credentials)) {
            $ldapUser = Auth::guard('ldap')->user();
            
            // Buscar o crear usuario en HEFESTO
            $user = User::firstOrCreate(
                ['email' => $ldapUser->mail[0]],
                [
                    'name' => $ldapUser->cn[0],
                    'username' => $ldapUser->samaccountname[0],
                    'password' => bcrypt(Str::random(32)),
                    'cargo' => $ldapUser->title[0] ?? null,
                ]
            );
            
            // Generar token
            $token = $user->createToken('auth-token')->plainTextToken;
            
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token,
                'auth_method' => 'active_directory',
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas',
        ], 401);
        
    } catch (\Exception $e) {
        Log::error('Error en autenticación AD: ' . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => 'Error en autenticación',
        ], 500);
    }
}
```

---

### Integración con Sistema de Correo

**Objetivo:** Enviar notificaciones automáticas por email.

#### Configuración de Email

**Variables de Entorno:**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.hospital.com
MAIL_PORT=587
MAIL_USERNAME=hefesto@hospital.com
MAIL_PASSWORD=EmailPassword123!
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=hefesto@hospital.com
MAIL_FROM_NAME="Sistema HEFESTO"
```

#### Plantillas de Email

**Notificación de Solicitud Creada:**

```php
// app/Mail/SolicitudCreada.php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\SolicitudAdministrativa;

class SolicitudCreada extends Mailable
{
    use Queueable, SerializesModels;

    public $solicitud;

    public function __construct(SolicitudAdministrativa $solicitud)
    {
        $this->solicitud = $solicitud;
    }

    public function build()
    {
        return $this->subject('Solicitud Creada - ' . $this->solicitud->id)
                    ->markdown('emails.solicitud.creada')
                    ->with([
                        'solicitud' => $this->solicitud,
                        'url' => route('solicitudes.show', $this->solicitud->id),
                    ]);
    }
}
```

**Vista Blade (resources/views/emails/solicitud/creada.blade.php):**

```blade
@component('mail::message')
# Solicitud Creada Exitosamente

Estimado/a {{ $solicitud->nombre_completo }},

Tu solicitud ha sido creada exitosamente en el sistema HEFESTO.

## Detalles de la Solicitud

**ID:** {{ $solicitud->id }}  
**Estado:** {{ $solicitud->estado }}  
**Fecha:** {{ $solicitud->fecha_solicitud->format('d/m/Y H:i') }}

**Módulos Solicitados:**
@foreach($solicitud->modulos_administrativos ?? [] as $modulo)
- {{ $modulo }}
@endforeach

## Próximos Pasos

Tu solicitud será revisada por:
1. Jefe Inmediato
2. Jefe de RRHH
3. Jefe de TI

Recibirás notificaciones por correo sobre el progreso de tu solicitud.

@component('mail::button', ['url' => $url])
Ver Solicitud
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent
```

**Envío de Email:**

```php
// En el controlador después de crear solicitud
use App\Mail\SolicitudCreada;
use Illuminate\Support\Facades\Mail;

Mail::to($solicitud->usuarioCreador->email)
    ->send(new SolicitudCreada($solicitud));
```

#### Notificaciones a Aprobadores

**Email de Aprobación Pendiente:**

```php
// app/Mail/AprobacionPendiente.php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AprobacionPendiente extends Mailable
{
    use Queueable, SerializesModels;

    public $solicitud;
    public $aprobador;

    public function __construct($solicitud, $aprobador)
    {
        $this->solicitud = $solicitud;
        $this->aprobador = $aprobador;
    }

    public function build()
    {
        return $this->subject('Solicitud Pendiente de Aprobación - ' . $this->solicitud->id)
                    ->markdown('emails.solicitud.aprobacion-pendiente')
                    ->with([
                        'solicitud' => $this->solicitud,
                        'aprobador' => $this->aprobador,
                        'url' => route('aprobaciones.show', $this->solicitud->id),
                    ]);
    }
}
```

---

## Reportes Avanzados y Analytics

### Dashboard de Métricas

**Métricas Principales:**

#### 1. Indicadores de Rendimiento (KPIs)

**Tiempo Promedio de Aprobación:**
```sql
SELECT 
    AVG(TIMESTAMPDIFF(HOUR, fecha_solicitud, updated_at)) as horas_promedio
FROM solicitudes_administrativas
WHERE estado = 'Aprobado'
AND fecha_solicitud >= DATE_SUB(NOW(), INTERVAL 30 DAY);
```

**Tasa de Aprobación:**
```sql
SELECT 
    COUNT(CASE WHEN estado = 'Aprobado' THEN 1 END) * 100.0 / COUNT(*) as tasa_aprobacion
FROM solicitudes_administrativas
WHERE fecha_solicitud >= DATE_SUB(NOW(), INTERVAL 30 DAY);
```

**Solicitudes por Estado:**
```sql
SELECT 
    estado,
    COUNT(*) as cantidad,
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM solicitudes_administrativas) as porcentaje
FROM solicitudes_administrativas
GROUP BY estado
ORDER BY cantidad DESC;
```

#### 2. Análisis de Tendencias

**Solicitudes por Mes:**
```sql
SELECT 
    DATE_FORMAT(fecha_solicitud, '%Y-%m') as mes,
    COUNT(*) as total_solicitudes,
    COUNT(CASE WHEN estado = 'Aprobado' THEN 1 END) as aprobadas,
    COUNT(CASE WHEN estado = 'Rechazado' THEN 1 END) as rechazadas,
    AVG(TIMESTAMPDIFF(HOUR, fecha_solicitud, updated_at)) as horas_promedio
FROM solicitudes_administrativas
WHERE fecha_solicitud >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY mes
ORDER BY mes DESC;
```

**Solicitudes por Área:**
```sql
SELECT 
    area_servicio,
    COUNT(*) as total,
    COUNT(CASE WHEN estado = 'Aprobado' THEN 1 END) as aprobadas,
    AVG(TIMESTAMPDIFF(DAY, fecha_solicitud, updated_at)) as dias_promedio
FROM solicitudes_administrativas
WHERE fecha_solicitud >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY area_servicio
ORDER BY total DESC
LIMIT 10;
```

#### 3. Análisis de Aprobadores

**Rendimiento de Aprobadores:**
```sql
SELECT 
    h.usuario_nombre as aprobador,
    COUNT(*) as total_aprobaciones,
    AVG(TIMESTAMPDIFF(HOUR, s.fecha_solicitud, h.created_at)) as horas_promedio,
    COUNT(CASE WHEN h.estado_nuevo = 'Aprobado' THEN 1 END) as aprobadas,
    COUNT(CASE WHEN h.estado_nuevo = 'Rechazado' THEN 1 END) as rechazadas
FROM historial_estados h
JOIN solicitudes_administrativas s ON h.solicitud_id = s.id
WHERE h.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
GROUP BY h.usuario_nombre
ORDER BY total_aprobaciones DESC;
```

### Generación de Reportes Personalizados

**Endpoint de Reportes:**

```php
// app/Http/Controllers/Api/ReporteController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SolicitudAdministrativa;
use App\Exports\SolicitudesExport;
use Maatwebsite\Excel\Facades\Excel;
use PDF;

class ReporteController extends Controller
{
    public function generarReporte(Request $request)
    {
        $validated = $request->validate([
            'tipo' => 'required|in:excel,pdf,csv',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'nullable|array',
            'area' => 'nullable|string',
            'campos' => 'nullable|array',
        ]);
        
        // Construir query
        $query = SolicitudAdministrativa::query()
            ->whereBetween('fecha_solicitud', [$validated['fecha_inicio'], $validated['fecha_fin']]);
        
        if (!empty($validated['estado'])) {
            $query->whereIn('estado', $validated['estado']);
        }
        
        if (!empty($validated['area'])) {
            $query->where('area_servicio', 'LIKE', "%{$validated['area']}%");
        }
        
        $solicitudes = $query->with(['usuarioCreador', 'historialEstados'])->get();
        
        // Generar según tipo
        switch ($validated['tipo']) {
            case 'excel':
                return Excel::download(
                    new SolicitudesExport($solicitudes, $validated['campos'] ?? []),
                    'reporte_solicitudes_' . date('Y-m-d') . '.xlsx'
                );
                
            case 'pdf':
                $pdf = PDF::loadView('reportes.solicitudes', [
                    'solicitudes' => $solicitudes,
                    'fecha_inicio' => $validated['fecha_inicio'],
                    'fecha_fin' => $validated['fecha_fin'],
                ]);
                return $pdf->download('reporte_solicitudes_' . date('Y-m-d') . '.pdf');
                
            case 'csv':
                return Excel::download(
                    new SolicitudesExport($solicitudes, $validated['campos'] ?? []),
                    'reporte_solicitudes_' . date('Y-m-d') . '.csv',
                    \Maatwebsite\Excel\Excel::CSV
                );
        }
    }
    
    public function estadisticas(Request $request)
    {
        $periodo = $request->get('periodo', 30); // días
        
        $stats = [
            'total' => SolicitudAdministrativa::count(),
            'pendientes' => SolicitudAdministrativa::where('estado', 'Pendiente')->count(),
            'aprobadas' => SolicitudAdministrativa::where('estado', 'Aprobado')->count(),
            'rechazadas' => SolicitudAdministrativa::where('estado', 'Rechazado')->count(),
            'en_revision' => SolicitudAdministrativa::where('estado', 'En Revisión')->count(),
            
            'periodo' => [
                'total' => SolicitudAdministrativa::where('fecha_solicitud', '>=', now()->subDays($periodo))->count(),
                'aprobadas' => SolicitudAdministrativa::where('estado', 'Aprobado')
                    ->where('fecha_solicitud', '>=', now()->subDays($periodo))->count(),
            ],
            
            'tiempo_promedio_aprobacion' => SolicitudAdministrativa::where('estado', 'Aprobado')
                ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, fecha_solicitud, updated_at)) as promedio')
                ->value('promedio'),
            
            'por_area' => SolicitudAdministrativa::selectRaw('area_servicio, COUNT(*) as total')
                ->groupBy('area_servicio')
                ->orderByDesc('total')
                ->limit(10)
                ->get(),
            
            'tendencia_mensual' => SolicitudAdministrativa::selectRaw('DATE_FORMAT(fecha_solicitud, "%Y-%m") as mes, COUNT(*) as total')
                ->where('fecha_solicitud', '>=', now()->subMonths(12))
                ->groupBy('mes')
                ->orderBy('mes')
                ->get(),
        ];
        
        return response()->json($stats);
    }
}
```

---

## Auditoría y Cumplimiento

### Sistema de Auditoría

**Objetivo:** Registrar todas las acciones críticas en el sistema para cumplimiento y trazabilidad.

#### Eventos Auditables

**Categorías de Eventos:**

1. **Autenticación:**
   - Login exitoso
   - Login fallido
   - Logout
   - Cambio de contraseña
   - Restablecimiento de contraseña

2. **Gestión de Solicitudes:**
   - Creación de solicitud
   - Modificación de solicitud
   - Aprobación de solicitud
   - Rechazo de solicitud
   - Eliminación de solicitud

3. **Gestión de Usuarios:**
   - Creación de usuario
   - Modificación de usuario
   - Desactivación de usuario
   - Cambio de rol
   - Asignación de permisos

4. **Configuración:**
   - Modificación de flujos
   - Creación de credenciales
   - Cambios en parámetros del sistema

#### Implementación de Auditoría

**Modelo de Auditoría:**

```php
// app/Models/AuditLog.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'user_id',
        'user_name',
        'user_email',
        'event_type',
        'event_description',
        'model_type',
        'model_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'url',
        'method',
    ];
    
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

**Migración:**

```php
Schema::create('audit_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
    $table->string('user_name')->nullable();
    $table->string('user_email')->nullable();
    $table->string('event_type'); // login, create, update, delete, etc.
    $table->text('event_description');
    $table->string('model_type')->nullable();
    $table->unsignedBigInteger('model_id')->nullable();
    $table->json('old_values')->nullable();
    $table->json('new_values')->nullable();
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->string('url')->nullable();
    $table->string('method', 10)->nullable();
    $table->timestamps();
    
    $table->index(['user_id', 'created_at']);
    $table->index(['event_type', 'created_at']);
    $table->index(['model_type', 'model_id']);
});
```

**Trait para Auditoría Automática:**

```php
// app/Traits/Auditable.php
namespace App\Traits;

use App\Models\AuditLog;

trait Auditable
{
    public static function bootAuditable()
    {
        static::created(function ($model) {
            $model->auditEvent('create', 'Registro creado');
        });
        
        static::updated(function ($model) {
            $model->auditEvent('update', 'Registro actualizado');
        });
        
        static::deleted(function ($model) {
            $model->auditEvent('delete', 'Registro eliminado');
        });
    }
    
    public function auditEvent($type, $description)
    {
        AuditLog::create([
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name ?? 'Sistema',
            'user_email' => auth()->user()->email ?? 'sistema@hefesto.local',
            'event_type' => $type,
            'event_description' => $description,
            'model_type' => get_class($this),
            'model_id' => $this->id,
            'old_values' => $this->getOriginal(),
            'new_values' => $this->getAttributes(),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'url' => request()->fullUrl(),
            'method' => request()->method(),
        ]);
    }
}
```

**Uso en Modelos:**

```php
// app/Models/SolicitudAdministrativa.php
use App\Traits\Auditable;

class SolicitudAdministrativa extends Model
{
    use Auditable;
    
    // ... resto del modelo
}
```

#### Consulta de Logs de Auditoría

**Endpoint:**

```php
// app/Http/Controllers/Api/AuditController.php
public function index(Request $request)
{
    $query = AuditLog::query();
    
    // Filtros
    if ($request->has('user_id')) {
        $query->where('user_id', $request->user_id);
    }
    
    if ($request->has('event_type')) {
        $query->where('event_type', $request->event_type);
    }
    
    if ($request->has('fecha_inicio')) {
        $query->where('created_at', '>=', $request->fecha_inicio);
    }
    
    if ($request->has('fecha_fin')) {
        $query->where('created_at', '<=', $request->fecha_fin);
    }
    
    $logs = $query->with('user')
                  ->latest()
                  ->paginate(50);
    
    return response()->json($logs);
}

public function show($id)
{
    $log = AuditLog::with('user')->findOrFail($id);
    return response()->json($log);
}
```

---

## Gestión de Credenciales de Firmas Electrónicas

### Credenciales Actuales del Sistema

El sistema HEFESTO utiliza credenciales de firma electrónica para validar las aprobaciones en los flujos de solicitudes. A continuación se detallan las credenciales configuradas actualmente.

#### Credenciales para Solicitudes Administrativas

**Flujo de Aprobación Estándar:**

##### 1. Usuario Solicitante
```
Cargo: Usuario Solicitante
Código: USR-SOL-001
Tipo: Firma del solicitante
Descripción: Firma del usuario que crea la solicitud
Estado: Activa
Asignación: Automática al usuario creador
PIN/Clave: No requiere (firma automática al enviar)
```

##### 2. Jefe Inmediato
```
Cargo: Jefe Inmediato / Jefe de Área
Código: JEFE-INM-001
Tipo: Firma de aprobación
Descripción: Aprobación del jefe directo del solicitante
Estado: Activa
Usuarios Autorizados: 
  - Jefes de Departamento
  - Coordinadores de Área
PIN/Clave: Requiere credencial personal
```

**Credenciales Específicas por Área:**
```
JEFE-CONT-001: Jefe de Contabilidad
JEFE-RRHH-001: Jefe de Recursos Humanos
JEFE-SIST-001: Jefe de Sistemas
JEFE-COMP-001: Jefe de Compras
JEFE-PRES-001: Jefe de Presupuesto
```

##### 3. Jefe de Talento Humano
```
Cargo: Jefe de Talento Humano / RRHH
Código: RRHH-001
Tipo: Firma de validación
Descripción: Valida vinculación y contrato del empleado
Estado: Activa
Usuario Actual: [Configurado en sistema]
PIN/Clave: RRHH2024!
Cambio Requerido: Cada 90 días
```

##### 4. Jefe de Gestión de la Información
```
Cargo: Jefe de Gestión de la Información / TI
Código: TI-GI-001
Tipo: Firma de aprobación técnica
Descripción: Aprueba permisos y módulos solicitados
Estado: Activa
Usuario Actual: [Configurado en sistema]
PIN/Clave: TI-GI2024!
Cambio Requerido: Cada 90 días
```

##### 5. Coordinador de Facturación (Condicional)
```
Cargo: Coordinador de Facturación
Código: FACT-COORD-001
Tipo: Firma condicional
Descripción: Requerida solo si se solicita módulo de Facturación
Estado: Activa
Condición: modulos.includes("Facturación")
Usuario Actual: [Configurado en sistema]
PIN/Clave: FACT2024!
```

##### 6. Subgerente Financiero (Condicional)
```
Cargo: Subgerente Financiero
Código: SUBGER-FIN-001
Tipo: Firma de alto nivel
Descripción: Requerida para módulos críticos financieros
Estado: Activa
Condición: modulos.includes("Tesorería") || modulos.includes("Nómina")
Usuario Actual: [Configurado en sistema]
PIN/Clave: SUBGFIN2024!
Cambio Requerido: Cada 60 días
```

---

#### Credenciales para Solicitudes Asistenciales

**Flujo de Aprobación Médico:**

##### 1. Usuario Solicitante (Profesional de Salud)
```
Cargo: Profesional de Salud Solicitante
Código: MED-SOL-001
Tipo: Firma del solicitante
Descripción: Firma del médico/profesional que solicita acceso
Estado: Activa
Asignación: Automática
Validación: Requiere Registro Médico válido
```

##### 2. Jefe de Servicio
```
Cargo: Jefe de Servicio / Especialidad
Código: JEFE-SERV-001
Tipo: Firma de aprobación
Descripción: Aprueba acceso del profesional a su servicio
Estado: Activa
Usuarios Autorizados: Jefes de cada servicio médico
```

**Credenciales por Servicio:**
```
JEFE-MEDINT-001: Jefe de Medicina Interna
JEFE-CIRUGIA-001: Jefe de Cirugía
JEFE-PEDIATRIA-001: Jefe de Pediatría
JEFE-GINECO-001: Jefe de Ginecología
JEFE-URGENCIAS-001: Jefe de Urgencias
JEFE-UCI-001: Jefe de UCI
```

##### 3. Coordinación de Enfermería (Condicional)
```
Cargo: Coordinación de Enfermería
Código: COORD-ENF-001
Tipo: Firma condicional
Descripción: Requerida para personal de enfermería
Estado: Activa
Condición: especialidad.includes("Enfermería")
Usuario Actual: [Configurado en sistema]
PIN/Clave: COORDENF2024!
```

##### 4. Jefe de Gestión de la Información Médica
```
Cargo: Jefe de TI Médica
Código: TI-MED-001
Tipo: Firma técnica
Descripción: Valida capacitación en HCE y asigna recursos
Estado: Activa
Usuario Actual: [Configurado en sistema]
PIN/Clave: TIMED2024!
Cambio Requerido: Cada 90 días
```

##### 5. Comité de Historias Clínicas
```
Cargo: Comité de Historias Clínicas
Código: COMITE-HC-001
Tipo: Firma de comité
Descripción: Aprobación final del comité
Estado: Activa
Usuarios Autorizados: Miembros del comité
PIN/Clave: COMITEHC2024!
Tipo de Firma: Requiere quórum (mínimo 3 miembros)
```

---

### Cómo Cambiar Credenciales de Firma

#### Procedimiento para Administradores

**Paso 1: Acceder al Módulo de Credenciales**

1. Inicia sesión como Administrador
2. Ve a **Configuración → Llaves/Credenciales de Firma**
3. Verás la lista de todas las credenciales configuradas

**Paso 2: Seleccionar Credencial a Modificar**

1. Localiza la credencial en la lista
2. Haz clic en el ícono de edición (✏️)
3. Se abrirá el formulario de edición

**Paso 3: Modificar Información**

**Campos Editables:**

```
Información Básica:
- Cargo Asociado: [Nombre del cargo]
- Código/Credencial: [Código único - NO CAMBIAR sin razón]
- Descripción: [Descripción de la firma]
- Estado: Activa / Inactiva

Asignación:
- Usuario Asignado: [Seleccionar usuario del sistema]
- Múltiples Usuarios: [Sí/No]
- Usuarios Autorizados: [Lista de usuarios si es múltiple]

Seguridad:
- PIN/Clave: [Nueva clave de firma]
- Confirmar PIN: [Repetir clave]
- Requiere Cambio Periódico: [Sí/No]
- Días para Cambio: [60/90/120 días]

Tipo de Firma:
- Imagen Base64: Firma manuscrita digitalizada
- Texto: Firma de texto simple
- Certificado Digital: Firma con certificado PKI
```

**Paso 4: Cambiar PIN/Clave de Firma**

**Importante:** El cambio de PIN afecta inmediatamente a todos los usuarios que usan esa credencial.

1. En el campo **"PIN/Clave Actual"**, ingresa el PIN actual
2. En **"Nuevo PIN/Clave"**, ingresa el nuevo PIN
   - Mínimo 8 caracteres
   - Debe incluir mayúsculas, minúsculas y números
   - Recomendado: incluir caracteres especiales
3. En **"Confirmar Nuevo PIN"**, repite el nuevo PIN
4. Marca **"Notificar a usuarios autorizados"** para enviar email
5. Haz clic en **"Guardar Cambios"**

**Ejemplo de Cambio de PIN:**
```
PIN Actual: RRHH2024!
Nuevo PIN: RRHH2025@Seg
Confirmar: RRHH2025@Seg
☑ Notificar a usuarios autorizados
☑ Requiere cambio en 90 días
```

**Paso 5: Confirmación**

El sistema mostrará:
```
✓ Credencial actualizada exitosamente

Detalles del cambio:
- Credencial: RRHH-001
- Cargo: Jefe de Talento Humano
- PIN cambiado: Sí
- Usuarios notificados: 2
- Próximo cambio requerido: 2025-02-24

Usuarios notificados:
- maria.lopez@hospital.com
- juan.perez@hospital.com
```

---

#### Cambio de PIN por Usuario Autorizado

**Escenario:** Un usuario autorizado necesita cambiar su propio PIN de firma.

**Paso 1: Acceder a Perfil**

1. Inicia sesión
2. Ve a **Perfil → Mis Credenciales de Firma**
3. Verás las credenciales asignadas a ti

**Paso 2: Cambiar PIN**

1. Localiza la credencial
2. Haz clic en **"Cambiar PIN"**
3. Completa el formulario:

```
PIN Actual: ********
Nuevo PIN: ********
Confirmar Nuevo PIN: ********
```

4. Haz clic en **"Actualizar PIN"**

**Validaciones:**
- El PIN actual debe ser correcto
- El nuevo PIN debe cumplir políticas de seguridad
- No puede ser igual a los últimos 3 PINs usados

---

### Asignar Credencial a Nuevo Usuario

**Escenario:** Un nuevo jefe de área necesita credencial de firma.

**Paso 1: Crear o Editar Credencial**

1. Ve a **Configuración → Llaves**
2. Opción A: Crear nueva credencial
3. Opción B: Editar credencial existente

**Paso 2: Asignar Usuario**

```
Cargo Asociado: Jefe de Contabilidad
Código: JEFE-CONT-001
Usuario Asignado: [Buscar y seleccionar usuario]
  → Buscar por: nombre, email, cargo
  → Seleccionar: maria.lopez@hospital.com
```

**Paso 3: Configurar Permisos**

```
Permisos de Firma:
☑ Puede aprobar solicitudes administrativas
☑ Puede rechazar solicitudes
☑ Puede agregar comentarios
☐ Puede delegar firma
☐ Puede firmar en nombre de otros

Restricciones:
☑ Solo solicitudes de su área
☐ Solo solicitudes de cierto monto
☐ Solo en horario laboral
```

**Paso 4: Generar PIN Inicial**

```
Opción A: Generar automáticamente
  → El sistema genera un PIN seguro
  → Se envía por email al usuario
  → Usuario debe cambiarlo en primer uso

Opción B: Establecer manualmente
  → Ingresar PIN temporal
  → Marcar "Requiere cambio en primer uso"
  → Notificar al usuario por canal seguro
```

**Paso 5: Notificar al Usuario**

Email automático enviado:
```
Asunto: Credencial de Firma Asignada - HEFESTO

Estimado/a [Nombre],

Se te ha asignado una credencial de firma electrónica en el sistema HEFESTO.

Detalles:
- Cargo: Jefe de Contabilidad
- Código: JEFE-CONT-001
- PIN Temporal: [Enviado por separado]

IMPORTANTE:
1. Debes cambiar tu PIN temporal en el primer uso
2. No compartas tu PIN con nadie
3. El PIN debe cambiarse cada 90 días

Para usar tu firma:
1. Ingresa al sistema
2. Ve a Control → Aprobaciones
3. Selecciona una solicitud
4. Haz clic en "Firmar"
5. Ingresa tu PIN cuando se solicite

Soporte: soporte@hospital.com
```

---

### Gestión de Credenciales Múltiples

**Escenario:** Varios usuarios pueden usar la misma credencial (ej: múltiples jefes de área).

**Configuración:**

```
Cargo: Jefe de Área
Código: JEFE-AREA-MULTI-001
Tipo: Credencial Múltiple

Usuarios Autorizados:
1. maria.lopez@hospital.com (Jefe de Contabilidad)
2. juan.perez@hospital.com (Jefe de RRHH)
3. carlos.gomez@hospital.com (Jefe de Sistemas)

Configuración:
☑ Permitir múltiples usuarios
☑ Cada usuario tiene su propio PIN
☐ PIN compartido (NO RECOMENDADO)
☑ Registrar quién firmó específicamente
```

**Asignación Individual de PINs:**

Cada usuario tiene su propio PIN:
```
Usuario: maria.lopez
PIN: MariaJefe2024!

Usuario: juan.perez
PIN: JuanRRHH2024!

Usuario: carlos.gomez
PIN: CarlosTI2024!
```

**Ventajas:**
- Trazabilidad: Se sabe exactamente quién firmó
- Seguridad: Si un PIN se compromete, solo afecta a un usuario
- Auditoría: Logs detallados por usuario

---

### Revocar Credencial de Firma

**Escenario:** Un empleado ya no debe tener acceso a firmar solicitudes.

**Proceso:**

**Paso 1: Identificar Credencial**

1. Ve a **Configuración → Llaves**
2. Busca las credenciales del usuario
3. Identifica cuáles debe perder

**Paso 2: Revocar Acceso**

**Opción A: Desasignar Usuario**
```
Credencial: JEFE-CONT-001
Usuario Asignado: maria.lopez
Acción: Quitar asignación
Resultado: La credencial queda sin usuario asignado
```

**Opción B: Desactivar Credencial Completa**
```
Credencial: JEFE-CONT-001
Estado: Activa → Inactiva
Resultado: Nadie puede usar esta credencial
```

**Opción C: Cambiar PIN**
```
Acción: Cambiar el PIN de la credencial
Resultado: El usuario anterior ya no puede firmar
Asignar: A nuevo usuario con nuevo PIN
```

**Paso 3: Verificar Revocación**

1. Intenta firmar con el usuario revocado
2. Debe mostrar error: "No tienes credenciales de firma asignadas"
3. Verifica en logs de auditoría

**Paso 4: Reasignar si es Necesario**

Si la credencial debe pasar a otro usuario:
1. Asigna nuevo usuario
2. Genera nuevo PIN
3. Notifica al nuevo usuario
4. Documenta el cambio

---

### Auditoría de Credenciales

**Consultar Uso de Credenciales:**

**Reporte de Firmas por Credencial:**
```sql
SELECT 
    c.codigo as credencial,
    c.cargo,
    u.name as usuario,
    COUNT(*) as total_firmas,
    MAX(f.created_at) as ultima_firma,
    MIN(f.created_at) as primera_firma
FROM credenciales_firma c
JOIN usuarios u ON c.user_id = u.id
JOIN firmas f ON f.credencial_id = c.id
WHERE f.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY c.id, u.id
ORDER BY total_firmas DESC;
```

**Credenciales Sin Uso:**
```sql
SELECT 
    c.codigo,
    c.cargo,
    c.estado,
    c.updated_at as ultima_modificacion
FROM credenciales_firma c
LEFT JOIN firmas f ON f.credencial_id = c.id 
    AND f.created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
WHERE f.id IS NULL
AND c.estado = 'activa';
```

**Credenciales con PIN Expirado:**
```sql
SELECT 
    c.codigo,
    c.cargo,
    u.name as usuario,
    c.pin_cambio_fecha as ultimo_cambio,
    DATEDIFF(NOW(), c.pin_cambio_fecha) as dias_sin_cambio,
    c.pin_cambio_dias as dias_requeridos
FROM credenciales_firma c
JOIN usuarios u ON c.user_id = u.id
WHERE c.requiere_cambio_periodico = 1
AND DATEDIFF(NOW(), c.pin_cambio_fecha) > c.pin_cambio_dias;
```

---

### Troubleshooting de Credenciales

#### Problema 1: "No puedo firmar - PIN incorrecto"

**Causas Posibles:**
1. PIN ingresado incorrectamente
2. PIN fue cambiado recientemente
3. Credencial fue reasignada
4. PIN expiró

**Soluciones:**

**Verificar PIN:**
1. Asegúrate de escribir correctamente (mayúsculas/minúsculas)
2. Verifica que no esté activado Caps Lock
3. Intenta copiar y pegar si tienes el PIN guardado

**Si olvidaste el PIN:**
1. Contacta al administrador
2. El administrador puede:
   - Restablecer tu PIN
   - Enviarte un PIN temporal
3. Cambia el PIN temporal inmediatamente

**Si el PIN expiró:**
1. El sistema te pedirá cambiar el PIN
2. Ingresa PIN actual
3. Ingresa nuevo PIN
4. Confirma y continúa

---

#### Problema 2: "No veo la opción de firmar"

**Causas Posibles:**
1. No tienes credencial asignada
2. La credencial está inactiva
3. No tienes permisos para esa solicitud
4. La solicitud no requiere tu firma en esta fase

**Soluciones:**

**Verificar Asignación:**
1. Ve a **Perfil → Mis Credenciales**
2. Verifica que tienes credenciales asignadas
3. Verifica que estén activas

**Verificar Permisos:**
1. Confirma que la solicitud es de tu área
2. Verifica que estás en la fase correcta del flujo
3. Consulta con el administrador

---

#### Problema 3: "Credencial bloqueada por intentos fallidos"

**Causa:**
Después de 5 intentos fallidos de PIN, la credencial se bloquea temporalmente.

**Solución:**

**Esperar Desbloqueo Automático:**
- Tiempo de bloqueo: 30 minutos
- Después se desbloquea automáticamente

**Desbloqueo Manual (Administrador):**
1. Ve a **Configuración → Llaves**
2. Localiza la credencial bloqueada
3. Haz clic en **"Desbloquear"**
4. Confirma la acción
5. Notifica al usuario

**Prevención:**
- Asegúrate de conocer tu PIN
- Guárdalo en un lugar seguro
- Cámbialo si tienes dudas

---

### Mejores Prácticas para Credenciales

#### Para Administradores:

**✅ Hacer:**
- Revisar credenciales activas mensualmente
- Revocar credenciales de empleados desvinculados inmediatamente
- Forzar cambio de PIN cada 90 días
- Mantener registro de quién tiene qué credenciales
- Auditar uso de credenciales regularmente
- Usar PINs fuertes y únicos
- Documentar todos los cambios

**❌ Evitar:**
- Compartir PINs entre múltiples usuarios
- Dejar credenciales activas sin usuario asignado
- Usar PINs débiles o predecibles
- No revisar credenciales sin uso
- Ignorar alertas de seguridad

#### Para Usuarios con Credenciales:

**✅ Hacer:**
- Cambiar PIN temporal inmediatamente
- Usar PINs fuertes y únicos
- Guardar PIN en lugar seguro
- Cambiar PIN si sospechas compromiso
- Cerrar sesión al terminar
- Reportar actividad sospechosa

**❌ Evitar:**
- Compartir tu PIN con nadie
- Usar el mismo PIN en múltiples sistemas
- Escribir PIN en lugares visibles
- Dejar sesión abierta sin supervisión
- Ignorar notificaciones de cambio de PIN

---

### Tabla Resumen de Credenciales Actuales

#### Solicitudes Administrativas

| Código | Cargo | Tipo | Estado | Cambio PIN | Usuarios |
|--------|-------|------|--------|------------|----------|
| USR-SOL-001 | Usuario Solicitante | Automática | Activa | No requiere | Todos |
| JEFE-INM-001 | Jefe Inmediato | Manual | Activa | 90 días | Múltiple |
| RRHH-001 | Jefe RRHH | Manual | Activa | 90 días | 1-2 |
| TI-GI-001 | Jefe TI | Manual | Activa | 90 días | 1-2 |
| FACT-COORD-001 | Coord. Facturación | Condicional | Activa | 90 días | 1 |
| SUBGER-FIN-001 | Subgerente Financiero | Condicional | Activa | 60 días | 1 |

#### Solicitudes Asistenciales

| Código | Cargo | Tipo | Estado | Cambio PIN | Usuarios |
|--------|-------|------|--------|------------|----------|
| MED-SOL-001 | Profesional Solicitante | Automática | Activa | No requiere | Todos |
| JEFE-SERV-001 | Jefe de Servicio | Manual | Activa | 90 días | Múltiple |
| COORD-ENF-001 | Coord. Enfermería | Condicional | Activa | 90 días | 1-2 |
| TI-MED-001 | Jefe TI Médica | Manual | Activa | 90 días | 1-2 |
| COMITE-HC-001 | Comité HC | Comité | Activa | 120 días | 5-7 |

---

## Referencia Rápida de Credenciales/PINs

### Credenciales Actuales - Solicitudes Administrativas

| Firma | Código | PIN/Credencial Actual |
|-------|--------|----------------------|
| Usuario Solicitante | USR-SOL-001 | *(Automática - No requiere PIN)* |
| Jefe Inmediato | JEFE-INM-001 | *(PIN personal de cada jefe)* |
| Jefe de Contabilidad | JEFE-CONT-001 | *(PIN personal)* |
| Jefe de RRHH | JEFE-RRHH-001 | *(PIN personal)* |
| Jefe de Sistemas | JEFE-SIST-001 | *(PIN personal)* |
| Jefe de Compras | JEFE-COMP-001 | *(PIN personal)* |
| Jefe de Presupuesto | JEFE-PRES-001 | *(PIN personal)* |
| **Jefe de Talento Humano** | **RRHH-001** | **RRHH2024!** |
| **Jefe de Gestión de la Información** | **TI-GI-001** | **TI-GI2024!** |
| **Coordinador de Facturación** | **FACT-COORD-001** | **FACT2024!** |
| **Subgerente Financiero** | **SUBGER-FIN-001** | **SUBGFIN2024!** |

---

### Credenciales Actuales - Solicitudes Asistenciales

| Firma | Código | PIN/Credencial Actual |
|-------|--------|----------------------|
| Profesional Solicitante | MED-SOL-001 | *(Automática - No requiere PIN)* |
| Jefe de Servicio | JEFE-SERV-001 | *(PIN personal de cada jefe)* |
| Jefe de Medicina Interna | JEFE-MEDINT-001 | *(PIN personal)* |
| Jefe de Cirugía | JEFE-CIRUGIA-001 | *(PIN personal)* |
| Jefe de Pediatría | JEFE-PEDIATRIA-001 | *(PIN personal)* |
| Jefe de Ginecología | JEFE-GINECO-001 | *(PIN personal)* |
| Jefe de Urgencias | JEFE-URGENCIAS-001 | *(PIN personal)* |
| Jefe de UCI | JEFE-UCI-001 | *(PIN personal)* |
| **Coordinación de Enfermería** | **COORD-ENF-001** | **COORDENF2024!** |
| **Jefe de TI Médica** | **TI-MED-001** | **TIMED2024!** |
| **Comité de Historias Clínicas** | **COMITE-HC-001** | **COMITEHC2024!** |

---

### Resumen de PINs Compartidos

**PINs configurados en el sistema (requieren cambio periódico):**

```
RRHH2024!           → Jefe de Talento Humano (Cambio cada 90 días)
TI-GI2024!          → Jefe de Gestión de la Información (Cambio cada 90 días)
FACT2024!           → Coordinador de Facturación (Cambio cada 90 días)
SUBGFIN2024!        → Subgerente Financiero (Cambio cada 60 días)
COORDENF2024!       → Coordinación de Enfermería (Cambio cada 90 días)
TIMED2024!          → Jefe de TI Médica (Cambio cada 90 días)
COMITEHC2024!       → Comité de Historias Clínicas (Cambio cada 120 días)
```

> **Nota de Seguridad:** Los PINs personales son únicos para cada usuario y deben ser cambiados por el usuario al recibir su credencial. Los PINs mostrados arriba son credenciales compartidas del sistema y deben ser protegidos adecuadamente.

---

**Fin del Manual de Uso**

Para consultas adicionales, contacta al equipo de soporte técnico.

© 2024 HEFESTO - Todos los derechos reservados