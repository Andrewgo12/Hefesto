import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auth } from '@/lib/api';
import { toast } from '@/lib/toast';
import { X, User, Mail, Lock, Shield } from 'lucide-react';

interface ModalRegistroUsuarioProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ModalRegistroUsuario({ open, onClose, onSuccess }: ModalRegistroUsuarioProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    rol: 'Usuario',
    estado: 'activo'
  });
  const [errors, setErrors] = useState<any>({});

  // Limpiar formulario cuando se abre el modal
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: 'Usuario',
        estado: 'activo'
      });
      setErrors({});
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validaciones básicas
      if (formData.password !== formData.password_confirmation) {
        setErrors({ password_confirmation: ['Las contraseñas no coinciden'] });
        toast.error('Error', 'Las contraseñas no coinciden');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setErrors({ password: ['La contraseña debe tener al menos 6 caracteres'] });
        toast.error('Error', 'La contraseña debe tener al menos 6 caracteres');
        setLoading(false);
        return;
      }

      // Registrar usuario en la API
      const response = await auth.register(formData);

      if (response.data) {
        toast.success('Usuario creado', `El usuario ${formData.name} ha sido registrado exitosamente`);

        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          rol: 'Usuario',
          estado: 'inactivo'
        });

        // Llamar callback de éxito
        if (onSuccess) onSuccess();

        // Cerrar modal
        onClose();
      }
    } catch (err: any) {
      console.error('Error al registrar usuario:', err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        const firstError = Object.values(err.response.data.errors)[0];
        toast.error('Error de validación', Array.isArray(firstError) ? firstError[0] : 'Error en los datos');
      } else {
        const errorMsg = err.response?.data?.message || err.message || 'Error al registrar usuario';
        toast.error('Error', errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="w-6 h-6 text-blue-600" />
            Registrar Nuevo Usuario
          </DialogTitle>
          <DialogDescription>
            Complete los datos para crear un nuevo usuario en el sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nombre Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Correo Electrónico <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="usuario@hospital.com"
              required
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email[0]}</p>
            )}
          </div>


          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Contraseña <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password[0]}</p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password_confirmation" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirmar Contraseña <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={(e) => handleChange('password_confirmation', e.target.value)}
              placeholder="Repita la contraseña"
              required
              className={errors.password_confirmation ? 'border-red-500' : ''}
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation[0]}</p>
            )}
          </div>
          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Registrar Usuario
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
