import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import CTASection from '../../components/common/CTASection';
import heroBg from '../../assets/hero_bg.png';

const Portfolio = () => {
  const [filter, setFilter] = useState('Semua');
  const categories = ['Semua', 'Kemeja', 'Kaos', 'Jaket'];

  const projects = [
    { id: 1, title: 'Seragam Dinas Tata Ruang', category: 'Kemeja', desc: '500 pcs Kemeja PDH dengan bordir komputer, selesai dalam 14 hari kerja.' },
    { id: 2, title: 'Kaos Event Lari Marathon', category: 'Kaos', desc: '2000 pcs Kaos Dryfit dengan sablon sublimasi untuk event lari tingkat nasional.' },
    { id: 3, title: 'Jaket BEM Universitas', category: 'Jaket', desc: '150 pcs Jaket Varsity bahan fleece dengan bordir handuk premium.' },
    { id: 4, title: 'Kemeja Teknisi Pabrik', category: 'Kemeja', desc: '300 pcs Kemeja lapangan bahan drill tebal dengan reflective tape.' },
    { id: 5, title: 'Kaos Komunitas Motor', category: 'Kaos', desc: '100 pcs Kaos Cotton Combed 24s sablon plastisol dengan desain rumit 5 warna.' },
    { id: 6, title: 'Hoodie Angkatan', category: 'Jaket', desc: '250 pcs Hoodie custom dengan resleting YKK dan sablon rubber.' }
  ];

  const filteredProjects = filter === 'Semua' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="page-header">
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="section-label animate-fade-in-up">Portfolio</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Karya <span className="text-primary">Terbaik</span> Kami
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Bukti nyata komitmen kami terhadap kualitas dan ketepatan waktu.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          {/* Filters — scrollable on mobile */}
          <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out whitespace-nowrap min-h-[44px] shrink-0 ${
                  filter === cat 
                    ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105 font-bold' 
                    : 'bg-gray-50 text-gray-500 active:bg-gray-100 sm:hover:bg-gray-100 sm:hover:text-primary-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="h-48 sm:h-56 md:h-60 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <img 
                    src={heroBg} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-dark text-[11px] sm:text-xs font-bold px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-primary-dark">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <h3 className="font-bold text-lg sm:text-xl text-secondary mb-2 sm:mb-3 group-hover:text-primary-dark transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
};

export default Portfolio;
