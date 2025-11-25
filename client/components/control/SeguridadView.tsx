import { useState, useEffect } from "react";
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
    HiRefresh,
    HiExclamationCircle,
    HiCheckCircle,
    HiInformationCircle
} from "react-icons/hi";
import { toast } from "@/lib/toast";
import { motion } from "framer-motion";
import { seguridad } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";

export default function SeguridadView() {
    const { actividades } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [policies, setPolicies] = useState({
        tiempo_sesion_minutos: 120,
        intentos_login_permitidos: 5,
        tiempo_bloqueo_minutos: 15,
        requiere_2fa: false
    });

    // Cargar políticas desde API
    useEffect(() => {
        const cargarPoliticas = async () => {
            try {
                const response = await seguridad.obtenerPoliticas();
                const data = response.data.data || response.data;
                setPolicies({
                    tiempo_sesion_minutos: parseInt(data.tiempo_sesion_minutos),
                    intentos_login_permitidos: parseInt(data.intentos_login_permitidos),
                    tiempo_bloqueo_minutos: parseInt(data.tiempo_bloqueo_minutos),
                    requiere_2fa: Boolean(data.requiere_2fa)
                });
            } catch (error) {
                console.error('Error al cargar políticas:', error);
                toast.error('Error', 'No se pudieron cargar las políticas de seguridad');
            } finally {
                setLoading(false);
            }
        };
        cargarPoliticas();
    }, []);

    const handlePolicyChange = async (key: string, value: any) => {
        const newPolicies = { ...policies, [key]: value };
        setPolicies(newPolicies);

        try {
            await seguridad.actualizarPoliticas(newPolicies);
            // No mostrar toast en cada cambio para no saturar, solo si hay error
        } catch (error) {
            console.error('Error al guardar política:', error);
            toast.error('Error', 'No se pudo guardar el cambio de política');
            // Revertir cambio en caso de error
            setPolicies(policies);
        }
    };

    const handleKillSessions = async () => {
        if (!confirm("¿Está seguro? Esto cerrará la sesión de TODOS los usuarios activos excepto la suya.")) return;

        try {
            const response = await seguridad.cerrarSesiones();
            toast.success("Sesiones cerradas", `Se han cerrado ${response.data.count || 'todas las'} sesiones activas.`);
        } catch (error) {
            console.error('Error al cerrar sesiones:', error);
            toast.error('Error', 'No se pudieron cerrar las sesiones');
        }
    };

    // Filter activities
    const filteredActivities = actividades.filter(act =>
        act.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEventIcon = (action: string) => {
        const lower = action.toLowerCase();
        if (lower.includes('error') || lower.includes('fallido')) return <HiExclamationCircle className="w-5 h-5 text-red-500" />;
        if (lower.includes('crear') || lower.includes('login')) return <HiCheckCircle className="w-5 h-5 text-green-500" />;
        return <HiInformationCircle className="w-5 h-5 text-blue-500" />;
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">Cargando políticas de seguridad...</div>;
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
                        <div className="p-2 bg-red-100 rounded-lg">
                            <HiLockClosed className="w-6 h-6 text-red-600" />
                        </div>
                        Centro de Seguridad
                    </h2>
                    <p className="text-slate-600 mt-1 ml-12">
                        Monitoreo de amenazas y configuración de políticas de acceso.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        onClick={handleKillSessions}
                        className="shadow-lg shadow-red-200 hover:shadow-red-300 transition-all"
                    >
                        <HiBan className="w-5 h-5 mr-2" />
                        Cerrar Todas las Sesiones
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Security Policies Panel */}
                <Card className="border-t-4 border-t-red-600 shadow-md lg:col-span-1 h-fit bg-white">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <HiShieldCheck className="w-5 h-5 text-red-600" />
                            Políticas de Acceso
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Configuración global de seguridad</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700">Tiempo de Sesión (minutos)</Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    value={policies.tiempo_sesion_minutos}
                                    onChange={(e) => handlePolicyChange("tiempo_sesion_minutos", parseInt(e.target.value))}
                                    className="border-slate-200 focus:border-red-500 focus:ring-red-500 font-mono"
                                />
                                <span className="text-xs text-slate-400 whitespace-nowrap">max 480 min</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700">Intentos Fallidos Permitidos</Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    value={policies.intentos_login_permitidos}
                                    onChange={(e) => handlePolicyChange("intentos_login_permitidos", parseInt(e.target.value))}
                                    className="border-slate-200 focus:border-red-500 focus:ring-red-500 font-mono"
                                />
                                <span className="text-xs text-slate-400 whitespace-nowrap">antes de bloqueo</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700">Tiempo de Bloqueo (minutos)</Label>
                            <Input
                                type="number"
                                value={policies.tiempo_bloqueo_minutos}
                                onChange={(e) => handlePolicyChange("tiempo_bloqueo_minutos", parseInt(e.target.value))}
                                className="border-slate-200 focus:border-red-500 focus:ring-red-500 font-mono"
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium text-slate-900">Autenticación 2FA</Label>
                                    <p className="text-xs text-slate-500">Requerir segundo factor</p>
                                </div>
                                <Switch
                                    checked={policies.requiere_2fa}
                                    onCheckedChange={(c) => handlePolicyChange("requiere_2fa", c)}
                                    className="data-[state=checked]:bg-red-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-red-50 border-t border-red-100 rounded-b-lg">
                        <div className="flex items-start gap-3">
                            <HiInformationCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-xs text-red-800">
                                Los cambios en estas políticas se aplican inmediatamente a los nuevos inicios de sesión.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Audit Log Timeline */}
                <Card className="border-t-4 border-t-orange-500 shadow-md lg:col-span-2 flex flex-col h-[600px] bg-white">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <HiClock className="w-5 h-5 text-orange-500" />
                                Monitor de Eventos
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Registro de actividad en tiempo real</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <Input
                                    placeholder="Filtrar eventos..."
                                    className="pl-9 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" onClick={() => toast.info("Actualizado", "Lista de eventos actualizada")}>
                                <HiRefresh className="w-4 h-4 text-slate-600" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {filteredActivities.length > 0 ? (
                                filteredActivities.map((act) => (
                                    <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            {getEventIcon(act.accion)}
                                        </div>

                                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 shadow-sm hover:shadow-md transition-shadow border-slate-200">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-slate-700 text-sm">{act.usuario}</span>
                                                <time className="text-xs font-medium text-slate-400">{new Date(act.timestamp).toLocaleTimeString()}</time>
                                            </div>
                                            <div className="text-slate-600 text-sm mb-2">
                                                <span className="font-semibold text-slate-800">{act.accion}</span>: {act.descripcion}
                                            </div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                                <HiDesktopComputer className="w-3 h-3" />
                                                {new Date(act.timestamp).toLocaleDateString()}
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-500">No se encontraron eventos recientes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}
