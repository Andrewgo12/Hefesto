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
};

// ============================================
// PING (Test de conexión)
// ============================================

export const ping = () => api.get('/ping');

export default api;
