/**
 * CONTEXTO GLOBAL DE LA APLICACIÓN
 * Comparte datos entre todas las vistas en tiempo real
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { solicitudesAdministrativas, solicitudesHistoriaClinica, usuarios as usuariosApi } from '@/lib/api';

// Tipos
interface Solicitud {
  id: string | number; // Puede ser string (admin-1, historia-1) o number (legacy)
  id_original?: number; // ID original de la base de datos
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
  agregarSolicitud: (solicitud: Omit<Solicitud, 'fechaSolicitud'> & { id?: number; fechaSolicitud?: string }) => void;
  actualizarEstadoSolicitud: (id: number, estado: Solicitud['estado'], comentario?: string) => void;
  obtenerSolicitud: (id: number) => Solicitud | undefined;
  recargarDatos: () => Promise<void>;
  
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
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargandoSolicitudes, setCargandoSolicitudes] = useState(true);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);

  const [actividades, setActividades] = useState<Actividad[]>([]);

  // Cargar datos desde la API al iniciar (solo si está autenticado)
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      cargarSolicitudes();
      cargarUsuarios();
    }
  }, []);

  // Polling automático cada 10 segundos para sincronización en tiempo real
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return; // No hacer polling si no está autenticado

    const intervalo = setInterval(() => {
      // Solo actualizar si la pestaña está activa (optimización)
      if (!document.hidden) {
        console.log('🔄 Actualizando datos automáticamente...');
        cargarSolicitudes();
        cargarUsuarios();
      } else {
        console.log('⏸️ Pestaña inactiva, pausando actualización');
      }
    }, 10000); // 10 segundos

    // Actualizar cuando la pestaña vuelve a estar activa
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Pestaña activa, actualizando datos...');
        cargarSolicitudes();
        cargarUsuarios();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const cargarSolicitudes = async (reintentos = 3) => {
    try {
      setCargandoSolicitudes(true);
      console.log('🔄 AppContext: Cargando solicitudes desde API...');
      
      // Intentar cargar desde API con reintentos
      const [respAdmin, respHistoria] = await Promise.all([
        solicitudesAdministrativas.getAll().catch((error) => {
          console.error('❌ Error cargando solicitudes administrativas:', error);
          return { data: { data: [] } };
        }),
        solicitudesHistoriaClinica.getAll().catch((error) => {
          console.error('❌ Error cargando solicitudes historia clínica:', error);
          return { data: { data: [] } };
        })
      ]);
      
      console.log('📦 Respuesta Admin:', respAdmin.data);
      console.log('📦 Respuesta Historia:', respHistoria.data);

      const solicitudesAdmin = (respAdmin.data?.data || []).map((sol: any) => ({
        id: `admin-${sol.id}`,
        id_original: sol.id,
        tipo: 'Administrativo' as const,
        nombreCompleto: sol.nombre_completo,
        cedula: sol.cedula,
        cargo: sol.cargo,
        estado: sol.estado || 'Pendiente',
        fechaSolicitud: sol.fecha_solicitud || sol.created_at,
        fecha_solicitud: sol.fecha_solicitud || sol.created_at,
        created_at: sol.created_at,
        solicitadoPor: sol.registrado_por_nombre || sol.solicitado_por || 'Sistema',
        datos: sol
      }));

      const solicitudesHistoria = (respHistoria.data?.data || []).map((sol: any) => ({
        id: `historia-${sol.id}`,
        id_original: sol.id,
        tipo: 'Historia Clínica' as const,
        nombreCompleto: sol.nombre_completo,
        cedula: sol.cedula,
        especialidad: sol.especialidad,
        estado: sol.estado || 'Pendiente',
        fechaSolicitud: sol.fecha_solicitud || sol.created_at,
        fecha_solicitud: sol.fecha_solicitud || sol.created_at,
        created_at: sol.created_at,
        solicitadoPor: sol.registrado_por_nombre || sol.solicitado_por || 'Sistema',
        datos: sol
      }));

      const todasSolicitudes = [...solicitudesAdmin, ...solicitudesHistoria];
      
      console.log('✅ Total solicitudes mapeadas:', todasSolicitudes.length);
      console.log('📋 Solicitudes:', todasSolicitudes);
      
      if (todasSolicitudes.length > 0) {
        setSolicitudes(todasSolicitudes);
        console.log('✅ Solicitudes guardadas en estado');
      } else {
        console.log('⚠️ No hay solicitudes en API, intentando localStorage...');
        // Si no hay datos en API, cargar desde localStorage
        const saved = localStorage.getItem('hefesto_solicitudes');
        if (saved) {
          const solicitudesLS = JSON.parse(saved);
          setSolicitudes(solicitudesLS);
          console.log('✅ Cargadas', solicitudesLS.length, 'solicitudes desde localStorage');
        } else {
          console.log('⚠️ No hay solicitudes en localStorage tampoco');
        }
      }
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      // Fallback a localStorage
      const saved = localStorage.getItem('hefesto_solicitudes');
      if (saved) {
        setSolicitudes(JSON.parse(saved));
      }
    } finally {
      setCargandoSolicitudes(false);
    }
  };

  const cargarUsuarios = async (reintentos = 3) => {
    try {
      setCargandoUsuarios(true);
      console.log('🔄 AppContext: Cargando usuarios desde API...');
      const response = await usuariosApi.getAll().catch((error) => {
        console.error('❌ Error cargando usuarios:', error);
        return { data: { data: [] } };
      });
      
      // Manejar diferentes formatos de respuesta
      let usuariosData = [];
      if (Array.isArray(response.data)) {
        usuariosData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        usuariosData = response.data.data;
      } else if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        usuariosData = response.data.data.data;
      }
      
      console.log('👥 Usuarios recibidos:', usuariosData.length);
      
      const usuariosBackend = usuariosData.map((user: any) => ({
        id: user.id,
        username: user.username || user.email,
        nombre: user.name || user.nombre,
        email: user.email,
        rol: user.rol || 'Usuario',
        estado: user.estado || 'Activo',
        fechaCreacion: user.created_at || new Date().toISOString()
      }));

      if (usuariosBackend.length > 0) {
        setUsuarios(usuariosBackend);
      } else {
        // Fallback a localStorage
        const saved = localStorage.getItem('hefesto_usuarios');
        if (saved) {
          setUsuarios(JSON.parse(saved));
        } else {
          // Usuario por defecto
          setUsuarios([{
            id: 1,
            username: 'admin',
            nombre: 'Admin User',
            email: 'admin@hefesto.local',
            rol: 'Administrador',
            estado: 'Activo',
            fechaCreacion: new Date().toISOString()
          }]);
        }
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      // Fallback a localStorage
      const saved = localStorage.getItem('hefesto_usuarios');
      if (saved) {
        setUsuarios(JSON.parse(saved));
      } else {
        setUsuarios([{
          id: 1,
          username: 'admin',
          nombre: 'Admin User',
          email: 'admin@hefesto.local',
          rol: 'Administrador',
          estado: 'Activo',
          fechaCreacion: new Date().toISOString()
        }]);
      }
    } finally {
      setCargandoUsuarios(false);
    }
  };

  // Persistir en localStorage cuando cambian (solo como backup)
  useEffect(() => {
    if (!cargandoSolicitudes && solicitudes.length > 0) {
      localStorage.setItem('hefesto_solicitudes', JSON.stringify(solicitudes));
    }
  }, [solicitudes, cargandoSolicitudes]);

  useEffect(() => {
    if (!cargandoUsuarios && usuarios.length > 0) {
      localStorage.setItem('hefesto_usuarios', JSON.stringify(usuarios));
    }
  }, [usuarios, cargandoUsuarios]);

  useEffect(() => {
    if (actividades.length > 0) {
      localStorage.setItem('hefesto_actividades', JSON.stringify(actividades));
    }
  }, [actividades]);

  // Funciones de solicitudes
  const agregarSolicitud = (solicitud: Omit<Solicitud, 'fechaSolicitud'> & { id?: number; fechaSolicitud?: string }) => {
    const nueva: Solicitud = {
      ...solicitud,
      id: solicitud.id || Date.now(), // Usar ID del backend si existe, sino generar uno temporal
      fechaSolicitud: solicitud.fechaSolicitud || new Date().toISOString(),
    };
    
    setSolicitudes(prev => [nueva, ...prev]);
    
    registrarActividad(
      'Crear Solicitud',
      `Nueva solicitud ${solicitud.tipo}: ${solicitud.nombreCompleto}`,
      'Registro'
    );
  };

  const actualizarEstadoSolicitud = async (id: number, estado: Solicitud['estado'], comentario?: string) => {
    console.log('🔄 Actualizando solicitud:', id, 'a estado:', estado);
    
    const solicitud = solicitudes.find(s => s.id === id);
    if (!solicitud) {
      console.error('❌ Solicitud no encontrada:', id);
      return;
    }

    try {
      // Determinar el tipo de solicitud y el endpoint
      const esAdministrativa = solicitud.tipo === 'Administrativo';
      const api = esAdministrativa ? solicitudesAdministrativas : solicitudesHistoriaClinica;
      
      // Llamar al endpoint apropiado según el estado
      if (estado === 'Aprobado') {
        await api.aprobar(id, { comentario });
        console.log('✅ Solicitud aprobada en backend');
      } else if (estado === 'Rechazado') {
        await api.rechazar(id, { motivo: comentario });
        console.log('✅ Solicitud rechazada en backend');
      }
      
      // Actualizar estado local
      setSolicitudes(prev => 
        prev.map(sol => 
          sol.id === id 
            ? { ...sol, estado }
            : sol
        )
      );
      
      // Registrar actividad
      registrarActividad(
        `${estado} Solicitud`,
        `Solicitud de ${solicitud.nombreCompleto} ${estado.toLowerCase()}${comentario ? `: ${comentario}` : ''}`,
        'Control'
      );
      
      // Recargar solicitudes para obtener datos actualizados
      await cargarSolicitudes();
      
    } catch (error) {
      console.error('❌ Error al actualizar solicitud:', error);
      throw error;
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

  // Función para recargar datos manualmente
  const recargarDatos = async () => {
    console.log('🔄 Recargando datos manualmente...');
    await Promise.all([
      cargarSolicitudes(),
      cargarUsuarios()
    ]);
  };

  const value: AppContextType = {
    solicitudes,
    agregarSolicitud,
    actualizarEstadoSolicitud,
    obtenerSolicitud,
    recargarDatos,
    usuarios,
    agregarUsuario,
    actualizarUsuario,
    actividades,
    registrarActividad,
    estadisticas,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
