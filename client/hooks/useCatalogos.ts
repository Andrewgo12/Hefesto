import { useState, useEffect } from 'react';
import { catalogos } from '@/lib/api';

const USE_API = import.meta.env.VITE_USE_API === 'true';

export interface Area {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  activo: boolean;
}

export interface Cargo {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  area_id?: number;
  tipo: string;
  activo: boolean;
  area?: Area;
}

export interface Especialidad {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  activo: boolean;
}

export const useCatalogos = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarCatalogos = async () => {
    if (!USE_API) {
      // Datos de ejemplo para modo offline
      setAreas([
        { id: 1, nombre: 'Administración', activo: true },
        { id: 2, nombre: 'Medicina', activo: true },
        { id: 3, nombre: 'Enfermería', activo: true },
      ]);
      setCargos([
        { id: 1, nombre: 'Jefe de Área', tipo: 'administrativo', activo: true },
        { id: 2, nombre: 'Médico General', tipo: 'medico', activo: true },
        { id: 3, nombre: 'Enfermero', tipo: 'medico', activo: true },
      ]);
      setEspecialidades([
        { id: 1, nombre: 'Medicina General', activo: true },
        { id: 2, nombre: 'Pediatría', activo: true },
        { id: 3, nombre: 'Cardiología', activo: true },
      ]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await catalogos.todos();
      const data = response.data;

      setAreas(data.areas || []);
      setCargos(data.cargos || []);
      setEspecialidades(data.especialidades || []);
    } catch (error) {
      console.error('Error cargando catálogos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCatalogos();
  }, []);

  return {
    areas,
    cargos,
    especialidades,
    loading,
    recargar: cargarCatalogos,
  };
};
