import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Eye, Download, Users, FileText, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedCard, StaggerContainer, StaggerItem, AnimatedNumber } from "@/components/AnimatedSection";
import { fadeInUp, fadeInDown, staggerContainer, staggerItem } from "@/lib/animations";
import { useApp } from "@/contexts/AppContext";
import { useMemo } from "react";

interface Estadisticas {
  total: number;
  pendientes: number;
  en_revision: number;
  aprobadas: number;
  rechazadas: number;
}

export default function Index() {
  const { solicitudes: todasSolicitudes, recargarDatos } = useApp();

  // Calcular estadísticas desde AppContext
  const estadisticas = useMemo(() => {
    console.log('📊 Calculando estadísticas con', todasSolicitudes.length, 'solicitudes');
    const pendientes = todasSolicitudes.filter(s =>
      s.estado === 'Pendiente'
    ).length;
    const enRevision = todasSolicitudes.filter(s =>
      s.estado === 'En revisión'
    ).length;
    const aprobadas = todasSolicitudes.filter(s => s.estado === 'Aprobado').length;
    const rechazadas = todasSolicitudes.filter(s => s.estado === 'Rechazado').length;

    console.log('📈 Pendientes:', pendientes, 'En revisión:', enRevision, 'Aprobadas:', aprobadas, 'Rechazadas:', rechazadas);

    return {
      total: todasSolicitudes.length,
      pendientes,
      en_revision: enRevision,
      aprobadas,
      rechazadas,
    };
  }, [todasSolicitudes]);

  console.log('📈 Estadísticas:', estadisticas);

  const solicitudes = todasSolicitudes;
  const loading = false;

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
    <div className="relative p-4 md:p-6 space-y-6 max-w-7xl mx-auto overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 -z-10 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <AnimatedSection variants={fadeInDown}>
        <div className="flex flex-col gap-2">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ['0% center', '100% center', '0% center']
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
            }}
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
            <Card className="p-4 border-2 border-transparent hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/50 hover:to-blue-100/50 group">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-sm group-hover:shadow-md"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                </motion.div>
                <div>
                  <p className="text-xs text-slate-600">Total Solicitudes</p>
                  <AnimatedNumber value={estadisticas.total} className="text-2xl font-bold text-slate-900" />
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
            <Card className="p-4 border-2 border-transparent hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-200/50 transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-amber-50/30 hover:from-amber-50/50 hover:to-amber-100/50 group">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-sm group-hover:shadow-md"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Clock className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
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
            <Card className="p-4 border-2 border-transparent hover:border-green-400 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-green-100/50 group">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-sm group-hover:shadow-md"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 group-hover:text-green-700" />
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
            <Card className="p-4 border-2 border-transparent hover:border-red-400 hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-red-50/30 hover:from-red-50/50 hover:to-red-100/50 group">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-sm group-hover:shadow-md"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 group-hover:text-red-700" />
                </motion.div>
                <div>
                  <p className="text-xs text-slate-600">Rechazadas</p>
                  <AnimatedNumber value={estadisticas.rechazadas} className="text-2xl font-bold text-red-600" />
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
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 rounded-lg group">
                <span className="group-hover:translate-x-1 transition-transform duration-300">Nueva Solicitud Administrativa</span>
              </Button>
            </motion.div>
          </Link>
          <Link to="/registro/historia-clinica">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500 rounded-lg group">
                <span className="group-hover:translate-x-1 transition-transform duration-300">Nueva Solicitud Historia Clínica</span>
              </Button>
            </motion.div>
          </Link>
          <Link to="/control/aprobacion">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button variant="outline" className="shadow hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 border-2 hover:border-slate-400 rounded-lg hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 group">
                <span className="group-hover:translate-x-1 transition-transform duration-300">Ver todas las solicitudes</span>
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
              <Button variant="ghost" size="sm" onClick={() => recargarDatos()}>
                <RefreshCw className="w-4 h-4 mr-2" />
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
