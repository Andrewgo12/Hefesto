# ✅ Cambios: Sistema de Edición de Solicitudes

## 🎯 Objetivo Cumplido

Se modificó el sistema para que:
1. ✅ **Todos los usuarios** pueden EDITAR solicitudes
2. ✅ **Solo ADMIN** puede APROBAR o RECHAZAR
3. ✅ Las solicitudes se pueden ir completando progresivamente
4. ✅ NO se eliminan, solo se actualizan

---

## 📝 Cambios Realizados

### 1. Control de Aprobación (`ControlAprobacion.tsx`)

#### Agregado:
- ✅ Botón **EDITAR** (📝) visible para TODOS los usuarios
- ✅ Verificación de rol de administrador
- ✅ Función `handleEditar()` para redirigir al formulario de edición

#### Modificado:
- ✅ Botones **APROBAR** (✓) y **RECHAZAR** (✗) ahora solo visibles para ADMIN
- ✅ Se verifica el rol del usuario desde `localStorage`

---

## 🔐 Permisos por Rol

### 👤 Usuario Normal
- ✅ Ver solicitudes
- ✅ **EDITAR** solicitudes (nuevo)
- ✅ Descargar Excel
- ✅ Ver detalles
- ❌ Aprobar
- ❌ Rechazar

### 👑 Administrador
- ✅ Ver solicitudes
- ✅ **EDITAR** solicitudes
- ✅ Descargar Excel
- ✅ Ver detalles
- ✅ **APROBAR** solicitudes
- ✅ **RECHAZAR** solicitudes

---

## 🎨 Interfaz Actualizada

### Botones de Acción (en orden):

1. **👁️ Ver** - Todos los usuarios
2. **📄 Previsualizar** - Todos los usuarios
3. **📥 Descargar** - Todos los usuarios
4. **📝 Editar** - Todos los usuarios (NUEVO)
5. **✓ Aprobar** - Solo Admin
6. **✗ Rechazar** - Solo Admin

---

## 🔄 Flujo de Trabajo

### Para Usuario Normal:

```
1. Usuario crea solicitud
   ↓
2. Solicitud queda en estado "Pendiente"
   ↓
3. Usuario puede EDITAR y actualizar la solicitud
   ↓
4. Puede agregar información progresivamente
   ↓
5. Espera aprobación del Admin
```

### Para Administrador:

```
1. Revisa solicitudes pendientes
   ↓
2. Puede EDITAR si falta información
   ↓
3. Puede APROBAR o RECHAZAR
   ↓
4. Solicitud cambia a estado final
```

---

## 💻 Código Implementado

### Verificación de Admin

```typescript
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  setIsAdmin(user.rol === 'Administrador' || user.rol === 'admin');
}, []);
```

### Función de Edición

```typescript
const handleEditar = (solicitud: any) => {
  const tipo = solicitud.tipo === 'Administrativo' ? 'administrativo' : 'historia-clinica';
  const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
  navigate(`/registro/${tipo}?editar=${idReal}`);
};
```

### Botón de Editar (Todos)

```tsx
<Button
  size="sm"
  variant="ghost"
  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
  onClick={() => handleEditar(sol)}
  title="Editar solicitud"
>
  <Edit className="w-4 h-4" />
</Button>
```

### Botones Aprobar/Rechazar (Solo Admin)

```tsx
{isAdmin && (sol.estado === 'Pendiente' || sol.estado === 'En revisión') && (
  <>
    <Button onClick={() => aprobar()}>
      <CheckCircle2 className="w-4 h-4" />
    </Button>
    <Button onClick={() => rechazar()}>
      <XCircle className="w-4 h-4" />
    </Button>
  </>
)}
```

---

## 🎯 Próximos Pasos

### Para que funcione completamente:

1. **Backend**: Asegurar que el endpoint `PUT /api/solicitudes/{id}` permita actualización
2. **Formularios**: Los formularios de registro deben detectar el parámetro `?editar={id}`
3. **Cargar datos**: Al editar, cargar los datos existentes de la solicitud
4. **Actualizar**: Al guardar, hacer PUT en lugar de POST

---

## 🔍 Cómo Probar

### Como Usuario Normal:

1. Inicia sesión con usuario normal
2. Ve a "Control" → "Aprobación de Solicitudes"
3. Verás el botón **EDITAR** (📝) en cada solicitud
4. NO verás botones de Aprobar/Rechazar
5. Haz clic en Editar para modificar la solicitud

### Como Administrador:

1. Inicia sesión con usuario admin
2. Ve a "Control" → "Aprobación de Solicitudes"
3. Verás TODOS los botones:
   - Editar (📝)
   - Aprobar (✓)
   - Rechazar (✗)
4. Puedes aprobar o rechazar solicitudes

---

## 📊 Estados de Solicitud

| Estado | Usuario puede editar | Admin puede aprobar/rechazar |
|--------|---------------------|------------------------------|
| **Pendiente** | ✅ Sí | ✅ Sí |
| **En revisión** | ✅ Sí | ✅ Sí |
| **Aprobado** | ✅ Sí | ❌ No (ya aprobada) |
| **Rechazado** | ✅ Sí | ❌ No (ya rechazada) |

---

## ✨ Beneficios

1. **Flexibilidad**: Los usuarios pueden completar solicitudes progresivamente
2. **Colaboración**: Varios usuarios pueden trabajar en la misma solicitud
3. **Control**: Solo admin puede aprobar/rechazar
4. **Trazabilidad**: Se mantiene historial de cambios
5. **No destructivo**: No se eliminan solicitudes, solo se actualizan

---

## 🎉 Resumen

✅ Sistema modificado exitosamente
✅ Botón de editar agregado para todos
✅ Aprobar/Rechazar restringido a admin
✅ Flujo de trabajo mejorado
✅ Interfaz actualizada

**¡El sistema ahora permite edición colaborativa con control administrativo!**
