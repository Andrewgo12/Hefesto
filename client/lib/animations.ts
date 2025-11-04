import { Variants } from 'framer-motion';

/**
 * Variantes de animación reutilizables para Framer Motion
 */

// Animación de fade in desde abajo
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Animación de fade in desde arriba
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Animación de fade in desde la izquierda
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Animación de fade in desde la derecha
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Animación de escala
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Animación de rotación
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Animación de lista escalonada
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Item de lista escalonada
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Animación de card con hover
export const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  tap: { scale: 0.98 }
};

// Animación de botón
export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' }
  },
  tap: { scale: 0.95 }
};

// Animación de badge/chip
export const badgeAnimation: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
};

// Animación de slide lateral
export const slideIn: Variants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.3 }
  }
};

// Animación de modal
export const modalAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

// Animación de número contador
export const counterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Animación de borde brillante
export const glowBorder = {
  rest: { 
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' 
  },
  hover: { 
    boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 }
  }
};

// Animación de pulso
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Animación de shake (error)
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 }
};

// Animación de éxito (checkmark)
export const successAnimation: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { duration: 0.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 }
    }
  }
};

// Animación de loading spinner
export const spinnerAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear'
  }
};

// Animación de skeleton loading
export const skeletonAnimation = {
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Configuración de viewport para IntersectionObserver
export const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -100px 0px'
};

// Transición suave por defecto
export const smoothTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15
};

// Transición rápida
export const quickTransition = {
  duration: 0.2,
  ease: 'easeInOut'
};

// Transición lenta
export const slowTransition = {
  duration: 0.8,
  ease: 'easeInOut'
};
