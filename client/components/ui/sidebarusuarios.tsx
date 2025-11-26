import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  HiHome, HiInbox, HiViewBoards, HiUser,
  HiUserAdd, HiClipboardList, HiLockClosed
} from 'react-icons/hi';
import { Menu, X, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  subItems?: SidebarItem[];
}

// Menú para USUARIOS NORMALES - Sin Configuración ni Gestión de Usuarios
const sidebarItems: SidebarItem[] = [
  { label: 'Inicio', icon: HiHome, path: '/' },
  {
    label: 'Registro', icon: HiInbox,
    subItems: [
      { label: 'Usuario Administrativo', path: '/registro/administrativo', icon: HiUser },
      { label: 'Usuario Asistencial', path: '/registro/historia-clinica', icon: HiUserAdd },
    ]
  },
  {
    label: 'Control', icon: HiViewBoards,
    subItems: [
      { label: 'Seguimiento por Fases', path: '/control/aprobacion', icon: HiClipboardList },
      // Usuarios normales SOLO ven Aprobación (para ver estado de sus solicitudes)
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

export default function SidebarUsuarios() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleLogout = async () => {
    try {
      const { auth } = await import('@/lib/api');
      await auth.logout().catch(() => { });
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      navigate('/login');
    }
  };

  return (
    <aside
      className={cn(
        "bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800 flex-shrink-0 h-screen sticky top-0",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {sidebarOpen && (
          <div className="flex items-center gap-2 animate-in fade-in duration-300">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-900/20">
              H
            </div>
            <span className="font-bold text-lg tracking-tight">HEFESTO</span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white",
            !sidebarOpen && "mx-auto"
          )}
          title={sidebarOpen ? "Contraer" : "Expandir"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {sidebarItems.map((item) => {
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 font-medium"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200")} />
                {sidebarOpen && <span className="truncate text-sm">{item.label}</span>}

                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-slate-700 shadow-xl">
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isSubmenuActive
                    ? "bg-slate-800/50 text-blue-400 font-medium"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isSubmenuActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200")} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 truncate text-left text-sm">{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={cn(
                        "flex-shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </>
                )}
              </button>

              {sidebarOpen && isExpanded && hasSubmenu && (
                <div className="mt-1 ml-4 pl-4 border-l border-slate-700 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.subItems!.map((sub) => {
                    const isSubActive = sub.path ? location.pathname === sub.path : false;
                    const SubIcon = sub.icon;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
                          isSubActive
                            ? "bg-blue-600/10 text-blue-400 font-medium"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                        )}
                      >
                        {SubIcon && <SubIcon className="w-4 h-4 flex-shrink-0" />}
                        <span className="truncate">{sub.label}</span>
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
      <div className="border-t border-slate-800 p-4 space-y-2 bg-slate-900/50">
        <button
          onClick={() => navigate('/perfil/personal')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors group",
            !sidebarOpen && "justify-center"
          )}
          title="Ver mi perfil"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-lg ring-2 ring-slate-800 group-hover:ring-slate-700 transition-all">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium truncate text-white group-hover:text-blue-400 transition-colors">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'No autenticado'}</p>
            </div>
          )}
        </button>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 group",
            !sidebarOpen && "justify-center"
          )}
          title="Cerrar Sesión"
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}
