import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FirmaDigital from "@/components/FirmaDigital";
import { Send } from "lucide-react";
import { useState } from "react";
import { solicitudesHistoriaClinica } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import type { FormularioHistoriaClinica } from "@shared/types/formularios";
 

export default function RegistroHistoriaClinica() {
  const { agregarSolicitud } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<FormularioHistoriaClinica>>({
    codigoFormato: 'FOR-GDI-SIS-003',
    version: '2',
    fechaEmision: '18/08/2021',
    fechaSolicitud: new Date().toLocaleString('es-CO', { hour12: false }),
    nombreCompleto: '',
    cedula: '',
    celular: '',
    correoElectronico: '',
    registroCodigo: '',
    areaOServicio: '',
    especialidad: '',
    observaciones: '',
    perfil: 'Médico general',
    tipoVinculacion: 'Interno',
    terminalAsignado: 'Tablet',
    capacitacionHistoriaClinica: {
      capacitacionRealizada: false,
    },
    avalInstitucional: {
      avaladoPor: '',
      cargo: '',
      firmaAvalador: '',
      fecha: '',
    },
    firmas: {},
    aceptaResponsabilidad: false,
  });

  const [loading, setLoading] = useState(false);
  // Fecha/hora controlada (solo hoy)
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const todayDate = `${yyyy}-${mm}-${dd}`;
  const [fechaDT, setFechaDT] = useState<string>(`${todayDate}T${hh}:${mi}`);
  // Diligenciamiento - Datos del usuario logueado (NO EDITABLES)
  const userDataStr = localStorage.getItem('user');
  const userData = userDataStr ? JSON.parse(userDataStr) : { email: 'admin@hefesto.local', name: 'Usuario Admin' };
  const loginUsuario = userData.email || 'admin@hefesto.local';
  const nombreDiligencia = userData.name || 'Usuario Admin';
  const fechaRegistro = new Date().toLocaleString('es-CO', { hour12: false });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const necesitaEpidemiologia = formData.perfil === 'Médico general' || formData.perfil === 'Médico especialista';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fechaFinal = fechaDT ? new Date(fechaDT) : new Date();
    const ahora = fechaFinal.toLocaleString('es-CO', { hour12: false });
    const payload: any = {
      ...formData,
      fechaSolicitud: ahora,
      loginUsuario,
      nombreDiligencia,
      fechaRegistro,
    };
    if (!formData.aceptaResponsabilidad) {
      toast.warning('Debe aceptar la responsabilidad', 'Por favor, marque la casilla de aceptación antes de continuar');
      return;
    }

    setLoading(true);
    try {
      // Guardar en contexto global (siempre)
      agregarSolicitud({
        tipo: 'Historia Clínica',
        nombreCompleto: formData.nombreCompleto || '',
        cedula: formData.cedula || '',
        especialidad: formData.especialidad,
        estado: 'Pendiente',
        solicitadoPor: 'Usuario actual',
        datos: payload
      });
      
      // Intentar enviar al backend (opcional)
      try {
        const response = await solicitudesHistoriaClinica.create(payload);
        console.log('Respuesta backend:', response.data);
      } catch (apiError) {
        console.log('Backend no disponible, guardado solo en local');
      }
      
      toast.success('Solicitud creada exitosamente', 'La solicitud de historia clínica ha sido enviada para aprobación');
      
      // Redirigir al dashboard
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
          <h1 className="text-xl font-bold">FORMATO CREACIÓN DE USUARIOS HISTORIA CLÍNICA ELECTRÓNICA</h1>
          <p className="text-xs text-slate-600">FOR-GDI-SIS-003 | Versión 2 | Fecha emisión: 18/08/2021</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="p-3 md:p-4 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full border-collapse text-[12px] [&_td]:p-1.5 [&_th]:p-2">
              <tbody>
                {/* Encabezado */}
                <tr className="bg-slate-100 border-b">
                  <td className="border p-2 font-semibold w-48">Fecha de solicitud:</td>
                  <td className="border p-2">
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
                  <td colSpan={2} className="border p-2 font-bold text-center">DATOS DEL SOLICITANTE</td>
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
                  <td className="border p-1 font-semibold">Celular:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.celular}
                      onChange={(e) => handleInputChange('celular', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Correo electrónico:</td>
                  <td className="border p-0">
                    <Input
                      type="email"
                      value={formData.correoElectronico}
                      onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Registro / Código:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.registroCodigo}
                      onChange={(e) => handleInputChange('registroCodigo', e.target.value)}
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
                  <td className="border p-1 font-semibold">Especialidad:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.especialidad}
                      onChange={(e) => handleInputChange('especialidad', e.target.value)}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Observaciones:</td>
                  <td className="border p-0">
                    <Textarea
                      value={formData.observaciones}
                      onChange={(e) => handleInputChange('observaciones', e.target.value)}
                      className="border-0 rounded-none text-xs min-h-16"
                    />
                  </td>
                </tr>

                {/* Perfil + Nota + Autor */}
                <tr className="bg-green-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">PERFIL Y AUTORIZACIÓN</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <div className="font-semibold text-xs mb-2">Perfil (marcar X)</div>
                        <div className="grid grid-cols-1 gap-2">
                          {['Médico General','Especialista','Enfermero Jefe','Auxiliar de Enfermería','Terapeuta','Otro'].map((perfil) => (
                            <label key={perfil} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.perfil === perfil}
                                onChange={() => handleInputChange('perfil', perfil)}
                                className="w-4 h-4"
                              />
                              <span className="text-xs">{perfil}</span>
                            </label>
                          ))}
                        </div>
                        {formData.perfil === 'Otro' && (
                          <Input
                            value={formData.perfilOtro || ''}
                            onChange={(e) => handleInputChange('perfilOtro', e.target.value)}
                            className="h-7 text-xs mt-2"
                            placeholder="Especificar otro perfil"
                          />
                        )}
                      </div>
                      <div className="text-xs bg-slate-50 p-2 rounded border border-slate-200">
                        <strong>Nota:</strong> Solo será autorizado el usuario que cuente con el aval de la Subgerencia o de la Coordinadora respectiva.
                      </div>
                      <div>
                        <div className="font-semibold text-xs mb-2">Autor</div>
                        <div className="flex flex-col gap-2">
                          {['Interno','Externo'].map((tipo) => (
                            <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="autor"
                                checked={formData.tipoVinculacion === tipo}
                                onChange={() => handleInputChange('tipoVinculacion', tipo)}
                                className="w-4 h-4"
                              />
                              <span className="text-xs">{tipo}</span>
                            </label>
                          ))}
                          {/* Solo Interno/Externo por tipado */}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Terminal asignado */}
                <tr className="bg-purple-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">TERMINAL ASIGNADO (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="flex gap-6">
                      {['Tablet', 'Portátil', 'Otro'].map((terminal) => (
                        <label key={terminal} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="terminal"
                            checked={formData.terminalAsignado === terminal}
                            onChange={() => handleInputChange('terminalAsignado', terminal)}
                            className="w-4 h-4"
                          />
                          <span className="text-xs">{terminal}</span>
                        </label>
                      ))}
                    </div>
                    {formData.terminalAsignado === 'Otro' && (
                      <Input
                        value={formData.terminalOtro || ''}
                        onChange={(e) => handleInputChange('terminalOtro', e.target.value)}
                        className="h-7 text-xs mt-2"
                        placeholder="Especificar otro terminal"
                      />
                    )}
                  </td>
                </tr>

                {/* Capacitaciones */}
                <tr className="bg-orange-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">CAPACITACIÓN EN HISTORIA CLÍNICA ELECTRÓNICA</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">¿Realizó la capacitación?</td>
                  <td className="border p-2">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={formData.capacitacionHistoriaClinica?.capacitacionRealizada === true}
                          onChange={() => handleInputChange('capacitacionHistoriaClinica', {
                            ...formData.capacitacionHistoriaClinica,
                            capacitacionRealizada: true,
                          })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={formData.capacitacionHistoriaClinica?.capacitacionRealizada === false}
                          onChange={() => handleInputChange('capacitacionHistoriaClinica', {
                            capacitacionRealizada: false,
                          })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">No</span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Nombre del capacitador:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.capacitacionHistoriaClinica?.nombreCapacitador || ''}
                      onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                        ...formData.capacitacionHistoriaClinica,
                        nombreCapacitador: e.target.value,
                      })}
                      disabled={formData.capacitacionHistoriaClinica?.capacitacionRealizada !== true}
                      className={`border-0 rounded-none h-8 text-sm ${formData.capacitacionHistoriaClinica?.capacitacionRealizada ? '' : 'opacity-50'}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Fecha de la capacitación:</td>
                  <td className="border p-0">
                    <Input
                      type="date"
                      value={formData.capacitacionHistoriaClinica?.fechaCapacitacion || ''}
                      onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                        ...formData.capacitacionHistoriaClinica,
                        fechaCapacitacion: e.target.value,
                      })}
                      disabled={formData.capacitacionHistoriaClinica?.capacitacionRealizada !== true}
                      className={`border-0 rounded-none h-8 text-sm ${formData.capacitacionHistoriaClinica?.capacitacionRealizada ? '' : 'opacity-50'}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Firma del capacitador:</td>
                  <td className="border p-1">
                    <div className={formData.capacitacionHistoriaClinica?.capacitacionRealizada ? '' : 'opacity-50 pointer-events-none'}>
                      <FirmaDigital
                        cargo="Capacitador historia clínica"
                        credencialRequerida="Capacitador de historia clínica"
                        onFirmaCompleta={(f,u) => handleFirma('capacitadorHistoriaClinica', f, u)}
                        firmaActual={(formData.firmas as any)?.capacitadorHistoriaClinica}
                      />
                    </div>
                  </td>
                </tr>

                {/* Capacitación Epidemiología (solo para médicos) */}
                {necesitaEpidemiologia && (
                  <>
                    <tr className="bg-red-50">
                      <td colSpan={2} className="border p-2 font-bold text-center">CAPACITACIÓN EN EPIDEMIOLOGÍA (Solo médicos generales/especialistas)</td>
                    </tr>
                    <tr>
                      <td className="border p-1 font-semibold">Capacitación realizada:</td>
                      <td className="border p-2">
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={formData.capacitacionEpidemiologia?.capacitacionRealizada === true}
                              onChange={() => handleInputChange('capacitacionEpidemiologia', {
                                ...formData.capacitacionEpidemiologia,
                                capacitacionRealizada: true,
                              })}
                              className="w-4 h-4"
                            />
                            <span className="text-xs">Sí</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={formData.capacitacionEpidemiologia?.capacitacionRealizada === false}
                              onChange={() => handleInputChange('capacitacionEpidemiologia', {
                                capacitacionRealizada: false,
                              })}
                              className="w-4 h-4"
                            />
                            <span className="text-xs">No</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-1 font-semibold">Nombre del capacitador:</td>
                      <td className="border p-0">
                        <Input
                          value={formData.capacitacionEpidemiologia?.nombreCapacitador || ''}
                          onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                            ...formData.capacitacionEpidemiologia,
                            nombreCapacitador: e.target.value,
                          })}
                          disabled={formData.capacitacionEpidemiologia?.capacitacionRealizada !== true}
                          className={`border-0 rounded-none h-8 text-sm ${formData.capacitacionEpidemiologia?.capacitacionRealizada ? '' : 'opacity-50'}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-1 font-semibold">Fecha de la capacitación:</td>
                      <td className="border p-0">
                        <Input
                          type="date"
                          value={formData.capacitacionEpidemiologia?.fechaCapacitacion || ''}
                          onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                            ...formData.capacitacionEpidemiologia,
                            fechaCapacitacion: e.target.value,
                          })}
                          disabled={formData.capacitacionEpidemiologia?.capacitacionRealizada !== true}
                          className={`border-0 rounded-none h-8 text-sm ${formData.capacitacionEpidemiologia?.capacitacionRealizada ? '' : 'opacity-50'}`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-1 font-semibold">Firma del capacitador:</td>
                      <td className="border p-1">
                        <div className={formData.capacitacionEpidemiologia?.capacitacionRealizada ? '' : 'opacity-50 pointer-events-none'}>
                          <FirmaDigital
                            cargo="Capacitador epidemiología"
                            credencialRequerida="Capacitador de epidemiología"
                            onFirmaCompleta={(f,u) => handleFirma('capacitadorEpidemiologia', f, u)}
                            firmaActual={(formData.firmas as any)?.capacitadorEpidemiologia}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                )}

                {/* Aval y Firma */}
                <tr className="bg-indigo-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">AVAL Y FIRMA</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Avalado por (nombre completo):</td>
                  <td className="border p-0">
                    <Input
                      value={formData.avalInstitucional?.avaladoPor || ''}
                      onChange={(e) => handleInputChange('avalInstitucional', {
                        ...formData.avalInstitucional,
                        avaladoPor: e.target.value,
                      })}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Firma digital (aval):</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Aval institucional"
                      credencialRequerida="Aval institucional"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('avalInstitucional', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.avalInstitucional}
                    />
                  </td>
                </tr>

                {/* Términos y Condiciones */}
                <tr className="bg-slate-50">
                  <td colSpan={2} className="border p-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <Checkbox
                        checked={formData.aceptaResponsabilidad}
                        onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                      />
                      <span className="text-xs">
                        <strong>Términos y Condiciones:</strong> Declaro que la información registrada es verídica y que cuento con las autorizaciones requeridas para ejercer mis funciones dentro de la institución.
                      </span>
                    </label>
                  </td>
                </tr>

                {/* Firma del usuario solicitante */}
                <tr>
                  <td className="border p-1 font-semibold">Firma del usuario solicitante:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Usuario solicitante"
                      onFirmaCompleta={(f,u) => handleFirma('firmaUsuarioSolicitante', f, u)}
                      firmaActual={(formData.firmas as any)?.firmaUsuarioSolicitante}
                    />
                  </td>
                </tr>

                {/* Registro de diligenciamiento */}
                <tr className="bg-slate-100">
                  <td colSpan={2} className="border p-2 font-bold text-center">REGISTRO DE DILIGENCIAMIENTO</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Login del usuario:</td>
                  <td className="border p-0">
                    <Input 
                      value={loginUsuario} 
                      readOnly 
                      className="border-0 rounded-none h-7 text-xs bg-slate-50 cursor-not-allowed" 
                      title="Este campo se llena automáticamente del usuario logueado"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Nombre de quien diligencia:</td>
                  <td className="border p-0">
                    <Input 
                      value={nombreDiligencia} 
                      readOnly 
                      className="border-0 rounded-none h-7 text-xs bg-slate-50 cursor-not-allowed" 
                      title="Este campo se llena automáticamente del usuario logueado"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Fecha de registro:</td>
                  <td className="border p-1 text-xs">{fechaRegistro}</td>
                </tr>

                {/* Declaración */}
                <tr className="bg-slate-50">
                  <td colSpan={2} className="border p-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <Checkbox
                        checked={formData.aceptaResponsabilidad}
                        onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                      />
                      <span className="text-xs">
                        <strong>DECLARACIÓN:</strong> Acepto la responsabilidad de hacer buen uso del usuario y contraseña que me sean asignados. 
                        Entiendo que son personales e intransferibles.
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
