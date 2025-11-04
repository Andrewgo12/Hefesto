/**
 * CONTEXTO GLOBAL DE LA APLICACIÓN
 * Comparte datos entre todas las vistas en tiempo real
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos
interface Solicitud {
  id: number;
  tipo: 'Administrativo' | 'Historia Clínica';
  nombreCompleto: string;
  cedula: string;
  cargo?: string;
  especialidad?: string;
  estado: 'Pendiente' | 'En revisión' | 'Aprobado' | 'Rechazado';
  fechaSolicitud: string;
  solicitadoPor: string;
  datos: any; // Datos completos del formulario
}

interface Usuario {
  id: number;
  username: string;
  nombre: string;
  email: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
  fechaCreacion: string;
}

interface Actividad {
  id: number;
  usuario: string;
  accion: string;
  descripcion: string;
  timestamp: string;
  modulo: string;
}

interface AppContextType {
  // Solicitudes
  solicitudes: Solicitud[];
  agregarSolicitud: (solicitud: Omit<Solicitud, 'id' | 'fechaSolicitud'>) => void;
  actualizarEstadoSolicitud: (id: number, estado: Solicitud['estado'], comentario?: string) => void;
  obtenerSolicitud: (id: number) => Solicitud | undefined;
  
  // Usuarios
  usuarios: Usuario[];
  agregarUsuario: (usuario: Omit<Usuario, 'id' | 'fechaCreacion'>) => void;
  actualizarUsuario: (id: number, datos: Partial<Usuario>) => void;
  
  // Actividades
  actividades: Actividad[];
  registrarActividad: (accion: string, descripcion: string, modulo: string) => void;
  
  // Estadísticas
  estadisticas: {
    totalSolicitudes: number;
    pendientes: number;
    aprobadas: number;
    rechazadas: number;
    usuariosActivos: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};

// Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Estado con persistencia en localStorage
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(() => {
    const saved = localStorage.getItem('hefesto_solicitudes');
    return saved ? JSON.parse(saved) : [];
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const saved = localStorage.getItem('hefesto_usuarios');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        username: 'admin',
        nombre: 'Admin User',
        email: 'admin@hefesto.local',
        rol: 'Administrador',
        estado: 'Activo',
        fechaCreacion: new Date().toISOString()
      }
    ];
  });

  const [actividades, setActividades] = useState<Actividad[]>(() => {
    const saved = localStorage.getItem('hefesto_actividades');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistir en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('hefesto_solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);

  useEffect(() => {
    localStorage.setItem('hefesto_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('hefesto_actividades', JSON.stringify(actividades));
  }, [actividades]);

  // Funciones de solicitudes
  const agregarSolicitud = (solicitud: Omit<Solicitud, 'id' | 'fechaSolicitud'>) => {
    const nueva: Solicitud = {
      ...solicitud,
      id: Date.now(),
      fechaSolicitud: new Date().toISOString(),
    };
    
    setSolicitudes(prev => [nueva, ...prev]);
    
    registrarActividad(
      'Crear Solicitud',
      `Nueva solicitud ${solicitud.tipo}: ${solicitud.nombreCompleto}`,
      'Registro'
    );
  };

  const actualizarEstadoSolicitud = (id: number, estado: Solicitud['estado'], comentario?: string) => {
    setSolicitudes(prev => 
      prev.map(sol => 
        sol.id === id 
          ? { ...sol, estado }
          : sol
      )
    );
    
    const solicitud = solicitudes.find(s => s.id === id);
    if (solicitud) {
      registrarActividad(
        `${estado} Solicitud`,
        `Solicitud de ${solicitud.nombreCompleto} ${estado.toLowerCase()}${comentario ? `: ${comentario}` : ''}`,
        'Control'
      );
    }
  };

  const obtenerSolicitud = (id: number) => {
    return solicitudes.find(s => s.id === id);
  };

  // Funciones de usuarios
  const agregarUsuario = (usuario: Omit<Usuario, 'id' | 'fechaCreacion'>) => {
    const nuevo: Usuario = {
      ...usuario,
      id: Date.now(),
      fechaCreacion: new Date().toISOString(),
    };
    
    setUsuarios(prev => [nuevo, ...prev]);
    
    registrarActividad(
      'Crear Usuario',
      `Nuevo usuario creado: ${usuario.nombre} (${usuario.username})`,
      'Usuarios'
    );
  };

  const actualizarUsuario = (id: number, datos: Partial<Usuario>) => {
    setUsuarios(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, ...datos }
          : user
      )
    );
    
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      registrarActividad(
        'Actualizar Usuario',
        `Usuario actualizado: ${usuario.nombre}`,
        'Usuarios'
      );
    }
  };

  // Funciones de actividades
  const registrarActividad = (accion: string, descripcion: string, modulo: string) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { email: 'Sistema' };
    
    const nueva: Actividad = {
      id: Date.now(),
      usuario: user.email || 'Sistema',
      accion,
      descripcion,
      timestamp: new Date().toISOString(),
      modulo,
    };
    
    setActividades(prev => [nueva, ...prev].slice(0, 100)); // Mantener últimas 100
  };

  // Calcular estadísticas
  const estadisticas = {
    totalSolicitudes: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === 'Pendiente').length,
    aprobadas: solicitudes.filter(s => s.estado === 'Aprobado').length,
    rechazadas: solicitudes.filter(s => s.estado === 'Rechazado').length,
    usuariosActivos: usuarios.filter(u => u.estado === 'Activo').length,
  };

  const value: AppContextType = {
    solicitudes,
    agregarSolicitud,
    actualizarEstadoSolicitud,
    obtenerSolicitud,
    usuarios,
    agregarUsuario,
    actualizarUsuario,
    actividades,
    registrarActividad,
    estadisticas,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
