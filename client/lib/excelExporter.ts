import * as XLSX from 'xlsx';
import type { FormularioAdministrativo, FormularioHistoriaClinica } from '@shared/types/formularios';

// Utils para trabajar con direcciones de celdas (A1 -> col/row)
function colToNumber(col: string): number {
  let n = 0;
  for (let i = 0; i < col.length; i++) {
    n = n * 26 + (col.charCodeAt(i) - 64);
  }
  return n;
}

function numberToCol(n: number): string {
  let s = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function parseAddr(addr: string): { col: string; row: number } {
  const match = addr.match(/([A-Z]+)(\d+)/);
  if (!match) return { col: 'A', row: 1 };
  return { col: match[1], row: parseInt(match[2], 10) };
}

function offsetAddr(addr: string, dx: number, dy: number): string {
  const { col, row } = parseAddr(addr);
  const cNum = colToNumber(col) + dx;
  const rNum = row + dy;
  return `${numberToCol(cNum)}${rNum}`;
}

function writeCell(ws: XLSX.WorkSheet, addr: string, value: any) {
  if (!ws[addr]) ws[addr] = {} as any;
  (ws[addr] as any).v = value ?? '';
  (ws[addr] as any).t = 's';
}

function findAddrByLabel(ws: XLSX.WorkSheet, label: string): string | null {
  const keys = Object.keys(ws).filter(k => !k.startsWith('!'));
  for (const k of keys) {
    const cell = ws[k] as any;
    if (cell && typeof cell.v === 'string' && cell.v.trim().toLowerCase() === label.trim().toLowerCase()) {
      return k;
    }
  }
  return null;
}

/**
 * Exporta datos de formulario administrativo a Excel
 * Carga los datos en el formato Excel original con las celdas correspondientes
 */
export async function exportarFormularioAdministrativo(
  datos: FormularioAdministrativo,
  archivoPlantilla: string = `${import.meta.env.BASE_URL}Documentos/formatocreacionusuariosAdministrativosv1.xlsx`
): Promise<void> {
  try {
    // Cargar la plantilla Excel
    const response = await fetch(archivoPlantilla);
    if (!response.ok) {
      throw new Error(`No se encontró la plantilla administrativa en ${archivoPlantilla}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Obtener la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Mapear datos a celdas específicas del Excel
    // NOTA: Ajusta las referencias de celdas según el formato real del Excel
    const celdasFormulario = {
      'B5': datos.nombreCompleto,
      'B6': datos.cedula,
      'B7': datos.cargo,
      'B8': (datos as any).dependencia || datos.areaOServicio || '',
      'B9': (datos as any).area || datos.areaOServicio || '',
      'B10': (datos as any).correoInstitucional || '',
      'B11': (datos as any).extension || (datos.telefonoExtension ?? ''),
      'B12': (datos as any).telefono || (datos.telefonoExtension ?? ''),
      'B13': (datos as any).fechaIngreso || '',
      'B14': (datos as any).tipoContrato || datos.tipoVinculacion || '',
      'B15': (datos as any).supervisorInmediato || '',
      'B16': (datos as any).sistemasSolicitados?.join(', ') || '',
      'B17': (datos as any).nivelAcceso || '',
      'B18': (datos as any).justificacionAcceso || '',
      'B19': (datos as any).funcionesPrincipales || '',
      'B20': (datos as any).solicitadoPor || '',
      'B21': (datos as any).fechaSolicitud || '',
      'B22': (datos as any).aprobadoPor || '',
      'B23': (datos as any).fechaAprobacion || '',
      'B24': (datos as any).observaciones || '',
    } as Record<string, any>;
    
    // Aplicar datos por coordenada
    Object.entries(celdasFormulario).forEach(([celda, valor]) => writeCell(worksheet, celda, valor));

    // Fallback por etiquetas si la plantilla no coincide con coordenadas
    const fallbacks: { label: string; offset: [number, number]; value: any }[] = [
      { label: 'Nombre completo:', offset: [1, 0], value: datos.nombreCompleto },
      { label: 'Cédula:', offset: [1, 0], value: datos.cedula },
      { label: 'Cargo:', offset: [1, 0], value: datos.cargo },
      { label: 'Área o servicio:', offset: [1, 0], value: datos.areaOServicio || '' },
      { label: 'Teléfono / Extensión:', offset: [1, 0], value: datos.telefonoExtension || '' },
      { label: 'Fecha de solicitud:', offset: [1, 0], value: (datos as any).fechaSolicitud || '' },
    ];
    for (const fb of fallbacks) {
      const base = findAddrByLabel(worksheet, fb.label);
      if (base) {
        const target = offsetAddr(base, fb.offset[0], fb.offset[1]);
        writeCell(worksheet, target, fb.value);
      }
    }
    
    // Generar archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Descargar archivo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Formato_Administrativo_${datos.cedula}_${new Date().getTime()}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    console.log('Formulario administrativo exportado correctamente');
  } catch (error) {
    console.error('Error al exportar formulario administrativo:', error);
    throw new Error('No se pudo exportar el formulario administrativo');
  }
}

/**
 * Exporta datos de formulario de historia clínica a Excel
 * Carga los datos en el formato Excel original con las celdas correspondientes
 */
export async function exportarFormularioHistoriaClinica(
  datos: FormularioHistoriaClinica,
  archivoPlantilla: string = `${import.meta.env.BASE_URL}Documentos/formatocreacionusuarioshistoriaclinicaelectronicav.xlsx`
): Promise<void> {
  try {
    // Cargar la plantilla Excel
    const response = await fetch(archivoPlantilla);
    if (!response.ok) {
      throw new Error(`No se encontró la plantilla de historia clínica en ${archivoPlantilla}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Obtener la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Mapear datos a celdas específicas del Excel
    // NOTA: Ajusta las referencias de celdas según el formato real del Excel
    const celdasFormulario = {
      'B5': datos.nombreCompleto,
      'B6': datos.cedula,
      'B7': (datos as any).registroMedico || (datos as any).registroCodigo || '',
      'B8': datos.especialidad,
      'B9': (datos as any).correoElectronico || (datos as any).correoInstitucional || '',
      'B10': (datos as any).extension || '',
      'B11': (datos as any).telefono || '',
      'B12': (datos as any).celular || '',
      'B13': (datos as any).perfil || '',
      'B14': (datos as any).institucionFormacion || '',
      'B15': (datos as any).anoGraduacion || '',
      'B16': (datos as any).areaOServicio || (datos as any).servicioAsignado || '',
      'B17': (datos as any).areasAtencion?.join(', ') || '',
      'B18': (datos as any).turno || '',
      'B19': (datos as any).modulosHistoriaClinica?.join(', ') || '',
      'B20': (datos as any).nivelAccesoHistoria || '',
      'B21': (datos as any).accesoLaboratorio ? 'Sí' : 'No',
      'B22': (datos as any).accesoImagenologia ? 'Sí' : 'No',
      'B23': (datos as any).accesoFarmacia ? 'Sí' : 'No',
      'B24': (datos as any).accesoQuirofano ? 'Sí' : 'No',
      'B25': (datos as any).justificacionAcceso || '',
      'B26': (datos as any).funcionesAsistenciales || '',
      'B27': ((datos as any).capacitacionHistoriaClinica?.capacitacionRealizada ? 'Sí' : 'No'),
      'B28': (datos as any).capacitacionHistoriaClinica?.fechaCapacitacion || '',
      'B29': (datos as any).solicitadoPor || '',
      'B30': datos.fechaSolicitud,
      'B31': (datos as any).aprobadoJefeServicio || '',
      'B32': (datos as any).aprobadoSistemasInformacion || '',
      'B33': (datos as any).fechaAprobacion || '',
      'B34': datos.observaciones || '',
    } as Record<string, any>;
    
    // Aplicar datos por coordenada
    Object.entries(celdasFormulario).forEach(([celda, valor]) => writeCell(worksheet, celda, valor));

    // Fallback por etiquetas (plantillas con layout distinto)
    const fallbacks: { label: string; offset: [number, number]; value: any }[] = [
      { label: 'Nombre completo:', offset: [1, 0], value: datos.nombreCompleto },
      { label: 'Cédula:', offset: [1, 0], value: datos.cedula },
      { label: 'Registro / Código:', offset: [1, 0], value: (datos as any).registroMedico || (datos as any).registroCodigo || '' },
      { label: 'Especialidad:', offset: [1, 0], value: datos.especialidad },
      { label: 'Correo electrónico:', offset: [1, 0], value: (datos as any).correoElectronico || (datos as any).correoInstitucional || '' },
      { label: 'Celular:', offset: [1, 0], value: (datos as any).celular || '' },
      { label: 'Perfil (marcar X):', offset: [1, 0], value: (datos as any).perfil || '' },
      { label: 'Fecha de solicitud:', offset: [1, 0], value: datos.fechaSolicitud },
    ];
    for (const fb of fallbacks) {
      const base = findAddrByLabel(worksheet, fb.label);
      if (base) {
        const target = offsetAddr(base, fb.offset[0], fb.offset[1]);
        writeCell(worksheet, target, fb.value);
      }
    }
    
    // Generar archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Descargar archivo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Formato_Historia_Clinica_${datos.cedula}_${new Date().getTime()}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    console.log('Formulario de historia clínica exportado correctamente');
  } catch (error) {
    console.error('Error al exportar formulario de historia clínica:', error);
    throw new Error('No se pudo exportar el formulario de historia clínica');
  }
}

/**
 * Lee un archivo Excel y extrae sus datos
 * Útil para importar solicitudes desde Excel
 */
export async function leerArchivoExcel(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(file);
  });
}

// ==========================
// Helpers de QA (solo DEV)
// ==========================
async function auditSheetLabels(archivoPlantilla: string) {
  const response = await fetch(archivoPlantilla);
  if (!response.ok) throw new Error(`No se pudo cargar plantilla: ${archivoPlantilla}`);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const ws = workbook.Sheets[sheetName];
  const keys = Object.keys(ws).filter(k => !k.startsWith('!'));
  const labels: { addr: string; text: string }[] = [];
  for (const k of keys) {
    const cell = ws[k] as any;
    if (cell && typeof cell.v === 'string') {
      labels.push({ addr: k, text: cell.v });
    }
  }
  labels.sort((a, b) => a.addr.localeCompare(b.addr));
  // Log claro en consola
  console.group(`Auditoría etiquetas - ${sheetName}`);
  labels.forEach(l => console.log(l.addr, '=>', l.text));
  console.groupEnd();
}

declare global {
  interface Window {
    __exportAdmin?: (datos: any) => Promise<void>;
    __exportMedico?: (datos: any) => Promise<void>;
    __auditPlantillaAdmin?: () => Promise<void>;
    __auditPlantillaMedico?: () => Promise<void>;
    __mockAdmin?: () => any;
    __mockMedico?: () => any;
  }
}

if (import.meta.env.DEV) {
  // Exponer helpers para pruebas rápidas desde consola
  window.__exportAdmin = async (datos: any) => {
    await exportarFormularioAdministrativo(datos);
  };
  window.__exportMedico = async (datos: any) => {
    await exportarFormularioHistoriaClinica(datos);
  };
  window.__auditPlantillaAdmin = async () => {
    await auditSheetLabels(`${import.meta.env.BASE_URL}Documentos/formatocreacionusuariosAdministrativosv1.xlsx`);
  };
  window.__auditPlantillaMedico = async () => {
    await auditSheetLabels(`${import.meta.env.BASE_URL}Documentos/formatocreacionusuarioshistoriaclinicaelectronicav.xlsx`);
  };
  window.__mockAdmin = () => ({
    nombreCompleto: 'Juan Pérez',
    cedula: '12345678',
    cargo: 'Analista',
    areaOServicio: 'Sistemas',
    telefonoExtension: '1234',
    tipoVinculacion: 'Planta',
    perfilDe: 'Perfil Administrativo',
    aceptaResponsabilidad: true,
    fechaSolicitud: new Date().toISOString().slice(0,10),
  });
  window.__mockMedico = () => ({
    nombreCompleto: 'Dra. María López',
    cedula: '987654321',
    registroCodigo: 'RM-001',
    especialidad: 'Cardiología',
    correoElectronico: 'medico@hospital.local',
    celular: '3001234567',
    perfil: 'Médico general',
    fechaSolicitud: new Date().toISOString().slice(0,10),
    capacitacionHistoriaClinica: { capacitacionRealizada: true, fechaCapacitacion: new Date().toISOString().slice(0,10) },
    aceptaResponsabilidad: true,
  });
}
