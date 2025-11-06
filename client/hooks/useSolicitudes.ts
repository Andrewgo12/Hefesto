import { useState, useEffect } from 'react';
import { solicitudesAdministrativas, solicitudesHistoriaClinica } from '@/lib/api';
import { toast } from '@/lib/toast';

const USE_API = import.meta.env.VITE_USE_API === 'true';

export interface Solicitud {
  id: number;
  tipo: 'Administrativo' | 'Historia Clínica';
  nombre_completo: string;
  cedula: string;
  cargo?: string;
  especialidad?: string;
  estado: 'Pendiente' | 'En revisión' | 'Aprobado' | 'Rechazado';
  created_at: string;
  fecha_solicitud?: string;
}

export interface Estadisticas {
  total: number;
  pendientes: number;
  en_revision: number;
  aprobadas: number;
  rechazadas: number;
}

export const useSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    total: 0,
    pendientes: 0,
    en_revision: 0,
    aprobadas: 0,
    rechazadas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar solicitudes desde la API
  const cargarSolicitudes = async () => {
    console.log('🔄 Iniciando carga de solicitudes... USE_API:', USE_API);
    
    if (!USE_API) {
      // Modo offline - usar localStorage
      const saved = localStorage.getItem('hefesto_solicitudes');
      setSolicitudes(saved ? JSON.parse(saved) : []);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('📡 Llamando a API...');
      
      // Cargar solicitudes administrativas
      const [adminRes, medicoRes] = await Promise.all([
        solicitudesAdministrativas.getAll(),
        solicitudesHistoriaClinica.getAll(),
      ]);

      console.log('✅ Respuesta Admin:', adminRes.data);
      console.log('✅ Respuesta Médico:', medicoRes.data);

      // Manejar respuesta paginada de Laravel
      const adminData = Array.isArray(adminRes.data) 
        ? adminRes.data 
        : (adminRes.data.data || []);
      
      const medicoData = Array.isArray(medicoRes.data)
        ? medicoRes.data
        : (medicoRes.data.data || []);

      console.log('📦 Admin Data (array):', adminData.length, 'items');
      console.log('📦 Médico Data (array):', medicoData.length, 'items');

      // Combinar y normalizar
      const todasSolicitudes: Solicitud[] = [
        ...adminData.map((s: any) => ({
          ...s,
          tipo: 'Administrativo' as const,
        })),
        ...medicoData.map((s: any) => ({
          ...s,
          tipo: 'Historia Clínica' as const,
        })),
      ];

      console.log('📊 Total solicitudes combinadas:', todasSolicitudes.length);
      console.log('📋 Solicitudes:', todasSolicitudes);

      setSolicitudes(todasSolicitudes);
      calcularEstadisticas(todasSolicitudes);
    } catch (err: any) {
      console.error('Error cargando solicitudes:', err);
      setError(err.message || 'Error al cargar solicitudes');
      toast.error('Error', 'No se pudieron cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  // Calcular estadísticas
  const calcularEstadisticas = (data: Solicitud[]) => {
    const stats: Estadisticas = {
      total: data.length,
      pendientes: data.filter((s) => s.estado === 'Pendiente').length,
      en_revision: data.filter((s) => s.estado === 'En revisión').length,
      aprobadas: data.filter((s) => s.estado === 'Aprobado').length,
      rechazadas: data.filter((s) => s.estado === 'Rechazado').length,
    };
    setEstadisticas(stats);
  };

  // Crear solicitud
  const crearSolicitud = async (tipo: 'administrativo' | 'historia_clinica', data: any) => {
    if (!USE_API) {
      // Modo offline
      const nueva: Solicitud = {
        id: Date.now(),
        tipo: tipo === 'administrativo' ? 'Administrativo' : 'Historia Clínica',
        nombre_completo: data.nombre_completo || data.nombreCompleto,
        cedula: data.cedula,
        cargo: data.cargo,
        especialidad: data.especialidad,
        estado: 'Pendiente',
        created_at: new Date().toISOString(),
      };
      const nuevas = [...solicitudes, nueva];
      setSolicitudes(nuevas);
      localStorage.setItem('hefesto_solicitudes', JSON.stringify(nuevas));
      return nueva;
    }

    try {
      const api = tipo === 'administrativo' 
        ? solicitudesAdministrativas 
        : solicitudesHistoriaClinica;
      
      const response = await api.create(data);
      await cargarSolicitudes(); // Recargar lista
      
      toast.success('Éxito', 'Solicitud creada correctamente');
      
      return response.data;
    } catch (err: any) {
      console.error('Error creando solicitud:', err);
      toast.error('Error', err.response?.data?.message || 'Error al crear solicitud');
      throw err;
    }
  };

  // Cargar al montar
  useEffect(() => {
    cargarSolicitudes();
  }, []);

  return {
    solicitudes,
    estadisticas,
    loading,
    error,
    cargarSolicitudes,
    crearSolicitud,
  };
};
