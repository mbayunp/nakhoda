import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import useAuthStore from '../../store/authStore';
import { CONTACT } from '../../utils/contact';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, logout, isAuthenticated } = useAuthStore();
  const loggedIn = isAuthenticated();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'How to Order', path: '/how-to-order' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on route change
  useEffect(() => { closeMenu(); }, [location, closeMenu]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeMenu(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, closeMenu]);

  const handleLogout = async () => {
    closeMenu();
    const { isConfirmed } = await Swal.fire({
      title: 'Logout?',
      text: 'Anda akan keluar dari sistem',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#D4AF37',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
    });
    if (isConfirmed) {
      logout();
      await Swal.fire({ icon: 'success', title: 'Berhasil logout', timer: 1200, showConfirmButton: false });
      navigate('/');
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-soft py-2.5 sm:py-3' 
          : 'bg-transparent py-3 sm:py-5'
      }`}>
        <Container>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo 
              size="md" 
              variant={scrolled ? 'dark' : 'light'} 
              linkToHome={true} 
            />

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'text-primary-dark' 
                      : scrolled ? 'text-gray-600 hover:text-primary-dark hover:bg-primary-light/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}

              {/* WhatsApp CTA */}
              <a 
                href={CONTACT.whatsapp.linkShort} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-2 bg-primary text-secondary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              {/* Auth Button — Desktop */}
              {loggedIn ? (
                <div className="flex items-center gap-1.5 ml-2">
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-2 bg-secondary text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-secondary-light hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all duration-300"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ml-2 inline-flex items-center gap-2 bg-secondary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-secondary-light hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-50 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                scrolled ? 'text-secondary hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Panel */}
      <div className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white z-50 transition-transform duration-300 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <Logo size="md" variant="dark" linkToHome={true} />
            <button 
              className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile links */}
          <nav className="flex-1 overflow-auto px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center text-base font-semibold px-4 py-4 rounded-xl transition-all duration-200 min-h-[52px] ${
                  location.pathname === link.path 
                    ? 'text-primary-dark bg-primary-light/20' 
                    : 'text-gray-700 active:bg-gray-50'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-4 py-5 border-t border-gray-100 space-y-3">
            <a 
              href={CONTACT.whatsapp.linkShort}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-primary text-secondary font-bold py-4 rounded-xl active:bg-primary-dark transition-all duration-300 shadow-md w-full min-h-[52px] text-base"
            >
              <MessageCircle size={20} />
              Chat WhatsApp
            </a>

            {/* Auth Button — Mobile */}
            {loggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-4 rounded-xl active:bg-secondary-light transition-all duration-300 w-full min-h-[52px] text-base"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-4 rounded-xl active:bg-red-100 transition-all duration-300 w-full min-h-[52px] text-base"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-4 rounded-xl active:bg-secondary-light transition-all duration-300 w-full min-h-[52px] text-base"
              >
                <LogIn size={20} />
                Login Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
