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
 * FORMATO: 4 dígitos numéricos
 */
export const CREDENCIALES: Record<string, Credencial> = {
  'Jefe inmediato': {
    cargo: 'Jefe inmediato',
    clave: '2203',
    descripcion: 'Jefe directo del área solicitante',
    responsable: 'Variable según área',
    ultimoCambio: '2024-11-26'
  },
  
  'Jefe de Talento Humano': {
    cargo: 'Jefe de Talento Humano',
    clave: '1230',
    descripcion: 'Jefe del departamento de Recursos Humanos',
    responsable: 'Jefe de Talento Humano',
    ultimoCambio: '2024-11-26'
  },
  
  'Jefe de Gestión de la Información': {
    cargo: 'Jefe de Gestión de la Información',
    clave: '4567',
    descripcion: 'Jefe del departamento de TI/Sistemas',
    responsable: 'Jefe de Gestión de la Información',
    ultimoCambio: '2024-11-26'
  },
  
  // Alias para compatibilidad
  'Gestión de la Información': {
    cargo: 'Gestión de la Información',
    clave: '4567',
    descripcion: 'Alias para Jefe de Gestión de la Información',
    responsable: 'Jefe de Gestión de la Información',
    ultimoCambio: '2024-11-26'
  },
  
  // Alias Coordinador TIC
  'Coordinador TIC': {
    cargo: 'Coordinador TIC',
    clave: '4567',
    descripcion: 'Coordinador de Tecnologías de Información y Comunicaciones',
    responsable: 'Jefe de Gestión de la Información',
    ultimoCambio: '2024-11-28'
  },
  
  'Coordinador de Facturación o Subgerente Financiero': {
    cargo: 'Coordinador de Facturación o Subgerente Financiero',
    clave: '8901',
    descripcion: 'Responsable del área financiera',
    responsable: 'Coordinador de Facturación',
    ultimoCambio: '2024-11-26'
  },
  
  'Capacitador de historia clínica': {
    cargo: 'Capacitador de historia clínica',
    clave: '3456',
    descripcion: 'Responsable de capacitación en Historia Clínica Electrónica',
    responsable: 'Capacitador HC',
    ultimoCambio: '2024-11-26'
  },
  
  'Capacitador de epidemiología': {
    cargo: 'Capacitador de epidemiología',
    clave: '7890',
    descripcion: 'Responsable de capacitación en Epidemiología',
    responsable: 'Capacitador Epidemiología',
    ultimoCambio: '2024-11-26'
  },
  
  'Aval institucional': {
    cargo: 'Aval institucional',
    clave: '5678',
    descripcion: 'Aval de la Subgerencia o Coordinación',
    responsable: 'Subgerente/Coordinador',
    ultimoCambio: '2024-11-26'
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
  console.log('🔍 validarCredencial llamada:', { 
    cargo, 
    credencial,
    cargoTrim: cargo?.trim(),
    credencialTrim: credencial?.trim(),
    existeEnCREDENCIALES: !!CREDENCIALES[cargo],
    claveEsperada: CREDENCIALES[cargo]?.clave
  });
  
  // Normalizar el cargo (trim y buscar)
  const cargoNormalizado = cargo?.trim();
  const credencialIngresada = credencial?.trim();
  
  const credencialCorrecta = getCredencial(cargoNormalizado);
  
  console.log('📋 Comparación:', {
    credencialCorrecta,
    credencialIngresada,
    sonIguales: credencialCorrecta === credencialIngresada
  });
  
  return credencialCorrecta === credencialIngresada;
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
