import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Power, PowerOff, GripVertical, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

interface CredencialFirma {
  id: number;
  cargo: string;
  nombre_completo: string;
  email: string;
  cedula?: string;
  area_departamento?: string;
  activo: boolean;
  descripcion?: string;
  tipo_formulario: 'administrativa' | 'historia_clinica' | 'ambos';
  orden: number;
  created_at: string;
  updated_at: string;
}

export default function GestionCredenciales() {
  const [credenciales, setCredenciales] = useState<CredencialFirma[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<CredencialFirma | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    cargo: '',
    nombre_completo: '',
    email: '',
    cedula: '',
    area_departamento: '',
    descripcion: '',
    tipo_formulario: 'ambos' as 'administrativa' | 'historia_clinica' | 'ambos',
    orden: 0,
    activo: true,
  });

  useEffect(() => {
    cargarCredenciales();
  }, [filtroTipo]);

  const cargarCredenciales = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filtroTipo !== 'todos') {
        params.append('tipo_formulario', filtroTipo);
      }
      
      const response = await fetch(`/api/credenciales-firmas?${params}`);
      const data = await response.json();
      setCredenciales(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las credenciales',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const abrirDialogoNuevo = () => {
    setEditando(null);
    setFormData({
      cargo: '',
      nombre_completo: '',
      email: '',
      cedula: '',
      area_departamento: '',
      descripcion: '',
      tipo_formulario: 'ambos',
      orden: credenciales.length,
      activo: true,
    });
    setDialogOpen(true);
  };

  const abrirDialogoEditar = (credencial: CredencialFirma) => {
    setEditando(credencial);
    setFormData({
      cargo: credencial.cargo,
      nombre_completo: credencial.nombre_completo,
      email: credencial.email,
      cedula: credencial.cedula || '',
      area_departamento: credencial.area_departamento || '',
      descripcion: credencial.descripcion || '',
      tipo_formulario: credencial.tipo_formulario,
      orden: credencial.orden,
      activo: credencial.activo,
    });
    setDialogOpen(true);
  };

  const guardarCredencial = async () => {
    try {
      const url = editando
        ? `/api/credenciales-firmas/${editando.id}`
        : '/api/credenciales-firmas';
      
      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: editando
            ? 'Credencial actualizada correctamente'
            : 'Credencial creada correctamente',
        });
        setDialogOpen(false);
        cargarCredenciales();
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.message || 'Error al guardar la credencial',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al guardar la credencial',
        variant: 'destructive',
      });
    }
  };

  const toggleActivo = async (id: number) => {
    try {
      const response = await fetch(`/api/credenciales-firmas/${id}/toggle-activo`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: 'Estado actualizado correctamente',
        });
        cargarCredenciales();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al actualizar el estado',
        variant: 'destructive',
      });
    }
  };

  const eliminarCredencial = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar esta credencial?')) return;

    try {
      const response = await fetch(`/api/credenciales-firmas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: 'Credencial eliminada correctamente',
        });
        cargarCredenciales();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al eliminar la credencial',
        variant: 'destructive',
      });
    }
  };

  const getTipoBadge = (tipo: string) => {
    const badges = {
      administrativa: <Badge variant="default">Administrativa</Badge>,
      historia_clinica: <Badge variant="secondary">Historia Clínica</Badge>,
      ambos: <Badge variant="outline">Ambos</Badge>,
    };
    return badges[tipo as keyof typeof badges] || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando credenciales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Credenciales de Firmas</h1>
          <p className="text-muted-foreground mt-1">
            Administra las personas autorizadas para firmar formularios
          </p>
        </div>
        <Button onClick={abrirDialogoNuevo}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Credencial
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="filtro-tipo">Filtrar por tipo:</Label>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger id="filtro-tipo" className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="administrativa">Administrativa</SelectItem>
                <SelectItem value="historia_clinica">Historia Clínica</SelectItem>
                <SelectItem value="ambos">Ambos</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-auto">
              {credenciales.length} credencial(es)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Credenciales */}
      <div className="grid gap-4">
        {credenciales.map((credencial) => (
          <Card key={credencial.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-move" />
                  <div>
                    <CardTitle className="text-lg">{credencial.cargo}</CardTitle>
                    <CardDescription className="mt-1">
                      {credencial.nombre_completo} • {credencial.email}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTipoBadge(credencial.tipo_formulario)}
                  {credencial.activo ? (
                    <Badge variant="default" className="bg-green-500">
                      <Power className="mr-1 h-3 w-3" />
                      Activo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <PowerOff className="mr-1 h-3 w-3" />
                      Inactivo
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 gap-4 text-sm flex-1">
                  {credencial.cedula && (
                    <div>
                      <span className="text-muted-foreground">Cédula:</span>
                      <span className="ml-2 font-medium">{credencial.cedula}</span>
                    </div>
                  )}
                  {credencial.area_departamento && (
                    <div>
                      <span className="text-muted-foreground">Área:</span>
                      <span className="ml-2 font-medium">{credencial.area_departamento}</span>
                    </div>
                  )}
                  {credencial.descripcion && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Descripción:</span>
                      <p className="mt-1 text-sm">{credencial.descripcion}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActivo(credencial.id)}
                    title={credencial.activo ? 'Desactivar' : 'Activar'}
                  >
                    {credencial.activo ? (
                      <PowerOff className="h-4 w-4" />
                    ) : (
                      <Power className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => abrirDialogoEditar(credencial)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => eliminarCredencial(credencial.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {credenciales.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No hay credenciales registradas.
                <br />
                Haz clic en "Nueva Credencial" para agregar una.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog para Crear/Editar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editando ? 'Editar Credencial' : 'Nueva Credencial'}
            </DialogTitle>
            <DialogDescription>
              Complete la información de la persona autorizada para firmar
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  placeholder="Ej: Jefe Inmediato"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo_formulario">Tipo de Formulario *</Label>
                <Select
                  value={formData.tipo_formulario}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, tipo_formulario: value })
                  }
                >
                  <SelectTrigger id="tipo_formulario">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrativa">Administrativa</SelectItem>
                    <SelectItem value="historia_clinica">Historia Clínica</SelectItem>
                    <SelectItem value="ambos">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre_completo">Nombre Completo *</Label>
              <Input
                id="nombre_completo"
                value={formData.nombre_completo}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_completo: e.target.value })
                }
                placeholder="Nombre completo de la persona"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@hospital.gov.co"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula</Label>
                <Input
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                  placeholder="Número de cédula"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area_departamento">Área/Departamento</Label>
                <Input
                  id="area_departamento"
                  value={formData.area_departamento}
                  onChange={(e) =>
                    setFormData({ ...formData, area_departamento: e.target.value })
                  }
                  placeholder="Ej: Talento Humano"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orden">Orden</Label>
                <Input
                  id="orden"
                  type="number"
                  value={formData.orden}
                  onChange={(e) =>
                    setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción del rol de esta persona en el proceso de firma"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, activo: checked })
                }
              />
              <Label htmlFor="activo">Credencial activa</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={guardarCredencial}>
              <Save className="mr-2 h-4 w-4" />
              {editando ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
