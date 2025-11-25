import { useState } from 'react';
import { Search, UserCheck, UserX, Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/lib/toast';
import { motion } from "framer-motion";

export default function ActivacionTab() {
    const { usuarios, actualizarUsuario } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState<string | null>(null);

    const filteredUsers = usuarios.filter(user => {
        const matchesSearch =
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = filterRole ? user.rol === filterRole : true;

        return matchesSearch && matchesRole;
    });

    const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
        try {
            // En una implementación real, esto llamaría a una API específica
            // Por ahora simulamos actualizando el usuario
            await actualizarUsuario(userId, {
                estado: !currentStatus ? 'Activo' : 'Inactivo'
            });

            toast.success(
                'Estado actualizado',
                `Usuario ${!currentStatus ? 'activado' : 'desactivado'} correctamente`
            );
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            toast.error('Error', 'No se pudo actualizar el estado del usuario');
        }
    };

    return (
        <div className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Buscar por nombre, usuario o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Button
                        variant={filterRole === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterRole(null)}
                        className="whitespace-nowrap"
                    >
                        Todos
                    </Button>
                    <Button
                        variant={filterRole === "Administrador" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterRole("Administrador")}
                        className="whitespace-nowrap"
                    >
                        Administradores
                    </Button>
                    <Button
                        variant={filterRole === "Usuario" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterRole("Usuario")}
                        className="whitespace-nowrap"
                    >
                        Usuarios
                    </Button>
                </div>
            </div>

            {/* Lista de Usuarios */}
            <div className="grid grid-cols-1 gap-4">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        No se encontraron usuarios con los criterios de búsqueda.
                    </div>
                ) : (
                    filteredUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`hover:shadow-md transition-all ${user.estado !== 'Activo' ? 'bg-slate-50 opacity-75' : 'bg-white'}`}>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.estado === 'Activo' ? 'bg-blue-600' : 'bg-slate-400'}`}>
                                            {user.nombre.charAt(0).toUpperCase()}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                                {user.nombre}
                                                <Badge variant={user.rol === 'Administrador' ? 'default' : 'secondary'} className="text-xs">
                                                    {user.rol}
                                                </Badge>
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Shield className="h-3 w-3" /> {user.username}
                                                </span>
                                                {user.email && (
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {user.email}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden sm:block">
                                            <span className={`text-xs font-medium block ${user.estado === 'Activo' ? 'text-green-600' : 'text-slate-500'}`}>
                                                {user.estado === 'Activo' ? 'Cuenta Activa' : 'Cuenta Inactiva'}
                                            </span>
                                        </div>
                                        <Switch
                                            checked={user.estado === 'Activo'}
                                            onCheckedChange={() => toggleUserStatus(user.id, user.estado === 'Activo')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
