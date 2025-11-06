import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usuariosPrueba = [
    { email: 'admin@hefesto.local', password: 'password123', rol: 'Administrador' },
    { email: 'jefe@hefesto.local', password: 'password123', rol: 'Jefe de Área' },
    { email: 'medico@hefesto.local', password: 'password123', rol: 'Médico' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = usuariosPrueba.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!user) throw new Error('Usuario o contraseña incorrectos');

      const token = 'mock-token-12345';
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const loginRapido = async (email: string, password: string) => {
    setFormData({ email, password });
    setError('');
    setLoading(true);

    try {
      const user = usuariosPrueba.find(
        u => u.email === email && u.password === password
      );

      if (!user) throw new Error('Usuario o contraseña incorrectos');

      const token = 'mock-token-12345';
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ingresa tu usuario"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="text-right">
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-center text-xs sm:text-sm text-gray-500 font-medium">Acceso rápido (prueba)</p>
              {usuariosPrueba.map((user, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => loginRapido(user.email, user.password)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                >
                  <p className="font-semibold text-gray-700 text-xs sm:text-sm">{user.rol}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </motion.button>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500">
              Contraseña: <code className="px-1.5 py-0.5 bg-gray-100 rounded font-mono text-gray-700">password123</code>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
