import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    HiAdjustments,
    HiSave,
    HiExclamation,
    HiMail,
    HiOfficeBuilding,
    HiBell,
    HiShieldCheck,
    HiServer
} from "react-icons/hi";
import { toast } from "@/lib/toast";
import { motion } from "framer-motion";
import { configuracion } from "@/lib/api";

interface SystemConfig {
    institutionName: string;
    supportEmail: string;
    enableEmailNotifications: boolean;
    enableSystemNotifications: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string;
}

export default function IndicacionesView() {
    const [config, setConfig] = useState<SystemConfig>({
        institutionName: '',
        supportEmail: '',
        enableEmailNotifications: true,
        enableSystemNotifications: true,
        maintenanceMode: false,
        maintenanceMessage: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Cargar configuración desde API
    useEffect(() => {
        const cargarConfiguracion = async () => {
            try {
                const response = await configuracion.obtener();
                const configData = response.data.data || response.data;
                setConfig(configData);
            } catch (error) {
                console.error('Error al cargar configuración:', error);
                toast.error('Error al cargar configuración', 'No se pudo cargar la configuración del sistema');
            } finally {
                setLoading(false);
            }
        };
        cargarConfiguracion();
    }, []);

    const handleChange = (key: keyof SystemConfig, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await configuracion.actualizar(config);
            toast.success('Configuración guardada', 'Los cambios han sido aplicados correctamente');
        } catch (error: any) {
            console.error('Error al guardar configuración:', error);
            toast.error('Error al guardar', error.response?.data?.message || 'No se pudo guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 max-w-5xl mx-auto"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 rounded-2xl">
                            <HiAdjustments className="w-8 h-8 text-emerald-600" />
                        </div>
                        Configuración del Sistema
                    </h2>
                    <p className="text-slate-600 mt-2 text-lg">
                        Administre los parámetros globales y el comportamiento de la aplicación.
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg px-6 py-6 text-lg h-auto transition-all rounded-2xl"
                >
                    <HiSave className="w-6 h-6 mr-2" />
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* General Configuration */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                            <HiOfficeBuilding className="w-6 h-6 text-emerald-500" />
                            Identidad Institucional
                        </h3>
                        <p className="text-slate-500">
                            Configure la información básica de la institución que aparecerá en reportes y encabezados.
                        </p>
                    </div>
                    <Card className="lg:col-span-8 p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="institutionName" className="text-base">Nombre de la Institución</Label>
                                <Input
                                    id="institutionName"
                                    value={config.institutionName}
                                    onChange={(e) => handleChange("institutionName", e.target.value)}
                                    placeholder="Ej: Hospital General"
                                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="supportEmail" className="text-base">Correo de Soporte</Label>
                                <div className="relative">
                                    <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <Input
                                        id="supportEmail"
                                        value={config.supportEmail}
                                        onChange={(e) => handleChange("supportEmail", e.target.value)}
                                        placeholder="soporte@ejemplo.com"
                                        className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                                    />
                                </div>
                                <p className="text-sm text-slate-500">Dirección visible para que los usuarios reporten incidencias.</p>
                            </div>
                        </div>
                    </Card>
                </section>

                <div className="border-t border-slate-100 my-2"></div>

                {/* Notifications */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                            <HiBell className="w-6 h-6 text-emerald-500" />
                            Sistema de Notificaciones
                        </h3>
                        <p className="text-slate-500">
                            Controle cómo y cuándo el sistema se comunica con los usuarios.
                        </p>
                    </div>
                    <Card className="lg:col-span-8 p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-white">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-full shadow-sm text-emerald-600">
                                        <HiMail className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-semibold">Correos Electrónicos</Label>
                                        <p className="text-sm text-slate-500">Enviar credenciales, alertas y reportes por email</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={config.enableEmailNotifications}
                                    onCheckedChange={(checked) => handleChange("enableEmailNotifications", checked)}
                                    className="data-[state=checked]:bg-emerald-600"
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-full shadow-sm text-emerald-600">
                                        <HiBell className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-semibold">Alertas en Pantalla</Label>
                                        <p className="text-sm text-slate-500">Mostrar notificaciones push y toasts dentro de la aplicación</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={config.enableSystemNotifications}
                                    onCheckedChange={(checked) => handleChange("enableSystemNotifications", checked)}
                                    className="data-[state=checked]:bg-emerald-600"
                                />
                            </div>
                        </div>
                    </Card>
                </section>

                <div className="border-t border-slate-100 my-2"></div>

                {/* Maintenance Mode */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                            <HiServer className="w-6 h-6 text-red-500" />
                            Control de Acceso
                        </h3>
                        <p className="text-slate-500">
                            Gestione el acceso global al sistema en situaciones de mantenimiento o emergencia.
                        </p>
                    </div>
                    <Card className={`lg:col-span-8 p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl ${config.maintenanceMode ? 'bg-red-50/50' : 'bg-white'}`}>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-full shadow-sm ${config.maintenanceMode ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <HiExclamation className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-bold text-slate-900">Modo Mantenimiento</Label>
                                        <p className="text-sm text-slate-500">
                                            Al activar, solo los administradores podrán acceder al sistema.
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={config.maintenanceMode}
                                    onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
                                    className="data-[state=checked]:bg-red-600"
                                />
                            </div>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: config.maintenanceMode ? "auto" : 0,
                                    opacity: config.maintenanceMode ? 1 : 0
                                }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 border-t border-red-100">
                                    <Label htmlFor="maintenanceMessage" className="text-red-800 font-medium mb-2 block">Mensaje para usuarios</Label>
                                    <div className="relative">
                                        <Input
                                            id="maintenanceMessage"
                                            value={config.maintenanceMessage}
                                            onChange={(e) => handleChange("maintenanceMessage", e.target.value)}
                                            placeholder="El sistema se encuentra en mantenimiento..."
                                            className="border-red-200 focus:border-red-500 focus:ring-red-500 bg-white"
                                        />
                                    </div>
                                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                                        <HiExclamation className="w-4 h-4" />
                                        Este mensaje se mostrará en la pantalla de inicio de sesión.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </Card>
                </section>
            </div>
        </motion.div>
    );
}
