import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              elements,
              from,
              {
                ...to,
                duration,
                ease,
                stagger: delay / 1000,
                onComplete: () => {
                  onLetterAnimationComplete?.();
                }
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="split-item inline-block" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-item inline-block mr-2">
          {word}
        </span>
      ));
    } else {
      return text.split('\n').map((line, i) => (
        <div key={i} className="split-item">
          {line}
        </div>
      ));
    }
  };

  return (
    <div ref={containerRef} className={`${className}`} style={{ textAlign }}>
      {splitText()}
    </div>
  );
}
