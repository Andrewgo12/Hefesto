import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface Request {
  id: number;
  name: string;
  type: "Administrativo" | "Médico";
  status: "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";
  date: string;
  requestedBy: string;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  type: "warning" | "info" | "success";
  timestamp: string;
}

export default function Index() {
  const pendingRequests: Request[] = [
    {
      id: 1,
      name: "Juan Pérez García",
      type: "Médico",
      status: "Pendiente",
      date: "2024-01-15",
      requestedBy: "Jefe de Departamento",
    },
    {
      id: 2,
      name: "María González López",
      type: "Administrativo",
      status: "En revisión",
      date: "2024-01-14",
      requestedBy: "Recursos Humanos",
    },
    {
      id: 3,
      name: "Carlos Rodríguez Martín",
      type: "Médico",
      status: "En revisión",
      date: "2024-01-13",
      requestedBy: "Director Médico",
    },
  ];

  const alerts: Alert[] = [
    {
      id: "1",
      title: "Solicitud médica pendiente de aprobación",
      description: "Dr. Juan Pérez - Acceso a historia clínica",
      type: "warning",
      timestamp: "Hace 2 horas",
    },
    {
      id: "2",
      title: "Nuevo usuario registrado",
      description: "Ana Fernández - Usuario administrativo",
      type: "info",
      timestamp: "Hace 4 horas",
    },
    {
      id: "3",
      title: "Cambio de permisos completado",
      description: "Luis García - Asignación actualizada",
      type: "success",
      timestamp: "Hace 6 horas",
    },
  ];

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

  return (
    <Layout>
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

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/registro">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Nueva Solicitud
            </Button>
          </Link>
          <Link to="/control">
            <Button variant="outline">
              Ver todas las solicitudes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Requests Section */}
          <div className="lg:col-span-2">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Solicitudes Pendientes
                </h2>
                <Link to="/control">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver todas
                  </Button>
                </Link>
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
                    {pendingRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">
                              {req.name}
                            </p>
                            <p className="text-xs text-slate-600">
                              {req.requestedBy}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 text-sm">
                          {req.type}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              req.status
                            )}`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-sm">
                          {req.date}
                        </td>
                        <td className="py-3 px-3">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Alerts Section */}
          <div>
            <Card className="p-4 md:p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Alertas
              </h2>

              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {alert.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {alert.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Actividad Reciente
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-4 pb-3 border-b border-slate-200">
              <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  Usuario administrativo aprobado: Ana Fernández
                </p>
                <p className="text-xs text-slate-600">01/15/2024 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pb-3 border-b border-slate-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  Nueva solicitud de usuario médico: Dr. Juan Pérez
                </p>
                <p className="text-xs text-slate-600">01/15/2024 09:15 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  Cambio de permisos: Laura Martínez
                </p>
                <p className="text-xs text-slate-600">01/14/2024 04:45 PM</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
