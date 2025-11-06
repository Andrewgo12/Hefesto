# 🔧 Resumen: Problemas y Soluciones para el Mapeo de Excel

## ❌ Problemas Identificados

### **Formulario Historia Clínica (FOR-GDI-SIS-003)**

| # | Problema | Celda Afectada | Estado |
|---|----------|----------------|--------|
| 1 | Nombre del capacitador (HC) no aparece | I22 | ❌ |
| 2 | Fecha de capacitación (HC) no aparece | N23, O23, Q23 | ❌ |
| 3 | Nombre del capacitador (Epi) no aparece | I26 | ❌ |
| 4 | Fecha de capacitación (Epi) no aparece | N27, O27, Q27 | ❌ |
| 5 | Firma del usuario solicitante no aparece | A29 | ❌ |
| 6 | LOGIN no aparece | F30 | ❌ |
| 7 | CREADO POR no aparece | N30 | ❌ |
| 8 | Perfil "Auditor" no se marca | Q13 | ❌ |

---

## 🔍 Causa Raíz

### **1. Nombres de Campos Inconsistentes**

**El backend busca:**
```php
$cap['nombreCapacitador']  // ❌ No existe
$cap['fechaCapacitacion']  // ❌ No existe
```

**El frontend envía:**
```json
{
  "instructor": "Dr. Carlos López",  // ✅ Este es el nombre correcto
  "fecha": "2025-01-12"              // ✅ Este es el nombre correcto
}
```

### **2. Celdas No Mapeadas**

```php
// ❌ FALTAN ESTAS LÍNEAS EN EL CÓDIGO:
$sheet->setCellValue('F30', $solicitud->login_creado_por);
$sheet->setCellValue('N30', $solicitud->registrado_por_nombre);
```

---

## ✅ Soluciones

### **Solución 1: Usar Múltiples Fallbacks**

**Archivo:** `app/Http/Controllers/Api/ExportacionController.php`

**Buscar línea 973 (aproximadamente):**
```php
$sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? '');
```

**Reemplazar por:**
```php
$sheet->setCellValue('I22', $cap['nombreCapacitador'] ?? $cap['instructor'] ?? $cap['capacitador'] ?? '');
```

**Buscar línea 974-979 (aproximadamente):**
```php
if (isset($cap['fechaCapacitacion'])) {
    $fechaCap = new \DateTime($cap['fechaCapacitacion']);
    $sheet->setCellValue('N23', $fechaCap->format('d'));
    $sheet->setCellValue('O23', $fechaCap->format('m'));
    $sheet->setCellValue('Q23', $fechaCap->format('Y'));
}
```

**Reemplazar por:**
```php
$fechaCap = $cap['fechaCapacitacion'] ?? $cap['fecha'] ?? null;
if ($fechaCap) {
    try {
        $fechaCap = new \DateTime($fechaCap);
        $sheet->setCellValue('N23', $fechaCap->format('d'));
        $sheet->setCellValue('O23', $fechaCap->format('m'));
        $sheet->setCellValue('Q23', $fechaCap->format('Y'));
    } catch (\Exception $e) {
        \Log::error('Error parseando fecha capacitación HC: ' . $e->getMessage());
    }
}
```

**Repetir lo mismo para Capacitación Epidemiología (líneas 990-996 aproximadamente)**

---

### **Solución 2: Agregar Mapeo de LOGIN y CREADO POR**

**Buscar línea 1077 (aproximadamente):**
```php
// Agregar información adicional al final del documento
$lastRow = $sheet->getHighestRow() + 3;
```

**Agregar ANTES de esa línea:**
```php
// LOGIN y CREADO POR (en las celdas correspondientes del template)
$loginRow = 30; // Ajustar según el template
$sheet->setCellValue('F' . $loginRow, $solicitud->login_creado_por ?? '');
$sheet->setCellValue('N' . $loginRow, $solicitud->registrado_por_nombre ?? 'Sistema');

```

---

### **Solución 3: Agregar Perfil "Auditor"**

**Buscar línea 946 (aproximadamente):**
```php
if (stripos($perfil, 'terapeuta') !== false) $sheet->setCellValue('L15', 'X');
```

**Agregar DESPUÉS:**
```php
if (stripos($perfil, 'auditor') !== false) {
    $sheet->setCellValue('Q13', 'X');
}
// Si es "Otro", escribir el texto
if (stripos($perfil, 'otro') !== false && $solicitud->perfil_otro) {
    $sheet->setCellValue('Q14', $solicitud->perfil_otro);
}
```

---

## 📋 Checklist de Correcciones

- [ ] **Línea ~973:** Cambiar `$cap['nombreCapacitador']` por fallbacks múltiples
- [ ] **Línea ~974-979:** Cambiar `$cap['fechaCapacitacion']` por fallbacks y agregar try-catch
- [ ] **Línea ~990:** Cambiar `$cap['nombreCapacitador']` por fallbacks múltiples (Epi)
- [ ] **Línea ~991-996:** Cambiar `$cap['fechaCapacitacion']` por fallbacks y agregar try-catch (Epi)
- [ ] **Línea ~1077:** Agregar mapeo de LOGIN (F30) y CREADO POR (N30)
- [ ] **Línea ~946:** Agregar mapeo de perfil "Auditor" (Q13)
- [ ] **Repetir TODAS las correcciones para la sección de PREVIEW** (líneas ~426-500 aproximadamente)

---

## 🧪 Verificación

Después de aplicar las correcciones, probar:

1. ✅ Crear solicitud con capacitaciones completas
2. ✅ Exportar a Excel
3. ✅ Verificar que aparezca:
   - Nombre del capacitador HC (celda I22)
   - Fecha de capacitación HC (celdas N23, O23, Q23)
   - Nombre del capacitador Epi (celda I26)
   - Fecha de capacitación Epi (celdas N27, O27, Q27)
   - LOGIN (celda F30)
   - CREADO POR (celda N30)
   - Firma del solicitante (celda A29)

---

## 📝 Notas Importantes

1. **Hay DOS secciones idénticas en el archivo:**
   - Sección de PREVIEW (líneas ~400-500)
   - Sección de EXPORT (líneas ~900-1000)
   - **AMBAS deben ser corregidas**

2. **Los números de línea son aproximados** - buscar por el contenido exacto del código

3. **Hacer backup del archivo antes de modificar:**
   ```bash
   cp app/Http/Controllers/Api/ExportacionController.php app/Http/Controllers/Api/ExportacionController.php.backup
   ```

---

**Fecha:** 06/11/2025  
**Estado:** 📋 Pendiente de aplicar correcciones manualmente
