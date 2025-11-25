import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { HiDocumentText, HiUser, HiCheckCircle, HiExclamation } from "react-icons/hi";
import { parseSignature } from "@/lib/signatureFonts";

// Definición de los formatos y sus espacios de firma
const FORMATOS = {
    administrativo: {
        nombre: "Formato Administrativo",
        cargos: [
            { id: "solicitante", label: "Solicitante" },
            { id: "jefeInmediato", label: "Jefe Inmediato" },
            { id: "gerencia", label: "Gerencia" },
            { id: "talentoHumano", label: "Talento Humano" },
            { id: "jefeSistemas", label: "Jefe de Sistemas" },
            { id: "seguridadInformatica", label: "Seguridad Informática" }
        ]
    },
    historiaClinica: {
        nombre: "Historia Clínica Electrónica",
        cargos: [
            { id: "solicitante", label: "Solicitante" },
            { id: "coordinadorMedico", label: "Coordinador Médico" },
            { id: "jefeEnfermeria", label: "Jefe de Enfermería" },
            { id: "auditoriaMedica", label: "Auditoría Médica" },
            { id: "gerencia", label: "Gerencia" },
            { id: "sistemas", label: "Sistemas" }
        ]
    }
};

export default function ConfiguracionFirmasTab() {
    const { usuarios, configuracionFirmas, actualizarConfiguracionFirmas } = useApp();
    const [selectedFormat, setSelectedFormat] = useState<"administrativo" | "historiaClinica">("administrativo");

    // Filtrar usuarios activos para selección
    const activeUsers = usuarios.filter(u => u.estado === "Activo");

    const handleAssignUser = (cargoId: string, userId: string) => {
        actualizarConfiguracionFirmas(selectedFormat, cargoId, parseInt(userId));
    };

    const getAssignedUser = (cargoId: string) => {
        const userId = configuracionFirmas[selectedFormat]?.[cargoId];
        if (!userId) return null;
        return usuarios.find(u => u.id === userId);
    };

    const getSignaturePreview = (user: any) => {
        // En un caso real, aquí buscaríamos la firma del usuario en sus credenciales
        // Por ahora simulamos una visualización básica
        return (
            <div className="h-16 flex items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded mt-2">
                <span className="font-signature text-lg text-slate-600">
                    {user ? parseSignature(`FIRMA_TEXTO:1:${user.nombre}`).name : "Sin Firma"}
                </span>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Selector de Formato */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <HiDocumentText className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900">Seleccionar Formato</h3>
                        <p className="text-sm text-slate-500">Configura las firmas para cada tipo de documento</p>
                    </div>
                </div>
                <Select
                    value={selectedFormat}
                    onValueChange={(v: any) => setSelectedFormat(v)}
                >
                    <SelectTrigger className="w-full sm:w-64 bg-white">
                        <SelectValue placeholder="Seleccione un formato" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="administrativo">Formato Administrativo</SelectItem>
                        <SelectItem value="historiaClinica">Historia Clínica Electrónica</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Grid de Firmas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FORMATOS[selectedFormat].cargos.map((cargo, index) => {
                    const assignedUser = getAssignedUser(cargo.id);

                    return (
                        <motion.div
                            key={cargo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`p-4 border-l-4 transition-all hover:shadow-md ${assignedUser ? "border-l-green-500" : "border-l-slate-300"
                                }`}>
                                <div className="flex justify-between items-start mb-3">
                                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                                        {cargo.label}
                                    </Label>
                                    {assignedUser ? (
                                        <HiCheckCircle className="w-5 h-5 text-green-500" title="Asignado" />
                                    ) : (
                                        <HiExclamation className="w-5 h-5 text-amber-500" title="Sin asignar" />
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Select
                                        value={assignedUser?.id.toString() || ""}
                                        onValueChange={(val) => handleAssignUser(cargo.id, val)}
                                    >
                                        <SelectTrigger className="w-full h-9 text-xs">
                                            <SelectValue placeholder="Seleccionar usuario..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {activeUsers.map(user => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* Preview de Firma */}
                                    <div className="relative group">
                                        {getSignaturePreview(assignedUser)}
                                        {assignedUser && (
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded pointer-events-none">
                                                <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-1 rounded shadow-sm">
                                                    Vista Previa
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {assignedUser && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
                                            <HiUser className="w-3 h-3" />
                                            <span className="truncate">{assignedUser.cargo || "Sin cargo definido"}</span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <style>{`
                .font-signature {
                    font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
                }
            `}</style>
        </div>
    );
}
