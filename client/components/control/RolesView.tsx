import { useState, useEffect } from "react";
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
    HiSave,
    HiTrash,
    HiPencil,
    HiInformationCircle
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/lib/toast";
import { rolesGestion } from "@/lib/api";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface PermissionModule {
    id: string;
    name: string;
    description: string;
}

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Record<string, { create: boolean; read: boolean; update: boolean; delete: boolean }>;
}

const MODULES: PermissionModule[] = [
    { id: "usuarios", name: "Gestión de Usuarios", description: "Control de acceso y cuentas de usuario" },
    { id: "roles", name: "Gestión de Roles", description: "Configuración de permisos y niveles de acceso" },
    { id: "solicitudes", name: "Solicitudes", description: "Procesamiento de solicitudes administrativas y clínicas" },
    { id: "configuracion", name: "Configuración", description: "Parámetros globales del sistema" },
    { id: "reportes", name: "Reportes y Logs", description: "Acceso a auditoría y estadísticas" },
];

export default function RolesView() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);

    // Cargar roles desde API
    useEffect(() => {
        const cargarRoles = async () => {
            try {
                const response = await rolesGestion.listar();
                const rolesData = response.data.data || response.data;

                // Transformar datos del backend al formato del frontend
                const rolesTransformados = rolesData.map((rol: any) => ({
                    id: rol.id.toString(),
                    name: rol.nombre,
                    description: rol.descripcion || '',
                    permissions: typeof rol.permisos === 'string' ? JSON.parse(rol.permisos) : rol.permisos
                }));

                setRoles(rolesTransformados);
                if (rolesTransformados.length > 0) {
                    setSelectedRole(rolesTransformados[0].id);
                }
            } catch (error) {
                console.error('Error al cargar roles:', error);
                toast.error('Error al cargar roles', 'No se pudieron cargar los roles del sistema');
            } finally {
                setLoading(false);
            }
        };
        cargarRoles();
    }, []);

    const currentRole = roles.find(r => r.id === selectedRole);

    const togglePermission = (moduleId: string, action: 'create' | 'read' | 'update' | 'delete') => {
        if (!isEditing || !currentRole) return;

        setRoles(prev => prev.map(role => {
            if (role.id === selectedRole) {
                const currentPerms = role.permissions[moduleId] || { create: false, read: false, update: false, delete: false };
                return {
                    ...role,
                    permissions: {
                        ...role.permissions,
                        [moduleId]: {
                            ...currentPerms,
                            [action]: !currentPerms[action]
                        }
                    }
                };
            }
            return role;
        }));
    };

    const handleSave = async () => {
        try {
            const roleToSave = roles.find(r => r.id === selectedRole);
            if (!roleToSave) return;

            await rolesGestion.actualizar(roleToSave.id, {
                nombre: roleToSave.name,
                descripcion: roleToSave.description,
                permisos: JSON.stringify(roleToSave.permissions)
            });

            setIsEditing(false);
            toast.success("Roles actualizados", "Los cambios en los permisos han sido guardados correctamente.");
        } catch (error: any) {
            console.error('Error al guardar rol:', error);
            toast.error('Error al guardar', error.response?.data?.message || 'No se pudieron guardar los cambios');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

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
                        <div className="p-2 bg-indigo-100 rounded-2xl">
                            <HiShieldCheck className="w-6 h-6 text-indigo-600" />
                        </div>
                        Matriz de Permisos
                    </h2>
                    <p className="text-slate-600 mt-1 ml-12">
                        Defina granularmente qué acciones puede realizar cada rol en el sistema.
                    </p>
                </div>
                <div className="flex gap-3">
                    {!isEditing ? (
                        <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                            disabled={!currentRole}
                        >
                            <HiPencil className="w-4 h-4 mr-2" />
                            Editar Permisos
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="ghost"
                                className="text-slate-600 hover:bg-slate-100"
                            >
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                                <HiSave className="w-4 h-4 mr-2" /> Guardar Cambios
                            </Button>
                        </div>
                    )}
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                        <HiPlus className="w-5 h-5 mr-2" />
                        Nuevo Rol
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Role Selector Sidebar */}
                <Card className="p-0 lg:col-span-1 border border-slate-200 h-fit overflow-hidden bg-white shadow-sm rounded-2xl">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-700">Roles del Sistema</h3>
                        <p className="text-xs text-slate-500 mt-1">Seleccione un rol para ver sus permisos</p>
                    </div>
                    <div className="p-2 space-y-1">
                        {roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex flex-col group ${selectedRole === role.id
                                    ? "bg-indigo-50 border-indigo-200 border shadow-sm"
                                    : "hover:bg-slate-50 border border-transparent"
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className={`font-medium ${selectedRole === role.id ? "text-indigo-700" : "text-slate-700"}`}>
                                        {role.name}
                                    </span>
                                    {selectedRole === role.id && (
                                        <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    )}
                                </div>
                                <span className="text-xs text-slate-500 mt-1 truncate group-hover:text-slate-600 transition-colors">
                                    {role.description}
                                </span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Permission Matrix */}
                <Card className="lg:col-span-3 border border-slate-200 overflow-hidden shadow-sm bg-white flex flex-col min-h-[500px] rounded-2xl">
                    {currentRole ? (
                        <>
                            <div className={`p-6 border-b border-slate-100 flex justify-between items-center transition-colors duration-300 ${isEditing ? 'bg-indigo-50/50' : 'bg-white'}`}>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-slate-900">{currentRole.name}</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            ID: {currentRole.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">{currentRole.description}</p>
                                </div>
                                {isEditing && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full flex items-center gap-2 border border-indigo-200"
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                        </span>
                                        MODO EDICIÓN
                                    </motion.span>
                                )}
                            </div>

                            <div className="overflow-x-auto flex-1">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="text-left py-4 px-6 font-semibold text-slate-600 w-1/3">Módulo</th>
                                            <th className="text-center py-4 px-2 font-medium text-slate-500 w-24">Crear</th>
                                            <th className="text-center py-4 px-2 font-medium text-slate-500 w-24">Leer</th>
                                            <th className="text-center py-4 px-2 font-medium text-slate-500 w-24">Actualizar</th>
                                            <th className="text-center py-4 px-2 font-medium text-slate-500 w-24">Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {MODULES.map(module => {
                                            const perms = currentRole.permissions[module.id] || { create: false, read: false, update: false, delete: false };
                                            return (
                                                <tr key={module.id} className="hover:bg-slate-50/80 transition-colors group">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-slate-700">{module.name}</span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <HiInformationCircle className="w-4 h-4 text-slate-300 hover:text-indigo-400 transition-colors" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>{module.description}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </td>
                                                    {(['create', 'read', 'update', 'delete'] as const).map(action => (
                                                        <td key={action} className="py-4 px-2 text-center">
                                                            <button
                                                                disabled={!isEditing}
                                                                onClick={() => togglePermission(module.id, action)}
                                                                className={`w-8 h-8 rounded-lg inline-flex items-center justify-center transition-all duration-200 ${perms[action]
                                                                    ? "bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200"
                                                                    : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                                                                    } ${isEditing ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-default opacity-80"}`}
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-12 text-center text-slate-400">
                            <HiShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg font-medium text-slate-500">No hay roles seleccionados</p>
                            <p className="text-sm mt-2">Seleccione un rol del menú lateral para ver sus detalles</p>
                        </div>
                    )}
                </Card>
            </div>
        </motion.div>
    );
}
