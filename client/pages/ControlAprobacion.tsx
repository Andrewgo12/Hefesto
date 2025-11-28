import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Search, Filter, Download, Printer, FileText, Edit, Eye, Pencil, Trash2, MoreHorizontal, Clock, ArrowRight, Sparkles, FileSpreadsheet, FilePlus2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/lib/toast";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ModalEditarSolicitud from "@/components/ModalEditarSolicitud";
import ModalEditarHistoriaClinica from "@/components/ModalEditarHistoriaClinica";
import PDFAdministrativo from "@/components/PDFAdministrativo";
import PDFHistoriaClinica from "@/components/PDFHistoriaClinica";
import { exportacion, solicitudesAdministrativas, solicitudesHistoriaClinica } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import ExcelJS from 'exceljs';
import { parseSignature } from "@/lib/signatureFonts";
const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const AnimatedSection = motion.div;

interface Solicitud {
  id: number | string;
  id_original?: number;
  nombreCompleto: string;
  cedula: string;
  tipo: 'Administrativo' | 'Historia Clínica';
  estado: string;
  fecha_solicitud: string;
  cargo?: string;
  area_servicio?: string;
  especialidad?: string;
  perfil?: string;
  datos?: any;
}

export default function ControlAprobacion() {
  const { solicitudes: todasSolicitudes, actualizarEstadoSolicitud } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [selectedSolicitud, setSelectedSolicitud] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState<'aprobar' | 'rechazar'>('aprobar');
  const [comentario, setComentario] = useState('');
  const [loginAsignado, setLoginAsignado] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canAprobar, setCanAprobar] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [solicitudEditando, setSolicitudEditando] = useState<number | null>(null);
  const [tipoSolicitudEditando, setTipoSolicitudEditando] = useState<'Administrativo' | 'Historia Clínica' | null>(null);

  // Verificar permisos del usuario al cargar
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const rol = (user.rol || '').toLowerCase();
        // Administrador tiene todos los permisos
        const esAdmin = rol === 'administrador' || user.es_administrador === true;
        // Roles que pueden aprobar/rechazar
        const puedeAprobar = esAdmin || 
          rol === 'jefe inmediato' || 
          rol === 'jefe de talento humano' || 
          rol === 'coordinador tic' ||
          rol === 'coordinador' ||
          rol === 'supervisor';
        
        setIsAdmin(esAdmin);
        setCanAprobar(puedeAprobar);
        console.log('Usuario:', user.name, 'Rol:', rol, 'Puede aprobar:', puedeAprobar);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 15;

  // Función para cargar datos frescos de una solicitud antes de mostrar PDF
  const handleVerFormato = async (solicitud: any) => {
    try {
      const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
      const tipo = solicitud.tipo;
      
      console.log('📄 Cargando datos frescos para PDF:', tipo, idReal);
      
      // Cargar datos frescos del backend
      let response;
      if (tipo === 'Administrativo') {
        response = await solicitudesAdministrativas.getById(idReal);
      } else {
        response = await solicitudesHistoriaClinica.getById(idReal);
      }
      
      // Combinar datos frescos con la estructura original
      const datosFrescos = response.data;
      const solicitudActualizada = {
        ...solicitud,
        ...datosFrescos,
        datos: datosFrescos,
        login_asignado: datosFrescos.login_asignado,
        contrasena_asignada: datosFrescos.contrasena_asignada,
      };
      
      console.log('✅ Datos frescos cargados:', solicitudActualizada);
      setSelectedSolicitud(solicitudActualizada);
      setShowPDF(true);
    } catch (error) {
      console.error('Error cargando datos:', error);
      // Si falla, usar datos existentes
      setSelectedSolicitud(solicitud);
      setShowPDF(true);
    }
  };

  // Función para editar solicitud
  const handleEditar = (solicitud: any) => {
    const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
    const tipo = solicitud.tipo;
    setSolicitudEditando(idReal);
    setTipoSolicitudEditando(tipo);
    setModalEditarOpen(true);
  };

  const handleEditarSuccess = () => {
    // Recargar solicitudes después de editar
    window.location.reload();
  };

  // Función para abrir modal de aprobar/rechazar con validación de credenciales
  const handleAbrirModalAccion = async (solicitud: any, tipoAccion: 'aprobar' | 'rechazar') => {
    try {
      const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
      const tipo = solicitud.tipo;
      
      // Cargar datos frescos del backend
      let response;
      if (tipo === 'Administrativo') {
        response = await solicitudesAdministrativas.getById(idReal);
      } else {
        response = await solicitudesHistoriaClinica.getById(idReal);
      }
      
      const datosFrescos = response.data;
      
      // Si es aprobar, validar que tenga login y clave asignados
      if (tipoAccion === 'aprobar') {
        const loginAsignado = datosFrescos.login_asignado || '';
        const claveAsignada = datosFrescos.contrasena_asignada || datosFrescos.clave_temporal || '';
        
        if (!loginAsignado.trim() || !claveAsignada.trim()) {
          toast.error(
            'Credenciales requeridas',
            'No se puede aprobar la solicitud sin asignar LOGIN y CLAVE TEMPORAL. Por favor, edite la solicitud primero.'
          );
          return;
        }
      }
      
      // Combinar datos frescos con la estructura original
      const solicitudActualizada = {
        ...solicitud,
        ...datosFrescos,
        datos: datosFrescos,
      };
      
      setSelectedSolicitud(solicitudActualizada);
      setAccion(tipoAccion);
      setShowModal(true);
    } catch (error) {
      console.error('Error cargando datos:', error);
      toast.error('Error', 'No se pudieron cargar los datos de la solicitud');
    }
  };

  const handleAccion = async () => {
    if (!selectedSolicitud) {
      console.error('❌ No hay solicitud seleccionada');
      return;
    }

    console.log(`🔄 Procesando acción: ${accion} para solicitud:`, selectedSolicitud.id);
    setProcesando(true);

    try {
      const nuevoEstado = accion === 'aprobar' ? 'Aprobado' : 'Rechazado';

      console.log('📡 Llamando a actualizarEstadoSolicitud...');
      // Actualizar en contexto global (ahora es async)
      await actualizarEstadoSolicitud(selectedSolicitud.id, nuevoEstado, comentario);

      console.log('✅ Estado actualizado exitosamente');
      toast.success(
        `Solicitud ${accion === 'aprobar' ? 'aprobada' : 'rechazada'}`,
        `La solicitud ha sido ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} correctamente`
      );

      setShowModal(false);
      setComentario('');
      setSelectedSolicitud(null);
    } catch (error: any) {
      console.error('❌ Error al procesar solicitud:', error);
      toast.error('Error al procesar solicitud', error.message || 'Ocurrió un error inesperado');
    } finally {
      setProcesando(false);
      console.log('🏁 Proceso finalizado');
    }
  };

  // Función para previsualizar Excel como HTML
  const handlePrevisualizar = (solicitud: any) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const tipo = solicitud.tipo === 'Administrativo' ? 'administrativa' : 'historia-clinica';
      const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
      const url = `${API_URL}/exportar/preview/${tipo}/${idReal}`;

      // Abrir en nueva ventana
      window.open(url, '_blank', 'width=1200,height=800');
      toast.success('Vista previa', 'Abriendo previsualización del formato');
    } catch (error) {
      console.error('Error al previsualizar:', error);
      toast.error('Error', 'No se pudo abrir la vista previa');
    }
  };

  // Función para descargar Excel
  const handleDescargar = async (solicitud: any) => {
    try {
      const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
      await exportacion.descargar(solicitud.tipo, idReal);
      toast.success('Descarga completada', 'El archivo se ha descargado correctamente');
    } catch (error) {
      console.error('Error al descargar:', error);
      toast.error('Error', 'No se pudo descargar el archivo');
    }
  };

  // Función para imprimir
  const handleImprimir = async (solicitud: any) => {
    try {
      // Descargar el Excel para que el usuario pueda imprimirlo
      const idReal = solicitud.id_original || solicitud.datos?.id || solicitud.id;
      await exportacion.descargar(solicitud.tipo, idReal);
      toast.success('Descarga completada', 'Abre el archivo para imprimir');
    } catch (error) {
      console.error('Error al descargar:', error);
      toast.error('Error', 'No se pudo descargar el archivo');
    }
  };

  // Filtrar solicitudes del contexto
  const solicitudesFiltradas = todasSolicitudes.filter((sol) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = sol.nombreCompleto?.toLowerCase().includes(search) ||
      sol.cedula?.includes(search) ||
      search === '';

    const matchesEstado = filtroEstado === 'Todas' || filtroEstado === 'Todos' || sol.estado === filtroEstado;

    return matchesSearch && matchesEstado;
  });

  // Función para exportar tabla a Excel
  const handleExportarExcel = async () => {
    try {
      if (solicitudesFiltradas.length === 0) {
        toast.error('Error', 'No hay datos para exportar');
        return;
      }

      toast.info('Exportando...', 'Generando archivo Excel');

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Solicitudes');

      // Definir columnas
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Fecha Solicitud', key: 'fecha', width: 20 },
        { header: 'Tipo', key: 'tipo', width: 15 },
        { header: 'Estado', key: 'estado', width: 15 },
        { header: 'Solicitante', key: 'solicitante', width: 30 },
        { header: 'Cédula', key: 'cedula', width: 15 },
        { header: 'Cargo/Perfil', key: 'cargo', width: 20 },
        { header: 'Área/Servicio', key: 'area', width: 20 },
      ];

      // Agregar filas
      solicitudesFiltradas.forEach(sol => {
        worksheet.addRow({
          id: sol.id,
          fecha: new Date(sol.fechaSolicitud).toLocaleString('es-CO'),
          tipo: sol.tipo,
          estado: sol.estado,
          solicitante: sol.nombreCompleto,
          cedula: sol.cedula,
          cargo: sol.cargo || sol.perfil || '',
          area: sol.area_servicio || sol.especialidad || '',
        });
      });

      // Estilar encabezado
      worksheet.getRow(1).font = { bold: true };

      // Generar buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Guardar archivo nativamente
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Reporte_Solicitudes_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Éxito', 'Archivo exportado correctamente');
    } catch (error) {
      console.error('Error al exportar Excel:', error);
      toast.error('Error', 'No se pudo generar el archivo Excel');
    }
  };

  // Calcular paginación
  const totalPaginas = Math.ceil(solicitudesFiltradas.length / itemsPorPagina);
  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFin = indiceInicio + itemsPorPagina;
  const solicitudesPaginadas = solicitudesFiltradas.slice(indiceInicio, indiceFin);

  // Resetear a página 1 cuando cambian los filtros
  const handleFiltroChange = (nuevoFiltro: string) => {
    setFiltroEstado(nuevoFiltro);
    setPaginaActual(1);
  };

  const handleSearchChange = (valor: string) => {
    setSearchTerm(valor);
    setPaginaActual(1);
  };

  console.log('🔍 Filtro actual:', filtroEstado);
  console.log('📊 Total solicitudes:', todasSolicitudes.length);
  console.log('✅ Solicitudes filtradas:', solicitudesFiltradas.length);
  console.log('📄 Página actual:', paginaActual, 'de', totalPaginas);

  const getStatusBadge = (estado: string) => {
    const colors = {
      'Pendiente': 'bg-amber-100 text-amber-800 border-amber-300',
      'Pendiente firma(s)': 'bg-orange-100 text-orange-800 border-orange-300',
      'En proceso': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'En revisión': 'bg-blue-100 text-blue-800 border-blue-300',
      'Aprobado': 'bg-green-100 text-green-800 border-green-300',
      'Rechazado': 'bg-red-100 text-red-800 border-red-300',
      'Cancelado': 'bg-slate-100 text-slate-800 border-slate-300',
    };
    return colors[estado as keyof typeof colors] || 'bg-slate-100 text-slate-800 border-slate-300';
  };

  return (
    <div className="relative p-4 md:p-6 space-y-6 max-w-7xl mx-auto overflow-hidden">
      {/* Animated Dot Grid Background */}
      <div className="fixed inset-0 -z-10 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Gradient Beams */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <AnimatedSection variants={fadeInDown}>
        <div className="flex flex-col gap-2">
          <motion.h1
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ['0% center', '100% center', '0% center']
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
            }}
          >
            Seguimiento por Fases
          </motion.h1>
          <motion.p
            className="text-sm text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Visualiza y filtra el estado de tus solicitudes por fases
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-3 sm:p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, cédula o área..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-8 sm:h-9 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Todas', 'Pendiente', 'En revisión', 'Aprobado', 'Rechazado'].map((estado, idx) => (
                <motion.div
                  key={estado}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    variant={filtroEstado === estado ? 'default' : 'outline'}
                    onClick={() => handleFiltroChange(estado)}
                    className={`text-xs sm:text-sm transition-all duration-300 ${filtroEstado === estado
                      ? 'shadow-lg hover:shadow-xl'
                      : 'hover:border-blue-400'
                      }`}
                  >
                    {estado}
                  </Button>
                </motion.div>
              ))}

              {/* Botón Exportar Excel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExportarExcel}
                  className="text-xs sm:text-sm bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 rounded-xl transition-all duration-300"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exportar Excel
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabla de solicitudes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Solicitante</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Tipo</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Estado</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Fecha</th>
                  <th className="text-center p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesPaginadas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No hay solicitudes {filtroEstado !== 'Todas' ? filtroEstado.toLowerCase() : ''}
                    </td>
                  </tr>
                ) : (
                  solicitudesPaginadas.map((sol, idx) => {
                    // Formatear fecha correctamente
                    const formatearFecha = (fecha: any) => {
                      if (!fecha) return 'Sin fecha';
                      try {
                        const date = new Date(fecha);
                        if (isNaN(date.getTime())) return 'Fecha inválida';
                        return date.toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        });
                      } catch (e) {
                        return 'Fecha inválida';
                      }
                    };

                    return (
                      <motion.tr
                        key={`${sol.tipo}-${sol.id}`}
                        className="border-b border-slate-100 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ 
                          backgroundColor: 'rgba(239, 246, 255, 0.8)',
                          scale: 1.005,
                          x: 4,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <td className="p-3 text-sm font-mono text-slate-600">#{sol.id}</td>
                        <td className="p-3">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{sol.nombreCompleto}</p>
                            <p className="text-xs text-slate-500">CC: {sol.cedula}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs rounded-lg px-2 py-1 bg-slate-50 border-slate-200">
                            {sol.tipo === 'Historia Clínica' ? '🏥 Médico' : '📋 Admin'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 + 0.2 }}
                          >
                            <Badge className={`text-xs rounded-lg px-2.5 py-1 font-medium ${getStatusBadge(sol.estado)}`}>
                              {sol.estado}
                            </Badge>
                          </motion.div>
                        </td>
                        <td className="p-3">
                          <span className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {formatearFecha(sol.fechaSolicitud)}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1 justify-center">

                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 border-2 border-purple-200 hover:border-purple-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                onClick={() => handleVerFormato(sol)}
                                title="Ver formato PDF"
                              >
                                <Eye className="w-5 h-5" strokeWidth={2.5} />
                              </Button>
                            </motion.div>

                            {/* Botón Descargar Excel */}
                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                onClick={() => handleDescargar(sol)}
                                title="Descargar Excel"
                              >
                                <Download className="w-5 h-5" strokeWidth={2.5} />
                              </Button>
                            </motion.div>

                            {/* Botón EDITAR - Solo si NO está Aprobado ni Rechazado */}
                            {sol.estado !== 'Aprobado' && sol.estado !== 'Rechazado' && (
                              <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  onClick={() => {
                                    console.log('✏️ Click en editar:', sol);
                                    handleEditar(sol);
                                  }}
                                  title="Editar solicitud"
                                >
                                  <Pencil className="w-5 h-5" strokeWidth={2.5} />
                                </Button>
                              </motion.div>
                            )}

                            {/* Botones APROBAR/RECHAZAR - Para usuarios con permiso */}
                            {canAprobar && (sol.estado === 'Pendiente' || sol.estado === 'En revisión') && (
                              <>
                                <motion.div
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                    onClick={() => handleAbrirModalAccion(sol, 'aprobar')}
                                    title="Aprobar solicitud"
                                  >
                                    <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                                  </Button>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-100 border-2 border-red-200 hover:border-red-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                    onClick={() => handleAbrirModalAccion(sol, 'rechazar')}
                                    title="Rechazar solicitud"
                                  >
                                    <XCircle className="w-5 h-5" strokeWidth={2.5} />
                                  </Button>
                                </motion.div>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
              <div className="text-xs sm:text-sm text-slate-600">
                Mostrando {indiceInicio + 1} a {Math.min(indiceFin, solicitudesFiltradas.length)} de {solicitudesFiltradas.length} solicitudes
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPaginaActual(prev => Math.max(1, prev - 1))}
                  disabled={paginaActual === 1}
                  className="text-xs"
                >
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                    <Button
                      key={pagina}
                      size="sm"
                      variant={paginaActual === pagina ? 'default' : 'outline'}
                      onClick={() => setPaginaActual(pagina)}
                      className="text-xs w-8 h-8"
                    >
                      {pagina}
                    </Button>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPaginaActual(prev => Math.min(totalPaginas, prev + 1))}
                  disabled={paginaActual === totalPaginas}
                  className="text-xs"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Modal de aprobación/rechazo */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {accion === 'aprobar' ? 'Aprobar' : 'Rechazar'} Solicitud
            </DialogTitle>
            <DialogDescription>
              {accion === 'aprobar'
                ? 'Confirme la aprobación de esta solicitud. El usuario recibirá sus credenciales.'
                : 'Confirme el rechazo de esta solicitud. El solicitante será notificado.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm"><strong>Solicitante:</strong> {selectedSolicitud?.nombreCompleto}</p>
              <p className="text-sm"><strong>Tipo:</strong> {selectedSolicitud?.tipo}</p>
            </div>

            {accion === 'aprobar' && (
              <div>
                <Label htmlFor="login">Login Asignado</Label>
                <Input
                  id="login"
                  value={loginAsignado}
                  onChange={(e) => setLoginAsignado(e.target.value)}
                  placeholder="Ej: jperez"
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="comentario">Comentario</Label>
              <Textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Agregar comentario (opcional)"
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={procesando ? { scale: [1, 1.05, 1] } : {}}
              transition={procesando ? { repeat: Infinity, duration: 1 } : {}}
            >
              <Button
                onClick={handleAccion}
                disabled={procesando}
                className={`${accion === 'aprobar'
                  ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/50'
                  : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-2xl hover:shadow-red-500/50'
                  } transition-all duration-300 border-2 ${accion === 'aprobar' ? 'border-green-700 hover:border-green-500' : 'border-red-700 hover:border-red-500'
                  } rounded-lg`}
              >
                {procesando ? 'Procesando...' : (accion === 'aprobar' ? 'Aprobar' : 'Rechazar')}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de detalles completos */}
      <Dialog open={showDetalles} onOpenChange={setShowDetalles}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle>Detalles Completos de la Solicitud</DialogTitle>
              <DialogDescription>
                Información detallada de la solicitud seleccionada
              </DialogDescription>
            </DialogHeader>

            {selectedSolicitud && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Nombre Completo</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedSolicitud.nombre_completo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Cédula</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedSolicitud.cedula}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Tipo</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedSolicitud.tipo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Estado</p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    >
                      <Badge className={`text-xs rounded-full ${getStatusBadge(selectedSolicitud.estado)}`}>
                        {selectedSolicitud.estado}
                      </Badge>
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Cargo/Perfil</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedSolicitud.cargo || selectedSolicitud.perfil || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Área/Servicio</p>
                    <p className="text-sm text-slate-900 mt-1">{selectedSolicitud.area_servicio || selectedSolicitud.especialidad || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-600 font-medium">Fecha de Solicitud</p>
                    <p className="text-sm text-slate-900 mt-1">
                      {new Date(selectedSolicitud.fecha_solicitud).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>

                {/* Firmas Digitales */}
                {(() => {
                  const firmas = typeof selectedSolicitud.datos?.firmas === 'string'
                    ? JSON.parse(selectedSolicitud.datos.firmas || '{}')
                    : selectedSolicitud.datos?.firmas || {};
                  return selectedSolicitud.datos?.firmas && Object.keys(firmas).length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-900 font-semibold mb-3">📝 Firmas Digitales</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(firmas).map(([cargo, firma]: [string, any]) => (
                          <div key={cargo} className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
                            <p className="text-xs font-semibold text-slate-700 mb-2">{cargo.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg border border-slate-200 mb-2 p-2">
                              {firma.firma?.startsWith('FIRMA_TEXTO:') ? (
                                <p className="font-signature text-lg text-slate-800">
                                  {parseSignature(firma.firma).name}
                                </p>
                              ) : (
                                <img
                                  src={firma.firma}
                                  alt={`Firma ${cargo}`}
                                  className="max-h-16 max-w-full object-contain"
                                />
                              )}
                            </div>
                            <div className="text-center space-y-0.5">
                              <p className="text-xs text-slate-700 font-medium">{firma.usuario}</p>
                              <p className="text-[10px] text-slate-500">
                                {new Date(firma.fecha).toLocaleString('es-CO', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Módulos Administrativos */}
                {(() => {
                  const modulos = typeof selectedSolicitud.datos?.modulos_administrativos === 'string'
                    ? JSON.parse(selectedSolicitud.datos.modulos_administrativos || '{}')
                    : selectedSolicitud.datos?.modulos_administrativos || {};
                  return selectedSolicitud.datos?.modulos_administrativos && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-900 font-semibold mb-2">🖥️ Módulos Administrativos</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {Object.entries(modulos).map(([modulo, permisos]: [string, any]) => {
                          if (typeof permisos === 'object' && (permisos.adicionar || permisos.consultar || permisos.modificar || permisos.borrar)) {
                            return (
                              <div key={modulo} className="bg-slate-50 p-2 rounded border border-slate-200">
                                <p className="font-medium text-slate-700 capitalize">{modulo}</p>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {permisos.adicionar && <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[10px]">A</span>}
                                  {permisos.consultar && <span className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-[10px]">C</span>}
                                  {permisos.modificar && <span className="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-[10px]">M</span>}
                                  {permisos.borrar && <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-[10px]">B</span>}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Módulos Financieros */}
                {(() => {
                  const modulos = typeof selectedSolicitud.datos?.modulos_financieros === 'string'
                    ? JSON.parse(selectedSolicitud.datos.modulos_financieros || '{}')
                    : selectedSolicitud.datos?.modulos_financieros || {};
                  return selectedSolicitud.datos?.modulos_financieros && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-900 font-semibold mb-2">💰 Módulos Financieros</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {Object.entries(modulos).map(([modulo, permisos]: [string, any]) => {
                          if (typeof permisos === 'object' && (permisos.adicionar || permisos.consultar || permisos.modificar || permisos.borrar)) {
                            return (
                              <div key={modulo} className="bg-slate-50 p-2 rounded border border-slate-200">
                                <p className="font-medium text-slate-700 capitalize">{modulo}</p>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {permisos.adicionar && <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[10px]">A</span>}
                                  {permisos.consultar && <span className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-[10px]">C</span>}
                                  {permisos.modificar && <span className="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-[10px]">M</span>}
                                  {permisos.borrar && <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-[10px]">B</span>}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  );
                })()}

                <div className="pt-4 border-t">
                  <p className="text-xs text-slate-600 font-medium mb-2">Información Adicional</p>
                  <p className="text-sm text-slate-700">
                    ID: #{selectedSolicitud.id} | Tipo: {selectedSolicitud.tipo}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <DialogFooter>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => setShowDetalles(false)}>
                Cerrar
              </Button>
            </motion.div>
            {selectedSolicitud?.estado === 'Pendiente' && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      setShowDetalles(false);
                      setAccion('aprobar');
                      setShowModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-2 border-green-700 hover:border-green-500 rounded-lg"
                  >
                    Aprobar
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      setShowDetalles(false);
                      setAccion('rechazar');
                      setShowModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 border-2 border-red-700 hover:border-red-500 rounded-lg"
                  >
                    Rechazar
                  </Button>
                </motion.div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vista PDF */}
      {showPDF && selectedSolicitud && (
        selectedSolicitud.tipo === 'Administrativo' ? (
          <PDFAdministrativo
            solicitud={selectedSolicitud}
            onClose={() => {
              setShowPDF(false);
              setSelectedSolicitud(null);
            }}
          />
        ) : (
          <PDFHistoriaClinica
            solicitud={selectedSolicitud}
            onClose={() => {
              setShowPDF(false);
              setSelectedSolicitud(null);
            }}
          />
        )
      )}

      {/* Modal de Edición */}
      {solicitudEditando && tipoSolicitudEditando === 'Administrativo' && (
        <ModalEditarSolicitud
          open={modalEditarOpen}
          onClose={() => {
            setModalEditarOpen(false);
            setSolicitudEditando(null);
            setTipoSolicitudEditando(null);
          }}
          solicitudId={solicitudEditando}
          onSuccess={handleEditarSuccess}
        />
      )}

      {solicitudEditando && tipoSolicitudEditando === 'Historia Clínica' && (
        <ModalEditarHistoriaClinica
          open={modalEditarOpen}
          onClose={() => {
            setModalEditarOpen(false);
            setSolicitudEditando(null);
            setTipoSolicitudEditando(null);
          }}
          solicitudId={solicitudEditando}
          onSuccess={handleEditarSuccess}
        />
      )}
    </div>
  );
}
