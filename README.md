# HEFESTO - Sistema de Gestión de Solicitudes

Sistema integral para la gestión de solicitudes de usuarios administrativos y de historia clínica electrónica del Hospital Universitario del Valle "Evaristo García" E.S.E.

## 🚀 Características Principales

- ✅ Gestión de solicitudes administrativas
- ✅ Gestión de solicitudes de historia clínica electrónica
- ✅ Flujo de aprobación con firmas digitales
- ✅ Exportación a Excel con templates institucionales
- ✅ Previsualización HTML de formularios
- ✅ Sistema de notificaciones
- ✅ Dashboard de seguimiento
- ✅ Gestión de catálogos

## 📋 Requisitos

### Backend (Laravel)
- PHP 8.1 o superior
- Composer
- MySQL/MariaDB
- Extensiones PHP: mbstring, xml, pdo, openssl, fileinfo, zip

### Frontend (React + Vite)
- Node.js 18 o superior
- npm o pnpm

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd HEFESTO
```

### 2. Configurar Backend
```bash
cd hefesto-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 3. Configurar Frontend
```bash
cd ..
npm install
# o
pnpm install
```

### 4. Copiar Templates Excel
```bash
node scripts/copiar-templates.js
```

## 🎯 Templates Excel

El sistema utiliza templates Excel institucionales para generar los formularios:

### Ubicación
- **Originales**: `public/Documentos/Mapeado/`
- **Producción**: `hefesto-backend/storage/app/templates/`

### Tipos de Templates

1. **Formato Administrativo**
   - `formato_administrativo_MAPEADO.xlsx` - Con descripciones (previsualización)
   - `formato_administrativo_MAPEADOVacio.xlsx` - Sin descripciones (exportación)

2. **Formato Historia Clínica**
   - `formatocreacionusuarioshistoriaclinicaelectronicavmapeado.xlsx` - Con descripciones
   - `formatocreacionusuarioshistoriaclinicaelectronicavacia.xlsx` - Sin descripciones

### Documentación
Ver `CONFIGURACION_TEMPLATES_EXCEL.md` para detalles completos del mapeo de campos.

## 🚦 Uso

### Desarrollo

#### Backend
```bash
cd hefesto-backend
php artisan serve
```

#### Frontend
```bash
npm run dev
# o
pnpm dev
```

### Producción

#### Backend
```bash
cd hefesto-backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Frontend
```bash
npm run build
# o
pnpm build
```

## 📚 Comandos Artisan Disponibles

### Verificar Templates
```bash
php artisan templates:verificar
```
Verifica que todos los templates Excel estén correctamente configurados.

### Analizar Template
```bash
php artisan template:analizar <nombre-archivo>
```
Analiza la estructura de un template Excel.

### Seeders
```bash
php artisan db:seed --class=FirmasDigitalesTestSeeder
```

## 🔧 Configuración

### Variables de Entorno

#### Backend (.env)
```env
APP_NAME=HEFESTO
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hefesto
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## 📁 Estructura del Proyecto

```
HEFESTO/
├── client/                          # Frontend React
│   ├── components/                  # Componentes reutilizables
│   ├── contexts/                    # Context API
│   ├── hooks/                       # Custom hooks
│   └── lib/                         # Utilidades
├── hefesto-backend/                 # Backend Laravel
│   ├── app/
│   │   ├── Console/Commands/        # Comandos Artisan
│   │   ├── Http/Controllers/        # Controladores
│   │   └── Models/                  # Modelos Eloquent
│   ├── database/
│   │   ├── migrations/              # Migraciones
│   │   └── seeders/                 # Seeders
│   └── storage/
│       └── app/
│           ├── templates/           # Templates Excel
│           └── firmas/              # Firmas digitales
├── public/
│   └── Documentos/
│       └── Mapeado/                 # Templates originales
├── scripts/                         # Scripts de utilidad
└── docs/                            # Documentación
```

## 🔐 Firmas Digitales

El sistema soporta tres tipos de firmas:

1. **Imagen Base64** (Recomendado)
   - Capturada desde canvas
   - Formato PNG
   - Se inserta como imagen en Excel

2. **Texto Firma**
   - Formato: `FIRMA_TEXTO:Nombre`
   - Se renderiza con fuente cursiva

3. **Texto Simple**
   - Solo nombre del firmante
   - Incluye fecha y hora

Ver `INSTRUCCIONES_FIRMAS_DIGITALES.md` para más detalles.

## 📊 API Endpoints

### Solicitudes Administrativas
- `GET /api/solicitudes-administrativas` - Listar
- `POST /api/solicitudes-administrativas` - Crear
- `GET /api/solicitudes-administrativas/{id}` - Ver detalle
- `PUT /api/solicitudes-administrativas/{id}` - Actualizar
- `DELETE /api/solicitudes-administrativas/{id}` - Eliminar

### Exportación
- `GET /api/exportacion/administrativa/{id}` - Exportar Excel
- `GET /api/exportacion/administrativa/{id}/preview` - Previsualizar HTML
- `GET /api/exportacion/historia-clinica/{id}` - Exportar Excel
- `GET /api/exportacion/historia-clinica/{id}/preview` - Previsualizar HTML

### Catálogos
- `GET /api/catalogos/areas` - Áreas/Servicios
- `GET /api/catalogos/cargos` - Cargos
- `GET /api/catalogos/perfiles` - Perfiles
- `GET /api/catalogos/especialidades` - Especialidades

## 🧪 Testing

### Backend
```bash
cd hefesto-backend
php artisan test
```

### Frontend
```bash
npm run test
# o
pnpm test
```

## 📝 Documentación Adicional

- `CONFIGURACION_TEMPLATES_EXCEL.md` - Mapeo completo de templates
- `RESUMEN_CONFIGURACION_TEMPLATES.md` - Resumen de configuración
- `INSTRUCCIONES_FIRMAS_DIGITALES.md` - Guía de firmas digitales

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad del Hospital Universitario del Valle "Evaristo García" E.S.E.

## 👥 Autores

- Equipo de Desarrollo HEFESTO

## 📞 Soporte

Para soporte técnico, contactar al área de Gestión de la Información.
