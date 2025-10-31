/**
 * Tipos para los formularios de creación de usuarios
 * Basados en los formatos Excel institucionales
 */

// Formulario de Usuario Administrativo
export interface FormularioAdministrativo {
  // Datos personales
  nombreCompleto: string;
  cedula: string;
  cargo: string;
  dependencia: string;
  area: string;
  
  // Datos de contacto
  correoInstitucional: string;
  extension?: string;
  telefono?: string;
  
  // Información laboral
  fechaIngreso: string;
  tipoContrato: string;
  supervisorInmediato: string;
  
  // Accesos requeridos
  sistemasSolicitados: string[];
  nivelAcceso: "Lectura" | "Escritura" | "Administrador";
  
  // Justificación
  justificacionAcceso: string;
  funcionesPrincipales: string;
  
  // Firmas y aprobaciones
  solicitadoPor: string;
  fechaSolicitud: string;
  aprobadoPor?: string;
  fechaAprobacion?: string;
  
  // Observaciones
  observaciones?: string;
}

// Formulario de Usuario Médico / Historia Clínica
export interface FormularioHistoriaClinica {
  // Datos personales
  nombreCompleto: string;
  cedula: string;
  registroMedico?: string;
  especialidad: string;
  
  // Datos de contacto
  correoInstitucional: string;
  extension?: string;
  telefono?: string;
  celular?: string;
  
  // Información profesional
  tipoProfesional: "Médico General" | "Especialista" | "Residente" | "Interno" | "Otro";
  institucionFormacion?: string;
  anoGraduacion?: string;
  
  // Servicios y áreas
  servicioAsignado: string;
  areasAtencion: string[];
  turno?: string;
  
  // Accesos a historia clínica
  modulosHistoriaClinica: string[];
  nivelAccesoHistoria: "Consulta" | "Registro" | "Modificación" | "Administrador";
  
  // Accesos adicionales
  accesoLaboratorio: boolean;
  accesoImagenologia: boolean;
  accesoFarmacia: boolean;
  accesoQuirofano: boolean;
  
  // Justificación
  justificacionAcceso: string;
  funcionesAsistenciales: string;
  
  // Capacitación
  capacitacionHistoriaClinica: boolean;
  fechaCapacitacion?: string;
  
  // Firmas y aprobaciones
  solicitadoPor: string;
  fechaSolicitud: string;
  aprobadoJefeServicio?: string;
  aprobadoSistemasInformacion?: string;
  fechaAprobacion?: string;
  
  // Observaciones
  observaciones?: string;
}

// Estado de la solicitud
export type EstadoSolicitud = "Pendiente" | "En revisión" | "Aprobado" | "Rechazado";

// Registro completo con metadatos
export interface RegistroSolicitud {
  id: string;
  tipo: "Administrativo" | "Historia Clínica";
  datos: FormularioAdministrativo | FormularioHistoriaClinica;
  estado: EstadoSolicitud;
  historial: {
    fecha: string;
    accion: string;
    usuario: string;
    comentario?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
