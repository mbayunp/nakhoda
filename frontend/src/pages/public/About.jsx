import React from 'react';
import { Target, Eye, CheckCircle2, Users, Award, Zap } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import CTASection from '../../components/common/CTASection';
import heroBg from '../../assets/hero_bg.png';

const About = () => {
  return (
    <>
      {/* ─── PAGE HEADER ─── */}
      <section className="page-header">
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="section-label animate-fade-in-up">About Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Tentang Nakhoda<br /><span className="text-primary">Nusantara</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Mengenal lebih dekat mitra konveksi terpercaya Anda di Bandung.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── COMPANY STORY ─── */}
      <Section className="bg-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
            <div>
              <span className="section-label">Story</span>
              <h2 className="section-title">Perjalanan Kami</h2>
              <div className="space-y-4 text-gray-500 leading-relaxed text-base sm:text-[17px]">
                <p>
                  <strong className="text-secondary">CV. Nakhoda Nusantara Grup</strong> adalah perusahaan konveksi dan garment yang berpusat di kota Bandung, Jawa Barat. Berawal dari kecintaan kami terhadap dunia fashion dan tekstil, kami telah berkembang menjadi salah satu pusat produksi pakaian terpercaya.
                </p>
                <p>
                  Kami berdedikasi untuk memberikan solusi produksi pakaian yang berkualitas tinggi untuk berbagai kebutuhan, mulai dari seragam instansi pemerintah, perusahaan swasta, organisasi, hingga kebutuhan merchandise komunitas.
                </p>
                <p className="hidden sm:block">
                  Dengan dukungan tim ahli yang berpengalaman, mesin produksi modern, dan standar quality control yang ketat, kami berkomitmen untuk selalu memberikan hasil terbaik.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-gray-100">
                {[
                  { icon: Users, number: '100+', label: 'Klien Aktif' },
                  { icon: Award, number: '500+', label: 'Project' },
                  { icon: Zap, number: '24/7', label: 'Support' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2 sm:mb-3 group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                      <stat.icon size={18} />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-secondary">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute -inset-6 bg-gradient-to-br from-primary/10 to-primary-light/5 rounded-3xl transform rotate-3" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group">
                <img src={heroBg} alt="Production Facility" className="w-full h-[280px] sm:h-[380px] md:h-[480px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── VISION & MISSION ─── */}
      <Section className="bg-accent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
            <span className="section-label">Fondasi</span>
            <h2 className="section-title">Visi & Misi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl shadow-card border border-gray-100/80 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-dark text-secondary rounded-2xl flex items-center justify-center mb-5 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Eye size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-secondary mb-4 sm:mb-5">Visi Kami</h3>
              <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                Menjadi perusahaan konveksi berskala nasional yang terkemuka, inovatif, dan menjadi pilihan utama dalam industri pakaian dengan mengedepankan kualitas dan kepuasan pelanggan.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl shadow-card border border-gray-100/80 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary to-secondary-light text-primary rounded-2xl flex items-center justify-center mb-5 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Target size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-secondary mb-4 sm:mb-5">Misi Kami</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  'Menghasilkan produk pakaian berkualitas premium standar pabrik.',
                  'Memberikan pelayanan profesional dan responsif.',
                  'Menjaga ketepatan waktu dalam setiap produksi.',
                  'Membangun kemitraan jangka panjang yang saling menguntungkan.',
                  'Memberdayakan sumber daya manusia lokal secara berkesinambungan.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-500 text-sm sm:text-base">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── GALLERY ─── */}
      <Section className="bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
            <span className="section-label">Fasilitas</span>
            <h2 className="section-title">Fasilitas Produksi</h2>
            <p className="section-desc">Dukungan infrastruktur modern untuk menghasilkan produk terbaik.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { span: 'sm:col-span-2 md:col-span-2 md:row-span-2', h: 'h-48 sm:h-64 md:h-full', label: 'Workshop Utama' },
              { span: '', h: 'h-48 sm:h-64', label: 'Area Cutting' },
              { span: '', h: 'h-48 sm:h-64', label: 'Mesin Jahit' },
              { span: '', h: 'h-48 sm:h-64', label: 'Area Sablon' },
              { span: '', h: 'h-48 sm:h-64', label: 'Quality Control' },
              { span: 'sm:col-span-2', h: 'h-48 sm:h-64', label: 'Area Bordir Komputer' },
            ].map((item, i) => (
              <div key={i} className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 ${item.span} ${item.h}`}>
                <img src={heroBg} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 sm:p-6">
                  <h4 className="text-white font-bold text-sm sm:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.label}</h4>
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

export default About;
