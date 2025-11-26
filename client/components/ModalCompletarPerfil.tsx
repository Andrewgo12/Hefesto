import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, MapPin, Briefcase } from 'lucide-react';
import { toast } from '@/lib/toast';
import api from '@/lib/api';

interface ModalCompletarPerfilProps {
    open: boolean;
    onClose: () => void;
    userData: any;
}

export default function ModalCompletarPerfil({ open, onClose, userData }: ModalCompletarPerfilProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        telefono: '',
        direccion: '',
        cargo: '',
    });

    useEffect(() => {
        if (open && userData) {
            setFormData({
                username: userData.username || '',
                telefono: userData.telefono || '',
                direccion: userData.direccion || '',
                cargo: userData.cargo || '',
            });
        }
    }, [open, userData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Actualizar perfil del usuario
            await api.put('/perfil', formData);

            // Actualizar localStorage con los nuevos datos
            const updatedUser = { ...userData, ...formData };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success('Perfil completado', 'Tu información ha sido actualizada correctamente');
            onClose();
        } catch (err: any) {
            console.error('Error al actualizar perfil:', err);
            const errorMsg = err.response?.data?.message || 'Error al actualizar el perfil';
            toast.error('Error', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <User className="w-6 h-6 text-blue-600" />
                        Completar Perfil
                    </DialogTitle>
                    <DialogDescription>
                        Por favor completa tu información para comenzar a usar el sistema
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Nombre de Usuario <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            placeholder="Ej: juanperez"
                            required
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                        <Label htmlFor="telefono" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Teléfono <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => handleChange('telefono', e.target.value)}
                            placeholder="Ej: 3001234567"
                            required
                        />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                        <Label htmlFor="direccion" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Dirección
                        </Label>
                        <Input
                            id="direccion"
                            type="text"
                            value={formData.direccion}
                            onChange={(e) => handleChange('direccion', e.target.value)}
                            placeholder="Ej: Calle 123 #45-67"
                        />
                    </div>

                    {/* Cargo */}
                    <div className="space-y-2">
                        <Label htmlFor="cargo" className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Cargo
                        </Label>
                        <Input
                            id="cargo"
                            type="text"
                            value={formData.cargo}
                            onChange={(e) => handleChange('cargo', e.target.value)}
                            placeholder="Ej: Médico General"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <User className="w-4 h-4 mr-2" />
                                    Guardar y Continuar
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
