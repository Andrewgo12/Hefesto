import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";

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
  const { solicitudes, usuarios, actualizarEstadoSolicitud, actualizarUsuario } = useApp();
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para vista de permisos
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Estados para modales
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [pendingActionId, setPendingActionId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Convertir solicitudes del contexto al formato de la vista
  const pendingApprovals: PendingRequest[] = solicitudes
    .filter(sol => sol.estado === 'Pendiente')
    .map(sol => ({
      id: sol.id,
      name: sol.nombreCompleto,
      type: sol.tipo === 'Administrativo' ? 'Administrativo' : 'Médico',
      department: sol.cargo || sol.especialidad || 'N/A',
      requestedBy: sol.solicitadoPor,
      date: sol.fechaSolicitud,
      cedula: sol.cedula
    }));

  // Convertir usuarios del contexto al formato de la vista
  const userPermissions: UserPermission[] = usuarios.map(user => ({
    id: user.id,
    username: user.username,
    name: user.nombre,
    type: user.rol,
    department: 'N/A',
    status: user.estado,
    lastModified: user.fechaCreacion
  }));

  const filteredRequests = pendingApprovals.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.cedula.includes(searchTerm)
  );

  const handleApprove = async (id: number) => {
    setPendingActionId(id);
    setShowApproveModal(true);
  };
  
  const confirmApprove = async () => {
    if (!pendingActionId) return;
    
    console.log('✅ Confirmando aprobación de solicitud:', pendingActionId);
    setShowApproveModal(false);
    
    try {
      // Actualizar estado en el contexto global
      await actualizarEstadoSolicitud(pendingActionId, 'Aprobado', 'Solicitud aprobada desde módulo de control');
      
      toast.success('Solicitud aprobada', `El usuario recibirá sus credenciales por correo electrónico.`);
      setPendingActionId(null);
      setSelectedRequest(null);
      console.log('✅ Aprobación completada exitosamente');
    } catch (error: any) {
      console.error('❌ Error al aprobar:', error);
      toast.error('Error al aprobar la solicitud', error.message || 'Por favor, inténtelo nuevamente');
    }
  };

  const handleReject = async (id: number) => {
    setPendingActionId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };
  
  const confirmReject = async () => {
    if (!pendingActionId || !rejectReason.trim()) {
      toast.error('Motivo requerido', 'Debe ingresar un motivo para el rechazo');
      return;
    }
    
    console.log('❌ Confirmando rechazo de solicitud:', pendingActionId);
    setShowRejectModal(false);
    
    try {
      // Actualizar estado en el contexto global
      await actualizarEstadoSolicitud(pendingActionId, 'Rechazado', rejectReason);
      
      toast.success('Solicitud rechazada', 'El solicitante será notificado del rechazo.');
      setPendingActionId(null);
      setRejectReason("");
      setSelectedRequest(null);
      console.log('✅ Rechazo completado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al rechazar:', error);
      toast.error('Error al rechazar la solicitud', error.message || 'Por favor, inténtelo nuevamente');
    }
  };

  const handleSavePermissions = () => {
    if (!selectedUser || !selectedRole) {
      toast.error('Campos requeridos', 'Debe seleccionar un usuario y un rol');
      return;
    }
    
    try {
      // Actualizar usuario en el contexto global
      const userId = parseInt(selectedUser);
      actualizarUsuario(userId, { 
        rol: selectedRole 
      });
      
      // Registrar actividad
      const usuario = usuarios.find(u => u.id === userId);
      if (usuario) {
        toast.success('Permisos actualizados', `Se han actualizado los permisos de ${usuario.nombre} correctamente`);
      }
      
      // Limpiar selección
      setSelectedUser('');
      setSelectedRole('');
      setSelectedServices([]);
    } catch (error) {
      console.error('Error al guardar permisos:', error);
      toast.error('Error al actualizar permisos', 'Por favor, inténtelo nuevamente');
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
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
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
        <AnimatedSection variants={fadeInUp}>
        <div className="flex flex-col gap-2">
          <motion.h1 
            className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getTitle()}
          </motion.h1>
          <motion.p 
            className="text-xs sm:text-sm text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {view === "aprobacion" && "Revisa y aprueba solicitudes de nuevos usuarios"}
            {view === "usuarios" && "Visualiza y gestiona usuarios del sistema"}
            {view === "permisos" && "Modifica roles y permisos de usuarios existentes"}
          </motion.p>
        </div>
        </AnimatedSection>

        {/* Approval View */}
        {view === "aprobacion" && (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Pending List */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
              <Card className="p-3 sm:p-4 border-2 border-transparent hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 rounded-xl">
                <motion.h3 
                  className="font-semibold text-slate-900 mb-3 sm:mb-4 text-xs sm:text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Solicitudes Pendientes ({filteredRequests.length})
                </motion.h3>

                <Input
                  placeholder="Buscar por nombre o cédula"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4 h-8 sm:h-9 text-xs sm:text-sm"
                />

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredRequests.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">
                      No hay solicitudes que coincidan
                    </p>
                  ) : (
                    filteredRequests.map((req, idx) => (
                      <motion.button
                        key={req.id}
                        onClick={() => setSelectedRequest(req)}
                        className={`w-full text-left p-2 sm:p-3 rounded border transition-colors text-xs sm:text-sm ${
                          selectedRequest?.id === req.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="font-medium text-slate-900">
                          {req.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {req.type}
                        </p>
                      </motion.button>
                    ))
                  )}
                </div>
              </Card>
              </motion.div>
            </div>

            {/* Detail View */}
            <div className="lg:col-span-2">
              {selectedRequest ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                <Card className="p-3 sm:p-4 md:p-6 border-2 border-transparent hover:border-green-300 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300 rounded-xl">
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Aprobar
                      </Button>
                    </motion.div>
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => handleReject(selectedRequest.id)}
                        variant="destructive"
                        className="w-full shadow-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 border-2 border-red-700 hover:border-red-500 rounded-lg"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Rechazar
                      </Button>
                    </motion.div>
                  </div>
                </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 flex items-center justify-center h-64 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
                    <p className="text-slate-600 text-sm">
                      Selecciona una solicitud para ver detalles
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Users View */}
        {view === "usuarios" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 border-2 border-transparent hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
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
                  {userPermissions.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-blue-50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01 }}
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
                        <motion.span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Activo"
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 + 0.2 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {user.status}
                        </motion.span>
                      </td>
                      <td className="py-3 px-3 flex gap-2">
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm" className="text-xs hover:bg-blue-100 hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm" className="text-xs hover:bg-green-100 hover:text-green-700">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          </motion.div>
        )}

        {/* Permissions View */}
        {view === "permisos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 border-2 border-transparent hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="user-select" className="text-xs sm:text-sm font-medium text-slate-700">
                  Seleccionar Usuario
                </Label>
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                >
                  <option value="">Selecciona un usuario...</option>
                  {userPermissions.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="role-select" className="text-xs sm:text-sm font-medium text-slate-700">
                  Nuevo Rol
                </Label>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border-2 border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                >
                  <option value="">Selecciona un rol...</option>
                  <option value="admin-datos">Administrativo - Entrada de Datos</option>
                  <option value="admin-supervisor">Administrativo - Supervisor</option>
                  <option value="medico-consulta">Médico - Consulta</option>
                  <option value="medico-cirugia">Médico - Cirugía</option>
                  <option value="tecnico-sistema">Técnico - Sistema</option>
                </select>
              </motion.div>

              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label className="text-xs sm:text-sm font-medium text-slate-700 mb-3 block">
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
                  ].map((service, idx) => (
                    <motion.label
                      key={service}
                      className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer border border-transparent hover:border-blue-200 transition-all duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-xs sm:text-sm text-slate-700">{service}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="md:col-span-2 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleSavePermissions}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 rounded-lg"
                  >
                    Guardar Cambios
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Card>
          </motion.div>
        )}

        {/* Modal de Aprobación */}
        <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Aprobación</DialogTitle>
              <DialogDescription>
                ¿Está seguro de aprobar esta solicitud? El usuario recibirá sus credenciales por correo electrónico.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApproveModal(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
                Aprobar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Rechazo */}
        <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rechazar Solicitud</DialogTitle>
              <DialogDescription>
                Ingrese el motivo del rechazo. El solicitante será notificado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="motivo">Motivo del Rechazo</Label>
                <Textarea
                  id="motivo"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Ingrese el motivo..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmReject} className="bg-red-600 hover:bg-red-700">
                Rechazar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
