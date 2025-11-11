# 🖊️ Firmas Digitales - Instrucciones de Prueba

## ✅ Cambios Realizados

Se han agregado firmas digitales de prueba a **todas las solicitudes** (administrativas y de historia clínica) para verificar que se generen correctamente en Excel y PDF.

---

## 📋 Solicitudes Administrativas

### Firmas Agregadas:
1. **Usuario** → Celda F40 (FIRMA DEL USUARIO)
2. **Vo. Bo. Jefe Inmediato** → Celda A44 ✅
3. **Vo. Bo. Jefe de Talento Humano** → Celda G44 ✅
4. **Vo. Bo. Jefe Gestión de la Información** → Celda O44 ✅

### Mapeo de Cargos:
- **"avalado"** o **"avalado por"** → Se mapea a la misma celda que "Jefe Inmediato" (A44)
- Soporta variantes: "jefe inmediato", "inmediato", "jefe directo", "vo bo jefe inmediato"

### Total Actualizado:
✅ **24 solicitudes administrativas** con 4 firmas cada una

---

## 🏥 Solicitudes de Historia Clínica

### Firmas Agregadas:
1. **Solicitante** → Celda A29 ✅
2. **Capacitador Historia Clínica** → Celda J22 ✅
3. **Capacitador Epidemiología** → Celda J26 ✅
4. **Aval Institucional** → Celda M17 ✅

### Total Actualizado:
✅ **17 solicitudes de historia clínica** con 4 firmas cada una

---

## 🧪 Cómo Probar

### 1. Descargar Excel
```
GET /api/exportar/administrativa/{id}
GET /api/exportar/historia-clinica/{id}
```

### 2. Verificar en Excel:
- Abrir el archivo descargado
- Buscar las celdas de firmas mencionadas arriba
- Verificar que aparezcan:
  - Nombre del firmante
  - Fecha de firma
  - Texto de la firma

### 3. Descargar PDF:
- Usar el botón "Descargar PDF" en la interfaz
- Verificar que las firmas se muestren correctamente

---

## 🔧 Comando Artisan

Para volver a ejecutar el proceso de agregar firmas:

```bash
php artisan firmas:agregar-test
```

Este comando:
- Busca todas las solicitudes administrativas y de historia clínica
- Agrega firmas de prueba a cada una
- Usa el nombre real del solicitante para la primera firma
- Actualiza los contadores de firmas completadas

---

## 📝 Formato de Firmas

Las firmas se guardan en formato JSON:

```json
{
  "Usuario": {
    "usuario": "Juan Pérez García",
    "fecha": "2024-11-08 10:12:00",
    "firma": "FIRMA_TEXTO:Juan Pérez García"
  },
  "Vo. Bo. Jefe Inmediato": {
    "usuario": "María López Rodríguez",
    "fecha": "2024-11-09 10:12:00",
    "firma": "FIRMA_TEXTO:María López Rodríguez"
  }
}
```

### Tipos de Firma Soportados:
1. **FIRMA_TEXTO:** - Firma de texto simple
2. **data:image/png;base64,...** - Firma dibujada (imagen base64)

---

## 🔍 Verificación de Mapeo

El sistema normaliza los nombres de cargo para soportar:
- Tildes (á, é, í, ó, ú)
- Mayúsculas/minúsculas
- Espacios, guiones, guiones bajos
- Variantes del mismo cargo

Ejemplo: "Vo. Bo. Jefe Inmediato" coincide con:
- "jefe inmediato"
- "Jefe Inmediato"
- "vo bo jefe inmediato"
- "avalado por"
- "avalado"

---

## 📊 Estadísticas

- **Total solicitudes procesadas:** 41
- **Solicitudes administrativas:** 24
- **Solicitudes historia clínica:** 17
- **Firmas totales agregadas:** 164 (24×4 + 17×4)

---

## ⚠️ Notas Importantes

1. Las firmas son de **prueba** y usan texto simulado
2. Para producción, las firmas deben ser capturadas por los usuarios reales
3. El sistema soporta tanto firmas de texto como firmas dibujadas (canvas)
4. Las imágenes de firma se guardan en `storage/app/firmas/{tipo}/{id}/`

---

## 🎯 Próximos Pasos

1. ✅ Descargar un Excel de solicitud administrativa
2. ✅ Verificar que las 4 firmas aparezcan en las celdas correctas
3. ✅ Descargar un Excel de solicitud de historia clínica
4. ✅ Verificar que las 4 firmas aparezcan en las celdas correctas
5. ✅ Probar la descarga de PDF para ambos tipos
6. ✅ Confirmar que las firmas se visualicen correctamente

---

**Fecha de actualización:** 11 de noviembre de 2024
**Comando ejecutado:** `php artisan firmas:agregar-test`
