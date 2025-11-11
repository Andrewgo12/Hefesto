import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import * as solicitudesAdmin from "./routes/solicitudesAdministrativas";
import * as solicitudesHC from "./routes/solicitudesHistoriaClinica";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ============================================
  // RUTAS SOLICITUDES ADMINISTRATIVAS
  // ============================================
  
  // Validaciones
  app.get("/api/solicitudes/administrativas/verificar-cedula/:cedula", solicitudesAdmin.verificarCedula);
  app.get("/api/solicitudes/administrativas/verificar-login/:login", solicitudesAdmin.verificarLogin);
  app.post("/api/auth/validar-token", solicitudesAdmin.validarToken);
  
  // CRUD
  app.get("/api/solicitudes/administrativas", solicitudesAdmin.obtenerSolicitudes);
  app.get("/api/solicitudes/administrativas/:id", solicitudesAdmin.obtenerSolicitudPorId);
  app.post("/api/solicitudes/administrativas", solicitudesAdmin.crearSolicitud);
  app.put("/api/solicitudes/administrativas/:id", solicitudesAdmin.actualizarSolicitud);
  
  // Acciones
  app.post("/api/solicitudes/administrativas/:id/aprobar", solicitudesAdmin.aprobarSolicitud);
  app.post("/api/solicitudes/administrativas/:id/rechazar", solicitudesAdmin.rechazarSolicitud);

  // ============================================
  // RUTAS SOLICITUDES HISTORIA CLÍNICA
  // ============================================
  
  // Validaciones
  app.get("/api/solicitudes/historia-clinica/verificar-cedula/:cedula", solicitudesHC.verificarCedula);
  app.get("/api/solicitudes/historia-clinica/verificar-correo/:correo", solicitudesHC.verificarCorreo);
  app.get("/api/solicitudes/historia-clinica/verificar-registro/:registro", solicitudesHC.verificarRegistro);
  app.get("/api/recursos/tablets-disponibles", solicitudesHC.verificarTabletsDisponibles);
  app.get("/api/recursos/terminal-en-uso/:terminal", solicitudesHC.verificarTerminalEnUso);
  app.post("/api/solicitudes/historia-clinica/verificar-permisos-aval", solicitudesHC.verificarPermisosAval);
  
  // CRUD
  app.get("/api/solicitudes/historia-clinica", solicitudesHC.obtenerSolicitudes);
  app.get("/api/solicitudes/historia-clinica/:id", solicitudesHC.obtenerSolicitudPorId);
  app.post("/api/solicitudes/historia-clinica", solicitudesHC.crearSolicitud);
  app.put("/api/solicitudes/historia-clinica/:id", solicitudesHC.actualizarSolicitud);
  
  // Acciones
  app.post("/api/solicitudes/historia-clinica/:id/aprobar", solicitudesHC.aprobarSolicitud);
  app.post("/api/solicitudes/historia-clinica/:id/rechazar", solicitudesHC.rechazarSolicitud);

  return app;
}
