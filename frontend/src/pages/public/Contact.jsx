import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight } from 'lucide-react';
import Section from '../../components/ui/Section';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { showSuccess, showConfirm } from '../../utils/alert';
import { CONTACT, openWhatsApp } from '../../utils/contact';

const Contact = () => {
  const [formData, setFormData] = useState({ nama: '', instansi: '', hp: '', jenis: '', jumlah: '', deskripsi: '' });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccess('Pesan berhasil dikirim!');
      setFormData({ nama: '', instansi: '', hp: '', jenis: '', jumlah: '', deskripsi: '' });
    }, 1500);
  };

  const handleWhatsAppClick = async (e) => {
    if (e) e.preventDefault();
    await openWhatsApp(showConfirm);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Lokasi Workshop', content: CONTACT.address.full, color: 'from-primary to-primary-dark' },
    { icon: Clock, title: 'Jam Operasional', content: null, list: CONTACT.hours, color: 'from-secondary to-secondary-light' },
    { icon: Phone, title: 'Kontak', content: CONTACT.phone.display, color: 'from-primary to-primary-dark' },
    { icon: Mail, title: 'Email', content: CONTACT.email, color: 'from-secondary to-secondary-light' }
  ];

  return (
    <>
      <section className="page-header">
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="section-label animate-fade-in-up">Kontak</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Hubungi <span className="text-primary">Kami</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Tim kami siap membantu mewujudkan kebutuhan produksi Anda.
            </p>
          </div>
        </Container>
      </section>

      {/* WhatsApp Banner */}
      <div className="relative -mt-8 sm:-mt-12 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
            <div className="text-white text-center sm:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-2">Butuh Respon Cepat?</h3>
              <p className="text-gray-300 text-sm">Chat langsung via WhatsApp untuk konsultasi instan.</p>
            </div>
            <Button variant="primary" size="md" onClick={handleWhatsAppClick} className="shrink-0 gap-2 w-full sm:w-auto justify-center hover:scale-105 transition-all duration-300">
              <MessageCircle size={18} />
              Chat WhatsApp
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info + Form */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="group flex gap-4 items-start p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-100/80 bg-white hover:shadow-card transition-all duration-300">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 shadow-md`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-primary text-sm sm:text-base mb-1">{item.title}</h4>
                      {item.content && <p className="text-gray-500 text-sm leading-relaxed break-words">{item.content}</p>}
                      {item.list && <ul className="text-gray-500 text-sm space-y-0.5">{item.list.map((l, i) => <li key={i}>{l}</li>)}</ul>}
                    </div>
                  </div>
                );
              })}

              <a 
                href={CONTACT.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-center p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-primary/30 bg-primary-light/20 hover:bg-primary-light/40 hover:shadow-card hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg sm:rounded-xl flex items-center justify-center text-secondary shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-secondary text-sm sm:text-base mb-0.5">WhatsApp</h4>
                  <p className="text-primary-dark text-sm font-medium">{CONTACT.phone.display}</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-primary group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-accent p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100/80 shadow-card">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-secondary mb-1 sm:mb-2">Kirim Pesan</h3>
                  <p className="text-gray-500 text-sm">Isi form dan tim kami akan segera menghubungi Anda.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Nama <span className="text-primary">*</span></label>
                      <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="form-input" placeholder="Nama lengkap" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Instansi</label>
                      <input type="text" name="instansi" value={formData.instansi} onChange={handleChange} className="form-input" placeholder="Nama instansi" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">WhatsApp <span className="text-primary">*</span></label>
                      <input type="tel" name="hp" value={formData.hp} onChange={handleChange} required className="form-input" placeholder="08xxxxxxxx" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Jumlah (Pcs)</label>
                      <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="form-input" placeholder="Min. 24" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Jenis Pakaian</label>
                    <select name="jenis" value={formData.jenis} onChange={handleChange} className="form-input">
                      <option value="">Pilih Jenis</option>
                      <option value="Kemeja">Kemeja PDH/PDL</option>
                      <option value="Kaos">Kaos / Polo</option>
                      <option value="Jaket">Jaket / Hoodie</option>
                      <option value="Seragam">Seragam Pabrik</option>
                      <option value="Merchandise">Merchandise</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Deskripsi</label>
                    <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="3" className="form-input resize-none" placeholder="Detail kebutuhan (bahan, warna, deadline)"></textarea>
                  </div>
                  <Button type="submit" variant="secondary" className="w-full flex justify-center gap-2" isLoading={isLoading}>
                    <Send size={18} />
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Google Maps */}
      <section className="relative">
        <div className="bg-accent py-8 sm:py-12">
          <Container>
            <div className="text-center mb-4 sm:mb-8">
              <span className="section-label">Lokasi</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">Lokasi Kami</h2>
            </div>
          </Container>
        </div>
        <div className="h-[300px] sm:h-[350px] md:h-[450px] bg-gray-100 relative overflow-hidden">
          <iframe 
            src={CONTACT.maps.embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi CV. Nakhoda Nusantara Grup"
            allowFullScreen=""
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
