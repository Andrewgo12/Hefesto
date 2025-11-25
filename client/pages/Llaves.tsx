import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Key, Shield, UserCheck, PenTool, Lock, Terminal } from "lucide-react";
import { useRoles } from '@/hooks/useRoles';
import { Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import PermisosTab from "@/components/tabs/PermisosTab";
import CredencialesTab from "@/components/tabs/CredencialesTab";
import ActivacionTab from "@/components/tabs/ActivacionTab";
import ConfiguracionFirmasTab from "@/components/tabs/ConfiguracionFirmasTab";
import ApiKeysTab from "@/components/tabs/ApiKeysTab";

export default function Llaves() {
    const { isAdmin } = useRoles();
    const [activeTab, setActiveTab] = useState("firmas");

    // Solo administradores pueden acceder
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    const tabs = [
        { id: "firmas", label: "Gestión de Firmas", icon: PenTool, desc: "Asignación de firmas por formato" },
        { id: "permisos", label: "Permisos y Roles", icon: Shield, desc: "Control de acceso por módulos" },
        { id: "credenciales", label: "Credenciales", icon: Key, desc: "Gestión de claves de firma" },
        { id: "activacion", label: "Activación", icon: UserCheck, desc: "Estado de usuarios" },
        { id: "tokens", label: "Tokens API", icon: Terminal, desc: "Llaves de acceso para integraciones" },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Centro de Control de Accesos
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Gestión centralizada de seguridad, firmas y permisos
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar de Navegación */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-24"
                        >
                            <div className="p-4 bg-slate-50 border-b border-slate-100">
                                <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                                    Módulos
                                </h3>
                            </div>
                            <div className="p-2 space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3 group ${isActive
                                                ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200"
                                                : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 mt-0.5 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                            <div>
                                                <span className="font-medium block">{tab.label}</span>
                                                <span className={`text-xs block mt-0.5 ${isActive ? "text-blue-500" : "text-slate-400"}`}>
                                                    {tab.desc}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contenido Principal */}
                    <div className="lg:col-span-9">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-white border-slate-200 shadow-sm min-h-[600px]">
                                <div className="p-6 border-b border-slate-100">
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        {tabs.find(t => t.id === activeTab)?.icon && (
                                            (() => {
                                                const Icon = tabs.find(t => t.id === activeTab)!.icon;
                                                return <Icon className="w-6 h-6 text-blue-600" />;
                                            })()
                                        )}
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </h2>
                                    <p className="text-slate-500 mt-1">
                                        {tabs.find(t => t.id === activeTab)?.desc}
                                    </p>
                                </div>
                                <div className="p-6">
                                    {activeTab === "firmas" && <ConfiguracionFirmasTab />}
                                    {activeTab === "permisos" && <PermisosTab />}
                                    {activeTab === "credenciales" && <CredencialesTab />}
                                    {activeTab === "activacion" && <ActivacionTab />}
                                    {activeTab === "tokens" && <ApiKeysTab />}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
