import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    HiLockClosed,
    HiShieldCheck,
    HiUserGroup,
    HiClock,
    HiBan,
    HiSearch,
    HiDesktopComputer,
    HiRefresh
} from "react-icons/hi";
import { toast } from "@/lib/toast";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";



export default function SeguridadView() {
    const { actividades } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [passwordPolicy, setPasswordPolicy] = useState({
        minLength: 8,
        requireSpecial: true,
        requireNumbers: true,
        expiryDays: 90
    });

    // Filter activities
    const filteredActivities = actividades.filter(act =>
        act.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePolicyChange = (key: string, value: any) => {
        setPasswordPolicy(prev => ({ ...prev, [key]: value }));
        toast.success("Política actualizada", "Los cambios se han aplicado correctamente.");
    };

    const handleKillSessions = () => {
        toast.success("Sesiones cerradas", "Se han cerrado todas las sesiones activas excepto la actual.");
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
                        <HiLockClosed className="w-8 h-8 text-red-600" />
                        Seguridad del Sistema
                    </h2>
                    <p className="text-slate-600 mt-1">
                        Gestión de políticas de seguridad y auditoría de eventos.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Password Policies */}
                <Card className="p-6 border-t-4 border-t-slate-700 shadow-md lg:col-span-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <HiShieldCheck className="w-5 h-5 text-slate-700" />
                        Políticas de Contraseña
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Longitud Mínima</Label>
                            <Input
                                type="number"
                                value={passwordPolicy.minLength}
                                onChange={(e) => handlePolicyChange("minLength", parseInt(e.target.value))}
                                className="border-slate-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Días de Expiración</Label>
                            <Input
                                type="number"
                                value={passwordPolicy.expiryDays}
                                onChange={(e) => handlePolicyChange("expiryDays", parseInt(e.target.value))}
                                className="border-slate-300"
                            />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <Label className="cursor-pointer">Caracteres Especiales</Label>
                            <Switch
                                checked={passwordPolicy.requireSpecial}
                                onCheckedChange={(c) => handlePolicyChange("requireSpecial", c)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label className="cursor-pointer">Números Requeridos</Label>
                            <Switch
                                checked={passwordPolicy.requireNumbers}
                                onCheckedChange={(c) => handlePolicyChange("requireNumbers", c)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <HiUserGroup className="w-5 h-5 text-slate-700" />
                            Gestión de Sesiones
                        </h3>
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleKillSessions}
                        >
                            <HiBan className="w-4 h-4 mr-2" />
                            Cerrar Todas las Sesiones
                        </Button>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            Fuerza el cierre de sesión de todos los usuarios excepto usted.
                        </p>
                    </div>
                </Card>

                {/* Audit Log */}
                <Card className="p-6 border-t-4 border-t-blue-600 shadow-md lg:col-span-2 flex flex-col h-[600px]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <HiClock className="w-5 h-5 text-blue-600" />
                            Registro de Auditoría
                        </h3>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <Input
                                    placeholder="Buscar actividad..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" onClick={() => toast.info("Actualizado", "Lista de eventos actualizada")}>
                                <HiRefresh className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium sticky top-0">
                                <tr>
                                    <th className="p-3">Usuario</th>
                                    <th className="p-3">Acción</th>
                                    <th className="p-3">Detalles</th>
                                    <th className="p-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredActivities.length > 0 ? (
                                    filteredActivities.map((act) => {
                                        // Derivar tipo basado en la acción
                                        const tipo = act.accion.toLowerCase().includes('error') ? 'error' :
                                            act.accion.toLowerCase().includes('rechazado') ? 'warning' :
                                                act.accion.toLowerCase().includes('crear') ? 'success' : 'info';

                                        return (
                                            <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-3 font-medium text-slate-900">{act.usuario}</td>
                                                <td className="p-3">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tipo === 'info' ? 'bg-blue-100 text-blue-700' :
                                                        tipo === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                                            tipo === 'error' ? 'bg-red-100 text-red-700' :
                                                                'bg-green-100 text-green-700'
                                                        }`}>
                                                        {act.accion}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-slate-600">{act.descripcion}</td>
                                                <td className="p-3 text-slate-500 whitespace-nowrap">
                                                    {new Date(act.timestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-500">
                                            No se encontraron registros de actividad.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}
