import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HiLockClosed, HiMail, HiEye, HiEyeOff } from 'react-icons/hi';
import TextType from '@/components/animations/TextType';
import ClickSpark from '@/components/animations/ClickSpark';
import api from '@/lib/api';

export default function ModernLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const usuariosPrueba = [
    { email: 'admin@hefesto.local', password: 'password123', rol: 'Administrador', color: 'from-blue-500 to-purple-600' },
    { email: 'jefe@hefesto.local', password: 'password123', rol: 'Jefe de Área', color: 'from-green-500 to-teal-600' },
    { email: 'medico@hefesto.local', password: 'password123', rol: 'Médico', color: 'from-pink-500 to-red-600' },
  ];

  const loginRapido = (email: string, password: string) => {
    setFormData({ email, password });
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form')?.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo - Decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Efecto de burbujas animadas */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
            <span className="text-5xl font-bold text-white">H</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            HEFESTO
          </h1>
          <TextType
            text={[
              "Sistema de Gestión Hospitalaria",
              "Gestión de Usuarios",
              "Historia Clínica Electrónica",
              "Bienvenido de nuevo"
            ]}
            typingSpeed={75}
            pauseDuration={2000}
            className="text-2xl text-white/90 font-light"
          />
        </div>

        <div className="relative z-10 text-white/80 space-y-3">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            FOR-GDI-SIS-004 | Usuarios Administrativos
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            FOR-GDI-SIS-003 | Historia Clínica Electrónica
          </p>
        </div>
      </div>

      {/* Panel Derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                <HiLockClosed className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Iniciar Sesión</h2>
              <p className="text-slate-600 mt-2">Accede a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Correo Electrónico
                </Label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="usuario@hefesto.local"
                    required
                    className="pl-10 py-3 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Contraseña
                </Label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 py-3 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <HiEye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              )}

              <ClickSpark sparkColor="#3b82f6" sparkCount={12} sparkRadius={25}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Iniciando...
                    </span>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </ClickSpark>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">Usuarios de prueba</span>
              </div>
            </div>

            <div className="space-y-2">
              {usuariosPrueba.map((user, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loginRapido(user.email, user.password)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all duration-200 hover:shadow-md bg-gradient-to-r ${user.color} bg-clip-text`}
                >
                  <p className="font-semibold text-transparent">{user.rol}</p>
                  <p className="text-xs text-slate-600">{user.email}</p>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-slate-500">
              Contraseña de prueba: <span className="font-mono font-semibold">password123</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
