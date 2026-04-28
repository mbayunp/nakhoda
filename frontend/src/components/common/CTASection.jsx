import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { showConfirm } from '../../utils/alert';
import { openWhatsApp } from '../../utils/contact';

const CTASection = () => {
  const handleWhatsAppClick = async (e) => {
    if (e) e.preventDefault();
    await openWhatsApp(showConfirm);
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -translate-y-1/2 translate-x-1/3 animate-float" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] translate-y-1/2 -translate-x-1/3" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white px-1">
          <span className="inline-block text-primary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6">Mulai Sekarang</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-5 sm:mb-8 leading-tight">
            Siap Memproduksi Pakaian <span className="text-primary">Berkualitas</span> Untuk Anda?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Konsultasikan kebutuhan produksi Anda dengan tim ahli kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button variant="primary" size="md" onClick={handleWhatsAppClick} className="gap-3 w-full sm:w-auto justify-center">
              <MessageSquare size={20} />
              Konsultasi via WhatsApp
            </Button>
            <Button variant="outline" size="md" to="/contact" className="border-white/30 text-white hover:bg-primary hover:text-secondary hover:border-primary gap-3 w-full sm:w-auto justify-center">
              Kirim Pesan
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
