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

  // Normalizar rol para comparaciones
  const normalizedRole = role.toLowerCase();

  // Debug: mostrar rol actual
  console.log('🔐 Rol del usuario:', role, '(Normalizado:', normalizedRole, ')');

  // Definir permisos por rol
  const permissions = {
    // Admin tiene acceso a todo
    canAccessDashboard: true,
    canAccessRegistro: true,
    canAccessControl: true,
    canAccessAprobacion: normalizedRole === 'administrador' || normalizedRole === 'jefe inmediato' || normalizedRole === 'jefe de talento humano',
    canAccessGestionUsuarios: normalizedRole === 'administrador',
    canAccessPermisos: normalizedRole === 'administrador',
    canAccessConfiguracion: normalizedRole === 'administrador',
    canAccessPerfil: true,

    // Permisos específicos
    canAprobarSolicitudes: normalizedRole === 'administrador' || normalizedRole === 'jefe inmediato' || normalizedRole === 'jefe de talento humano',
    canRechazarSolicitudes: normalizedRole === 'administrador' || normalizedRole === 'jefe inmediato' || normalizedRole === 'jefe de talento humano',
    canCrearUsuarios: normalizedRole === 'administrador',
    canEditarUsuarios: normalizedRole === 'administrador',
    canEliminarUsuarios: normalizedRole === 'administrador',
    canGestionarRoles: normalizedRole === 'administrador',
    canGestionarParametros: normalizedRole === 'administrador',
    canExportarExcel: normalizedRole === 'administrador' || normalizedRole === 'jefe inmediato' || normalizedRole === 'jefe de talento humano',
    canCrearSolicitudes: true,

    // Rol actual
    role,
    isAdmin: normalizedRole === 'administrador',
    isJefe: normalizedRole === 'jefe inmediato' || normalizedRole === 'jefe de talento humano',
  };

  return permissions;
};
