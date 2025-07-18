import React, { useState, useEffect } from 'react';
import {
  MapPin, Mail, Phone, ArrowUp,
} from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-Aqua/20 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Logo & Info */}
        <div>
          <img src="/Logo_Hijau.png" alt="Logo BEM FK" className="h-14 mb-4" />
          <h3 className="text-lg font-semibold mb-1">BEM FK Universitas Negeri Malang</h3>
          <p className="text-sm text-neutral-500">Badan Eksekutif Mahasiswa</p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-neutral-500 mt-0.5" />
              <span>Jalan Semarang 5, Malang 65145</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-neutral-500 mt-0.5" />
              <a href="mailto:bemfkum@gmail.com" className="hover:underline">bemfkum@gmail.com</a>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-neutral-500 mt-0.5" />
              <a href="tel:+6281216016334" className="hover:underline">+62 812 1601 6334</a>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div>
          <h4 className="text-base font-semibold mb-4">Lokasi Kami</h4>
          <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3314237484456!2d112.61600015438307!3d-7.964660092060207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882805430b33d%3A0x44de0ac16a5bdaf7!2sFakultas%20Kedokteran%20Universitas%20Negeri%20Malang!5e0!3m2!1sid!2sid!4v1740730297564!5m2!1sid!2sid"
              className="w-full h-60 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 max-w-6xl mx-auto pt-6 border-t border-black flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black">
        <p>© {new Date().getFullYear()} BEM FK UM. All rights reserved.</p>
        <span>Universitas Negeri Malang</span>
      </div>

     
    </footer>
  );
};

export default Footer;
