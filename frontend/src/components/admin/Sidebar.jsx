import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Factory, Package, Wallet, Users, Image, ChevronLeft, ChevronRight } from 'lucide-react';

const menu = [
  { label: 'Dashboard',  path: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Orders',     path: '/admin/orders',      icon: ShoppingCart },
  { label: 'Production', path: '/admin/production',  icon: Factory },
  { label: 'Inventory',  path: '/admin/inventory',   icon: Package },
  { label: 'Finance',    path: '/admin/finance',     icon: Wallet },
  { label: 'Customers',  path: '/admin/customers',   icon: Users },
  { label: 'Portfolio',  path: '/admin/portfolio',   icon: Image },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar text-white z-40 flex flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[250px]'}`}>
      {/* Brand */}
      <div className={`flex items-center h-16 border-b border-white/5 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white font-extrabold text-sm shrink-0">N</div>
        {!collapsed && <span className="font-bold text-sm tracking-wide whitespace-nowrap">NAKHODA SYSTEM</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? 'bg-brand text-white shadow-md shadow-brand/30' : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'} ${collapsed ? 'justify-center' : ''}`}>
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button onClick={onToggle} className="flex items-center justify-center h-12 border-t border-white/5 text-gray-500 hover:text-white transition">
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
};

export default Sidebar;
