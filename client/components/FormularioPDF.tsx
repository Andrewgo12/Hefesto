import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { useRef } from "react";

interface FormularioPDFProps {
  solicitud: any;
  onClose: () => void;
}

export default function FormularioPDF({ solicitud, onClose }: FormularioPDFProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Trigger browser print dialog with "Save as PDF" option
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

  const esAdministrativo = solicitud.tipo === 'Administrativo';
  const datos = solicitud.datos || solicitud || {};

  // Parse firmas si es string
  const firmas = typeof datos.firmas === 'string' 
    ? JSON.parse(datos.firmas || '{}')
    : datos.firmas || {};

  // Parse módulos si es string
  const modulosAdministrativos = typeof datos.modulos_administrativos === 'string'
    ? JSON.parse(datos.modulos_administrativos || '{}')
    : datos.modulos_administrativos || {};

  const modulosFinancieros = typeof datos.modulos_financieros === 'string'
    ? JSON.parse(datos.modulos_financieros || '{}')
    : datos.modulos_financieros || {};

  // Obtener valores con fallback
  const nombreCompleto = solicitud.nombreCompleto || solicitud.nombre_completo || datos.nombre_completo || '';
  const cedula = solicitud.cedula || datos.cedula || '';
  const cargo = solicitud.cargo || datos.cargo || '';
  const areaServicio = solicitud.area_servicio || datos.area_servicio || '';
  const perfil = solicitud.perfil || datos.perfil || '';
  const especialidad = solicitud.especialidad || datos.especialidad || '';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Botones de acción - No se imprimen */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center print:hidden z-10">
          <h2 className="text-lg font-bold text-slate-900">Vista Previa - Formato de Solicitud</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contenido del formulario - Se imprime */}
        <div ref={printRef} className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
          {/* Encabezado */}
          <div className="border-2 border-slate-800 mb-4">
            <div className="bg-blue-900 text-white p-3 text-center">
              <h1 className="text-xl font-bold uppercase">
                {esAdministrativo 
                  ? 'FORMATO CREACIÓN DE USUARIOS ADMINISTRATIVOS' 
                  : 'FORMATO CREACIÓN DE USUARIOS HISTORIA CLÍNICA ELECTRÓNICA'}
              </h1>
              <p className="text-sm mt-1">SISTEMA HEFESTO - GESTIÓN DE USUARIOS</p>
            </div>
            
            <div className="grid grid-cols-3 border-t-2 border-slate-800">
              <div className="border-r border-slate-800 p-2">
                <p className="text-xs font-bold">CÓDIGO:</p>
                <p className="text-sm">SOL-{solicitud.id.toString().padStart(6, '0')}</p>
              </div>
              <div className="border-r border-slate-800 p-2">
                <p className="text-xs font-bold">VERSIÓN:</p>
                <p className="text-sm">1.0</p>
              </div>
              <div className="p-2">
                <p className="text-xs font-bold">FECHA:</p>
                <p className="text-sm">{formatearFecha(solicitud.fechaSolicitud)}</p>
              </div>
            </div>
          </div>

          {/* Información del Solicitante */}
          <div className="border-2 border-slate-800 mb-4">
            <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
              <h2 className="font-bold text-sm uppercase">1. INFORMACIÓN DEL SOLICITANTE</h2>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs font-bold mb-1">NOMBRE COMPLETO:</p>
                  <p className="text-sm border-b border-slate-400 pb-1">{nombreCompleto}</p>
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">CÉDULA:</p>
                  <p className="text-sm border-b border-slate-400 pb-1">{cedula}</p>
                </div>
              </div>
              
              {esAdministrativo ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold mb-1">CARGO:</p>
                    <p className="text-sm border-b border-slate-400 pb-1">{cargo || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1">ÁREA/SERVICIO:</p>
                    <p className="text-sm border-b border-slate-400 pb-1">{areaServicio || '-'}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold mb-1">PERFIL:</p>
                    <p className="text-sm border-b border-slate-400 pb-1">{perfil || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1">ESPECIALIDAD:</p>
                    <p className="text-sm border-b border-slate-400 pb-1">{especialidad || '-'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Permisos y Módulos */}
          {esAdministrativo && (
            <>
              {/* Módulos Administrativos */}
              {Object.keys(modulosAdministrativos).length > 0 && (
                <div className="border-2 border-slate-800 mb-4">
                  <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
                    <h2 className="font-bold text-sm uppercase">2. MÓDULOS ADMINISTRATIVOS</h2>
                  </div>
                  <div className="p-3">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-400 p-2 text-left font-bold">MÓDULO</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">ADICIONAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">CONSULTAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">MODIFICAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">BORRAR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(modulosAdministrativos).map(([modulo, permisos]: [string, any]) => (
                          <tr key={modulo}>
                            <td className="border border-slate-400 p-2 capitalize">{modulo.replace(/_/g, ' ')}</td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.adicionar ? 'bg-green-500' : 'bg-white'}`}>
                                  {permisos.adicionar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.consultar ? 'bg-blue-500' : 'bg-white'}`}>
                                  {permisos.consultar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.modificar ? 'bg-amber-500' : 'bg-white'}`}>
                                  {permisos.modificar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.borrar ? 'bg-red-500' : 'bg-white'}`}>
                                  {permisos.borrar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Módulos Financieros */}
              {Object.keys(modulosFinancieros).length > 0 && (
                <div className="border-2 border-slate-800 mb-4">
                  <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
                    <h2 className="font-bold text-sm uppercase">3. MÓDULOS FINANCIEROS</h2>
                  </div>
                  <div className="p-3">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-400 p-2 text-left font-bold">MÓDULO</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">ADICIONAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">CONSULTAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">MODIFICAR</th>
                          <th className="border border-slate-400 p-2 text-center font-bold w-20">BORRAR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(modulosFinancieros).map(([modulo, permisos]: [string, any]) => (
                          <tr key={modulo}>
                            <td className="border border-slate-400 p-2 capitalize">{modulo.replace(/_/g, ' ')}</td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.adicionar ? 'bg-green-500' : 'bg-white'}`}>
                                  {permisos.adicionar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.consultar ? 'bg-blue-500' : 'bg-white'}`}>
                                  {permisos.consultar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.modificar ? 'bg-amber-500' : 'bg-white'}`}>
                                  {permisos.modificar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                            <td className="border border-slate-400 p-2 text-center">
                              <div className="flex justify-center">
                                <div className={`w-4 h-4 border-2 border-slate-800 ${permisos.borrar ? 'bg-red-500' : 'bg-white'}`}>
                                  {permisos.borrar && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Permisos Historia Clínica */}
          {!esAdministrativo && datos.permisos_historia_clinica && (
            <div className="border-2 border-slate-800 mb-4">
              <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
                <h2 className="font-bold text-sm uppercase">2. PERMISOS HISTORIA CLÍNICA</h2>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {Object.entries(datos.permisos_historia_clinica).map(([permiso, valor]: [string, any]) => (
                    <div key={permiso} className="flex items-center gap-2 border-b border-slate-300 pb-2">
                      <div className={`w-4 h-4 border-2 border-slate-800 flex items-center justify-center ${valor ? 'bg-green-500' : 'bg-white'}`}>
                        {valor && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="capitalize">{permiso.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Firmas Digitales */}
          {Object.keys(firmas).length > 0 && (
            <div className="border-2 border-slate-800 mb-4">
              <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
                <h2 className="font-bold text-sm uppercase">
                  {esAdministrativo ? '4. FIRMAS Y AUTORIZACIONES' : '3. FIRMAS Y AUTORIZACIONES'}
                </h2>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(firmas).map(([cargo, firma]: [string, any]) => (
                    <div key={cargo} className="border-2 border-slate-400 p-3">
                      <p className="text-xs font-bold mb-2 uppercase text-center border-b border-slate-400 pb-1">
                        {cargo.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      
                      {/* Firma */}
                      <div className="h-20 flex items-center justify-center bg-slate-50 border border-slate-300 mb-2">
                        {firma.firma?.startsWith('FIRMA_TEXTO:') ? (
                          <p className="font-signature text-2xl text-slate-800">
                            {firma.firma.replace('FIRMA_TEXTO:', '')}
                          </p>
                        ) : firma.firma ? (
                          <img 
                            src={firma.firma} 
                            alt={`Firma ${cargo}`}
                            className="max-h-16 max-w-full object-contain"
                          />
                        ) : (
                          <p className="text-xs text-slate-400">Sin firma</p>
                        )}
                      </div>
                      
                      {/* Información */}
                      <div className="text-center space-y-1">
                        <div className="border-t border-slate-400 pt-1">
                          <p className="text-xs font-bold">{firma.usuario || 'Sin nombre'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-600">
                            Fecha: {firma.fecha ? formatearFecha(firma.fecha) : 'Sin fecha'}
                          </p>
                          <p className="text-[10px] text-slate-600">
                            Hora: {firma.fecha ? new Date(firma.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Estado y Observaciones */}
          <div className="border-2 border-slate-800 mb-4">
            <div className="bg-slate-200 p-2 border-b-2 border-slate-800">
              <h2 className="font-bold text-sm uppercase">
                {esAdministrativo ? '5. ESTADO Y OBSERVACIONES' : '4. ESTADO Y OBSERVACIONES'}
              </h2>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs font-bold mb-1">ESTADO ACTUAL:</p>
                  <p className={`text-sm font-bold px-3 py-1 inline-block rounded ${
                    solicitud.estado === 'Aprobado' ? 'bg-green-200 text-green-800' :
                    solicitud.estado === 'Rechazado' ? 'bg-red-200 text-red-800' :
                    solicitud.estado === 'En revisión' ? 'bg-blue-200 text-blue-800' :
                    'bg-amber-200 text-amber-800'
                  }`}>
                    {solicitud.estado}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold mb-1">SOLICITADO POR:</p>
                  <p className="text-sm border-b border-slate-400 pb-1">{solicitud.solicitadoPor || 'Sistema'}</p>
                </div>
              </div>
              
              {datos.observaciones && (
                <div>
                  <p className="text-xs font-bold mb-1">OBSERVACIONES:</p>
                  <div className="border border-slate-400 p-2 min-h-[60px] text-xs bg-slate-50">
                    {datos.observaciones}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pie de página */}
          <div className="border-t-2 border-slate-800 pt-3 mt-6">
            <div className="text-xs text-center text-slate-600">
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
          ${printRef.current ? `
            #${printRef.current.id},
            #${printRef.current.id} * {
              visibility: visible;
            }
          ` : ''}
          @page {
            size: letter;
            margin: 1cm;
          }
        }
        
        @font-face {
          font-family: 'Signature';
          src: local('Brush Script MT'), local('Lucida Handwriting');
        }
        
        .font-signature {
          font-family: 'Signature', cursive;
        }
      `}</style>
    </div>
  );
}
