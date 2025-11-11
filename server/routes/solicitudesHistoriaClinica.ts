import { Request, Response } from 'express';

// Simulación de base de datos
const solicitudesHCDB: any[] = [];

// Verificar si una cédula ya existe
export const verificarCedula = (req: Request, res: Response) => {
  const { cedula } = req.params;
  
  const existe = solicitudesHCDB.find(s => s.cedula === cedula && s.estado !== 'Rechazado');
  
  if (existe) {
    return res.json({
      existe: true,
      solicitudId: existe.id,
      mensaje: 'Ya existe una solicitud con esta cédula'
    });
  }
  
  return res.json({
    existe: false
  });
};

// Verificar si un correo ya existe
export const verificarCorreo = (req: Request, res: Response) => {
  const { correo } = req.params;
  
  const existe = solicitudesHCDB.find(s => s.correo_electronico === correo);
  
  if (existe) {
    return res.json({
      existe: true,
      mensaje: 'Este correo electrónico ya está registrado'
    });
  }
  
  return res.json({
    existe: false
  });
};

// Verificar si un registro/código ya existe
export const verificarRegistro = (req: Request, res: Response) => {
  const { registro } = req.params;
  
  const existe = solicitudesHCDB.find(s => s.registro_codigo === registro);
  
  if (existe) {
    return res.json({
      existe: true,
      mensaje: 'Este registro/código ya está en uso'
    });
  }
  
  return res.json({
    existe: false
  });
};

// Verificar disponibilidad de tablets
export const verificarTabletsDisponibles = (req: Request, res: Response) => {
  // Simulación: en producción, consultar inventario real
  const tabletsEnUso = solicitudesHCDB.filter(s => 
    s.terminal_asignado === 'Tablet' && 
    s.estado === 'Aprobado'
  ).length;
  
  const totalTablets = 10; // Total de tablets disponibles
  const disponibles = totalTablets - tabletsEnUso;
  
  return res.json({
    disponible: disponibles > 0,
    cantidad_disponible: disponibles,
    total: totalTablets,
    en_uso: tabletsEnUso
  });
};

// Verificar si un terminal está en uso
export const verificarTerminalEnUso = (req: Request, res: Response) => {
  const { terminal } = req.params;
  
  const enUso = solicitudesHCDB.find(s => 
    s.terminal_asignado === terminal && 
    s.estado === 'Aprobado'
  );
  
  if (enUso) {
    return res.json({
      en_uso: true,
      solicitud_id: enUso.id,
      usuario: enUso.nombre_completo
    });
  }
  
  return res.json({
    en_uso: false
  });
};

// Verificar permisos de aval
export const verificarPermisosAval = (req: Request, res: Response) => {
  const { nombre_aval } = req.body;
  
  // Simulación: lista de personas autorizadas para avalar
  const personasAutorizadas = [
    'Subgerente',
    'Coordinador',
    'Director Médico',
    'Jefe de Área'
  ];
  
  // Verificar si el nombre contiene algún cargo autorizado
  const tienePermisos = personasAutorizadas.some(cargo => 
    nombre_aval?.toLowerCase().includes(cargo.toLowerCase())
  );
  
  if (tienePermisos) {
    return res.json({
      tiene_permisos: true,
      mensaje: 'Persona autorizada para avalar'
    });
  }
  
  return res.json({
    tiene_permisos: false,
    mensaje: 'Esta persona no tiene permisos para avalar solicitudes'
  });
};

// Obtener todas las solicitudes
export const obtenerSolicitudes = (req: Request, res: Response) => {
  const { estado } = req.query;
  
  let solicitudes = solicitudesHCDB;
  
  if (estado) {
    solicitudes = solicitudes.filter(s => s.estado === estado);
  }
  
  return res.json({
    solicitudes,
    total: solicitudes.length
  });
};

// Obtener solicitud por ID
export const obtenerSolicitudPorId = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const solicitud = solicitudesHCDB.find(s => s.id === parseInt(id));
  
  if (!solicitud) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  return res.json(solicitud);
};

// Crear nueva solicitud
export const crearSolicitud = (req: Request, res: Response) => {
  const nuevaSolicitud = {
    id: solicitudesHCDB.length + 1,
    ...req.body,
    fecha_creacion: new Date().toISOString(),
    estado: 'Pendiente'
  };
  
  solicitudesHCDB.push(nuevaSolicitud);
  
  return res.status(201).json({
    mensaje: 'Solicitud de historia clínica creada exitosamente',
    solicitud: nuevaSolicitud
  });
};

// Actualizar solicitud
export const actualizarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = solicitudesHCDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesHCDB[index] = {
    ...solicitudesHCDB[index],
    ...req.body,
    fecha_actualizacion: new Date().toISOString()
  };
  
  return res.json({
    mensaje: 'Solicitud actualizada exitosamente',
    solicitud: solicitudesHCDB[index]
  });
};

// Aprobar solicitud
export const aprobarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = solicitudesHCDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesHCDB[index].estado = 'Aprobado';
  solicitudesHCDB[index].fecha_aprobacion = new Date().toISOString();
  
  return res.json({
    mensaje: 'Solicitud aprobada exitosamente',
    solicitud: solicitudesHCDB[index]
  });
};

// Rechazar solicitud
export const rechazarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const { motivo } = req.body;
  const index = solicitudesHCDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesHCDB[index].estado = 'Rechazado';
  solicitudesHCDB[index].fecha_rechazo = new Date().toISOString();
  solicitudesHCDB[index].motivo_rechazo = motivo;
  
  return res.json({
    mensaje: 'Solicitud rechazada',
    solicitud: solicitudesHCDB[index]
  });
};
