/**
 * Validaciones robustas para formularios de solicitudes
 * Previene errores de guardado y pérdida de datos
 */

interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}

interface SolicitudAdministrativa {
    nombre_completo?: string;
    cedula?: string;
    cargo?: string;
    area_servicio?: string;
    tipo_vinculacion?: string;
    modulos_administrativos?: any;
    modulos_financieros?: any;
    opciones_web?: any;
    firmas?: any;
}

interface SolicitudHistoriaClinica {
    nombre_completo?: string;
    cedula?: string;
    cargo?: string;
    area_servicio?: string;
    tipo_vinculacion?: string;
    modulos_historia_clinica?: any;
    perfil?: string;
    opciones_web?: any;
    firmas?: any;
}

/**
 * Valida que un campo no esté vacío
 */
function validarCampoRequerido(valor: any, nombreCampo: string): string | null {
    if (valor === null || valor === undefined || valor === '') {
        return `El campo "${nombreCampo}" es requerido`;
    }
    return null;
}

/**
 * Valida formato de cédula colombiana
 */
function validarCedula(cedula: string): string | null {
    if (!cedula) return 'La cédula es requerida';

    const cedulaLimpia = cedula.replace(/\D/g, '');

    if (cedulaLimpia.length < 6 || cedulaLimpia.length > 10) {
        return 'La cédula debe tener entre 6 y 10 dígitos';
    }

    return null;
}

/**
 * Valida que un objeto JSON sea válido
 */
function validarJSON(data: any, nombreCampo: string): string | null {
    if (!data) return null;

    try {
        if (typeof data === 'string') {
            JSON.parse(data);
        } else if (typeof data === 'object') {
            JSON.stringify(data);
        }
        return null;
    } catch (error) {
        return `El campo "${nombreCampo}" contiene JSON inválido`;
    }
}

/**
 * Valida estructura de módulos (administrativos o financieros)
 */
function validarModulos(modulos: any, nombreCampo: string): string | null {
    if (!modulos) return null;

    try {
        const modulosObj = typeof modulos === 'string' ? JSON.parse(modulos) : modulos;

        if (typeof modulosObj !== 'object') {
            return `${nombreCampo} debe ser un objeto`;
        }

        // Validar que cada módulo tenga la estructura correcta
        for (const [modulo, permisos] of Object.entries(modulosObj)) {
            if (typeof permisos !== 'object') {
                return `Los permisos del módulo "${modulo}" deben ser un objeto`;
            }

            // Validar que tenga al menos una de las claves: A, C, M, B
            const permisosObj = permisos as any;
            const tieneClavesValidas = ['A', 'C', 'M', 'B', 'adicionar', 'consultar', 'modificar', 'borrar']
                .some(key => key in permisosObj);

            if (!tieneClavesValidas) {
                return `El módulo "${modulo}" no tiene permisos válidos (A, C, M, B)`;
            }
        }

        return null;
    } catch (error) {
        return `Error al validar ${nombreCampo}: ${error}`;
    }
}

/**
 * Valida estructura de firmas
 */
function validarFirmas(firmas: any): string | null {
    if (!firmas) return null;

    try {
        const firmasObj = typeof firmas === 'string' ? JSON.parse(firmas) : firmas;

        if (typeof firmasObj !== 'object') {
            return 'Las firmas deben ser un objeto';
        }

        // Validar que cada firma tenga la estructura correcta
        for (const [cargo, firma] of Object.entries(firmasObj)) {
            const firmaObj = firma as any;

            if (!firmaObj.usuario) {
                return `La firma de "${cargo}" no tiene usuario`;
            }

            if (!firmaObj.fecha) {
                return `La firma de "${cargo}" no tiene fecha`;
            }
        }

        return null;
    } catch (error) {
        return `Error al validar firmas: ${error}`;
    }
}

/**
 * Valida solicitud administrativa completa
 */
export function validarSolicitudAdministrativa(
    solicitud: SolicitudAdministrativa
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Campos requeridos
    const errorNombre = validarCampoRequerido(solicitud.nombre_completo, 'Nombre completo');
    if (errorNombre) errors.push(errorNombre);

    const errorCedula = validarCedula(solicitud.cedula || '');
    if (errorCedula) errors.push(errorCedula);

    const errorCargo = validarCampoRequerido(solicitud.cargo, 'Cargo');
    if (errorCargo) errors.push(errorCargo);

    const errorArea = validarCampoRequerido(solicitud.area_servicio, 'Área/Servicio');
    if (errorArea) errors.push(errorArea);

    // Validar JSON
    const errorModulosAdmin = validarJSON(solicitud.modulos_administrativos, 'Módulos administrativos');
    if (errorModulosAdmin) errors.push(errorModulosAdmin);

    const errorModulosFin = validarJSON(solicitud.modulos_financieros, 'Módulos financieros');
    if (errorModulosFin) errors.push(errorModulosFin);

    const errorOpciones = validarJSON(solicitud.opciones_web, 'Opciones web');
    if (errorOpciones) errors.push(errorOpciones);

    const errorFirmas = validarFirmas(solicitud.firmas);
    if (errorFirmas) errors.push(errorFirmas);

    // Validar estructura de módulos
    if (!errorModulosAdmin) {
        const errorEstructuraAdmin = validarModulos(solicitud.modulos_administrativos, 'Módulos administrativos');
        if (errorEstructuraAdmin) errors.push(errorEstructuraAdmin);
    }

    if (!errorModulosFin) {
        const errorEstructuraFin = validarModulos(solicitud.modulos_financieros, 'Módulos financieros');
        if (errorEstructuraFin) errors.push(errorEstructuraFin);
    }

    // Warnings
    if (!solicitud.modulos_administrativos && !solicitud.modulos_financieros) {
        warnings.push('No se han seleccionado módulos administrativos ni financieros');
    }

    if (!solicitud.firmas || Object.keys(solicitud.firmas).length === 0) {
        warnings.push('No hay firmas registradas');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Valida solicitud de historia clínica completa
 */
export function validarSolicitudHistoriaClinica(
    solicitud: SolicitudHistoriaClinica
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Campos requeridos
    const errorNombre = validarCampoRequerido(solicitud.nombre_completo, 'Nombre completo');
    if (errorNombre) errors.push(errorNombre);

    const errorCedula = validarCedula(solicitud.cedula || '');
    if (errorCedula) errors.push(errorCedula);

    const errorCargo = validarCampoRequerido(solicitud.cargo, 'Cargo');
    if (errorCargo) errors.push(errorCargo);

    const errorArea = validarCampoRequerido(solicitud.area_servicio, 'Área/Servicio');
    if (errorArea) errors.push(errorArea);

    // Validar JSON
    const errorModulosHC = validarJSON(solicitud.modulos_historia_clinica, 'Módulos historia clínica');
    if (errorModulosHC) errors.push(errorModulosHC);

    const errorOpciones = validarJSON(solicitud.opciones_web, 'Opciones web');
    if (errorOpciones) errors.push(errorOpciones);

    const errorFirmas = validarFirmas(solicitud.firmas);
    if (errorFirmas) errors.push(errorFirmas);

    // Validar estructura de módulos
    if (!errorModulosHC) {
        const errorEstructuraHC = validarModulos(solicitud.modulos_historia_clinica, 'Módulos historia clínica');
        if (errorEstructuraHC) errors.push(errorEstructuraHC);
    }

    // Warnings
    if (!solicitud.modulos_historia_clinica || Object.keys(solicitud.modulos_historia_clinica).length === 0) {
        warnings.push('No se han seleccionado módulos de historia clínica');
    }

    if (!solicitud.perfil) {
        warnings.push('No se ha especificado el perfil');
    }

    if (!solicitud.firmas || Object.keys(solicitud.firmas).length === 0) {
        warnings.push('No hay firmas registradas');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Sanitiza datos antes de enviar al servidor
 * Convierte objetos a JSON strings y limpia valores
 */
export function sanitizarDatos(datos: any): any {
    const sanitized = { ...datos };

    // Convertir objetos a JSON strings
    const camposJSON = [
        'modulos_administrativos',
        'modulos_financieros',
        'modulos_historia_clinica',
        'opciones_web',
        'firmas',
        'tipo_permiso',
        'capacitacion_historia_clinica',
        'capacitacion_epidemiologia',
        'aval_institucional',
    ];

    for (const campo of camposJSON) {
        if (sanitized[campo] && typeof sanitized[campo] === 'object') {
            sanitized[campo] = JSON.stringify(sanitized[campo]);
        }
    }

    // Convertir booleanos a 1/0
    const camposBooleanos = ['acepta_responsabilidad'];

    for (const campo of camposBooleanos) {
        if (campo in sanitized) {
            sanitized[campo] = sanitized[campo] ? 1 : 0;
        }
    }

    // Limpiar strings (trim)
    for (const [key, value] of Object.entries(sanitized)) {
        if (typeof value === 'string') {
            sanitized[key] = value.trim();
        }
    }

    return sanitized;
}

/**
 * Guarda datos temporalmente en localStorage
 */
export function guardarTemporalmente(tipo: string, id: number, datos: any): void {
    const key = `temp_${tipo}_${id}`;
    const timestamp = Date.now();

    localStorage.setItem(key, JSON.stringify({
        datos,
        timestamp,
    }));

    console.log(`💾 Datos guardados temporalmente: ${key}`);
}

/**
 * Recupera datos temporales de localStorage
 */
export function recuperarTemporales(tipo: string, id: number): any | null {
    const key = `temp_${tipo}_${id}`;
    const stored = localStorage.getItem(key);

    if (!stored) return null;

    try {
        const { datos, timestamp } = JSON.parse(stored);

        // Expirar después de 24 horas
        const edad = Date.now() - timestamp;
        if (edad > 24 * 60 * 60 * 1000) {
            localStorage.removeItem(key);
            return null;
        }

        console.log(`📂 Datos temporales recuperados: ${key}`);
        return datos;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
}

/**
 * Limpia datos temporales
 */
export function limpiarTemporales(tipo: string, id: number): void {
    const key = `temp_${tipo}_${id}`;
    localStorage.removeItem(key);
    console.log(`🗑️ Datos temporales eliminados: ${key}`);
}
