import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    HiKey,
    HiFingerPrint,
    HiShieldCheck,
    HiLockClosed,
    HiRefresh,
    HiSearch,
    HiCheck,
    HiX
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/lib/toast";

export default function LlavesView() {
    const [activeTab, setActiveTab] = useState("firmas");
    const [searchTerm, setSearchTerm] = useState("");

    const tabs = [
        { id: "firmas", label: "Firmas Digitales", icon: HiFingerPrint, description: "Gestión de certificados y firmas" },
        { id: "accesos", label: "Llaves de Acceso", icon: HiKey, description: "Tokens y llaves API" },
        { id: "seguridad", label: "Niveles de Seguridad", icon: HiShieldCheck, description: "Configuración de encriptación" },
    ];

    // Mock data for demonstration
    const firmas = [
        { id: 1, usuario: "Dr. Carlos Rodríguez", tipo: "Certificado Médico", estado: "Activo", expira: "2025-12-31" },
        { id: 2, usuario: "Lic. Ana Martínez", tipo: "Firma Administrativa", estado: "Activo", expira: "2026-06-30" },
        { id: 3, usuario: "Dr. Juan Pérez", tipo: "Certificado Médico", estado: "Revocado", expira: "2024-11-15" },
    ];

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
                        <div className="p-2 bg-slate-800 rounded-lg shadow-lg">
                            <HiKey className="w-6 h-6 text-slate-100" />
                        </div>
                        Bóveda de Credenciales
                    </h2>
                    <p className="text-slate-600 mt-1 ml-12">
                        Gestión centralizada de firmas digitales, tokens y llaves de acceso.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
                {/* Sidebar Navigation */}
                <Card className="lg:col-span-3 p-2 bg-slate-900 text-slate-300 h-fit shadow-xl border-slate-800">
                    <div className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 group ${activeTab === tab.id
                                    ? "bg-slate-800 text-white shadow-md border-l-4 border-blue-500"
                                    : "hover:bg-slate-800/50 hover:text-white border-l-4 border-transparent"
                                    }`}
                            >
                                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? "text-blue-400" : "text-slate-500 group-hover:text-slate-400"}`} />
                                <div>
                                    <span className="font-semibold block text-sm">{tab.label}</span>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-400">{tab.description}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 mx-2">
                        <div className="flex items-center gap-2 text-yellow-500 mb-2">
                            <HiLockClosed className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Zona Segura</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Todas las acciones en este módulo son auditadas y requieren privilegios elevados.
                        </p>
                    </div>
                </Card>

                {/* Content Area */}
                <Card className="lg:col-span-9 p-6 bg-white shadow-lg border-slate-200 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-0 opacity-50 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            {activeTab === "firmas" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            <HiFingerPrint className="w-6 h-6 text-slate-600" />
                                            Gestión de Firmas Digitales
                                        </h3>
                                        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                                            Nueva Firma
                                        </Button>
                                    </div>

                                    <div className="flex gap-4 mb-6">
                                        <div className="relative flex-1">
                                            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <Input
                                                placeholder="Buscar firma por usuario..."
                                                className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                                                <tr>
                                                    <th className="p-4">Usuario</th>
                                                    <th className="p-4">Tipo de Firma</th>
                                                    <th className="p-4">Estado</th>
                                                    <th className="p-4">Expiración</th>
                                                    <th className="p-4 text-right">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {firmas.map((firma) => (
                                                    <tr key={firma.id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4 font-medium text-slate-900">{firma.usuario}</td>
                                                        <td className="p-4 text-slate-600">{firma.tipo}</td>
                                                        <td className="p-4">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${firma.estado === 'Activo'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                                }`}>
                                                                {firma.estado}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-slate-500 font-mono text-xs">{firma.expira}</td>
                                                        <td className="p-4 text-right">
                                                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                                                                Gestionar
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === "accesos" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            <HiKey className="w-6 h-6 text-slate-600" />
                                            Llaves de Acceso API
                                        </h3>
                                        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                                            Generar Token
                                        </Button>
                                    </div>

                                    <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                            <HiKey className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-lg font-medium text-slate-900">No hay llaves activas</h4>
                                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                                            Genere llaves de acceso para permitir que aplicaciones externas se conecten de forma segura a la API de Hefesto.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "seguridad" && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                            <HiShieldCheck className="w-6 h-6 text-slate-600" />
                                            Configuración de Encriptación
                                        </h3>
                                    </div>

                                    <div className="grid gap-6">
                                        <Card className="p-6 border border-slate-200 shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">Rotación de Llaves</h4>
                                                    <p className="text-sm text-slate-500">Rotar automáticamente las llaves de encriptación cada 90 días</p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">Algoritmo de Firma</h4>
                                                    <p className="text-sm text-slate-500">Seleccione el algoritmo para firmas digitales</p>
                                                </div>
                                                <select className="text-sm border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                    <option>RSA-2048</option>
                                                    <option>RSA-4096</option>
                                                    <option>ECDSA P-256</option>
                                                </select>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
        </motion.div>
    );
}
