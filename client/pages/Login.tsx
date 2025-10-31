import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', formData);
      const { token, user } = response.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir al dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Usuarios de prueba
  const usuariosPrueba = [
    { email: 'admin@hefesto.local', password: 'password123', rol: 'Administrador' },
    { email: 'jefe@hefesto.local', password: 'password123', rol: 'Jefe de Área' },
    { email: 'medico@hefesto.local', password: 'password123', rol: 'Médico' },
  ];

  const loginRapido = (email: string, password: string) => {
    setFormData({ email, password });
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form')?.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">H</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">HEFESTO</h1>
          <p className="text-slate-600 mt-2">Sistema de Gestión de Usuarios Hospitalarios</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="usuario@hefesto.local"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              className="mt-1"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-3 text-center">
            <strong>Usuarios de prueba:</strong>
          </p>
          <div className="space-y-2">
            {usuariosPrueba.map((user, idx) => (
              <Button
                key={idx}
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-xs justify-start"
                onClick={() => loginRapido(user.email, user.password)}
              >
                <span className="font-semibold mr-2">{user.rol}:</span>
                <span className="text-slate-600">{user.email}</span>
              </Button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Contraseña: password123
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            FOR-GDI-SIS-004 | FOR-GDI-SIS-003
          </p>
        </div>
      </Card>
    </div>
  );
}
