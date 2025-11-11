import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FirmaDigital from "@/components/FirmaDigital";
import SimpleCaptcha from "@/components/SimpleCaptcha";
import { Download, Send, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { solicitudesAdministrativas, catalogos } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { FormularioAdministrativo, ModulosServinteAdministrativo, ModulosServinteFinanciero, OpcionesWeb, FirmasAdministrativo } from "@shared/types/formularios";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem, scaleIn, fadeInLeft, fadeInRight } from "@/lib/animations";

const STORAGE_KEY = 'hefesto_registro_administrativo';

export default function RegistroAdministrativo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idEditar = searchParams.get('editar');
  
  // Cargar datos guardados de localStorage al iniciar
  const [formData, setFormData] = useState<Partial<FormularioAdministrativo>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error al cargar datos guardados:', e);
      }
    }
    return {
    codigoFormato: 'FOR-GDI-SIS-004',
    version: '1',
    fechaEmision: '23/11/2020',
    fechaSolicitud: new Date().toLocaleString('es-CO', { hour12: false }),
    nombreCompleto: '',
    cedula: '',
    cargo: '',
    areaOServicio: '',
    telefonoExtension: '',
    tipoVinculacion: 'Planta',
    modulosAdministrativos: {
      facturacion: false,
      anticipos: false,
      farmacia: false,
      suministros: false,
      cartera: false,
      glosas: false,
      admisiones: false,
      ayudasDiagnosticas: false,
      citasMedicas: false,
      cirugia: false,
      rips: false,
      anexos: false,
    },
    modulosFinancieros: {
      presupuesto: false,
      contabilidad: false,
      activosFijos: false,
      cuentasPorPagar: false,
      cajaYBancos: false,
      costos: false,
      administracionDocumentos: false,
    },
    tipoPermiso: [],
    perfilDe: '',
    opcionesWeb: {
      internet: false,
      correoElectronico: false,
      transferenciaArchivos: false,
      otros: '',
    },
    firmas: {},
      aceptaResponsabilidad: false,
    };
  });

  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState<any[]>([]);
  const [cargos, setCargos] = useState<any[]>([]);
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
  const [cargandoSolicitud, setCargandoSolicitud] = useState(false);

  // Cargar catálogos al iniciar
  useEffect(() => {
    cargarCatalogos();
  }, []);

  // Cargar datos de la solicitud si estamos editando
  useEffect(() => {
    if (idEditar) {
      cargarSolicitudParaEditar(idEditar);
    }
  }, [idEditar]);

  const cargarSolicitudParaEditar = async (id: string) => {
    try {
      setCargandoSolicitud(true);
      toast.info('Cargando solicitud...', 'Por favor espera');
      const response = await solicitudesAdministrativas.getById(parseInt(id));
      const solicitud = response.data;
      
      if (solicitud) {
        console.log('📥 Datos recibidos de la API:', solicitud);
        
        // Parsear JSON strings si es necesario
        const modulosAdmin = typeof solicitud.modulos_administrativos === 'string' 
          ? JSON.parse(solicitud.modulos_administrativos) 
          : solicitud.modulos_administrativos || {};
        
        const modulosFinan = typeof solicitud.modulos_financieros === 'string'
          ? JSON.parse(solicitud.modulos_financieros)
          : solicitud.modulos_financieros || {};
        
        const opcionesWeb = typeof solicitud.opciones_web === 'string'
          ? JSON.parse(solicitud.opciones_web)
          : solicitud.opciones_web || {};
        
        const firmas = typeof solicitud.firmas === 'string'
          ? JSON.parse(solicitud.firmas)
          : solicitud.firmas || {};
        
        console.log('📦 Módulos administrativos parseados:', modulosAdmin);
        console.log('📦 Módulos financieros parseados:', modulosFinan);
        
        // Mapear los datos de la API al formato del formulario
        const datosExistentes: Partial<FormularioAdministrativo> = {
          codigoFormato: solicitud.codigo_formato || 'FOR-GDI-SIS-004',
          version: solicitud.version || '1',
          fechaEmision: solicitud.fecha_emision || '23/11/2020',
          fechaSolicitud: solicitud.fecha_solicitud || new Date().toLocaleString('es-CO', { hour12: false }),
          nombreCompleto: solicitud.nombre_completo || '',
          cedula: solicitud.cedula || '',
          cargo: solicitud.cargo || '',
          areaOServicio: solicitud.area_servicio || '',
          telefonoExtension: solicitud.telefono_extension || '',
          tipoVinculacion: solicitud.tipo_vinculacion || 'Planta',
          modulosAdministrativos: modulosAdmin,
          modulosFinancieros: modulosFinan,
          opcionesWeb: opcionesWeb,
          firmas: firmas,
          loginAsignado: solicitud.login_asignado || '',
          claveTemporal: solicitud.clave_temporal || '',
          aceptaResponsabilidad: solicitud.acepta_responsabilidad === 1 || solicitud.acepta_responsabilidad === true,
        };
        
        console.log('✅ Datos mapeados para el formulario:', datosExistentes);
        setFormData(datosExistentes);
        
        // Cargar permisos detallados (A, C, M, B) para módulos administrativos
        const permisosAdminCargados: Record<string, Record<string, boolean>> = {};
        Object.keys(modulosAdmin).forEach((modulo) => {
          const permisos = modulosAdmin[modulo];
          permisosAdminCargados[modulo] = {
            A: permisos.A === 1 || permisos.A === '1' || permisos.adicionar === 1 || permisos.adicionar === '1',
            C: permisos.C === 1 || permisos.C === '1' || permisos.consultar === 1 || permisos.consultar === '1',
            M: permisos.M === 1 || permisos.M === '1' || permisos.modificar === 1 || permisos.modificar === '1',
            B: permisos.B === 1 || permisos.B === '1' || permisos.borrar === 1 || permisos.borrar === '1',
          };
        });
        console.log('✅ Permisos administrativos cargados:', permisosAdminCargados);
        
        // Verificar que los valores son booleanos
        Object.keys(permisosAdminCargados).forEach(modulo => {
          console.log(`  ${modulo}:`, permisosAdminCargados[modulo]);
        });
        
        setPermisoAdmin(permisosAdminCargados);
        
        // Cargar permisos detallados (A, C, M, B) para módulos financieros
        const permisosFinCargados: Record<string, Record<string, boolean>> = {};
        Object.keys(modulosFinan).forEach((modulo) => {
          const permisos = modulosFinan[modulo];
          permisosFinCargados[modulo] = {
            A: permisos.A === 1 || permisos.A === '1' || permisos.adicionar === 1 || permisos.adicionar === '1',
            C: permisos.C === 1 || permisos.C === '1' || permisos.consultar === 1 || permisos.consultar === '1',
            M: permisos.M === 1 || permisos.M === '1' || permisos.modificar === 1 || permisos.modificar === '1',
            B: permisos.B === 1 || permisos.B === '1' || permisos.borrar === 1 || permisos.borrar === '1',
          };
        });
        setPermisoFin(permisosFinCargados);
        console.log('✅ Permisos financieros cargados:', permisosFinCargados);
        
        // Cargar nivel de anexos
        if (solicitud.anexos_nivel) {
          setAnexosNivel(solicitud.anexos_nivel as '1' | '2' | '3');
          console.log('✅ Nivel de anexos cargado:', solicitud.anexos_nivel);
        }
        
        toast.success('Solicitud cargada', 'Puedes continuar editando');
      }
    } catch (error: any) {
      console.error('❌ Error al cargar solicitud:', error);
      toast.error('Error', 'No se pudo cargar la solicitud para editar');
      navigate('/control/aprobacion');
    } finally {
      setCargandoSolicitud(false);
    }
  };

  const cargarCatalogos = async () => {
    try {
      setCargandoCatalogos(true);
      const response = await catalogos.todos();
      const data = response.data?.data || response.data || {};
      
      setAreas(data.areas || []);
      setCargos(data.cargos || []);
    } catch (error) {
      console.error('Error al cargar catálogos:', error);
      // Catálogos por defecto
      setAreas([
        { id: 1, nombre: 'Administración' },
        { id: 2, nombre: 'Finanzas' },
        { id: 3, nombre: 'Recursos Humanos' },
      ]);
      setCargos([
        { id: 1, nombre: 'Coordinador', tipo: 'administrativo' },
        { id: 2, nombre: 'Asistente', tipo: 'administrativo' },
        { id: 3, nombre: 'Analista', tipo: 'administrativo' },
      ]);
    } finally {
      setCargandoCatalogos(false);
    }
  };

  // Guardar en localStorage cada vez que cambie formData
  useEffect(() => {
    if (!idEditar) {
      // Solo guardar en localStorage si NO estamos editando
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, idEditar]);

  // Inicializar permisos cuando se carga formData (para edición)
  useEffect(() => {
    if (formData.modulosAdministrativos && Object.keys(formData.modulosAdministrativos).length > 0) {
      const permisosInit: Record<string, Record<string, boolean>> = {};
      Object.keys(formData.modulosAdministrativos).forEach((modulo) => {
        if (!permisoAdmin[modulo]) {
          permisosInit[modulo] = { A: false, C: false, M: false, B: false };
        }
      });
      if (Object.keys(permisosInit).length > 0) {
        setPermisoAdmin(prev => ({ ...prev, ...permisosInit }));
      }
    }
  }, [formData.modulosAdministrativos]);

  useEffect(() => {
    if (formData.modulosFinancieros && Object.keys(formData.modulosFinancieros).length > 0) {
      const permisosInit: Record<string, Record<string, boolean>> = {};
      Object.keys(formData.modulosFinancieros).forEach((modulo) => {
        if (!permisoFin[modulo]) {
          permisosInit[modulo] = { A: false, C: false, M: false, B: false };
        }
      });
      if (Object.keys(permisosInit).length > 0) {
        setPermisoFin(prev => ({ ...prev, ...permisosInit }));
      }
    }
  }, [formData.modulosFinancieros]);

  // Limpiar localStorage al enviar exitosamente
  const limpiarFormularioGuardado = () => {
    localStorage.removeItem(STORAGE_KEY);
  };
  const [descripcionPerfil, setDescripcionPerfil] = useState<string>('');

  // Fecha de registro (solo lectura)
  const fechaRegistro = new Date().toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Fecha/hora actual (solo hoy permitido)
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const todayDate = `${yyyy}-${mm}-${dd}`;
  const nowDT = `${todayDate}T${hh}:${mi}`;
  const [fechaDT, setFechaDT] = useState<string>(nowDT);

  // Matriz de permisos por módulo (A,C,M,B)
  const permisos = ["A","C","M","B"] as const;
  const [permisoAdmin, setPermisoAdmin] = useState<Record<string, Record<typeof permisos[number], boolean>>>(() => {
    const base: Record<string, Record<typeof permisos[number], boolean>> = {};
    Object.keys(formData.modulosAdministrativos || {}).forEach((k) => {
      base[k] = { A: false, C: false, M: false, B: false };
    });
    return base;
  });
  const [permisoFin, setPermisoFin] = useState<Record<string, Record<typeof permisos[number], boolean>>>(() => {
    const base: Record<string, Record<typeof permisos[number], boolean>> = {};
    Object.keys(formData.modulosFinancieros || {}).forEach((k) => {
      base[k] = { A: false, C: false, M: false, B: false };
    });
    return base;
  });

  const togglePermiso = (
    tipo: 'admin' | 'fin',
    modulo: string,
    permiso: typeof permisos[number],
    value: boolean
  ) => {
    if (tipo === 'admin') {
      setPermisoAdmin((prev) => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value },
      }));
    } else {
      setPermisoFin((prev) => ({
        ...prev,
        [modulo]: { ...prev[modulo], [permiso]: value },
      }));
    }
  };

  // Selección especial para 'anexos': 1 / 2 / 3
  const [anexosNivel, setAnexosNivel] = useState<'1' | '2' | '3' | ''>('');
  const [captchaVerificado, setCaptchaVerificado] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuloChange = (tipo: 'administrativos' | 'financieros', modulo: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [`modulos${tipo === 'administrativos' ? 'Administrativos' : 'Financieros'}`]: {
        ...prev[tipo === 'administrativos' ? 'modulosAdministrativos' : 'modulosFinancieros'],
        [modulo]: checked,
      },
    }));
  };

  const handlePermisoChange = (permiso: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tipoPermiso: checked
        ? [...(prev.tipoPermiso || []), permiso as any]
        : (prev.tipoPermiso || []).filter(p => p !== permiso),
    }));
  };

  const handleFirma = (cargo: string, firma: string, usuario: string) => {
    setFormData(prev => ({
      ...prev,
      firmas: {
        ...prev.firmas,
        [cargo]: {
          firma: firma,
          usuario: usuario,
          fecha: new Date().toISOString(),
        },
      },
    }));
  };

  const eliminarFirma = (cargo: string) => {
    setFormData(prev => {
      const nuevasFirmas = { ...prev.firmas };
      delete nuevasFirmas[cargo];
      return {
        ...prev,
        firmas: nuevasFirmas,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🔐 VALIDACIÓN DE SESIÓN
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Sesión expirada', 'Debe iniciar sesión nuevamente');
      window.location.href = '/login';
      return;
    }

    // 🚫 RATE LIMITING - Prevenir spam de solicitudes
    const ultimoEnvio = localStorage.getItem('ultimo_envio_admin');
    const ahoraTimestamp = Date.now();
    
    if (ultimoEnvio) {
      const tiempoTranscurrido = ahoraTimestamp - parseInt(ultimoEnvio);
      const TIEMPO_MINIMO = 30000; // 30 segundos entre envíos
      
      if (tiempoTranscurrido < TIEMPO_MINIMO) {
        const segundosRestantes = Math.ceil((TIEMPO_MINIMO - tiempoTranscurrido) / 1000);
        toast.error('Demasiados intentos', `Debe esperar ${segundosRestantes} segundos antes de enviar otra solicitud`);
        return;
      }
    }

    // Verificar intentos fallidos
    const intentosFallidos = parseInt(localStorage.getItem('intentos_fallidos_admin') || '0');
    if (intentosFallidos >= 5) {
      const tiempoBloqueo = localStorage.getItem('tiempo_bloqueo_admin');
      if (tiempoBloqueo && ahoraTimestamp < parseInt(tiempoBloqueo)) {
        const minutosRestantes = Math.ceil((parseInt(tiempoBloqueo) - ahoraTimestamp) / 60000);
        toast.error('Cuenta bloqueada temporalmente', `Demasiados intentos fallidos. Intente nuevamente en ${minutosRestantes} minutos`);
        return;
      } else {
        // Resetear intentos si ya pasó el tiempo de bloqueo
        localStorage.removeItem('intentos_fallidos_admin');
        localStorage.removeItem('tiempo_bloqueo_admin');
      }
    }

    // 🛡️ PREVENCIÓN DE INYECCIÓN SQL/XSS
    const sanitizeInput = (input: string): boolean => {
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /SELECT.*FROM/i,
        /INSERT.*INTO/i,
        /UPDATE.*SET/i,
        /DELETE.*FROM/i,
        /DROP.*TABLE/i,
        /UNION.*SELECT/i,
        /--/,
        /;.*--/,
        /\/\*/,
        /\*\//
      ];
      return dangerousPatterns.some(pattern => pattern.test(input));
    };

    // Validar todos los campos de texto contra inyección
    const camposTexto = [
      formData.nombreCompleto,
      formData.cargo,
      formData.areaOServicio,
      formData.perfilDe,
      descripcionPerfil,
      formData.opcionesWeb?.otros || ''
    ];

    for (const campo of camposTexto) {
      if (campo && sanitizeInput(campo)) {
        toast.error('Contenido no permitido', 'Se detectaron caracteres o patrones no permitidos en los campos');
        return;
      }
    }

    // 🚫 PREVENCIÓN DE EMOJIS Y CARACTERES ESPECIALES
    const tieneEmojis = (texto: string): boolean => {
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
      return emojiRegex.test(texto);
    };

    if (tieneEmojis(formData.nombreCompleto) || tieneEmojis(formData.cargo) || tieneEmojis(formData.areaOServicio)) {
      toast.error('Caracteres no permitidos', 'No se permiten emojis en campos profesionales');
      return;
    }

    // ⏰ Sistema disponible 24/7 - Sin restricciones de horario

    // ✅ VALIDACIÓN DE NOMBRE COMPLETO
    if (!formData.nombreCompleto || formData.nombreCompleto.trim() === '') {
      toast.error('Campo obligatorio', 'El campo "Nombre completo" es obligatorio');
      return;
    }
    if (formData.nombreCompleto.trim().length < 5) {
      toast.error('Nombre inválido', 'El nombre debe tener al menos 5 caracteres');
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombreCompleto)) {
      toast.error('Nombre inválido', 'El nombre solo debe contener letras y espacios');
      return;
    }
    
    // Validar que no contenga números
    if (/\d/.test(formData.nombreCompleto)) {
      toast.error('Nombre inválido', 'El nombre no puede contener números');
      return;
    }
    
    // Validar nombres genéricos o de prueba
    const nombresProhibidos = ['test', 'prueba', 'admin', 'usuario', 'ejemplo', 'demo', 'temporal', 'xxx', 'aaa', 'bbb'];
    const nombreLower = formData.nombreCompleto.toLowerCase();
    if (nombresProhibidos.some(prohibido => nombreLower.includes(prohibido))) {
      toast.error('Nombre no válido', 'No se permiten nombres genéricos o de prueba (test, prueba, admin, etc.)');
      return;
    }
    
    const palabrasNombre = formData.nombreCompleto.trim().split(/\s+/);
    if (palabrasNombre.length < 2) {
      toast.error('Nombre incompleto', 'Debe ingresar al menos nombre y apellido');
      return;
    }

    // ✅ VALIDACIÓN DE CÉDULA
    if (!formData.cedula || formData.cedula.trim() === '') {
      toast.error('Campo obligatorio', 'El campo "Cédula" es obligatorio');
      return;
    }
    if (!/^\d{6,10}$/.test(formData.cedula.trim())) {
      toast.error('Cédula inválida', 'La cédula debe tener entre 6 y 10 dígitos numéricos');
      return;
    }

    // 🔍 VALIDACIÓN DE DUPLICADOS - Verificar cédula
    try {
      const responseCedula = await solicitudesAdministrativas.verificarCedula(formData.cedula.trim());
      if (responseCedula.data.existe) {
        toast.error('Cédula duplicada', `Ya existe una solicitud con esta cédula (ID: ${responseCedula.data.solicitudId})`);
        return;
      }
    } catch (error: any) {
      // Si el endpoint no existe, continuar (backend aún no implementado)
      if (error.response?.status !== 404) {
        console.warn('No se pudo verificar duplicados de cédula:', error);
      }
    }

    // ✅ VALIDACIÓN DE CARGO
    if (!formData.cargo || formData.cargo.trim() === '') {
      toast.error('Campo obligatorio', 'El campo "Cargo" es obligatorio');
      return;
    }
    if (formData.cargo.trim().length < 3) {
      toast.error('Cargo inválido', 'El cargo debe tener al menos 3 caracteres');
      return;
    }

    // ✅ VALIDACIÓN DE ÁREA O SERVICIO
    if (!formData.areaOServicio || formData.areaOServicio.trim() === '') {
      toast.error('Campo obligatorio', 'El campo "Área o servicio" es obligatorio');
      return;
    }
    if (formData.areaOServicio.trim().length < 3) {
      toast.error('Área inválida', 'El área o servicio debe tener al menos 3 caracteres');
      return;
    }

    // ✅ VALIDACIÓN DE TELÉFONO/EXTENSIÓN
    if (!formData.telefonoExtension || formData.telefonoExtension.trim() === '') {
      toast.error('Campo obligatorio', 'El campo "Teléfono/Extensión" es obligatorio');
      return;
    }
    if (!/^[\d\s\-\+\(\)]+$/.test(formData.telefonoExtension)) {
      toast.error('Teléfono inválido', 'El teléfono solo debe contener números, espacios, guiones o paréntesis');
      return;
    }
    const soloNumeros = formData.telefonoExtension.replace(/\D/g, '');
    if (soloNumeros.length < 7 || soloNumeros.length > 15) {
      toast.error('Teléfono inválido', 'El teléfono debe tener entre 7 y 15 dígitos');
      return;
    }

    // ✅ VALIDACIÓN DE TIPO DE VINCULACIÓN
    if (!formData.tipoVinculacion) {
      toast.error('Campo obligatorio', 'Debe seleccionar el tipo de vinculación');
      return;
    }

    // ✅ VALIDACIÓN DE MÓDULOS ADMINISTRATIVOS
    const tieneModulosAdmin = Object.keys(permisoAdmin).some(modulo => 
      Object.values(permisoAdmin[modulo]).some(v => v === true)
    );

    if (!tieneModulosAdmin) {
      toast.error('Módulos requeridos', 'Debe seleccionar al menos un permiso en SERVINTE ADMINISTRATIVO');
      return;
    }

    // Verificar que cada módulo seleccionado tenga al menos un permiso válido
    const modulosConPermisos = Object.keys(permisoAdmin).filter(modulo => 
      Object.values(permisoAdmin[modulo]).some(v => v === true)
    );

    if (modulosConPermisos.length === 0) {
      toast.error('Permisos incompletos', 'Debe asignar al menos un permiso (A, C, M, B) a los módulos administrativos');
      return;
    }

    // ✅ VALIDACIÓN DE MÓDULOS FINANCIEROS
    const tieneModulosFin = Object.keys(permisoFin).some(modulo => 
      Object.values(permisoFin[modulo]).some(v => v === true)
    );

    if (!tieneModulosFin) {
      toast.error('Módulos requeridos', 'Debe seleccionar al menos un permiso en SERVINTE FINANCIERO');
      return;
    }

    // Verificar que cada módulo financiero tenga al menos un permiso válido
    const modulosFinConPermisos = Object.keys(permisoFin).filter(modulo => 
      Object.values(permisoFin[modulo]).some(v => v === true)
    );

    if (modulosFinConPermisos.length === 0) {
      toast.error('Permisos incompletos', 'Debe asignar al menos un permiso (A, C, M, B) a los módulos financieros');
      return;
    }

    // ✅ VALIDACIÓN DE ANEXOS (si se seleccionó el módulo)
    if (permisoAdmin['anexos'] && Object.values(permisoAdmin['anexos']).some(v => v === true)) {
      if (!anexosNivel) {
        toast.error('Nivel de anexos requerido', 'Debe seleccionar el nivel de anexos (N1, N2 o N3)');
        return;
      }
    }

    // ✅ VALIDACIÓN DE OPCIONES WEB
    const tieneOpcionesWeb = formData.opcionesWeb?.internet || 
                             formData.opcionesWeb?.correoElectronico || 
                             formData.opcionesWeb?.transferenciaArchivos;

    if (!tieneOpcionesWeb) {
      toast.error('Opciones Web requeridas', 'Debe seleccionar al menos una opción web');
      return;
    }

    // Validar campo "Otros" si tiene contenido
    if (formData.opcionesWeb?.otros && formData.opcionesWeb.otros.trim() !== '') {
      if (formData.opcionesWeb.otros.trim().length < 5) {
        toast.error('Descripción inválida', 'La descripción de "Otros" debe tener al menos 5 caracteres');
        return;
      }
      if (formData.opcionesWeb.otros.trim().length > 100) {
        toast.error('Descripción muy larga', 'La descripción de "Otros" no debe exceder 100 caracteres');
        return;
      }
    }

    // ✅ VALIDACIÓN DE TIPO DE PERMISO
    if (!formData.tipoPermiso || formData.tipoPermiso.length === 0) {
      toast.error('Tipo de permiso requerido', 'Debe seleccionar al menos un tipo de permiso (Temporal, Permanente, etc.)');
      return;
    }

    // Validar que no se seleccionen tipos contradictorios
    const tieneTemp = formData.tipoPermiso.some(t => t.toLowerCase().includes('temporal'));
    const tienePerm = formData.tipoPermiso.some(t => t.toLowerCase().includes('permanente'));
    const tieneAnul = formData.tipoPermiso.some(t => t.toLowerCase().includes('anulación') || t.toLowerCase().includes('anulacion'));

    if (tieneTemp && tienePerm) {
      toast.error('Tipos incompatibles', 'No puede seleccionar "Temporal" y "Permanente" al mismo tiempo');
      return;
    }

    if (tieneAnul && formData.tipoPermiso.length > 1) {
      toast.error('Tipo incompatible', 'Si selecciona "Anulación", no puede seleccionar otros tipos');
      return;
    }

    // ✅ VALIDACIÓN DE TIPO DE PERFIL
    if (!formData.perfilDe || formData.perfilDe.trim() === '') {
      toast.error('Perfil requerido', 'Debe especificar el tipo de perfil a crear');
      return;
    }
    if (formData.perfilDe.trim().length < 5) {
      toast.error('Perfil inválido', 'El tipo de perfil debe tener al menos 5 caracteres');
      return;
    }
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-]+$/.test(formData.perfilDe)) {
      toast.error('Perfil inválido', 'El perfil solo debe contener letras, números, espacios y guiones');
      return;
    }

    // ✅ VALIDACIÓN DE DESCRIPCIÓN DEL PERFIL
    if (!descripcionPerfil || descripcionPerfil.trim() === '') {
      toast.error('Descripción requerida', 'Debe describir para qué es el perfil');
      return;
    }
    if (descripcionPerfil.trim().length < 10) {
      toast.error('Descripción muy corta', 'La descripción debe tener al menos 10 caracteres');
      return;
    }
    if (descripcionPerfil.trim().length > 200) {
      toast.error('Descripción muy larga', 'La descripción no debe exceder 200 caracteres');
      return;
    }

    // ✅ VALIDACIÓN DE CREDENCIALES (si se proporcionaron)
    if (formData.loginAsignado && formData.loginAsignado.trim() !== '') {
      // Validar formato del login
      if (!/^[a-zA-Z0-9_\-\.]+$/.test(formData.loginAsignado)) {
        toast.error('Login inválido', 'El login solo puede contener letras, números, guiones, puntos y guiones bajos');
        return;
      }
      if (formData.loginAsignado.length < 4) {
        toast.error('Login muy corto', 'El login debe tener al menos 4 caracteres');
        return;
      }
      if (formData.loginAsignado.length > 20) {
        toast.error('Login muy largo', 'El login no debe exceder 20 caracteres');
        return;
      }
      if (/\s/.test(formData.loginAsignado)) {
        toast.error('Login inválido', 'El login no puede contener espacios');
        return;
      }

      // 🔍 VALIDACIÓN DE DUPLICADOS - Verificar login
      try {
        const responseLogin = await solicitudesAdministrativas.verificarLogin(formData.loginAsignado.trim());
        if (responseLogin.data.existe) {
          toast.error('Login duplicado', 'Este login ya está en uso. Por favor, elija otro');
          return;
        }
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.warn('No se pudo verificar duplicados de login:', error);
        }
      }
    }

    // Validar contraseña temporal (si se proporcionó)
    if (formData.claveTemporal && formData.claveTemporal.trim() !== '') {
      if (formData.claveTemporal.length < 8) {
        toast.error('Contraseña débil', 'La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (!/[A-Z]/.test(formData.claveTemporal)) {
        toast.error('Contraseña débil', 'La contraseña debe contener al menos una mayúscula');
        return;
      }
      if (!/[a-z]/.test(formData.claveTemporal)) {
        toast.error('Contraseña débil', 'La contraseña debe contener al menos una minúscula');
        return;
      }
      if (!/[0-9]/.test(formData.claveTemporal)) {
        toast.error('Contraseña débil', 'La contraseña debe contener al menos un número');
        return;
      }
    }

    // ✅ VALIDACIÓN DE LÓGICA DE PERMISOS
    // Verificar que si tiene "Borrar", también tenga "Consultar"
    Object.keys(permisoAdmin).forEach(modulo => {
      if (permisoAdmin[modulo].B && !permisoAdmin[modulo].C) {
        toast.error('Permisos inconsistentes', `En el módulo "${modulo}" no puede tener permiso de Borrar sin Consultar`);
        return;
      }
      if (permisoAdmin[modulo].M && !permisoAdmin[modulo].C) {
        toast.error('Permisos inconsistentes', `En el módulo "${modulo}" no puede tener permiso de Modificar sin Consultar`);
        return;
      }
    });

    Object.keys(permisoFin).forEach(modulo => {
      if (permisoFin[modulo].B && !permisoFin[modulo].C) {
        toast.error('Permisos inconsistentes', `En el módulo financiero "${modulo}" no puede tener permiso de Borrar sin Consultar`);
        return;
      }
      if (permisoFin[modulo].M && !permisoFin[modulo].C) {
        toast.error('Permisos inconsistentes', `En el módulo financiero "${modulo}" no puede tener permiso de Modificar sin Consultar`);
        return;
      }
    });

    // ✅ VALIDACIÓN DE FIRMAS
    const firmasActuales = Object.keys(formData.firmas || {}).length;
    if (firmasActuales === 0) {
      toast.error('Firmas requeridas', 'Debe tener al menos 1 firma antes de enviar la solicitud');
      return;
    }

    // Si tiene módulos financieros, debe tener firma del coordinador financiero
    const tieneModulosFinancieros = Object.keys(permisoFin).some(modulo => 
      Object.values(permisoFin[modulo]).some(v => v === true)
    );

    if (tieneModulosFinancieros && !formData.firmas?.coordinadorFacturacionOSubgerenteFinanciero) {
      toast.error('Firma requerida', 'Las solicitudes con módulos financieros requieren firma del Coordinador Financiero');
      return;
    }

    // ✅ VALIDACIÓN DE CONSISTENCIA DE TIPO DE PERMISO
    if (formData.tipoPermiso.some(t => t.toLowerCase().includes('modificación') || t.toLowerCase().includes('modificacion'))) {
      if (!descripcionPerfil || descripcionPerfil.trim().length < 20) {
        toast.error('Descripción insuficiente', 'Para modificaciones, debe describir detalladamente qué se está modificando (mínimo 20 caracteres)');
        return;
      }
    }

    if (formData.tipoPermiso.some(t => t.toLowerCase().includes('anulación') || t.toLowerCase().includes('anulacion'))) {
      if (!descripcionPerfil || descripcionPerfil.trim().length < 20) {
        toast.error('Razón requerida', 'Para anulaciones, debe especificar la razón detalladamente (mínimo 20 caracteres)');
        return;
      }
    }

    // ✅ VALIDACIÓN DE FECHAS
    if (formData.fechaSolicitud) {
      const fechaSol = new Date(formData.fechaSolicitud);
      const hoy = new Date();
      if (fechaSol > hoy) {
        toast.error('Fecha inválida', 'La fecha de solicitud no puede ser futura');
        return;
      }
    }

    // Validar fecha de creación de cuenta (si existe)
    if (formData.fechaCreacion && formData.fechaSolicitud) {
      const fechaCreacion = new Date(formData.fechaCreacion);
      const fechaSolicitud = new Date(formData.fechaSolicitud);
      if (fechaCreacion < fechaSolicitud) {
        toast.error('Fecha inconsistente', 'La fecha de creación de cuenta no puede ser anterior a la fecha de solicitud');
        return;
      }
    }

    // ✅ VALIDACIÓN DE LONGITUD MÁXIMA (prevenir ataques)
    if (formData.nombreCompleto.length > 100) {
      toast.error('Texto muy largo', 'El nombre no debe exceder 100 caracteres');
      return;
    }
    if (formData.cargo.length > 100) {
      toast.error('Texto muy largo', 'El cargo no debe exceder 100 caracteres');
      return;
    }
    if (formData.areaOServicio.length > 100) {
      toast.error('Texto muy largo', 'El área/servicio no debe exceder 100 caracteres');
      return;
    }

    // 🤖 VALIDACIÓN DE CAPTCHA
    if (!captchaVerificado) {
      toast.error('Verificación requerida', 'Debe completar la verificación anti-bot');
      return;
    }

    // 👔 VALIDACIÓN DE JERARQUÍA (simulada - en producción consultar BD)
    // Verificar que el jefe inmediato sea un cargo superior
    const cargosSuperiores = ['director', 'coordinador', 'jefe', 'gerente', 'subgerente', 'supervisor'];
    const cargoSolicitante = formData.cargo?.toLowerCase() || '';
    
    // Si hay firma de jefe inmediato, validar que sea un cargo superior
    if (formData.firmas?.jefeInmediato) {
      const nombreJefe = formData.firmas.jefeInmediato.usuario?.toLowerCase() || '';
      const esCargoSuperior = cargosSuperiores.some(cargo => nombreJefe.includes(cargo));
      
      if (!esCargoSuperior && !cargoSolicitante.includes('auxiliar') && !cargoSolicitante.includes('asistente')) {
        toast.warning('Jerarquía inconsistente', 'La firma del jefe inmediato debe ser de un cargo superior');
        // No bloqueamos, solo advertimos
      }
    }

    if (!formData.aceptaResponsabilidad) {
      toast.warning('Debe aceptar la responsabilidad', 'Por favor, marque la casilla de aceptación antes de continuar');
      return;
    }

    setLoading(true);
    try {
      // Mapear datos del formulario a formato de BD
      const payload = {
        // Encabezado del formato
        codigo_formato: formData.codigoFormato || 'FOR-GDI-SIS-004',
        version: formData.version || '1',
        fecha_emision: formData.fechaEmision || '23/11/2020',
        
        // Datos básicos del solicitante
        nombre_completo: formData.nombreCompleto,
        cedula: formData.cedula,
        cargo: formData.cargo,
        area_servicio: formData.areaOServicio,
        telefono_extension: formData.telefonoExtension,
        tipo_vinculacion: formData.tipoVinculacion,
        
        // Módulos Administrativos (guardar permisos detallados A,C,M,B)
        modulos_administrativos: JSON.stringify(permisoAdmin),
        
        // Módulos Financieros (guardar permisos detallados A,C,M,B)
        modulos_financieros: JSON.stringify(permisoFin),
        
        // Nivel de anexos (N1, N2, N3)
        anexos_nivel: anexosNivel || null,
        
        // Tipo de Permiso (array)
        tipo_permiso: JSON.stringify(formData.tipoPermiso || []),
        
        // Perfil de
        perfil_de: formData.perfilDe,
        
        // Opciones Web (guardar como JSON completo)
        opciones_web: JSON.stringify(formData.opcionesWeb || {}),
        
        // Firmas (guardar como JSON completo)
        firmas: JSON.stringify(formData.firmas || {}),
        
        // Login y clave (si existen)
        login_asignado: formData.loginAsignado || null,
        clave_temporal: formData.claveTemporal || null,
        
        // Metadatos del sistema
        fecha_solicitud: new Date().toISOString(),
        acepta_responsabilidad: formData.aceptaResponsabilidad ? 1 : 0,
        estado: 'Pendiente',
        fase_actual: 'Pendiente firma(s)',
        firmas_pendientes: Object.keys(formData.firmas || {}).length,
        firmas_completadas: 0,
        
        // Usuario que registra
        registrado_por_nombre: localStorage.getItem('user_name') || 'Usuario',
        registrado_por_email: localStorage.getItem('user_email') || 'admin@hefesto.local'
      };

      console.log('📤 Enviando payload a BD:', payload);
      
      // Enviar al backend (CREATE o UPDATE según el caso)
      let response;
      if (idEditar) {
        // Estamos editando, usar UPDATE
        response = await solicitudesAdministrativas.update(parseInt(idEditar), payload);
        console.log('✅ Solicitud actualizada:', response.data);
        toast.success('Solicitud actualizada', 'Los cambios han sido guardados correctamente');
      } else {
        // Estamos creando, usar CREATE
        response = await solicitudesAdministrativas.create(payload);
        console.log('✅ Solicitud creada:', response.data);
        toast.success('Solicitud creada exitosamente', 'La solicitud ha sido guardada en la base de datos');
        
        // Actualizar timestamp de último envío exitoso
        localStorage.setItem('ultimo_envio_admin', Date.now().toString());
        // Resetear intentos fallidos
        localStorage.removeItem('intentos_fallidos_admin');
        localStorage.removeItem('tiempo_bloqueo_admin');
      }
      
      // Limpiar formulario guardado en localStorage
      limpiarFormularioGuardado();
      
      // Redirigir a control de aprobación
      navigate('/control/aprobacion');
    } catch (error: any) {
      console.error('❌ Error al crear solicitud:', error);
      console.error('Detalles:', error.response?.data);
      
      // Incrementar contador de intentos fallidos
      const intentos = parseInt(localStorage.getItem('intentos_fallidos_admin') || '0') + 1;
      localStorage.setItem('intentos_fallidos_admin', intentos.toString());
      
      // Si llega a 5 intentos, bloquear por 15 minutos
      if (intentos >= 5) {
        const tiempoBloqueo = Date.now() + (15 * 60 * 1000); // 15 minutos
        localStorage.setItem('tiempo_bloqueo_admin', tiempoBloqueo.toString());
        toast.error('Cuenta bloqueada', 'Demasiados intentos fallidos. Bloqueado por 15 minutos');
      }
      toast.error('Error al crear solicitud', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto p-2 sm:p-4 md:p-6 max-w-7xl mx-auto scroll-smooth">
        <AnimatedSection variants={fadeInUp}>
          <div className="mb-4">
            <motion.h1 
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {idEditar ? '✏️ EDITAR SOLICITUD - ' : ''}FORMATO CREACIÓN DE USUARIOS ADMINISTRATIVOS Y FINANCIEROS
            </motion.h1>
            <motion.p 
              className="text-[10px] sm:text-xs text-slate-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              FOR-GDI-SIS-004 | Versión 1 | Fecha emisión: 23/11/2020
            </motion.p>
          </div>
        </AnimatedSection>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="p-2 sm:p-4 md:p-6 overflow-hidden rounded-xl md:rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
            <div className="overflow-x-auto">
            <table className="w-full text-[11px] sm:text-[12px] md:text-[13px] [&_td]:p-2 sm:[&_td]:p-3 [&_th]:p-2 sm:[&_th]:p-3">
              <tbody>
                {/* Encabezado */}
                <tr className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-xl">
                  <td className="border-b border-slate-200 p-3 font-semibold w-48 text-slate-700">Fecha de solicitud:</td>
                  <td className="border-b border-slate-200 p-3">
                    <input
                      type="datetime-local"
                      value={fechaDT}
                      onChange={(e) => setFechaDT(e.target.value)}
                      min={`${todayDate}T00:00`}
                      max={`${todayDate}T23:59`}
                      className="h-9 text-sm border-2 border-slate-300 rounded-lg px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                  </td>
                </tr>

                {/* Datos del solicitante */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border-y border-slate-200 p-3 font-bold text-center text-blue-900 tracking-wide rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      DATOS DEL SOLICITANTE
                    </motion.div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-3">
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Fila 1 */}
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Nombre completo:</label>
                        <Input
                          value={formData.nombreCompleto}
                          onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Cédula:</label>
                        <Input
                          value={formData.cedula}
                          onChange={(e) => handleInputChange('cedula', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Cargo:</label>
                        <Input
                          value={formData.cargo}
                          onChange={(e) => handleInputChange('cargo', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      
                      {/* Fila 2 */}
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Área o servicio:</label>
                        <Input
                          value={formData.areaOServicio}
                          onChange={(e) => handleInputChange('areaOServicio', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div variants={staggerItem}>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Teléfono / Extensión:</label>
                        <Input
                          value={formData.telefonoExtension}
                          onChange={(e) => handleInputChange('telefonoExtension', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          required
                        />
                      </motion.div>
                    </motion.div>
                  </td>
                </tr>

                {/* Tipo de vinculación */}
                <tr className="bg-blue-50">
                  <td colSpan={2} className="border p-2 font-bold text-center">TIPO DE VINCULACIÓN (marcar X)</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-2">
                    <div className="flex gap-6">
                      {['Planta', 'Agremiado', 'Contrato'].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="vinculacion"
                            checked={formData.tipoVinculacion === tipo}
                            onChange={() => handleInputChange('tipoVinculacion', tipo)}
                            className="w-4 h-4"
                          />
                          <span>{tipo}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Módulos SERVINTE - DOS COLUMNAS EN UNA FILA */}
                <tr>
                  <td colSpan={2} className="border p-0">
                    {/* Leyenda de permisos */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-200 p-3 m-4 rounded-lg">
                      <h4 className="font-bold text-xs sm:text-sm text-amber-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">ℹ️</span>
                        LEYENDA DE PERMISOS
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-xs">
                        <div className="flex items-center gap-2 bg-white p-2 rounded border border-amber-200">
                          <span className="font-bold text-blue-600 text-sm">A</span>
                          <span className="text-slate-700">= <strong>Adicionar</strong> (Crear)</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 rounded border border-amber-200">
                          <span className="font-bold text-green-600 text-sm">C</span>
                          <span className="text-slate-700">= <strong>Consultar</strong> (Ver)</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 rounded border border-amber-200">
                          <span className="font-bold text-orange-600 text-sm">M</span>
                          <span className="text-slate-700">= <strong>Modificar</strong> (Editar)</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 rounded border border-amber-200">
                          <span className="font-bold text-red-600 text-sm">B</span>
                          <span className="text-slate-700">= <strong>Borrar</strong> (Eliminar)</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                      {/* SERVINTE ADMINISTRATIVO */}
                      <div className="border-2 border-blue-200 rounded-xl p-3 bg-blue-50/30">
                        <h3 className="font-bold text-center text-blue-900 mb-3 text-sm">SERVINTE ADMINISTRATIVO</h3>
                        {cargandoSolicitud ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-sm text-slate-600 mt-2">Cargando permisos...</p>
                          </div>
                        ) : (
                        <table key={JSON.stringify(permisoAdmin)} className="w-full text-[11px]">
                          <thead className="bg-blue-100">
                            <tr>
                              <th className="p-2 text-left text-xs">Módulo</th>
                              {permisos.map(p => (
                                <th key={p} className="p-1 text-center w-10 text-xs">{p}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(formData.modulosAdministrativos || {}).map((modulo, idx) => (
                              <motion.tr 
                                key={modulo} 
                                className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <td className="p-2 capitalize">
                                  <span className="text-xs font-medium text-slate-700">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                </td>
                                {modulo === 'anexos' ? (
                                  <td colSpan={4} className="p-1">
                                    <div className="flex items-center gap-2 text-xs">
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" name="anexosNivel" value="1" checked={anexosNivel==='1'} onChange={() => setAnexosNivel('1')} className="w-3 h-3" />
                                        <span>N1</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" name="anexosNivel" value="2" checked={anexosNivel==='2'} onChange={() => setAnexosNivel('2')} className="w-3 h-3" />
                                        <span>N2</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" name="anexosNivel" value="3" checked={anexosNivel==='3'} onChange={() => setAnexosNivel('3')} className="w-3 h-3" />
                                        <span>N3</span>
                                      </label>
                                    </div>
                                  </td>
                                ) : (
                                  permisos.map((p) => {
                                    const isChecked = permisoAdmin[modulo]?.[p] === true;
                                    if (idx === 0) console.log(`Checkbox ${modulo}.${p}: ${isChecked} (valor: ${permisoAdmin[modulo]?.[p]})`);
                                    return (
                                    <td key={p} className="p-1 text-center">
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          console.log(`Toggle ${modulo}.${p} to ${checked}`);
                                          togglePermiso('admin', modulo, p, checked as boolean);
                                        }}
                                        className="rounded border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 h-4 w-4"
                                      />
                                    </td>
                                    );
                                  })
                                )}
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                        )}
                      </div>

                      {/* SERVINTE FINANCIERO */}
                      <div className="border-2 border-green-200 rounded-xl p-3 bg-green-50/30">
                        <h3 className="font-bold text-center text-green-900 mb-3 text-sm">SERVINTE FINANCIERO</h3>
                        {cargandoSolicitud ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                            <p className="text-sm text-slate-600 mt-2">Cargando permisos...</p>
                          </div>
                        ) : (
                        <table key={JSON.stringify(permisoFin)} className="w-full text-[11px]">
                          <thead className="bg-green-100">
                            <tr>
                              <th className="p-2 text-left text-xs">Módulo</th>
                              {permisos.map(p => (
                                <th key={p} className="p-1 text-center w-10 text-xs">{p}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(formData.modulosFinancieros || {}).map((modulo) => (
                              <tr key={modulo} className="border-b border-slate-100 hover:bg-green-50/50 transition-colors">
                                <td className="p-2 capitalize">
                                  <span className="text-xs font-medium text-slate-700">{modulo.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                </td>
                                {permisos.map((p) => (
                                  <td key={p} className="p-1 text-center">
                                    <Checkbox
                                      checked={permisoFin[modulo]?.[p] === true}
                                      onCheckedChange={(checked) => {
                                        console.log(`Toggle FIN ${modulo}.${p} to ${checked}`);
                                        togglePermiso('fin', modulo, p, checked as boolean);
                                      }}
                                      className="rounded border-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 h-4 w-4"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        )}
                        
                        {/* Firma del Coordinador Financiero */}
                        <div className="mt-4 pt-3 border-t-2 border-green-200">
                          <h4 className="font-semibold text-xs text-green-900 mb-2">Firma de Autorización Financiera</h4>
                          <div className="border-2 border-slate-200 rounded-lg p-3 bg-white">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-xs text-slate-700">Coordinador de Facturación o Subgerente Financiero</h5>
                              {(formData.firmas as any)?.coordinadorFacturacionOSubgerenteFinanciero ? (
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold border border-green-300">✓ Firmado</span>
                              ) : (
                                <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                              )}
                            </div>
                            {(formData.firmas as any)?.coordinadorFacturacionOSubgerenteFinanciero ? (
                              <div className="border-2 border-green-200 rounded-lg p-2 bg-green-50/30">
                                <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                                  {(formData.firmas as any).coordinadorFacturacionOSubgerenteFinanciero.firma.startsWith('FIRMA_TEXTO:') ? (
                                    <p className="font-signature text-lg text-slate-800">
                                      {(formData.firmas as any).coordinadorFacturacionOSubgerenteFinanciero.firma.replace('FIRMA_TEXTO:', '')}
                                    </p>
                                  ) : (
                                    <img 
                                      src={(formData.firmas as any).coordinadorFacturacionOSubgerenteFinanciero.firma} 
                                      alt="Firma coordinador"
                                      className="max-h-16 max-w-full object-contain"
                                    />
                                  )}
                                </div>
                                <div className="text-center space-y-1">
                                  <p className="text-xs text-slate-700 font-semibold">
                                    {(formData.firmas as any).coordinadorFacturacionOSubgerenteFinanciero.usuario}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    {new Date((formData.firmas as any).coordinadorFacturacionOSubgerenteFinanciero.fecha).toLocaleString('es-CO', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => eliminarFirma('coordinadorFacturacionOSubgerenteFinanciero')}
                                  className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Eliminar firma
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-2 bg-slate-50 min-h-[100px] flex flex-col items-center justify-center gap-2">
                                <div className="text-center text-slate-400">
                                  <svg className="w-8 h-8 mx-auto mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  <p className="text-xs">Sin firma</p>
                                </div>
                                <FirmaDigital
                                  cargo="Coordinador de Facturación o Subgerente Financiero"
                                  credencialRequerida="Coordinador de Facturación o Subgerente Financiero"
                                  onFirmaCompleta={(f,u) => handleFirma('coordinadorFacturacionOSubgerenteFinanciero', f, u)}
                                  firmaActual={(formData.firmas as any)?.coordinadorFacturacionOSubgerenteFinanciero?.firma}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Opciones Web y Tipo de perfil - DOS COLUMNAS */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border-y border-slate-200 p-3 font-bold text-center text-blue-900 tracking-wide">OPCIONES WEB Y PERFIL</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-3">
                    <div className="grid grid-cols-2 gap-4">
                      {/* COLUMNA 1: Opciones Web */}
                      <div className="border-2 border-slate-300 rounded-lg p-3 bg-slate-50">
                        <h3 className="font-bold text-xs mb-3 text-slate-700 text-center">OPCIONES WEB (marcar X)</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {['internet', 'correoElectronico', 'transferenciaArchivos'].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={(formData.opcionesWeb as any)?.[opt]}
                                  onCheckedChange={(checked) => handleInputChange('opcionesWeb', {
                                    ...formData.opcionesWeb,
                                    [opt]: checked,
                                  })}
                                  className="rounded border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <span className="text-xs capitalize">{opt.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                              </label>
                            ))}
                          </div>
                          <div>
                            <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Otros:</label>
                            <Input
                              value={formData.opcionesWeb?.otros}
                              onChange={(e) => handleInputChange('opcionesWeb', {
                                ...formData.opcionesWeb,
                                otros: e.target.value,
                              })}
                              className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* COLUMNA 2: Tipo de Perfil */}
                      <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                        <h3 className="font-bold text-xs mb-3 text-blue-800 text-center">TIPO DE PERFIL A CREAR</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Tipo de perfil:</label>
                            <Input
                              value={formData.perfilDe}
                              onChange={(e) => handleInputChange('perfilDe', e.target.value)}
                              className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              placeholder="Ej: Administrativo - Supervisor"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Descripción del perfil (para qué es):</label>
                            <Input
                              value={descripcionPerfil}
                              onChange={(e) => setDescripcionPerfil(e.target.value)}
                              className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                              placeholder="Breve descripción del uso del perfil"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>

                {/* Datos de cuenta y Firma del Usuario Solicitante */}
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50">
                  <td colSpan={2} className="border-y border-slate-200 p-3 font-bold text-center text-slate-800 tracking-wide">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      CREACIÓN DE CUENTA Y FIRMA DEL USUARIO SOLICITANTE
                    </motion.div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border p-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-xs text-slate-700">
                        <strong className="text-blue-900">Nota:</strong> Los campos de Login y Contraseña serán diligenciados por el Jefe de Gestión de la Información al momento de crear la cuenta en el sistema. Las credenciales se enviarán al correo electrónico registrado.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Login del usuario: <span className="text-red-600">*</span></label>
                        <Input
                          value={formData.loginUsuario || ''}
                          onChange={(e) => handleInputChange('loginUsuario', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="A llenar por Gestión de la Información"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Contraseña temporal: <span className="text-red-600">*</span></label>
                        <Input
                          type="password"
                          value={formData.contrasenaUsuario || ''}
                          onChange={(e) => handleInputChange('contrasenaUsuario', e.target.value)}
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="A llenar por Gestión de la Información"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[10px] sm:text-xs mb-1 text-slate-700">Fecha de creación:</label>
                        <Input
                          value={fechaRegistro}
                          readOnly
                          className="border-2 border-slate-300 rounded-lg h-9 text-sm bg-slate-100 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="mt-4 border-2 border-blue-200 rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-slate-700">Firma del usuario solicitante</h4>
                        {(formData.firmas as any)?.firmaUsuarioSolicitante ? (
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold border border-green-300">✓ Firmado</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                        )}
                      </div>
                      {(formData.firmas as any)?.firmaUsuarioSolicitante ? (
                        <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                          <div className="w-full h-24 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                            {(formData.firmas as any).firmaUsuarioSolicitante.firma.startsWith('FIRMA_TEXTO:') ? (
                              <p className="font-signature text-2xl text-slate-800">
                                {(formData.firmas as any).firmaUsuarioSolicitante.firma.replace('FIRMA_TEXTO:', '')}
                              </p>
                            ) : (
                              <img 
                                src={(formData.firmas as any).firmaUsuarioSolicitante.firma} 
                                alt="Firma usuario"
                                className="max-h-20 max-w-full object-contain"
                              />
                            )}
                          </div>
                          <div className="text-center space-y-1">
                            <p className="text-xs text-slate-700 font-semibold">
                              {(formData.firmas as any).firmaUsuarioSolicitante.usuario}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {new Date((formData.firmas as any).firmaUsuarioSolicitante.fecha).toLocaleString('es-CO', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => eliminarFirma('firmaUsuarioSolicitante')}
                            className="mt-2 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Eliminar firma
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[140px] flex flex-col items-center justify-center gap-3">
                          <div className="text-center text-slate-400">
                            <svg className="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <p className="text-xs">Sin firma</p>
                          </div>
                          <FirmaDigital
                            cargo="Usuario solicitante"
                            onFirmaCompleta={(f,u) => handleFirma('firmaUsuarioSolicitante', f, u)}
                            firmaActual={(formData.firmas as any)?.firmaUsuarioSolicitante?.firma}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Firmas de Autorización - 3 firmas */}
                <tr className="bg-gradient-to-r from-blue-100 to-slate-100">
                  <td colSpan={2} className="border-y border-slate-200 p-3">
                    <motion.h3 
                      className="font-bold text-center text-blue-900 mb-4 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Vo. Bo. Y FIRMAS DE AUTORIZACIÓN (3 firmas requeridas)
                    </motion.h3>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {[
                        { cargo: 'jefeInmediato', label: 'Jefe inmediato', credencial: 'Jefe inmediato' },
                        { cargo: 'jefeTalentoHumano', label: 'Jefe de Talento Humano', credencial: 'Jefe de Talento Humano' },
                        { cargo: 'jefeGestionInformacion', label: 'Jefe de Gestión de la Información', credencial: 'Jefe de Gestión de la Información' },
                      ].map((firma, idx) => (
                        <motion.div
                          key={firma.cargo}
                          className="border-2 border-slate-200 rounded-xl p-4 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-xs text-slate-700">{firma.label}</h4>
                              {(formData.firmas as any)?.[firma.cargo] ? (
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold border border-green-300">✓ Firmado</span>
                              ) : (
                                <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-300">Pendiente</span>
                              )}
                            </div>
                            
                            {/* Espacio visual para la firma */}
                            {(formData.firmas as any)?.[firma.cargo] ? (
                              <div className="border-2 border-green-200 rounded-lg p-3 bg-green-50/30">
                                <div className="text-center">
                                  <div className="w-full h-24 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-3 p-2">
                                    {(formData.firmas as any)[firma.cargo].firma.startsWith('FIRMA_TEXTO:') ? (
                                      <p className="font-signature text-2xl text-slate-800">
                                        {(formData.firmas as any)[firma.cargo].firma.replace('FIRMA_TEXTO:', '')}
                                      </p>
                                    ) : (
                                      <img 
                                        src={(formData.firmas as any)[firma.cargo].firma} 
                                        alt={`Firma ${firma.label}`}
                                        className="max-h-20 max-w-full object-contain"
                                      />
                                    )}
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-slate-700 font-semibold">
                                      {(formData.firmas as any)[firma.cargo].usuario}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                      {new Date((formData.firmas as any)[firma.cargo].fecha).toLocaleString('es-CO', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => eliminarFirma(firma.cargo)}
                                    className="mt-3 w-full text-xs border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Eliminar firma
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 min-h-[140px] flex flex-col items-center justify-center gap-3">
                                <div className="text-center text-slate-400">
                                  <svg className="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  <p className="text-xs">Sin firma</p>
                                </div>
                                <FirmaDigital
                                  cargo={firma.label}
                                  credencialRequerida={firma.credencial}
                                  onFirmaCompleta={(firmaData, usuario) => handleFirma(firma.cargo, firmaData, usuario)}
                                  firmaActual={(formData.firmas as any)?.[firma.cargo]?.firma}
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </td>
                </tr>

                {/* Declaración */}
                <tr className="bg-slate-50">
                  <td colSpan={2} className="border p-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <Checkbox
                        checked={formData.aceptaResponsabilidad}
                        onCheckedChange={(checked) => handleInputChange('aceptaResponsabilidad', checked)}
                      />
                      <span className="text-xs">
                        <strong>DECLARACIÓN:</strong> Acepto la responsabilidad de hacer buen uso del usuario y contraseña asignados, 
                        entendiendo que son personales e intransferibles.
                      </span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </Card>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              whileHover={!loading ? { scale: 1.05 } : {}} 
              whileTap={!loading ? { scale: 0.95 } : {}}
              animate={loading ? { scale: [1, 1.05, 1] } : {}}
              transition={loading ? { duration: 1, repeat: Infinity } : {}}
            >
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 rounded-lg text-sm sm:text-base"
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Send className="w-4 h-4 mr-2" />
                </motion.div>
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto border-2 hover:border-slate-400 hover:shadow-lg transition-all duration-300 rounded-lg text-sm sm:text-base"
              >
                Limpiar
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </div>
  );
}
