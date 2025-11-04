import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Eye, Download, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedCard, StaggerContainer, StaggerItem, AnimatedNumber } from "@/components/AnimatedSection";
import { fadeInUp, fadeInDown, staggerContainer, staggerItem } from "@/lib/animations";

interface Solicitud {
  id: number;
  nombre_completo: string;
  tipo: "Administrativo" | "Historia Clínica";
  estado: "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";
  fecha_solicitud: string;
  created_at: string;
}

interface Estadisticas {
  total: number;
  pendientes: number;
  en_revision: number;
  aprobadas: number;
  rechazadas: number;
}

export default function Index() {
  const { solicitudes, estadisticas } = useApp();

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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "info":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  // Mostrar solo las 5 solicitudes más recientes
  const solicitudesRecientes = solicitudes.slice(0, 5);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection variants={fadeInDown}>
          <div className="flex flex-col gap-2">
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Panel de Control
            </motion.h1>
            <motion.p 
              className="text-sm text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Resumen de solicitudes y actividad del sistema
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Quick Stats */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StaggerItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 border-2 border-transparent hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 rounded-xl">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 bg-blue-100 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-600">Total Solicitudes</p>
                    <AnimatedNumber value={estadisticas.totalSolicitudes} className="text-2xl font-bold text-slate-900" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 border-2 border-transparent hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-200/50 transition-all duration-300 rounded-xl">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 bg-amber-100 rounded-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-5 h-5 text-amber-600" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-600">Pendientes</p>
                    <AnimatedNumber value={estadisticas.pendientes} className="text-2xl font-bold text-amber-600" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 border-2 border-transparent hover:border-green-400 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300 rounded-xl">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 bg-green-100 rounded-lg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-600">Aprobadas</p>
                    <AnimatedNumber value={estadisticas.aprobadas} className="text-2xl font-bold text-green-600" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 border-2 border-transparent hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 rounded-xl">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2 bg-purple-100 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-5 h-5 text-purple-600" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-600">Usuarios Activos</p>
                    <AnimatedNumber value={estadisticas.usuariosActivos} className="text-2xl font-bold text-purple-600" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        {/* Quick Actions */}
        <AnimatedSection variants={fadeInUp}>
          <div className="flex flex-wrap gap-3">
            <Link to="/registro/administrativo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 rounded-lg">
                  Nueva Solicitud Administrativa
                </Button>
              </motion.div>
            </Link>
            <Link to="/registro/historia-clinica">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500 rounded-lg">
                  Nueva Solicitud Historia Clínica
                </Button>
              </motion.div>
            </Link>
            <Link to="/control">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="shadow hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 border-2 hover:border-slate-400 rounded-lg hover:bg-slate-50">
                  Ver todas las solicitudes
                </Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>

        {/* Pending Requests Table */}
        <AnimatedSection variants={fadeInUp}>
          <Card className="p-4 md:p-6 border-2 border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <motion.h2 
                className="text-lg font-semibold text-slate-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Solicitudes Recientes Pendientes
              </motion.h2>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                  Actualizar
                </Button>
              </motion.div>
            </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 font-medium text-slate-700">
                    Solicitante
                  </th>
                  <th className="text-left py-3 px-3 font-medium text-slate-700">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-3 font-medium text-slate-700">
                    Estado
                  </th>
                  <th className="text-left py-3 px-3 font-medium text-slate-700">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-3 font-medium text-slate-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {solicitudesRecientes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No hay solicitudes. Crea una nueva desde el menú Registro.
                    </td>
                  </tr>
                ) : (
                  solicitudesRecientes.map((sol, index) => (
                    <motion.tr
                      key={sol.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(241, 245, 249, 0.8)" }}
                    >
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-900 text-sm">
                          {sol.nombreCompleto}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-slate-700 text-sm">
                        {sol.tipo}
                      </td>
                      <td className="py-3 px-3">
                        <motion.span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            sol.estado
                          )} shadow-sm`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {sol.estado}
                        </motion.span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-sm">
                        {new Date(sol.fechaSolicitud).toLocaleDateString('es-CO')}
                      </td>
                      <td className="py-3 px-3">
                        <Link to="/control/aprobacion">
                          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" className="text-xs hover:bg-blue-50 hover:border-2 hover:border-blue-300 transition-all duration-200 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </Card>
        </AnimatedSection>
      </div>
  );
}
