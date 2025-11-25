import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageTransition from "./PageTransition";
import SidebarUsuarios from "./ui/sidebarusuarios";
import logger from '@/lib/logger';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  logger.info('Layoutusuarios.tsx LOADED');

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Modular Sidebar */}
      <SidebarUsuarios />

      {/* Main content - Added margin-left to account for the fixed sidebar rail (w-16) */}
      <main className="flex-1 flex flex-col overflow-hidden ml-16 transition-all duration-300">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900 ml-4">
            Sistema de Gestión de Usuarios
          </h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Opciones">
              <ChevronDown size={18} className="text-slate-600" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <PageTransition className="h-full p-4 md:p-6">
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
