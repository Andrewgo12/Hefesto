import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Key, Save, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { credencialesFirma } from '@/lib/api';
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

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

export default function CredencialesTab() {
    const [credenciales, setCredenciales] = useState<CredencialFirma[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editando, setEditando] = useState<CredencialFirma | null>(null);
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
        clave: '', // Added clave field
    });

    useEffect(() => {
        cargarCredenciales();
    }, []);

    const cargarCredenciales = async () => {
        try {
            setLoading(true);
            const response = await credencialesFirma.getAll();
            setCredenciales(response.data);
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
            orden: credenciales.length + 1,
            activo: true,
            clave: '',
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
            clave: '', // Don't show existing password, only allow setting new one
        });
        setDialogOpen(true);
    };

    const guardarCredencial = async () => {
        try {
            if (editando) {
                await credencialesFirma.update(editando.id, formData);
                toast({
                    title: 'Éxito',
                    description: 'Credencial actualizada correctamente',
                });
            } else {
                await credencialesFirma.create(formData);
                toast({
                    title: 'Éxito',
                    description: 'Credencial creada correctamente',
                });
            }
            setDialogOpen(false);
            cargarCredenciales();
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
            await credencialesFirma.toggleActivo(id);
            toast({
                title: 'Éxito',
                description: 'Estado actualizado correctamente',
            });
            cargarCredenciales();
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
            await credencialesFirma.delete(id);
            toast({
                title: 'Éxito',
                description: 'Credencial eliminada correctamente',
            });
            cargarCredenciales();
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
            administrativa: <Badge className="bg-blue-500">Administrativa</Badge>,
            historia_clinica: <Badge className="bg-green-500">Historia Clínica</Badge>,
            ambos: <Badge className="bg-purple-500">Ambos</Badge>,
        };
        return badges[tipo as keyof typeof badges] || null;
    };

    const contarPorTipo = (tipo: string) => {
        return credenciales.filter(c => c.tipo_formulario === tipo || c.tipo_formulario === 'ambos').length;
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
        <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={staggerItem}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={abrirDialogoNuevo}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <Key className="h-8 w-8 text-blue-600" />
                                <Plus className="h-5 w-5 text-slate-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl font-bold">{credenciales.length}</CardTitle>
                            <CardDescription className="mt-1">Total de Credenciales</CardDescription>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl font-bold">{contarPorTipo('administrativa')}</CardTitle>
                            <CardDescription className="mt-1">Formularios Administrativos</CardDescription>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl font-bold">{contarPorTipo('historia_clinica')}</CardTitle>
                            <CardDescription className="mt-1">Historias Clínicas</CardDescription>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                    <Button
                        className="w-full h-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                        onClick={abrirDialogoNuevo}
                    >
                        <Plus className="mr-2 h-6 w-6" />
                        Nueva Credencial
                    </Button>
                </motion.div>
            </motion.div>

            {/* Lista de Credenciales */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {credenciales.map((credencial, index) => (
                        <motion.div
                            key={credencial.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${!credencial.activo ? 'opacity-75 bg-slate-50' : ''}`}>
                                <div className={`absolute top-0 left-0 w-1 h-full ${credencial.activo ? 'bg-green-500' : 'bg-slate-300'}`} />

                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg font-bold text-slate-800">
                                                {credencial.cargo}
                                            </CardTitle>
                                            <CardDescription className="font-medium text-blue-600 mt-1">
                                                {credencial.nombre_completo}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => abrirDialogoEditar(credencial)}
                                                className="h-8 w-8 text-slate-500 hover:text-blue-600"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => eliminarCredencial(credencial.id)}
                                                className="h-8 w-8 text-slate-500 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4 pt-2">
                                    <div className="flex flex-wrap gap-2">
                                        {getTipoBadge(credencial.tipo_formulario)}
                                        <Badge variant="outline" className="border-slate-300">
                                            Orden: {credencial.orden}
                                        </Badge>
                                    </div>

                                    <div className="text-sm text-slate-600 space-y-1">
                                        <p><span className="font-medium">Email:</span> {credencial.email}</p>
                                        {credencial.cedula && <p><span className="font-medium">Cédula:</span> {credencial.cedula}</p>}
                                        {credencial.area_departamento && <p><span className="font-medium">Área:</span> {credencial.area_departamento}</p>}
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                        <span className={`text-xs font-medium ${credencial.activo ? 'text-green-600' : 'text-slate-500'}`}>
                                            {credencial.activo ? '● Activo' : '○ Inactivo'}
                                        </span>
                                        <Switch
                                            checked={credencial.activo}
                                            onCheckedChange={() => toggleActivo(credencial.id)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Modal de Edición/Creación */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editando ? 'Editar Credencial' : 'Nueva Credencial de Firma'}
                        </DialogTitle>
                        <DialogDescription>
                            Configure los datos de la persona autorizada para firmar documentos.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="cargo">Cargo *</Label>
                            <Input
                                id="cargo"
                                value={formData.cargo}
                                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                                placeholder="Ej: Director Médico"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre Completo *</Label>
                            <Input
                                id="nombre"
                                value={formData.nombre_completo}
                                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                                placeholder="Ej: Dr. Juan Pérez"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="juan.perez@hospital.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cedula">Cédula</Label>
                            <Input
                                id="cedula"
                                value={formData.cedula}
                                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                                placeholder="Opcional"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="area">Área / Departamento</Label>
                            <Input
                                id="area"
                                value={formData.area_departamento}
                                onChange={(e) => setFormData({ ...formData, area_departamento: e.target.value })}
                                placeholder="Ej: Dirección General"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="orden">Orden de Aparición</Label>
                            <Input
                                id="orden"
                                type="number"
                                value={formData.orden}
                                onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="tipo">Tipo de Formulario</Label>
                            <Select
                                value={formData.tipo_formulario}
                                onValueChange={(value: any) => setFormData({ ...formData, tipo_formulario: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="administrativa">Solo Administrativos</SelectItem>
                                    <SelectItem value="historia_clinica">Solo Historia Clínica</SelectItem>
                                    <SelectItem value="ambos">Ambos Tipos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clave">Clave de Firma *</Label>
                            <Input
                                id="clave"
                                type="password"
                                value={formData.clave}
                                onChange={(e) => setFormData({ ...formData, clave: e.target.value })}
                                placeholder="Contraseña para firmar"
                            />
                            <p className="text-xs text-slate-500">
                                Esta clave será requerida para firmar documentos digitalmente.
                            </p>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="descripcion">Descripción Adicional</Label>
                            <Textarea
                                id="descripcion"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                placeholder="Información adicional sobre esta firma..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={guardarCredencial} className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Credencial
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
