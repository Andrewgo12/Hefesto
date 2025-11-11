# ✅ RESUMEN: Configuración de Templates Excel para HEFESTO

## 📋 Estado Actual

Los templates Excel están **correctamente configurados** y listos para usar en el sistema HEFESTO.

## 📁 Ubicación de Archivos

### Templates en Producción (Backend Laravel)
```
hefesto-backend/storage/app/templates/
├── formato_administrativo_MAPEADO.xlsx (23,520 bytes)
├── formato_administrativo_MAPEADOVacio.xlsx (22,027 bytes)
├── formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx (24,133 bytes)
└── formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx (25,013 bytes)
```

### Templates Originales (Documentación)
```
public/Documentos/Mapeado/
├── formato_administrativo_MAPEADO.csv
├── formato_administrativo_MAPEADO.xlsx
├── formatocreacionusuarioshistoriaclinicaelectronicavmapeado.csv
└── formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx
```

## 🎯 Uso de Templates

### 1. Formato Administrativo

#### Para Previsualización HTML
```php
// Endpoint: GET /api/exportacion/administrativa/{id}/preview
// Template: formato_administrativo_MAPEADO.xlsx
// Función: ExportacionController@previsualizarAdministrativa
```

**Características:**
- Contiene descripciones de campos en cada celda
- Ideal para desarrollo y debugging
- Genera HTML para visualización en navegador
- Incluye firmas digitales como imágenes

#### Para Exportación Excel
```php
// Endpoint: GET /api/exportacion/administrativa/{id}
// Template: formato_administrativo_MAPEADOVacio.xlsx
// Función: ExportacionController@exportarAdministrativa
```

**Características:**
- Sin texto descriptivo, solo estructura
- Genera archivo Excel limpio para descarga
- Incluye firmas digitales incrustadas
- Agrega información del sistema al final

### 2. Formato Historia Clínica Electrónica

#### Para Previsualización HTML
```php
// Endpoint: GET /api/exportacion/historia-clinica/{id}/preview
// Template: formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx
// Función: ExportacionController@previsualizarHistoriaClinica
```

#### Para Exportación Excel
```php
// Endpoint: GET /api/exportacion/historia-clinica/{id}
// Template: formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx
// Función: ExportacionController@exportarHistoriaClinica
```

## 🗺️ Mapeo de Campos Principales

### Formato Administrativo

| Sección | Campos | Celdas |
|---------|--------|--------|
| **Fecha** | Día, Mes, Año | C6, E6, H6 |
| **Datos Básicos** | Nombre, Cédula, Área, Cargo, Teléfono | C8, C10, C11, P10, P11 |
| **Vinculación** | Planta, Agremiado, Contrato | P9, R9, T9 |
| **Módulos Admin** | 12 módulos con ACMB | Filas 20-31, Columnas D,F,H,J |
| **Módulos Financ** | 7 módulos con ACMB | Filas 20-26, Columnas Q,R,S,U |
| **Web** | Internet, Email, Transferencias | D34, D35, D36 |
| **Credenciales** | Login, Clave | C39, P39 |
| **Firmas** | Usuario, Jefe, RRHH, TI | F40, A44, G44, O44 |

### Formato Historia Clínica

| Sección | Campos | Celdas |
|---------|--------|--------|
| **Fecha** | Día, Mes, Año | N6, O6, Q6 |
| **Datos Básicos** | Nombre, Cédula, Celular, Área, Especialidad | F5, F7, N7, F8, F9 |
| **Perfil** | 7 tipos de perfil | G13-G15, L13-L15, Q13-Q14 |
| **Vinculación** | Interno/Externo | M14 |
| **Terminal** | Tablet, Portátil | G17, G18 |
| **Aval** | Nombre y Firma | M16, M17 |
| **Cap. HC** | Sí/No, Capacitador, Fecha | B23, D23, I22, N23-Q23 |
| **Cap. Epi** | Sí/No, Capacitador, Fecha | B27, D27, I26, N27-Q27 |
| **Firmas** | Usuario, Capacitadores, Aval | A29, J22, J26, M17 |

## 🔧 Funciones Auxiliares del Sistema

El `ExportacionController` incluye métodos robustos para manejo de datos:

### Normalización y Comparación
```php
normalizarTexto($texto)          // Elimina tildes, espacios, convierte a minúsculas
cargoCoincide($cargo, $variantes) // Compara cargo con variantes normalizadas
```

### Conversión Segura de Datos
```php
toArray($data)                    // Convierte JSON/string/objeto a array
getValue($data, $key, $default)   // Obtiene valor con fallback
isTrue($value)                    // Verifica booleano en múltiples formatos
getFormattedDate($date, $format)  // Formatea fecha de forma segura
```

## 📸 Gestión de Firmas Digitales

### Almacenamiento
```
storage/app/firmas/
├── administrativa/{solicitud_id}/
│   ├── usuario_20241111103000.png
│   ├── jefe_inmediato_20241111103100.png
│   └── ...
└── historia_clinica/{solicitud_id}/
    ├── usuario_20241111103000.png
    └── ...
```

### Formatos Soportados

1. **Imagen Base64** (Preferido)
   ```
   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
   ```
   - Se decodifica y guarda como PNG
   - Se inserta en Excel como imagen de 50-60px

2. **Texto Firma**
   ```
   FIRMA_TEXTO:Juan Pérez
   ```
   - Se inserta como texto con fuente cursiva (Brush Script MT)
   - Incluye fecha de firma

3. **Texto Simple**
   ```
   Juan Pérez
   ```
   - Se inserta como texto normal
   - Incluye fecha de firma

## 🚀 Comandos Artisan Disponibles

### Verificar Templates
```bash
php artisan templates:verificar
```
Verifica que todos los templates estén correctamente configurados:
- Existencia de archivos
- Tamaño adecuado
- Estructura Excel válida
- Celdas críticas presentes
- Palabras clave del formato

### Analizar Template
```bash
php artisan template:analizar formato_administrativo_MAPEADO.xlsx
php artisan template:analizar formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx
```
Busca y lista celdas con palabras clave de firmas.

## 📊 Flujo de Trabajo Completo

### 1. Usuario Llena Formulario
- Frontend React captura datos
- Incluye firmas digitales (canvas o upload)
- Envía a API Laravel

### 2. Sistema Almacena Solicitud
- Guarda en base de datos
- Estado inicial: "pendiente"
- Firmas en formato JSON

### 3. Previsualización
- Usuario solicita preview
- Sistema carga template MAPEADO
- Rellena campos con datos
- Inserta firmas como imágenes
- Genera HTML para navegador

### 4. Aprobación/Rechazo
- Flujo de firmas digitales
- Actualización de estados
- Notificaciones

### 5. Exportación Final
- Usuario descarga Excel
- Sistema carga template VACÍO
- Rellena campos con datos
- Inserta firmas como imágenes
- Agrega info del sistema
- Genera archivo Excel limpio

## ✅ Verificación de Configuración

### Checklist

- [x] Templates Excel copiados a `storage/app/templates/`
- [x] Archivos con tamaño correcto (22-25 KB)
- [x] Mapeo de celdas documentado
- [x] Funciones de exportación implementadas
- [x] Funciones de previsualización implementadas
- [x] Gestión de firmas digitales configurada
- [x] Comandos Artisan creados
- [x] Documentación completa

## 📝 Notas Importantes

1. **No modificar directamente los templates en `storage/app/templates/`**
   - Editar primero en `public/Documentos/Mapeado/`
   - Luego copiar a `storage/app/templates/`

2. **Mantener sincronizados los CSV y XLSX**
   - Los CSV contienen las descripciones de mapeo
   - Los XLSX son los templates reales

3. **Backup de templates**
   - Los originales están en `public/Documentos/Mapeado/`
   - Hacer backup antes de modificar

4. **Compatibilidad de formatos**
   - Sistema soporta formato nuevo (A,C,M,B)
   - También soporta formato viejo (adicionar, consultar, modificar, borrar)

## 🔗 Referencias

- **Documentación completa**: `CONFIGURACION_TEMPLATES_EXCEL.md`
- **Instrucciones de firmas**: `INSTRUCCIONES_FIRMAS_DIGITALES.md`
- **Controlador**: `hefesto-backend/app/Http/Controllers/Api/ExportacionController.php`
- **Comandos**: `hefesto-backend/app/Console/Commands/`

## 🎉 ¡Todo Listo!

El sistema está completamente configurado para usar los templates Excel mapeados en la generación de PDFs y exportación de formularios.

**Próximos pasos sugeridos:**
1. Probar exportación de solicitud administrativa
2. Probar exportación de solicitud historia clínica
3. Verificar que las firmas se inserten correctamente
4. Ajustar estilos si es necesario
