import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Share2, ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { CONTACT } from '../../utils/contact';

const Footer = () => {
  return (
    <footer className="relative bg-secondary text-white overflow-hidden">
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mb-10 sm:mb-16">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
              <Logo size="lg" variant="light" linkToHome={true} />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Mitra produksi pakaian berkualitas, tepat waktu, dan terpercaya di Bandung.
              </p>
              <div className="flex gap-2.5 sm:gap-3 pt-1">
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300" aria-label="Website">
                  <Globe size={16} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300" aria-label="Share">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-primary mb-4 sm:mb-6">Quick Links</h4>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'How to Order', path: '/how-to-order' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="group flex items-center gap-2 text-gray-300 hover:text-primary transition-colors duration-300 text-sm py-0.5">
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="hidden sm:block">
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-primary mb-4 sm:mb-6">Layanan</h4>
              <ul className="space-y-3 sm:space-y-4">
                {['Kemeja PDH/PDL', 'Kaos & Polo', 'Jaket & Hoodie', 'Seragam Pabrik', 'Merchandise'].map((service) => (
                  <li key={service} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-primary mb-4 sm:mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3 sm:gap-4 text-sm">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="text-gray-300 leading-relaxed text-sm">{CONTACT.address.short}</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 text-sm">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <span className="text-gray-300">{CONTACT.phone.display}</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 text-sm">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm break-all">{CONTACT.email}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">&copy; {new Date().getFullYear()} CV. Nakhoda Nusantara Grup. All rights reserved.</p>
            <div className="flex gap-6 sm:gap-8">
              <Link to="#" className="text-gray-500 hover:text-primary transition-colors duration-300 text-xs sm:text-sm">Privacy</Link>
              <Link to="#" className="text-gray-500 hover:text-primary transition-colors duration-300 text-xs sm:text-sm">Terms</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
