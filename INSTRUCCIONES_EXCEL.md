# Instrucciones para Configurar la Exportación a Excel

## ✅ Implementación Completada

Se han actualizado los formularios de registro con **todos los campos** necesarios basados en los formatos Excel institucionales:

### 📋 Formulario Administrativo
- ✅ Datos personales completos
- ✅ Datos de contacto
- ✅ Información laboral
- ✅ Accesos y permisos
- ✅ Justificación
- ✅ Información del solicitante
- ✅ Observaciones

### 🏥 Formulario de Historia Clínica
- ✅ Datos personales
- ✅ Datos de contacto (incluye celular)
- ✅ Información profesional
- ✅ Servicios y áreas de atención
- ✅ Accesos a historia clínica
- ✅ Accesos adicionales (Laboratorio, Imagenología, Farmacia, Quirófano)
- ✅ Justificación
- ✅ Capacitación
- ✅ Información del solicitante
- ✅ Observaciones

---

## 🔧 Configuración Requerida

### Paso 1: Mapear las Celdas del Excel

Los archivos Excel están en: `client/lib/Documentos/`

Para que la exportación funcione correctamente, debes ajustar las referencias de celdas en:
**`client/lib/excelExporter.ts`**

#### Para el Formulario Administrativo:

Abre el archivo Excel: `formato_creacion_usuarios_administrativosv1 (3).xlsx`

Identifica en qué celda del Excel va cada campo y actualiza el objeto `celdasFormulario` en la función `exportarFormularioAdministrativo`:

```typescript
const celdasFormulario = {
  'B5': datos.nombreCompleto,      // ← Ajusta 'B5' a la celda real
  'B6': datos.cedula,               // ← Ajusta 'B6' a la celda real
  'B7': datos.cargo,                // ← Y así sucesivamente...
  // ... etc
};
```

**Ejemplo de cómo identificar las celdas:**
1. Abre el Excel en Microsoft Excel o LibreOffice
2. Busca dónde dice "Nombre Completo:" en el formato
3. Mira la celda donde se debe escribir el dato (ejemplo: C5)
4. Actualiza el código con esa referencia

#### Para el Formulario de Historia Clínica:

Abre el archivo Excel: `formato_creacion_usuarios_historia_clinica_electronicav2 (2) (1).xlsx`

Actualiza el objeto `celdasFormulario` en la función `exportarFormularioHistoriaClinica`:

```typescript
const celdasFormulario = {
  'B5': datos.nombreCompleto,
  'B6': datos.cedula,
  'B7': datos.registroMedico || '',
  // ... etc
};
```

---

### Paso 2: Copiar los Archivos Excel al Public

Los archivos Excel deben ser accesibles desde el navegador. Copia los archivos a la carpeta `public`:

```bash
# Crear carpeta public si no existe
mkdir public/lib/Documentos -p

# Copiar los archivos Excel
copy "client/lib/Documentos/formato_creacion_usuarios_administrativosv1 (3).xlsx" "public/lib/Documentos/"
copy "client/lib/Documentos/formato_creacion_usuarios_historia_clinica_electronicav2 (2) (1).xlsx" "public/lib/Documentos/"
```

---

## 📝 Campos Implementados

### Formulario Administrativo
| Campo | Tipo | Requerido |
|-------|------|-----------|
| nombreCompleto | string | ✅ |
| cedula | string | ✅ |
| cargo | string | ✅ |
| dependencia | string | ✅ |
| area | string | ✅ |
| correoInstitucional | email | ✅ |
| extension | string | ❌ |
| telefono | string | ❌ |
| fechaIngreso | date | ✅ |
| tipoContrato | select | ✅ |
| supervisorInmediato | string | ✅ |
| nivelAcceso | select | ✅ |
| justificacionAcceso | textarea | ✅ |
| funcionesPrincipales | textarea | ✅ |
| solicitadoPor | string | ✅ |
| fechaSolicitud | date | ✅ |
| observaciones | textarea | ❌ |

### Formulario Historia Clínica
| Campo | Tipo | Requerido |
|-------|------|-----------|
| nombreCompleto | string | ✅ |
| cedula | string | ✅ |
| registroMedico | string | ❌ |
| especialidad | string | ✅ |
| correoInstitucional | email | ✅ |
| extension | string | ❌ |
| telefono | string | ❌ |
| celular | string | ❌ |
| tipoProfesional | select | ✅ |
| institucionFormacion | string | ❌ |
| anoGraduacion | string | ❌ |
| servicioAsignado | string | ✅ |
| turno | select | ❌ |
| nivelAccesoHistoria | select | ✅ |
| accesoLaboratorio | checkbox | ❌ |
| accesoImagenologia | checkbox | ❌ |
| accesoFarmacia | checkbox | ❌ |
| accesoQuirofano | checkbox | ❌ |
| justificacionAcceso | textarea | ✅ |
| funcionesAsistenciales | textarea | ✅ |
| capacitacionHistoriaClinica | checkbox | ❌ |
| fechaCapacitacion | date | ❌ |
| solicitadoPor | string | ✅ |
| fechaSolicitud | date | ✅ |
| observaciones | textarea | ❌ |

---

## 🚀 Cómo Usar

1. **Llenar el formulario** en la interfaz web
2. **Hacer clic en "Enviar y Descargar Excel"**
3. El sistema:
   - Valida los campos requeridos
   - Carga la plantilla Excel correspondiente
   - Llena las celdas con los datos del formulario
   - Descarga el archivo Excel con los datos

---

## 🔍 Verificación

Para probar que funciona:

1. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

2. Navega a:
   - `/registro/administrativo` - Para formulario administrativo
   - `/registro/medico` - Para formulario médico

3. Llena los campos y envía el formulario

4. Verifica que se descargue el Excel con los datos en las celdas correctas

---

## ⚠️ Notas Importantes

- **Las referencias de celdas son PLACEHOLDERS** - Debes ajustarlas según tu Excel real
- Los archivos Excel deben estar en la carpeta `public` para ser accesibles
- Si cambias la ubicación de los Excel, actualiza las rutas en `excelExporter.ts`
- Puedes agregar más campos editando las interfaces en `shared/types/formularios.ts`

---

## 📚 Archivos Modificados/Creados

- ✅ `shared/types/formularios.ts` - Interfaces TypeScript
- ✅ `client/lib/excelExporter.ts` - Lógica de exportación
- ✅ `client/pages/Registro.tsx` - Formularios completos actualizados
- ✅ `package.json` - Dependencia xlsx agregada
