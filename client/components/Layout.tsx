import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HiUser as HiUserIcon, HiUserAdd as HiUserAddIcon, HiClipboardList as HiClipboardListIcon,
  HiShieldCheck as HiShieldCheckIcon, HiIdentification as HiIdentificationIcon,
  HiAdjustments as HiAdjustmentsIcon, HiLockClosed as HiLockClosedIcon
} from 'react-icons/hi';
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
  submenu?: Array<{ label: string; href: string; icon?: React.ComponentType<any> }>;
}

const navigationItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  {
    label: "Registro",
    icon: FileText,
    submenu: [
      { label: "Usuario Administrativo", href: "/registro/administrativo", icon: HiUserIcon },
      { label: "Usuario Médico", href: "/registro/historia-clinica", icon: HiUserAddIcon },
      { label: "Solicitud de Proceso", href: "/registro/proceso", icon: HiClipboardListIcon },
    ],
  },
  {
    label: "Control",
    icon: LayoutDashboard,
    submenu: [
      { label: "Aprobación de Solicitudes", href: "/control/aprobacion", icon: HiClipboardListIcon },
      { label: "Gestión de Usuarios", href: "/control/usuarios", icon: HiUserAddIcon },
      { label: "Cambio de Permisos", href: "/control/permisos", icon: HiShieldCheckIcon },
    ],
  },
  {
    label: "Configuración",
    icon: Settings,
    submenu: [
      { label: "Movimientos del Sistema", href: "/configuracion/movimientos", icon: HiAdjustmentsIcon },
    ],
  },
  {
    label: "Perfil",
    icon: Users,
    submenu: [
      { label: "Información Personal", href: "/perfil/personal", icon: HiUserIcon },
      { label: "Registro de Actividad", href: "/perfil/actividad", icon: HiClipboardListIcon },
      { label: "Seguridad", href: "/perfil/seguridad", icon: HiLockClosedIcon },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Cargar estado persistido del sidebar
  useEffect(() => {
    try {
      const savedOpen = localStorage.getItem('layout_sidebar_open');
      const savedExpanded = localStorage.getItem('layout_expanded_menu');
      if (savedOpen !== null) setSidebarOpen(savedOpen === 'true');
      if (savedExpanded !== null) setExpandedMenu(savedExpanded || null);
    } catch {}
  }, []);

  // Guardar estado al cambiar
  useEffect(() => {
    try {
      localStorage.setItem('layout_sidebar_open', String(sidebarOpen));
      localStorage.setItem('layout_expanded_menu', expandedMenu || '');
    } catch {}
  }, [sidebarOpen, expandedMenu]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

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
                <button
                  key={item.label}
                  onClick={() => {
                    if (!sidebarOpen) {
                      setSidebarOpen(true);
                    } else if (item.href) {
                      navigate(item.href);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors truncate text-sm text-left",
                    isMainActive
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                  title={item.label}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (!sidebarOpen) {
                      setSidebarOpen(true);
                      setExpandedMenu(item.label);
                    } else {
                      setExpandedMenu(isExpanded ? null : item.label);
                    }
                  }}
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
                      const SubIcon = submenu.icon;
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
                          {SubIcon && <SubIcon size={14} className="flex-shrink-0" />}
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
          <button
            onClick={() => navigate('/perfil/personal')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors",
              !sidebarOpen && "justify-center"
            )}
            title="Ver mi perfil"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-medium truncate text-white">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@hefesto.local'}</p>
              </div>
            )}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-red-900 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>Cerrar Sesión</span>}
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
