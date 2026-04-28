import React from 'react';
import { PenTool, MessageCircle, Scissors, Calculator, Package, AlertTriangle, CreditCard, Clock, CheckCircle } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import CTASection from '../../components/common/CTASection';
import { showConfirm } from '../../utils/alert';
import { openWhatsApp } from '../../utils/contact';

const HowToOrder = () => {
  const handleWhatsAppClick = async (e) => {
    if (e) e.preventDefault();
    await openWhatsApp(showConfirm);
  };

  const steps = [
    {
      num: '01', icon: PenTool, title: 'Desain & Konsep',
      desc: 'Siapkan desain atau konsep pakaian yang Anda inginkan. Tim kami siap membantu mewujudkan ide Anda.',
      gradient: 'from-blue-500 to-blue-600',
      glow: 'shadow-blue-500/20',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-600',
      line: 'bg-blue-400',
    },
    {
      num: '02', icon: MessageCircle, title: 'Komunikasi',
      desc: 'Diskusikan detail kebutuhan via WhatsApp — jumlah, bahan, ukuran, dan deadline produksi.',
      gradient: 'from-indigo-500 to-indigo-600',
      glow: 'shadow-indigo-500/20',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-indigo-600',
      line: 'bg-indigo-400',
    },
    {
      num: '03', icon: Scissors, title: 'Menentukan Jenis Kain',
      desc: 'Pilih bahan terbaik dari koleksi kami — Drill, Cotton Combed, Fleece, Lacoste, dan lainnya.',
      gradient: 'from-purple-500 to-purple-600',
      glow: 'shadow-purple-500/20',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      text: 'text-purple-600',
      line: 'bg-purple-400',
    },
    {
      num: '04', icon: Calculator, title: 'Menentukan Harga',
      desc: 'Dapatkan penawaran harga terbaik sesuai spesifikasi. Transparan, tanpa biaya tersembunyi.',
      gradient: 'from-pink-500 to-pink-600',
      glow: 'shadow-pink-500/20',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      text: 'text-pink-600',
      line: 'bg-pink-400',
    },
    {
      num: '05', icon: Package, title: 'Hasil Produksi',
      desc: 'Pesanan diproduksi dengan QC ketat dan dikirim tepat waktu ke alamat Anda.',
      gradient: 'from-red-500 to-red-600',
      glow: 'shadow-red-500/20',
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-600',
      line: 'bg-red-400',
    },
  ];

  return (
    <>
      {/* ─── PAGE HEADER ─── */}
      <section className="page-header">
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="section-label animate-fade-in-up">Proses Pemesanan</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Alur <span className="text-primary">Produksi</span> Kami
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Dari konsep hingga produk jadi — proses transparan dan mudah dipahami.
            </p>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: PRODUCTION FLOW — ZIG-ZAG INFOGRAPHIC
          ═══════════════════════════════════════════════════════ */}
      <Section className="bg-accent overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <span className="section-label">Alur Kerja</span>
            <h2 className="section-title">Proses Produksi</h2>
            <p className="section-desc">5 langkah mudah dari ide hingga pakaian siap pakai.</p>
          </div>

          {/* ── Desktop Zig-Zag (lg+) ── */}
          <div className="hidden lg:block relative max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative" style={{ marginBottom: idx < steps.length - 1 ? '-20px' : 0 }}>
                  {/* Connector line to next step */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 z-0" style={{ top: '100%', height: '60px' }}>
                      <div className={`w-0.5 h-full ${steps[idx + 1].line} opacity-30 mx-auto`} />
                    </div>
                  )}

                  <div className={`flex items-center gap-8 ${isEven ? '' : 'flex-row-reverse'}`}>
                    {/* Card */}
                    <div className={`w-[calc(50%-40px)] group`}>
                      <div className={`relative p-7 rounded-2xl bg-white border ${step.border} shadow-lg ${step.glow} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out`}>
                        {/* Glow backdrop */}
                        <div className={`absolute -inset-1 bg-gradient-to-br ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 blur-sm`} />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-5">
                            <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                              <Icon size={24} />
                            </div>
                            <span className={`text-5xl font-black ${step.text} opacity-10 leading-none select-none`}>{step.num}</span>
                          </div>
                          <h3 className="font-extrabold text-xl text-secondary mb-2 group-hover:text-primary-dark transition-colors duration-300">{step.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </div>

                        {/* Arrow pointer towards center */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border ${step.border} rotate-45 ${isEven ? '-right-2 border-l-0 border-b-0' : '-left-2 border-r-0 border-t-0'}`} />
                      </div>
                    </div>

                    {/* Center timeline node */}
                    <div className="relative z-10 flex flex-col items-center shrink-0" style={{ width: '80px' }}>
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-extrabold text-lg shadow-xl ring-4 ring-white`}>
                        {step.num}
                      </div>
                    </div>

                    {/* Empty space on opposite side */}
                    <div className="w-[calc(50%-40px)]" />
                  </div>

                  {/* Spacing between rows */}
                  {idx < steps.length - 1 && <div className="h-10" />}
                </div>
              );
            })}
          </div>

          {/* ── Mobile/Tablet Vertical Timeline (< lg) ── */}
          <div className="lg:hidden relative max-w-md mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-red-300 opacity-30" />

            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex gap-4 sm:gap-6 items-start animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    {/* Timeline node */}
                    <div className="relative z-10 shrink-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-extrabold text-sm sm:text-lg shadow-xl ring-4 ring-white`}>
                        {step.num}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0 group">
                      <div className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border ${step.border} shadow-md ${step.glow} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                        <div className={`absolute -inset-0.5 bg-gradient-to-br ${step.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 blur-sm`} />

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-all duration-300`}>
                              <Icon size={18} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <h3 className="font-extrabold text-base sm:text-lg text-secondary group-hover:text-primary-dark transition-colors duration-300">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick CTA */}
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <p className="text-gray-500 text-base sm:text-lg mb-5">Siap memulai? Langkah pertama dari sini.</p>
            <Button variant="primary" size="lg" onClick={handleWhatsAppClick} className="gap-3 w-full sm:w-auto justify-center">
              <MessageCircle size={20} />
              Mulai Konsultasi
            </Button>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: PAYMENT SYSTEM
          ═══════════════════════════════════════════════════════ */}
      <Section className="bg-white overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <span className="section-label">Pembayaran</span>
            <h2 className="section-title">Sistem Pembayaran</h2>
            <p className="section-desc">Fleksibel dan transparan — pilih skema yang paling cocok untuk Anda.</p>
          </div>

          {/* ── Payment Flow Cards ── */}
          <div className="max-w-4xl mx-auto">
            {/* Scheme selector — two options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14">

              {/* Option A: DP 50% */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Opsi A</span>
                      <h3 className="font-extrabold text-lg sm:text-xl text-secondary">DP 50% di Awal</h3>
                    </div>
                  </div>

                  {/* Flow visualization */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">50%</div>
                      <div className="flex-1 h-0.5 bg-emerald-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-emerald-300 border-y-[4px] border-y-transparent" />
                      </div>
                      <div className="text-sm font-semibold text-secondary bg-white px-3 py-2 rounded-lg shadow-sm border border-emerald-100 shrink-0">
                        Awal Produksi
                      </div>
                    </div>
                    {/* Step 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-400 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">50%</div>
                      <div className="flex-1 h-0.5 bg-emerald-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-emerald-300 border-y-[4px] border-y-transparent" />
                      </div>
                      <div className="text-sm font-semibold text-secondary bg-white px-3 py-2 rounded-lg shadow-sm border border-emerald-100 shrink-0 flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-emerald-500" />
                        Pelunasan
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">Cocok untuk pesanan dengan timeline cepat.</p>
                </div>
              </div>

              {/* Option B: DP 30% */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                {/* Popular badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Populer
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Clock size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Opsi B</span>
                      <h3 className="font-extrabold text-lg sm:text-xl text-secondary">DP 30% di Awal</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">30%</div>
                      <div className="flex-1 h-0.5 bg-blue-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-blue-300 border-y-[4px] border-y-transparent" />
                      </div>
                      <div className="text-sm font-semibold text-secondary bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-100 shrink-0">
                        Awal Produksi
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">40%</div>
                      <div className="flex-1 h-0.5 bg-blue-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-blue-300 border-y-[4px] border-y-transparent" />
                      </div>
                      <div className="text-sm font-semibold text-secondary bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-100 shrink-0">
                        Minggu ke-1
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">30%</div>
                      <div className="flex-1 h-0.5 bg-blue-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-blue-300 border-y-[4px] border-y-transparent" />
                      </div>
                      <div className="text-sm font-semibold text-secondary bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-100 shrink-0 flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-blue-500" />
                        Pelunasan
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">Ideal untuk pesanan besar dengan cicilan ringan.</p>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-start gap-4 max-w-2xl mx-auto">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-bold text-red-700 text-sm sm:text-base mb-1">Penting</h4>
                <p className="text-red-600 text-sm leading-relaxed">
                  Barang tidak dapat dikirim sebelum pembayaran selesai dilunaskan. Pastikan pembayaran telah selesai untuk kelancaran pengiriman pesanan Anda.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── FAQ / QUICK INFO ─── */}
      <section className="py-12 sm:py-16 bg-accent border-t border-gray-100">
        <Container>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            {[
              { icon: MessageCircle, label: 'Konsultasi Gratis', sub: 'Via WhatsApp 24/7' },
              { icon: Package, label: 'Min. Order 24 Pcs', sub: 'Mulai dari 2 lusin' },
              { icon: CheckCircle, label: 'QC Ketat', sub: 'Cek sebelum kirim' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-2 py-4 sm:py-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-1">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-bold text-secondary text-sm sm:text-base">{item.label}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
};

export default HowToOrder;
