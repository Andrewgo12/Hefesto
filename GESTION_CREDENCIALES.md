# 🔐 Gestión de Credenciales de Firmas Digitales

Sistema completo para administrar las personas autorizadas a firmar formularios en HEFESTO.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Componente React](#componente-react)
- [Base de Datos](#base-de-datos)

---

## ✨ Características

### Gestión Completa
- ✅ **Crear** nuevas credenciales de firma
- ✅ **Editar** credenciales existentes
- ✅ **Eliminar** credenciales
- ✅ **Activar/Desactivar** credenciales sin eliminarlas
- ✅ **Reordenar** el orden de aparición en formularios
- ✅ **Filtrar** por tipo de formulario

### Tipos de Formulario
- **Administrativa**: Solo para formularios administrativos
- **Historia Clínica**: Solo para formularios de historia clínica
- **Ambos**: Para ambos tipos de formularios

### Información Almacenada
- Cargo (único)
- Nombre completo
- Email (único)
- Cédula (opcional)
- Área/Departamento (opcional)
- Descripción del rol
- Estado (activo/inactivo)
- Orden de aparición

---

## 🚀 Instalación

### 1. Ejecutar Migración

```bash
cd hefesto-backend
php artisan migrate
```

### 2. Ejecutar Seeder (Datos Iniciales)

```bash
php artisan db:seed --class=CredencialesFirmasSeeder
```

Esto creará las siguientes credenciales por defecto:

**Para Formularios Administrativos:**
- Usuario
- Vo. Bo. Jefe Inmediato
- Vo. Bo. Jefe de Talento Humano
- Vo. Bo. Jefe Gestión de la Información

**Para Historia Clínica:**
- Usuario
- Aval Institucional
- Capacitador Historia Clínica
- Capacitador Epidemiología

---

## 💻 Uso

### Acceder a la Vista

1. Inicia sesión como administrador
2. Ve a la sección "Administración" o "Configuración"
3. Selecciona "Gestión de Credenciales de Firmas"

### Crear Nueva Credencial

1. Haz clic en "Nueva Credencial"
2. Completa el formulario:
   - **Cargo**: Nombre del cargo (ej: "Jefe Inmediato")
   - **Nombre Completo**: Nombre de la persona
   - **Email**: Correo electrónico único
   - **Cédula**: Opcional
   - **Área/Departamento**: Opcional
   - **Tipo de Formulario**: Selecciona dónde aplica
   - **Orden**: Número para ordenar (menor = primero)
   - **Descripción**: Explicación del rol
   - **Activo**: Marca si está activa
3. Haz clic en "Crear"

### Editar Credencial

1. Haz clic en el ícono de editar (✏️) en la credencial
2. Modifica los campos necesarios
3. Haz clic en "Actualizar"

### Activar/Desactivar

- Haz clic en el ícono de encendido/apagado (⚡)
- Las credenciales inactivas no aparecerán en los formularios

### Eliminar

1. Haz clic en el ícono de eliminar (🗑️)
2. Confirma la eliminación

---

## 📡 API Endpoints

### Listar Credenciales

```http
GET /api/credenciales-firmas
```

**Query Parameters:**
- `tipo_formulario`: `administrativa`, `historia_clinica`, `ambos`
- `activas`: `true` para solo activas

**Respuesta:**
```json
[
  {
    "id": 1,
    "cargo": "Usuario",
    "nombre_completo": "Usuario Solicitante",
    "email": "usuario@hospital.gov.co",
    "cedula": null,
    "area_departamento": "Variable",
    "activo": true,
    "descripcion": "Usuario que solicita el acceso",
    "tipo_formulario": "ambos",
    "orden": 1,
    "created_at": "2024-11-11T10:00:00.000000Z",
    "updated_at": "2024-11-11T10:00:00.000000Z"
  }
]
```

### Obtener Credencial por ID

```http
GET /api/credenciales-firmas/{id}
```

### Crear Credencial

```http
POST /api/credenciales-firmas
Content-Type: application/json

{
  "cargo": "Jefe de Área",
  "nombre_completo": "Juan Pérez",
  "email": "jperez@hospital.gov.co",
  "cedula": "1234567890",
  "area_departamento": "Administración",
  "descripcion": "Jefe de área que aprueba solicitudes",
  "tipo_formulario": "administrativa",
  "orden": 2,
  "activo": true
}
```

### Actualizar Credencial

```http
PUT /api/credenciales-firmas/{id}
Content-Type: application/json

{
  "nombre_completo": "Juan Pérez García",
  "email": "juan.perez@hospital.gov.co"
}
```

### Eliminar Credencial

```http
DELETE /api/credenciales-firmas/{id}
```

### Activar/Desactivar

```http
POST /api/credenciales-firmas/{id}/toggle-activo
```

### Reordenar

```http
POST /api/credenciales-firmas/reordenar
Content-Type: application/json

{
  "credenciales": [
    { "id": 1, "orden": 0 },
    { "id": 2, "orden": 1 },
    { "id": 3, "orden": 2 }
  ]
}
```

### Obtener por Tipo

```http
GET /api/credenciales-firmas/tipo/{tipo}
```

Donde `{tipo}` puede ser: `administrativa`, `historia_clinica`, `ambos`

---

## 🎨 Componente React

### Importar

```tsx
import GestionCredenciales from '@/components/GestionCredenciales';
```

### Usar

```tsx
function AdminPage() {
  return (
    <div>
      <GestionCredenciales />
    </div>
  );
}
```

### Props

El componente no requiere props, es completamente autónomo.

### Características del Componente

- **Interfaz Intuitiva**: Diseño limpio con shadcn/ui
- **Drag & Drop**: Reordenar credenciales arrastrando (próximamente)
- **Filtros**: Filtrar por tipo de formulario
- **Validación**: Validación de formularios en tiempo real
- **Feedback**: Toasts para confirmar acciones
- **Responsive**: Funciona en móviles y tablets

---

## 🗄️ Base de Datos

### Tabla: `credenciales_firmas`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | bigint | ID único |
| `cargo` | string | Cargo (único) |
| `nombre_completo` | string | Nombre completo |
| `email` | string | Email (único) |
| `cedula` | string | Cédula (opcional) |
| `area_departamento` | string | Área (opcional) |
| `activo` | boolean | Estado activo/inactivo |
| `descripcion` | text | Descripción del rol |
| `tipo_formulario` | enum | administrativa, historia_clinica, ambos |
| `orden` | integer | Orden de aparición |
| `created_at` | timestamp | Fecha de creación |
| `updated_at` | timestamp | Fecha de actualización |

### Índices

- `cargo`: UNIQUE
- `email`: UNIQUE
- `tipo_formulario`: INDEX
- `activo`: INDEX
- `orden`: INDEX

---

## 🔄 Integración con Formularios

### Obtener Credenciales para un Formulario

```typescript
// En el componente de formulario
const [firmantes, setFirmantes] = useState([]);

useEffect(() => {
  fetch('/api/credenciales-firmas/tipo/administrativa?activas=true')
    .then(res => res.json())
    .then(data => setFirmantes(data));
}, []);
```

### Mostrar Firmantes en Orden

```tsx
{firmantes.map((firmante) => (
  <div key={firmante.id}>
    <h3>{firmante.cargo}</h3>
    <p>{firmante.nombre_completo}</p>
    <FirmaDigital 
      cargo={firmante.cargo}
      email={firmante.email}
    />
  </div>
))}
```

---

## 🔒 Seguridad

### Validaciones

- **Cargo único**: No se pueden duplicar cargos
- **Email único**: No se pueden duplicar emails
- **Campos requeridos**: Cargo, nombre, email, tipo
- **Formato email**: Validación de formato de email

### Permisos

Solo usuarios con rol de **administrador** pueden:
- Crear credenciales
- Editar credenciales
- Eliminar credenciales
- Activar/desactivar credenciales

### Auditoría

- Todas las operaciones se registran con timestamps
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última modificación

---

## 📊 Ejemplos de Uso

### Ejemplo 1: Listar Credenciales Activas para Formulario Administrativo

```javascript
async function obtenerFirmantes() {
  const response = await fetch(
    '/api/credenciales-firmas/tipo/administrativa?activas=true'
  );
  const firmantes = await response.json();
  console.log(firmantes);
}
```

### Ejemplo 2: Crear Nueva Credencial

```javascript
async function crearCredencial() {
  const response = await fetch('/api/credenciales-firmas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cargo: 'Director Médico',
      nombre_completo: 'Dr. Carlos Ramírez',
      email: 'director.medico@hospital.gov.co',
      tipo_formulario: 'ambos',
      orden: 5,
      activo: true,
    }),
  });
  
  const data = await response.json();
  console.log(data);
}
```

### Ejemplo 3: Actualizar Orden de Credenciales

```javascript
async function reordenarCredenciales() {
  const response = await fetch('/api/credenciales-firmas/reordenar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      credenciales: [
        { id: 1, orden: 0 },
        { id: 2, orden: 1 },
        { id: 3, orden: 2 },
      ],
    }),
  });
  
  const data = await response.json();
  console.log(data);
}
```

---

## 🐛 Troubleshooting

### Error: "Cargo ya existe"

**Problema**: Intentas crear una credencial con un cargo que ya existe.

**Solución**: Usa un cargo diferente o edita la credencial existente.

### Error: "Email ya existe"

**Problema**: El email ya está registrado para otra credencial.

**Solución**: Usa un email diferente o edita la credencial existente.

### Las credenciales no aparecen en el formulario

**Problema**: Las credenciales están inactivas o no coincide el tipo.

**Solución**: 
1. Verifica que la credencial esté activa
2. Verifica que el `tipo_formulario` coincida

### El orden no se respeta

**Problema**: El campo `orden` no está configurado correctamente.

**Solución**: Asigna valores de orden secuenciales (0, 1, 2, 3...)

---

## 🚀 Próximas Mejoras

- [ ] Drag & Drop para reordenar visualmente
- [ ] Historial de cambios (auditoría completa)
- [ ] Notificaciones por email al crear/modificar
- [ ] Exportar/Importar credenciales (CSV/Excel)
- [ ] Búsqueda y filtros avanzados
- [ ] Asignación masiva de credenciales
- [ ] Integración con Active Directory/LDAP

---

## 📞 Soporte

Para soporte técnico, contactar al área de Gestión de la Información.

**Email**: sistemas@hospital.gov.co
