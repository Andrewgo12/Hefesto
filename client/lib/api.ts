import axios from 'axios';

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

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
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
    login: (credentials: { email: string; password: string }) => 
        api.post('/login', credentials),
    register: (data: any) => api.post('/register', data),
    logout: () => api.post('/logout'),
    me: () => api.get('/me'),
    verificarCredencialFirma: (data: { cargo: string; credencial: string }) =>
        api.post('/verificar-credencial-firma', data),
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
    descargarAdministrativa: (id: number) => {
        const url = `${API_URL}/exportar/administrativa/${id}`;
        window.open(url, '_blank');
    },
    
    // Descargar solicitud historia clínica en Excel
    descargarHistoriaClinica: (id: number) => {
        const url = `${API_URL}/exportar/historia-clinica/${id}`;
        window.open(url, '_blank');
    },
    
    // Obtener metadatos de una solicitud
    obtenerMetadatos: (tipo: 'administrativa' | 'historia_clinica', id: number) => 
        api.get('/exportar/metadatos', { params: { tipo, id } }),
    
    // Descargar según tipo
    descargar: (tipo: 'Administrativo' | 'Historia Clínica', id: number) => {
        if (tipo === 'Administrativo') {
            return exportacion.descargarAdministrativa(id);
        } else {
            return exportacion.descargarHistoriaClinica(id);
        }
    }
};

export default api;
