import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Eye, Download, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

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
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Panel de Control
          </h1>
          <p className="text-sm text-slate-600">
            Resumen de solicitudes y actividad del sistema
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Total Solicitudes</p>
                <p className="text-2xl font-bold text-slate-900">{estadisticas.totalSolicitudes}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Pendientes</p>
                <p className="text-2xl font-bold text-amber-600">{estadisticas.pendientes}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Aprobadas</p>
                <p className="text-2xl font-bold text-green-600">{estadisticas.aprobadas}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Usuarios Activos</p>
                <p className="text-2xl font-bold text-purple-600">{estadisticas.usuariosActivos}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/registro/administrativo">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Nueva Solicitud Administrativa
            </Button>
          </Link>
          <Link to="/registro/historia-clinica">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Nueva Solicitud Historia Clínica
            </Button>
          </Link>
          <Link to="/control">
            <Button variant="outline">
              Ver todas las solicitudes
            </Button>
          </Link>
        </div>

        {/* Pending Requests Table */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Solicitudes Recientes Pendientes
            </h2>
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
              Actualizar
            </Button>
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
                  solicitudesRecientes.map((sol) => (
                    <tr
                      key={sol.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
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
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            sol.estado
                          )}`}
                        >
                          {sol.estado}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-sm">
                        {new Date(sol.fechaSolicitud).toLocaleDateString('es-CO')}
                      </td>
                      <td className="py-3 px-3">
                        <Link to="/control/aprobacion">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
  );
}
