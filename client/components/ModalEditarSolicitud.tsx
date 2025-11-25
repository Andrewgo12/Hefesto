import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { solicitudesAdministrativas } from '@/lib/api';
import { toast } from '@/lib/toast';
import { Save, X } from 'lucide-react';
import logger from '@/lib/logger';

interface ModalEditarSolicitudProps {
  open: boolean;
  onClose: () => void;
  solicitudId: number;
  onSuccess: () => void;
}

export default function ModalEditarSolicitud({ open, onClose, solicitudId, onSuccess }: ModalEditarSolicitudProps) {
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState<any>({
    modulos_administrativos: {},
    modulos_financieros: {},
    opciones_web: {},
    firmas: {},
    tipo_permiso: [],
  });
  const [permisoAdmin, setPermisoAdmin] = useState<Record<string, Record<string, boolean>>>({});
  const [permisoFin, setPermisoFin] = useState<Record<string, Record<string, boolean>>>({});
  const [anexosNivel, setAnexosNivel] = useState<'1' | '2' | '3' | ''>('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar si el usuario es admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.rol === 'Administrador' || user.rol === 'admin');
  }, []);

  const permisos = ['A', 'C', 'M', 'B'] as const;

  useEffect(() => {
    if (open && solicitudId) {
      cargarSolicitud();
    }
  }, [open, solicitudId]);

  const cargarSolicitud = async () => {
    try {
      setCargando(true);
      const response = await solicitudesAdministrativas.getById(solicitudId);
      const solicitud = response.data;

      logger.data('Datos cargados', solicitud);
      logger.debug('Solicitud parseada', {
        tipo_permiso: solicitud.tipo_permiso,
        perfil_de: solicitud.perfil_de,
        opciones_web: solicitud.opciones_web,
        firmas: solicitud.firmas
      });

      // Parsear JSON strings
      const modulosAdmin = typeof solicitud.modulos_administrativos === 'string'
        ? JSON.parse(solicitud.modulos_administrativos)
        : solicitud.modulos_administrativos || {};

      const modulosFinan = typeof solicitud.modulos_financieros === 'string'
        ? JSON.parse(solicitud.modulos_financieros)
        : solicitud.modulos_financieros || {};

      const opcionesWeb = typeof solicitud.opciones_web === 'string'
        ? JSON.parse(solicitud.opciones_web)
        : solicitud.opciones_web || {};

      const firmas = typeof solicitud.firmas === 'string'
        ? JSON.parse(solicitud.firmas)
        : solicitud.firmas || {};

      const tipoPermiso = typeof solicitud.tipo_permiso === 'string'
        ? JSON.parse(solicitud.tipo_permiso)
        : solicitud.tipo_permiso || [];

      logger.debug('Datos parseados', {
        tipoPermiso,
        perfil_de: solicitud.perfil_de,
        opcionesWeb
      });

      setFormData({
        nombre_completo: solicitud.nombre_completo || '',
        cedula: solicitud.cedula || '',
        cargo: solicitud.cargo || '',
        area_servicio: solicitud.area_servicio || '',
        telefono_extension: solicitud.telefono_extension || '',
        tipo_vinculacion: solicitud.tipo_vinculacion || 'Planta',
        modulos_administrativos: modulosAdmin,
        modulos_financieros: modulosFinan,
        opciones_web: opcionesWeb,
        firmas: firmas,
        tipo_permiso: tipoPermiso,
        perfil_de: solicitud.perfil_de || '',
        login_asignado: solicitud.login_asignado || '',
        clave_temporal: solicitud.clave_temporal || '',
        acepta_responsabilidad: solicitud.acepta_responsabilidad === 1 || solicitud.acepta_responsabilidad === true,
        fecha_solicitud: solicitud.fecha_solicitud || '',
        codigo_formato: solicitud.codigo_formato || 'FOR-GDI-SIS-004',
        version: solicitud.version || '1',
        fecha_emision: solicitud.fecha_emision || '23/11/2020',
      });

      // Cargar permisos administrativos
      const permisosAdminCargados: Record<string, Record<string, boolean>> = {};
      Object.keys(modulosAdmin).forEach((modulo) => {
        const perms = modulosAdmin[modulo];
        logger.process(`Procesando módulo admin "${modulo}"`, perms);
        permisosAdminCargados[modulo] = {
          A: perms.A === 1 || perms.A === '1' || perms.A === true || perms.adicionar === 1 || perms.adicionar === '1' || perms.adicionar === true,
          C: perms.C === 1 || perms.C === '1' || perms.C === true || perms.consultar === 1 || perms.consultar === '1' || perms.consultar === true,
          M: perms.M === 1 || perms.M === '1' || perms.M === true || perms.modificar === 1 || perms.modificar === '1' || perms.modificar === true,
          B: perms.B === 1 || perms.B === '1' || perms.B === true || perms.borrar === 1 || perms.borrar === '1' || perms.borrar === true,
        };
      });
      logger.success('Permisos admin cargados', permisosAdminCargados);
      setPermisoAdmin(permisosAdminCargados);

      // Cargar permisos financieros
      const permisosFinCargados: Record<string, Record<string, boolean>> = {};
      logger.info('Módulos financieros a procesar', Object.keys(modulosFinan));
      Object.keys(modulosFinan).forEach((modulo) => {
        const perms = modulosFinan[modulo];
        logger.process(`Procesando módulo fin "${modulo}"`, perms);
        permisosFinCargados[modulo] = {
          A: perms.A === 1 || perms.A === '1' || perms.A === true || perms.adicionar === 1 || perms.adicionar === '1' || perms.adicionar === true,
          C: perms.C === 1 || perms.C === '1' || perms.C === true || perms.consultar === 1 || perms.consultar === '1' || perms.consultar === true,
          M: perms.M === 1 || perms.M === '1' || perms.M === true || perms.modificar === 1 || perms.modificar === '1' || perms.modificar === true,
          B: perms.B === 1 || perms.B === '1' || perms.B === true || perms.borrar === 1 || perms.borrar === '1' || perms.borrar === true,
        };
      });
      logger.success('Permisos financieros cargados', permisosFinCargados);
      setPermisoFin(permisosFinCargados);

      // Cargar nivel de anexos
      if (solicitud.anexos_nivel) {
        setAnexosNivel(solicitud.anexos_nivel as '1' | '2' | '3');
      }

      toast.success('Solicitud cargada', 'Datos listos para editar');
    } catch (error) {
      console.error('Error al cargar:', error);
      toast.error('Error', 'No se pudo cargar la solicitud');
      onClose();
    } finally {
      setCargando(false);
    }
  };

  const togglePermiso = (tipo: 'admin' | 'fin', modulo: string, permiso: string, value: boolean) => {
    if (tipo === 'admin') {
      setPermisoAdmin(prev => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value }
      }));
    } else {
      setPermisoFin(prev => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value }
      }));
    }
  };

  const handleGuardar = async () => {
    try {
      setLoading(true);

      const payload = {
        codigo_formato: formData.codigo_formato || 'FOR-GDI-SIS-004',
        version: formData.version || '1',
        fecha_emision: formData.fecha_emision || '23/11/2020',
        nombre_completo: formData.nombre_completo,
        cedula: formData.cedula,
        cargo: formData.cargo,
        area_servicio: formData.area_servicio,
        telefono_extension: formData.telefono_extension,
        tipo_vinculacion: formData.tipo_vinculacion,
        modulos_administrativos: JSON.stringify(permisoAdmin),
        modulos_financieros: JSON.stringify(permisoFin),
        anexos_nivel: anexosNivel || null,
        tipo_permiso: JSON.stringify(formData.tipo_permiso || []),
        perfil_de: formData.perfil_de || null,
        opciones_web: JSON.stringify(formData.opciones_web || {}),
        firmas: JSON.stringify(formData.firmas || {}),
        login_asignado: formData.login_asignado || null,
        clave_temporal: formData.clave_temporal || null,
        acepta_responsabilidad: formData.acepta_responsabilidad ? 1 : 0,
        fecha_solicitud: formData.fecha_solicitud || new Date().toISOString(),
      };

      logger.save('Guardando payload', payload);
      logger.debug('Datos del formulario', {
        tipo_permiso: formData.tipo_permiso,
        perfil_de: formData.perfil_de,
        opciones_web: formData.opciones_web
      });

      const response = await solicitudesAdministrativas.update(solicitudId, payload);
      logger.success('Respuesta del servidor', response.data);

      toast.success('Solicitud actualizada', 'Los cambios se guardaron correctamente');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('❌ Error al guardar:', error);
      console.error('❌ Detalles:', error.response?.data);
      toast.error('Error', error.response?.data?.message || 'No se pudo guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>✏️ Editar Solicitud #{solicitudId}</DialogTitle>
          <DialogDescription>
            Modifica los campos necesarios y guarda los cambios. Los campos en rojo están incompletos.
          </DialogDescription>
        </DialogHeader>

        {cargando ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando datos...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Indicador de Progreso */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-3">📊 Estado de la Solicitud</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Object.keys(permisoAdmin).filter(m => Object.values(permisoAdmin[m]).some(v => v)).length}/{Object.keys(formData.modulos_administrativos || {}).length}
                  </div>
                  <div className="text-xs text-slate-600">Módulos Admin Configurados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.keys(permisoFin).filter(m => Object.values(permisoFin[m]).some(v => v)).length}/{Object.keys(formData.modulos_financieros || {}).length}
                  </div>
                  <div className="text-xs text-slate-600">Módulos Fin Configurados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {Object.keys(formData.firmas || {}).length}/5
                  </div>
                  <div className="text-xs text-slate-600">Firmas Completadas</div>
                </div>
              </div>
              {(!formData.nombre_completo || !formData.cedula || !formData.cargo || !formData.area_servicio) && (
                <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                  ⚠️ Faltan datos básicos por completar
                </div>
              )}
              {!formData.login_asignado && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-700 text-sm">
                  ⚠️ Falta asignar login de usuario
                </div>
              )}
            </div>

            {/* Encabezado del formulario */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-blue-900">Código:</span>
                  <span className="ml-2">{formData.codigo_formato}</span>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Versión:</span>
                  <span className="ml-2">{formData.version}</span>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Fecha Emisión:</span>
                  <span className="ml-2">{formData.fecha_emision}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-blue-900">Fecha Solicitud:</span>
                <span className="ml-2">{formData.fecha_solicitud ? new Date(formData.fecha_solicitud).toLocaleString('es-CO') : 'N/A'}</span>
              </div>
            </div>

            {/* Tipo de Vinculación */}
            <div className="border-2 border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-3">TIPO DE VINCULACIÓN</h3>
              <div className="flex gap-4">
                {['Planta', 'Agremiado', 'Contrato'].map((tipo) => (
                  <label key={tipo} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.tipo_vinculacion === tipo}
                      onChange={() => setFormData({ ...formData, tipo_vinculacion: tipo })}
                    />
                    <span>{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Datos básicos - SOLO LECTURA para usuarios normales */}
            <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900">DATOS DEL SOLICITANTE</h3>
                {!isAdmin && <Badge variant="outline" className="bg-blue-100">Solo lectura</Badge>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre Completo</Label>
                  <Input
                    value={formData.nombre_completo}
                    onChange={(e) => isAdmin && setFormData({ ...formData, nombre_completo: e.target.value })}
                    readOnly={!isAdmin}
                    className={!isAdmin ? 'bg-slate-100 cursor-not-allowed' : ''}
                  />
                </div>
                <div>
                  <Label>Cédula</Label>
                  <Input
                    value={formData.cedula}
                    onChange={(e) => isAdmin && setFormData({ ...formData, cedula: e.target.value })}
                    readOnly={!isAdmin}
                    className={!isAdmin ? 'bg-slate-100 cursor-not-allowed' : ''}
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input
                    value={formData.cargo}
                    onChange={(e) => isAdmin && setFormData({ ...formData, cargo: e.target.value })}
                    readOnly={!isAdmin}
                    className={!isAdmin ? 'bg-slate-100 cursor-not-allowed' : ''}
                  />
                </div>
                <div>
                  <Label>Área/Servicio</Label>
                  <Input
                    value={formData.area_servicio}
                    onChange={(e) => isAdmin && setFormData({ ...formData, area_servicio: e.target.value })}
                    readOnly={!isAdmin}
                    className={!isAdmin ? 'bg-slate-100 cursor-not-allowed' : ''}
                  />
                </div>
                <div>
                  <Label>Teléfono/Extensión</Label>
                  <Input
                    value={formData.telefono_extension}
                    onChange={(e) => isAdmin && setFormData({ ...formData, telefono_extension: e.target.value })}
                    readOnly={!isAdmin}
                    className={!isAdmin ? 'bg-slate-100 cursor-not-allowed' : ''}
                  />
                </div>
              </div>
            </div>

            {/* Leyenda de Permisos */}
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-2">ℹ️ LEYENDA DE PERMISOS</h4>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div><strong>A</strong> = Adicionar (Crear)</div>
                <div><strong>C</strong> = Consultar (Ver)</div>
                <div><strong>M</strong> = Modificar (Editar)</div>
                <div><strong>B</strong> = Borrar (Eliminar)</div>
              </div>
            </div>

            {/* Módulos Administrativos */}
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-blue-900">SERVINTE ADMINISTRATIVO</h3>
                {!isAdmin && <Badge variant="outline" className="bg-blue-100">Solo lectura</Badge>}
              </div>
              <table className="w-full text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 text-left">Módulo</th>
                    {permisos.map(p => <th key={p} className="p-2 text-center w-16">{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.modulos_administrativos || {}).map((modulo) => {
                    logger.render(`módulo "${modulo}"`, permisoAdmin[modulo]);
                    return (
                      <tr key={modulo} className="border-b">
                        <td className="p-2 capitalize">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</td>
                        {modulo === 'anexos' ? (
                          <td colSpan={4} className="p-2">
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={anexosNivel === '1'}
                                  onChange={() => setAnexosNivel('1')}
                                />
                                N1
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={anexosNivel === '2'}
                                  onChange={() => setAnexosNivel('2')}
                                />
                                N2
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={anexosNivel === '3'}
                                  onChange={() => setAnexosNivel('3')}
                                />
                                N3
                              </label>
                            </div>
                          </td>
                        ) : (
                          permisos.map((p) => (
                            <td key={p} className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={permisoAdmin[modulo]?.[p] === true}
                                onChange={(e) => togglePermiso('admin', modulo, p, e.target.checked)}
                                className="w-4 h-4 cursor-pointer accent-blue-600"
                              />
                            </td>
                          ))
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Módulos Financieros */}
            <div className="border-2 border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-3">SERVINTE FINANCIERO</h3>
              <table className="w-full text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-2 text-left">Módulo</th>
                    {permisos.map(p => <th key={p} className="p-2 text-center w-16">{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.modulos_financieros || {}).map((modulo) => (
                    <tr key={modulo} className="border-b">
                      <td className="p-2 capitalize">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</td>
                      {permisos.map((p) => (
                        <td key={p} className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={permisoFin[modulo]?.[p] === true}
                            onChange={(e) => togglePermiso('fin', modulo, p, e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-green-600"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tipo de Permiso */}
            <div className="border-2 border-purple-200 rounded-lg p-4">
              <h3 className="font-bold text-purple-900 mb-3">TIPO DE PERMISO</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Temporal', 'Permanente', 'Modificación', 'Anulación'].map((tipo) => (
                  <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.tipo_permiso?.includes(tipo) === true}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            tipo_permiso: [...(formData.tipo_permiso || []), tipo]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            tipo_permiso: (formData.tipo_permiso || []).filter((t: string) => t !== tipo)
                          });
                        }
                      }}
                      className="w-4 h-4 cursor-pointer accent-purple-600"
                    />
                    <span>{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Perfil */}
            <div className="border-2 border-indigo-200 rounded-lg p-4">
              <h3 className="font-bold text-indigo-900 mb-3">TIPO DE PERFIL A CREAR</h3>
              <div className="space-y-3">
                <div>
                  <Label>Tipo de perfil</Label>
                  <Input
                    value={formData.perfil_de}
                    onChange={(e) => setFormData({ ...formData, perfil_de: e.target.value })}
                    placeholder="Ej: Administrativo - Supervisor"
                  />
                </div>
                <div>
                  <Label>Descripción del perfil (para qué es)</Label>
                  <Input
                    value={formData.descripcion_perfil || ''}
                    onChange={(e) => setFormData({ ...formData, descripcion_perfil: e.target.value })}
                    placeholder="Breve descripción del uso del perfil"
                  />
                </div>
              </div>
            </div>

            {/* Opciones Web */}
            <div className="border-2 border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-3">OPCIONES WEB</h3>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.opciones_web?.internet === true}
                    onChange={(e) => setFormData({
                      ...formData,
                      opciones_web: { ...formData.opciones_web, internet: e.target.checked }
                    })}
                    className="w-4 h-4 cursor-pointer accent-slate-600"
                  />
                  <span>Internet</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.opciones_web?.correoElectronico === true}
                    onChange={(e) => setFormData({
                      ...formData,
                      opciones_web: { ...formData.opciones_web, correoElectronico: e.target.checked }
                    })}
                    className="w-4 h-4 cursor-pointer accent-slate-600"
                  />
                  <span>Correo Electrónico</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.opciones_web?.transferenciaArchivos === true}
                    onChange={(e) => setFormData({
                      ...formData,
                      opciones_web: { ...formData.opciones_web, transferenciaArchivos: e.target.checked }
                    })}
                    className="w-4 h-4 cursor-pointer accent-slate-600"
                  />
                  <span>Transferencia de Archivos</span>
                </label>
              </div>
              <div className="mt-3">
                <Label>Otros</Label>
                <Input
                  value={formData.opciones_web?.otros || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    opciones_web: { ...formData.opciones_web, otros: e.target.value }
                  })}
                  placeholder="Especificar otras opciones"
                />
              </div>
            </div>

            {/* Creación de Cuenta */}
            <div className="border-2 border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-3">CREACIÓN DE CUENTA Y FIRMA DEL USUARIO SOLICITANTE</h3>
              <p className="text-xs text-slate-600 mb-3">Nota: Los campos de Login y Contraseña serán diligenciados por el Jefe de Gestión de la Información al momento de crear la cuenta en el sistema.</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Login del usuario *</Label>
                  <Input
                    value={formData.login_asignado}
                    onChange={(e) => setFormData({ ...formData, login_asignado: e.target.value })}
                    placeholder="Usuario del sistema"
                  />
                </div>
                <div>
                  <Label>Contraseña temporal *</Label>
                  <Input
                    type="password"
                    value={formData.clave_temporal}
                    onChange={(e) => setFormData({ ...formData, clave_temporal: e.target.value })}
                    placeholder="Contraseña temporal"
                  />
                </div>
                <div>
                  <Label>Fecha de creación</Label>
                  <Input
                    type="date"
                    value={formData.fecha_creacion || ''}
                    onChange={(e) => setFormData({ ...formData, fecha_creacion: e.target.value })}
                  />
                </div>
              </div>

              {/* Firma Usuario Solicitante */}
              <div className="mt-4 border-2 border-slate-300 rounded-lg p-3 bg-slate-50">
                <h4 className="font-semibold text-slate-900 mb-2">Firma del usuario solicitante</h4>
                {formData.firmas?.usuarioSolicitante ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{formData.firmas.usuarioSolicitante.usuario}</p>
                      <p className="text-xs text-slate-600">
                        {formData.firmas.usuarioSolicitante.fecha ? new Date(formData.firmas.usuarioSolicitante.fecha).toLocaleString('es-CO') : 'Sin fecha'}
                      </p>
                    </div>
                    <Badge className="bg-green-500">✓ Firmado</Badge>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      setFormData({
                        ...formData,
                        firmas: {
                          ...formData.firmas,
                          usuarioSolicitante: {
                            usuario: user.nombre || 'Usuario',
                            fecha: new Date().toISOString()
                          }
                        }
                      });
                      toast.success('Firma agregada', 'Usuario solicitante firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar
                  </Button>
                )}
              </div>
            </div>

            {/* Vo. Bo. y Firmas */}
            <div className="border-2 border-amber-200 rounded-lg p-4">
              <h3 className="font-bold text-amber-900 mb-3">Vo. Bo. Y FIRMAS DE AUTORIZACIÓN (5 firmas requeridas)</h3>

              {/* Firma Jefe Inmediato */}
              <div className="mb-4 border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
                <h4 className="font-semibold text-blue-900 mb-2">Jefe Inmediato</h4>
                {formData.firmas?.jefeInmediato ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{formData.firmas.jefeInmediato.usuario}</p>
                      <p className="text-xs text-slate-600">
                        {formData.firmas.jefeInmediato.fecha ? new Date(formData.firmas.jefeInmediato.fecha).toLocaleString('es-CO') : 'Sin fecha'}
                      </p>
                    </div>
                    <Badge className="bg-green-500">✓ Firmado</Badge>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      setFormData({
                        ...formData,
                        firmas: {
                          ...formData.firmas,
                          jefeInmediato: {
                            usuario: user.nombre || 'Usuario',
                            fecha: new Date().toISOString()
                          }
                        }
                      });
                      toast.success('Firma agregada', 'Jefe Inmediato firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar como Jefe Inmediato
                  </Button>
                )}
              </div>

              {/* Firma Coordinador Financiero */}
              <div className="mb-4 border-2 border-green-200 rounded-lg p-3 bg-green-50">
                <h4 className="font-semibold text-green-900 mb-2">Coordinador de Facturación o Subgerente Financiero</h4>
                {formData.firmas?.coordinadorFacturacionOSubgerenteFinanciero ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{formData.firmas.coordinadorFacturacionOSubgerenteFinanciero.usuario}</p>
                      <p className="text-xs text-slate-600">
                        {formData.firmas.coordinadorFacturacionOSubgerenteFinanciero.fecha ? new Date(formData.firmas.coordinadorFacturacionOSubgerenteFinanciero.fecha).toLocaleString('es-CO') : 'Sin fecha'}
                      </p>
                    </div>
                    <Badge className="bg-green-500">✓ Firmado</Badge>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      setFormData({
                        ...formData,
                        firmas: {
                          ...formData.firmas,
                          coordinadorFacturacionOSubgerenteFinanciero: {
                            usuario: user.nombre || 'Usuario',
                            fecha: new Date().toISOString()
                          }
                        }
                      });
                      toast.success('Firma agregada', 'Coordinador Financiero firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar como Coordinador Financiero
                  </Button>
                )}
              </div>

              {/* Firma Jefe Talento Humano */}
              <div className="mb-4 border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
                <h4 className="font-semibold text-orange-900 mb-2">Jefe de Talento Humano</h4>
                {formData.firmas?.jefeTalentoHumano ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{formData.firmas.jefeTalentoHumano.usuario}</p>
                      <p className="text-xs text-slate-600">
                        {formData.firmas.jefeTalentoHumano.fecha ? new Date(formData.firmas.jefeTalentoHumano.fecha).toLocaleString('es-CO') : 'Sin fecha'}
                      </p>
                    </div>
                    <Badge className="bg-green-500">✓ Firmado</Badge>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      setFormData({
                        ...formData,
                        firmas: {
                          ...formData.firmas,
                          jefeTalentoHumano: {
                            usuario: user.nombre || 'Usuario',
                            fecha: new Date().toISOString()
                          }
                        }
                      });
                      toast.success('Firma agregada', 'Jefe de Talento Humano firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar como Jefe de Talento Humano
                  </Button>
                )}
              </div>

              {/* Firma Jefe Gestión Información */}
              <div className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                <h4 className="font-semibold text-purple-900 mb-2">Jefe de Gestión de la Información</h4>
                {formData.firmas?.coordinadorTIC ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{formData.firmas.coordinadorTIC.usuario}</p>
                      <p className="text-xs text-slate-600">
                        {formData.firmas.coordinadorTIC.fecha ? new Date(formData.firmas.coordinadorTIC.fecha).toLocaleString('es-CO') : 'Sin fecha'}
                      </p>
                    </div>
                    <Badge className="bg-green-500">✓ Firmado</Badge>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      setFormData({
                        ...formData,
                        firmas: {
                          ...formData.firmas,
                          coordinadorTIC: {
                            usuario: user.nombre || 'Usuario',
                            fecha: new Date().toISOString()
                          }
                        }
                      });
                      toast.success('Firma agregada', 'Jefe de Gestión de la Información firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar como Jefe de Gestión de la Información
                  </Button>
                )}
              </div>
            </div>

            {/* Aceptación de Responsabilidad */}
            <label className="flex items-center gap-2 cursor-pointer border-2 border-amber-200 rounded-lg p-3 bg-amber-50">
              <input
                type="checkbox"
                checked={formData.acepta_responsabilidad === true}
                onChange={(e) => setFormData({ ...formData, acepta_responsabilidad: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-amber-600"
              />
              <span className="font-medium text-amber-900">Acepta la responsabilidad de hacer buen uso del usuario y contraseña</span>
            </label>

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleGuardar} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
