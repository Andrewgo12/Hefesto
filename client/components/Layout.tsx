import { useState, useEffect } from 'react';
import LayoutUsuarios from './Layoutusuarios';
import LayoutAdministrador from './Layoutadministrador';
import logger from '@/lib/logger';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal que actúa como router
 * Decide qué layout usar según el rol del usuario
 */
export default function Layout({ children }: LayoutProps) {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const role = user.rol || 'Usuario';
        logger.debug('Layout.tsx - Detected role', { role, user });
        setUserRole(role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserRole('Usuario');
      }
    } else {
      setUserRole('Usuario');
    }
  }, []);

  // Mientras carga el rol, mostrar loading
  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Renderizar layout según rol
  if (userRole && userRole.toLowerCase() === 'administrador') {
    return <LayoutAdministrador>{children}</LayoutAdministrador>;
  }

  return <LayoutUsuarios>{children}</LayoutUsuarios>;
}
