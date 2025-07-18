import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <div
      className="relative w-full font-poppins min-h-screen flex items-center justify-center"
      data-aos="fade-down"
    >
      {/* Decorative + Symbols */}
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <div className="absolute top-10 left-5 text-blue-100 text-4xl font-bold">+</div>
    <div className="absolute bottom-20 right-10 text-blue-100 text-5xl font-bold">+</div>
    <div className="absolute top-1/2 left-1/3 text-blue-50 text-3xl font-bold rotate-12">+</div>
    <div className="absolute bottom-10 left-1/4 text-purple-100 text-4xl font-bold">+</div>
  </div>

      <div className="absolute inset-0 block md:hidden">
        <img
          src="/Home.png"
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-60"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      </div>
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-32 py-16 bg-white md:bg-transparent max-w-7xl mx-auto w-full">
        {/* Text */}
        <div className="text-center md:text-left max-w-xl space-y-6">
      {/* Mobile Background Blur */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Digitalisasi Terpadu Desa <br /> Pandansari Lor
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Meningkatkan Kesehatan Masyarakat melalui Edukasi, Skrining, dan Pemantauan Berkelanjutan
          </p>
          <button className="bg-[#005B8E] hover:bg-[#004f7a] text-white font-medium py-3 px-6 shadow-md transition duration-300">
            Daftar Sekarang
          </button>
        </div>

        {/* Image for Desktop */}
        <div className="mt-10 md:mt-0 max-w-md hidden md:block">
          <img
            src="/Home.png"
            alt="Hero"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
