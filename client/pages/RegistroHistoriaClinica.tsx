import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FirmaDigital from "@/components/FirmaDigital";
import { Send } from "lucide-react";
import { useState } from "react";
import { solicitudesHistoriaClinica } from "@/lib/api";
import type { FormularioHistoriaClinica } from "@shared/types/formularios";

export default function RegistroHistoriaClinica() {
  const [formData, setFormData] = useState<Partial<FormularioHistoriaClinica>>({
    codigoFormato: 'FOR-GDI-SIS-003',
    version: '2',
    fechaEmision: '18/08/2021',
    fechaSolicitud: new Date().toLocaleDateString('es-CO'),
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
    
    if (!formData.aceptaResponsabilidad) {
      alert('Debe aceptar la responsabilidad');
      return;
    }

    setLoading(true);
    try {
      const response = await solicitudesHistoriaClinica.create(formData);
      alert('Solicitud creada exitosamente');
      console.log('Respuesta:', response.data);
    } catch (error: any) {
      console.error('Error:', error);
      alert('Error al crear solicitud: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold">FORMATO CREACIÓN DE USUARIOS HISTORIA CLÍNICA ELECTRÓNICA</h1>
          <p className="text-xs text-slate-600">FOR-GDI-SIS-003 | Versión 2 | Fecha emisión: 18/08/2021</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-0 overflow-hidden">
            <table className="w-full border-collapse text-xs">
              <tbody>
                {/* Encabezado */}
                <tr className="bg-slate-100 border-b">
                  <td className="border p-2 font-semibold w-48">Fecha de solicitud:</td>
                  <td className="border p-2">{formData.fechaSolicitud}</td>
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

                {/* Perfil */}
                <tr className="bg-green-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">PERFIL (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Médico especialista',
                        'Médico residente',
                        'Médico general',
                        'Auditor',
                        'Enfermero jefe',
                        'Auxiliar de enfermería',
                        'Terapeuta',
                        'Otro',
                      ].map((perfil) => (
                        <label key={perfil} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="perfil"
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
                        value={formData.perfilOtro}
                        onChange={(e) => handleInputChange('perfilOtro', e.target.value)}
                        className="h-7 text-xs mt-2"
                        placeholder="Especificar otro perfil"
                      />
                    )}
                  </td>
                </tr>

                {/* Tipo de vinculación */}
                <tr className="bg-yellow-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">TIPO DE VINCULACIÓN (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="flex gap-6">
                      {['Interno', 'Externo'].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="vinculacion"
                            checked={formData.tipoVinculacion === tipo}
                            onChange={() => handleInputChange('tipoVinculacion', tipo)}
                            className="w-4 h-4"
                          />
                          <span className="text-xs">{tipo}</span>
                        </label>
                      ))}
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
                        value={formData.terminalOtro}
                        onChange={(e) => handleInputChange('terminalOtro', e.target.value)}
                        className="h-7 text-xs mt-2"
                        placeholder="Especificar otro terminal"
                      />
                    )}
                  </td>
                </tr>

                {/* Capacitación Historia Clínica */}
                <tr className="bg-orange-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">CAPACITACIÓN EN HISTORIA CLÍNICA ELECTRÓNICA</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Capacitación realizada:</td>
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
                {formData.capacitacionHistoriaClinica?.capacitacionRealizada && (
                  <>
                    <tr>
                      <td className="border p-1 font-semibold">Nombre del capacitador:</td>
                      <td className="border p-0">
                        <Input
                          value={formData.capacitacionHistoriaClinica?.nombreCapacitador}
                          onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                            ...formData.capacitacionHistoriaClinica,
                            nombreCapacitador: e.target.value,
                          })}
                          className="border-0 rounded-none h-7 text-xs"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-1 font-semibold">Fecha de capacitación:</td>
                      <td className="border p-0">
                        <Input
                          type="date"
                          value={formData.capacitacionHistoriaClinica?.fechaCapacitacion}
                          onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                            ...formData.capacitacionHistoriaClinica,
                            fechaCapacitacion: e.target.value,
                          })}
                          className="border-0 rounded-none h-7 text-xs"
                        />
                      </td>
                    </tr>
                  </>
                )}

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
                    {formData.capacitacionEpidemiologia?.capacitacionRealizada && (
                      <>
                        <tr>
                          <td className="border p-1 font-semibold">Nombre del capacitador:</td>
                          <td className="border p-0">
                            <Input
                              value={formData.capacitacionEpidemiologia?.nombreCapacitador}
                              onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                                ...formData.capacitacionEpidemiologia,
                                nombreCapacitador: e.target.value,
                              })}
                              className="border-0 rounded-none h-7 text-xs"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-1 font-semibold">Fecha de capacitación:</td>
                          <td className="border p-0">
                            <Input
                              type="date"
                              value={formData.capacitacionEpidemiologia?.fechaCapacitacion}
                              onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                                ...formData.capacitacionEpidemiologia,
                                fechaCapacitacion: e.target.value,
                              })}
                              className="border-0 rounded-none h-7 text-xs"
                            />
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                )}

                {/* Aval Institucional */}
                <tr className="bg-indigo-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">AVAL INSTITUCIONAL (Obligatorio)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold">Avalado por:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.avalInstitucional?.avaladoPor}
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
                  <td className="border p-1 font-semibold">Cargo:</td>
                  <td className="border p-0">
                    <Input
                      value={formData.avalInstitucional?.cargo}
                      onChange={(e) => handleInputChange('avalInstitucional', {
                        ...formData.avalInstitucional,
                        cargo: e.target.value,
                      })}
                      className="border-0 rounded-none h-7 text-xs"
                      required
                    />
                  </td>
                </tr>

                {/* Firmas */}
                <tr className="bg-red-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">FIRMAS REQUERIDAS ({necesitaEpidemiologia ? '6' : '5'} firmas)</td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold text-xs">1. Capacitador historia clínica:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Capacitador historia clínica"
                      credencialRequerida="Capacitador de historia clínica"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('capacitadorHistoriaClinica', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.capacitadorHistoriaClinica}
                    />
                  </td>
                </tr>
                {necesitaEpidemiologia && (
                  <tr>
                    <td className="border p-1 font-semibold text-xs">2. Capacitador epidemiología:</td>
                    <td className="border p-1">
                      <FirmaDigital
                        cargo="Capacitador epidemiología"
                        credencialRequerida="Capacitador de epidemiología"
                        onFirmaCompleta={(firmaData, usuario) => handleFirma('capacitadorEpidemiologia', firmaData, usuario)}
                        firmaActual={(formData.firmas as any)?.capacitadorEpidemiologia}
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="border p-1 font-semibold text-xs">{necesitaEpidemiologia ? '3' : '2'}. Aval institucional:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Aval institucional"
                      credencialRequerida="Aval institucional"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('avalInstitucional', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.avalInstitucional}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold text-xs">{necesitaEpidemiologia ? '4' : '3'}. Jefe Gestión de la Información:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Jefe Gestión de la Información"
                      credencialRequerida="Jefe de Gestión de la Información"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('jefeGestionInformacion', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.jefeGestionInformacion}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold text-xs">{necesitaEpidemiologia ? '5' : '4'}. Talento Humano/Sistemas:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Talento Humano/Sistemas"
                      credencialRequerida="Jefe de Talento Humano"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('talentoHumanoOSistemas', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.talentoHumanoOSistemas}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 font-semibold text-xs">{necesitaEpidemiologia ? '6' : '5'}. Usuario solicitante:</td>
                  <td className="border p-1">
                    <FirmaDigital
                      cargo="Usuario solicitante"
                      onFirmaCompleta={(firmaData, usuario) => handleFirma('firmaUsuarioSolicitante', firmaData, usuario)}
                      firmaActual={(formData.firmas as any)?.firmaUsuarioSolicitante}
                    />
                  </td>
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
    </Layout>
  );
}
