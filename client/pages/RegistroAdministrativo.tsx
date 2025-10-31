import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FirmaDigital from "@/components/FirmaDigital";
import { Download, Send } from "lucide-react";
import { useState } from "react";
import { solicitudesAdministrativas } from "@/lib/api";
import type { FormularioAdministrativo, ModulosServinteAdministrativo, ModulosServinteFinanciero, OpcionesWeb, FirmasAdministrativo } from "@shared/types/formularios";

export default function RegistroAdministrativo() {
  const [formData, setFormData] = useState<Partial<FormularioAdministrativo>>({
    codigoFormato: 'FOR-GDI-SIS-004',
    version: '1',
    fechaEmision: '23/11/2020',
    fechaSolicitud: new Date().toLocaleDateString('es-CO'),
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
    
    if (!formData.aceptaResponsabilidad) {
      alert('Debe aceptar la responsabilidad');
      return;
    }

    setLoading(true);
    try {
      const response = await solicitudesAdministrativas.create(formData);
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
          <h1 className="text-xl font-bold">FORMATO CREACIÓN DE USUARIOS ADMINISTRATIVOS</h1>
          <p className="text-xs text-slate-600">FOR-GDI-SIS-004 | Versión 1 | Fecha emisión: 23/11/2020</p>
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
                  <td colSpan={2} className="border p-2 font-bold text-center">SERVINTE ADMINISTRATIVO (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(formData.modulosAdministrativos || {}).map((modulo) => (
                        <label key={modulo} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={(formData.modulosAdministrativos as any)?.[modulo]}
                            onCheckedChange={(checked) => handleModuloChange('administrativos', modulo, checked as boolean)}
                          />
                          <span className="text-xs capitalize">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Módulos SERVINTE FINANCIERO */}
                <tr className="bg-green-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">SERVINTE FINANCIERO (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(formData.modulosFinancieros || {}).map((modulo) => (
                        <label key={modulo} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={(formData.modulosFinancieros as any)?.[modulo]}
                            onCheckedChange={(checked) => handleModuloChange('financieros', modulo, checked as boolean)}
                          />
                          <span className="text-xs capitalize">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Tipo de permiso */}
                <tr className="bg-yellow-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">TIPO DE PERMISO</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="flex gap-6">
                      {[
                        { value: 'A', label: 'A = Anular' },
                        { value: 'C', label: 'C = Consultar' },
                        { value: 'M', label: 'M = Modificar' },
                        { value: 'B', label: 'B = Borrar' },
                      ].map((p) => (
                        <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={formData.tipoPermiso?.includes(p.value as any)}
                            onCheckedChange={(checked) => handlePermisoChange(p.value, checked as boolean)}
                          />
                          <span className="text-xs">{p.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-2">
                      <label className="text-xs">Perfil de:</label>
                      <Input
                        value={formData.perfilDe}
                        onChange={(e) => handleInputChange('perfilDe', e.target.value)}
                        className="h-7 text-xs mt-1"
                        placeholder="Especificar perfil"
                      />
                    </div>
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
                      <FirmaDigital
                        cargo={firma.label}
                        credencialRequerida={firma.credencial}
                        onFirmaCompleta={(firmaData, usuario) => handleFirma(firma.cargo, firmaData, usuario)}
                        firmaActual={(formData.firmas as any)?.[firma.cargo]}
                      />
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
    </Layout>
  );
}
