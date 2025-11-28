import axios from 'axios';
// Last updated: 2025-11-25

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores - SIMPLIFICADO
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Solo redirigir a login si falla el login mismo
        if (error.response?.status === 401 && error.config?.url?.includes('/login')) {
            // Error en login - no limpiar nada, solo mostrar error
            console.error('Login falló');
        }
        return Promise.reject(error);
    }
);

// ============================================
// SOLICITUDES ADMINISTRATIVAS
// ============================================

export const solicitudesAdministrativas = {
    getAll: (params?: any) => api.get('/solicitudes/administrativas', { params }),
    getById: (id: number) => api.get(`/solicitudes/administrativas/${id}`),
    create: (data: any) => api.post('/solicitudes/administrativas', data),
    update: (id: number, data: any) => api.put(`/solicitudes/administrativas/${id}`, data),
    delete: (id: number) => api.delete(`/solicitudes/administrativas/${id}`),
    aprobar: (id: number, data?: any) => api.post(`/solicitudes/administrativas/${id}/aprobar`, data),
    rechazar: (id: number, data?: any) => api.post(`/solicitudes/administrativas/${id}/rechazar`, data),
    estadisticas: () => api.get('/solicitudes/administrativas/estadisticas'),
    verificarCedula: (cedula: string) => api.get(`/solicitudes/administrativas/verificar-cedula/${cedula}`),
    verificarLogin: (login: string) => api.get(`/solicitudes/administrativas/verificar-login/${login}`),
};

// ============================================
// SOLICITUDES HISTORIA CLÍNICA
// ============================================

export const solicitudesHistoriaClinica = {
    getAll: (params?: any) => api.get('/solicitudes/historia-clinica', { params }),
    getById: (id: number) => api.get(`/solicitudes/historia-clinica/${id}`),
    create: (data: any) => api.post('/solicitudes/historia-clinica', data),
    update: (id: number, data: any) => api.put(`/solicitudes/historia-clinica/${id}`, data),
    delete: (id: number) => api.delete(`/solicitudes/historia-clinica/${id}`),
    aprobar: (id: number, data?: any) => api.post(`/solicitudes/historia-clinica/${id}/aprobar`, data),
    rechazar: (id: number, data?: any) => api.post(`/solicitudes/historia-clinica/${id}/rechazar`, data),
    estadisticas: () => api.get('/solicitudes/historia-clinica/estadisticas'),
    verificarCedula: (cedula: string) => api.get(`/solicitudes/historia-clinica/verificar-cedula/${cedula}`),
    verificarCorreo: (correo: string) => api.get(`/solicitudes/historia-clinica/verificar-correo/${correo}`),
    verificarRegistro: (registro: string) => api.get(`/solicitudes/historia-clinica/verificar-registro/${registro}`),
};

// ============================================
// AUTENTICACIÓN
// ============================================

export const auth = {
    login: (credentials: { email: string; password: string; remember?: boolean }) =>
        api.post('/login', credentials),
    register: (data: any) => api.post('/register', data),
    logout: () => api.post('/logout'),
    me: () => api.get('/me'),
    updateProfile: (data: any) => api.put('/perfil', data),
    changePassword: (data: { current_password: string; new_password: string; new_password_confirmation: string }) =>
        api.post('/perfil/cambiar-password', data),
    verificarCredencialFirma: (data: { cargo: string; credencial: string }) =>
        api.post('/verificar-credencial-firma', data),
    forgotPassword: (email: string) => api.post('/forgot-password', { email }),
    resetPassword: (data: { token: string; email: string; password: string; password_confirmation: string }) =>
        api.post('/reset-password', data),
};

// ============================================
// FLUJO DE APROBACIONES
// ============================================

export const flujos = {
    buscarSolicitud: (params: { cedula?: string; nombre?: string }) =>
        api.get('/flujos/buscar', { params }),
    obtenerProgreso: (tipo: 'administrativo' | 'historia_clinica', id: number) =>
        api.get(`/flujos/progreso/${tipo}/${id}`),
    firmarPaso: (data: {
        tipo_solicitud: string;
        solicitud_id: number;
        paso_id: number;
        cargo: string;
        credencial: string;
        nombre_firmante: string;
        observaciones?: string;
    }) => api.post('/flujos/firmar', data),
    rechazarPaso: (data: {
        tipo_solicitud: string;
        solicitud_id: number;
        paso_id: number;
        cargo: string;
        credencial: string;
        nombre_firmante: string;
        motivo_rechazo: string;
    }) => api.post('/flujos/rechazar', data),
};

// ============================================
// CATÁLOGOS
// ============================================

export const catalogos = {
    areas: () => api.get('/catalogos/areas'),
    cargos: (params?: { tipo?: string; area_id?: number }) =>
        api.get('/catalogos/cargos', { params }),
    especialidades: () => api.get('/catalogos/especialidades'),
    todos: () => api.get('/catalogos/todos'),
};

// ============================================
// NOTIFICACIONES
// ============================================

export const notificaciones = {
    getAll: (params?: { leida?: boolean; importante?: boolean; per_page?: number }) =>
        api.get('/notificaciones', { params }),
    noLeidas: () => api.get('/notificaciones/no-leidas'),
    marcarLeida: (id: number) => api.put(`/notificaciones/${id}/leer`),
    marcarTodasLeidas: () => api.post('/notificaciones/leer-todas'),
};

// ============================================
// PING (Test de conexión)
// ============================================

export const ping = () => api.get('/ping');

// ============================================
// ROLES Y PERMISOS
// ============================================

export const roles = {
    getAll: () => api.get('/roles'),
    getById: (id: number) => api.get(`/roles/${id}`),
    create: (data: any) => api.post('/roles', data),
    update: (id: number, data: any) => api.put(`/roles/${id}`, data),
    delete: (id: number) => api.delete(`/roles/${id}`),
};

// ============================================
// PARÁMETROS DEL SISTEMA
// ============================================

export const parametros = {
    getAll: () => api.get('/parametros'),
    getByKey: (key: string) => api.get(`/parametros/${key}`),
    update: (key: string, value: any) => api.put(`/parametros/${key}`, { value }),
};

// ============================================
// USUARIOS
// ============================================

export const usuarios = {
    getAll: (params?: any) => api.get('/usuarios', { params }),
    getById: (id: number) => api.get(`/usuarios/${id}`),
    create: (data: any) => api.post('/usuarios', data),
    update: (id: number, data: any) => api.put(`/usuarios/${id}`, data),
    delete: (id: number) => api.delete(`/usuarios/${id}`),
    cambiarEstado: (id: number, estado: string) => api.put(`/usuarios/${id}/estado`, { estado }),
};

// ============================================
// EXPORTACIÓN Y DESCARGA
// ============================================

export const exportacion = {
    // Descargar solicitud administrativa en Excel
    descargarAdministrativa: async (id: number) => {
        try {
            const response = await api.get(`/exportar/administrativa/${id}`, {
                responseType: 'blob',
            });

            // Obtener nombre del archivo desde headers o usar uno por defecto
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `Solicitud_Administrativa_${id}.xlsx`;

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            // Crear enlace de descarga programático
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar solicitud administrativa:', error);
            throw error;
        }
    },

    // Descargar solicitud historia clínica en Excel
    descargarHistoriaClinica: async (id: number) => {
        try {
            const response = await api.get(`/exportar/historia-clinica/${id}`, {
                responseType: 'blob',
            });

            // Obtener nombre del archivo desde headers o usar uno por defecto
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `Solicitud_HistoriaClinica_${id}.xlsx`;

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            // Crear enlace de descarga programático
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar solicitud de historia clínica:', error);
            throw error;
        }
    },

    // Obtener metadatos de una solicitud
    obtenerMetadatos: (tipo: 'administrativa' | 'historia_clinica', id: number) =>
        api.get('/exportar/metadatos', { params: { tipo, id } }),

    // Descargar según tipo
    descargar: async (tipo: 'Administrativo' | 'Historia Clínica', id: number) => {
        if (tipo === 'Administrativo') {
            return await exportacion.descargarAdministrativa(id);
        } else {
            return await exportacion.descargarHistoriaClinica(id);
        }
    }
};

// ============================================
// CREDENCIALES DE FIRMA
// ============================================

export const credencialesFirma = {
    getAll: (params?: { activas?: boolean; tipo_formulario?: string }) =>
        api.get('/credenciales-firmas', { params }),
    getById: (id: number) => api.get(`/credenciales-firmas/${id}`),
    porTipo: (tipo: 'administrativa' | 'historia_clinica' | 'ambos') =>
        api.get(`/credenciales-firmas/tipo/${tipo}`),
    create: (data: any) => api.post('/credenciales-firmas', data),
    update: (id: number, data: any) => api.put(`/credenciales-firmas/${id}`, data),
    delete: (id: number) => api.delete(`/credenciales-firmas/${id}`),
    toggleActivo: (id: number) => api.post(`/credenciales-firmas/${id}/toggle-activo`),
    reordenar: (credenciales: Array<{ id: number; orden: number }>) =>
        api.post('/credenciales-firmas/reordenar', { credenciales }),
};

// ============================================
// GESTIÓN DE ROLES
// ============================================

export const rolesGestion = {
    listar: () => api.get('/roles-gestion'),
    crear: (data: any) => api.post('/roles-gestion', data),
    obtener: (id: string) => api.get(`/roles-gestion/${id}`),
    actualizar: (id: string, data: any) => api.put(`/roles-gestion/${id}`, data),
    eliminar: (id: string) => api.delete(`/roles-gestion/${id}`),
};

// ============================================
// CONFIGURACIÓN DEL SISTEMA
// ============================================

export const configuracion = {
    obtener: () => api.get('/configuracion/sistema'),
    actualizar: (data: any) => api.put('/configuracion/sistema', data),
};

// ============================================
// SEGURIDAD
// ============================================

export const seguridad = {
    obtenerPoliticas: () => api.get('/seguridad/politicas'),
    actualizarPoliticas: (data: any) => api.put('/seguridad/politicas', data),
    cerrarSesiones: () => api.post('/seguridad/cerrar-sesiones'),
};

// ============================================
// GESTIÓN DE TOKENS (API KEYS)
// ============================================

export const tokens = {
    listar: () => api.get('/tokens'),
    crear: (data: { name: string; abilities: string[] }) => api.post('/tokens', data),
    revocar: (id: number) => api.delete(`/tokens/${id}`),
};

export default api;
