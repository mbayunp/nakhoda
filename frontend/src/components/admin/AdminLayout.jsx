import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800 selection:bg-brand/30">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Topbar collapsed={collapsed} />

      <main className={`pt-20 pb-10 min-h-screen transition-all duration-300 ease-in-out ${collapsed ? 'ml-[80px]' : 'ml-[260px]'}`}>
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;