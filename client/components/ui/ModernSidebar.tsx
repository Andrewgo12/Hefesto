import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiChartPie, 
  HiViewBoards, 
  HiInbox, 
  HiUser, 
  HiShoppingBag, 
  HiArrowSmRight,
  HiCog,
  HiMenu,
  HiX
} from 'react-icons/hi';

interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: HiChartPie, path: '/' },
  { label: 'Solicitudes', icon: HiViewBoards, path: '/control/aprobacion' },
  { label: 'Registro Admin', icon: HiInbox, path: '/registro/administrativo' },
  { label: 'Registro Médico', icon: HiUser, path: '/registro/historia-clinica' },
  { label: 'Configuración', icon: HiCog, path: '/configuracion/roles' },
];

export default function ModernSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-40 shadow-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'w-64' : 'lg:w-20'}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            H
          </div>
          {isOpen && (
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HEFESTO
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-2 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }
                  ${!isOpen && 'justify-center'}
                `}
                title={!isOpen ? item.label : ''}
              >
                <Icon className={`flex-shrink-0 w-5 h-5 ${active ? 'text-white' : ''}`} />
                {isOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {isOpen && item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 mb-3 ${!isOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'No autenticado'}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900 hover:text-white transition-all duration-200
              ${!isOpen && 'justify-center'}
            `}
            title={!isOpen ? 'Cerrar Sesión' : ''}
          >
            <HiArrowSmRight className="flex-shrink-0 w-5 h-5" />
            {isOpen && <span className="font-medium text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
