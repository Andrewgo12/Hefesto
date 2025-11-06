/**
 * Hook para manejar permisos de usuario
 */

export const usePermissions = () => {
  const getUserRole = (): string => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return 'Usuario';
    
    try {
      const user = JSON.parse(userStr);
      return user.rol || 'Usuario';
    } catch {
      return 'Usuario';
    }
  };

  const role = getUserRole();
  
  // Debug: mostrar rol actual
  console.log('🔐 Rol del usuario:', role);

  // Definir permisos por rol
  const permissions = {
    // Admin tiene acceso a todo
    canAccessDashboard: true,
    canAccessRegistro: true,
    canAccessControl: true,
    canAccessAprobacion: role === 'Administrador' || role === 'Jefe Inmediato' || role === 'Jefe de Talento Humano',
    canAccessGestionUsuarios: role === 'Administrador',
    canAccessPermisos: role === 'Administrador',
    canAccessConfiguracion: role === 'Administrador',
    canAccessPerfil: true,
    
    // Permisos específicos
    canAprobarSolicitudes: role === 'Administrador' || role === 'Jefe Inmediato' || role === 'Jefe de Talento Humano',
    canRechazarSolicitudes: role === 'Administrador' || role === 'Jefe Inmediato' || role === 'Jefe de Talento Humano',
    canCrearUsuarios: role === 'Administrador',
    canEditarUsuarios: role === 'Administrador',
    canEliminarUsuarios: role === 'Administrador',
    canGestionarRoles: role === 'Administrador',
    canGestionarParametros: role === 'Administrador',
    canExportarExcel: role === 'Administrador' || role === 'Jefe Inmediato' || role === 'Jefe de Talento Humano',
    canCrearSolicitudes: true,
    
    // Rol actual
    role,
    isAdmin: role === 'Administrador',
    isJefe: role === 'Jefe Inmediato' || role === 'Jefe de Talento Humano',
  };

  return permissions;
};
