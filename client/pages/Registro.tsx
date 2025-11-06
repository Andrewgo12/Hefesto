import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Download, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { useSolicitudes } from "@/hooks/useSolicitudes";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";

interface RegistrationRequest {
  id: number;
  name: string;
  type: "Administrativo" | "Médico";
  department: string;
  status: "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";
  date: string;
}

export default function Registro() {
  const { view = "administrativo" } = useParams<{ view: string }>();
  const { solicitudes, loading, crearSolicitud } = useSolicitudes();
  const navigate = useNavigate();
  
  // Convertir solicitudes del backend al formato de la vista
  const myRequests: RegistrationRequest[] = solicitudes.map(sol => ({
    id: sol.id,
    name: sol.nombre_completo,
    type: sol.tipo === 'Administrativo' ? 'Administrativo' : 'Médico',
    department: sol.cargo || sol.especialidad || 'N/A',
    status: sol.estado as any,
    date: new Date(sol.created_at).toLocaleDateString('es-CO')
  }));

  // Debug
  console.log('📊 Solicitudes cargadas:', solicitudes.length);
  console.log('📋 Requests mapeadas:', myRequests.length);
  console.log('⏳ Loading:', loading);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "En revisión":
        return "bg-blue-50 text-blue-800 border border-blue-200";
      case "Aprobado":
        return "bg-green-50 text-green-800 border border-green-200";
      case "Rechazado":
        return "bg-red-50 text-red-800 border border-red-200";
      default:
        return "bg-slate-50 text-slate-800 border border-slate-200";
    }
  };

  const getTitle = () => {
    switch (view) {
      case "proceso":
        return "Solicitud de Proceso";
      default:
        return "Módulo de Registro";
    }
  };

  // Filtros para vista proceso
  const [phaseFilter, setPhaseFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredRequests = useMemo(() => {
    return myRequests.filter((r) => {
      // Mapeo de estado a fase
      const faseMap: Record<string, string> = {
        'Pendiente': 'Pendiente firma(s)',
        'En revisión': 'En revisión',
        'Aprobado': 'Aprobado',
        'Rechazado': 'En revisión'
      };
      const faseActual = faseMap[r.status] || 'En proceso';
      const matchesPhase = phaseFilter ? faseActual === phaseFilter : true;
      
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = term
        ? r.name.toLowerCase().includes(term) || String(r.id).includes(term)
        : true;
      return matchesPhase && matchesSearch;
    });
  }, [myRequests, phaseFilter, searchTerm]);

  // Estado para formulario administrativo
  const [formDataAdmin, setFormDataAdmin] = useState({
    nombreCompleto: "",
    cedula: "",
    cargo: "",
    dependencia: "",
    area: "",
    correoInstitucional: "",
    extension: "",
    telefono: "",
    fechaIngreso: "",
    tipoContrato: "",
    supervisorInmediato: "",
    sistemasSolicitados: [] as string[],
    nivelAcceso: "Lectura",
    justificacionAcceso: "",
    funcionesPrincipales: "",
    solicitadoPor: "",
    fechaSolicitud: new Date().toISOString().split('T')[0],
    observaciones: "",
  });

  // Estado para formulario médico
  const [formDataMedico, setFormDataMedico] = useState({
    nombreCompleto: "",
    cedula: "",
    registroMedico: "",
    especialidad: "",
    correoInstitucional: "",
    extension: "",
    telefono: "",
    celular: "",
    tipoProfesional: "Médico General",
    institucionFormacion: "",
    anoGraduacion: "",
    servicioAsignado: "",
    areasAtencion: [] as string[],
    turno: "",
    modulosHistoriaClinica: [] as string[],
    nivelAccesoHistoria: "Consulta",
    accesoLaboratorio: false,
    accesoImagenologia: false,
    accesoFarmacia: false,
    accesoQuirofano: false,
    justificacionAcceso: "",
    funcionesAsistenciales: "",
    capacitacionHistoriaClinica: false,
    fechaCapacitacion: "",
    solicitadoPor: "",
    fechaSolicitud: new Date().toISOString().split('T')[0],
    observaciones: "",
  });

  // Handlers para formulario administrativo
  const handleInputChangeAdmin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChangeAdmin = (name: string, value: string) => {
    setFormDataAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implementar guardado en backend con crearSolicitud
    toast.success('Solicitud creada', 'La solicitud administrativa ha sido enviada correctamente');
    
    // Limpiar formulario
    setFormDataAdmin({
      nombreCompleto: "",
      cedula: "",
      cargo: "",
      dependencia: "",
      area: "",
      correoInstitucional: "",
      extension: "",
      telefono: "",
      fechaIngreso: "",
      tipoContrato: "",
      supervisorInmediato: "",
      sistemasSolicitados: [],
      nivelAcceso: "Lectura",
      justificacionAcceso: "",
      funcionesPrincipales: "",
      solicitadoPor: "",
      fechaSolicitud: new Date().toISOString().split('T')[0],
      observaciones: "",
    });
    
    // Navegar al dashboard
    navigate('/');
  };

  // Handlers para formulario médico
  const handleInputChangeMedico = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataMedico(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChangeMedico = (name: string, value: string) => {
    setFormDataMedico(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChangeMedico = (name: string, checked: boolean) => {
    setFormDataMedico(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmitMedico = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implementar guardado en backend con crearSolicitud
    toast.success('Solicitud creada', 'La solicitud médica ha sido enviada correctamente');
    
    // Limpiar y redirigir
    setFormDataMedico({
      nombreCompleto: "",
      cedula: "",
      registroMedico: "",
      especialidad: "",
      correoInstitucional: "",
      extension: "",
      telefono: "",
      celular: "",
      tipoProfesional: "Médico General",
      institucionFormacion: "",
      anoGraduacion: "",
      servicioAsignado: "",
      areasAtencion: [],
      turno: "",
      modulosHistoriaClinica: [],
      nivelAccesoHistoria: "Consulta",
      accesoLaboratorio: false,
      accesoImagenologia: false,
      accesoFarmacia: false,
      accesoQuirofano: false,
      justificacionAcceso: "",
      funcionesAsistenciales: "",
      capacitacionHistoriaClinica: false,
      fechaCapacitacion: "",
      solicitadoPor: "",
      fechaSolicitud: new Date().toISOString().split('T')[0],
      observaciones: "",
    });
    
    // Navegar al dashboard
    navigate('/');
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-5xl mx-auto">
        <AnimatedSection variants={fadeInUp}>
        <div className="flex flex-col gap-2">
          <motion.h1 
            className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getTitle()}
          </motion.h1>
          <motion.p 
            className="text-xs sm:text-sm text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {view === "proceso" && "Visualiza y filtra el estado de tus solicitudes por fases"}
          </motion.p>
        </div>
        </AnimatedSection>

        {/* Proceso View (fases + tabla) */}
        {view === "proceso" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              <p className="text-sm text-slate-600">Seguimiento por fases</p>
            </div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { fase: 'Pendiente firma(s)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { fase: 'En proceso', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { fase: 'En revisión', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                { fase: 'Aprobado', color: 'bg-green-50 text-green-700 border-green-200' },
              ].map((f, idx) => (
                <motion.div 
                  key={idx} 
                  className={`p-2 sm:p-3 rounded border ${f.color} text-[10px] sm:text-xs font-medium`}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  {f.fase}
                </motion.div>
              ))}
            </motion.div>

            {/* Controles */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600">Fase:</label>
                <select className="h-8 text-sm border border-slate-300 rounded px-2" value={phaseFilter} onChange={(e)=>setPhaseFilter(e.target.value)}>
                  <option value="">Todas</option>
                  <option>Pendiente firma(s)</option>
                  <option>En proceso</option>
                  <option>En revisión</option>
                  <option>Aprobado</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Buscar por solicitante o ID"
                  className="h-8 text-sm border border-slate-300 rounded px-2 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">ID</th>
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">Solicitante</th>
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">Tipo</th>
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">Fase</th>
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">Fecha</th>
                    <th className="text-left py-2 px-2 text-slate-700 text-xs">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r, idx) => (
                    <motion.tr 
                      key={r.id} 
                      className="border-b hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="py-2 px-2 text-xs">{r.id}</td>
                      <td className="py-2 px-2 text-xs">{r.name}</td>
                      <td className="py-2 px-2 text-xs">{r.type}</td>
                      <td className="py-2 px-2 text-xs">
                        <span className="inline-block px-2 py-1 rounded border bg-amber-50 text-amber-700 text-[11px]">
                          Pendiente firma(s)
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs">{r.date}</td>
                      <td className="py-2 px-2 text-xs">
                        <div className="flex flex-wrap gap-1 sm:gap-2" data-no-print>
                          <motion.button 
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-slate-50 hover:border-blue-400 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Ver
                          </motion.button>
                          <motion.button 
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-slate-50 hover:border-green-400 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Descargar
                          </motion.button>
                          <motion.button 
                            className="h-7 px-2 rounded border border-slate-300 text-[10px] sm:text-[11px] hover:bg-slate-50 hover:border-purple-400 transition-colors" 
                            onClick={() => window.print()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Imprimir
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          </motion.div>
        )}

        {/* Administrative User Form */}
        {view === "administrativo" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmitAdmin} className="space-y-6">
              {/* Sección: Datos Personales */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombreCompleto" className="text-sm font-medium text-slate-700">
                      Nombre Completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      value={formDataAdmin.nombreCompleto}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: Juan Pérez"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cedula" className="text-sm font-medium text-slate-700">
                      Cédula de Identidad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cedula"
                      name="cedula"
                      value={formDataAdmin.cedula}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: 1234567890"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cargo" className="text-sm font-medium text-slate-700">
                      Cargo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cargo"
                      name="cargo"
                      value={formDataAdmin.cargo}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: Analista"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dependencia" className="text-sm font-medium text-slate-700">
                      Dependencia <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dependencia"
                      name="dependencia"
                      value={formDataAdmin.dependencia}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: Dirección Administrativa"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="area" className="text-sm font-medium text-slate-700">
                      Área <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="area"
                      name="area"
                      value={formDataAdmin.area}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: Recursos Humanos"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Datos de Contacto */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="correoInstitucional" className="text-sm font-medium text-slate-700">
                      Correo Institucional <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="correoInstitucional"
                      name="correoInstitucional"
                      type="email"
                      value={formDataAdmin.correoInstitucional}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: usuario@hospital.local"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="extension" className="text-sm font-medium text-slate-700">
                      Extensión
                    </Label>
                    <Input
                      id="extension"
                      name="extension"
                      value={formDataAdmin.extension}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: 1234"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono" className="text-sm font-medium text-slate-700">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formDataAdmin.telefono}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: 555-1234"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Información Laboral */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Información Laboral</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fechaIngreso" className="text-sm font-medium text-slate-700">
                      Fecha de Ingreso <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fechaIngreso"
                      name="fechaIngreso"
                      type="date"
                      value={formDataAdmin.fechaIngreso}
                      onChange={handleInputChangeAdmin}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipoContrato" className="text-sm font-medium text-slate-700">
                      Tipo de Contrato <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formDataAdmin.tipoContrato}
                      onValueChange={(value) => handleSelectChangeAdmin("tipoContrato", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleccione tipo de contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indefinido">Indefinido</SelectItem>
                        <SelectItem value="Temporal">Temporal</SelectItem>
                        <SelectItem value="Prestación de Servicios">Prestación de Servicios</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="supervisorInmediato" className="text-sm font-medium text-slate-700">
                      Supervisor Inmediato <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="supervisorInmediato"
                      name="supervisorInmediato"
                      value={formDataAdmin.supervisorInmediato}
                      onChange={handleInputChangeAdmin}
                      placeholder="Ej: Dr. José García"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Accesos y Permisos */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Accesos y Permisos</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nivelAcceso" className="text-sm font-medium text-slate-700">
                      Nivel de Acceso <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formDataAdmin.nivelAcceso}
                      onValueChange={(value) => handleSelectChangeAdmin("nivelAcceso", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleccione nivel de acceso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lectura">Lectura</SelectItem>
                        <SelectItem value="Escritura">Escritura</SelectItem>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Sección: Justificación */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Justificación</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="justificacionAcceso" className="text-sm font-medium text-slate-700">
                      Justificación del Acceso <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="justificacionAcceso"
                      name="justificacionAcceso"
                      value={formDataAdmin.justificacionAcceso}
                      onChange={handleInputChangeAdmin}
                      placeholder="Describe brevemente por qué requiere acceso al sistema..."
                      className="mt-2"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="funcionesPrincipales" className="text-sm font-medium text-slate-700">
                      Funciones Principales <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="funcionesPrincipales"
                      name="funcionesPrincipales"
                      value={formDataAdmin.funcionesPrincipales}
                      onChange={handleInputChangeAdmin}
                      placeholder="Describe las funciones principales que realizará..."
                      className="mt-2"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Solicitante */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Información del Solicitante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="solicitadoPor" className="text-sm font-medium text-slate-700">
                      Solicitado Por <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="solicitadoPor"
                      name="solicitadoPor"
                      value={formDataAdmin.solicitadoPor}
                      onChange={handleInputChangeAdmin}
                      placeholder="Nombre del solicitante"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fechaSolicitud" className="text-sm font-medium text-slate-700">
                      Fecha de Solicitud
                    </Label>
                    <Input
                      id="fechaSolicitud"
                      name="fechaSolicitud"
                      type="date"
                      value={formDataAdmin.fechaSolicitud}
                      onChange={handleInputChangeAdmin}
                      className="mt-2"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <Label htmlFor="observaciones" className="text-sm font-medium text-slate-700">
                  Observaciones
                </Label>
                <Textarea
                  id="observaciones"
                  name="observaciones"
                  value={formDataAdmin.observaciones}
                  onChange={handleInputChangeAdmin}
                  placeholder="Observaciones adicionales (opcional)..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Enviar y Descargar Excel
                </Button>
                <Button type="reset" variant="outline" onClick={() => setFormDataAdmin({
                  nombreCompleto: "",
                  cedula: "",
                  cargo: "",
                  dependencia: "",
                  area: "",
                  correoInstitucional: "",
                  extension: "",
                  telefono: "",
                  fechaIngreso: "",
                  tipoContrato: "",
                  supervisorInmediato: "",
                  sistemasSolicitados: [],
                  nivelAcceso: "Lectura",
                  justificacionAcceso: "",
                  funcionesPrincipales: "",
                  solicitadoPor: "",
                  fechaSolicitud: new Date().toISOString().split('T')[0],
                  observaciones: "",
                })}>
                  Limpiar Formulario
                </Button>
              </div>
            </form>
          </Card>
          </motion.div>
        )}

        {/* Medical User Form */}
        {view === "medico" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmitMedico} className="space-y-6">
              {/* Sección: Datos Personales */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="medNombreCompleto" className="text-sm font-medium text-slate-700">
                      Nombre Completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="medNombreCompleto"
                      name="nombreCompleto"
                      value={formDataMedico.nombreCompleto}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: Dr. Miguel Ángel Rodríguez"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="medCedula" className="text-sm font-medium text-slate-700">
                      Cédula de Identidad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="medCedula"
                      name="cedula"
                      value={formDataMedico.cedula}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: 1234567890"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="registroMedico" className="text-sm font-medium text-slate-700">
                      Registro Médico / Matrícula
                    </Label>
                    <Input
                      id="registroMedico"
                      name="registroMedico"
                      value={formDataMedico.registroMedico}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: RM-123456"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="especialidad" className="text-sm font-medium text-slate-700">
                      Especialidad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="especialidad"
                      name="especialidad"
                      value={formDataMedico.especialidad}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: Cardiología"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Datos de Contacto */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="medCorreo" className="text-sm font-medium text-slate-700">
                      Correo Institucional <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="medCorreo"
                      name="correoInstitucional"
                      type="email"
                      value={formDataMedico.correoInstitucional}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: medico@hospital.local"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="medExtension" className="text-sm font-medium text-slate-700">
                      Extensión
                    </Label>
                    <Input
                      id="medExtension"
                      name="extension"
                      value={formDataMedico.extension}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: 1234"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="medTelefono" className="text-sm font-medium text-slate-700">
                      Teléfono
                    </Label>
                    <Input
                      id="medTelefono"
                      name="telefono"
                      value={formDataMedico.telefono}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: 555-1234"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="celular" className="text-sm font-medium text-slate-700">
                      Celular
                    </Label>
                    <Input
                      id="celular"
                      name="celular"
                      value={formDataMedico.celular}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: 555-5678"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Información Profesional */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Información Profesional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="tipoProfesional" className="text-sm font-medium text-slate-700">
                      Tipo de Profesional <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formDataMedico.tipoProfesional}
                      onValueChange={(value) => handleSelectChangeMedico("tipoProfesional", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Médico General">Médico General</SelectItem>
                        <SelectItem value="Especialista">Especialista</SelectItem>
                        <SelectItem value="Residente">Residente</SelectItem>
                        <SelectItem value="Interno">Interno</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="institucionFormacion" className="text-sm font-medium text-slate-700">
                      Institución de Formación
                    </Label>
                    <Input
                      id="institucionFormacion"
                      name="institucionFormacion"
                      value={formDataMedico.institucionFormacion}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: Universidad Nacional"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="anoGraduacion" className="text-sm font-medium text-slate-700">
                      Año de Graduación
                    </Label>
                    <Input
                      id="anoGraduacion"
                      name="anoGraduacion"
                      value={formDataMedico.anoGraduacion}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: 2015"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Servicios y Áreas */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Servicios y Áreas de Atención</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="servicioAsignado" className="text-sm font-medium text-slate-700">
                      Servicio Asignado <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="servicioAsignado"
                      name="servicioAsignado"
                      value={formDataMedico.servicioAsignado}
                      onChange={handleInputChangeMedico}
                      placeholder="Ej: Cardiología"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="turno" className="text-sm font-medium text-slate-700">
                      Turno
                    </Label>
                    <Select
                      value={formDataMedico.turno}
                      onValueChange={(value) => handleSelectChangeMedico("turno", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleccione turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Diurno">Diurno</SelectItem>
                        <SelectItem value="Nocturno">Nocturno</SelectItem>
                        <SelectItem value="Mixto">Mixto</SelectItem>
                        <SelectItem value="24 horas">24 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Sección: Accesos a Historia Clínica */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Accesos a Historia Clínica</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nivelAccesoHistoria" className="text-sm font-medium text-slate-700">
                      Nivel de Acceso <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formDataMedico.nivelAccesoHistoria}
                      onValueChange={(value) => handleSelectChangeMedico("nivelAccesoHistoria", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleccione nivel de acceso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consulta">Consulta</SelectItem>
                        <SelectItem value="Registro">Registro</SelectItem>
                        <SelectItem value="Modificación">Modificación</SelectItem>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-3 block">
                      Accesos Adicionales
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accesoLaboratorio"
                          checked={formDataMedico.accesoLaboratorio}
                          onCheckedChange={(checked) => handleCheckboxChangeMedico("accesoLaboratorio", checked as boolean)}
                        />
                        <Label htmlFor="accesoLaboratorio" className="text-sm text-slate-700 cursor-pointer">
                          Acceso a Laboratorio
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accesoImagenologia"
                          checked={formDataMedico.accesoImagenologia}
                          onCheckedChange={(checked) => handleCheckboxChangeMedico("accesoImagenologia", checked as boolean)}
                        />
                        <Label htmlFor="accesoImagenologia" className="text-sm text-slate-700 cursor-pointer">
                          Acceso a Imagenología
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accesoFarmacia"
                          checked={formDataMedico.accesoFarmacia}
                          onCheckedChange={(checked) => handleCheckboxChangeMedico("accesoFarmacia", checked as boolean)}
                        />
                        <Label htmlFor="accesoFarmacia" className="text-sm text-slate-700 cursor-pointer">
                          Acceso a Farmacia
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accesoQuirofano"
                          checked={formDataMedico.accesoQuirofano}
                          onCheckedChange={(checked) => handleCheckboxChangeMedico("accesoQuirofano", checked as boolean)}
                        />
                        <Label htmlFor="accesoQuirofano" className="text-sm text-slate-700 cursor-pointer">
                          Acceso a Quirófano
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección: Justificación */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Justificación</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medJustificacion" className="text-sm font-medium text-slate-700">
                      Justificación del Acceso <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="medJustificacion"
                      name="justificacionAcceso"
                      value={formDataMedico.justificacionAcceso}
                      onChange={handleInputChangeMedico}
                      placeholder="Describe brevemente por qué requiere acceso a la historia clínica..."
                      className="mt-2"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="funcionesAsistenciales" className="text-sm font-medium text-slate-700">
                      Funciones Asistenciales <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="funcionesAsistenciales"
                      name="funcionesAsistenciales"
                      value={formDataMedico.funcionesAsistenciales}
                      onChange={handleInputChangeMedico}
                      placeholder="Describe las funciones asistenciales que realizará..."
                      className="mt-2"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Capacitación */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Capacitación</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="capacitacionHistoriaClinica"
                      checked={formDataMedico.capacitacionHistoriaClinica}
                      onCheckedChange={(checked) => handleCheckboxChangeMedico("capacitacionHistoriaClinica", checked as boolean)}
                    />
                    <Label htmlFor="capacitacionHistoriaClinica" className="text-sm text-slate-700 cursor-pointer">
                      Capacitación en Historia Clínica Electrónica Recibida
                    </Label>
                  </div>

                  {formDataMedico.capacitacionHistoriaClinica && (
                    <div>
                      <Label htmlFor="fechaCapacitacion" className="text-sm font-medium text-slate-700">
                        Fecha de Capacitación
                      </Label>
                      <Input
                        id="fechaCapacitacion"
                        name="fechaCapacitacion"
                        type="date"
                        value={formDataMedico.fechaCapacitacion}
                        onChange={handleInputChangeMedico}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sección: Solicitante */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Información del Solicitante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="medSolicitadoPor" className="text-sm font-medium text-slate-700">
                      Solicitado Por <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="medSolicitadoPor"
                      name="solicitadoPor"
                      value={formDataMedico.solicitadoPor}
                      onChange={handleInputChangeMedico}
                      placeholder="Nombre del solicitante"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="medFechaSolicitud" className="text-sm font-medium text-slate-700">
                      Fecha de Solicitud
                    </Label>
                    <Input
                      id="medFechaSolicitud"
                      name="fechaSolicitud"
                      type="date"
                      value={formDataMedico.fechaSolicitud}
                      onChange={handleInputChangeMedico}
                      className="mt-2"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <Label htmlFor="medObservaciones" className="text-sm font-medium text-slate-700">
                  Observaciones
                </Label>
                <Textarea
                  id="medObservaciones"
                  name="observaciones"
                  value={formDataMedico.observaciones}
                  onChange={handleInputChangeMedico}
                  placeholder="Observaciones adicionales (opcional)..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Enviar y Descargar Excel
                </Button>
                <Button type="reset" variant="outline" onClick={() => setFormDataMedico({
                  nombreCompleto: "",
                  cedula: "",
                  registroMedico: "",
                  especialidad: "",
                  correoInstitucional: "",
                  extension: "",
                  telefono: "",
                  celular: "",
                  tipoProfesional: "Médico General",
                  institucionFormacion: "",
                  anoGraduacion: "",
                  servicioAsignado: "",
                  areasAtencion: [],
                  turno: "",
                  modulosHistoriaClinica: [],
                  nivelAccesoHistoria: "Consulta",
                  accesoLaboratorio: false,
                  accesoImagenologia: false,
                  accesoFarmacia: false,
                  accesoQuirofano: false,
                  justificacionAcceso: "",
                  funcionesAsistenciales: "",
                  capacitacionHistoriaClinica: false,
                  fechaCapacitacion: "",
                  solicitadoPor: "",
                  fechaSolicitud: new Date().toISOString().split('T')[0],
                  observaciones: "",
                })}>
                  Limpiar Formulario
                </Button>
              </div>
            </form>
          </Card>
          </motion.div>
        )}

        {/* My Requests */}
        {view === "seguimiento" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          <Card className="p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Solicitante
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Departamento
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Estado
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-3 font-medium text-slate-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        Cargando solicitudes...
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No hay solicitudes para mostrar
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                      <td className="py-3 px-3 font-medium text-slate-900 text-sm">
                        {req.name}
                      </td>
                      <td className="py-3 px-3 text-slate-700 text-sm">
                        {req.type}
                      </td>
                      <td className="py-3 px-3 text-slate-700 text-sm">
                        {req.department}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            req.status
                          )}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-sm">
                        {req.date}
                      </td>
                      <td className="py-3 px-3">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          </motion.div>
        )}
    </div>
  );
}
