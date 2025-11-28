import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
  minDuration?: number;
}

// Generar partículas una sola vez con valores fijos
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: (i % 5) + 3,
    left: ((i * 17) % 100),
    top: ((i * 23) % 100),
    opacity: 0.2 + (i % 4) * 0.1,
    yMove: -100 - (i % 50),
    xMove: ((i % 40) - 20),
    duration: 6 + (i % 6),
    delay: (i % 3) * 0.5,
  }));
};

const particles = generateParticles(40);

export default function LoadingScreen({ 
  isLoading, 
  onLoadingComplete,
  minDuration = 4500 
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(isLoading);
  const [loadingText, setLoadingText] = useState('Iniciando sesión...');
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Textos de carga rotativos
  const loadingTexts = useMemo(() => [
    'Iniciando sesión...',
    'Conectando con el servidor...',
    'Cargando solicitudes...',
    'Preparando módulos...',
    'Sincronizando datos...',
    'Casi listo...',
  ], []);

  useEffect(() => {
    if (isLoading) {
      setShowScreen(true);
      setProgress(0);
      setVideoError(false);
      
      // Reproducir video con reintentos
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch((err) => {
            console.log('Video autoplay blocked, showing fallback');
            setVideoError(true);
          });
        }
      };
      
      // Intentar reproducir inmediatamente y después de un pequeño delay
      playVideo();
      const videoRetry = setTimeout(playVideo, 100);

      // Cambiar texto de carga cada cierto tiempo
      let textIndex = 0;
      const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        setLoadingText(loadingTexts[textIndex]);
      }, 800);
      
      // Simular progreso más lento
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Progreso más gradual
          const increment = prev < 20 ? 4 : prev < 50 ? 3 : prev < 80 ? 2 : 1;
          return Math.min(prev + increment, 100);
        });
      }, minDuration / 40);

      // Duración mínima
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setShowScreen(false);
          onLoadingComplete?.();
        }, 600);
      }, minDuration);

      return () => {
        clearInterval(progressInterval);
        clearInterval(textInterval);
        clearTimeout(timer);
        clearTimeout(videoRetry);
      };
    }
  }, [isLoading, minDuration, onLoadingComplete, loadingTexts]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #1e40af 60%, #1e3a5f 100%)' 
          }}
        >
          {/* Partículas de fondo con valores fijos */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: `rgba(147, 197, 253, ${p.opacity})`,
                }}
                animate={{
                  y: [0, p.yMove, 0],
                  x: [0, p.xMove, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Círculos decorativos */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full opacity-10"
            style={{ 
              background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)',
              top: '-25%',
              left: '-15%',
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-15"
            style={{ 
              background: 'radial-gradient(circle, rgba(96,165,250,0.5) 0%, transparent 60%)',
              bottom: '-15%',
              right: '-10%',
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Contenido principal */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
            
            {/* Video del logo animado */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="relative"
            >
              {/* Anillo exterior giratorio */}
              <motion.div
                className="absolute rounded-full border-4 border-blue-400/30"
                style={{ 
                  width: 320, 
                  height: 320, 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute rounded-full border-2 border-t-blue-300 border-r-transparent border-b-transparent border-l-blue-300/50"
                style={{ 
                  width: 340, 
                  height: 340, 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute rounded-full border-2 border-t-transparent border-r-blue-400/60 border-b-blue-400/30 border-l-transparent"
                style={{ 
                  width: 360, 
                  height: 360, 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Contenedor del video con efecto de glow */}
              <motion.div
                className="w-[280px] h-[280px] rounded-full flex items-center justify-center overflow-hidden relative"
                style={{
                  background: 'linear-gradient(145deg, rgba(30,58,95,0.9), rgba(15,23,42,0.95))',
                  boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 30px rgba(0,0,0,0.3)',
                }}
                animate={{ 
                  boxShadow: [
                    '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 30px rgba(0,0,0,0.3)',
                    '0 0 80px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(0,0,0,0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 30px rgba(0,0,0,0.3)',
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {/* Video del logo animado */}
                <video
                  ref={videoRef}
                  src="/logoanimado.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoError(true)}
                  className={`w-[240px] h-[240px] object-contain rounded-full ${videoError ? 'hidden' : ''}`}
                  style={{ 
                    filter: 'brightness(1.1) contrast(1.05)',
                  }}
                />
                
                {/* Fallback: Logo estático con animación si el video falla */}
                {videoError && (
                  <motion.div
                    className="w-[220px] h-[220px] bg-white rounded-full flex items-center justify-center overflow-hidden"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.img
                      src="/Documentos/LOGOaGREMIADO.jpeg"
                      alt="KAIZEN Logo"
                      className="w-full h-full object-contain p-3"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
                
                {/* Overlay de brillo */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Título KAIZEN */}
            <motion.div className="text-center mt-4">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-white tracking-[0.3em] mb-2"
                style={{ textShadow: '0 0 30px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.4)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {"KAIZEN".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4 + i * 0.08,
                      type: 'spring',
                      stiffness: 120,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-blue-300/80 text-base font-light tracking-widest"
              >
                HOSPITAL UNIVERSITARIO DEL VALLE
              </motion.p>
            </motion.div>

            {/* Barra de progreso mejorada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-80 md:w-96 mt-6"
            >
              <div className="relative h-2 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-blue-500/20">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd, #60a5fa, #3b82f6)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{ 
                    width: { duration: 0.3 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
                  }}
                />
                {/* Efecto de brillo */}
                <motion.div
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '500%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
              </div>
              
              {/* Info de progreso */}
              <div className="flex justify-between items-center mt-3">
                <motion.span 
                  className="text-blue-200/70 text-sm font-medium"
                  key={loadingText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  {loadingText}
                </motion.span>
                <motion.span 
                  className="text-white font-bold text-sm tabular-nums"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Indicador de puntos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 mt-2"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: ['#60a5fa', '#93c5fd', '#60a5fa'],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Línea decorativa inferior */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/0 via-blue-400/60 to-blue-600/0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 text-blue-300/40 text-xs tracking-wide"
          >
            © 2025 KAIZEN - Gestión de Historias Clínicas
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
