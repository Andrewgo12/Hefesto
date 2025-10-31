import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface PendingRequest {
  id: number;
  name: string;
  type: "Administrativo" | "Médico";
  department: string;
  requestedBy: string;
  date: string;
  cedula: string;
}

interface UserPermission {
  id: number;
  username: string;
  name: string;
  type: string;
  department: string;
  status: string;
  lastModified: string;
}

export default function Control() {
  const { view = "aprobacion" } = useParams<{ view: string }>();
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pendingApprovals: PendingRequest[] = [
    {
      id: 1,
      name: "Juan Pérez García",
      type: "Médico",
      department: "Cardiología",
      requestedBy: "Dr. Carlos López",
      date: "2024-01-15",
      cedula: "1234567890",
    },
    {
      id: 2,
      name: "María González López",
      type: "Administrativo",
      department: "Recursos Humanos",
      requestedBy: "Jefe de RH",
      date: "2024-01-14",
      cedula: "0987654321",
    },
    {
      id: 3,
      name: "Carlos Martín Ruiz",
      type: "Médico",
      department: "Urgencias",
      requestedBy: "Director Médico",
      date: "2024-01-13",
      cedula: "1122334455",
    },
  ];

  const userPermissions: UserPermission[] = [
    {
      id: 1,
      username: "jgarcia",
      name: "Juan García",
      type: "Administrativo",
      department: "Facturación",
      status: "Activo",
      lastModified: "2024-01-10",
    },
    {
      id: 2,
      username: "drodriguez",
      name: "Dr. Diego Rodríguez",
      type: "Médico",
      department: "Cirugía",
      status: "Activo",
      lastModified: "2024-01-12",
    },
    {
      id: 3,
      username: "alopez",
      name: "Ana López",
      type: "Administrativo",
      department: "Admisiones",
      status: "Activo",
      lastModified: "2024-01-08",
    },
    {
      id: 4,
      username: "jmartinez",
      name: "Dr. Juan Martínez",
      type: "Médico",
      department: "Pediatría",
      status: "Inactivo",
      lastModified: "2024-01-01",
    },
  ];

  const filteredRequests = pendingApprovals.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.cedula.includes(searchTerm)
  );

  const handleApprove = (id: number) => {
    alert(`Solicitud ${id} aprobada. El usuario recibirá sus credenciales.`);
  };

  const handleReject = (id: number) => {
    alert(
      `Solicitud ${id} rechazada. El solicitante será notificado de los motivos.`
    );
  };

  const getTitle = () => {
    switch (view) {
      case "aprobacion":
        return "Aprobación de Solicitudes";
      case "usuarios":
        return "Gestión de Usuarios";
      case "permisos":
        return "Cambio de Permisos y Roles";
      default:
        return "Módulo de Control";
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            {getTitle()}
          </h1>
          <p className="text-sm text-slate-600">
            {view === "aprobacion" && "Revisa y aprueba solicitudes de nuevos usuarios"}
            {view === "usuarios" && "Visualiza y gestiona usuarios del sistema"}
            {view === "permisos" && "Modifica roles y permisos de usuarios existentes"}
          </p>
        </div>

        {/* Approval View */}
        {view === "aprobacion" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending List */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h3 className="font-semibold text-slate-900 mb-4 text-sm">
                  Solicitudes Pendientes ({filteredRequests.length})
                </h3>

                <Input
                  placeholder="Buscar por nombre o cédula"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredRequests.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">
                      No hay solicitudes que coincidan
                    </p>
                  ) : (
                    filteredRequests.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => setSelectedRequest(req)}
                        className={`w-full text-left p-3 rounded border transition-colors text-sm ${
                          selectedRequest?.id === req.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <p className="font-medium text-slate-900">
                          {req.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {req.type}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Detail View */}
            <div className="lg:col-span-2">
              {selectedRequest ? (
                <Card className="p-4 md:p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Detalles de la Solicitud
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Nombre Completo
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Cédula de Identidad
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.cedula}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Tipo de Usuario
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.type}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Departamento
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.department}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Solicitado Por
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.requestedBy}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          Fecha de Solicitud
                        </p>
                        <p className="text-sm text-slate-900 mt-1">
                          {selectedRequest.date}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-600 font-medium mb-2">
                        Observaciones
                      </p>
                      <p className="text-sm text-slate-700">
                        Solicitud completamente documentada. Cumple con todos
                        los requisitos de validación y aprobación.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprobar
                    </Button>
                    <Button
                      onClick={() => handleReject(selectedRequest.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 flex items-center justify-center h-64 bg-slate-50">
                  <p className="text-slate-600">
                    Selecciona una solicitud para ver detalles
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Users View */}
        {view === "usuarios" && (
          <Card className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Usuario
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Departamento
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Estado
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userPermissions.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono text-xs text-slate-600">
                        {user.username}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900 text-sm">
                        {user.name}
                      </td>
                      <td className="py-3 px-3 text-slate-700 text-sm">
                        {user.type}
                      </td>
                      <td className="py-3 px-3 text-slate-700 text-sm">
                        {user.department}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            user.status === "Activo"
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Permissions View */}
        {view === "permisos" && (
          <Card className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="user-select" className="text-sm font-medium text-slate-700">
                  Seleccionar Usuario
                </Label>
                <select
                  id="user-select"
                  className="mt-2 w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Selecciona un usuario...</option>
                  {userPermissions.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="role-select" className="text-sm font-medium text-slate-700">
                  Nuevo Rol
                </Label>
                <select
                  id="role-select"
                  className="mt-2 w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Selecciona un rol...</option>
                  <option>Administrativo - Entrada de Datos</option>
                  <option>Administrativo - Supervisor</option>
                  <option>Médico - Consulta</option>
                  <option>Médico - Cirugía</option>
                  <option>Técnico - Sistema</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-slate-700 mb-3 block">
                  Servicios y Accesos
                </Label>
                <div className="space-y-2">
                  {[
                    "Historia Clínica Electrónica",
                    "Laboratorio",
                    "Imagenología",
                    "Farmacia",
                    "Facturación",
                    "Reportes",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-slate-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
