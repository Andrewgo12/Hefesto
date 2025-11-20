import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Key, Database, HardDrive, Trash2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/lib/toast";
import { roles as rolesApi, parametros as parametrosApi } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, Navigate } from "react-router-dom";
import { useRoles } from "@/hooks/useRoles";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp } from "@/lib/animations";

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
  const { isAdmin } = useRoles();
  const { view = "roles" } = useParams<{ view: string }>();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Estados para modales
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showEditParamModal, setShowEditParamModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Estados para inputs
  const [newRoleName, setNewRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [credentialType, setCredentialType] = useState("");
  const [credentialValue, setCredentialValue] = useState("");
  const [paramToEdit, setParamToEdit] = useState<Parameter | null>(null);
  const [paramNewValue, setParamNewValue] = useState("");

  const [roles, setRoles] = useState<Role[]>([]);
  const [cargandoRoles, setCargandoRoles] = useState(true);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [cargandoParametros, setCargandoParametros] = useState(true);

  // Cargar datos desde la API
  useEffect(() => {
    cargarRoles();
    cargarParametros();
  }, []);

  const cargarRoles = async () => {
    try {
      setCargandoRoles(true);
      const response = await rolesApi.getAll();
      const rolesBackend = (response.data?.data || []).map((rol: any) => ({
        id: rol.id,
        name: rol.name || rol.nombre,
        description: rol.description || rol.descripcion || 'Sin descripción',
        usersCount: rol.users_count || 0,
        permissions: rol.permissions || rol.permisos || []
      }));

      if (rolesBackend.length > 0) {
        setRoles(rolesBackend);
      } else {
        // Roles por defecto si no hay en BD
        setRoles([
          {
            id: 1,
            name: "Usuario",
            description: "Usuario normal del sistema con permisos básicos",
            usersCount: 0,
            permissions: ["Crear solicitudes", "Ver propias solicitudes"],
          },
          {
            id: 2,
            name: "Administrador",
            description: "Administrador con acceso total al sistema",
            usersCount: 0,
            permissions: ["Acceso total", "Gestionar usuarios", "Gestionar roles"],
          },
        ]);
      }
    } catch (error) {
      console.error('Error al cargar roles:', error);
      // Roles por defecto en caso de error
      setRoles([
        {
          id: 1,
          name: "Administrativo - Entrada de Datos",
          description: "Usuario administrativo básico",
          usersCount: 0,
          permissions: ["Crear solicitudes"],
        },
      ]);
    } finally {
      setCargandoRoles(false);
    }
  };

  const cargarParametros = async () => {
    try {
      setCargandoParametros(true);
      const response = await parametrosApi.getAll();
      const parametrosBackend = (response.data?.data || []).map((param: any) => ({
        name: param.name || param.nombre || param.key,
        value: param.value || param.valor,
        description: param.description || param.descripcion || 'Sin descripción'
      }));

      if (parametrosBackend.length > 0) {
        setParameters(parametrosBackend);
      } else {
        // Parámetros por defecto
        setParameters([
          {
            name: "Política de Contraseña",
            value: "Mínimo 8 caracteres",
            description: "Requisitos mínimos para contraseñas",
          },
          {
            name: "Tiempo de Sesión",
            value: "30 minutos",
            description: "Tiempo máximo de inactividad",
          },
        ]);
      }
    } catch (error) {
      console.error('Error al cargar parámetros:', error);
      // Parámetros por defecto
      setParameters([
        {
          name: "Tiempo de Sesión",
          value: "30 minutos",
          description: "Tiempo máximo de inactividad",
        },
      ]);
    } finally {
      setCargandoParametros(false);
    }
  };

  // Handlers para roles
  const handleNuevoRol = () => {
    setNewRoleName("");
    setShowNewRoleModal(true);
  };

  const confirmNewRole = () => {
    if (!newRoleName.trim()) {
      toast.error('Nombre requerido', 'Debe ingresar un nombre para el rol');
      return;
    }

    const nuevoRol: Role = {
      id: Date.now(),
      name: newRoleName,
      description: 'Nuevo rol creado',
      usersCount: 0,
      permissions: []
    };

    setRoles(prev => [...prev, nuevoRol]);
    setShowNewRoleModal(false);
    toast.success('Rol creado', `El rol "${newRoleName}" ha sido creado exitosamente`);
  };

  const handleEditarRol = (role: Role) => {
    setRoleToEdit(role);
    setEditRoleName(role.name);
    setShowEditRoleModal(true);
  };

  const confirmEditRole = () => {
    if (!editRoleName.trim() || !roleToEdit) {
      toast.error('Nombre requerido', 'Debe ingresar un nombre para el rol');
      return;
    }

    setRoles(prev => prev.map(r =>
      r.id === roleToEdit.id ? { ...r, name: editRoleName } : r
    ));
    setShowEditRoleModal(false);
    toast.success('Rol actualizado', 'El rol ha sido actualizado correctamente');
  };

  const handleEliminarRol = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteRoleModal(true);
  };

  const confirmDeleteRole = () => {
    if (!roleToDelete) return;

    setRoles(prev => prev.filter(r => r.id !== roleToDelete.id));
    setSelectedRole(null);
    setShowDeleteRoleModal(false);
    toast.success('Rol eliminado', 'El rol ha sido eliminado correctamente');
  };

  const handleGuardarCambiosRol = () => {
    if (!selectedRole) return;
    toast.success('Cambios guardados', 'Los cambios del rol han sido guardados correctamente');
  };

  // Handlers para credenciales
  const handleConfigurarCredencial = (cargo: string) => {
    setCredentialType(cargo);
    setCredentialValue("");
    setShowCredentialModal(true);
  };

  const confirmCredential = () => {
    if (!credentialValue.trim()) {
      toast.error('Valor requerido', 'Debe ingresar un valor para la credencial');
      return;
    }

    setShowCredentialModal(false);
    toast.success('Credencial actualizada', `La credencial para "${credentialType}" ha sido actualizada`);
  };

  // Handlers para parámetros
  const handleEditarParametro = (param: Parameter) => {
    setParamToEdit(param);
    setParamNewValue(param.value);
    setShowEditParamModal(true);
  };

  const confirmEditParam = () => {
    if (!paramNewValue.trim() || !paramToEdit) {
      toast.error('Valor requerido', 'Debe ingresar un valor para el parámetro');
      return;
    }

    setParameters(prev => prev.map(p =>
      p.name === paramToEdit.name ? { ...p, value: paramNewValue } : p
    ));
    setShowEditParamModal(false);
    toast.success('Parámetro actualizado', `${paramToEdit.name} ha sido actualizado`);
  };

  // Handlers para respaldos
  const handleCrearRespaldo = () => {
    try {
      // Crear respaldo de datos actuales
      const backup = {
        fecha: new Date().toISOString(),
        solicitudes: localStorage.getItem('hefesto_solicitudes'),
        usuarios: localStorage.getItem('hefesto_usuarios'),
        actividades: localStorage.getItem('hefesto_actividades'),
      };

      // Guardar en localStorage con timestamp
      const backupKey = `hefesto_backup_${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(backup));
      localStorage.setItem('hefesto_last_backup', backupKey);

      toast.success('Respaldo creado', 'El respaldo se ha creado exitosamente');
    } catch (error) {
      console.error('Error al crear respaldo:', error);
      toast.error('Error al crear respaldo', 'No se pudo completar la operación');
    }
  };

  const handleRestaurarRespaldo = () => {
    setShowRestoreModal(true);
  };

  const confirmRestore = () => {
    setShowRestoreModal(false);

    try {
      // Obtener último respaldo
      const lastBackupKey = localStorage.getItem('hefesto_last_backup');
      if (!lastBackupKey) {
        toast.error('No hay respaldos', 'No se encontró ningún respaldo para restaurar');
        return;
      }

      const backupStr = localStorage.getItem(lastBackupKey);
      if (!backupStr) {
        toast.error('Respaldo no encontrado', 'El respaldo no está disponible');
        return;
      }

      const backup = JSON.parse(backupStr);

      // Restaurar datos
      if (backup.solicitudes) localStorage.setItem('hefesto_solicitudes', backup.solicitudes);
      if (backup.usuarios) localStorage.setItem('hefesto_usuarios', backup.usuarios);
      if (backup.actividades) localStorage.setItem('hefesto_actividades', backup.actividades);

      toast.success('Respaldo restaurado', 'El sistema ha sido restaurado correctamente. Recargue la página.');

      // Recargar página después de 2 segundos
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error al restaurar respaldo:', error);
      toast.error('Error al restaurar', 'No se pudo completar la restauración');
    }
  };


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
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
      <AnimatedSection variants={fadeInUp}>
        <div className="flex flex-col gap-2">
          <motion.h1
            className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 bg-clip-text text-transparent"
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
            {view === "roles" && "Define y gestiona roles y permisos del sistema"}
            {view === "credenciales" && "Controla la creación y recuperación de credenciales"}
            {view === "parametros" && "Configura parámetros de seguridad y funcionamiento"}
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Roles Management */}
      {view === "roles" && (
        <>
          <Button onClick={handleNuevoRol} className="bg-blue-600 hover:bg-blue-700">
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
                  {cargandoRoles ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-xs text-slate-500 mt-2">Cargando roles...</p>
                    </div>
                  ) : roles.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No hay roles disponibles</p>
                  ) : (
                    roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left p-3 rounded border transition-colors ${selectedRole?.id === role.id
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
                    )))}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarRol(selectedRole)}
                        title="Editar rol"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminarRol(selectedRole)}
                        title="Eliminar rol"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Lista de permisos del rol */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Permisos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    <Button
                      onClick={handleGuardarCambiosRol}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
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
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleConfigurarCredencial('Recuperación de Contraseña')}
              >
                Configurar
              </Button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-sm font-medium text-slate-900 mb-3">
                Autenticación de Dos Factores
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Aumenta la seguridad requiriendo verificación adicional
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleConfigurarCredencial('Autenticación 2FA')}
              >
                Configurar
              </Button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-sm font-medium text-slate-900 mb-3">
                Expiración de Sesión
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Configura el tiempo máximo de sesión activa
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleConfigurarCredencial('Expiración de Sesión')}
              >
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
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleConfigurarCredencial('Bloqueo de Usuarios')}
              >
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
                  {cargandoParametros ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-xs text-slate-500 mt-2">Cargando parámetros...</p>
                      </td>
                    </tr>
                  ) : parameters.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-xs text-slate-500">
                        No hay parámetros disponibles
                      </td>
                    </tr>
                  ) : (
                    parameters.map((param, idx) => (
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditarParametro(param)}
                            title="Editar parámetro"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    )))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              Respaldos y Mantenimiento
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-900 text-sm">
                  Último Respaldo
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  01/15/2024 - 02:30 AM
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCrearRespaldo}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Crear Respaldo
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRestaurarRespaldo}
                >
                  Restaurar Último
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRestaurarRespaldo}
                >
                  Descargar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Nuevo Rol */}
      <Dialog open={showNewRoleModal} onOpenChange={setShowNewRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <DialogDescription>
              Ingrese el nombre del nuevo rol que desea crear
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="new-role-name">Nombre del Rol</Label>
              <Input
                id="new-role-name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Ej: Médico - Especialista"
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmNewRole} className="bg-blue-600 hover:bg-blue-700">
              Crear Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Editar Rol */}
      <Dialog open={showEditRoleModal} onOpenChange={setShowEditRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>
              Modifique el nombre del rol seleccionado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-role-name">Nombre del Rol</Label>
              <Input
                id="edit-role-name"
                value={editRoleName}
                onChange={(e) => setEditRoleName(e.target.value)}
                placeholder="Nombre del rol"
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEditRole} className="bg-blue-600 hover:bg-blue-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Eliminar Rol */}
      <Dialog open={showDeleteRoleModal} onOpenChange={setShowDeleteRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Rol</DialogTitle>
            <DialogDescription>
              ¿Está seguro de eliminar el rol "{roleToDelete?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-600">
              <strong>Usuarios afectados:</strong> {roleToDelete?.usersCount || 0}
            </p>
            <p className="text-sm text-amber-600 mt-2">
              ⚠️ Los usuarios con este rol perderán sus permisos asociados.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmDeleteRole} className="bg-red-600 hover:bg-red-700">
              Eliminar Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Configurar Credencial */}
      <Dialog open={showCredentialModal} onOpenChange={setShowCredentialModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar: {credentialType}</DialogTitle>
            <DialogDescription>
              Ingrese el valor de configuración para esta credencial
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="credential-value">Valor de Configuración</Label>
              <Input
                id="credential-value"
                value={credentialValue}
                onChange={(e) => setCredentialValue(e.target.value)}
                placeholder={
                  credentialType.includes('2FA') ? 'Ej: Habilitado/Deshabilitado' :
                    credentialType.includes('Sesión') ? 'Ej: 30 minutos' :
                      credentialType.includes('Contraseña') ? 'Ej: correo@ejemplo.com' :
                        'Ingrese el valor'
                }
                className="mt-2"
              />
            </div>
            <p className="text-xs text-slate-500">
              {credentialType.includes('2FA') && 'Configure la autenticación de dos factores para mayor seguridad'}
              {credentialType.includes('Sesión') && 'Tiempo máximo de inactividad antes de cerrar sesión automáticamente'}
              {credentialType.includes('Contraseña') && 'Email para enviar enlaces de recuperación de contraseña'}
              {credentialType.includes('Bloqueo') && 'Número de intentos fallidos antes de bloquear la cuenta'}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCredentialModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmCredential} className="bg-blue-600 hover:bg-blue-700">
              Guardar Configuración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Editar Parámetro */}
      <Dialog open={showEditParamModal} onOpenChange={setShowEditParamModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Parámetro</DialogTitle>
            <DialogDescription>
              Modifique el valor del parámetro: {paramToEdit?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="param-description">Descripción</Label>
              <p className="text-sm text-slate-600 mt-1">{paramToEdit?.description}</p>
            </div>
            <div>
              <Label htmlFor="param-value">Nuevo Valor</Label>
              <Input
                id="param-value"
                value={paramNewValue}
                onChange={(e) => setParamNewValue(e.target.value)}
                placeholder="Ingrese el nuevo valor"
                className="mt-2"
              />
            </div>
            <p className="text-xs text-amber-600">
              ⚠️ Cambiar este parámetro puede afectar el funcionamiento del sistema
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditParamModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEditParam} className="bg-blue-600 hover:bg-blue-700">
              Actualizar Parámetro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Restaurar Respaldo */}
      <Dialog open={showRestoreModal} onOpenChange={setShowRestoreModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restaurar Respaldo</DialogTitle>
            <DialogDescription>
              ¿Está seguro de restaurar el último respaldo del sistema?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm font-medium text-amber-900">⚠️ Advertencia</p>
              <p className="text-xs text-amber-700 mt-1">
                Esta acción sobrescribirá todos los datos actuales con los del respaldo.
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">
                <strong>Fecha del respaldo:</strong> 01/15/2024 - 02:30 AM
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Tamaño:</strong> 245 MB
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmRestore} className="bg-amber-600 hover:bg-amber-700">
              Confirmar Restauración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
