import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiHome, HiInbox, HiViewBoards, HiCog, HiUser, 
  HiUserAdd, HiClipboardList, HiShieldCheck, HiAdjustments,
  HiLockClosed, HiIdentification,
  HiX, HiMenu, HiChevronDown, HiArrowSmRight
} from 'react-icons/hi';
import { usePermissions } from '@/hooks/usePermissions';

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
      { label: 'Usuario Médico', path: '/registro/historia-clinica', icon: HiUserAdd },
    ]
  },
  { 
    label: 'Control', icon: HiViewBoards,
    subItems: [
      { label: 'Aprobación de Solicitudes', path: '/control/aprobacion', icon: HiClipboardList },
      { label: 'Gestión de Usuarios', path: '/control/usuarios', icon: HiUserAdd },
      { label: 'Cambio de Permisos', path: '/control/permisos', icon: HiShieldCheck },
    ]
  },
  { 
    label: 'Configuración', icon: HiCog,
    subItems: [
      { label: 'Gestión de Roles', path: '/configuracion/roles', icon: HiShieldCheck },
      { label: 'Credenciales', path: '/configuracion/credenciales', icon: HiIdentification },
      { label: 'Parámetros del Sistema', path: '/configuracion/parametros', icon: HiAdjustments },
      { label: 'Seguridad', path: '/configuracion/seguridad', icon: HiLockClosed },
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

export default function AdvancedSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const permissions = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  // Filtrar items del sidebar según permisos
  const filteredSidebarItems = useMemo(() => {
    return sidebarItems.map(item => {
      // Filtrar Control
      if (item.label === 'Control' && item.subItems) {
        const filteredSubItems = item.subItems.filter(subItem => {
          if (subItem.label === 'Gestión de Usuarios' || subItem.label === 'Cambio de Permisos') {
            return permissions.canAccessGestionUsuarios;
          }
          if (subItem.label === 'Aprobación de Solicitudes') {
            return permissions.canAccessAprobacion;
          }
          return true;
        });
        return filteredSubItems.length > 0 ? { ...item, subItems: filteredSubItems } : null;
      }
      
      // Filtrar Configuración - Solo Admin
      if (item.label === 'Configuración') {
        return permissions.canAccessConfiguracion ? item : null;
      }
      
      return item;
    }).filter(Boolean) as SidebarItem[];
  }, [permissions]);


  const handleLogout = async () => {
    try {
      // Intentar cerrar sesión en el backend
      const { auth } = await import('@/lib/api');
      await auth.logout().catch(() => {
        // Ignorar errores del backend, continuar con logout local
      });
    } catch (error) {
      console.log('Error al cerrar sesión en backend:', error);
    } finally {
      // Limpiar datos locales siempre
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      navigate('/login');
    }
  };

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const openFromIcon = (label: string, hasSubItems: boolean) => {
    setIsOpen(true);
    if (hasSubItems) {
      setOpenMenus(prev => ({ ...prev, [label]: true }));
    }
  };

  const isActive = (path?: string) =>
    path ? location.pathname === path || location.pathname.startsWith(path + '/') : false;

  return (
    <>
      {/* Toggle mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-[#006837] text-white p-2 rounded-xl shadow-lg hover:brightness-110 transition"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Rail (visible cuando está cerrado) */}
      {!isOpen && (
        <div className="fixed left-0 top-0 h-full w-16 z-40 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white list-none [&_*]:list-none [&_*]:marker:hidden border-r border-slate-700 shadow-2xl">
          <div className="p-3 flex flex-col items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#006837] to-[#004d28] rounded-lg flex items-center justify-center font-bold shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">H</div>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <nav className="flex-1 flex flex-col items-center gap-2">
              {filteredSidebarItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`rail-${item.label}`}
                    onClick={() => openFromIcon(item.label, !!item.subItems)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-[#006837] hover:to-[#004d28] text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group relative"
                    title={item.label}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl w-64 transform transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'} list-none [&_*]:list-none [&_*]:marker:hidden backdrop-blur-sm`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-700/50 flex items-center gap-3 bg-gradient-to-r from-slate-900/50 to-transparent">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden">
            <img src="/image.png" alt="HUV Logo" className="w-10 h-10 object-contain" />
          </div>
          <span className="font-bold text-xl text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">KAIZEN</span>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto list-none [&_*]:list-none [&_*]:marker:hidden">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.label} className="group">
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                    ${active 
                      ? 'bg-gradient-to-r from-[#006837] to-[#007d42] text-white shadow-lg shadow-green-900/50' 
                      : 'text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:text-white hover:shadow-lg hover:scale-105'}
                  `}
                  onClick={() => item.subItems ? toggleMenu(item.label) : item.path && navigate(item.path)}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'text-white scale-110' : 'text-slate-300 group-hover:scale-110 group-hover:rotate-12'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.subItems && <HiChevronDown className={`w-5 h-5 transform transition-all duration-300 ${openMenus[item.label] ? 'rotate-180' : ''} group-hover:scale-110`} />}
                  {!active && <div className="absolute inset-0 bg-gradient-to-r from-[#006837]/0 to-[#006837]/0 group-hover:from-[#006837]/10 group-hover:to-[#007d42]/10 transition-all duration-300" />}
                </button>

                {/* Submenu */}
                {item.subItems && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ml-6 ${openMenus[item.label] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} list-none marker:hidden`}>
                    {item.subItems.map((sub, idx) => {
                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sub.label}
                          onClick={() => sub.path && navigate(sub.path)}
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 appearance-none group/sub relative overflow-hidden
                            ${isActive(sub.path) 
                              ? 'bg-gradient-to-r from-[#006837] to-[#007d42] text-white shadow-md' 
                              : 'text-slate-300 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:text-white hover:translate-x-1'}
                          `}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <SubIcon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isActive(sub.path) ? 'text-white scale-110' : 'text-gray-300 group-hover/sub:scale-110 group-hover/sub:rotate-12'}`} />
                          <span className="leading-none">{sub.label}</span>
                          {!isActive(sub.path) && <div className="absolute inset-0 bg-gradient-to-r from-[#006837]/0 to-[#006837]/0 group-hover/sub:from-[#006837]/5 group-hover/sub:to-[#007d42]/5 transition-all duration-300" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-transparent">
          <div className={`flex items-center gap-3 mb-3 ${!isOpen && 'justify-center'} group/user`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer animate-pulse hover:animate-none ring-2 ring-purple-500/30 hover:ring-purple-400">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0 group-hover/user:translate-x-1 transition-transform duration-300">
                <p className="font-semibold text-sm truncate bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-slate-400 truncate group-hover/user:text-slate-300 transition-colors">{user?.email || 'No autenticado'}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 hover:from-red-900 hover:to-red-800 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50 group/logout ${!isOpen && 'justify-center'}`}
            title={!isOpen ? 'Cerrar Sesión' : ''}
          >
            <HiArrowSmRight className="w-5 h-5 group-hover/logout:translate-x-1 transition-transform duration-300" />
            {isOpen && <span className="font-medium text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
