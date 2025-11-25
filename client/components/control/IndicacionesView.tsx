import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HiAdjustments, HiSave, HiExclamation, HiMail, HiOfficeBuilding, HiBell } from "react-icons/hi";
import { toast } from "@/lib/toast";
import { motion } from "framer-motion";

interface SystemConfig {
    institutionName: string;
    supportEmail: string;
    enableEmailNotifications: boolean;
    enableSystemNotifications: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string;
}

const DEFAULT_CONFIG: SystemConfig = {
    institutionName: "Hospital General",
    supportEmail: "soporte@hospital.local",
    enableEmailNotifications: true,
    enableSystemNotifications: true,
    maintenanceMode: false,
    maintenanceMessage: "El sistema se encuentra en mantenimiento. Por favor intente más tarde.",
};

export default function IndicacionesView() {
    const [config, setConfig] = useState<SystemConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const savedConfig = localStorage.getItem("system_config");
        if (savedConfig) {
            try {
                setConfig(JSON.parse(savedConfig));
            } catch (e) {
                console.error("Error loading config", e);
            }
        }
    }, []);

    const handleChange = (key: keyof SystemConfig, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        localStorage.setItem("system_config", JSON.stringify(config));
        setHasChanges(false);
        setLoading(false);
        toast.success("Configuración guardada", "Los parámetros del sistema han sido actualizados correctamente.");
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
                        <HiAdjustments className="w-8 h-8 text-blue-600" />
                        Indicaciones del Sistema
                    </h2>
                    <p className="text-slate-600 mt-1">
                        Configure los parámetros globales y el comportamiento del sistema.
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={!hasChanges || loading}
                    className={`shadow-lg transition-all duration-300 ${hasChanges
                            ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/50"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    <HiSave className="w-5 h-5 mr-2" />
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Configuration */}
                <Card className="p-6 border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <HiOfficeBuilding className="w-5 h-5 text-blue-500" />
                        Configuración General
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="institutionName">Nombre de la Institución</Label>
                            <Input
                                id="institutionName"
                                value={config.institutionName}
                                onChange={(e) => handleChange("institutionName", e.target.value)}
                                placeholder="Ej: Hospital General"
                                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <p className="text-xs text-slate-500">Este nombre aparecerá en los reportes y encabezados.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportEmail">Correo de Soporte</Label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input
                                    id="supportEmail"
                                    value={config.supportEmail}
                                    onChange={(e) => handleChange("supportEmail", e.target.value)}
                                    placeholder="soporte@ejemplo.com"
                                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <p className="text-xs text-slate-500">Dirección para recibir reportes de errores de usuarios.</p>
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="p-6 border-t-4 border-t-indigo-500 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <HiBell className="w-5 h-5 text-indigo-500" />
                        Notificaciones
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Correos Automáticos</Label>
                                <p className="text-sm text-slate-500">Enviar credenciales y alertas por email</p>
                            </div>
                            <Switch
                                checked={config.enableEmailNotifications}
                                onCheckedChange={(checked) => handleChange("enableEmailNotifications", checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Notificaciones en Sistema</Label>
                                <p className="text-sm text-slate-500">Mostrar alertas push dentro de la aplicación</p>
                            </div>
                            <Switch
                                checked={config.enableSystemNotifications}
                                onCheckedChange={(checked) => handleChange("enableSystemNotifications", checked)}
                            />
                        </div>
                    </div>
                </Card>

                {/* Maintenance Mode */}
                <Card className="p-6 border-t-4 border-t-red-500 shadow-md hover:shadow-lg transition-shadow duration-300 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <HiExclamation className="w-5 h-5 text-red-500" />
                        Mantenimiento y Acceso
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold text-red-900">Modo Mantenimiento</Label>
                                <p className="text-sm text-red-700">
                                    Al activar, solo los administradores podrán acceder al sistema.
                                </p>
                            </div>
                            <Switch
                                checked={config.maintenanceMode}
                                onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
                                className="data-[state=checked]:bg-red-600"
                            />
                        </div>

                        {config.maintenanceMode && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="space-y-2"
                            >
                                <Label htmlFor="maintenanceMessage">Mensaje de Mantenimiento</Label>
                                <Input
                                    id="maintenanceMessage"
                                    value={config.maintenanceMessage}
                                    onChange={(e) => handleChange("maintenanceMessage", e.target.value)}
                                    placeholder="Mensaje para mostrar a los usuarios..."
                                    className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                />
                            </motion.div>
                        )}
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}
