import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { useRef } from "react";

interface PDFHistoriaClinicaProps {
  solicitud: any;
  onClose: () => void;
}

export default function PDFHistoriaClinica({ solicitud, onClose }: PDFHistoriaClinicaProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formatearFecha = (fecha: any) => {
    if (!fecha) return '';
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };

  const datos = solicitud.datos || solicitud || {};
  
  // Debug: ver qué datos tenemos
  console.log('🏥 PDF Historia Clínica - Datos completos:', {
    solicitud,
    datos,
    firmas_raw: datos.firmas,
    capacitacion_hc_raw: datos.capacitacion_historia_clinica,
    capacitacion_epi_raw: datos.capacitacion_epidemiologia
  });
  
  // Parse datos si son strings
  const firmas = typeof datos.firmas === 'string' 
    ? JSON.parse(datos.firmas || '{}')
    : datos.firmas || {};

  const capacitacionHC = typeof datos.capacitacion_historia_clinica === 'string'
    ? JSON.parse(datos.capacitacion_historia_clinica || '{}')
    : datos.capacitacion_historia_clinica || datos.capacitacionHistoriaClinica || {};

  const capacitacionEpi = typeof datos.capacitacion_epidemiologia === 'string'
    ? JSON.parse(datos.capacitacion_epidemiologia || '{}')
    : datos.capacitacion_epidemiologia || datos.capacitacionEpidemiologia || {};

  const avalInst = typeof datos.aval_institucional === 'string'
    ? JSON.parse(datos.aval_institucional || '{}')
    : datos.aval_institucional || datos.avalInstitucional || {};

  // Obtener valores con fallback
  const nombreCompleto = solicitud.nombreCompleto || solicitud.nombre_completo || datos.nombre_completo || '';
  const cedula = solicitud.cedula || datos.cedula || '';
  const celular = datos.celular || '';
  const correoElectronico = datos.correo_electronico || datos.correoElectronico || '';
  const registroCodigo = datos.registro_codigo || datos.registroCodigo || '';
  const areaServicio = solicitud.area_servicio || datos.area_servicio || datos.areaOServicio || '';
  const especialidad = solicitud.especialidad || datos.especialidad || '';
  const observaciones = datos.observaciones || '';
  const perfil = solicitud.perfil || datos.perfil || 'Médico general';
  const perfilOtro = datos.perfil_otro || datos.perfilOtro || '';
  const tipoVinculacion = datos.tipo_vinculacion || datos.tipoVinculacion || 'Interno';
  const terminalAsignado = datos.terminal_asignado || datos.terminalAsignado || 'Tablet';
  const terminalOtro = datos.terminal_otro || datos.terminalOtro || '';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Botones de acción - No se imprimen */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center print:hidden z-10">
          <h2 className="text-lg font-bold text-slate-900">Formato Creación de Usuarios Historia Clínica Electrónica</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
            <Button size="sm" variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div ref={printRef} className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt' }}>
          {/* Encabezado */}
          <div className="border-2 border-black mb-4">
            <div className="bg-blue-900 text-white p-2 text-center">
              <h1 className="text-lg font-bold uppercase">FORMATO CREACIÓN DE USUARIOS HISTORIA CLÍNICA ELECTRÓNICA</h1>
            </div>
            
            <div className="grid grid-cols-4 border-t-2 border-black text-xs">
              <div className="border-r border-black p-2">
                <p className="font-bold">CÓDIGO:</p>
                <p>{datos.codigo_formato || datos.codigoFormato || 'FOR-GDI-SIS-003'}</p>
              </div>
              <div className="border-r border-black p-2">
                <p className="font-bold">VERSIÓN:</p>
                <p>{datos.version || '2'}</p>
              </div>
              <div className="border-r border-black p-2">
                <p className="font-bold">FECHA EMISIÓN:</p>
                <p>{datos.fecha_emision || datos.fechaEmision || '18/08/2021'}</p>
              </div>
              <div className="p-2">
                <p className="font-bold">FECHA SOLICITUD:</p>
                <p>{formatearFecha(solicitud.fechaSolicitud || solicitud.fecha_solicitud)}</p>
              </div>
            </div>
          </div>

          {/* 1. DATOS DEL SOLICITANTE */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">1. DATOS DEL SOLICITANTE</h2>
            </div>
            <div className="p-3">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">NOMBRE COMPLETO:</td>
                    <td className="border border-slate-400 p-2" colSpan={3}>{nombreCompleto}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">CÉDULA:</td>
                    <td className="border border-slate-400 p-2">{cedula}</td>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">CELULAR:</td>
                    <td className="border border-slate-400 p-2">{celular}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">CORREO ELECTRÓNICO:</td>
                    <td className="border border-slate-400 p-2" colSpan={3}>{correoElectronico}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">REGISTRO/CÓDIGO:</td>
                    <td className="border border-slate-400 p-2">{registroCodigo}</td>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">ÁREA/SERVICIO:</td>
                    <td className="border border-slate-400 p-2">{areaServicio}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">ESPECIALIDAD:</td>
                    <td className="border border-slate-400 p-2" colSpan={3}>{especialidad}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. PERFIL */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">2. PERFIL</h2>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Médico especialista', 'Médico residente', 'Médico general', 'Auditor', 'Enfermero jefe', 'Auxiliar de enfermería', 'Terapeuta', 'Otro'].map(p => (
                  <label key={p} className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 border-black ${perfil === p ? 'bg-black' : 'bg-white'}`}>
                      {perfil === p && <span className="text-white text-xs">✓</span>}
                    </div>
                    {p}
                  </label>
                ))}
              </div>
              {perfilOtro && (
                <div className="mt-2">
                  <p className="text-xs font-bold">Especifique:</p>
                  <p className="text-xs border-b border-slate-400 pb-1">{perfilOtro}</p>
                </div>
              )}
            </div>
          </div>

          {/* 3. TIPO DE VINCULACIÓN */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">3. TIPO DE VINCULACIÓN</h2>
            </div>
            <div className="p-3">
              <div className="flex gap-6 text-xs">
                <label className="flex items-center gap-2">
                  <div className={`w-4 h-4 border-2 border-black ${tipoVinculacion === 'Interno' ? 'bg-black' : 'bg-white'}`}>
                    {tipoVinculacion === 'Interno' && <span className="text-white text-xs">✓</span>}
                  </div>
                  Interno
                </label>
                <label className="flex items-center gap-2">
                  <div className={`w-4 h-4 border-2 border-black ${tipoVinculacion === 'Externo' ? 'bg-black' : 'bg-white'}`}>
                    {tipoVinculacion === 'Externo' && <span className="text-white text-xs">✓</span>}
                  </div>
                  Externo
                </label>
              </div>
            </div>
          </div>

          {/* 4. TERMINAL ASIGNADO */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">4. TERMINAL ASIGNADO</h2>
            </div>
            <div className="p-3">
              <div className="flex gap-6 text-xs">
                {['Tablet', 'Portátil', 'Otro'].map(t => (
                  <label key={t} className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 border-black ${terminalAsignado === t ? 'bg-black' : 'bg-white'}`}>
                      {terminalAsignado === t && <span className="text-white text-xs">✓</span>}
                    </div>
                    {t}
                  </label>
                ))}
              </div>
              {terminalOtro && (
                <div className="mt-2">
                  <p className="text-xs font-bold">Especifique:</p>
                  <p className="text-xs border-b border-slate-400 pb-1">{terminalOtro}</p>
                </div>
              )}
            </div>
          </div>

          {/* 5. CAPACITACIÓN HISTORIA CLÍNICA */}
          {Object.keys(capacitacionHC).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">5. CAPACITACIÓN EN HISTORIA CLÍNICA ELECTRÓNICA</h2>
              </div>
              <div className="p-3">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/3">CAPACITACIÓN REALIZADA:</td>
                      <td className="border border-slate-400 p-2">
                        <label className="flex items-center gap-2">
                          <div className={`w-4 h-4 border-2 border-black ${capacitacionHC.capacitacionRealizada || capacitacionHC.capacitacion_realizada ? 'bg-black' : 'bg-white'}`}>
                            {(capacitacionHC.capacitacionRealizada || capacitacionHC.capacitacion_realizada) && <span className="text-white text-xs">✓</span>}
                          </div>
                          Sí
                        </label>
                      </td>
                    </tr>
                    {(capacitacionHC.capacitacionRealizada || capacitacionHC.capacitacion_realizada) && (
                      <>
                        <tr>
                          <td className="border border-slate-400 p-2 font-bold bg-slate-100">NOMBRE CAPACITADOR:</td>
                          <td className="border border-slate-400 p-2">{capacitacionHC.nombreCapacitador || capacitacionHC.nombre_capacitador || ''}</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-400 p-2 font-bold bg-slate-100">FECHA CAPACITACIÓN:</td>
                          <td className="border border-slate-400 p-2">{formatearFecha(capacitacionHC.fechaCapacitacion || capacitacionHC.fecha_capacitacion)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CAPACITACIÓN EPIDEMIOLOGÍA */}
          {Object.keys(capacitacionEpi).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">6. CAPACITACIÓN EN EPIDEMIOLOGÍA (Solo médicos)</h2>
              </div>
              <div className="p-3">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/3">CAPACITACIÓN REALIZADA:</td>
                      <td className="border border-slate-400 p-2">
                        <label className="flex items-center gap-2">
                          <div className={`w-4 h-4 border-2 border-black ${capacitacionEpi.capacitacionRealizada || capacitacionEpi.capacitacion_realizada ? 'bg-black' : 'bg-white'}`}>
                            {(capacitacionEpi.capacitacionRealizada || capacitacionEpi.capacitacion_realizada) && <span className="text-white text-xs">✓</span>}
                          </div>
                          Sí
                        </label>
                      </td>
                    </tr>
                    {(capacitacionEpi.capacitacionRealizada || capacitacionEpi.capacitacion_realizada) && (
                      <>
                        <tr>
                          <td className="border border-slate-400 p-2 font-bold bg-slate-100">NOMBRE CAPACITADOR:</td>
                          <td className="border border-slate-400 p-2">{capacitacionEpi.nombreCapacitador || capacitacionEpi.nombre_capacitador || ''}</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-400 p-2 font-bold bg-slate-100">FECHA CAPACITACIÓN:</td>
                          <td className="border border-slate-400 p-2">{formatearFecha(capacitacionEpi.fechaCapacitacion || capacitacionEpi.fecha_capacitacion)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. AVAL INSTITUCIONAL */}
          {Object.keys(avalInst).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">7. AVAL INSTITUCIONAL</h2>
              </div>
              <div className="p-3">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/3">AVALADO POR:</td>
                      <td className="border border-slate-400 p-2">{avalInst.avaladoPor || avalInst.avalado_por || ''}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-bold bg-slate-100">CARGO:</td>
                      <td className="border border-slate-400 p-2">{avalInst.cargo || ''}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-2 font-bold bg-slate-100">FECHA:</td>
                      <td className="border border-slate-400 p-2">{formatearFecha(avalInst.fecha)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. OBSERVACIONES */}
          {observaciones && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">8. OBSERVACIONES</h2>
              </div>
              <div className="p-3">
                <p className="text-xs whitespace-pre-wrap">{observaciones}</p>
              </div>
            </div>
          )}

          {/* 9. FIRMAS Y AUTORIZACIONES */}
          {Object.keys(firmas).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">9. FIRMAS Y AUTORIZACIONES</h2>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(firmas).map(([cargo, firma]: [string, any]) => (
                    <div key={cargo} className="border-2 border-black p-2">
                      <p className="text-[10px] font-bold mb-1 uppercase text-center border-b border-black pb-1">
                        {cargo.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      
                      {/* Firma */}
                      <div className="h-16 flex items-center justify-center bg-slate-50 border border-black mb-1">
                        {firma.firma?.startsWith('FIRMA_TEXTO:') ? (
                          <p className="font-signature text-xl text-black">
                            {firma.firma.replace('FIRMA_TEXTO:', '')}
                          </p>
                        ) : firma.firma ? (
                          <img 
                            src={firma.firma} 
                            alt={`Firma ${cargo}`}
                            className="max-h-14 max-w-full object-contain"
                          />
                        ) : (
                          <p className="text-[10px] text-slate-400">Sin firma</p>
                        )}
                      </div>
                      
                      {/* Información */}
                      <div className="text-center space-y-0.5">
                        <div className="border-t border-black pt-0.5">
                          <p className="text-[10px] font-bold">{firma.usuario || 'Sin nombre'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-600">
                            {firma.fecha ? formatearFecha(firma.fecha) : 'Sin fecha'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 10. LOGIN CREADO POR */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">10. LOGIN CREADO POR (Gestión de la Información)</h2>
            </div>
            <div className="p-3">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">LOGIN ASIGNADO:</td>
                    <td className="border border-slate-400 p-2">{datos.login_creado_por || datos.loginCreadoPor || datos.login_asignado || '_________________'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 11. ESTADO */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">11. ESTADO DE LA SOLICITUD</h2>
            </div>
            <div className="p-3">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">ESTADO ACTUAL:</td>
                    <td className="border border-slate-400 p-2">
                      <span className={`font-bold px-2 py-1 rounded ${
                        solicitud.estado === 'Aprobado' ? 'bg-green-200 text-green-800' :
                        solicitud.estado === 'Rechazado' ? 'bg-red-200 text-red-800' :
                        solicitud.estado === 'En revisión' ? 'bg-blue-200 text-blue-800' :
                        'bg-amber-200 text-amber-800'
                      }`}>
                        {solicitud.estado}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">SOLICITADO POR:</td>
                    <td className="border border-slate-400 p-2">{solicitud.solicitadoPor || 'Sistema'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie de página */}
          <div className="border-t-2 border-black pt-2 mt-4">
            <div className="text-[10px] text-center text-slate-600">
              <p className="font-bold">SISTEMA HEFESTO - GESTIÓN DE USUARIOS</p>
              <p className="mt-1">Documento generado el {new Date().toLocaleString('es-CO')}</p>
              <p className="mt-1">ID Solicitud: SOL-{solicitud.id.toString().padStart(6, '0')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: letter;
            margin: 0.5cm;
          }
        }
        
        .font-signature {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
        }
      `}</style>
    </div>
  );
}
