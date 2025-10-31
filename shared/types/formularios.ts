/**
 * Tipos para los formularios de creación de usuarios
 * Basados en los formatos Excel institucionales oficiales
 * 
 * FOR-GDI-SIS-004: Formato Creación de Usuarios Administrativos (v1 - 23/11/2020)
 * FOR-GDI-SIS-003: Formato Creación de Usuarios Historia Clínica Electrónica (v2 - 18/08/2021)
 */

// ========================================
// FORMATO ADMINISTRATIVO (FOR-GDI-SIS-004)
// ========================================

export type TipoVinculacion = "Planta" | "Agremiado" | "Contrato";
export type TipoPermiso = "A" | "C" | "M" | "B"; // Anular, Consultar, Modificar, Borrar

export interface ModulosServinteAdministrativo {
  facturacion: boolean;
  anticipos: boolean;
  farmacia: boolean;
  suministros: boolean;
  cartera: boolean;
  glosas: boolean;
  admisiones: boolean;
  ayudasDiagnosticas: boolean;
  citasMedicas: boolean;
  cirugia: boolean;
  rips: boolean;
  anexos: boolean;
}

export interface ModulosServinteFinanciero {
  presupuesto: boolean;
  contabilidad: boolean;
  activosFijos: boolean;
  cuentasPorPagar: boolean;
  cajaYBancos: boolean;
  costos: boolean;
  administracionDocumentos: boolean;
}

export interface OpcionesWeb {
  internet: boolean;
  correoElectronico: boolean;
  transferenciaArchivos: boolean;
  otros: string;
}

export interface FirmasAdministrativo {
  jefeInmediato?: string;
  jefeTalentoHumano?: string;
  jefeGestionInformacion?: string;
  coordinadorFacturacionOSubgerenteFinanciero?: string;
  firmaUsuarioSolicitante?: string;
}

export interface FormularioAdministrativo {
  // Encabezado
  codigoFormato: string; // FOR-GDI-SIS-004
  version: string; // 1
  fechaEmision: string; // 23/11/2020
  fechaSolicitud: string; // día/mes/año
  
  // Datos del solicitante
  nombreCompleto: string;
  cedula: string;
  cargo: string;
  areaOServicio: string;
  telefonoExtension: string;
  
  // Tipo de vinculación
  tipoVinculacion: TipoVinculacion;
  
  // Aplicaciones / módulos SERVINTE ADMINISTRATIVO
  modulosAdministrativos: ModulosServinteAdministrativo;
  
  // Aplicaciones / módulos SERVINTE FINANCIERO
  modulosFinancieros: ModulosServinteFinanciero;
  
  // Tipo de permiso
  tipoPermiso: TipoPermiso[];
  perfilDe: string; // "Perfil de: _______"
  
  // Opciones Web
  opcionesWeb: OpcionesWeb;
  
  // Vo. Bo. y Firmas (5 firmas requeridas)
  firmas: FirmasAdministrativo;
  
  // Espacio reservado para sistemas
  loginAsignado?: string;
  claveTemporal?: string;
  
  // Declaración de aceptación
  aceptaResponsabilidad: boolean;
}

// ========================================
// FORMATO HISTORIA CLÍNICA (FOR-GDI-SIS-003)
// ========================================

export type PerfilMedico = 
  | "Médico especialista"
  | "Médico residente"
  | "Médico general"
  | "Auditor"
  | "Enfermero jefe"
  | "Auxiliar de enfermería"
  | "Terapeuta"
  | "Otro";

export type TipoVinculacionMedico = "Interno" | "Externo";
export type TipoTerminal = "Tablet" | "Portátil" | "Otro";

export interface CapacitacionHistoriaClinica {
  capacitacionRealizada: boolean;
  nombreCapacitador?: string;
  fechaCapacitacion?: string; // día/mes/año
  firmaCapacitador?: string;
}

export interface CapacitacionEpidemiologia {
  capacitacionRealizada: boolean;
  nombreCapacitador?: string;
  fechaCapacitacion?: string; // día/mes/año
  firmaCapacitador?: string;
}

export interface AvalInstitucional {
  avaladoPor: string;
  cargo: string;
  firmaAvalador: string;
  fecha: string; // día/mes/año
}

export interface FirmasHistoriaClinica {
  capacitadorHistoriaClinica?: string;
  capacitadorEpidemiologia?: string;
  avalInstitucional?: string; // Subgerencia o coordinación
  jefeGestionInformacion?: string;
  talentoHumanoOSistemas?: string; // Creación de usuario
  firmaUsuarioSolicitante?: string;
}

export interface FormularioHistoriaClinica {
  // Encabezado
  codigoFormato: string; // FOR-GDI-SIS-003
  version: string; // 2
  fechaEmision: string; // 18/08/2021
  fechaSolicitud: string; // día/mes/año
  
  // Datos del solicitante
  nombreCompleto: string;
  cedula: string;
  celular: string;
  correoElectronico: string;
  registroCodigo: string;
  areaOServicio: string;
  especialidad: string;
  observaciones?: string;
  
  // Perfil
  perfil: PerfilMedico;
  perfilOtro?: string; // Si perfil = "Otro"
  
  // Tipo de vinculación
  tipoVinculacion: TipoVinculacionMedico;
  
  // Terminal asignado
  terminalAsignado: TipoTerminal;
  terminalOtro?: string; // Si terminal = "Otro"
  
  // Capacitación en historia clínica electrónica
  capacitacionHistoriaClinica: CapacitacionHistoriaClinica;
  
  // Capacitación en epidemiología (solo para médicos generales o especialistas)
  capacitacionEpidemiologia?: CapacitacionEpidemiologia;
  
  // Aval institucional
  avalInstitucional: AvalInstitucional;
  
  // Firmas requeridas (5 a 6 según caso)
  firmas: FirmasHistoriaClinica;
  
  // Login creado por
  loginCreadoPor?: string;
  
  // Declaración de aceptación
  aceptaResponsabilidad: boolean;
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
