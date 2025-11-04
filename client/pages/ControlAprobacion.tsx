import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Eye, Search, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { useApp } from "@/contexts/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const USE_API = import.meta.env.VITE_USE_API === 'true';

interface Solicitud {
  id: number;
  nombre_completo: string;
  cedula: string;
  tipo: 'Administrativo' | 'Historia Clínica';
  estado: string;
  fecha_solicitud: string;
  cargo?: string;
  area_servicio?: string;
  especialidad?: string;
  perfil?: string;
}

export default function ControlAprobacion() {
  const { solicitudes: todasSolicitudes, actualizarEstadoSolicitud } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Pendiente");
  const [selectedSolicitud, setSelectedSolicitud] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState<'aprobar' | 'rechazar'>('aprobar');
  const [comentario, setComentario] = useState('');
  const [loginAsignado, setLoginAsignado] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [showDetalles, setShowDetalles] = useState(false);

  const handleAccion = async () => {
    if (!selectedSolicitud) return;

    setProcesando(true);
    try {
      const nuevoEstado = accion === 'aprobar' ? 'Aprobado' : 'Rechazado';
      
      // Actualizar en contexto global
      actualizarEstadoSolicitud(selectedSolicitud.id, nuevoEstado, comentario);
      
      toast.success(
        `Solicitud ${accion === 'aprobar' ? 'aprobada' : 'rechazada'}`,
        `La solicitud ha sido ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} correctamente`
      );
      
      setShowModal(false);
      setComentario('');
      setSelectedSolicitud(null);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Error al procesar solicitud', error.message);
    } finally {
      setProcesando(false);
    }
  };

  // Filtrar solicitudes del contexto
  const solicitudesFiltradas = todasSolicitudes.filter((sol) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = sol.nombreCompleto.toLowerCase().includes(search) ||
      sol.cedula.includes(search);
    
    const matchesEstado = filtroEstado === 'Todos' || sol.estado === filtroEstado;
    
    return matchesSearch && matchesEstado;
  });

  const getStatusBadge = (estado: string) => {
    const colors = {
      'Pendiente': 'bg-amber-100 text-amber-800 border-amber-300',
      'En revisión': 'bg-blue-100 text-blue-800 border-blue-300',
      'Aprobado': 'bg-green-100 text-green-800 border-green-300',
      'Rechazado': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[estado as keyof typeof colors] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Control de Aprobaciones</h1>
          <p className="text-sm text-slate-600">Gestión de solicitudes de usuarios</p>
        </div>

        {/* Filtros */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, cédula o área..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['Pendiente', 'En revisión', 'Aprobado', 'Rechazado'].map((estado) => (
                <Button
                  key={estado}
                  size="sm"
                  variant={filtroEstado === estado ? 'default' : 'outline'}
                  onClick={() => setFiltroEstado(estado)}
                >
                  {estado}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabla de solicitudes */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Solicitante</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Tipo</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Cargo/Perfil</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Área</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Fecha</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Estado</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No hay solicitudes {filtroEstado.toLowerCase()}
                    </td>
                  </tr>
                ) : (
                  solicitudesFiltradas.map((sol) => (
                    <tr key={`${sol.tipo}-${sol.id}`} className="border-b hover:bg-slate-50">
                      <td className="p-3">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{sol.nombreCompleto}</p>
                          <p className="text-xs text-slate-500">CC: {sol.cedula}</p>
                        </div>
                      </td>
                      <td className="p-3 text-xs">{sol.tipo}</td>
                      <td className="p-3 text-xs">{sol.cargo || sol.especialidad || '-'}</td>
                      <td className="p-3 text-xs">{sol.especialidad || '-'}</td>
                      <td className="p-3 text-xs">{new Date(sol.fechaSolicitud).toLocaleDateString('es-CO')}</td>
                      <td className="p-3">
                        <Badge className={`text-xs ${getStatusBadge(sol.estado)}`}>
                          {sol.estado}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {sol.estado === 'Pendiente' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => {
                                  setSelectedSolicitud(sol);
                                  setAccion('aprobar');
                                  setShowModal(true);
                                }}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedSolicitud(sol);
                                  setAccion('rechazar');
                                  setShowModal(true);
                                }}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => {
                              setSelectedSolicitud(sol);
                              setShowDetalles(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

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
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleAccion}
                disabled={procesando}
                className={accion === 'aprobar' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                {procesando ? 'Procesando...' : (accion === 'aprobar' ? 'Aprobar' : 'Rechazar')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de detalles completos */}
        <Dialog open={showDetalles} onOpenChange={setShowDetalles}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles Completos de la Solicitud</DialogTitle>
              <DialogDescription>
                Información detallada de la solicitud seleccionada
              </DialogDescription>
            </DialogHeader>

            {selectedSolicitud && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Badge className={`text-xs ${getStatusBadge(selectedSolicitud.estado)}`}>
                      {selectedSolicitud.estado}
                    </Badge>
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

                <div className="pt-4 border-t">
                  <p className="text-xs text-slate-600 font-medium mb-2">Información Adicional</p>
                  <p className="text-sm text-slate-700">
                    ID: #{selectedSolicitud.id} | Tipo: {selectedSolicitud.tipo}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetalles(false)}>
                Cerrar
              </Button>
              {selectedSolicitud?.estado === 'Pendiente' && (
                <>
                  <Button
                    onClick={() => {
                      setShowDetalles(false);
                      setAccion('aprobar');
                      setShowModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Aprobar
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDetalles(false);
                      setAccion('rechazar');
                      setShowModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Rechazar
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
