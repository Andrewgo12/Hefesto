import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  HiHome, HiInbox, HiViewBoards, HiCog, HiUser,
  HiUserAdd, HiClipboardList, HiShieldCheck, HiAdjustments,
  HiLockClosed, HiIdentification, HiKey
} from 'react-icons/hi';
import { Menu, X, ChevronRight, LogOut, Sparkles, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePermissions } from '@/hooks/usePermissions';
import logger from '@/lib/logger';

// Estilos CSS para animaciones optimizadas
const sidebarStyles = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .sidebar-item-enter { animation: slideIn 0.2s ease-out forwards; }
  .sidebar-fade { animation: fadeIn 0.3s ease-out forwards; }
  .active-indicator { animation: pulse-subtle 2s ease-in-out infinite; }
  .admin-badge { 
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
`;

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  subItems?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  { label: 'Inicio', icon: HiHome, path: '/' },
  {
    label: 'Registro', icon: HiInbox,
    subItems: [
      { label: 'Usuario Administrativo', path: '/registro/administrativo', icon: HiUser },
      { label: 'Usuario  Asistenciales', path: '/registro/historia-clinica', icon: HiUserAdd },
    ]
  },
  {
    label: 'Control', icon: HiViewBoards,
    subItems: [
      { label: 'Seguimiento por Fases', path: '/control/aprobacion', icon: HiClipboardList },
      { label: 'Gestión de Usuarios', path: '/control/usuarios', icon: HiUserAdd },
      { label: 'Llaves', path: '/control/llaves', icon: HiKey },
      { label: 'Gestión de Roles', path: '/control/permisos', icon: HiShieldCheck },
      { label: 'Indicaciones del Sistema', path: '/control/parametros', icon: HiAdjustments },
      { label: 'Seguridad', path: '/control/seguridad', icon: HiLockClosed },
    ]
  },
  {
    label: 'Perfil', icon: HiUser,
    subItems: [
      { label: 'Información Personal', path: '/perfil/info', icon: HiUser },
      { label: 'Registro de Actividad', path: '/perfil/actividad', icon: HiClipboardList },
      { label: 'Seguridad', path: '/perfil/seguridad', icon: HiLockClosed },
    ]
  },
];

export default function SidebarAdministrador() {
  const navigate = useNavigate();
  const location = useLocation();
  const permissions = usePermissions();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open for desktop
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Restore sidebar state
    const savedOpen = localStorage.getItem('sidebar_open');
    if (savedOpen !== null) setSidebarOpen(savedOpen === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar_open', String(sidebarOpen));
  }, [sidebarOpen]);

  // Filtrar items del sidebar según permisos
  const filteredSidebarItems = useMemo(() => {
    return sidebarItems.map(item => {
      if (item.label === 'Control' && !item.subItems) return item;

      if (item.label === 'Control' && item.subItems) {
        const filteredSubItems = item.subItems.filter(subItem => {
          // Permisos para Gestión de Usuarios
          if (subItem.label === 'Gestión de Usuarios') {
            return permissions.canAccessGestionUsuarios;
          }
          // Permisos para Seguimiento (Aprobación)
          if (subItem.label === 'Seguimiento por Fases') {
            return permissions.canAccessAprobacion;
          }
          // Permisos para Configuración (ahora en Control)
          if (['Llaves', 'Gestión de Roles', 'Parámetros del Sistema', 'Seguridad'].includes(subItem.label)) {
            return permissions.canAccessConfiguracion;
          }
          return true;
        });
        return filteredSubItems.length > 0 ? { ...item, subItems: filteredSubItems } : null;
      }

      return item;
    }).filter(Boolean) as SidebarItem[];
  }, [permissions]);

  const handleLogout = async () => {
    try {
      const { auth } = await import('@/lib/api');
      await auth.logout().catch(() => { });
    } catch (error) {
      logger.error('Error al cerrar sesión', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      navigate('/login');
    }
  };

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside
        className={cn(
          "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white flex flex-col border-r border-slate-800/50 flex-shrink-0 h-screen sticky top-0 shadow-2xl",
          "transition-all duration-300 ease-out",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
      {/* Header con gradiente premium */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/50 h-16 bg-gradient-to-r from-slate-900 to-slate-800/30">
        {sidebarOpen && (
          <div className="flex items-center gap-3 sidebar-fade">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-white to-slate-100 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden ring-2 ring-white/10">
                <img src="/image.png" alt="HUV Logo" className="w-7 h-7 object-contain" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 admin-badge rounded-full flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">KAIZEN</span>
              <span className="text-[10px] text-blue-400 -mt-1 font-medium">Administrador</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "p-2.5 hover:bg-slate-800/80 rounded-xl transition-all duration-200 text-slate-400 hover:text-white hover:scale-105 active:scale-95",
            !sidebarOpen && "mx-auto"
          )}
          title={sidebarOpen ? "Contraer" : "Expandir"}
        >
          <div className={cn("transition-transform duration-300", !sidebarOpen && "rotate-180")}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </div>

      {/* Navigation con scroll suave */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar scroll-smooth">
        {filteredSidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path ? location.pathname === item.path || location.pathname.startsWith(item.path + '/') : false;
          const hasSubmenu = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenu === item.label;
          const isSubmenuActive = item.subItems?.some(sub => sub.path && location.pathname.startsWith(sub.path));

          if (!hasSubmenu) {
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (!sidebarOpen) setSidebarOpen(true);
                  if (item.path) navigate(item.path);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30 font-medium"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100 hover:translate-x-1"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full active-indicator" />}
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"
                )} />
                {sidebarOpen && <span className="truncate text-sm sidebar-item-enter">{item.label}</span>}

                {!sidebarOpen && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 pointer-events-none border border-slate-700/50 shadow-xl backdrop-blur-sm">
                    {item.label}
                  </div>
                )}
              </button>
            );
          }

          return (
            <div key={item.label} className="space-y-1">
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 group relative",
                  isSubmenuActive
                    ? "bg-slate-800/60 text-blue-400 font-medium shadow-inner"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                  isSubmenuActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"
                )} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 truncate text-left text-sm">{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "flex-shrink-0 transition-transform duration-300 ease-out",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </>
                )}
              </button>

              {sidebarOpen && isExpanded && hasSubmenu && (
                <div className="mt-1.5 ml-4 pl-4 border-l-2 border-slate-700/50 space-y-1 sidebar-fade">
                  {item.subItems!.map((sub, index) => {
                    const isSubActive = sub.path ? location.pathname === sub.path : false;
                    const SubIcon = sub.icon;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-sm group/sub",
                          isSubActive
                            ? "bg-blue-500/15 text-blue-400 font-medium border-l-2 border-blue-400 -ml-[2px] pl-[14px]"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:translate-x-1"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {SubIcon && <SubIcon className={cn(
                          "w-4 h-4 flex-shrink-0 transition-transform duration-200",
                          "group-hover/sub:scale-110"
                        )} />}
                        <span className="truncate">{sub.label}</span>
                        {isSubActive && <Sparkles className="w-3 h-3 text-blue-400 ml-auto" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer con glassmorphism premium */}
      <div className="border-t border-slate-800/50 p-4 space-y-2 bg-gradient-to-t from-slate-950 to-transparent">
        <button
          onClick={() => navigate('/perfil/personal')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-800/70 transition-all duration-200 group",
            !sidebarOpen && "justify-center"
          )}
          title="Ver mi perfil"
        >
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-purple-400/20 group-hover:ring-purple-400/40 transition-all group-hover:scale-105">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 admin-badge rounded-full" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0 text-left sidebar-fade">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate text-white group-hover:text-blue-400 transition-colors">{user?.name || 'Admin'}</p>
                <Shield className="w-3 h-3 text-purple-400" />
              </div>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'Administrador'}</p>
            </div>
          )}
        </button>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group border border-transparent hover:border-red-500/20",
            !sidebarOpen && "justify-center"
          )}
          title="Cerrar Sesión"
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:scale-110 group-hover:-translate-x-0.5 transition-transform duration-200" />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
    </>
  );
}
