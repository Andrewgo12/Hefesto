import { useState, useEffect } from 'react';
import { notificaciones as notificacionesAPI } from '@/lib/api';

const USE_API = import.meta.env.VITE_USE_API === 'true';

export interface Notificacion {
  id: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  importante: boolean;
  created_at: string;
  url?: string;
}

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [noLeidas, setNoLeidas] = useState(0);
  const [loading, setLoading] = useState(true);

  const cargarNotificaciones = async () => {
    if (!USE_API) {
      setNotificaciones([]);
      setNoLeidas(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [notifRes, countRes] = await Promise.all([
        notificacionesAPI.getAll({ per_page: 50 }),
        notificacionesAPI.noLeidas(),
      ]);

      const data = notifRes.data.data || notifRes.data;
      setNotificaciones(Array.isArray(data) ? data : []);
      setNoLeidas(countRes.data.count || 0);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeida = async (id: number) => {
    if (!USE_API) return;

    try {
      await notificacionesAPI.marcarLeida(id);
      await cargarNotificaciones();
    } catch (error) {
      console.error('Error marcando notificación:', error);
    }
  };

  const marcarTodasLeidas = async () => {
    if (!USE_API) return;

    try {
      await notificacionesAPI.marcarTodasLeidas();
      await cargarNotificaciones();
    } catch (error) {
      console.error('Error marcando todas:', error);
    }
  };

  useEffect(() => {
    cargarNotificaciones();
    
    // Recargar cada 30 segundos
    const interval = setInterval(cargarNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    notificaciones,
    noLeidas,
    loading,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasLeidas,
  };
};
