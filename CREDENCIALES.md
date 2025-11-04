# 🔐 SISTEMA DE CREDENCIALES - FIRMAS DIGITALES

**Fecha de creación:** 4 de Noviembre, 2025  
**Última actualización:** 4 de Noviembre, 2025  
**Responsable:** Administrador del Sistema

---

## 📋 ÍNDICE

1. [Ubicación de Credenciales](#ubicación-de-credenciales)
2. [Credenciales Activas](#credenciales-activas)
3. [Cómo Cambiar Credenciales](#cómo-cambiar-credenciales)
4. [Procedimiento de Cambio](#procedimiento-de-cambio)
5. [Historial de Cambios](#historial-de-cambios)
6. [Seguridad](#seguridad)

---

## 📍 UBICACIÓN DE CREDENCIALES

### Archivo Principal
```
📁 client/lib/credenciales.ts
```

**Este es el ÚNICO lugar donde se deben cambiar las credenciales.**

### Archivos que Usan Credenciales
1. ✅ `client/components/FirmaDigital.tsx` - Componente de firma
2. ✅ `client/pages/RegistroAdministrativo.tsx` - Formulario administrativo
3. ✅ `client/pages/RegistroHistoriaClinica.tsx` - Formulario historia clínica

---

## 🔑 CREDENCIALES ACTIVAS

### 1. Jefe Inmediato
- **Cargo:** Jefe inmediato
- **Credencial:** `JEFE2024`
- **Descripción:** Jefe directo del área solicitante
- **Responsable:** Variable según área
- **Última actualización:** 01/01/2024

**Uso:** Aprobación inicial de solicitudes de usuarios

---

### 2. Jefe de Talento Humano
- **Cargo:** Jefe de Talento Humano
- **Credencial:** `TALENTO2024`
- **Descripción:** Jefe del departamento de Recursos Humanos
- **Responsable:** Jefe de Talento Humano
- **Última actualización:** 01/01/2024

**Uso:** Validación de datos de personal y contratación

---

### 3. Jefe de Gestión de la Información
- **Cargo:** Jefe de Gestión de la Información
- **Credencial:** `GESTION2024`
- **Descripción:** Jefe del departamento de TI/Sistemas
- **Responsable:** Jefe de Gestión de la Información
- **Última actualización:** 01/01/2024

**Uso:** Aprobación final de accesos al sistema

---

### 4. Coordinador de Facturación
- **Cargo:** Coordinador de Facturación o Subgerente Financiero
- **Credencial:** `FINANZAS2024`
- **Descripción:** Responsable del área financiera
- **Responsable:** Coordinador de Facturación
- **Última actualización:** 01/01/2024

**Uso:** Aprobación de accesos a módulos financieros

---

### 5. Capacitador de Historia Clínica
- **Cargo:** Capacitador de historia clínica
- **Credencial:** `CAPACITAHC2024`
- **Descripción:** Responsable de capacitación en Historia Clínica Electrónica
- **Responsable:** Capacitador HC
- **Última actualización:** 01/01/2024

**Uso:** Certificación de capacitación en HC

---

### 6. Capacitador de Epidemiología
- **Cargo:** Capacitador de epidemiología
- **Credencial:** `CAPACITAEPI2024`
- **Descripción:** Responsable de capacitación en Epidemiología
- **Responsable:** Capacitador Epidemiología
- **Última actualización:** 01/01/2024

**Uso:** Certificación de capacitación en Epidemiología

---

### 7. Aval Institucional
- **Cargo:** Aval institucional
- **Credencial:** `AVAL2024`
- **Descripción:** Aval de la Subgerencia o Coordinación
- **Responsable:** Subgerente/Coordinador
- **Última actualización:** 01/01/2024

**Uso:** Aval final para accesos especiales

---

## 🔄 CÓMO CAMBIAR CREDENCIALES

### Cuándo Cambiar

Cambiar credenciales cuando:
- ✅ Hay cambio de jefe o responsable de área
- ✅ Cada 6 meses (política de seguridad)
- ✅ Si se sospecha de compromiso de seguridad
- ✅ Por solicitud de auditoría

### Quién Puede Cambiar

Solo pueden cambiar credenciales:
- ✅ Administrador del Sistema
- ✅ Jefe de Gestión de la Información
- ✅ Personal autorizado de TI

---

## 📝 PROCEDIMIENTO DE CAMBIO

### Paso 1: Abrir el Archivo
```bash
# Navegar al archivo
cd client/lib
# Abrir con editor
code credenciales.ts
```

### Paso 2: Modificar la Credencial

**ANTES:**
```typescript
'Jefe de Talento Humano': {
  cargo: 'Jefe de Talento Humano',
  clave: 'TALENTO2024',  // ← CAMBIAR AQUÍ
  descripcion: 'Jefe del departamento de Recursos Humanos',
  responsable: 'Jefe de Talento Humano',
  ultimoCambio: '2024-01-01'  // ← Y AQUÍ
}
```

**DESPUÉS:**
```typescript
'Jefe de Talento Humano': {
  cargo: 'Jefe de Talento Humano',
  clave: 'TALENTO2025',  // ✅ NUEVA CREDENCIAL
  descripcion: 'Jefe del departamento de Recursos Humanos',
  responsable: 'Nuevo Jefe de Talento Humano',  // ✅ ACTUALIZAR NOMBRE
  ultimoCambio: '2025-01-15'  // ✅ FECHA DE CAMBIO
}
```

### Paso 3: Guardar y Verificar

1. **Guardar el archivo** (Ctrl + S)
2. **Reiniciar el servidor de desarrollo**
   ```bash
   # Detener servidor (Ctrl + C)
   # Iniciar nuevamente
   pnpm dev
   ```
3. **Probar la nueva credencial**
   - Ir a formulario de registro
   - Intentar firmar con cargo modificado
   - Verificar que la nueva credencial funciona

### Paso 4: Notificar al Responsable

**Enviar correo al nuevo responsable:**

```
Asunto: Nueva Credencial de Firma Digital - [CARGO]

Estimado/a [NOMBRE],

Se le ha asignado la credencial de firma digital para el cargo:
[CARGO]

Su credencial es: [NUEVA_CLAVE]

Por favor, mantenga esta información confidencial.

Atentamente,
Administrador del Sistema
```

### Paso 5: Documentar el Cambio

Actualizar la sección [Historial de Cambios](#historial-de-cambios) en este documento.

---

## 📊 HISTORIAL DE CAMBIOS

| Fecha | Cargo | Credencial Anterior | Credencial Nueva | Responsable | Motivo |
|-------|-------|-------------------|------------------|-------------|---------|
| 01/01/2024 | Todos | N/A | Iniciales | Sistema | Implementación inicial |
| - | - | - | - | - | - |

**Formato para agregar:**
```
| DD/MM/AAAA | [Cargo] | [Anterior] | [Nueva] | [Nombre] | [Motivo] |
```

---

## 🔒 SEGURIDAD

### Mejores Prácticas

#### ✅ HACER
- ✅ Cambiar credenciales cada 6 meses
- ✅ Usar credenciales únicas y complejas
- ✅ Notificar solo al responsable directo
- ✅ Mantener registro de cambios
- ✅ Verificar identidad antes de compartir

#### ❌ NO HACER
- ❌ Compartir credenciales por WhatsApp/SMS
- ❌ Escribir credenciales en papel
- ❌ Usar la misma credencial para múltiples cargos
- ❌ Compartir con personal no autorizado
- ❌ Dejar credenciales en correos antiguos

### Formato de Credenciales Recomendado

```
[AREA][AÑO][NUMERO]

Ejemplos:
- TALENTO2024
- GESTION2025
- FINANZAS2024A
```

**Características:**
- Mínimo 8 caracteres
- Mayúsculas
- Incluir año
- Opcional: número o letra al final

### En Caso de Compromiso

Si se sospecha que una credencial fue comprometida:

1. **INMEDIATO:** Cambiar la credencial
2. **Notificar** al Jefe de Gestión de la Información
3. **Revisar** logs de firmas recientes
4. **Investigar** posibles usos no autorizados
5. **Documentar** el incidente

---

## 🚀 MIGRACIÓN A BACKEND (FUTURO)

### Estado Actual
- ⚠️ Credenciales en frontend (temporal)
- ⚠️ Solo para desarrollo/pruebas

### Plan de Migración

#### Fase 1: Backend API
```typescript
// Endpoint propuesto
POST /api/auth/validar-credencial
{
  "cargo": "Jefe de Talento Humano",
  "credencial": "TALENTO2024"
}

// Respuesta
{
  "valida": true,
  "usuario": "Juan Pérez"
}
```

#### Fase 2: Base de Datos
```sql
CREATE TABLE credenciales (
  id INT PRIMARY KEY,
  cargo VARCHAR(100),
  clave_hash VARCHAR(255),  -- Hash, no texto plano
  responsable VARCHAR(100),
  fecha_creacion DATETIME,
  fecha_expiracion DATETIME,
  activa BOOLEAN
);
```

#### Fase 3: Gestión Web
- Panel de administración
- Cambio de credenciales desde UI
- Historial automático
- Notificaciones por email

---

## 📞 CONTACTO

### Para Cambios de Credenciales
- **Email:** sistemas@hospital.local
- **Extensión:** 1234
- **Responsable:** Jefe de Gestión de la Información

### Para Soporte Técnico
- **Email:** soporte@hospital.local
- **Extensión:** 5678
- **Horario:** Lunes a Viernes, 8:00 AM - 5:00 PM

---

## 📚 REFERENCIAS

### Archivos Relacionados
- `client/lib/credenciales.ts` - Sistema de credenciales
- `client/components/FirmaDigital.tsx` - Componente de firma
- `RESUMEN_FINAL.md` - Estado general del proyecto

### Documentación Técnica
- [React Signature Canvas](https://github.com/agilgur5/react-signature-canvas)
- [Mejores Prácticas de Seguridad](https://owasp.org/)

---

**Última revisión:** 4 de Noviembre, 2025  
**Próxima revisión:** 4 de Mayo, 2025 (6 meses)

---

## ✅ CHECKLIST DE CAMBIO DE CREDENCIAL

Usar esta lista cada vez que se cambie una credencial:

- [ ] Abrir `client/lib/credenciales.ts`
- [ ] Modificar la credencial del cargo correspondiente
- [ ] Actualizar campo `responsable` si cambió la persona
- [ ] Actualizar campo `ultimoCambio` con fecha actual
- [ ] Guardar el archivo
- [ ] Reiniciar servidor de desarrollo
- [ ] Probar la nueva credencial en el formulario
- [ ] Notificar al nuevo responsable por correo
- [ ] Actualizar tabla de Historial de Cambios en este documento
- [ ] Archivar correo de notificación
- [ ] Programar recordatorio para próximo cambio (6 meses)

---

**FIN DEL DOCUMENTO**
