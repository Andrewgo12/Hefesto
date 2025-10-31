import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface ActivityLog {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  module: string;
}

export default function Perfil() {
  const { view = "personal" } = useParams<{ view: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const activityLog: ActivityLog[] = [
    {
      id: 1,
      action: "Acceso",
      description: "Ingreso al sistema",
      timestamp: "01/15/2024 09:30 AM",
      module: "Autenticación",
    },
    {
      id: 2,
      action: "Aprobación",
      description: "Aprobó solicitud de usuario: Juan Pérez García",
      timestamp: "01/15/2024 10:15 AM",
      module: "Control",
    },
    {
      id: 3,
      action: "Visualización",
      description: "Consultó reportes del sistema",
      timestamp: "01/15/2024 11:00 AM",
      module: "Reportes",
    },
    {
      id: 4,
      action: "Modificación",
      description: "Cambió configuración de rol: Médico Consulta",
      timestamp: "01/14/2024 03:45 PM",
      module: "Configuración",
    },
    {
      id: 5,
      action: "Registro",
      description: "Creó nueva solicitud de usuario administrativo",
      timestamp: "01/14/2024 02:20 PM",
      module: "Registro",
    },
    {
      id: 6,
      action: "Descarga",
      description: "Descargó reporte de solicitudes pendientes",
      timestamp: "01/13/2024 04:10 PM",
      module: "Reportes",
    },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Contraseña actualizada correctamente");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const getTitle = () => {
    switch (view) {
      case "personal":
        return "Información Personal";
      case "actividad":
        return "Registro de Actividad";
      case "seguridad":
        return "Configuración de Seguridad";
      default:
        return "Mi Perfil";
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
            {view === "personal" && "Visualiza y actualiza tu información personal"}
            {view === "actividad" && "Historial completo de tus movimientos en el sistema"}
            {view === "seguridad" && "Gestiona tu contraseña y preferencias de seguridad"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <Card className="p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                AU
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Admin User
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Administrador del Sistema
              </p>

              <div className="w-full mt-6 pt-6 border-t border-slate-200 space-y-3 text-left">
                <div>
                  <p className="text-xs text-slate-600 font-medium">
                    Área de Trabajo
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    Dirección de TI
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 font-medium">
                    Estado de Cuenta
                  </p>
                  <p className="text-sm font-medium text-green-600 mt-1">
                    Activa
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 font-medium">
                    Miembro desde
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    01/01/2024
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600 font-medium">
                    Último acceso
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    01/15/2024 09:30 AM
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Personal Information */}
            {view === "personal" && (
              <Card className="p-4 md:p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Nombre Completo
                      </Label>
                      <Input
                        value="Admin User"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Cédula de Identidad
                      </Label>
                      <Input
                        value="1234567890"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Correo Institucional
                      </Label>
                      <Input
                        value="admin@hospital.local"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Teléfono
                      </Label>
                      <Input
                        value="+1 (555) 123-4567"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Cargo
                      </Label>
                      <Input
                        value="Administrador del Sistema"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Tipo de Rol
                      </Label>
                      <Input
                        value="Técnico / Administrador"
                        readOnly
                        className="mt-2 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <Button variant="outline">
                      Solicitar Actualización de Datos
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Activity Log */}
            {view === "actividad" && (
              <Card className="p-4 md:p-6">
                <div className="space-y-3">
                  {activityLog.map((log) => (
                    <div
                      key={log.id}
                      className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full mt-2" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900 text-sm">
                            {log.action}
                          </p>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded font-medium">
                            {log.module}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 mt-1">
                          {log.description}
                        </p>

                        <p className="text-xs text-slate-500 mt-2">
                          {log.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Security */}
            {view === "seguridad" && (
              <Card className="p-4 md:p-6">
                {/* Change Password */}
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Cambiar Contraseña
                  </h4>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-sm font-medium text-slate-700">
                        Contraseña Actual
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
                        Nueva Contraseña
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                        Confirmar Contraseña
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="w-4 h-4 rounded"
                      />
                      <label
                        htmlFor="showPassword"
                        className="text-sm text-slate-700 cursor-pointer"
                      >
                        Mostrar contraseñas
                      </label>
                    </div>

                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Actualizar Contraseña
                    </Button>
                  </form>
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Notificaciones de Seguridad
                  </h4>

                  <div className="space-y-3">
                    {[
                      {
                        label: "Alertas de acceso desde nuevas ubicaciones",
                        checked: true,
                      },
                      {
                        label: "Cambios en permisos y roles",
                        checked: true,
                      },
                      {
                        label: "Intentos de acceso fallidos",
                        checked: true,
                      },
                      {
                        label: "Modificaciones administrativas",
                        checked: false,
                      },
                    ].map((notif, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={notif.checked}
                          readOnly
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-slate-700">
                          {notif.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button variant="outline">
                      Guardar Preferencias
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
