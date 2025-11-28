import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Shield } from "lucide-react";
import PageTransition from "./PageTransition";
import SidebarAdministrador from "./ui/sidebarAdministrador";
import logger from '@/lib/logger';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  logger.info('Layoutadministrador.tsx LOADED');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-purple-50/20">
      {/* Modular Sidebar */}
      <SidebarAdministrador />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        {/* Top bar premium para admin */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Panel Administrativo
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                  <Shield className="w-3 h-3" />
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-500 capitalize">{formatDate(currentTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notificaciones */}
            <button className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all duration-200" title="Notificaciones">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Content con fondo premium */}
        <div className="flex-1 overflow-auto">
          <PageTransition className="h-full p-4 md:p-6">
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
