/**
 * Centralized contact information for CV. Nakhoda Nusantara Grup.
 * Import from here — NEVER hardcode contact data elsewhere.
 */

export const CONTACT = {
  phone: {
    display: '+62 811-2241-014',
    raw: '628112241014',
  },
  email: 'info@nakhodanusantara.com',
  address: {
    short: 'Gg. Cikondang IV, Sukaluyu, Bandung',
    full: 'Gg. Cikondang IV, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123',
  },
  hours: [
    'Senin - Jumat: 08.00 - 17.00 WIB',
    'Sabtu: 08.00 - 14.00 WIB',
    'Minggu & Hari Libur: Tutup',
  ],
  whatsapp: {
    link: 'https://wa.me/628112241014?text=Halo%20Nakhoda%20Nusantara%2C%20saya%20ingin%20konsultasi%20produksi',
    /** Link without pre-filled message (for navbar CTA) */
    linkShort: 'https://wa.me/628112241014',
  },
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7782394164137!2d107.7230839!3d-6.9170951999999994!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd0ae9244b63%3A0xe388d16bb7d34be6!2sNahkoda!5e0!3m2!1sen!2sid!4v1777362406176!5m2!1sen!2sid',
  },
};

/**
 * Opens WhatsApp with a SweetAlert2 confirmation dialog.
 * Usage: onClick={handleWhatsApp}
 */
export const openWhatsApp = async (showConfirm) => {
  const result = await showConfirm('Lanjut ke WhatsApp untuk konsultasi?');
  if (result.isConfirmed) {
    window.open(CONTACT.whatsapp.link, '_blank', 'noopener,noreferrer');
  }
};
