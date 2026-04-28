import React from 'react';
import { LogOut, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthStore from '../../store/authStore';

const Topbar = ({ collapsed }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({ title: 'Logout?', text: 'Anda akan keluar dari sistem', icon: 'question', showCancelButton: true, confirmButtonColor: '#D4AF37', confirmButtonText: 'Ya, Logout', cancelButtonText: 'Batal' });
    if (isConfirmed) {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-100 z-30 flex items-center justify-between px-6 transition-all duration-300 ${collapsed ? 'left-[72px]' : 'left-[250px]'}`}>
      <div>
        <h2 className="text-sm font-bold text-gray-800">Selamat Datang 👋</h2>
        <p className="text-xs text-gray-400">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand"><User size={16} /></div>
          <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user?.name || 'Admin'}</span>
        </div>
        <button onClick={handleLogout} className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition" title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
