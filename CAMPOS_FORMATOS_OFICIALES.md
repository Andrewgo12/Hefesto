# 📋 Campos Oficiales de los Formatos Institucionales

## 🧾 FOR-GDI-SIS-004: Formato Creación de Usuarios Administrativos
**Versión:** 1 | **Fecha de emisión:** 23/11/2020

### Encabezado
| Campo | Tipo | Obligatorio | Valor/Opciones |
|-------|------|-------------|----------------|
| Código del formato | Texto | ✅ | FOR-GDI-SIS-004 |
| Versión | Texto | ✅ | 1 |
| Fecha de emisión | Fecha | ✅ | 23/11/2020 |
| Fecha de solicitud | Fecha | ✅ | día/mes/año |

### Datos del Solicitante
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| Nombre completo | Texto | ✅ | Nombre completo del usuario |
| Cédula | Texto | ✅ | Número de identificación |
| Cargo | Texto | ✅ | Cargo que desempeña |
| Área o servicio | Texto | ✅ | Departamento asignado |
| Teléfono / Extensión | Texto | ✅ | Contacto telefónico |

### Tipo de Vinculación (marcar con X)
| Opción | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Planta | Checkbox | ✅ (una) |
| ☐ Agremiado | Checkbox | ✅ (una) |
| ☐ Contrato | Checkbox | ✅ (una) |

### Aplicaciones / Módulos SERVINTE ADMINISTRATIVO (marcar con X)
| Módulo | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Facturación | Checkbox | ❌ |
| ☐ Anticipos | Checkbox | ❌ |
| ☐ Farmacia | Checkbox | ❌ |
| ☐ Suministros | Checkbox | ❌ |
| ☐ Cartera | Checkbox | ❌ |
| ☐ Glosas | Checkbox | ❌ |
| ☐ Admisiones | Checkbox | ❌ |
| ☐ Ayudas diagnósticas | Checkbox | ❌ |
| ☐ Citas médicas | Checkbox | ❌ |
| ☐ Cirugía | Checkbox | ❌ |
| ☐ RIPS | Checkbox | ❌ |
| ☐ Anexos | Checkbox | ❌ |

### Aplicaciones / Módulos SERVINTE FINANCIERO (marcar con X)
| Módulo | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Presupuesto | Checkbox | ❌ |
| ☐ Contabilidad | Checkbox | ❌ |
| ☐ Activos fijos | Checkbox | ❌ |
| ☐ Cuentas por pagar | Checkbox | ❌ |
| ☐ Caja y bancos | Checkbox | ❌ |
| ☐ Costos | Checkbox | ❌ |
| ☐ Administración de documentos | Checkbox | ❌ |

### Tipo de Permiso (marcar con X)
| Permiso | Significado | Tipo | Obligatorio |
|---------|-------------|------|-------------|
| ☐ A | Anular | Checkbox | ❌ |
| ☐ C | Consultar | Checkbox | ❌ |
| ☐ M | Modificar | Checkbox | ❌ |
| ☐ B | Borrar | Checkbox | ❌ |

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Perfil de: _______ | Texto | ❌ |

### Opciones Web (marcar con X)
| Opción | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Internet | Checkbox | ❌ |
| ☐ Correo electrónico | Checkbox | ❌ |
| ☐ Transferencia de archivos | Checkbox | ❌ |
| Otros: _____________ | Texto | ❌ |

### Vo. Bo. y Firmas Requeridas (5 firmas)
| Firma | Rol | Tipo | Obligatorio |
|-------|-----|------|-------------|
| 1 | Jefe inmediato | Firma | ✅ |
| 2 | Jefe de Talento Humano | Firma | ✅ |
| 3 | Jefe de Gestión de la Información | Firma | ✅ |
| 4 | Coordinador de Facturación o Subgerente Financiero | Firma | ✅ |
| 5 | Firma del usuario solicitante | Firma | ✅ |

### Espacio Reservado para la Oficina de Sistemas
| Campo | Tipo | Obligatorio | Llenado por |
|-------|------|-------------|-------------|
| Login asignado | Texto | ❌ | Sistemas |
| Clave temporal | Texto | ❌ | Sistemas |

### Declaración del Usuario
| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Acepto la responsabilidad... | Checkbox | ✅ |

---

## 🩺 FOR-GDI-SIS-003: Formato Creación de Usuarios Historia Clínica Electrónica
**Versión:** 2 | **Fecha de emisión:** 18/08/2021

### Encabezado
| Campo | Tipo | Obligatorio | Valor/Opciones |
|-------|------|-------------|----------------|
| Código del formato | Texto | ✅ | FOR-GDI-SIS-003 |
| Versión | Texto | ✅ | 2 |
| Fecha de emisión | Fecha | ✅ | 18/08/2021 |
| Fecha de solicitud | Fecha | ✅ | día/mes/año |

### Datos del Solicitante
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| Nombre completo | Texto | ✅ | Nombre completo del profesional |
| Cédula | Texto | ✅ | Número de identificación |
| Celular | Texto | ✅ | Número de celular |
| Correo electrónico | Email | ✅ | Correo institucional o personal |
| Registro / Código | Texto | ✅ | Registro médico o código |
| Área o servicio | Texto | ✅ | Servicio asignado |
| Especialidad | Texto | ✅ | Especialidad médica |
| Observaciones | Textarea | ❌ | Notas adicionales |

### Perfil (marcar con X)
| Opción | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Médico especialista | Checkbox | ✅ (una) |
| ☐ Médico residente | Checkbox | ✅ (una) |
| ☐ Médico general | Checkbox | ✅ (una) |
| ☐ Auditor | Checkbox | ✅ (una) |
| ☐ Enfermero jefe | Checkbox | ✅ (una) |
| ☐ Auxiliar de enfermería | Checkbox | ✅ (una) |
| ☐ Terapeuta | Checkbox | ✅ (una) |
| ☐ Otro: ___________ | Checkbox + Texto | ✅ (una) |

### Tipo de Vinculación (marcar con X)
| Opción | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Interno | Checkbox | ✅ (una) |
| ☐ Externo | Checkbox | ✅ (una) |

### Terminal Asignado (marcar con X)
| Opción | Tipo | Obligatorio |
|--------|------|-------------|
| ☐ Tablet | Checkbox | ✅ (una) |
| ☐ Portátil | Checkbox | ✅ (una) |
| ☐ Otro: ___________ | Checkbox + Texto | ✅ (una) |

### Capacitación en Historia Clínica Electrónica
| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Capacitación realizada: ☐ Sí ☐ No | Checkbox | ✅ |
| Nombre del capacitador | Texto | ✅ (si Sí) |
| Fecha de capacitación | Fecha | ✅ (si Sí) |
| Firma del capacitador | Firma | ✅ (si Sí) |

### Capacitación en Epidemiología
**(Solo para médicos generales o especialistas)**

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Capacitación realizada: ☐ Sí ☐ No | Checkbox | ✅ (si aplica) |
| Nombre del capacitador | Texto | ✅ (si Sí) |
| Fecha de capacitación | Fecha | ✅ (si Sí) |
| Firma del capacitador | Firma | ✅ (si Sí) |

### Aval Institucional
| Campo | Tipo | Obligatorio | Nota |
|-------|------|-------------|------|
| Avalado por | Texto | ✅ | Subgerencia o coordinación |
| Cargo | Texto | ✅ | Cargo del avalador |
| Firma del avalador | Firma | ✅ | |
| Fecha | Fecha | ✅ | día/mes/año |

**Nota:** Solo será autorizado el usuario que tenga el aval de la subgerencia o coordinación respectiva.

### Firmas Requeridas (5 a 6 firmas según caso)
| # | Firma | Tipo | Obligatorio | Condición |
|---|-------|------|-------------|-----------|
| 1 | Capacitador de historia clínica | Firma | ✅ | Siempre |
| 2 | Capacitador de epidemiología | Firma | ✅ | Si aplica |
| 3 | Aval institucional (subgerencia o coordinación) | Firma | ✅ | Siempre |
| 4 | Jefe de Gestión de la Información | Firma | ✅ | Siempre |
| 5 | Talento Humano o Sistemas (creación de usuario) | Firma | ✅ | Siempre |
| 6 | Firma del usuario solicitante | Firma | ✅ | Siempre |

### Login Creado Por
| Campo | Tipo | Obligatorio | Llenado por |
|-------|------|-------------|-------------|
| Login creado por: _______ | Texto | ❌ | Sistemas |

### Declaración del Usuario
| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Acepto la responsabilidad... | Checkbox | ✅ |

---

## 📝 Notas de Implementación

### Reglas de Validación

#### Formato Administrativo (FOR-GDI-SIS-004)
1. Al menos UN módulo debe estar seleccionado (administrativo o financiero)
2. Al menos UN tipo de permiso debe estar marcado
3. Al menos UNA opción de vinculación debe estar seleccionada
4. Las 5 firmas son OBLIGATORIAS para completar el proceso
5. La declaración de aceptación es OBLIGATORIA

#### Formato Historia Clínica (FOR-GDI-SIS-003)
1. Solo UN perfil puede estar seleccionado
2. Solo UNA vinculación puede estar seleccionada
3. Solo UN terminal puede estar asignado
4. Si perfil es "Médico general" o "Médico especialista" → Capacitación epidemiología OBLIGATORIA
5. Si capacitación realizada = "Sí" → Todos los campos de capacitación son OBLIGATORIOS
6. Aval institucional es OBLIGATORIO
7. Las firmas varían entre 5 y 6 según si hay capacitación de epidemiología
8. La declaración de aceptación es OBLIGATORIA

### Campos Calculados/Automáticos
- `fechaSolicitud`: Se llena automáticamente con la fecha actual
- `codigoFormato`, `version`, `fechaEmision`: Son constantes del formato
- `loginAsignado`, `claveTemporal`, `loginCreadoPor`: Los llena el área de sistemas

---

## 🎨 Diseño de UI Sugerido

### Agrupación de Campos

#### Formulario Administrativo
1. **Encabezado** (solo lectura con fecha actual)
2. **Datos del Solicitante** (campos de texto)
3. **Tipo de Vinculación** (radio buttons)
4. **Módulos SERVINTE** (2 secciones con checkboxes)
5. **Permisos** (checkboxes múltiples + campo texto)
6. **Opciones Web** (checkboxes + campo texto)
7. **Declaración** (checkbox)
8. **Botón: Enviar y Generar Excel**

#### Formulario Historia Clínica
1. **Encabezado** (solo lectura con fecha actual)
2. **Datos del Solicitante** (campos de texto + textarea)
3. **Perfil Profesional** (radio buttons con "otro")
4. **Vinculación y Terminal** (radio buttons con "otro")
5. **Capacitación H.C.** (checkbox + campos condicionales)
6. **Capacitación Epidemiología** (condicional según perfil)
7. **Aval Institucional** (campos de texto + fecha)
8. **Declaración** (checkbox)
9. **Botón: Enviar y Generar Excel**

---

## 💾 Exportación a Excel

Los datos deben exportarse a las plantillas originales respetando:
- Posición exacta de celdas
- Formato de checkboxes (X o ☑)
- Formato de fechas (día/mes/año)
- Espacios para firmas (dejar en blanco para firma manual o digital)

Ver `client/lib/excelExporter.ts` para configurar las celdas específicas.
