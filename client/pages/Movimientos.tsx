import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Key, Database, HardDrive } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function Movimientos() {
  // Estados para modales principales
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [showCredencialesModal, setShowCredencialesModal] = useState(false);
  const [showParametrosModal, setShowParametrosModal] = useState(false);
  const [showRespaldosModal, setShowRespaldosModal] = useState(false);
  
  // Estados para modales de confirmación
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  
  // Estados para modales de input
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showEditParamModal, setShowEditParamModal] = useState(false);
  
  const [newRoleName, setNewRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [credentialType, setCredentialType] = useState("");
  const [credentialValue, setCredentialValue] = useState("");
  const [paramToEdit, setParamToEdit] = useState<Parameter | null>(null);
  const [paramNewValue, setParamNewValue] = useState("");

  // Estados para roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Administrativo - Entrada de Datos",
      description: "Usuario administrativo básico con acceso limitado",
      usersCount: 15,
      permissions: ["Crear solicitudes", "Ver reportes", "Editar datos propios"],
    },
    {
      id: 2,
      name: "Administrativo - Supervisor",
      description: "Supervisor de área con permisos de aprobación",
      usersCount: 8,
      permissions: ["Crear solicitudes", "Aprobar solicitudes", "Ver reportes", "Gestionar equipo"],
    },
    {
      id: 3,
      name: "Médico - Consulta",
      description: "Médico general con acceso a historia clínica",
      usersCount: 25,
      permissions: ["Acceso historia clínica", "Crear registros médicos", "Ver laboratorios"],
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

  // Estados para parámetros
  const [parameters, setParameters] = useState<Parameter[]>([
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
  ]);

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
    setRoleToDelete(null);
    toast.success('Rol eliminado', 'El rol ha sido eliminado correctamente');
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
    toast.loading('Creando respaldo...');
    setTimeout(() => {
      toast.success('Respaldo creado', 'El respaldo se ha creado exitosamente');
    }, 1500);
  };

  const handleRestaurarRespaldo = () => {
    setShowRestoreModal(true);
  };
  
  const confirmRestore = () => {
    setShowRestoreModal(false);
    toast.loading('Restaurando respaldo...');
    setTimeout(() => {
      toast.success('Respaldo restaurado', 'El sistema ha sido restaurado correctamente');
    }, 1500);
  };

  const handleDescargarRespaldo = () => {
    toast.success('Descargando respaldo', 'El archivo de respaldo se está descargando');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Movimientos del Sistema
        </h1>
        <p className="text-sm text-slate-600">
          Gestiona roles, credenciales, parámetros y respaldos del sistema
        </p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gestión de Roles */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowRolesModal(true)}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Gestión de Roles
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Define y gestiona roles y permisos del sistema
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded">{roles.length} roles</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Credenciales */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowCredencialesModal(true)}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Administración de Credenciales
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Controla la creación y recuperación de credenciales
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded">4 configuraciones</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Parámetros del Sistema */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowParametrosModal(true)}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Parámetros del Sistema
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Configura parámetros de seguridad y funcionamiento
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded">{parameters.length} parámetros</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Respaldos */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowRespaldosModal(true)}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <HardDrive className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-2">
                Respaldos y Mantenimiento
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Crea, restaura y descarga respaldos del sistema
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded">Último: 01/15/2024</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* MODAL 1: Gestión de Roles */}
      <Dialog open={showRolesModal} onOpenChange={setShowRolesModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gestión de Roles y Permisos</DialogTitle>
            <DialogDescription>
              Define y gestiona roles y permisos del sistema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Button onClick={handleNuevoRol} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Rol
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Lista de roles */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">Roles Disponibles</h4>
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
                    <p className="font-medium text-slate-900 text-sm">{role.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{role.usersCount} usuarios</p>
                  </button>
                ))}
              </div>

              {/* Detalles del rol */}
              <div>
                {selectedRole ? (
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{selectedRole.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{selectedRole.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <h5 className="text-sm font-medium text-slate-900 mb-3">Permisos Asignados</h5>
                      <div className="space-y-2">
                        {selectedRole.permissions.map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                            <input type="checkbox" checked readOnly className="w-4 h-4" />
                            <span className="text-sm text-slate-700">{perm}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditarRol(selectedRole)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEliminarRol(selectedRole)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-6 text-center text-slate-500">
                    Selecciona un rol para ver detalles
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRolesModal(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Credenciales */}
      <Dialog open={showCredencialesModal} onOpenChange={setShowCredencialesModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Administración de Credenciales</DialogTitle>
            <DialogDescription>
              Controla la creación y recuperación de credenciales
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCredencialesModal(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Parámetros del Sistema */}
      <Dialog open={showParametrosModal} onOpenChange={setShowParametrosModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Parámetros del Sistema</DialogTitle>
            <DialogDescription>
              Configura parámetros de seguridad y funcionamiento
            </DialogDescription>
          </DialogHeader>

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
                {parameters.map((param, idx) => (
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
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowParametrosModal(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 4: Respaldos */}
      <Dialog open={showRespaldosModal} onOpenChange={setShowRespaldosModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Respaldos y Mantenimiento</DialogTitle>
            <DialogDescription>
              Crea, restaura y descarga respaldos del sistema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
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
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Crear Respaldo
              </Button>
              <Button 
                variant="outline"
                onClick={handleRestaurarRespaldo}
                className="flex-1"
              >
                Restaurar Último
              </Button>
              <Button 
                variant="outline"
                onClick={handleDescargarRespaldo}
                className="flex-1"
              >
                Descargar
              </Button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-medium">
                ℹ️ Información Importante
              </p>
              <p className="text-xs text-blue-700 mt-2">
                Los respaldos incluyen toda la configuración del sistema, roles, usuarios y parámetros. 
                Se recomienda crear respaldos antes de realizar cambios importantes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRespaldosModal(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación: Eliminar Rol */}
      <Dialog open={showDeleteRoleModal} onOpenChange={setShowDeleteRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de eliminar el rol "{roleToDelete?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmDeleteRole} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación: Restaurar Respaldo */}
      <Dialog open={showRestoreModal} onOpenChange={setShowRestoreModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Restauración</DialogTitle>
            <DialogDescription>
              ¿Está seguro de restaurar el último respaldo? Todos los cambios no guardados se perderán.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmRestore} className="bg-amber-600 hover:bg-amber-700">
              Restaurar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Nuevo Rol */}
      <Dialog open={showNewRoleModal} onOpenChange={setShowNewRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <DialogDescription>
              Ingrese el nombre del nuevo rol
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="newRoleName">Nombre del Rol</Label>
            <Input
              id="newRoleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Ej: Médico - Especialista"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmNewRole} className="bg-blue-600 hover:bg-blue-700">
              Crear
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
              Modifique el nombre del rol
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="editRoleName">Nombre del Rol</Label>
            <Input
              id="editRoleName"
              value={editRoleName}
              onChange={(e) => setEditRoleName(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEditRole} className="bg-blue-600 hover:bg-blue-700">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Configurar Credencial */}
      <Dialog open={showCredentialModal} onOpenChange={setShowCredentialModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Credencial</DialogTitle>
            <DialogDescription>
              {credentialType}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="credentialValue">Valor</Label>
            <Input
              id="credentialValue"
              value={credentialValue}
              onChange={(e) => setCredentialValue(e.target.value)}
              placeholder="Ingrese el valor..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCredentialModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmCredential} className="bg-blue-600 hover:bg-blue-700">
              Guardar
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
              {paramToEdit?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="paramValue">Nuevo Valor</Label>
            <Input
              id="paramValue"
              value={paramNewValue}
              onChange={(e) => setParamNewValue(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-slate-500 mt-2">{paramToEdit?.description}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditParamModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEditParam} className="bg-blue-600 hover:bg-blue-700">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
