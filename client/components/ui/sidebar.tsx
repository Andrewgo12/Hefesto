import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiHome, HiInbox, HiViewBoards, HiCog, HiUser, 
  HiUserAdd, HiClipboardList, HiShieldCheck, HiAdjustments,
  HiLockClosed, HiIdentification,
  HiX, HiMenu, HiChevronDown, HiArrowSmRight
} from 'react-icons/hi';

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
      { label: 'Usuario Administrativo', path: '/registro/admin', icon: HiUser },
      { label: 'Usuario Médico', path: '/registro/medico', icon: HiUserAdd },
      { label: 'Mis Solicitudes', path: '/registro/mis-solicitudes', icon: HiClipboardList },
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
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path?: string) =>
    path ? location.pathname === path || location.pathname.startsWith(path + '/') : false;

  return (
    <>
      {/* Toggle mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg hover:scale-110 transition-transform">H</div>
          {isOpen && <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all">HEFESTO</span>}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.label}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
                    ${active ? 'bg-blue-600 shadow-lg text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:shadow-lg'}
                    ${!isOpen && 'justify-center'}
                  `}
                  onClick={() => item.subItems ? toggleMenu(item.label) : item.path && navigate(item.path)}
                  title={!isOpen ? item.label : ''}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : ''} hover:scale-125 transition-transform`} />
                    {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                  </div>
                  {item.subItems && <HiChevronDown className={`w-5 h-5 transform transition-transform ${openMenus[item.label] ? 'rotate-180' : ''}`} />}
                </button>

                {/* Submenu */}
                {item.subItems && (
                  <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ml-6 ${openMenus[item.label] ? 'max-h-96' : 'max-h-0'}`}>
                    {item.subItems.map(sub => {
                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sub.label}
                          onClick={() => sub.path && navigate(sub.path)}
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200
                            ${isActive(sub.path) ? 'bg-blue-500 text-white' : 'hover:bg-slate-700 hover:text-white'}
                          `}
                        >
                          <SubIcon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          <span>{sub.label}</span>
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
        <div className="p-4 border-t border-slate-700">
          <div className={`flex items-center gap-3 mb-3 ${!isOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg hover:scale-110 transition-transform">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'No autenticado'}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900 hover:text-white transition-all duration-300 ${!isOpen && 'justify-center'}`}
            title={!isOpen ? 'Cerrar Sesión' : ''}
          >
            <HiArrowSmRight className="w-5 h-5" />
            {isOpen && <span className="font-medium text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
