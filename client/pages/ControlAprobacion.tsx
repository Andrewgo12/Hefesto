import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Eye, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { solicitudesAdministrativas, solicitudesHistoriaClinica } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Pendiente");
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState<'aprobar' | 'rechazar'>('aprobar');
  const [comentario, setComentario] = useState('');
  const [loginAsignado, setLoginAsignado] = useState('');
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    cargarSolicitudes();
  }, [filtroEstado]);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const params = { 
        estado: filtroEstado,
        per_page: 50 
      };

      const [resAdmin, resHC] = await Promise.all([
        solicitudesAdministrativas.getAll(params),
        solicitudesHistoriaClinica.getAll(params),
      ]);

      const solsAdmin = (resAdmin.data.data || []).map((s: any) => ({
        ...s,
        tipo: 'Administrativo' as const,
      }));
      
      const solsHC = (resHC.data.data || []).map((s: any) => ({
        ...s,
        tipo: 'Historia Clínica' as const,
      }));

      setSolicitudes([...solsAdmin, ...solsHC].sort((a, b) => 
        new Date(b.fecha_solicitud).getTime() - new Date(a.fecha_solicitud).getTime()
      ));
    } catch (error) {
      console.error('Error cargando solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccion = async () => {
    if (!selectedSolicitud) return;

    setProcesando(true);
    try {
      const api = selectedSolicitud.tipo === 'Administrativo' 
        ? solicitudesAdministrativas 
        : solicitudesHistoriaClinica;

      const data: any = { comentario };
      if (accion === 'aprobar' && loginAsignado) {
        data.login_asignado = loginAsignado;
      }

      if (accion === 'aprobar') {
        await api.aprobar(selectedSolicitud.id, data);
      } else {
        await api.rechazar(selectedSolicitud.id, data);
      }

      alert(`Solicitud ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} correctamente`);
      setShowModal(false);
      setComentario('');
      setLoginAsignado('');
      cargarSolicitudes();
    } catch (error: any) {
      console.error('Error:', error);
      alert('Error al procesar solicitud: ' + (error.response?.data?.message || error.message));
    } finally {
      setProcesando(false);
    }
  };

  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const search = searchTerm.toLowerCase();
    return (
      sol.nombre_completo.toLowerCase().includes(search) ||
      sol.cedula.includes(search) ||
      (sol.area_servicio && sol.area_servicio.toLowerCase().includes(search))
    );
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
    <Layout>
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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      Cargando...
                    </td>
                  </tr>
                ) : solicitudesFiltradas.length === 0 ? (
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
                          <p className="text-sm font-medium text-slate-900">{sol.nombre_completo}</p>
                          <p className="text-xs text-slate-500">CC: {sol.cedula}</p>
                        </div>
                      </td>
                      <td className="p-3 text-xs">{sol.tipo}</td>
                      <td className="p-3 text-xs">{sol.cargo || sol.perfil || '-'}</td>
                      <td className="p-3 text-xs">{sol.area_servicio || sol.especialidad || '-'}</td>
                      <td className="p-3 text-xs">{new Date(sol.fecha_solicitud).toLocaleDateString('es-CO')}</td>
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
                              // TODO: Abrir modal de detalles
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
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm"><strong>Solicitante:</strong> {selectedSolicitud?.nombre_completo}</p>
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
      </div>
    </Layout>
  );
}
