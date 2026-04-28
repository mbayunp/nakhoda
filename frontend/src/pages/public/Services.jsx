import React, { useState } from 'react';
import { Layers, Users, Gift, Download, CheckCircle, ArrowRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import CTASection from '../../components/common/CTASection';
import heroBg from '../../assets/hero_bg.png';
import { showSuccess } from '../../utils/alert';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleDownload = (e) => {
    e.preventDefault();
    showSuccess('Katalog PDF sedang diunduh!');
  };

  const categories = [
    {
      id: 'kantor', icon: Layers,
      title: 'Seragam Kantor & Instansi',
      description: 'Kemeja PDH/PDL, Wearpack, dan Seragam Formal untuk kebutuhan profesional. Dikerjakan dengan standar tinggi dan bahan premium pilihan.',
      moq: '24 Pcs (2 Lusin)',
      materials: ['American Drill', 'Nagata Drill', 'Taipan Tropical', 'Ripstop'],
      printing: ['Bordir Komputer Presisi'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'komunitas', icon: Users,
      title: 'Komunitas & Kampus',
      description: 'Kaos, Polo Shirt, Jaket, dan Hoodie untuk identitas kebanggaan tim Anda. Pilihan bahan dan sablon terlengkap.',
      moq: '24 Pcs (2 Lusin)',
      materials: ['Cotton Combed 30s/24s/20s', 'Fleece', 'Baby Terry', 'Lacoste Pique'],
      printing: ['Sablon Plastisol', 'Sablon Rubber', 'Bordir Komputer', 'DTF (Direct to Film)'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'merchandise', icon: Gift,
      title: 'Merchandise & Event',
      description: 'Totebag, Topi, Rompi, dan produk kustom lainnya untuk promosi event dan branding perusahaan Anda.',
      moq: '50 Pcs',
      materials: ['Kanvas', 'Blacu', 'Drill', 'Rafel'],
      printing: ['Sablon', 'Bordir', 'Sublimasi'],
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <>
      <section className="page-header">
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="section-label animate-fade-in-up">Layanan</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Layanan & <span className="text-primary">Produk</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Pilihan lengkap untuk berbagai kebutuhan apparel Anda.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-16">
            {/* Tabs — horizontal scroll on mobile, vertical on desktop */}
            <div className="lg:w-[380px] shrink-0">
              {/* Mobile: horizontal scrollable tabs */}
              <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {categories.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(idx)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 min-h-[48px] text-sm font-semibold shrink-0 ${
                        activeTab === idx
                          ? 'bg-primary text-secondary shadow-md font-bold'
                          : 'bg-gray-50 text-gray-600 active:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} className={activeTab === idx ? 'text-white' : 'text-gray-400'} />
                      <span className="hidden sm:inline">{category.title}</span>
                      <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop: vertical sidebar */}
              <div className="hidden lg:block sticky top-32 space-y-3">
                {categories.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(idx)}
                      className={`w-full text-left flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ease-in-out group ${
                        activeTab === idx 
                          ? 'bg-primary text-secondary shadow-lg shadow-primary/20' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-primary-dark hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          activeTab === idx ? 'bg-secondary text-primary' : 'bg-white text-gray-400 shadow-sm group-hover:text-primary'
                        }`}>
                          <Icon size={22} />
                        </div>
                        <span className="font-bold">{category.title}</span>
                      </div>
                      <ArrowRight size={18} className={`transition-all duration-300 ${activeTab === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
                    </button>
                  );
                })}

                <div className="mt-8 p-7 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl text-center text-white">
                  <h4 className="font-bold text-lg mb-2">Butuh Referensi?</h4>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">Unduh katalog lengkap kami untuk melihat detail bahan dan model.</p>
                  <Button variant="primary" onClick={handleDownload} className="w-full flex justify-center gap-2">
                    <Download size={18} />
                    Download Katalog PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-card overflow-hidden">
                <div className="h-48 sm:h-60 md:h-72 relative overflow-hidden group">
                  <img 
                    src={heroBg} 
                    alt={categories[activeTab].title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10">
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${categories[activeTab].color} text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4`}>
                      {React.createElement(categories[activeTab].icon, { size: 12 })}
                      {categories[activeTab].id.toUpperCase()}
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">{categories[activeTab].title}</h2>
                  </div>
                </div>
                
                <div className="p-5 sm:p-8 md:p-12">
                  <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 leading-relaxed">
                    {categories[activeTab].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 sm:mb-5">Minimum Order</h4>
                      <div className="text-xl sm:text-2xl font-extrabold text-primary-dark mb-6 sm:mb-10 bg-primary-light/30 inline-block px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-primary/20">
                        {categories[activeTab].moq}
                      </div>

                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 sm:mb-5">Rekomendasi Bahan</h4>
                      <ul className="space-y-3">
                        {categories[activeTab].materials.map((mat, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 font-medium text-sm sm:text-base">
                            <CheckCircle size={16} className="text-primary shrink-0" />
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 sm:mb-5">Opsi Aplikasi / Sablon</h4>
                      <ul className="space-y-3">
                        {categories[activeTab].printing.map((print, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 font-medium text-sm sm:text-base">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary-dark shrink-0" />
                            {print}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Download CTA */}
              <div className="lg:hidden mt-6 p-5 sm:p-7 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl text-center text-white">
                <h4 className="font-bold text-base sm:text-lg mb-2">Butuh Referensi?</h4>
                <p className="text-sm text-gray-300 mb-5 leading-relaxed">Unduh katalog lengkap kami untuk melihat detail.</p>
                <Button variant="primary" onClick={handleDownload} className="w-full flex justify-center gap-2">
                  <Download size={18} />
                  Download Katalog
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
};

export default Services;
