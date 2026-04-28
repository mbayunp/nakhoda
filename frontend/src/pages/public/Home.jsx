import React from 'react';
import { ShieldCheck, Clock, Factory, TrendingUp, Scissors, ArrowRight, Play } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import ServiceCard from '../../components/common/ServiceCard';
import TestimonialCard from '../../components/common/TestimonialCard';
import CTASection from '../../components/common/CTASection';
import heroBg from '../../assets/hero_bg.png';
import logoImg from '../../assets/logonakhoda.jpg';
import { showConfirm } from '../../utils/alert';
import { openWhatsApp } from '../../utils/contact';

const Home = () => {
  const handleWhatsAppClick = async (e) => {
    if (e) e.preventDefault();
    await openWhatsApp(showConfirm);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent z-10" />
          <img src={heroBg} alt="Konveksi Production Facility" className="w-full h-full object-cover scale-105" loading="eager" />
        </div>

        <div className="hidden md:block absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/20 blur-[100px] z-10 animate-float" />

        {/* Logo watermark */}
        <div className="hidden lg:flex absolute right-[8%] top-1/2 -translate-y-1/2 z-10 items-center justify-center">
          <img src={logoImg} alt="" aria-hidden="true" className="w-[280px] xl:w-[340px] h-auto object-contain opacity-[0.08] select-none pointer-events-none animate-float" />
        </div>
        
        <Container className="relative z-20 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-3xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 py-1.5 px-3 sm:py-2 sm:px-4 rounded-full bg-white/10 backdrop-blur-sm text-white border border-primary/30 font-semibold text-xs sm:text-sm mb-5 sm:mb-8 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                #1 Solusi Konveksi Bandung
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-5 sm:mb-8 leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Mitra Produksi<br />
                Pakaian <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">Berkualitas</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Tepat waktu dan terpercaya di Bandung. CV. Nakhoda Nusantara Grup siap mewujudkan kebutuhan seragam, kaos, jaket, dan merchandise Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <Button variant="primary" size="md" onClick={handleWhatsAppClick} className="gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                  Konsultasi Sekarang
                  <ArrowRight size={18} />
                </Button>
                <Button variant="outline" size="md" to="/portfolio" className="border-white/30 text-white hover:bg-primary hover:text-secondary hover:border-primary gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                  <Play size={18} />
                  Lihat Portfolio
                </Button>
              </div>

              <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                {[
                  { number: '500+', label: 'Project Selesai' },
                  { number: '100+', label: 'Klien Puas' },
                  { number: '10+', label: 'Tahun Pengalaman' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-1">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* ─── CLIENT LOGOS ─── */}
      <section className="py-8 sm:py-14 bg-white relative z-30 -mt-4 sm:-mt-8">
        <Container>
          <p className="text-center text-[10px] sm:text-xs font-bold text-gray-400 mb-5 sm:mb-8 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Dipercaya Oleh Berbagai Instansi & Perusahaan</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-lg text-gray-300 cursor-default">
                <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
                <span>Client {i}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── VALUE PROPOSITION ─── */}
      <Section className="bg-accent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
            <span className="section-label">Keunggulan</span>
            <h2 className="section-title">Mengapa Memilih Kami?</h2>
            <p className="section-desc">Komitmen kami adalah memberikan hasil terbaik untuk setiap project Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: Factory, title: 'Kapasitas Besar', desc: 'Mampu memproduksi dalam jumlah besar dengan standar kualitas konsisten.', color: 'from-primary to-primary-dark' },
              { icon: Scissors, title: 'Jahitan Rapi', desc: 'Dikerjakan oleh tenaga ahli berpengalaman dengan quality control ketat.', color: 'from-secondary-light to-secondary' },
              { icon: TrendingUp, title: 'Harga Pabrik', desc: 'Dapatkan harga terbaik dan kompetitif langsung dari tangan pertama.', color: 'from-primary to-primary-dark' },
              { icon: Clock, title: 'Garansi Tepat Waktu', desc: 'Komitmen penuh pada timeline produksi sesuai kesepakatan.', color: 'from-secondary-light to-secondary' }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-gray-100/80 text-center hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-secondary mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="max-w-xl">
              <span className="section-label">Layanan</span>
              <h2 className="section-title">Layanan Unggulan</h2>
              <p className="section-desc">Berbagai jenis pakaian yang dapat kami produksi dengan kualitas premium.</p>
            </div>
            <Button variant="outline" to="/services" className="shrink-0 gap-2 w-full sm:w-auto justify-center">
              Semua Layanan
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: 'Kemeja PDH/PDL', desc: 'Seragam kerja dinas harian dan lapangan dengan bahan premium dan jahitan kuat.', delay: 0 },
              { title: 'Kaos & Polo', desc: 'Kaos sablon komunitas, event, atau merchandise dengan pilihan bahan terbaik.', delay: 100 },
              { title: 'Jaket & Hoodie', desc: 'Jaket instansi, kampus, atau komunitas dengan bordir komputer presisi.', delay: 200 },
              { title: 'Seragam Pabrik', desc: 'Wearpack dan seragam safety untuk kebutuhan industri dan pabrik.', delay: 300 }
            ].map((service, idx) => (
              <ServiceCard key={idx} title={service.title} description={service.desc} delay={service.delay} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── ABOUT TEASER ─── */}
      <Section className="bg-accent overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="hidden sm:block absolute -inset-4 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-3xl transform rotate-2" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group">
                <img src={heroBg} alt="Facility" className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
              </div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-card-hover animate-float">
                <div className="flex items-center gap-2.5">
                  <img src={logoImg} alt="Nakhoda" className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg" />
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-primary-dark leading-none">10+</div>
                    <div className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahun</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="section-label">Tentang Kami</span>
              <h2 className="section-title">
                Pengalaman & <span className="text-primary">Dedikasi</span> Penuh
              </h2>
              <div className="space-y-4 sm:space-y-5 text-gray-500 leading-relaxed text-base sm:text-lg mb-8 sm:mb-10">
                <p>
                  <strong className="text-secondary">CV. Nakhoda Nusantara Grup</strong> adalah mitra konveksi terpercaya di Bandung dengan pengalaman lebih dari satu dekade dalam industri garment.
                </p>
                <p>
                  Kami berkomitmen menghasilkan produk pakaian berkualitas tinggi dengan standar quality control ketat dan harga kompetitif.
                </p>
              </div>
              <Button variant="outline" to="/about" className="gap-2 w-full sm:w-auto justify-center">
                Selengkapnya
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section className="bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
            <span className="section-label">Testimoni</span>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-desc">Kepercayaan klien adalah prioritas utama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <TestimonialCard name="Budi Santoso" role="Ketua Panitia" company="Event Nasional" text="Luar biasa, pesan 1000 pcs kaos event selesai tepat waktu 2 minggu sebelum acara. Sablonnya rapi dan bahannya adem." />
            <TestimonialCard name="Andi Wijaya" role="HRD Manager" company="PT. Manufaktur" text="Seragam pabrik yang diproduksi Nakhoda Nusantara sangat berkualitas. Jahitannya kuat dan awet dipakai karyawan untuk operasional harian." />
            <TestimonialCard name="Rina Melati" role="Kepala Divisi" company="Instansi Pemerintah" text="Bordir komputer untuk kemeja PDH kami sangat presisi. Komunikasinya mudah dan timnya responsif. Sangat direkomendasikan!" />
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
};

export default Home;
