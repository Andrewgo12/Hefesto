import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from "framer-motion";
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/lib/toast';

export default function PermisosTab() {
    const { usuarios, actualizarUsuario } = useApp();
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleSavePermissions = () => {
        if (!selectedUser || !selectedRole) {
            toast.error('Campos requeridos', 'Debe seleccionar un usuario y un rol');
            return;
        }

        try {
            const userId = parseInt(selectedUser);
            actualizarUsuario(userId, {
                rol: selectedRole
            });

            const usuario = usuarios.find(u => u.id === userId);
            if (usuario) {
                toast.success('Permisos actualizados', `Se han actualizado los permisos de ${usuario.nombre} correctamente`);
            }

            // Limpiar selección
            setSelectedUser('');
            setSelectedRole('');
            setSelectedServices([]);
        } catch (error) {
            console.error('Error al guardar permisos:', error);
            toast.error('Error al actualizar permisos', 'Por favor, inténtelo nuevamente');
        }
    };

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Label htmlFor="user-select" className="text-xs sm:text-sm font-medium text-slate-700">
                    Seleccionar Usuario
                </Label>
                <select
                    id="user-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                >
                    <option value="">Selecciona un usuario...</option>
                    {usuarios.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.nombre} ({user.username})
                        </option>
                    ))}
                </select>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Label htmlFor="role-select" className="text-xs sm:text-sm font-medium text-slate-700">
                    Nuevo Rol
                </Label>
                <select
                    id="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                >
                    <option value="">Selecciona un rol...</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Supervisor">Supervisor</option>
                </select>
            </motion.div>

            <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Label className="text-xs sm:text-sm font-medium text-slate-700 mb-3 block">
                    Servicios y Accesos
                </Label>
                <div className="space-y-2">
                    {[
                        "Historia Clínica Electrónica",
                        "Laboratorio",
                        "Imagenología",
                        "Farmacia",
                        "Facturación",
                        "Reportes",
                    ].map((service, idx) => (
                        <motion.label
                            key={service}
                            className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer border border-transparent hover:border-blue-200 transition-all duration-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => toggleService(service)}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-xs sm:text-sm text-slate-700">{service}</span>
                        </motion.label>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="md:col-span-2 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        onClick={handleSavePermissions}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 rounded-lg"
                    >
                        Guardar Cambios
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
