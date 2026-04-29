import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Factory, Package, Wallet, Users, Image, ChevronLeft, ChevronRight } from 'lucide-react';

// Import logo dari folder assets
import logoNakhoda from '../../assets/logonakhoda.jpg';

const menu = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { label: 'Production', path: '/admin/production', icon: Factory },
  { label: 'Inventory', path: '/admin/inventory', icon: Package },
  { label: 'Finance', path: '/admin/finance', icon: Wallet },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Portfolio', path: '/admin/portfolio', icon: Image },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gray-900 text-gray-300 z-40 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-800 ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}>

      {/* Brand Header */}
      <div className={`flex items-center h-20 border-b border-gray-800 px-5 transition-all ${collapsed ? 'justify-center' : 'gap-3'}`}>
        {/* Menggunakan Logo Gambar */}
        <img
          src={logoNakhoda}
          alt="Logo Nakhoda Nusantara"
          className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-lg shadow-black/20 border border-gray-700 bg-white"
        />

        {!collapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="font-bold text-sm text-white tracking-wide leading-tight">NAKHODA</span>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">System</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                  ? 'bg-brand/10 text-brand'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              {/* Active Indicator Line */}
              {isActive && collapsed && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand rounded-r-full" />}

              <Icon size={20} className={`shrink-0 transition-colors ${isActive ? 'text-brand' : 'text-gray-400 group-hover:text-white'}`} />

              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full h-10 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;