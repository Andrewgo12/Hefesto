import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FirmaDigital from "@/components/FirmaDigital";
import { Download, Send, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { solicitudesHistoriaClinica, catalogos } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem, scaleIn, fadeInLeft, fadeInRight } from "@/lib/animations";
import type { FormularioHistoriaClinica } from "@shared/types/formularios";
 

const STORAGE_KEY = 'hefesto_registro_historia_clinica';

export default function RegistroHistoriaClinica() {
  const navigate = useNavigate();
  
  // Cargar datos guardados de localStorage al iniciar
  const [formData, setFormData] = useState<Partial<FormularioHistoriaClinica>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error al cargar datos guardados:', e);
      }
    }
    return {
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
    };
  });

  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);

  // Cargar catálogos al iniciar
  useEffect(() => {
    cargarCatalogos();
  }, []);

  const cargarCatalogos = async () => {
    try {
      setCargandoCatalogos(true);
      const response = await catalogos.todos();
      const data = response.data?.data || response.data || {};
      
      setEspecialidades(data.especialidades || []);
      setAreas(data.areas || []);
    } catch (error) {
      console.error('Error al cargar catálogos:', error);
      // Catálogos por defecto
      setEspecialidades([
        { id: 1, nombre: 'Medicina General' },
        { id: 2, nombre: 'Pediatría' },
        { id: 3, nombre: 'Cirugía' },
        { id: 4, nombre: 'Ginecología' },
      ]);
      setAreas([
        { id: 1, nombre: 'Consulta Externa' },
        { id: 2, nombre: 'Urgencias' },
        { id: 3, nombre: 'Hospitalización' },
      ]);
    } finally {
      setCargandoCatalogos(false);
    }
  };

  // Guardar en localStorage cada vez que cambie formData
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Limpiar localStorage al enviar exitosamente
  const limpiarFormularioGuardado = () => {
    localStorage.removeItem(STORAGE_KEY);
  };
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
        [cargo]: {
          firma: firma,
          usuario: usuario,
          fecha: new Date().toISOString(),
        },
      },
    }));
  };

  const eliminarFirma = (cargo: string) => {
    setFormData(prev => {
      const nuevasFirmas = { ...prev.firmas };
      delete nuevasFirmas[cargo];
      return {
        ...prev,
        firmas: nuevasFirmas,
      };
    });
  };

  // Solo mostrar epidemiología para médicos generales y especialistas
  const necesitaEpidemiologia = 
    formData.perfil?.toLowerCase().includes('medico general') || 
    formData.perfil?.toLowerCase().includes('médico general') ||
    formData.perfil?.toLowerCase().includes('especialista');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaResponsabilidad) {
      toast.warning('Debe aceptar la responsabilidad', 'Por favor, marque la casilla de aceptación antes de continuar');
      return;
    }

    setLoading(true);
    try {
      // Mapear datos del formulario a formato de BD
      const payload = {
        // Encabezado del formato
        codigo_formato: formData.codigoFormato || 'FOR-GDI-SIS-003',
        version: formData.version || '2',
        fecha_emision: formData.fechaEmision || '18/08/2021',
        
        // Datos básicos del solicitante
        nombre_completo: formData.nombreCompleto,
        cedula: formData.cedula,
        celular: formData.celular,
        correo_electronico: formData.correoElectronico,
        registro_codigo: formData.registroCodigo,
        area_servicio: formData.areaOServicio,
        especialidad: formData.especialidad,
        
        // Perfil
        perfil: formData.perfil,
        perfil_otro: formData.perfilOtro,
        
        // Tipo de vinculación
        tipo_vinculacion: formData.tipoVinculacion,
        
        // Terminal asignado
        terminal_asignado: formData.terminalAsignado,
        terminal_otro: formData.terminalOtro,
        
        // Capacitaciones (guardar como JSON)
        capacitacion_historia_clinica: JSON.stringify(formData.capacitacionHistoriaClinica || []),
        capacitacion_epidemiologia: JSON.stringify(formData.capacitacionEpidemiologia || []),
        
        // Aval institucional (guardar como JSON)
        aval_institucional: JSON.stringify(formData.avalInstitucional || []),
        
        // Observaciones
        observaciones: formData.observaciones,
        
        // Firmas (guardar como JSON completo)
        firmas: JSON.stringify(formData.firmas || {}),
        
        // Login creado por
        login_creado_por: loginUsuario,
        
        // Metadatos del sistema
        fecha_solicitud: new Date().toISOString(),
        acepta_responsabilidad: formData.aceptaResponsabilidad ? 1 : 0,
        estado: 'Pendiente',
        fase_actual: 'Pendiente firma(s)',
        firmas_pendientes: Object.keys(formData.firmas || {}).length,
        firmas_completadas: 0,
        
        // Usuario que registra
        registrado_por_nombre: nombreDiligencia || localStorage.getItem('user_name') || 'Usuario',
        registrado_por_email: localStorage.getItem('user_email') || 'admin@hefesto.local',
        
        // Fecha de registro
        fecha_registro: fechaRegistro || new Date().toLocaleString('es-CO', { hour12: false })
      };

      console.log('📤 Enviando payload a BD:', payload);
      
      // Enviar al backend
      const response = await solicitudesHistoriaClinica.create(payload);
      console.log('✅ Respuesta backend:', response.data);
      
      toast.success('Solicitud creada exitosamente', 'La solicitud de historia clínica ha sido guardada en la base de datos');
      
      // Limpiar formulario guardado en localStorage
      limpiarFormularioGuardado();
      
      // Recargar la página para obtener datos actualizados del backend
      window.location.href = '/';
    } catch (error: any) {
      console.error('❌ Error al crear solicitud:', error);
      console.error('Detalles:', error.response?.data);
      toast.error('Error al crear solicitud', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto p-2 sm:p-4 md:p-6 max-w-7xl mx-auto scroll-smooth">
        <AnimatedSection variants={fadeInUp}>
          <div className="mb-4">
            <motion.h1 
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FORMATO CREACIÓN DE USUARIOS HISTORIA CLÍNICA ELECTRÓNICA
            </motion.h1>
            <motion.p 
              className="text-[10px] sm:text-xs text-slate-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              FOR-GDI-SIS-003 | Versión 2 | Fecha emisión: 18/08/2021
            </motion.p>
          </div>
        </AnimatedSection>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="p-2 sm:p-4 md:p-6 overflow-hidden rounded-xl md:rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
            <div className="overflow-x-auto">
            <table className="w-full text-[11px] sm:text-[12px] md:text-[13px] [&_td]:p-2 sm:[&_td]:p-3 [&_th]:p-2 sm:[&_th]:p-3">
              <tbody>
                {/* Encabezado */}
                <tr className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-xl">
                  <td className="border-b border-slate-200 p-3 font-semibold w-48 text-slate-700">Fecha de solicitud:</td>
                  <td className="border-b border-slate-200 p-3">
                    <input
                      type="datetime-local"
                      value={fechaDT}
                      onChange={(e) => setFechaDT(e.target.value)}
                      min={`${todayDate}T00:00`}
                      max={`${todayDate}T23:59`}
                      className="h-9 text-sm border-2 border-slate-300 rounded-lg px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </td>
                </tr>

                {/* Datos del solicitante */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border-y border-slate-200 p-3 font-bold text-center text-blue-900 tracking-wide rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      DATOS DEL SOLICITANTE
                    </motion.div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-3">
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Fila 1 */}
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Nombre completo:</label>
                        <Input
                          value={formData.nombreCompleto}
                          onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Cédula:</label>
                        <Input
                          value={formData.cedula}
                          onChange={(e) => handleInputChange('cedula', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Celular:</label>
                        <Input
                          value={formData.celular}
                          onChange={(e) => handleInputChange('celular', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      
                      {/* Fila 2 */}
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Correo electrónico:</label>
                        <Input
                          type="email"
                          value={formData.correoElectronico}
                          onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Registro / Código:</label>
                        <Input
                          value={formData.registroCodigo}
                          onChange={(e) => handleInputChange('registroCodigo', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Área o servicio:</label>
                        <Input
                          value={formData.areaOServicio}
                          onChange={(e) => handleInputChange('areaOServicio', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      
                      {/* Fila 3 */}
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Especialidad:</label>
                        <Input
                          value={formData.especialidad}
                          onChange={(e) => handleInputChange('especialidad', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div className="col-span-2" variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Observaciones:</label>
                        <Textarea
                          value={formData.observaciones}
                          onChange={(e) => handleInputChange('observaciones', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg text-sm min-h-[36px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </motion.div>
                    </motion.div>
                  </td>
                </tr>

                {/* Perfil + Nota + Autor */}
                <tr className="bg-blue-50">
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
                                type="radio"
                                name="perfil"
                                checked={formData.perfil === perfil}
                                onChange={() => handleInputChange('perfil', perfil)}
                                className="w-4 h-4 text-blue-600 border-2 border-slate-300 focus:ring-2 focus:ring-blue-200"
                              />
                              <span className="text-xs">{perfil}</span>
                            </label>
                          ))}
                        </div>
                        {formData.perfil === 'Otro' && (
                          <Input
                            value={formData.perfilOtro || ''}
                            onChange={(e) => handleInputChange('perfilOtro', e.target.value)}
                            className="h-9 text-sm mt-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                <tr className="bg-slate-100">
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
                        className="h-9 text-sm mt-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Especificar otro terminal"
                      />
                    )}
                  </td>
                </tr>

                {/* Capacitaciones - Una fila con dos columnas */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border p-2 font-bold text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      CAPACITACIONES
                    </motion.div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2 sm:p-3">
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {/* COLUMNA 1: Historia Clínica Electrónica */}
                      <motion.div 
                        className="border-2 border-blue-200 rounded-lg p-2 sm:p-3 bg-blue-50/30"
                        variants={fadeInLeft}
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-bold text-[10px] sm:text-xs mb-2 sm:mb-3 text-blue-800 text-center">CAPACITACIÓN EN HISTORIA CLÍNICA ELECTRÓNICA</h3>
                        <div className="space-y-2">
                          <div>
                            <div className="font-semibold text-[10px] sm:text-xs mb-1">¿Realizó la capacitación?</div>
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
                                <span className="text-[10px] sm:text-xs">Sí</span>
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
                                <span className="text-[10px] sm:text-xs">No</span>
                              </label>
                            </div>
                          </div>
                          {formData.capacitacionHistoriaClinica?.capacitacionRealizada === true && (
                            <>
                              <div>
                                <div className="font-semibold text-[10px] sm:text-xs mb-1">Nombre del capacitador:</div>
                                <Input
                                  value={formData.capacitacionHistoriaClinica?.nombreCapacitador || ''}
                                  onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                                    ...formData.capacitacionHistoriaClinica,
                                    nombreCapacitador: e.target.value,
                                  })}
                                  className="h-9 text-sm border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-[10px] sm:text-xs mb-1">Fecha de la capacitación:</div>
                                <Input
                                  type="date"
                                  value={formData.capacitacionHistoriaClinica?.fechaCapacitacion || ''}
                                  onChange={(e) => handleInputChange('capacitacionHistoriaClinica', {
                                    ...formData.capacitacionHistoriaClinica,
                                    fechaCapacitacion: e.target.value,
                                  })}
                                  className="h-9 text-sm border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-semibold text-[10px] sm:text-xs">Firma del capacitador:</div>
                                  {(formData.firmas as any)?.capacitadorHistoriaClinica ? (
                                    <motion.span 
                                      className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-300"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      ✓ Firmado
                                    </motion.span>
                                  ) : (
                                    <motion.span 
                                      className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300"
                                      animate={{ opacity: [0.7, 1, 0.7] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      Pendiente
                                    </motion.span>
                                  )}
                                </div>
                                <div>
                                  {(formData.firmas as any)?.capacitadorHistoriaClinica ? (
                                    <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                                      <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                                        {(formData.firmas as any).capacitadorHistoriaClinica.firma.startsWith('FIRMA_TEXTO:') ? (
                                          <p className="font-signature text-xl text-slate-800">
                                            {(formData.firmas as any).capacitadorHistoriaClinica.firma.replace('FIRMA_TEXTO:', '')}
                                          </p>
                                        ) : (
                                          <img 
                                            src={(formData.firmas as any).capacitadorHistoriaClinica.firma} 
                                            alt="Firma capacitador"
                                            className="max-h-16 max-w-full object-contain"
                                          />
                                        )}
                                      </div>
                                      <div className="text-center space-y-1">
                                        <p className="text-xs text-slate-700 font-semibold">
                                          {(formData.firmas as any).capacitadorHistoriaClinica.usuario}
                                        </p>
                                        <p className="text-[10px] text-slate-500">
                                          {new Date((formData.firmas as any).capacitadorHistoriaClinica.fecha).toLocaleString('es-CO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                        </p>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => eliminarFirma('capacitadorHistoriaClinica')}
                                        className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Eliminar firma
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                      <div className="text-center text-slate-400">
                                        <svg className="w-10 h-10 mx-auto mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <p className="text-xs">Sin firma</p>
                                      </div>
                                      <FirmaDigital
                                        cargo="Capacitador historia clínica"
                                        credencialRequerida="Capacitador de historia clínica"
                                        onFirmaCompleta={(f,u) => handleFirma('capacitadorHistoriaClinica', f, u)}
                                        firmaActual={(formData.firmas as any)?.capacitadorHistoriaClinica?.firma}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>

                      {/* COLUMNA 2: Epidemiología (solo para médicos) */}
                      {necesitaEpidemiologia && (
                        <motion.div 
                          className="border-2 border-slate-300 rounded-lg p-3 bg-slate-50"
                          variants={fadeInRight}
                          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(100, 116, 139, 0.2)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="font-bold text-[10px] sm:text-xs mb-2 sm:mb-3 text-slate-700 text-center">CAPACITACIÓN EN EPIDEMIOLOGÍA<br/>(Solo médicos generales/especialistas)</h3>
                          <div className="space-y-2">
                            <div>
                              <div className="font-semibold text-xs mb-1">Capacitación realizada:</div>
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
                                  <span className="text-[10px] sm:text-xs">Sí</span>
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
                                  <span className="text-[10px] sm:text-xs">No</span>
                                </label>
                              </div>
                            </div>
                            {formData.capacitacionEpidemiologia?.capacitacionRealizada === true && (
                              <>
                                <div>
                                  <div className="font-semibold text-[10px] sm:text-xs mb-1">Nombre del capacitador:</div>
                                  <Input
                                    value={formData.capacitacionEpidemiologia?.nombreCapacitador || ''}
                                    onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                                      ...formData.capacitacionEpidemiologia,
                                      nombreCapacitador: e.target.value,
                                    })}
                                    className="h-9 text-sm border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-[10px] sm:text-xs mb-1">Fecha de la capacitación:</div>
                                  <Input
                                    type="date"
                                    value={formData.capacitacionEpidemiologia?.fechaCapacitacion || ''}
                                    onChange={(e) => handleInputChange('capacitacionEpidemiologia', {
                                      ...formData.capacitacionEpidemiologia,
                                      fechaCapacitacion: e.target.value,
                                    })}
                                    className="h-9 text-sm border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="font-semibold text-[10px] sm:text-xs">Firma del capacitador:</div>
                                    {(formData.firmas as any)?.capacitadorEpidemiologia ? (
                                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-300">✓ Firmado</span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                                    )}
                                  </div>
                                  <div>
                                {(formData.firmas as any)?.capacitadorEpidemiologia ? (
                                  <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                                    <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                                      {(formData.firmas as any).capacitadorEpidemiologia.firma.startsWith('FIRMA_TEXTO:') ? (
                                        <p className="font-signature text-xl text-slate-800">
                                          {(formData.firmas as any).capacitadorEpidemiologia.firma.replace('FIRMA_TEXTO:', '')}
                                        </p>
                                      ) : (
                                        <img 
                                          src={(formData.firmas as any).capacitadorEpidemiologia.firma} 
                                          alt="Firma capacitador"
                                          className="max-h-16 max-w-full object-contain"
                                        />
                                      )}
                                    </div>
                                    <div className="text-center space-y-1">
                                      <p className="text-xs text-slate-700 font-semibold">
                                        {(formData.firmas as any).capacitadorEpidemiologia.usuario}
                                      </p>
                                      <p className="text-[10px] text-slate-500">
                                        {new Date((formData.firmas as any).capacitadorEpidemiologia.fecha).toLocaleString('es-CO', {
                                          day: '2-digit',
                                          month: '2-digit',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => eliminarFirma('capacitadorEpidemiologia')}
                                      className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-3 h-3 mr-1" />
                                      Eliminar firma
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                    <div className="text-center text-slate-400">
                                      <svg className="w-10 h-10 mx-auto mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                      <p className="text-xs">Sin firma</p>
                                    </div>
                                    <FirmaDigital
                                      cargo="Capacitador epidemiología"
                                      credencialRequerida="Capacitador de epidemiología"
                                      onFirmaCompleta={(f,u) => handleFirma('capacitadorEpidemiologia', f, u)}
                                      firmaActual={(formData.firmas as any)?.capacitadorEpidemiologia?.firma}
                                    />
                                  </div>
                                )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Placeholder cuando no es médico */}
                      {!necesitaEpidemiologia && (
                        <motion.div 
                          className="border-2 border-slate-200 rounded-lg p-3 bg-slate-50/30 flex items-center justify-center"
                          variants={fadeInRight}
                        >
                          <p className="text-xs text-slate-500 text-center italic">
                            La capacitación en epidemiología solo aplica para médicos generales y especialistas
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </td>
                </tr>

                {/* Aval y Firma */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border-y border-slate-200 p-3 font-bold text-center text-blue-900 tracking-wide rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      AVAL Y FIRMA
                    </motion.div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2 sm:p-3">
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {/* COLUMNA 1: Aval Institucional */}
                      <motion.div 
                        className="border-2 border-blue-200 rounded-lg p-2 sm:p-3 bg-blue-50/30"
                        variants={fadeInLeft}
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-bold text-xs mb-3 text-blue-800 text-center">AVAL INSTITUCIONAL</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="font-semibold text-xs mb-1">Avalado por (nombre completo):</div>
                            <Input
                              value={formData.avalInstitucional?.avaladoPor || ''}
                              onChange={(e) => handleInputChange('avalInstitucional', {
                                ...formData.avalInstitucional,
                                avaladoPor: e.target.value,
                              })}
                              className="border-2 border-slate-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              required
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-xs">Firma digital (aval):</div>
                              {(formData.firmas as any)?.avalInstitucional ? (
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-300">✓ Firmado</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                              )}
                            </div>
                            {(formData.firmas as any)?.avalInstitucional ? (
                              <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                                <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                                  {(formData.firmas as any).avalInstitucional.firma.startsWith('FIRMA_TEXTO:') ? (
                                    <p className="font-signature text-xl text-slate-800">
                                      {(formData.firmas as any).avalInstitucional.firma.replace('FIRMA_TEXTO:', '')}
                                    </p>
                                  ) : (
                                    <img 
                                      src={(formData.firmas as any).avalInstitucional.firma} 
                                      alt="Firma aval"
                                      className="max-h-16 max-w-full object-contain"
                                    />
                                  )}
                                </div>
                                <div className="text-center space-y-1">
                                  <p className="text-xs text-slate-700 font-semibold">
                                    {(formData.firmas as any).avalInstitucional.usuario}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    {new Date((formData.firmas as any).avalInstitucional.fecha).toLocaleString('es-CO', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => eliminarFirma('avalInstitucional')}
                                  className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Eliminar firma
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                <div className="text-center text-slate-400">
                                  <svg className="w-10 h-10 mx-auto mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  <p className="text-xs">Sin firma</p>
                                </div>
                                <FirmaDigital
                                  cargo="Aval institucional"
                                  credencialRequerida="Aval institucional"
                                  onFirmaCompleta={(firmaData, usuario) => handleFirma('avalInstitucional', firmaData, usuario)}
                                  firmaActual={(formData.firmas as any)?.avalInstitucional?.firma}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      {/* COLUMNA 2: Firma del Usuario Solicitante */}
                      <motion.div 
                        className="border-2 border-slate-300 rounded-lg p-3 bg-slate-50"
                        variants={fadeInRight}
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(100, 116, 139, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-bold text-xs mb-3 text-slate-700 text-center">FIRMA DEL USUARIO SOLICITANTE</h3>
                        <div className="space-y-3">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                            <label className="flex items-start gap-2 cursor-pointer">
                              <Checkbox
                                checked={formData.aceptaResponsabilidad}
                                onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                                className="mt-1 rounded border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 h-4 w-4"
                              />
                              <span className="text-[11px] text-slate-700">
                                <strong className="text-blue-900">Términos:</strong> Declaro que la información es verídica y cuento con las autorizaciones requeridas.
                              </span>
                            </label>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-xs">Firma del solicitante:</div>
                              {(formData.firmas as any)?.firmaUsuarioSolicitante ? (
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold border border-blue-300">✓ Firmado</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                              )}
                            </div>
                            {(formData.firmas as any)?.firmaUsuarioSolicitante ? (
                              <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                                <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                                  {(formData.firmas as any).firmaUsuarioSolicitante.firma.startsWith('FIRMA_TEXTO:') ? (
                                    <p className="font-signature text-xl text-slate-800">
                                      {(formData.firmas as any).firmaUsuarioSolicitante.firma.replace('FIRMA_TEXTO:', '')}
                                    </p>
                                  ) : (
                                    <img 
                                      src={(formData.firmas as any).firmaUsuarioSolicitante.firma} 
                                      alt="Firma usuario"
                                      className="max-h-16 max-w-full object-contain"
                                    />
                                  )}
                                </div>
                                <div className="text-center space-y-1">
                                  <p className="text-xs text-slate-700 font-semibold">
                                    {(formData.firmas as any).firmaUsuarioSolicitante.usuario}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    {new Date((formData.firmas as any).firmaUsuarioSolicitante.fecha).toLocaleString('es-CO', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => eliminarFirma('firmaUsuarioSolicitante')}
                                  className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Eliminar firma
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                <div className="text-center text-slate-400">
                                  <svg className="w-10 h-10 mx-auto mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  <p className="text-xs">Sin firma</p>
                                </div>
                                <FirmaDigital
                                  cargo="Usuario solicitante"
                                  onFirmaCompleta={(f,u) => handleFirma('firmaUsuarioSolicitante', f, u)}
                                  firmaActual={(formData.firmas as any)?.firmaUsuarioSolicitante?.firma}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </td>
                </tr>

                {/* Registro de diligenciamiento - OCULTO (solo para admin) */}
                <tr className="hidden">
                  <td colSpan={2} className="border-y border-slate-300 p-3 font-bold text-center text-slate-800 tracking-wide rounded-lg">REGISTRO DE DILIGENCIAMIENTO</td>
                </tr>
                <tr className="hidden">
                  <td className="border-b border-slate-200 p-3 font-semibold text-slate-700">Login del usuario:</td>
                  <td className="border-b border-slate-200 p-2">
                    <Input 
                      value={loginUsuario} 
                      readOnly 
                      className="border-2 border-slate-300 rounded-lg h-9 text-sm bg-slate-100 cursor-not-allowed" 
                      title="Este campo se llena automáticamente del usuario logueado"
                    />
                  </td>
                </tr>
                <tr className="hidden">
                  <td className="border-b border-slate-200 p-3 font-semibold text-slate-700">Nombre de quien diligencia:</td>
                  <td className="border-b border-slate-200 p-2">
                    <Input 
                      value={nombreDiligencia} 
                      readOnly 
                      className="border-2 border-slate-300 rounded-lg h-9 text-sm bg-slate-100 cursor-not-allowed" 
                      title="Este campo se llena automáticamente del usuario logueado"
                    />
                  </td>
                </tr>
                <tr className="hidden">
                  <td className="border-b border-slate-200 p-3 font-semibold text-slate-700">Fecha de registro:</td>
                  <td className="border-b border-slate-200 p-3 text-sm text-slate-600">{fechaRegistro}</td>
                </tr>

                {/* Declaración */}
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50">
                  <td colSpan={2} className="border-y border-slate-200 p-3">
                    <label className="flex items-start gap-3 cursor-pointer hover:bg-slate-200/30 p-2 rounded-lg transition-colors">
                      <Checkbox
                        checked={formData.aceptaResponsabilidad}
                        onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                        className="mt-1 rounded border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 h-5 w-5"
                      />
                      <span className="text-sm text-slate-700">
                        <strong className="text-blue-900">DECLARACIÓN:</strong> Acepto la responsabilidad de hacer buen uso del usuario y contraseña que me sean asignados. 
                        Entiendo que son personales e intransferibles.
                      </span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </Card>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              whileHover={!loading ? { scale: 1.05 } : {}} 
              whileTap={!loading ? { scale: 0.95 } : {}}
              animate={loading ? { scale: [1, 1.05, 1] } : {}}
              transition={loading ? { duration: 1, repeat: Infinity } : {}}
            >
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500 rounded-lg text-sm sm:text-base"
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Send className="w-4 h-4 mr-2" />
                </motion.div>
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto border-2 hover:border-slate-400 hover:shadow-lg transition-all duration-300 rounded-lg text-sm sm:text-base"
              >
                Limpiar
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </div>
  );
}
