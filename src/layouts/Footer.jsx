import React, { useState } from 'react';
import { MapPin, Mail, Phone, Youtube, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';



const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      
      <footer className="relative overflow-hidden">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-Sage via-gray-900 to-slate-800 ">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(9, 28, 59, 0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Section: Enhanced Info */}
            <div className="space-y-8">
              {/* Logo Section with modern styling */}
              <div className="flex items-center gap-6 p-6 rounded-2xl ">
                <div className="flex items-center gap-4">
                  <div className="">
                    <img
                      alt="Logo BEM FK"
                      src="/Logo_Hijau.png"
                      className="h-16 w-auto"
                    />
                  </div>
                  <div className="">
                    <img
                      alt="Logo Kabinet"
                      src="/Logo_Kabinet.png"
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">BEM FK Universitas Negeri Malang</h3>
                  <p className="text-gray-400 text-sm">Badan Eksekutif Mahasiswa</p>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  Contact Information
                </h4>
                
                {[
                  {
                    icon: MapPin,
                    text: "Jalan Semarang 5, Malang 65145",
                    link: null,
                    color: "from-red-400 to-pink-500"
                  },
                  {
                    icon: Mail,
                    text: "bemfkum@gmail.com",
                    link: "mailto:bemfkum@gmail.com",
                    color: "from-green-400 to-emerald-500"
                  },
                  {
                    icon: Phone,
                    text: "+6281216016334",
                    link: "tel:+6281216016334",
                    color: "from-blue-400 to-indigo-500"
                  }
                ].map(({ icon: Icon, text, link, color }, idx) => (
                  <div key={idx} className="group">
                    {link ? (
                      <a
                        href={link}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 
                          hover:from-white/10 hover:to-white/15 backdrop-blur-sm border border-white/10 
                          transition-all duration-300 hover:scale-105"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {text}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-300">{text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Enhanced Map */}
            <div className="space-y-4">
              
              <div className="relative group">
                <div className="mt-3 absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative h-80 rounded-2xl overflow-hidden border border-white/20">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3314237484456!2d112.61600015438307!3d-7.964660092060207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882805430b33d%3A0x44de0ac16a5bdaf7!2sFakultas%20Kedokteran%20Universitas%20Negeri%20Malang!5e0!3m2!1sid!2sid!4v1740730297564!5m2!1sid!2sid"
                    className="w-full h-full border-0 filter contrast-110 saturate-110"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  
                  {/* Map overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Copyright Section */}
          <div className="mt-16 pt-8 border-t border-gradient-to-r from-transparent via-white/20 to-transparent">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BEM FK UM. All rights reserved.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="w-px h-4 bg-gray-600"></div>
                <span>Universitas Negeri Malang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
            hover:from-blue-400 hover:to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl 
            transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </footer>
    </>
  );
};

export default Footer;