import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Role {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
}

interface Parameter {
  name: string;
  value: string;
  description: string;
}

export default function Configuracion() {
  const { view = "roles" } = useParams<{ view: string }>();
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Administrativo - Entrada de Datos",
      description: "Usuario administrativo básico con acceso limitado",
      usersCount: 15,
      permissions: [
        "Crear solicitudes",
        "Ver reportes",
        "Editar datos propios",
      ],
    },
    {
      id: 2,
      name: "Administrativo - Supervisor",
      description: "Supervisor de área con permisos de aprobación",
      usersCount: 8,
      permissions: [
        "Crear solicitudes",
        "Aprobar solicitudes",
        "Ver reportes",
        "Gestionar equipo",
      ],
    },
    {
      id: 3,
      name: "Médico - Consulta",
      description: "Médico general con acceso a historia clínica",
      usersCount: 22,
      permissions: [
        "Ver historia clínica",
        "Crear registros",
        "Ver laboratorio",
        "Ver imagenología",
      ],
    },
    {
      id: 4,
      name: "Técnico del Sistema",
      description: "Administrador con acceso total",
      usersCount: 2,
      permissions: ["Acceso total", "Gestionar usuarios", "Gestionar roles"],
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const systemParameters: Parameter[] = [
    {
      name: "Política de Contraseña",
      value: "Mínimo 8 caracteres, mayúscula y número",
      description: "Requisitos mínimos para contraseñas de usuario",
    },
    {
      name: "Tiempo de Sesión",
      value: "30 minutos",
      description: "Tiempo máximo de inactividad antes de cierre de sesión",
    },
    {
      name: "Expiración de Credenciales",
      value: "90 días",
      description: "Días hasta que las credenciales vencen",
    },
    {
      name: "Intento de Acceso",
      value: "5 intentos",
      description: "Número máximo de intentos fallidos permitidos",
    },
    {
      name: "Auditoría de Cambios",
      value: "Activada",
      description: "Registro de todos los cambios en el sistema",
    },
  ];

  const getTitle = () => {
    switch (view) {
      case "roles":
        return "Gestión de Roles y Permisos";
      case "credenciales":
        return "Administración de Credenciales";
      case "parametros":
        return "Parámetros del Sistema";
      default:
        return "Módulo de Configuración";
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
            {view === "roles" && "Define y gestiona roles y permisos del sistema"}
            {view === "credenciales" && "Controla la creación y recuperación de credenciales"}
            {view === "parametros" && "Configura parámetros de seguridad y funcionamiento"}
          </p>
        </div>

        {/* Roles Management */}
        {view === "roles" && (
          <>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Rol
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Roles List */}
              <div>
                <Card className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-4 text-sm">
                    Roles Disponibles
                  </h3>

                  <div className="space-y-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left p-3 rounded border transition-colors ${
                          selectedRole?.id === role.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <p className="font-medium text-slate-900 text-sm">
                          {role.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {role.usersCount} usuarios
                        </p>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Role Details */}
              <div>
                {selectedRole ? (
                  <Card className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {selectedRole.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {selectedRole.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <h4 className="text-sm font-medium text-slate-900 mb-3">
                        Permisos Asignados
                      </h4>
                      <div className="space-y-2">
                        {selectedRole.permissions.map((perm, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 bg-slate-50 rounded"
                          >
                            <input
                              type="checkbox"
                              checked
                              readOnly
                              className="w-4 h-4"
                            />
                            <span className="text-sm text-slate-700">
                              {perm}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs text-slate-600 mb-3">
                        Usuarios con este rol: <strong>{selectedRole.usersCount}</strong>
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Guardar Cambios
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 flex items-center justify-center h-64 bg-slate-50">
                    <p className="text-slate-600">
                      Selecciona un rol para ver detalles
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}

        {/* Credentials Management */}
        {view === "credenciales" && (
          <Card className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Recuperación de Contraseña
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Permite que usuarios cambien su contraseña de forma segura
                </p>
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Autenticación de Dos Pasos
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Aumenta la seguridad requiriendo verificación adicional
                </p>
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Expiración de Sesiones
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Configura el tiempo máximo de sesión activa
                </p>
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Bloqueo de Usuarios
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Bloquea o desbloquea usuarios del sistema
                </p>
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* System Parameters */}
        {view === "parametros" && (
          <div className="space-y-6">
            <Card className="p-4 md:p-6">
              <h3 className="font-semibold text-slate-900 mb-6">
                Parámetros del Sistema
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-3 font-medium text-slate-700">
                        Parámetro
                      </th>
                      <th className="text-left py-3 px-3 font-medium text-slate-700">
                        Valor Actual
                      </th>
                      <th className="text-left py-3 px-3 font-medium text-slate-700">
                        Descripción
                      </th>
                      <th className="text-left py-3 px-3 font-medium text-slate-700">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemParameters.map((param, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-3 font-medium text-slate-900">
                          {param.name}
                        </td>
                        <td className="py-3 px-3">
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                            {param.value}
                          </code>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-xs">
                          {param.description}
                        </td>
                        <td className="py-3 px-3">
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="font-semibold text-slate-900 mb-4">
                Respaldos y Mantenimiento
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      Último Respaldo
                    </p>
                    <p className="text-xs text-slate-600">
                      01/15/2024 - 02:30 AM
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Realizar Respaldo Ahora
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Programar Respaldo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
