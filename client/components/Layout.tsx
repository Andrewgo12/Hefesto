import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Home,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<any>;
  submenu?: Array<{ label: string; href: string }>;
}

const navigationItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  {
    label: "Registro",
    icon: FileText,
    submenu: [
      { label: "Usuario Administrativo", href: "/registro/administrativo" },
      { label: "Usuario Médico", href: "/registro/medico" },
      { label: "Mis Solicitudes", href: "/registro/seguimiento" },
    ],
  },
  {
    label: "Control",
    icon: LayoutDashboard,
    submenu: [
      { label: "Aprobación de Solicitudes", href: "/control/aprobacion" },
      { label: "Gestión de Usuarios", href: "/control/usuarios" },
      { label: "Cambio de Permisos", href: "/control/permisos" },
    ],
  },
  {
    label: "Configuración",
    icon: Settings,
    submenu: [
      { label: "Gestión de Roles", href: "/configuracion/roles" },
      { label: "Credenciales", href: "/configuracion/credenciales" },
      { label: "Parámetros del Sistema", href: "/configuracion/parametros" },
    ],
  },
  {
    label: "Perfil",
    icon: Users,
    submenu: [
      { label: "Información Personal", href: "/perfil/personal" },
      { label: "Registro de Actividad", href: "/perfil/actividad" },
      { label: "Seguridad", href: "/perfil/seguridad" },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>("Registro");
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800",
          sidebarOpen ? "w-56" : "w-20"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                H
              </div>
              <span className="font-semibold text-xs truncate">Hospital</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            title={sidebarOpen ? "Contraer" : "Expandir"}
          >
            {sidebarOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isMainActive = item.href === location.pathname;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenu === item.label;
            const isSubmenuActive = item.submenu?.some(sub => location.pathname.startsWith(sub.href.split('/').slice(0, -1).join('/')));

            if (!hasSubmenu) {
              return (
                <Link
                  key={item.label}
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors truncate text-sm",
                    isMainActive
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                  title={item.label}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => setExpandedMenu(isExpanded ? null : item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
                    isSubmenuActive
                      ? "bg-blue-600/10 text-blue-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                  title={item.label}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="flex-1 truncate text-left">{item.label}</span>}
                  {sidebarOpen && (
                    <ChevronRight
                      size={16}
                      className={cn(
                        "flex-shrink-0 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  )}
                </button>

                {sidebarOpen && isExpanded && hasSubmenu && (
                  <div className="mt-1 ml-2 pl-2 border-l border-slate-700 space-y-0.5">
                    {item.submenu.map((submenu) => {
                      const isSubActive = location.pathname === submenu.href;
                      return (
                        <Link
                          key={submenu.href}
                          to={submenu.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-xs",
                            isSubActive
                              ? "bg-blue-600 text-white font-medium"
                              : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="truncate">{submenu.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-3 space-y-2">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2",
            !sidebarOpen && "justify-center"
          )}>
            <div className="w-7 h-7 bg-slate-700 rounded-full flex-shrink-0" />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@hospital</p>
              </div>
            )}
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors text-sm">
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>Salir</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
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
          {children}
        </div>
      </main>
    </div>
  );
}
