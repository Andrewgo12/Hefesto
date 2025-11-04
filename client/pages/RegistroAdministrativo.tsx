import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FirmaDigital from "@/components/FirmaDigital";
import { Download, Send } from "lucide-react";
import { useState } from "react";
import { solicitudesAdministrativas } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import type { FormularioAdministrativo, ModulosServinteAdministrativo, ModulosServinteFinanciero, OpcionesWeb, FirmasAdministrativo } from "@shared/types/formularios";

export default function RegistroAdministrativo() {
  const { agregarSolicitud } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<FormularioAdministrativo>>({
    codigoFormato: 'FOR-GDI-SIS-004',
    version: '1',
    fechaEmision: '23/11/2020',
    fechaSolicitud: new Date().toLocaleString('es-CO', { hour12: false }),
    nombreCompleto: '',
    cedula: '',
    cargo: '',
    areaOServicio: '',
    telefonoExtension: '',
    tipoVinculacion: 'Planta',
    modulosAdministrativos: {
      facturacion: false,
      anticipos: false,
      farmacia: false,
      suministros: false,
      cartera: false,
      glosas: false,
      admisiones: false,
      ayudasDiagnosticas: false,
      citasMedicas: false,
      cirugia: false,
      rips: false,
      anexos: false,
    },
    modulosFinancieros: {
      presupuesto: false,
      contabilidad: false,
      activosFijos: false,
      cuentasPorPagar: false,
      cajaYBancos: false,
      costos: false,
      administracionDocumentos: false,
    },
    tipoPermiso: [],
    perfilDe: '',
    opcionesWeb: {
      internet: false,
      correoElectronico: false,
      transferenciaArchivos: false,
      otros: '',
    },
    firmas: {},
    aceptaResponsabilidad: false,
  });

  const [loading, setLoading] = useState(false);
  const [descripcionPerfil, setDescripcionPerfil] = useState<string>('');

  // Fecha/hora actual (solo hoy permitido)
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const todayDate = `${yyyy}-${mm}-${dd}`;
  const nowDT = `${todayDate}T${hh}:${mi}`;
  const [fechaDT, setFechaDT] = useState<string>(nowDT);

  // Matriz de permisos por módulo (A,C,M,B)
  const permisos = ["A","C","M","B"] as const;
  const [permisoAdmin, setPermisoAdmin] = useState<Record<string, Record<typeof permisos[number], boolean>>>(() => {
    const base: Record<string, Record<typeof permisos[number], boolean>> = {};
    Object.keys(formData.modulosAdministrativos || {}).forEach((k) => {
      base[k] = { A: false, C: false, M: false, B: false };
    });
    return base;
  });
  const [permisoFin, setPermisoFin] = useState<Record<string, Record<typeof permisos[number], boolean>>>(() => {
    const base: Record<string, Record<typeof permisos[number], boolean>> = {};
    Object.keys(formData.modulosFinancieros || {}).forEach((k) => {
      base[k] = { A: false, C: false, M: false, B: false };
    });
    return base;
  });

  const togglePermiso = (
    tipo: 'admin' | 'fin',
    modulo: string,
    permiso: typeof permisos[number],
    value: boolean
  ) => {
    if (tipo === 'admin') {
      setPermisoAdmin((prev) => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value },
      }));
    } else {
      setPermisoFin((prev) => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value },
      }));
    }
  };

  // Selección especial para 'anexos': 1 / 2 / 3
  const [anexosNivel, setAnexosNivel] = useState<'1' | '2' | '3' | ''>('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuloChange = (tipo: 'administrativos' | 'financieros', modulo: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [`modulos${tipo === 'administrativos' ? 'Administrativos' : 'Financieros'}`]: {
        ...prev[tipo === 'administrativos' ? 'modulosAdministrativos' : 'modulosFinancieros'],
        [modulo]: checked,
      },
    }));
  };

  const handlePermisoChange = (permiso: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tipoPermiso: checked
        ? [...(prev.tipoPermiso || []), permiso as any]
        : (prev.tipoPermiso || []).filter(p => p !== permiso),
    }));
  };

  const handleFirma = (cargo: string, firma: string, usuario: string) => {
    setFormData(prev => ({
      ...prev,
      firmas: {
        ...prev.firmas,
        [cargo]: usuario,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Refrescar fecha/hora exacta al momento de crear la solicitud
    const fechaFinal = fechaDT ? new Date(fechaDT) : new Date();
    const ahora = fechaFinal.toLocaleString('es-CO', { hour12: false });
    const payload = { 
      ...formData, 
      fechaSolicitud: ahora,
      permisosAdministrativos: permisoAdmin,
      permisosFinancieros: permisoFin,
      anexosNivel: anexosNivel
    } as any;

    if (!formData.aceptaResponsabilidad) {
      toast.warning('Debe aceptar la responsabilidad', 'Por favor, marque la casilla de aceptación antes de continuar');
      return;
    }

    setLoading(true);
    try {
      // Guardar en contexto global (siempre)
      agregarSolicitud({
        tipo: 'Administrativo',
        nombreCompleto: formData.nombreCompleto || '',
        cedula: formData.cedula || '',
        cargo: formData.cargo,
        estado: 'Pendiente',
        solicitadoPor: 'Usuario actual',
        datos: payload
      });
      
      // Intentar enviar al backend (opcional)
      try {
        const response = await solicitudesAdministrativas.create(payload);
        console.log('Respuesta backend:', response.data);
      } catch (apiError) {
        console.log('Backend no disponible, guardado solo en local');
      }
      
      toast.success('Solicitud creada exitosamente', 'La solicitud ha sido enviada para aprobación');
      
      // Redirigir al dashboard después de 1.5 segundos
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Error al crear solicitud', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto p-4 max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold">FORMATO CREACIÓN DE USUARIOS ADMINISTRATIVOS</h1>
          <p className="text-xs text-slate-600">FOR-GDI-SIS-004 | Versión 1 | Fecha emisión: 23/11/2020</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="p-3 md:p-4 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full border-collapse text-[12px] [&_td]:p-1.5 [&_th]:p-2 [&_input]:h-8 [&_input]:text-sm">
              <tbody>
                {/* Encabezado */}
                <tr className="bg-slate-100 border-b">
                  <td className="border p-1 font-semibold w-48">Fecha de solicitud:</td>
                  <td className="border p-1">
                    <input
                      type="datetime-local"
                      value={fechaDT}
                      onChange={(e) => setFechaDT(e.target.value)}
                      min={`${todayDate}T00:00`}
                      max={`${todayDate}T23:59`}
                      className="h-7 text-[11px] border border-slate-300 rounded px-2"
                      required
                    />
                  </td>
                </tr>

                {/* Datos del solicitante */}
                <tr className="bg-blue-50">
                  <td colSpan={2} className="border p-1 font-bold text-center">DATOS DEL SOLICITANTE</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Nombre completo:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.nombreCompleto}
                      onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Cédula:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.cedula}
                      onChange={(e) => handleInputChange('cedula', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Cargo:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.cargo}
                      onChange={(e) => handleInputChange('cargo', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Área o servicio:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.areaOServicio}
                      onChange={(e) => handleInputChange('areaOServicio', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Teléfono / Extensión:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.telefonoExtension}
                      onChange={(e) => handleInputChange('telefonoExtension', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>

                {/* Tipo de vinculación */}
                <tr className="bg-blue-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">TIPO DE VINCULACIÓN (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="flex gap-6">
                      {['Planta', 'Agremiado', 'Contrato'].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="vinculacion"
                            checked={formData.tipoVinculacion === tipo}
                            onChange={() => handleInputChange('tipoVinculacion', tipo)}
                            className="w-4 h-4"
                          />
                          <span>{tipo}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Módulos SERVINTE ADMINISTRATIVO */}
                <tr className="bg-green-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">SERVINTE ADMINISTRATIVO - Permisos por módulo (A=Anular, C=Consultar, M=Modificar, B=Borrar)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-0">
                    <table className="w-full text-[11px]">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-2 text-left">Módulo</th>
                          {permisos.map(p => (
                            <th key={p} className="p-1 text-center w-14">{p}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(formData.modulosAdministrativos || {}).map((modulo) => (
                          <tr key={modulo} className="border-t">
                            <td className="p-1 capitalize flex items-center gap-2">
                              <Checkbox
                                checked={(formData.modulosAdministrativos as any)?.[modulo]}
                                onCheckedChange={(checked) => handleModuloChange('administrativos', modulo, checked as boolean)}
                              />
                              <span>{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                            </td>
                            {modulo === 'anexos' ? (
                              <td colSpan={4} className="p-0.5">
                                <div className="flex items-center gap-3 text-[10px]">
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="anexosNivel" value="1" checked={anexosNivel==='1'} onChange={() => setAnexosNivel('1')} />
                                    <span>1</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="anexosNivel" value="2" checked={anexosNivel==='2'} onChange={() => setAnexosNivel('2')} />
                                    <span>2</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="anexosNivel" value="3" checked={anexosNivel==='3'} onChange={() => setAnexosNivel('3')} />
                                    <span>3</span>
                                  </label>
                                </div>
                              </td>
                            ) : (
                              permisos.map((p) => (
                                <td key={p} className="p-2 text-center">
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={!!permisoAdmin[modulo]?.[p]}
                                    onChange={(e) => togglePermiso('admin', modulo, p, e.target.checked)}
                                  />
                                </td>
                              ))
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* Módulos SERVINTE FINANCIERO */}
                <tr className="bg-green-50">
                  <td colSpan={2} className="border p-1 font-bold text-center">SERVINTE FINANCIERO - Permisos por módulo (A=Anular, C=Consultar, M=Modificar, B=Borrar)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-0">
                    <table className="w-full text-[11px]">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-2 text-left">Módulo</th>
                          {permisos.map(p => (
                            <th key={p} className="p-2 text-center w-16">{p}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(formData.modulosFinancieros || {}).map((modulo) => (
                          <tr key={modulo} className="border-t">
                            <td className="p-2 capitalize flex items-center gap-2">
                              <Checkbox
                                checked={(formData.modulosFinancieros as any)?.[modulo]}
                                onCheckedChange={(checked) => handleModuloChange('financieros', modulo, checked as boolean)}
                              />
                              <span>{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                            </td>
                            {permisos.map((p) => (
                              <td key={p} className="p-2 text-center">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4"
                                  checked={!!permisoFin[modulo]?.[p]}
                                  onChange={(e) => togglePermiso('fin', modulo, p, e.target.checked)}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* Tipo de perfil */}
                <tr className="bg-yellow-50">
                  <td colSpan={2} className="border p-1 font-bold text-center">TIPO DE PERFIL A CREAR</td>
                </tr>
                <tr>
                  <td className="border p-1 w-64 text-[10px] font-semibold">Tipo de perfil:</td>
                  <td className="border p-1">
                    <Input
                      value={formData.perfilDe}
                      onChange={(e) => handleInputChange('perfilDe', e.target.value)}
                      className="h-6 text-[10px]"
                      placeholder="Ej: Administrativo - Supervisor"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 w-64 text-[10px] font-semibold">Descripción del perfil (para qué es):</td>
                  <td className="border p-1">
                    <Input
                      value={descripcionPerfil}
                      onChange={(e) => setDescripcionPerfil(e.target.value)}
                      className="h-6 text-[10px]"
                      placeholder="Breve descripción del uso del perfil"
                    />
                  </td>
                </tr>

                {/* Opciones Web */}
                <tr className="bg-purple-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">OPCIONES WEB (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="space-y-2">
                      <div className="flex gap-6">
                        {['internet', 'correoElectronico', 'transferenciaArchivos'].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={(formData.opcionesWeb as any)?.[opt]}
                              onCheckedChange={(checked) => handleInputChange('opcionesWeb', {
                                ...formData.opcionesWeb,
                                [opt]: checked,
                              })}
                            />
                            <span className="text-xs capitalize">{opt.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                          </label>
                        ))}
                      </div>
                      <div>
                        <label className="text-xs">Otros:</label>
                        <Input
                          value={formData.opcionesWeb?.otros}
                          onChange={(e) => handleInputChange('opcionesWeb', {
                            ...formData.opcionesWeb,
                            otros: e.target.value,
                          })}
                          className="h-7 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Firmas */}
                <tr className="bg-red-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">Vo. Bo. Y FIRMAS (5 firmas requeridas)</td>
                </tr>
                {[
                  { cargo: 'jefeInmediato', label: '1. Jefe inmediato', credencial: 'Jefe inmediato' },
                  { cargo: 'jefeTalentoHumano', label: '2. Jefe de Talento Humano', credencial: 'Jefe de Talento Humano' },
                  { cargo: 'jefeGestionInformacion', label: '3. Jefe de Gestión de la Información', credencial: 'Jefe de Gestión de la Información' },
                  { cargo: 'coordinadorFacturacionOSubgerenteFinanciero', label: '4. Coordinador de Facturación o Subgerente Financiero', credencial: 'Coordinador de Facturación o Subgerente Financiero' },
                  { cargo: 'firmaUsuarioSolicitante', label: '5. Firma del usuario solicitante', credencial: undefined },
                ].map((firma) => (
                  <tr key={firma.cargo}>
                    <td className="border p-1 font-semibold text-xs">{firma.label}:</td>
                    <td className="border p-1">
                      <div className="flex items-center gap-3">
                        <FirmaDigital
                          cargo={firma.label}
                          credencialRequerida={firma.credencial}
                          onFirmaCompleta={(firmaData, usuario) => handleFirma(firma.cargo, firmaData, usuario)}
                          firmaActual={(formData.firmas as any)?.[firma.cargo]}
                        />
                        {(formData.firmas as any)?.[firma.cargo] ? (
                          <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] border border-green-200">Firma cargada</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] border border-slate-200">Pendiente</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Declaración */}
                <tr className="bg-slate-50">
                  <td colSpan={2} className="border p-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <Checkbox
                        checked={formData.aceptaResponsabilidad}
                        onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                      />
                      <span className="text-xs">
                        <strong>DECLARACIÓN:</strong> Acepto la responsabilidad de hacer buen uso del usuario y contraseña asignados, 
                        entendiendo que son personales e intransferibles.
                      </span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="flex gap-3 mt-4">
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
              Limpiar
            </Button>
          </div>
        </form>
      </div>
  );
}
