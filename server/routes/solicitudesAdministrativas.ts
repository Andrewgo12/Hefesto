import { Request, Response } from 'express';

// Simulación de base de datos (en producción, usar una BD real)
const solicitudesDB: any[] = [];

// Verificar si una cédula ya existe
export const verificarCedula = (req: Request, res: Response) => {
  const { cedula } = req.params;
  
  const existe = solicitudesDB.find(s => s.cedula === cedula && s.estado !== 'Rechazado');
  
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

// Verificar si un login ya existe
export const verificarLogin = (req: Request, res: Response) => {
  const { login } = req.params;
  
  const existe = solicitudesDB.find(s => s.login_asignado === login);
  
  if (existe) {
    return res.json({
      existe: true,
      mensaje: 'Este login ya está en uso'
    });
  }
  
  return res.json({
    existe: false
  });
};

// Validar token de sesión
export const validarToken = (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      valido: false,
      mensaje: 'Token no proporcionado'
    });
  }
  
  // Aquí deberías validar el token con tu sistema de autenticación
  // Por ahora, simulamos que es válido si existe
  const tokenValido = token.length > 10; // Validación básica
  
  if (tokenValido) {
    return res.json({
      valido: true,
      mensaje: 'Token válido'
    });
  }
  
  return res.status(401).json({
    valido: false,
    mensaje: 'Token inválido o expirado'
  });
};

// Obtener todas las solicitudes
export const obtenerSolicitudes = (req: Request, res: Response) => {
  const { estado, tipo } = req.query;
  
  let solicitudes = solicitudesDB;
  
  if (estado) {
    solicitudes = solicitudes.filter(s => s.estado === estado);
  }
  
  if (tipo) {
    solicitudes = solicitudes.filter(s => s.tipo === tipo);
  }
  
  return res.json({
    solicitudes,
    total: solicitudes.length
  });
};

// Obtener solicitud por ID
export const obtenerSolicitudPorId = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const solicitud = solicitudesDB.find(s => s.id === parseInt(id));
  
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
    id: solicitudesDB.length + 1,
    ...req.body,
    fecha_creacion: new Date().toISOString(),
    estado: 'Pendiente'
  };
  
  solicitudesDB.push(nuevaSolicitud);
  
  return res.status(201).json({
    mensaje: 'Solicitud creada exitosamente',
    solicitud: nuevaSolicitud
  });
};

// Actualizar solicitud
export const actualizarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = solicitudesDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesDB[index] = {
    ...solicitudesDB[index],
    ...req.body,
    fecha_actualizacion: new Date().toISOString()
  };
  
  return res.json({
    mensaje: 'Solicitud actualizada exitosamente',
    solicitud: solicitudesDB[index]
  });
};

// Aprobar solicitud
export const aprobarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = solicitudesDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesDB[index].estado = 'Aprobado';
  solicitudesDB[index].fecha_aprobacion = new Date().toISOString();
  solicitudesDB[index].aprobado_por = req.body.aprobado_por;
  
  return res.json({
    mensaje: 'Solicitud aprobada exitosamente',
    solicitud: solicitudesDB[index]
  });
};

// Rechazar solicitud
export const rechazarSolicitud = (req: Request, res: Response) => {
  const { id } = req.params;
  const { motivo } = req.body;
  const index = solicitudesDB.findIndex(s => s.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Solicitud no encontrada'
    });
  }
  
  solicitudesDB[index].estado = 'Rechazado';
  solicitudesDB[index].fecha_rechazo = new Date().toISOString();
  solicitudesDB[index].motivo_rechazo = motivo;
  solicitudesDB[index].rechazado_por = req.body.rechazado_por;
  
  return res.json({
    mensaje: 'Solicitud rechazada',
    solicitud: solicitudesDB[index]
  });
};
