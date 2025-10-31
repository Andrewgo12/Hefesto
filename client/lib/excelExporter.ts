import * as XLSX from 'xlsx';
import type { FormularioAdministrativo, FormularioHistoriaClinica } from '@shared/types/formularios';

/**
 * Exporta datos de formulario administrativo a Excel
 * Carga los datos en el formato Excel original con las celdas correspondientes
 */
export async function exportarFormularioAdministrativo(
  datos: FormularioAdministrativo,
  archivoPlantilla: string = '/lib/Documentos/formato_creacion_usuarios_administrativosv1 (3).xlsx'
): Promise<void> {
  try {
    // Cargar la plantilla Excel
    const response = await fetch(archivoPlantilla);
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
      'B8': datos.dependencia,
      'B9': datos.area,
      'B10': datos.correoInstitucional,
      'B11': datos.extension || '',
      'B12': datos.telefono || '',
      'B13': datos.fechaIngreso,
      'B14': datos.tipoContrato,
      'B15': datos.supervisorInmediato,
      'B16': datos.sistemasSolicitados.join(', '),
      'B17': datos.nivelAcceso,
      'B18': datos.justificacionAcceso,
      'B19': datos.funcionesPrincipales,
      'B20': datos.solicitadoPor,
      'B21': datos.fechaSolicitud,
      'B22': datos.aprobadoPor || '',
      'B23': datos.fechaAprobacion || '',
      'B24': datos.observaciones || '',
    };
    
    // Aplicar datos a las celdas
    Object.entries(celdasFormulario).forEach(([celda, valor]) => {
      if (!worksheet[celda]) {
        worksheet[celda] = {};
      }
      worksheet[celda].v = valor;
      worksheet[celda].t = 's'; // tipo string
    });
    
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
  archivoPlantilla: string = '/lib/Documentos/formato_creacion_usuarios_historia_clinica_electronicav2 (2) (1).xlsx'
): Promise<void> {
  try {
    // Cargar la plantilla Excel
    const response = await fetch(archivoPlantilla);
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
      'B7': datos.registroMedico || '',
      'B8': datos.especialidad,
      'B9': datos.correoInstitucional,
      'B10': datos.extension || '',
      'B11': datos.telefono || '',
      'B12': datos.celular || '',
      'B13': datos.tipoProfesional,
      'B14': datos.institucionFormacion || '',
      'B15': datos.anoGraduacion || '',
      'B16': datos.servicioAsignado,
      'B17': datos.areasAtencion.join(', '),
      'B18': datos.turno || '',
      'B19': datos.modulosHistoriaClinica.join(', '),
      'B20': datos.nivelAccesoHistoria,
      'B21': datos.accesoLaboratorio ? 'Sí' : 'No',
      'B22': datos.accesoImagenologia ? 'Sí' : 'No',
      'B23': datos.accesoFarmacia ? 'Sí' : 'No',
      'B24': datos.accesoQuirofano ? 'Sí' : 'No',
      'B25': datos.justificacionAcceso,
      'B26': datos.funcionesAsistenciales,
      'B27': datos.capacitacionHistoriaClinica ? 'Sí' : 'No',
      'B28': datos.fechaCapacitacion || '',
      'B29': datos.solicitadoPor,
      'B30': datos.fechaSolicitud,
      'B31': datos.aprobadoJefeServicio || '',
      'B32': datos.aprobadoSistemasInformacion || '',
      'B33': datos.fechaAprobacion || '',
      'B34': datos.observaciones || '',
    };
    
    // Aplicar datos a las celdas
    Object.entries(celdasFormulario).forEach(([celda, valor]) => {
      if (!worksheet[celda]) {
        worksheet[celda] = {};
      }
      worksheet[celda].v = valor;
      worksheet[celda].t = 's'; // tipo string
    });
    
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
