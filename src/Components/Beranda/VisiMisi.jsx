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
    <div className="relative min-h-screen p-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-WhitePPK overflow-hidden">
      {/* Enhanced Background Decorative Elements */}



      {/* Header Section */}
      <div className="relative z-10 pt-5 pb-8" data-aos="fade-down">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <h2 className="text-1xl sm:text-2xl md:text-3xl font-bold text-Sage">
              <span className="text-Blue">
                Selamat Datang di PRIMA HEALTH
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-Sage to-Sage mx-auto rounded-full m-3"></div>
            <p className="text-lg text-gray-800 max-w-3xl font-semibold mx-auto leading-relaxed">
              Digitalisasi Terpadu Desa Pandansari Lor
            </p>
          </div>
        </div>
      </div>

      {/* Latar Belakang Section */}
<section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" data-aos="fade-up">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    {/* Image */}
    <div className="w-full h-auto  overflow-hidden shadow-lg">
      <img 
        src="/download.jpg" 
        alt="Gedung Desa Pandansari Lor" 
        className="w-full h-auto object-cover "
      />
    </div>

    {/* Text */}
    <div className="text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Latar Belakang</h2>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
        Penyakit Tidak Menular (PTM) seperti hipertensi dan diabetes kini menjadi ancaman utama kesehatan nasional dan global.
        Di Indonesia, 73% kematian disebabkan oleh PTM (KEMENKES, 2023), angka ini bahkan lebih tinggi dari rata-rata global (71%).
        Hipertensi dan diabetes menjadi perhatian utama karena prevalensinya yang tinggi serta komplikasi serius seperti stroke, penyakit jantung, dan gagal ginjal.
      </p>
      <button className="mt-6 inline-flex items-center px-6 py-2 bg-[#005B8E] text-white text-sm   shadow hover:bg-[#004f7a] transition-all">
        Selengkapnya →
      </button>
    </div>
  </div>
</section>


    </div>
  );
};

export default VisiMisi;
