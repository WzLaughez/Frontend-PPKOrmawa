import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const VisiMisi = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-WhitePPK via-blue-50 to-emerald-50 overflow-hidden font-dmsans" data-aos="fade-up">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-100/20 to-emerald-100/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric Patterns */}
        {/* <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div> */}
        
        {/* Flowing Lines */}
        <div className="absolute inset-0">
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
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-8 pb-12" data-aos="fade-down">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-block">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-blue-400/30"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-emerald-400/30"></div>
            
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 bg-clip-text text-transparent">
                  Selamat Datang di PRIMA HEALTH
                </span>
              </h2>
              
              {/* Animated Underline */}
              <div className="relative mx-auto w-40 h-2 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-semibold mx-auto leading-relaxed">
                Digitalisasi Terpadu Desa Pandansari Lor
              </p>
              
              {/* Decorative Stars */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latar Belakang Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-105"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 group-hover:shadow-3xl transition-all duration-500">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-blue-500/50 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-emerald-500/50 rounded-br-3xl"></div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-600/10 z-10"></div>
                <img 
                  src="/download.jpg"
                  alt="Healthcare Building" 
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Image Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent z-20"></div>
                <div className="absolute bottom-4 left-4 z-30">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-sm font-semibold text-gray-800">Prima Health Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-gray-800 via-blue-800 to-emerald-800 bg-clip-text text-transparent">
                  Latar Belakang
                </span>
                {/* Decorative Accent */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full blur-sm"></div>
              </h2>
            </div>
            
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Penyakit Tidak Menular (PTM) seperti hipertensi dan diabetes kini menjadi ancaman utama kesehatan nasional dan global.
                Di Indonesia, <span className="font-bold text-red-600">73% kematian disebabkan oleh PTM</span> (KEMENKES, 2023), angka ini bahkan lebih tinggi dari rata-rata global (71%).
                Hipertensi dan diabetes menjadi perhatian utama karena prevalensinya yang tinggi serta komplikasi serius seperti stroke, penyakit jantung, dan gagal ginjal.
              </p>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                  <div className="text-2xl font-bold text-red-600">73%</div>
                  <div className="text-sm text-red-700">Kematian PTM di Indonesia</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">71%</div>
                  <div className="text-sm text-blue-700">Rata-rata Global</div>
                </div>
              </div>
              
              <button className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center">
                  Selengkapnya 
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-10 right-10 w-6 h-6 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
      </section>
    </div>
  );
};

export default VisiMisi;