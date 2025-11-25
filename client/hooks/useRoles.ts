import { useState, useEffect } from 'react';

export type UserRole = 'Usuario' | 'Administrador';

interface User {
    id: number;
    name: string;
    email: string;
    rol: string;
    roles?: Array<{ nombre: string }>;
    es_administrador?: boolean;
}

export function useRoles() {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        console.log('🔍 useRoles - Raw user string:', userStr);

        if (userStr) {
            try {
                const user: User = JSON.parse(userStr);
                console.log('👤 useRoles - Parsed user:', user);
                console.log('🔑 useRoles - es_administrador:', user.es_administrador);
                console.log('📧 useRoles - email:', user.email);
                console.log('👔 useRoles - rol:', user.rol);
                console.log('📜 useRoles - roles array:', user.roles);

                // Determinar rol del usuario
                let role: UserRole = 'Usuario';

                // Verificar si es administrador
                const rolLower = user.rol?.toLowerCase() || '';
                if (
                    user.es_administrador === true ||
                    user.email === 'admin@hefesto.local' ||
                    rolLower === 'administrador' ||
                    rolLower === 'admin' ||
                    user.roles?.some(r => r.nombre?.toLowerCase() === 'administrador')
                ) {
                    role = 'Administrador';
                    console.log('✅ useRoles - Usuario ES ADMINISTRADOR');
                } else {
                    console.log('❌ useRoles - Usuario NO es administrador');
                }

                console.log('🎭 useRoles - Final role:', role);
                setUserRole(role);
                setIsAdmin(role === 'Administrador');
                setIsUser(role === 'Usuario');
            } catch (error) {
                console.error('❌ useRoles - Error parsing user data:', error);
            }
        } else {
            console.log('⚠️ useRoles - No user data in localStorage');
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
        canCreateRequests: !!userRole, // Requiere estar autenticado con rol asignado
        canViewOwnRequests: !!userRole, // Requiere estar autenticado
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

    const rolLower = user.rol?.toLowerCase() || '';
    return (
        user.email === 'admin@hefesto.local' ||
        rolLower === 'administrador' ||
        rolLower === 'admin' ||
        user.roles?.some(r => r.nombre?.toLowerCase() === 'administrador') ||
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
