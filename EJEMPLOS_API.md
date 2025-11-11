# 📡 Ejemplos de Uso de la API HEFESTO

## Tabla de Contenidos
- [Exportación de Formularios](#exportación-de-formularios)
- [Previsualización HTML](#previsualización-html)
- [Gestión de Solicitudes](#gestión-de-solicitudes)
- [Firmas Digitales](#firmas-digitales)

---

## Exportación de Formularios

### Exportar Solicitud Administrativa a Excel

**Endpoint**: `GET /api/exportacion/administrativa/{id}`

**Ejemplo con cURL**:
```bash
curl -X GET "http://localhost:8000/api/exportacion/administrativa/1" \
  -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
  --output solicitud_administrativa_1.xlsx
```

**Ejemplo con JavaScript (Fetch)**:
```javascript
async function exportarAdministrativa(id) {
  const response = await fetch(`/api/exportacion/administrativa/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  });
  
  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solicitud_administrativa_${id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}

// Usar
exportarAdministrativa(1);
```

**Ejemplo con React**:
```jsx
import { useState } from 'react';

function ExportarButton({ solicitudId }) {
  const [loading, setLoading] = useState(false);
  
  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/exportacion/administrativa/${solicitudId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `solicitud_${solicitudId}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exportando:', error);
      alert('Error al exportar el archivo');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button onClick={handleExport} disabled={loading}>
      {loading ? 'Exportando...' : 'Exportar Excel'}
    </button>
  );
}
```

### Exportar Solicitud Historia Clínica a Excel

**Endpoint**: `GET /api/exportacion/historia-clinica/{id}`

**Ejemplo**:
```javascript
async function exportarHistoriaClinica(id) {
  const response = await fetch(`/api/exportacion/historia-clinica/${id}`);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `solicitud_historia_clinica_${id}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}
```

---

## Previsualización HTML

### Previsualizar Solicitud Administrativa

**Endpoint**: `GET /api/exportacion/administrativa/{id}/preview`

**Ejemplo con iframe**:
```html
<iframe 
  src="/api/exportacion/administrativa/1/preview" 
  width="100%" 
  height="800px"
  style="border: 1px solid #ccc;"
></iframe>
```

**Ejemplo con modal en React**:
```jsx
import { useState } from 'react';

function PreviewModal({ solicitudId, onClose }) {
  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Previsualización de Solicitud</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <iframe 
          src={`/api/exportacion/administrativa/${solicitudId}/preview`}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

function SolicitudCard({ solicitud }) {
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <>
      <div className="card">
        <h3>{solicitud.nombre_completo}</h3>
        <button onClick={() => setShowPreview(true)}>
          Ver Previsualización
        </button>
      </div>
      
      {showPreview && (
        <PreviewModal 
          solicitudId={solicitud.id}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
```

### Previsualizar Historia Clínica

**Endpoint**: `GET /api/exportacion/historia-clinica/{id}/preview`

**Ejemplo con nueva ventana**:
```javascript
function abrirPreview(id) {
  const url = `/api/exportacion/historia-clinica/${id}/preview`;
  window.open(url, '_blank', 'width=1200,height=800');
}
```

---

## Gestión de Solicitudes

### Crear Solicitud Administrativa

**Endpoint**: `POST /api/solicitudes-administrativas`

**Ejemplo completo**:
```javascript
async function crearSolicitudAdministrativa(datos) {
  const payload = {
    // Datos básicos
    nombre_completo: "Juan Pérez García",
    cedula: "1234567890",
    area_servicio: "Facturación",
    cargo: "Auxiliar Administrativo",
    telefono_extension: "1234",
    tipo_vinculacion: "Planta",
    
    // Módulos administrativos
    modulos_administrativos: {
      facturacion: { A: true, C: true, M: false, B: false },
      cartera: { A: false, C: true, M: false, B: false },
      admisiones: { A: true, C: true, M: true, B: false }
    },
    
    // Módulos financieros
    modulos_financieros: {
      presupuesto: { A: false, C: true, M: false, B: false },
      contabilidad: { A: false, C: true, M: false, B: false }
    },
    
    // Opciones web
    opciones_web: {
      internet: true,
      correoElectronico: true,
      transferenciaArchivos: false
    },
    
    // Perfil
    perfil_de: "Usuario de consulta",
    
    // Fecha
    fecha_solicitud: new Date().toISOString(),
    
    // Estado inicial
    estado: "pendiente",
    fase_actual: "firma_usuario"
  };
  
  const response = await fetch('/api/solicitudes-administrativas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log('Solicitud creada:', data);
    return data;
  } else {
    const error = await response.json();
    console.error('Error:', error);
    throw new Error(error.message);
  }
}

// Usar
crearSolicitudAdministrativa()
  .then(solicitud => {
    alert(`Solicitud creada con ID: ${solicitud.id}`);
  })
  .catch(error => {
    alert(`Error: ${error.message}`);
  });
```

### Crear Solicitud Historia Clínica

**Endpoint**: `POST /api/solicitudes-historia-clinica`

**Ejemplo**:
```javascript
async function crearSolicitudHistoriaClinica(datos) {
  const payload = {
    // Datos básicos
    nombre_completo: "Dra. María López",
    cedula: "9876543210",
    celular: "3001234567",
    area_servicio: "Urgencias",
    registro_codigo: "REG-2024-001",
    especialidad: "Medicina General",
    correo_electronico: "maria.lopez@hospital.gov.co",
    observaciones: "Usuario nuevo",
    
    // Perfil
    perfil: "Médico General",
    tipo_vinculacion: "Interno",
    
    // Terminal
    terminal_asignado: "Tablet",
    
    // Aval institucional
    aval_institucional: {
      avaladoPor: "Dr. Carlos Ramírez",
      cargo: "Jefe de Urgencias"
    },
    
    // Capacitación Historia Clínica
    capacitacion_historia_clinica: {
      capacitacionRealizada: true,
      nombreCapacitador: "Lic. Ana Martínez",
      fechaCapacitacion: "2024-11-10"
    },
    
    // Capacitación Epidemiología (solo para médicos)
    capacitacion_epidemiologia: {
      capacitacionRealizada: true,
      nombreCapacitador: "Dr. Pedro González",
      fechaCapacitacion: "2024-11-10"
    },
    
    // Fecha
    fecha_solicitud: new Date().toISOString(),
    
    // Estado
    estado: "pendiente",
    fase_actual: "firma_usuario"
  };
  
  const response = await fetch('/api/solicitudes-historia-clinica', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  return await response.json();
}
```

### Listar Solicitudes

**Endpoint**: `GET /api/solicitudes-administrativas`

**Con filtros**:
```javascript
async function listarSolicitudes(filtros = {}) {
  const params = new URLSearchParams();
  
  if (filtros.estado) params.append('estado', filtros.estado);
  if (filtros.fecha_desde) params.append('fecha_desde', filtros.fecha_desde);
  if (filtros.fecha_hasta) params.append('fecha_hasta', filtros.fecha_hasta);
  if (filtros.busqueda) params.append('busqueda', filtros.busqueda);
  
  const response = await fetch(`/api/solicitudes-administrativas?${params}`);
  return await response.json();
}

// Ejemplos de uso
listarSolicitudes({ estado: 'pendiente' });
listarSolicitudes({ fecha_desde: '2024-11-01', fecha_hasta: '2024-11-30' });
listarSolicitudes({ busqueda: 'Juan Pérez' });
```

---

## Firmas Digitales

### Agregar Firma a Solicitud

**Endpoint**: `POST /api/solicitudes-administrativas/{id}/firmar`

**Ejemplo con firma de canvas**:
```javascript
async function firmarSolicitud(solicitudId, cargo, firmaCanvas) {
  // Obtener imagen del canvas
  const firmaDataURL = firmaCanvas.toDataURL('image/png');
  
  const payload = {
    cargo: cargo,
    firma: firmaDataURL,
    usuario: "Juan Pérez",
    fecha: new Date().toISOString()
  };
  
  const response = await fetch(`/api/solicitudes-administrativas/${solicitudId}/firmar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  return await response.json();
}

// Uso con canvas
const canvas = document.getElementById('firma-canvas');
firmarSolicitud(1, 'Usuario', canvas);
```

**Ejemplo con componente React**:
```jsx
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function FirmaDigital({ solicitudId, cargo, onFirmado }) {
  const sigCanvas = useRef();
  const [loading, setLoading] = useState(false);
  
  const limpiar = () => {
    sigCanvas.current.clear();
  };
  
  const guardarFirma = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Por favor, firme antes de guardar');
      return;
    }
    
    setLoading(true);
    try {
      const firmaDataURL = sigCanvas.current.toDataURL('image/png');
      
      const response = await fetch(`/api/solicitudes-administrativas/${solicitudId}/firmar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cargo: cargo,
          firma: firmaDataURL,
          usuario: "Usuario Actual", // Obtener del contexto
          fecha: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Firma guardada exitosamente');
        onFirmado(data);
      }
    } catch (error) {
      alert('Error al guardar la firma');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="firma-container">
      <h3>Firma Digital - {cargo}</h3>
      <div className="canvas-wrapper">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas'
          }}
        />
      </div>
      <div className="buttons">
        <button onClick={limpiar}>Limpiar</button>
        <button onClick={guardarFirma} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Firma'}
        </button>
      </div>
    </div>
  );
}
```

### Verificar Estado de Firmas

**Endpoint**: `GET /api/solicitudes-administrativas/{id}`

**Ejemplo**:
```javascript
async function verificarFirmas(solicitudId) {
  const response = await fetch(`/api/solicitudes-administrativas/${solicitudId}`);
  const solicitud = await response.json();
  
  const firmas = solicitud.firmas || {};
  
  console.log('Firmas registradas:');
  Object.keys(firmas).forEach(cargo => {
    const firma = firmas[cargo];
    console.log(`- ${cargo}: ${firma.usuario} (${firma.fecha})`);
  });
  
  // Verificar qué firmas faltan
  const firmasRequeridas = [
    'Usuario',
    'Vo. Bo. Jefe Inmediato',
    'Vo. Bo. Jefe de Talento Humano',
    'Vo. Bo. Jefe Gestión de la Información'
  ];
  
  const firmasFaltantes = firmasRequeridas.filter(
    cargo => !firmas[cargo]
  );
  
  if (firmasFaltantes.length > 0) {
    console.log('Firmas faltantes:', firmasFaltantes);
  } else {
    console.log('✅ Todas las firmas completas');
  }
  
  return {
    completo: firmasFaltantes.length === 0,
    faltantes: firmasFaltantes
  };
}
```

---

## Respuestas de la API

### Respuesta Exitosa (200 OK)
```json
{
  "id": 1,
  "nombre_completo": "Juan Pérez García",
  "cedula": "1234567890",
  "estado": "pendiente",
  "fase_actual": "firma_usuario",
  "created_at": "2024-11-11T10:30:00.000000Z",
  "updated_at": "2024-11-11T10:30:00.000000Z"
}
```

### Error de Validación (422 Unprocessable Entity)
```json
{
  "message": "Los datos proporcionados no son válidos",
  "errors": {
    "nombre_completo": [
      "El campo nombre completo es obligatorio"
    ],
    "cedula": [
      "El campo cédula debe tener 10 dígitos"
    ]
  }
}
```

### Error de Servidor (500 Internal Server Error)
```json
{
  "error": "Error al generar el archivo",
  "message": "Template no encontrado"
}
```

---

## Tips y Mejores Prácticas

### 1. Manejo de Errores
```javascript
async function apiCall(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la petición');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
}
```

### 2. Validación de Datos
```javascript
function validarSolicitud(datos) {
  const errores = [];
  
  if (!datos.nombre_completo) {
    errores.push('Nombre completo es requerido');
  }
  
  if (!datos.cedula || datos.cedula.length !== 10) {
    errores.push('Cédula debe tener 10 dígitos');
  }
  
  if (errores.length > 0) {
    throw new Error(errores.join(', '));
  }
  
  return true;
}
```

### 3. Loading States
```javascript
function useSolicitud(id) {
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`/api/solicitudes-administrativas/${id}`)
      .then(res => res.json())
      .then(data => {
        setSolicitud(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  
  return { solicitud, loading, error };
}
```

---

## 🔗 Referencias

- **API Base URL**: `http://localhost:8000/api`
- **Documentación completa**: `CONFIGURACION_TEMPLATES_EXCEL.md`
- **Firmas digitales**: `INSTRUCCIONES_FIRMAS_DIGITALES.md`
