import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Eye, Download, FileText } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { FormularioAdministrativo, FormularioHistoriaClinica } from "@shared/types/formularios";
import { exportarFormularioAdministrativo, exportarFormularioHistoriaClinica } from "@/lib/excelExporter";

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
  
  const [formDataAdmin, setFormDataAdmin] = useState<Partial<FormularioAdministrativo>>({
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

  const [formDataMedico, setFormDataMedico] = useState<Partial<FormularioHistoriaClinica>>({
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

  const myRequests: RegistrationRequest[] = [
    {
      id: 1,
      name: "Luis García",
      type: "Administrativo",
      department: "Recursos Humanos",
      status: "Aprobado",
      date: "2024-01-10",
    },
    {
      id: 2,
      name: "Dr. Carlos Martín",
      type: "Médico",
      department: "Cardiología",
      status: "En revisión",
      date: "2024-01-15",
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      type: "Administrativo",
      department: "Facturación",
      status: "Pendiente",
      date: "2024-01-16",
    },
  ];

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

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formDataAdmin.nombreCompleto || !formDataAdmin.cedula) {
        alert("Por favor completa los campos obligatorios");
        return;
      }
      
      alert("Solicitud enviada correctamente");
      await exportarFormularioAdministrativo(formDataAdmin as FormularioAdministrativo);
    } catch (error) {
      console.error("Error al procesar solicitud:", error);
      alert("Error al procesar la solicitud");
    }
  };

  const handleSubmitMedico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formDataMedico.nombreCompleto || !formDataMedico.cedula) {
        alert("Por favor completa los campos obligatorios");
        return;
      }
      
      alert("Solicitud enviada correctamente");
      await exportarFormularioHistoriaClinica(formDataMedico as FormularioHistoriaClinica);
    } catch (error) {
      console.error("Error al procesar solicitud:", error);
      alert("Error al procesar la solicitud");
    }
  };

  const handleInputChangeAdmin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataAdmin({
      ...formDataAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeMedico = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataMedico({
      ...formDataMedico,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChangeAdmin = (name: string, value: any) => {
    setFormDataAdmin({
      ...formDataAdmin,
      [name]: value,
    });
  };

  const handleSelectChangeMedico = (name: string, value: any) => {
    setFormDataMedico({
      ...formDataMedico,
      [name]: value,
    });
  };

  const handleCheckboxChangeMedico = (name: string, checked: boolean) => {
    setFormDataMedico({
      ...formDataMedico,
      [name]: checked,
    });
  };

  const getTitle = () => {
    switch (view) {
      case "administrativo":
        return "Solicitud de Usuario Administrativo";
      case "medico":
        return "Solicitud de Usuario Médico";
      case "seguimiento":
        return "Mis Solicitudes";
      default:
        return "Módulo de Registro";
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            {getTitle()}
          </h1>
          <p className="text-sm text-slate-600">
            {view === "administrativo" && "Crea una solicitud para un nuevo usuario administrativo"}
            {view === "medico" && "Crea una solicitud para un nuevo usuario médico con acceso a historia clínica"}
            {view === "seguimiento" && "Visualiza el estado de todas tus solicitudes"}
          </p>
        </div>

        {/* Administrative User Form */}
        {view === "administrativo" && (
          <Card className="p-4 md:p-6">
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
                      placeholder="Ej: Juan Carlos Pérez López"
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
                      placeholder="Ej: Analista Administrativo"
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
        )}

        {/* Medical User Form */}
        {view === "medico" && (
          <Card className="p-4 md:p-6">
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
        )}

        {/* My Requests */}
        {view === "seguimiento" && (
          <Card className="p-4 md:p-6">
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
                  {myRequests.map((req) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
