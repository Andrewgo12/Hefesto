import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { useRef } from "react";
import { parseSignature } from "@/lib/signatureFonts";

interface PDFAdministrativoProps {
  solicitud: any;
  onClose: () => void;
}

export default function PDFAdministrativo({ solicitud, onClose }: PDFAdministrativoProps) {
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
  console.log('📄 PDF Administrativo - Datos completos:', {
    solicitud,
    datos,
    firmas_raw: datos.firmas,
    modulos_admin_raw: datos.modulos_administrativos,
    modulos_fin_raw: datos.modulos_financieros
  });

  // Parse datos si son strings
  const firmas = typeof datos.firmas === 'string'
    ? JSON.parse(datos.firmas || '{}')
    : datos.firmas || {};

  // Parse módulos - los permisos vienen como {modulo: {A: true, C: false, M: true, B: false}}
  const modulosAdministrativos = typeof datos.modulos_administrativos === 'string'
    ? JSON.parse(datos.modulos_administrativos || '{}')
    : datos.modulos_administrativos || {};

  const modulosFinancieros = typeof datos.modulos_financieros === 'string'
    ? JSON.parse(datos.modulos_financieros || '{}')
    : datos.modulos_financieros || {};

  const opcionesWeb = typeof datos.opciones_web === 'string'
    ? JSON.parse(datos.opciones_web || '{}')
    : datos.opciones_web || {};

  // Obtener valores con fallback
  const nombreCompleto = solicitud.nombreCompleto || solicitud.nombre_completo || datos.nombre_completo || '';
  const cedula = solicitud.cedula || datos.cedula || '';
  const cargo = solicitud.cargo || datos.cargo || '';
  const areaServicio = solicitud.area_servicio || datos.area_servicio || datos.areaOServicio || '';
  const telefonoExtension = datos.telefono_extension || datos.telefonoExtension || '';
  const tipoVinculacion = datos.tipo_vinculacion || datos.tipoVinculacion || 'Planta';
  const perfilDe = datos.perfil_de || datos.perfilDe || '';
  
  // Login y clave asignados
  const loginAsignado = solicitud.login_asignado || datos.login_asignado || solicitud.loginAsignado || datos.loginAsignado || '';
  const claveTemporal = solicitud.clave_temporal || datos.clave_temporal || solicitud.claveTemporal || datos.claveTemporal || '';

  console.log('🔑 Credenciales PDF Admin:', { loginAsignado, claveTemporal, solicitud_login: solicitud.login_asignado, datos_login: datos.login_asignado });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Botones de acción - No se imprimen */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center print:hidden z-10">
          <h2 className="text-lg font-bold text-slate-900">Formato Creación de Usuarios Administrativos</h2>
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
        <div id="pdf-content" ref={printRef} className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt' }}>
          {/* Encabezado */}
          <div className="border-2 border-black mb-4">
            <div className="bg-blue-900 text-white p-2 text-center">
              <h1 className="text-lg font-bold uppercase">FORMATO CREACIÓN DE USUARIOS ADMINISTRATIVOS</h1>
            </div>

            <div className="grid grid-cols-4 border-t-2 border-black text-xs">
              <div className="border-r border-black p-2">
                <p className="font-bold">CÓDIGO:</p>
                <p>FOR-GDI-SIS-004</p>
              </div>
              <div className="border-r border-black p-2">
                <p className="font-bold">VERSIÓN:</p>
                <p>{datos.version || '1'}</p>
              </div>
              <div className="border-r border-black p-2">
                <p className="font-bold">FECHA EMISIÓN:</p>
                <p>{datos.fecha_emision || datos.fechaEmision || '23/11/2020'}</p>
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
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">TELÉFONO/EXTENSIÓN:</td>
                    <td className="border border-slate-400 p-2">{telefonoExtension}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">CARGO:</td>
                    <td className="border border-slate-400 p-2">{cargo}</td>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">ÁREA/SERVICIO:</td>
                    <td className="border border-slate-400 p-2">{areaServicio}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100">TIPO DE VINCULACIÓN:</td>
                    <td className="border border-slate-400 p-2" colSpan={3}>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                          <div className={`w-4 h-4 border-2 border-black ${tipoVinculacion === 'Planta' ? 'bg-black' : 'bg-white'}`}>
                            {tipoVinculacion === 'Planta' && <span className="text-white text-xs">✓</span>}
                          </div>
                          Planta
                        </label>
                        <label className="flex items-center gap-1">
                          <div className={`w-4 h-4 border-2 border-black ${tipoVinculacion === 'Agremiado' ? 'bg-black' : 'bg-white'}`}>
                            {tipoVinculacion === 'Agremiado' && <span className="text-white text-xs">✓</span>}
                          </div>
                          Agremiado
                        </label>
                        <label className="flex items-center gap-1">
                          <div className={`w-4 h-4 border-2 border-black ${tipoVinculacion === 'Contrato' ? 'bg-black' : 'bg-white'}`}>
                            {tipoVinculacion === 'Contrato' && <span className="text-white text-xs">✓</span>}
                          </div>
                          Contrato
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2 y 3. MÓDULOS SERVINTE - DOS COLUMNAS LADO A LADO */}
          {(Object.keys(modulosAdministrativos).length > 0 || Object.keys(modulosFinancieros).length > 0) && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase text-center">2. APLICACIONES / MÓDULOS SERVINTE</h2>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {/* COLUMNA 1: ADMINISTRATIVO */}
                <div className="border-r-2 border-black">
                  <div className="bg-blue-100 p-1 border-b border-black">
                    <h3 className="font-bold text-[10px] uppercase text-center">ADMINISTRATIVO</h3>
                  </div>
                  <table className="w-full text-[9px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border-b border-black p-1 text-left font-bold text-[8px]">MÓDULO</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">A</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">C</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">M</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(modulosAdministrativos).map(([modulo, permisos]: [string, any]) => (
                        <tr key={modulo} className="border-b border-slate-200">
                          <td className="p-1 capitalize text-[8px]">{modulo.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}</td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.A || permisos?.adicionar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.A || permisos?.adicionar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.C || permisos?.consultar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.C || permisos?.consultar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.M || permisos?.modificar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.M || permisos?.modificar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.B || permisos?.borrar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.B || permisos?.borrar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* COLUMNA 2: FINANCIERO */}
                <div>
                  <div className="bg-green-100 p-1 border-b border-black">
                    <h3 className="font-bold text-[10px] uppercase text-center">FINANCIERO</h3>
                  </div>
                  <table className="w-full text-[9px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border-b border-black p-1 text-left font-bold text-[8px]">MÓDULO</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">A</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">C</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">M</th>
                        <th className="border-b border-l border-black p-1 text-center font-bold w-8 text-[8px]">B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(modulosFinancieros).map(([modulo, permisos]: [string, any]) => (
                        <tr key={modulo} className="border-b border-slate-200">
                          <td className="p-1 capitalize text-[8px]">{modulo.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}</td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.A || permisos?.adicionar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.A || permisos?.adicionar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.C || permisos?.consultar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.C || permisos?.consultar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.M || permisos?.modificar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.M || permisos?.modificar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                          <td className="border-l border-black p-1 text-center">
                            <div className="flex justify-center">
                              <div className={`w-3 h-3 border border-black ${permisos?.B || permisos?.borrar ? 'bg-black' : 'bg-white'}`}>
                                {(permisos?.B || permisos?.borrar) && <span className="text-white text-[7px] leading-none">✓</span>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. PERFIL DE */}
          {perfilDe && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">3. PERFIL DE</h2>
              </div>
              <div className="p-3">
                <p className="text-xs border-b border-slate-400 pb-1">{perfilDe}</p>
              </div>
            </div>
          )}

          {/* 4. OPCIONES WEB */}
          {Object.keys(opcionesWeb).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">4. OPCIONES WEB</h2>
              </div>
              <div className="p-3">
                <div className="flex flex-col gap-2 text-xs">
                  <label className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 border-black ${opcionesWeb.internet ? 'bg-black' : 'bg-white'}`}>
                      {opcionesWeb.internet && <span className="text-white text-xs">✓</span>}
                    </div>
                    Internet
                  </label>
                  <label className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 border-black ${opcionesWeb.correoElectronico || opcionesWeb.correo_electronico ? 'bg-black' : 'bg-white'}`}>
                      {(opcionesWeb.correoElectronico || opcionesWeb.correo_electronico) && <span className="text-white text-xs">✓</span>}
                    </div>
                    Correo Electrónico
                  </label>
                  <label className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 border-black ${opcionesWeb.transferenciaArchivos || opcionesWeb.transferencia_archivos ? 'bg-black' : 'bg-white'}`}>
                      {(opcionesWeb.transferenciaArchivos || opcionesWeb.transferencia_archivos) && <span className="text-white text-xs">✓</span>}
                    </div>
                    Transferencia de Archivos
                  </label>
                  {opcionesWeb.otros && (
                    <div className="mt-2">
                      <p className="font-bold">Otros:</p>
                      <p className="border-b border-slate-400 pb-1">{opcionesWeb.otros}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 5. FIRMAS Y AUTORIZACIONES */}
          {Object.keys(firmas).length > 0 && (
            <div className="border-2 border-black mb-3">
              <div className="bg-slate-200 p-2 border-b-2 border-black">
                <h2 className="font-bold text-sm uppercase">5. Vo. Bo. Y FIRMAS</h2>
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
                            {parseSignature(firma.firma).name}
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

          {/* 6. ESPACIO RESERVADO PARA SISTEMAS */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">6. ESPACIO RESERVADO PARA GESTIÓN DE LA INFORMACIÓN</h2>
            </div>
            <div className="p-3">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">LOGIN ASIGNADO:</td>
                    <td className="border border-slate-400 p-2">{loginAsignado || '_________________'}</td>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">CLAVE TEMPORAL:</td>
                    <td className="border border-slate-400 p-2">{claveTemporal || '_________________'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. ESTADO */}
          <div className="border-2 border-black mb-3">
            <div className="bg-slate-200 p-2 border-b-2 border-black">
              <h2 className="font-bold text-sm uppercase">7. ESTADO DE LA SOLICITUD</h2>
            </div>
            <div className="p-3">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 font-bold bg-slate-100 w-1/4">ESTADO ACTUAL:</td>
                    <td className="border border-slate-400 p-2">
                      <span className={`font-bold px-2 py-1 rounded ${solicitud.estado === 'Aprobado' ? 'bg-green-200 text-green-800' :
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
              <p className="font-bold">SISTEMA KAIZEN - GESTIÓN DE USUARIOS</p>
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
          /* Hacer visible el contenido del modal para imprimir */
          #pdf-content, #pdf-content * {
            visibility: visible;
          }
          #pdf-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
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
