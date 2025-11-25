import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { auth } from '@/lib/api';
import { toast } from '@/lib/toast';
import ModalRegistroUsuario from '@/components/ModalRegistroUsuario';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  // Validar email en tiempo real
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('');
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Formato de email inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAttemptsRemaining(null);
    setLoading(true);

    // Validar antes de enviar
    if (!validateEmail(formData.email)) {
      setLoading(false);
      return;
    }

    try {
      // Login con API - Base de datos
      const response = await auth.login({
        email: formData.email,
        password: formData.password,
        remember: rememberMe,
      });

      if (response.data.token) {
        // Guardar token y datos del usuario
        localStorage.setItem('auth_token', response.data.token);

        // Combinar datos del usuario con roles y permisos para el frontend
        const userData = {
          ...response.data.user,
          roles: response.data.roles,
          es_administrador: response.data.es_administrador
        };

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('user_name', response.data.user.name);
        localStorage.setItem('user_email', response.data.user.email);

        // Guardar preferencia de "recordarme"
        if (rememberMe) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remember_me');
        }

        toast.success('Bienvenido', `Sesión iniciada como ${response.data.user.name}`);

        // Add small delay to ensure localStorage writes complete
        setTimeout(() => {
          navigate('/');
        }, 100);
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      const errorMsg = errorData?.message || err.message || 'Error al iniciar sesión';

      // Manejar diferentes tipos de error
      if (err.response?.status === 429) {
        // Cuenta bloqueada
        const minutesRemaining = errorData?.minutes_remaining || 15;
        setError(`${errorMsg}. Tiempo restante: ${minutesRemaining} minutos`);
        toast.error('Cuenta Bloqueada', errorMsg);
      } else if (err.response?.status === 401) {
        // Credenciales incorrectas
        const remaining = errorData?.attempts_remaining;
        if (remaining !== undefined) {
          setAttemptsRemaining(remaining);
          setError(`${errorMsg}. Intentos restantes: ${remaining}`);
          toast.error('Error', errorMsg);
        } else {
          setError(errorMsg);
          toast.error('Error', errorMsg);
        }
      } else {
        setError(errorMsg);
        toast.error('Error', errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <PageTransition className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Panel izquierdo con animación de fondo - Solo desktop */}
      <motion.div
        className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-blue-700 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Figuras animadas en fondo */}
        <motion.div
          className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10"
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-white/20 rounded-full bottom-20 right-20"
          animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
        />

        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="w-64 h-64 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            <span className="text-9xl font-bold text-blue-700">H</span>
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold text-white"
          >
            HEFESTO
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 text-sm text-white/80"
          >
            <p>Usuarios Administrativos</p>
            <p>Historia Clínica</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Panel derecho - Responsivo */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white min-h-screen overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-6 sm:space-y-8 my-auto"
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">HEFESTO</h1>
            <h2 className="text-lg sm:text-xl text-gray-600">Bienvenido de vuelta</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Usuario o Correo
              </label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="Ingresa tu usuario"
                required
                className={`w-full p-3 border rounded-lg focus:ring-2 transition-all ${emailError
                  ? 'border-red-500 focus:ring-red-500'
                  : formData.email && !emailError
                    ? 'border-green-500 focus:ring-green-500'
                    : 'focus:ring-blue-500'
                  }`}
              />
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Recordarme</span>
                </label>

                <Link
                  to="#"
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <p className="text-sm text-red-600">{error}</p>
                {attemptsRemaining !== null && attemptsRemaining > 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    ⚠️ {attemptsRemaining} intento{attemptsRemaining !== 1 ? 's' : ''} restante{attemptsRemaining !== 1 ? 's' : ''} antes del bloqueo
                  </p>
                )}
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all shadow hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Iniciando...
                  </span>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </motion.div>

            {/* Botón de Registro */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-3">
                ¿No tienes cuenta?
              </p>
              <motion.button
                type="button"
                onClick={() => setShowRegistroModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md font-semibold flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Registrar Nuevo Usuario
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Modal de Registro */}
      <ModalRegistroUsuario
        open={showRegistroModal}
        onClose={() => setShowRegistroModal(false)}
        onSuccess={() => {
          toast.success('Usuario registrado', 'Ahora puedes iniciar sesión con tus credenciales');
        }}
      />
    </PageTransition>
  );
}
