import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { solicitudesHistoriaClinica } from '@/lib/api';
import { toast } from '@/lib/toast';
import { Save, X } from 'lucide-react';

interface ModalEditarHistoriaClinicaProps {
  open: boolean;
  onClose: () => void;
  solicitudId: number;
  onSuccess: () => void;
}

export default function ModalEditarHistoriaClinica({ open, onClose, solicitudId, onSuccess }: ModalEditarHistoriaClinicaProps) {
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState<any>({
    modulos_historia_clinica: {},
    opciones_web: {},
    firmas: {},
    tipo_permiso: [],
  });
  const [permisoHC, setPermisoHC] = useState<Record<string, Record<string, boolean>>>({});

  const permisos = ['A', 'C', 'M', 'B'] as const;

  useEffect(() => {
    if (open && solicitudId) {
      cargarSolicitud();
    }
  }, [open, solicitudId]);

  const cargarSolicitud = async () => {
    try {
      setCargando(true);
      const response = await solicitudesHistoriaClinica.getById(solicitudId);
      const solicitud = response.data;

      console.log('📥 Datos HC cargados:', solicitud);

      // Parsear JSON strings
      const modulosHC = typeof solicitud.modulos_historia_clinica === 'string'
        ? JSON.parse(solicitud.modulos_historia_clinica)
        : solicitud.modulos_historia_clinica || {};

      const opcionesWeb = typeof solicitud.opciones_web === 'string'
        ? JSON.parse(solicitud.opciones_web)
        : solicitud.opciones_web || {};

      const firmas = typeof solicitud.firmas === 'string'
        ? JSON.parse(solicitud.firmas)
        : solicitud.firmas || {};

      const tipoPermiso = typeof solicitud.tipo_permiso === 'string'
        ? JSON.parse(solicitud.tipo_permiso)
        : solicitud.tipo_permiso || [];

      setFormData({
        nombre_completo: solicitud.nombre_completo || '',
        cedula: solicitud.cedula || '',
        cargo: solicitud.cargo || '',
        area_servicio: solicitud.area_servicio || '',
        telefono_extension: solicitud.telefono_extension || '',
        tipo_vinculacion: solicitud.tipo_vinculacion || 'Planta',
        modulos_historia_clinica: modulosHC,
        opciones_web: opcionesWeb,
        firmas: firmas,
        tipo_permiso: tipoPermiso,
        perfil_de: solicitud.perfil_de || '',
        login_asignado: solicitud.login_asignado || '',
        clave_temporal: solicitud.clave_temporal || '',
        acepta_responsabilidad: solicitud.acepta_responsabilidad === 1 || solicitud.acepta_responsabilidad === true,
        fecha_solicitud: solicitud.fecha_solicitud || '',
        codigo_formato: solicitud.codigo_formato || 'FOR-GDI-SIS-005',
        version: solicitud.version || '1',
        fecha_emision: solicitud.fecha_emision || '23/11/2020',
      });

      // Cargar permisos de historia clínica
      const permisosHCCargados: Record<string, Record<string, boolean>> = {};
      Object.keys(modulosHC).forEach((modulo) => {
        const perms = modulosHC[modulo];
        console.log(`🔍 Procesando módulo HC "${modulo}":`, perms);
        permisosHCCargados[modulo] = {
          A: perms.A === 1 || perms.A === '1' || perms.A === true || perms.adicionar === 1 || perms.adicionar === '1' || perms.adicionar === true,
          C: perms.C === 1 || perms.C === '1' || perms.C === true || perms.consultar === 1 || perms.consultar === '1' || perms.consultar === true,
          M: perms.M === 1 || perms.M === '1' || perms.M === true || perms.modificar === 1 || perms.modificar === '1' || perms.modificar === true,
          B: perms.B === 1 || perms.B === '1' || perms.B === true || perms.borrar === 1 || perms.borrar === '1' || perms.borrar === true,
        };
      });
      console.log('✅ Permisos HC cargados:', permisosHCCargados);
      setPermisoHC(permisosHCCargados);

      toast.success('Solicitud cargada', 'Datos listos para editar');
    } catch (error) {
      console.error('Error al cargar:', error);
      toast.error('Error', 'No se pudo cargar la solicitud');
      onClose();
    } finally {
      setCargando(false);
    }
  };

  const togglePermiso = (modulo: string, permiso: string, value: boolean) => {
    setPermisoHC(prev => ({
      ...prev,
      [modulo]: { ...prev[modulo], [permiso]: value }
    }));
  };

  const handleGuardar = async () => {
    try {
      setLoading(true);

      const payload = {
        codigo_formato: formData.codigo_formato || 'FOR-GDI-SIS-005',
        version: formData.version || '1',
        fecha_emision: formData.fecha_emision || '23/11/2020',
        nombre_completo: formData.nombre_completo,
        cedula: formData.cedula,
        cargo: formData.cargo,
        area_servicio: formData.area_servicio,
        telefono_extension: formData.telefono_extension,
        tipo_vinculacion: formData.tipo_vinculacion,
        modulos_historia_clinica: JSON.stringify(permisoHC),
        tipo_permiso: JSON.stringify(formData.tipo_permiso || []),
        perfil_de: formData.perfil_de || null,
        opciones_web: JSON.stringify(formData.opciones_web || {}),
        firmas: JSON.stringify(formData.firmas || {}),
        login_asignado: formData.login_asignado || null,
        clave_temporal: formData.clave_temporal || null,
        acepta_responsabilidad: formData.acepta_responsabilidad ? 1 : 0,
        fecha_solicitud: formData.fecha_solicitud || new Date().toISOString(),
      };

      await solicitudesHistoriaClinica.update(solicitudId, payload);
      toast.success('Solicitud actualizada', 'Los cambios se guardaron correctamente');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error al guardar:', error);
      toast.error('Error', error.response?.data?.message || 'No se pudo guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>✏️ Editar Solicitud Historia Clínica #{solicitudId}</DialogTitle>
          <DialogDescription>
            Modifica los campos necesarios y guarda los cambios. Todos los datos se actualizarán en la base de datos.
          </DialogDescription>
        </DialogHeader>

        {cargando ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando datos...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Encabezado del formulario */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-teal-900">Código:</span>
                  <span className="ml-2">{formData.codigo_formato}</span>
                </div>
                <div>
                  <span className="font-semibold text-teal-900">Versión:</span>
                  <span className="ml-2">{formData.version}</span>
                </div>
                <div>
                  <span className="font-semibold text-teal-900">Fecha Emisión:</span>
                  <span className="ml-2">{formData.fecha_emision}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-teal-900">Fecha Solicitud:</span>
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

            {/* Datos básicos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nombre Completo</Label>
                <Input
                  value={formData.nombre_completo}
                  onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                />
              </div>
              <div>
                <Label>Cédula</Label>
                <Input
                  value={formData.cedula}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                />
              </div>
              <div>
                <Label>Área/Servicio</Label>
                <Input
                  value={formData.area_servicio}
                  onChange={(e) => setFormData({ ...formData, area_servicio: e.target.value })}
                />
              </div>
            </div>

            {/* Módulos Historia Clínica */}
            <div className="border-2 border-teal-200 rounded-lg p-4">
              <h3 className="font-bold text-teal-900 mb-3">MÓDULOS HISTORIA CLÍNICA</h3>
              <table className="w-full text-sm">
                <thead className="bg-teal-100">
                  <tr>
                    <th className="p-2 text-left">Módulo</th>
                    {permisos.map(p => <th key={p} className="p-2 text-center w-16">{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.modulos_historia_clinica || {}).map((modulo) => (
                    <tr key={modulo} className="border-b">
                      <td className="p-2 capitalize">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</td>
                      {permisos.map((p) => (
                        <td key={p} className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={permisoHC[modulo]?.[p] === true}
                            onChange={(e) => togglePermiso(modulo, p, e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-teal-600"
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
              <div>
                <Label>Tipo de perfil</Label>
                <Input
                  value={formData.perfil_de}
                  onChange={(e) => setFormData({ ...formData, perfil_de: e.target.value })}
                  placeholder="Ej: Historia Clínica - Médico"
                />
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
            </div>

            {/* Firmas */}
            <div className="border-2 border-amber-200 rounded-lg p-4">
              <h3 className="font-bold text-amber-900 mb-3">FIRMAS DIGITALES</h3>
              
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

              {/* Firma Coordinador TIC */}
              <div className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                <h4 className="font-semibold text-purple-900 mb-2">Coordinador TIC</h4>
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
                      toast.success('Firma agregada', 'Coordinador TIC firmó correctamente');
                    }}
                    className="w-full"
                  >
                    ✍️ Firmar como Coordinador TIC
                  </Button>
                )}
              </div>
            </div>

            {/* Credenciales */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Login Asignado</Label>
                <Input
                  value={formData.login_asignado}
                  onChange={(e) => setFormData({ ...formData, login_asignado: e.target.value })}
                  placeholder="Usuario del sistema"
                />
              </div>
              <div>
                <Label>Clave Temporal</Label>
                <Input
                  type="password"
                  value={formData.clave_temporal}
                  onChange={(e) => setFormData({ ...formData, clave_temporal: e.target.value })}
                  placeholder="Contraseña temporal"
                />
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
