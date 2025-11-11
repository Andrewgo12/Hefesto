# Configuración de Templates Excel para Formularios

## Ubicación de los Templates

Los templates Excel están ubicados en:
```
hefesto-backend/storage/app/templates/
```

## Templates Disponibles

### 1. Formato Administrativo

#### Template con Mapeo (para previsualización)
- **Archivo**: `formato_administrativo_MAPEADO.xlsx`
- **Origen**: `C:\Users\ecom4450\Desktop\proyectos\HEFESTO\public\Documentos\Mapeado\formato_administrativo_MAPEADO.xlsx`
- **Uso**: Previsualización HTML con descripciones de campos
- **Función**: `previsualizarAdministrativa($id)`

#### Template Vacío (para exportación)
- **Archivo**: `formato_administrativo_MAPEADOVacio.xlsx`
- **Uso**: Exportación final a Excel sin texto descriptivo
- **Función**: `exportarAdministrativa($id)`

### 2. Formato Historia Clínica Electrónica

#### Template con Mapeo (para previsualización)
- **Archivo**: `formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx`
- **Origen**: `C:\Users\ecom4450\Desktop\proyectos\HEFESTO\public\Documentos\Mapeado\formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx`
- **Uso**: Previsualización HTML con descripciones de campos
- **Función**: `previsualizarHistoriaClinica($id)`

#### Template Vacío (para exportación)
- **Archivo**: `formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx`
- **Uso**: Exportación final a Excel sin texto descriptivo
- **Función**: `exportarHistoriaClinica($id)`

## Mapeo de Campos

### Formato Administrativo

#### Datos Básicos
| Campo | Celda | Descripción |
|-------|-------|-------------|
| Fecha Día | C6 | Día de solicitud |
| Fecha Mes | E6 | Mes de solicitud |
| Fecha Año | H6 | Año de solicitud |
| Nombre Completo | C8 | Nombre del usuario |
| Cédula | C10 | Número de identificación |
| Área/Servicio | C11 | Área de trabajo |
| Cargo | P10 | Cargo del usuario |
| Teléfono/Extensión | P11 | Contacto |

#### Vinculación (Fila 9)
- **Planta**: P9
- **Agremiado**: R9
- **Contrato**: T9

#### Módulos Administrativos (Filas 20-31)
Columnas: D=Anular, F=Consultar, H=Modificar, J=Borrar

Módulos:
1. Facturación (Fila 20)
2. Anticipos (Fila 21)
3. Farmacia (Fila 22)
4. Suministros (Fila 23)
5. Cartera (Fila 24)
6. Glosas (Fila 25)
7. Admisiones (Fila 26)
8. Ayudas Diagnósticas (Fila 27)
9. Citas Médicas (Fila 28)
10. Cirugía (Fila 29)
11. RIPS (Fila 30)
12. Anexos (Fila 31)

#### Módulos Financieros (Filas 20-26)
Columnas: Q=Anular, R=Consultar, S=Modificar, U=Borrar

Módulos:
1. Presupuesto (Fila 20)
2. Activos Fijos (Fila 21)
3. Contabilidad (Fila 22)
4. Cuentas por Pagar (Fila 23)
5. Caja y Bancos (Fila 24)
6. Costos (Fila 25)
7. Adm. De Documentos (Fila 26)

#### Opciones Web
- **Internet**: D34
- **Correo Electrónico**: D35
- **Transferencia de Archivos**: D36

#### Perfil De
- **Celda**: I33

#### Credenciales
- **Login**: C39
- **Clave**: P39

#### Firmas Digitales
- **Firma del Usuario**: F40
- **Vo. Bo. Jefe Inmediato**: A44
- **Vo. Bo. Jefe de Talento Humano**: G44
- **Vo. Bo. Jefe Gestión de la Información**: O44

### Formato Historia Clínica Electrónica

#### Datos Básicos
| Campo | Celda | Descripción |
|-------|-------|-------------|
| Nombre Completo | F5 | Nombre del usuario |
| Fecha Día | N6 | Día de solicitud |
| Fecha Mes | O6 | Mes de solicitud |
| Fecha Año | Q6 | Año de solicitud |
| Cédula | F7 | Número de identificación |
| Celular | N7 | Número de contacto |
| Área/Servicio | F8 | Área de trabajo |
| Registro/Código | N8 | Código de registro |
| Especialidad | F9 | Especialidad médica |
| Correo Electrónico | F10 | Email |
| Observaciones | K10 | Notas adicionales |

#### Perfil (Filas 13-15)
- **Médico General**: G13
- **Médico Especialista**: G14
- **Médico Residente**: G15
- **Enfermero Jefe**: L13
- **Auxiliar de Enfermería**: L14
- **Terapeuta**: L15
- **Auditor**: Q13
- **Otro (texto)**: Q14

#### Tipo de Vinculación
- **Celda**: M14
- Formato: "Interno (X) Externo ( )" o "Interno ( ) Externo (X)"

#### Terminal Asignado
- **Tablet**: G17
- **Portátil**: G18

#### Aval Institucional
- **Celda**: M16
- **Firma**: M17

#### Capacitación Historia Clínica
- **Sí**: B23
- **No**: D23
- **Nombre Capacitador**: I22
- **Firma Capacitador**: J22
- **Fecha Día**: N23
- **Fecha Mes**: O23
- **Fecha Año**: Q23

#### Capacitación Epidemiología
- **Sí**: B27
- **No**: D27
- **Nombre Capacitador**: I26
- **Firma Capacitador**: J26
- **Fecha Día**: N27
- **Fecha Mes**: O27
- **Fecha Año**: Q27

#### Firmas Digitales
- **Firma del Usuario**: A29
- **Firma Capacitador HC**: J22
- **Firma Capacitador Epidemiología**: J26
- **Firma Aval Institucional**: M17

## Funciones de Mapeo Robusto

El controlador `ExportacionController` incluye funciones auxiliares para manejo seguro de datos:

### `normalizarTexto($texto)`
Elimina tildes, espacios, guiones y convierte a minúsculas para comparación robusta.

### `cargoCoincide($cargo, $variantes)`
Verifica si un cargo coincide con alguna variante usando normalización.

### `toArray($data)`
Convierte cualquier dato (JSON, string, objeto, array) a array de forma segura.

### `getValue($data, $key, $default)`
Obtiene valor de array/JSON de forma segura con valor por defecto.

### `isTrue($value)`
Verifica si un valor booleano es verdadero (soporta múltiples formatos).

### `getFormattedDate($date, $format)`
Obtiene fecha formateada de forma segura.

## Flujo de Trabajo

### 1. Previsualización
```php
GET /api/exportacion/administrativa/{id}/preview
GET /api/exportacion/historia-clinica/{id}/preview
```
- Usa templates MAPEADOS (con descripciones)
- Genera HTML para visualización en navegador
- Incluye todas las firmas digitales como imágenes

### 2. Exportación
```php
GET /api/exportacion/administrativa/{id}
GET /api/exportacion/historia-clinica/{id}
```
- Usa templates VACÍOS (sin descripciones)
- Genera archivo Excel descargable
- Incluye firmas digitales como imágenes incrustadas
- Agrega información adicional del sistema al final

## Gestión de Firmas Digitales

Las firmas se almacenan en:
```
storage/app/firmas/administrativa/{solicitud_id}/
storage/app/firmas/historia_clinica/{solicitud_id}/
```

Formato de nombre: `{cargo_slug}_{timestamp}.png`

### Tipos de Firma Soportados

1. **Imagen Base64**: `data:image/png;base64,...`
   - Se decodifica y guarda como PNG
   - Se inserta en Excel como imagen

2. **Texto Firma**: `FIRMA_TEXTO:Nombre Usuario`
   - Se inserta como texto con fuente cursiva
   - Incluye fecha de firma

3. **Texto Simple**: Nombre del usuario
   - Se inserta como texto normal
   - Incluye fecha de firma

## Mantenimiento

### Actualizar Templates

Si necesitas actualizar los templates Excel:

1. Edita el archivo en `public/Documentos/Mapeado/`
2. Copia el archivo actualizado a `hefesto-backend/storage/app/templates/`
3. Verifica que el mapeo de celdas siga siendo correcto

### Verificar Templates

Usa el comando Artisan para analizar la estructura:

```bash
php artisan template:analizar formato_administrativo_MAPEADO.xlsx
php artisan template:analizar formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx
```

## Notas Importantes

1. **Versiones de Templates**: 
   - MAPEADO: Con descripciones para desarrollo y previsualización
   - Vacío: Sin descripciones para exportación final

2. **Compatibilidad**: 
   - Los templates soportan tanto formato nuevo (A,C,M,B) como formato viejo (adicionar, consultar, modificar, borrar)

3. **Firmas**: 
   - Las firmas se insertan como imágenes PNG de 60px de alto (administrativo) o 50px (historia clínica)
   - Se centran en las celdas con offset de 10px horizontal y 5px vertical

4. **Información Adicional**: 
   - Los exports incluyen información del sistema al final del documento
   - Estado, fase, fechas, observaciones, etc.
