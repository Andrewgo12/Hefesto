import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
 
interface ChromaGridItem {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  borderColor: string;
  gradient: string;
  url: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export default function ChromaGrid({
  items,
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}: ChromaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.chroma-card');
    if (!cards) return;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mousePos.x - cardX, 2) + Math.pow(mousePos.y - cardY, 2)
      );

      const scale = Math.max(1 - (distance / radius) * damping, fadeOut);
      
      gsap.to(card, {
        scale,
        duration: 0.3,
        ease
      });
    });
  }, [mousePos, radius, damping, fadeOut, ease]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-wrap gap-6 justify-center items-center p-8">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="chroma-card block"
        >
          <div
            className="w-64 h-80 rounded-2xl p-1 transition-all duration-300 hover:shadow-2xl"
            style={{
              background: item.gradient,
              border: `2px solid ${item.borderColor}`
            }}
          >
            <div className="bg-slate-900 rounded-xl h-full p-6 flex flex-col items-center justify-between">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-full object-cover border-4"
                style={{ borderColor: item.borderColor }}
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{item.subtitle}</p>
                <p className="text-xs text-slate-500 mt-2">{item.handle}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
