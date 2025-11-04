/**
 * SISTEMA CENTRALIZADO DE CREDENCIALES
 * 
 * Este archivo contiene TODAS las credenciales de firmas digitales del sistema.
 * 
 * ⚠️ IMPORTANTE:
 * - En producción, estas credenciales deben venir del backend
 * - Cambiar aquí cuando haya cambio de personal
 * - Mantener sincronizado con la documentación en CREDENCIALES.md
 */

export interface Credencial {
  cargo: string;
  clave: string;
  descripcion: string;
  responsable: string;
  ultimoCambio: string;
}

/**
 * CREDENCIALES ACTIVAS
 * Actualizar cuando haya cambio de jefe o responsable
 */
export const CREDENCIALES: Record<string, Credencial> = {
  'Jefe inmediato': {
    cargo: 'Jefe inmediato',
    clave: 'JEFE2024',
    descripcion: 'Jefe directo del área solicitante',
    responsable: 'Variable según área',
    ultimoCambio: '2024-01-01'
  },
  
  'Jefe de Talento Humano': {
    cargo: 'Jefe de Talento Humano',
    clave: 'TALENTO2024',
    descripcion: 'Jefe del departamento de Recursos Humanos',
    responsable: 'Jefe de Talento Humano',
    ultimoCambio: '2024-01-01'
  },
  
  'Jefe de Gestión de la Información': {
    cargo: 'Jefe de Gestión de la Información',
    clave: 'GESTION2024',
    descripcion: 'Jefe del departamento de TI/Sistemas',
    responsable: 'Jefe de Gestión de la Información',
    ultimoCambio: '2024-01-01'
  },
  
  'Coordinador de Facturación o Subgerente Financiero': {
    cargo: 'Coordinador de Facturación o Subgerente Financiero',
    clave: 'FINANZAS2024',
    descripcion: 'Responsable del área financiera',
    responsable: 'Coordinador de Facturación',
    ultimoCambio: '2024-01-01'
  },
  
  'Capacitador de historia clínica': {
    cargo: 'Capacitador de historia clínica',
    clave: 'CAPACITAHC2024',
    descripcion: 'Responsable de capacitación en Historia Clínica Electrónica',
    responsable: 'Capacitador HC',
    ultimoCambio: '2024-01-01'
  },
  
  'Capacitador de epidemiología': {
    cargo: 'Capacitador de epidemiología',
    clave: 'CAPACITAEPI2024',
    descripcion: 'Responsable de capacitación en Epidemiología',
    responsable: 'Capacitador Epidemiología',
    ultimoCambio: '2024-01-01'
  },
  
  'Aval institucional': {
    cargo: 'Aval institucional',
    clave: 'AVAL2024',
    descripcion: 'Aval de la Subgerencia o Coordinación',
    responsable: 'Subgerente/Coordinador',
    ultimoCambio: '2024-01-01'
  }
};

/**
 * Obtener credencial por cargo
 */
export const getCredencial = (cargo: string): string | undefined => {
  return CREDENCIALES[cargo]?.clave;
};

/**
 * Validar credencial
 */
export const validarCredencial = (cargo: string, credencial: string): boolean => {
  const credencialCorrecta = getCredencial(cargo);
  return credencialCorrecta === credencial;
};

/**
 * Obtener información completa de credencial
 */
export const getInfoCredencial = (cargo: string): Credencial | undefined => {
  return CREDENCIALES[cargo];
};

/**
 * Listar todos los cargos con credenciales
 */
export const listarCargos = (): string[] => {
  return Object.keys(CREDENCIALES);
};

/**
 * Obtener credenciales para exportar (sin claves)
 */
export const exportarCredencialesSinClaves = () => {
  return Object.entries(CREDENCIALES).map(([cargo, info]) => ({
    cargo,
    descripcion: info.descripcion,
    responsable: info.responsable,
    ultimoCambio: info.ultimoCambio
  }));
};
