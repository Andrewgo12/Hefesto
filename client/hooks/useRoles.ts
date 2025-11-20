import { useState, useEffect } from 'react';

export type UserRole = 'Usuario' | 'Administrador';

interface User {
    id: number;
    name: string;
    email: string;
    rol: string;
    roles?: Array<{ nombre: string }>;
}

export function useRoles() {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user: User = JSON.parse(userStr);

                // Determinar rol del usuario
                let role: UserRole = 'Usuario';

                // Verificar si es administrador
                if (
                    user.email === 'admin@hefesto.local' ||
                    user.rol === 'Administrador' ||
                    user.rol === 'admin' ||
                    user.roles?.some(r => r.nombre === 'Administrador')
                ) {
                    role = 'Administrador';
                }

                setUserRole(role);
                setIsAdmin(role === 'Administrador');
                setIsUser(role === 'Usuario');
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    return {
        userRole,
        isAdmin,
        isUser,
        // Helper functions
        canApprove: isAdmin,
        canReject: isAdmin,
        canManageUsers: isAdmin,
        canManageRoles: isAdmin,
        canExportReports: isAdmin,
        canManageCatalogs: isAdmin,
        canManageCredentials: isAdmin,
        canCreateRequests: true, // Todos pueden crear solicitudes
        canViewOwnRequests: true, // Todos pueden ver sus propias solicitudes
        canViewAllRequests: isAdmin, // Solo admin puede ver todas
    };
}

// Constantes de roles
export const ROLES = {
    USUARIO: 'Usuario' as UserRole,
    ADMINISTRADOR: 'Administrador' as UserRole,
};

// Helper para verificar si un usuario es admin
export function isAdminUser(user: User | null): boolean {
    if (!user) return false;

    return (
        user.email === 'admin@hefesto.local' ||
        user.rol === 'Administrador' ||
        user.rol === 'admin' ||
        user.roles?.some(r => r.nombre === 'Administrador') ||
        false
    );
}

// Helper para obtener el nombre del rol en español
export function getRoleName(role: UserRole): string {
    return role === 'Administrador' ? 'Administrador' : 'Usuario';
}

// Helper para obtener el color del rol
export function getRoleColor(role: UserRole): string {
    return role === 'Administrador'
        ? 'bg-purple-100 text-purple-800 border-purple-300'
        : 'bg-blue-100 text-blue-800 border-blue-300';
}
