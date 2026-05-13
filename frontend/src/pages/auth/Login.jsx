import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuthStore from '../../store/authStore';

// Import logo dari folder assets
// Sesuaikan jumlah '../' dengan struktur folder tempat file Login ini berada
import logoNakhoda from '../../assets/logonakhoda.jpg';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      await Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat datang di Nakhoda System',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/admin/dashboard');
    } else {
      Swal.fire({ icon: 'error', title: 'Login Gagal', text: result.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8 relative overflow-hidden">
      {/* Background Decor (Glow Effects) */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-[2rem] shadow-2xl overflow-hidden bg-white relative z-10 border border-gray-100">

        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden md:flex md:w-5/12 bg-gray-900 p-12 flex-col justify-between relative overflow-hidden">
          {/* Abstract background pattern for the dark side */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

          <div className="relative z-10">
            <img
              src={logoNakhoda}
              alt="Logo Nakhoda Nusantara"
              className="w-16 h-16 rounded-xl shadow-lg mb-6 border border-gray-700 object-cover"
            />
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Nakhoda System</h1>
            <p className="text-gray-400 font-medium">Integrated Management Dashboard</p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-gray-300 text-sm leading-relaxed">
                "Sistem digitalisasi terpadu untuk memantau alur produksi konfeksi, inventaris bahan baku, dan laporan keuangan secara real-time."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          {/* Mobile Branding (Only visible on small screens) */}
          <div className="md:hidden text-center mb-8">
            <img
              src={logoNakhoda}
              alt="Logo Nakhoda Nusantara"
              className="w-16 h-16 rounded-xl shadow-md mx-auto mb-4 object-cover border border-gray-100"
            />
            <h1 className="text-2xl font-bold text-gray-900">Nakhoda System</h1>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Selamat Datang 👋</h2>
            <p className="text-gray-500">Silakan masukkan kredensial untuk mengakses panel admin.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Akses</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all text-sm text-gray-800"
                placeholder="admin@nakhoda.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all text-sm text-gray-800 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg shadow-brand/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
                {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Belum memiliki akses? <Link to="/register" className="text-brand font-semibold hover:underline transition-all">Hubungi Owner</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;