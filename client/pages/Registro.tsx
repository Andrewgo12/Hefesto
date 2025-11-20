import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { useSolicitudes } from "@/hooks/useSolicitudes";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Eye, Download, Printer } from "lucide-react";

interface RegistrationRequest {
  id: number;
  name: string;
  type: "Administrativo" | "Historia Clínica";
  department: string;
  status: "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";
  date: string;
  fase: string;
}

export default function Registro() {
  const { solicitudes, loading } = useSolicitudes();
  const navigate = useNavigate();

  // Convertir solicitudes del backend al formato de la vista
  const myRequests: RegistrationRequest[] = solicitudes.map(sol => {
    // Mapeo de estado a fase
    const faseMap: Record<string, string> = {
      'Pendiente': 'Pendiente firma(s)',
      'En revisión': 'En revisión',
      'Aprobado': 'Aprobado',
      'Rechazado': 'En revisión'
    };

    return {
      id: sol.id,
      name: sol.nombre_completo,
      type: sol.tipo === 'Administrativo' ? 'Administrativo' : 'Historia Clínica',
      department: sol.cargo || sol.especialidad || 'N/A',
      status: sol.estado as any,
      date: new Date(sol.created_at).toLocaleDateString('es-CO'),
      fase: faseMap[sol.estado] || 'En proceso'
    };
  });

  const [phaseFilter, setPhaseFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredRequests = useMemo(() => {
    return myRequests.filter((r) => {
      const matchesPhase = phaseFilter ? r.fase === phaseFilter : true;

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = term
        ? r.name.toLowerCase().includes(term) || String(r.id).includes(term)
        : true;
      return matchesPhase && matchesSearch;
    });
  }, [myRequests, phaseFilter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "En revisión":
        return "bg-blue-50 text-blue-800 border border-blue-200";
      case "Aprobado":
        return "bg-green-50 text-green-800 border border-green-200";
      case "Rechazado":
        return "bg-red-50 text-red-800 border border-red-200";
      default:
        return "bg-slate-50 text-slate-800 border border-slate-200";
    }
  };

  const getFaseColor = (fase: string) => {
    switch (fase) {
      case "Pendiente firma(s)":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "En proceso":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "En revisión":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Aprobado":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const handleVerSolicitud = (id: number) => {
    navigate(`/control/aprobacion?id=${id}`);
  };

  const handleDescargarSolicitud = (id: number) => {
    toast.info('Descarga', 'Funcionalidad de descarga en desarrollo');
  };

  const handleImprimirSolicitud = (id: number) => {
    toast.info('Impresión', 'Funcionalidad de impresión en desarrollo');
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <AnimatedSection variants={fadeInUp}>
        <div className="flex flex-col gap-2">
          <motion.h1
            className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Seguimiento de Solicitudes
          </motion.h1>
          <motion.p
            className="text-xs sm:text-sm text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Visualiza y filtra el estado de tus solicitudes por fases
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Botones de acción rápida */}
      <AnimatedSection variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/registro/administrativo')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Nueva Solicitud Administrativa
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/registro/historia-clinica')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Nueva Solicitud Historia Clínica
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Vista de proceso (fases + tabla) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300">
          <div className="mb-4">
            <p className="text-sm text-slate-600">Seguimiento por fases</p>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { fase: 'Pendiente firma(s)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { fase: 'En proceso', color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { fase: 'En revisión', color: 'bg-purple-50 text-purple-700 border-purple-200' },
              { fase: 'Aprobado', color: 'bg-green-50 text-green-700 border-green-200' },
            ].map((f, idx) => (
              <motion.div
                key={idx}
                className={`p-2 sm:p-3 rounded border ${f.color} text-[10px] sm:text-xs font-medium`}
                variants={staggerItem}
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                {f.fase}
              </motion.div>
            ))}
          </motion.div>

          {/* Controles */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-600">Fase:</label>
              <select
                className="h-8 text-sm border border-slate-300 rounded px-2"
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option>Pendiente firma(s)</option>
                <option>En proceso</option>
                <option>En revisión</option>
                <option>Aprobado</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar por solicitante o ID"
                className="h-8 text-sm border border-slate-300 rounded px-2 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">ID</th>
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">Solicitante</th>
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">Tipo</th>
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">Fase</th>
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">Fecha</th>
                  <th className="text-left py-2 px-2 text-slate-700 text-xs">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      Cargando solicitudes...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No hay solicitudes que coincidan con los filtros
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((r, idx) => (
                    <motion.tr
                      key={r.id}
                      className="border-b hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="py-2 px-2 text-xs">{r.id}</td>
                      <td className="py-2 px-2 text-xs">{r.name}</td>
                      <td className="py-2 px-2 text-xs">{r.type}</td>
                      <td className="py-2 px-2 text-xs">
                        <span className={`inline-block px-2 py-1 rounded border ${getFaseColor(r.fase)} text-[11px]`}>
                          {r.fase}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs">{r.date}</td>
                      <td className="py-2 px-2 text-xs">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <motion.button
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVerSolicitud(r.id)}
                          >
                            <Eye className="w-3 h-3" />
                            Ver
                          </motion.button>
                          <motion.button
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-green-50 hover:border-green-400 transition-colors flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDescargarSolicitud(r.id)}
                          >
                            <Download className="w-3 h-3" />
                            Descargar
                          </motion.button>
                          <motion.button
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-purple-50 hover:border-purple-400 transition-colors flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleImprimirSolicitud(r.id)}
                          >
                            <Printer className="w-3 h-3" />
                            Imprimir
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
