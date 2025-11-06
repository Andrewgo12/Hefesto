import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Activity, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

interface ActivityLog {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  module: string;
}

export default function Perfil() {
  const { view = "personal" } = useParams<{ view: string }>();
  const { actividades } = useApp();
  
  // Obtener datos del usuario logueado
  const userStr = localStorage.getItem('user');
  const loggedUser = userStr ? JSON.parse(userStr) : null;
  
  // Datos editables del usuario
  const [userData, setUserData] = useState({
    nombre: loggedUser?.name || localStorage.getItem('user_name') || "Usuario",
    email: loggedUser?.email || localStorage.getItem('user_email') || "usuario@hefesto.com",
    telefono: loggedUser?.telefono || "3001234567",
    cargo: loggedUser?.rol || "Usuario",
    departamento: loggedUser?.departamento || "General",
  });

  // Cargar datos actualizados del usuario desde la API
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const { auth } = await import('@/lib/api');
        const response = await auth.me();
        if (response.data?.user) {
          const user = response.data.user;
          setUserData({
            nombre: user.name || userData.nombre,
            email: user.email || userData.email,
            telefono: user.telefono || userData.telefono,
            cargo: user.rol || userData.cargo,
            departamento: user.departamento || userData.departamento,
          });
        }
      } catch (error) {
        console.log('Error al cargar datos del usuario:', error);
        // Mantener datos de localStorage si falla
      }
    };

    cargarDatosUsuario();
  }, []);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Preferencias de notificaciones (editables)
  const [notifications, setNotifications] = useState({
    solicitudesNuevas: true,
    aprobaciones: true,
    rechazos: false,
    cambiosConfiguracion: true,
    reportesDiarios: false,
    alertasSeguridad: true
  });
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Handlers para edición de datos personales
  const handleUserDataChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSaveUserData = () => {
    setIsEditing(false);
    toast.success('Datos actualizados', 'Su información personal ha sido actualizada correctamente');
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restaurar datos originales si se cancela
    setUserData({
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@hefesto.com",
      telefono: "3001234567",
      cargo: "Técnico / Administrador",
      departamento: "Tecnología"
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword) {
      toast.error("Contraseña actual requerida", "Debe ingresar su contraseña actual");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Contraseña muy corta", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden", "Por favor, verifique que ambas contraseñas sean idénticas");
      return;
    }
    
    toast.success("Contraseña actualizada", "Su contraseña ha sido cambiada exitosamente");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  
  // Handler para notificaciones
  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
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
      <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
        <AnimatedSection variants={fadeInUp}>
          <div className="flex flex-col gap-2">
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-slate-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getTitle()}
            </motion.h1>
            <motion.p 
              className="text-sm text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {view === "personal" && "Visualiza y actualiza tu información personal"}
              {view === "actividad" && "Historial completo de tus movimientos en el sistema"}
              {view === "seguridad" && "Gestiona tu contraseña y preferencias de seguridad"}
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <AnimatedSection variants={fadeInLeft}>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4 md:p-6 border-2 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  AU
                </motion.div>

              <h3 className="text-lg font-semibold text-slate-900">
                {userData.nombre}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {userData.cargo}
              </p>

              <div className="w-full mt-6 pt-6 border-t border-slate-200 space-y-3 text-left">
                <div>
                  <p className="text-xs text-slate-600 font-medium">
                    Área de Trabajo
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {userData.departamento}
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
                    Correo Electrónico
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {userData.email}
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
          </motion.div>
        </AnimatedSection>

          {/* Content Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Personal Information - DISEÑO 1: Card con Avatar y Grid */}
            {view === "personal" && (
              <div className="space-y-6">
                {/* Header Card con Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 border-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 rounded-xl">
                    <div className="p-6 flex items-center gap-6">
                      <motion.div 
                        className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {userData.nombre.charAt(0).toUpperCase()}
                      </motion.div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900">{userData.nombre}</h2>
                      <p className="text-slate-600 mt-1">{userData.cargo}</p>
                      <p className="text-sm text-slate-500 mt-1">{userData.email}</p>
                    </div>
                      <AnimatePresence mode="wait">
                        {!isEditing ? (
                          <motion.div
                            key="edit-button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              onClick={() => setIsEditing(true)}
                              className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500"
                            >
                              <User className="w-4 h-4 mr-2" />
                              Editar Perfil
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="save-buttons"
                            className="flex gap-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="border-2 hover:border-slate-400 hover:shadow-lg transition-all duration-300"
                              >
                                Cancelar
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                onClick={handleSaveUserData}
                                className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>

                {/* Información en Cards Individuales */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Nombre Completo
                    </Label>
                    <Input
                      value={userData.nombre}
                      onChange={(e) => handleUserDataChange('nombre', e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-2 border-0 px-0 text-lg font-medium ${!isEditing ? 'bg-transparent' : 'bg-white border'}`}
                    />
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Correo Electrónico
                    </Label>
                    <Input
                      value={userData.email}
                      onChange={(e) => handleUserDataChange('email', e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-2 border-0 px-0 text-lg font-medium ${!isEditing ? 'bg-transparent' : 'bg-white border'}`}
                    />
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Teléfono
                    </Label>
                    <Input
                      value={userData.telefono}
                      onChange={(e) => handleUserDataChange('telefono', e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-2 border-0 px-0 text-lg font-medium ${!isEditing ? 'bg-transparent' : 'bg-white border'}`}
                    />
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Cargo
                    </Label>
                    <Input
                      value={userData.cargo}
                      onChange={(e) => handleUserDataChange('cargo', e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-2 border-0 px-0 text-lg font-medium ${!isEditing ? 'bg-transparent' : 'bg-white border'}`}
                    />
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow md:col-span-2">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Departamento
                    </Label>
                    <Input
                      value={userData.departamento}
                      onChange={(e) => handleUserDataChange('departamento', e.target.value)}
                      readOnly={!isEditing}
                      className={`mt-2 border-0 px-0 text-lg font-medium ${!isEditing ? 'bg-transparent' : 'bg-white border'}`}
                    />
                  </Card>
                </StaggerContainer>
              </div>
            )}

            {/* Activity Log - DISEÑO 2: Timeline Vertical */}
            {view === "actividad" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">Registro de Actividad</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Activity className="w-4 h-4" />
                    <span>{actividades.length} actividades</span>
                  </div>
                </div>

                {actividades.length === 0 ? (
                  <Card className="p-12">
                    <div className="text-center text-slate-500">
                      <Activity className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium">No hay actividades registradas</p>
                      <p className="text-sm mt-2">Las acciones que realices aparecer\u00e1n aqu\u00ed</p>
                    </div>
                  </Card>
                ) : (
                  <div className="relative">
                    {/* L\u00ednea vertical del timeline */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                    
                    <div className="space-y-6">
                      {actividades.slice().reverse().map((log, index) => (
                        <div key={log.id} className="relative flex gap-6">
                          {/* Punto del timeline */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                              <Activity className="w-8 h-8 text-white" />
                            </div>
                          </div>

                          {/* Contenido */}
                          <Card className="flex-1 p-5 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-lg text-slate-900">{log.accion}</h4>
                                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                  {log.modulo}
                                </span>
                              </div>
                              <span className="text-xs text-slate-500 font-medium">{log.timestamp}</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{log.descripcion}</p>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Security - DISEÑO 3: Dashboard en 2 Columnas */}
            {view === "seguridad" && (
              <div className="space-y-6">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  Configuración de Seguridad
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Columna 1: Cambiar Contraseña */}
                  <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">Cambiar Contraseña</h4>
                        <p className="text-sm text-slate-600">Actualiza tu contraseña periódicamente</p>
                      </div>
                    </div>

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

                    <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Actualizar Contraseña
                    </Button>
                  </form>
                  </Card>

                  {/* Columna 2: Notificaciones */}
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">Notificaciones</h4>
                        <p className="text-sm text-slate-600">Gestiona tus preferencias</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                    {[
                      { key: 'solicitudesNuevas', label: "Solicitudes nuevas" },
                      { key: 'aprobaciones', label: "Aprobaciones de solicitudes" },
                      { key: 'rechazos', label: "Rechazos de solicitudes" },
                      { key: 'cambiosConfiguracion', label: "Cambios en configuración" },
                      { key: 'reportesDiarios', label: "Reportes diarios" },
                      { key: 'alertasSeguridad', label: "Alertas de seguridad" },
                    ].map((notif) => (
                      <label
                        key={notif.key}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={notifications[notif.key as keyof typeof notifications]}
                          onChange={() => handleNotificationChange(notif.key)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-slate-700">
                          {notif.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setShowPreferencesModal(true)}
                    className="bg-green-600 hover:bg-green-700 w-full mt-6"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Modal de Actualización de Datos */}
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Actualización de Datos</DialogTitle>
              <DialogDescription>
                Su solicitud será enviada al administrador para revisión y actualización de sus datos personales.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  setShowUpdateModal(false);
                  toast.success('Solicitud enviada', 'Su solicitud ha sido enviada al administrador');
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Enviar Solicitud
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Guardar Preferencias */}
        <Dialog open={showPreferencesModal} onOpenChange={setShowPreferencesModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Guardar Preferencias</DialogTitle>
              <DialogDescription>
                ¿Desea guardar las preferencias de notificación seleccionadas?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreferencesModal(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  setShowPreferencesModal(false);
                  toast.success('Preferencias guardadas', 'Sus preferencias han sido actualizadas correctamente');
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
