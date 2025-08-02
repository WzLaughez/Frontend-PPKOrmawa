import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <div
      className="relative w-full font-dmsans min-h-screen flex items-center justify-center bg-white"
      data-aos="fade-down"
    >
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-100/20 to-emerald-100/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,300 Q250,100 500,300 T1000,300" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="animate-pulse"/>
            <path d="M0,700 Q250,500 500,700 T1000,700" stroke="url(#gradient2)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }}/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div> */}

      {/* Mobile Background Overlay */}
      <div className="absolute inset-0 block md:hidden">
        <img
          src="/Home.png"
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-60"
        />
        <div className="absolute inset-0 bg-[#F0F7FD]/80 backdrop-blur-sm"></div>
      </div>

      {/* Content Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-10 max-w-7xl mx-auto w-full">
        
        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#005689] leading-tight">
            Digitalisasi Terpadu Desa <br /> Pandansari Lor
          </h1>
          <p className="text-base md:text-lg text-[#007cb8]">
            Meningkatkan Kesehatan Masyarakat melalui Edukasi, Skrining, dan Pemantauan Berkelanjutan
          </p>
          {/* Feature Icons */}
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3L1,9L12,15L21,9V16H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                  </svg>
                </div>
                <span className="text-xs text-blue-600 font-medium">Edukasi</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,4H14V2H10V4M9,9V4H11V7H13V4H15V9H13V8H11V9H9M7.5,12A2.5,2.5 0 0,0 5,14.5A2.5,2.5 0 0,0 7.5,17A2.5,2.5 0 0,0 10,14.5A2.5,2.5 0 0,0 7.5,12M16.5,12A2.5,2.5 0 0,0 14,14.5A2.5,2.5 0 0,0 16.5,17A2.5,2.5 0 0,0 19,14.5A2.5,2.5 0 0,0 16.5,12Z"/>
                  </svg>
                </div>
                <span className="text-xs text-cyan-600 font-medium">Skrining</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                  </svg>
                </div>
                <span className="text-xs text-blue-600 font-medium">Monitor</span>
              </div>
            </div>
          <Link to="/login" className="inline-block">
          <button className="bg-[#F6C667] hover:bg-[#e5b353] text-[#005689] font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300">
            Daftar Sekarang
          </button>
          </Link>
          {/* Trust Indicators */}
          <div className="flex justify-center md:justify-start items-center space-x-6 text-sm text-blue-600/70">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Platform Terpercaya</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Data Aman</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Hero Image (Desktop Only) */}
        <div className="mt-10 md:mt-0 max-w-md hidden md:block drop-shadow-lg">
          <img
            src="/Home.png"
            alt="Hero"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
