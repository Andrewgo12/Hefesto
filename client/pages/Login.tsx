import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence, type Variants, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { auth } from '@/lib/api';
import { toast } from '@/lib/toast';
import ModalRegistroUsuario from '@/components/ModalRegistroUsuario';
import LoadingScreen from '@/components/LoadingScreen';
import { UserPlus, Eye, EyeOff, LogIn, Sparkles, CheckCircle2, Shield, Zap, Lock, Mail, Star } from 'lucide-react';

// Animaciones optimizadas con CSS transforms (GPU accelerated)
const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const pulseGlow: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      repeatDelay: 3
    }
  }
};

const breathe: Variants = {
  initial: { scale: 1, opacity: 0.6 },
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.6, 0.9, 0.6],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const slideInLeft = {
  initial: { x: -30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

const slideInRight = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

// Componente de partículas flotantes optimizadas
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full will-change-transform"
        style={{
          width: `${4 + (i % 3) * 2}px`,
          height: `${4 + (i % 3) * 2}px`,
          background: `rgba(255, 255, 255, ${0.1 + (i % 4) * 0.05})`,
          left: `${5 + i * 8}%`,
          top: `${10 + (i % 5) * 18}%`,
        }}
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3,
        }}
      />
    ))}
  </div>
);

// Componente de estrellas decorativas
const DecorativeStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute will-change-transform"
        style={{
          left: `${10 + i * 20}%`,
          top: `${15 + (i % 3) * 30}%`,
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Star className="w-3 h-3 text-white/30" />
      </motion.div>
    ))}
  </div>
);

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringForm, setIsHoveringForm] = useState(false);

  // Motion values para efecto parallax del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transforms suavizados con spring
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), springConfig);

  // Manejador de movimiento del mouse para parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Activar animaciones después del montaje para evitar parpadeos
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAttemptsRemaining(null);
    setLoading(true);

    try {
      const response = await auth.login({
        email: formData.email,
        password: formData.password,
        remember: rememberMe,
      });

      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('user_name', response.data.user.name);
        localStorage.setItem('user_email', response.data.user.email);

        toast.success('Bienvenido', `Sesión iniciada como ${response.data.user.name}`);
        setShowLoadingScreen(true);
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      const errorMsg = errorData?.message || err.message || 'Error al iniciar sesión';

      if (err.response?.status === 429) {
        const minutesRemaining = errorData?.minutes_remaining || 15;
        setError(`${errorMsg}. Tiempo restante: ${minutesRemaining} minutos`);
        toast.error('Cuenta Bloqueada', errorMsg);
      } else if (err.response?.status === 401) {
        const remaining = errorData?.attempts_remaining;
        if (remaining !== undefined) {
          setAttemptsRemaining(remaining);
          setError(`${errorMsg}. Intentos restantes: ${remaining}`);
        } else {
          setError(errorMsg);
        }
        toast.error('Error', errorMsg);
      } else {
        setError(errorMsg);
        toast.error('Error', errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Panel izquierdo - Desktop con animaciones */}
      <motion.div 
        className="relative hidden lg:flex flex-col items-center justify-center p-8 overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onMouseMove={handleMouseMove}
      >
        {/* Gradiente animado de fondo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-indigo-900/50 will-change-transform"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(30,58,138,0.5) 0%, transparent 50%, rgba(49,46,129,0.5) 100%)',
              'linear-gradient(135deg, rgba(49,46,129,0.5) 0%, transparent 50%, rgba(30,58,138,0.5) 100%)',
              'linear-gradient(135deg, rgba(30,58,138,0.5) 0%, transparent 50%, rgba(49,46,129,0.5) 100%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Círculos decorativos animados con GPU acceleration */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-blue-600/20 -top-20 -left-20 blur-3xl will-change-transform"
          variants={pulseGlow}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-blue-500/15 -bottom-10 -right-10 blur-3xl will-change-transform"
          variants={pulseGlow}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
        />
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-blue-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl will-change-transform"
          variants={floatingAnimation}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
        />

        {/* Círculo de luz que sigue el mouse */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none will-change-transform"
          style={{
            x: useTransform(mouseX, [0, 400], [-100, 100]),
            y: useTransform(mouseY, [0, 400], [-100, 100]),
          }}
        />

        {/* Partículas flotantes mejoradas */}
        <FloatingParticles />
        
        {/* Estrellas decorativas */}
        <DecorativeStars />

        {/* Líneas de conexión animadas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line
            x1="10%" y1="20%" x2="30%" y2="40%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="70%" y1="30%" x2="90%" y2="60%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="20%" y1="70%" x2="50%" y2="85%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </svg>

        <motion.div 
          className="relative z-10 max-w-lg mx-auto text-center space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Logo con animación flotante y efecto 3D al hover */}
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate={mounted ? "animate" : "initial"}
            className="relative"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ 
                scale: isHoveringLogo ? 1.05 : 1, 
                opacity: 1, 
                rotateY: isHoveringLogo ? 5 : 0,
                rotateX: isHoveringLogo ? -5 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-64 h-64 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden cursor-pointer"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: isHoveringLogo 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              whileHover={{ 
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 50px rgba(59, 130, 246, 0.4)'
              }}
            >
              <motion.img 
                src="/Documentos/LOGOaGREMIADO.jpeg" 
                alt="HUV Logo" 
                className="w-full h-full object-contain p-3"
                animate={{
                  scale: isHoveringLogo ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Efecto shimmer al hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                variants={shimmer}
                initial="initial"
                animate={isHoveringLogo ? "animate" : "initial"}
              />
            </motion.div>
            {/* Brillo animado detrás del logo */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 rounded-3xl blur-xl -z-10"
              animate={{
                opacity: isHoveringLogo ? [0.5, 0.8, 0.5] : [0.3, 0.6, 0.3],
                scale: isHoveringLogo ? 1.1 : 1,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Título con animación de entrada */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-6xl font-bold text-white tracking-widest mb-4" 
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              animate={{
                textShadow: [
                  '0 4px 20px rgba(0,0,0,0.3)',
                  '0 4px 30px rgba(59,130,246,0.4)',
                  '0 4px 20px rgba(0,0,0,0.3)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              KAIZEN
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.02, color: 'rgba(255,255,255,1)' }}
            >
              --|| Gestión Usuarios Historia Clínica ||--
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-2 text-white/70 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.5, rotate: 180 }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <motion.span 
                className="text-sm"
                whileHover={{ color: 'rgba(255,255,255,1)', letterSpacing: '0.05em' }}
                transition={{ duration: 0.2 }}
              >
                Hospital Universitario del Valle
              </motion.span>
              <motion.div
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.5, rotate: -180 }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Badges de características con más interactividad */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm cursor-pointer border border-transparent"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(255,255,255,0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-4 h-4" />
              </motion.div>
              <span>Seguro</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm cursor-pointer border border-transparent"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(255,255,255,0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              <span>Rápido</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm cursor-pointer border border-transparent"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(255,255,255,0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.div
                whileHover={{ rotate: -360 }}
                transition={{ duration: 0.5 }}
              >
                <Lock className="w-4 h-4" />
              </motion.div>
              <span>Confiable</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Línea decorativa animada con efecto shimmer */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Panel derecho - Formulario con animaciones */}
      <motion.div 
        className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={() => setIsHoveringForm(true)}
        onMouseLeave={() => setIsHoveringForm(false)}
        transition={{ duration: 0.5 }}
      >
        {/* Decoración de fondo del formulario */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
          animate={{
            scale: isHoveringForm ? 1.1 : 1,
            opacity: isHoveringForm ? 0.7 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"
          animate={{
            scale: isHoveringForm ? 1.15 : 1,
            opacity: isHoveringForm ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm space-y-6 my-auto relative z-10"
        >
          {/* Logo móvil con animación mejorada */}
          <motion.div 
            className="flex justify-center lg:hidden"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div className="relative">
              <motion.img 
                src="/Documentos/LOGOaGREMIADO.jpeg" 
                alt="Logo" 
                className="w-20 h-20 object-contain rounded-2xl shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 blur-md -z-10"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Encabezado con animación mejorada - Tamaño aumentado 30% */}
          <motion.div 
            className="text-center"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Bienvenido
            </motion.h1>
            <motion.p 
              className="text-2xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Ingresa tus credenciales
            </motion.p>
          </motion.div>

          {/* Formulario con animaciones escalonadas */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Campo Usuario con icono animado - Tamaño aumentado 30% */}
            <motion.div 
              className="space-y-3"
              variants={fadeInUp}
            >
              <motion.label 
                className="text-lg font-semibold text-gray-700 flex items-center gap-2" 
                htmlFor="email"
                whileHover={{ x: 2 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-6 h-6 text-blue-500" />
                </motion.div>
                Usuario o Correo
              </motion.label>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ingresa tu usuario o correo"
                  required
                  className="w-full p-6 text-lg border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-white shadow-sm hover:shadow-lg hover:border-blue-300"
                />
                {/* Borde animado al focus */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 pointer-events-none"
                  whileHover={{ opacity: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Campo Contraseña con animaciones - Tamaño aumentado 30% */}
            <motion.div 
              className="space-y-3"
              variants={fadeInUp}
            >
              <motion.label 
                className="text-lg font-semibold text-gray-700 flex items-center gap-2" 
                htmlFor="password"
                whileHover={{ x: 2 }}
              >
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Lock className="w-6 h-6 text-blue-500" />
                </motion.div>
                Contraseña
              </motion.label>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full p-6 text-lg border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all pr-16 bg-white shadow-sm hover:shadow-lg hover:border-blue-300"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showPassword ? 'visible' : 'hidden'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
                {/* Borde animado */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 pointer-events-none"
                  whileHover={{ opacity: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Checkbox Recordarme con animación mejorada - Tamaño aumentado 30% */}
            <motion.label 
              className="flex items-center gap-4 cursor-pointer group"
              variants={fadeInUp}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
                whileHover={{ scale: 1.15, boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.85 }}
              >
                <AnimatePresence>
                  {rememberMe && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="text-lg text-gray-600 group-hover:text-blue-600 transition-colors font-medium">
                Recordarme
              </span>
            </motion.label>

            {/* Error con animación mejorada */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-red-50 border-2 border-red-200 rounded-2xl p-4"
                >
                  <motion.p 
                    className="text-lg text-red-600 font-medium flex items-center gap-2"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      ⚠️
                    </motion.span>
                    {error}
                  </motion.p>
                  {attemptsRemaining !== null && attemptsRemaining > 0 && (
                    <motion.p 
                      className="text-xs text-red-500 mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {attemptsRemaining} intento{attemptsRemaining !== 1 ? 's' : ''} restante{attemptsRemaining !== 1 ? 's' : ''} antes del bloqueo
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón Iniciar Sesión con animaciones mejoradas */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-2xl transition-all shadow-lg font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70 relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Efecto shimmer en el botón */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              {loading ? (
                <>
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Iniciando...
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.div>
                  <span className="relative z-10">Iniciar Sesión</span>
                </>
              )}
            </motion.button>

            {/* Botón Registro con animación mejorada */}
            <motion.div 
              className="pt-4 border-t border-gray-200"
              variants={fadeInUp}
            >
              <motion.p 
                className="text-center text-lg text-gray-600 mb-3"
                whileHover={{ color: '#3B82F6' }}
                transition={{ duration: 0.2 }}
              >
                ¿No tienes cuenta?
              </motion.p>
              <motion.button
                type="button"
                onClick={() => setShowRegistroModal(true)}
                className="w-full px-4 py-4 rounded-2xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all shadow-md font-semibold flex items-center justify-center gap-2 bg-white relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 15px 35px -10px rgba(59, 130, 246, 0.35)',
                  borderColor: '#2563EB'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Efecto de brillo al hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/50 to-blue-100/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <UserPlus className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10">Registrar Nuevo Usuario</span>
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Footer con animación mejorada */}
          <motion.p 
            className="text-center text-xs text-slate-400 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ color: '#64748B', scale: 1.02 }}
          >
            © 2025 KAIZEN - Hospital Universitario del Valle
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Pantalla de carga */}
      <LoadingScreen 
        isLoading={showLoadingScreen}
        minDuration={4000}
        onLoadingComplete={() => {
          window.location.href = '/';
        }}
      />

      {/* Modal de Registro */}
      <ModalRegistroUsuario
        open={showRegistroModal}
        onClose={() => setShowRegistroModal(false)}
        onSuccess={() => {
          toast.success('Usuario registrado', 'Ahora puedes iniciar sesión con tus credenciales');
        }}
      />
    </div>
  );
}
