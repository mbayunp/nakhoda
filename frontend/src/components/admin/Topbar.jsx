import React, { useState, useEffect } from 'react';
import { LogOut, Bell, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthStore from '../../store/authStore';

const Topbar = ({ collapsed }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Selamat Datang');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Selamat Pagi');
    else if (hour < 15) setGreeting('Selamat Siang');
    else if (hour < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Logout?',
      text: 'Anda akan keluar dari sesi ini',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#f3f4f6',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: '<span style="color: black">Batal</span>',
      customClass: { confirmButton: 'rounded-xl', cancelButton: 'rounded-xl' }
    });
    if (isConfirmed) {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className={`fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-30 flex items-center justify-between px-6 transition-all duration-300 ease-in-out ${collapsed ? 'left-[80px]' : 'left-[260px]'}`}>

      {/* Left section: Greeting & Date */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">{greeting}, {user?.name?.split(' ')[0] || 'Admin'} 👋</h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center gap-4">

        {/* Search (Placeholder) */}
        <div className="hidden md:flex items-center bg-gray-50 text-gray-400 px-3 py-2 rounded-xl border border-gray-100 focus-within:ring-2 focus-within:ring-brand/20 transition-all">
          <Search size={16} />
          <input type="text" placeholder="Cari..." className="bg-transparent border-none outline-none text-sm ml-2 w-32 focus:w-48 transition-all text-gray-700" />
        </div>

        <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-brand hover:text-white transition-all duration-200 border border-gray-100">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand font-bold border border-brand/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
          </div>
          <div className="hidden sm:block text-left mr-2">
            <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || 'Administrator'}</p>
            <p className="text-xs text-gray-400 mt-1">Owner</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 ml-1 border border-red-100 hover:border-red-500"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Topbar;