import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { fadeInUp, viewportConfig } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Componente wrapper que anima elementos cuando entran en el viewport
 */
export function AnimatedSection({ 
  children, 
  variants = fadeInUp, 
  className = '',
  delay = 0,
  once = true
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card animada con hover effects
 */
export function AnimatedCard({ 
  children, 
  className = '',
  onClick
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * Botón animado con efectos
 */
export function AnimatedButton({ 
  children, 
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

/**
 * Badge animado
 */
export function AnimatedBadge({ 
  children, 
  className = '',
  delay = 0
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/**
 * Número contador animado
 */
export function AnimatedNumber({ 
  value, 
  className = '',
  duration = 1
}: { 
  value: number; 
  className?: string;
  duration?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
}

/**
 * Contenedor con stagger children
 */
export function StaggerContainer({ 
  children, 
  className = ''
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item de stagger
 */
export function StaggerItem({ 
  children, 
  className = ''
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
