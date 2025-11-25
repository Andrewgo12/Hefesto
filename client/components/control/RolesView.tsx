import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    HiShieldCheck,
    HiPlus,
    HiCheck,
    HiX,
    HiSave
} from "react-icons/hi";
import { motion } from "framer-motion";
import { toast } from "@/lib/toast";

interface PermissionModule {
    id: string;
    name: string;
}

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Record<string, { create: boolean; read: boolean; update: boolean; delete: boolean }>;
}

const MODULES: PermissionModule[] = [
    { id: "usuarios", name: "Gestión de Usuarios" },
    { id: "roles", name: "Gestión de Roles" },
    { id: "solicitudes", name: "Solicitudes" },
    { id: "configuracion", name: "Configuración del Sistema" },
    { id: "reportes", name: "Reportes y Logs" },
];

const INITIAL_ROLES: Role[] = [
    {
        id: "admin",
        name: "Administrador",
        description: "Acceso total al sistema",
        permissions: {
            usuarios: { create: true, read: true, update: true, delete: true },
            roles: { create: true, read: true, update: true, delete: true },
            solicitudes: { create: true, read: true, update: true, delete: true },
            configuracion: { create: true, read: true, update: true, delete: true },
            reportes: { create: true, read: true, update: true, delete: true },
        }
    },
    {
        id: "supervisor",
        name: "Supervisor",
        description: "Gestión de solicitudes y reportes",
        permissions: {
            usuarios: { create: false, read: true, update: false, delete: false },
            roles: { create: false, read: false, update: false, delete: false },
            solicitudes: { create: true, read: true, update: true, delete: false },
            configuracion: { create: false, read: false, update: false, delete: false },
            reportes: { create: true, read: true, update: false, delete: false },
        }
    },
    {
        id: "usuario",
        name: "Usuario Estándar",
        description: "Acceso básico a solicitudes",
        permissions: {
            usuarios: { create: false, read: false, update: false, delete: false },
            roles: { create: false, read: false, update: false, delete: false },
            solicitudes: { create: true, read: true, update: false, delete: false },
            configuracion: { create: false, read: false, update: false, delete: false },
            reportes: { create: false, read: false, update: false, delete: false },
        }
    }
];

export default function RolesView() {
    const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
    const [selectedRole, setSelectedRole] = useState<string>("admin");
    const [isEditing, setIsEditing] = useState(false);

    const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

    const togglePermission = (moduleId: string, action: 'create' | 'read' | 'update' | 'delete') => {
        if (!isEditing) return;

        setRoles(prev => prev.map(role => {
            if (role.id === selectedRole) {
                return {
                    ...role,
                    permissions: {
                        ...role.permissions,
                        [moduleId]: {
                            ...role.permissions[moduleId],
                            [action]: !role.permissions[moduleId]?.[action]
                        }
                    }
                };
            }
            return role;
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success("Roles actualizados", "Los cambios en los permisos han sido guardados.");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <HiShieldCheck className="w-8 h-8 text-indigo-600" />
                        Matriz de Permisos
                    </h2>
                    <p className="text-slate-600 mt-1">
                        Defina granularmente qué acciones puede realizar cada rol.
                    </p>
                </div>
                <div className="flex gap-3">
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            Editar Permisos
                        </Button>
                    ) : (
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                            <HiSave className="w-4 h-4 mr-2" /> Guardar Cambios
                        </Button>
                    )}
                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30">
                        <HiPlus className="w-5 h-5 mr-2" />
                        Nuevo Rol
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Role Selector */}
                <Card className="p-4 lg:col-span-1 border-slate-200 h-fit">
                    <h3 className="font-semibold text-slate-700 mb-4 px-2">Roles Disponibles</h3>
                    <div className="space-y-2">
                        {roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex flex-col ${selectedRole === role.id
                                        ? "bg-indigo-50 border-indigo-200 border shadow-sm"
                                        : "hover:bg-slate-50 border border-transparent"
                                    }`}
                            >
                                <span className={`font-medium ${selectedRole === role.id ? "text-indigo-700" : "text-slate-700"}`}>
                                    {role.name}
                                </span>
                                <span className="text-xs text-slate-500 mt-1">{role.description}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Permission Matrix */}
                <Card className="p-6 lg:col-span-3 border-slate-200 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{currentRole.name}</h3>
                            <p className="text-sm text-slate-500">Configurando permisos para este rol</p>
                        </div>
                        {isEditing && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full animate-pulse">
                                MODO EDICIÓN
                            </span>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left py-4 px-4 font-semibold text-slate-600 w-1/3">Módulo</th>
                                    <th className="text-center py-4 px-2 font-medium text-slate-500">Crear</th>
                                    <th className="text-center py-4 px-2 font-medium text-slate-500">Leer</th>
                                    <th className="text-center py-4 px-2 font-medium text-slate-500">Actualizar</th>
                                    <th className="text-center py-4 px-2 font-medium text-slate-500">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {MODULES.map(module => {
                                    const perms = currentRole.permissions[module.id] || { create: false, read: false, update: false, delete: false };
                                    return (
                                        <tr key={module.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-4 font-medium text-slate-700">{module.name}</td>
                                            {(['create', 'read', 'update', 'delete'] as const).map(action => (
                                                <td key={action} className="py-4 px-2 text-center">
                                                    <button
                                                        disabled={!isEditing}
                                                        onClick={() => togglePermission(module.id, action)}
                                                        className={`w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-200 ${perms[action]
                                                                ? "bg-green-100 text-green-600 shadow-sm"
                                                                : "bg-slate-100 text-slate-300"
                                                            } ${isEditing ? "cursor-pointer hover:scale-110" : "cursor-default opacity-80"}`}
                                                    >
                                                        {perms[action] ? <HiCheck className="w-5 h-5" /> : <HiX className="w-4 h-4" />}
                                                    </button>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}
