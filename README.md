# 🏥 HEFESTO - Sistema de Gestión de Usuarios Hospitalarios

Sistema completo de gestión de usuarios administrativos y médicos con interfaz web moderna y exportación a formatos Excel institucionales.

## 📋 Descripción

HEFESTO es un sistema diseñado para gestionar solicitudes de creación de usuarios en el entorno hospitalario, facilitando el proceso de registro, aprobación y administración de credenciales tanto para personal administrativo como médico con acceso a historia clínica electrónica.

## 🎯 Características Principales

### ✨ Funcionalidades Implementadas

- **Formulario de Usuario Administrativo** - Registro completo con todos los campos requeridos
- **Formulario de Historia Clínica** - Para personal médico con accesos especiales
- **Exportación a Excel** - Los datos se exportan automáticamente a los formatos institucionales
- **Seguimiento de Solicitudes** - Vista para monitorear el estado de las solicitudes
- **Interfaz Moderna** - Diseño responsivo con TailwindCSS y componentes shadcn/ui
- **Validación de Formularios** - Campos requeridos y validación en tiempo real

### 📦 Módulos del Sistema

1. **HOME (Inicio)** - Dashboard con resumen de actividad
2. **REGISTRO** - Formularios de solicitud de usuarios
3. **CONTROL** - Gestión y aprobación de solicitudes
4. **CONFIGURACIÓN** - Administración de roles y permisos
5. **PERFIL** - Información y configuración personal

## 🛠️ Stack Tecnológico

### Frontend (Actual - Para referencia visual)
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS 3** - Estilos
- **shadcn/ui** - Componentes UI
- **Lucide React** - Iconos
- **xlsx** - Manejo de archivos Excel
- **React Router 6** - Navegación SPA

### Backend (Planificado)
- **Laravel** - Framework PHP para el backend
- **MySQL/PostgreSQL** - Base de datos
- **API RESTful** - Comunicación frontend-backend

## 📁 Estructura del Proyecto

```
HEFESTO/
├── client/                      # Frontend React
│   ├── components/             # Componentes reutilizables
│   │   ├── ui/                # Componentes shadcn/ui
│   │   └── Layout.tsx         # Layout principal
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── Index.tsx          # Dashboard
│   │   ├── Registro.tsx       # Formularios de registro
│   │   ├── Control.tsx        # Gestión de solicitudes
│   │   ├── Configuracion.tsx  # Configuración del sistema
│   │   └── Perfil.tsx         # Perfil de usuario
│   ├── lib/                   # Utilidades
│   │   ├── excelExporter.ts   # Exportación a Excel
│   │   └── Documentos/        # Plantillas Excel
│   └── global.css             # Estilos globales
├── shared/                     # Tipos compartidos
│   └── types/
│       └── formularios.ts     # Interfaces TypeScript
├── server/                     # Servidor Express (temporal)
├── public/                     # Archivos estáticos
├── plan.md                     # Documento de planificación
├── INSTRUCCIONES_EXCEL.md      # Guía de configuración Excel
└── setup-excel.ps1            # Script de configuración
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18 o superior
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Andrewgo12/Hefesto.git
cd Hefesto

# Instalar dependencias
pnpm install

# Configurar archivos Excel
.\setup-excel.ps1

# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:8080`

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm typecheck    # Verificación de tipos TypeScript
pnpm test         # Ejecutar tests
```

## 📝 Configuración de Excel

Los formularios exportan datos a plantillas Excel institucionales. Para configurar las celdas correctas:

1. Ejecuta `.\setup-excel.ps1` para copiar las plantillas
2. Abre `client/lib/excelExporter.ts`
3. Ajusta las referencias de celdas según tu formato Excel

Ver `INSTRUCCIONES_EXCEL.md` para más detalles.

## 📊 Formularios Implementados

### Formulario Administrativo
- Datos personales (nombre, cédula, cargo, dependencia, área)
- Datos de contacto (correo, extensión, teléfono)
- Información laboral (fecha ingreso, tipo contrato, supervisor)
- Accesos y permisos
- Justificación y funciones
- Observaciones

### Formulario Historia Clínica
- Datos personales (nombre, cédula, registro médico, especialidad)
- Datos de contacto completos
- Información profesional
- Servicios y áreas de atención
- Accesos a sistemas (Laboratorio, Imagenología, Farmacia, Quirófano)
- Capacitación
- Justificación y funciones asistenciales

## 🎨 Características de UI/UX

- **Diseño Responsivo** - Funciona en desktop, tablet y móvil
- **Modo Oscuro** - Sistema de temas configurable
- **Validación en Tiempo Real** - Feedback inmediato al usuario
- **Navegación Intuitiva** - Menú lateral con iconos
- **Componentes Accesibles** - Cumple estándares de accesibilidad

## 🔜 Próximos Pasos

### Migración a Laravel

El frontend actual sirve como **referencia visual y funcional** para la implementación con Laravel:

1. **Backend Laravel**
   - Crear API RESTful
   - Sistema de autenticación (Sanctum/Passport)
   - Gestión de base de datos con Eloquent
   - Validación de datos
   - Manejo de archivos Excel en servidor

2. **Integración**
   - Conectar frontend React con API Laravel
   - Implementar sistema de autenticación
   - Migrar lógica de exportación Excel al backend
   - Configurar CORS y seguridad

3. **Base de Datos**
   - Migración para tablas de usuarios
   - Migración para solicitudes
   - Migración para roles y permisos
   - Seeders con datos de prueba

## 📖 Documentación Adicional

- **plan.md** - Documento completo de planificación del sistema
- **INSTRUCCIONES_EXCEL.md** - Guía detallada de configuración Excel
- **AGENTS.md** - Memoria del proyecto con estructura técnica

## 👤 Autor

**Kevin Andrés González Dinas**

## 📄 Licencia

Este proyecto es privado y de uso exclusivo institucional.

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Nota:** Este es el frontend de referencia. La implementación final se realizará con Laravel como backend.
