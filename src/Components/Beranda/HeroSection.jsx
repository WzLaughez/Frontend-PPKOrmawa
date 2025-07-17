import React, { useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const HeroSection = () => {
  useEffect(() => {
      AOS.init({
        duration: 1200, // Animation duration in milliseconds
        once: false, // Run animation only once
      });
    }, []);
  return (
  <div className="relative min-h-screen  w-full font-poppins max-w-7xl mx-auto pt-16" data-aos ="fade-down">
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-32 py-16 bg-white">
      {/* Text */}
      <div className="text-center md:text-left max-w-xl space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Digitalisasi Terpadu Desa <br /> Pandansari Lor
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Meningkatkan Kesehatan Masyarakat melalui Edukasi, Skrining, dan Pemantauan Berkelanjutan
        </p>
        <button className="bg-[#005B8E] hover:bg-[#004f7a] text-white font-medium py-3 px-6  shadow-md transition duration-300">
          Daftar Sekarang
        </button>
      </div>

      {/* Image */}
      <div className="mt-10 md:mt-0 max-w-md">
        <img
          src="/Logo_Hijau.png" // Ganti ini dengan path image kamu
          alt="Happy Student"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  </div>
  )
}

export default HeroSection