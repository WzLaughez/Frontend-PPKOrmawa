import React, { useEffect, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import VideoProfil from './VideoProfil';
import FotoKetua from './FotoKetua';
import { Link } from 'react-router';

const Kabinet = () => {
  useEffect(() => {
      AOS.init({
        duration: 1200, // Animation duration in milliseconds
        once: false, // Run animation only once
      });
    }, []);
    
  const [hoverKabinet, setHoverKabinet] = useState(false);
  const [hoverGaya, setHoverGaya] = useState(false);
  return (
  <div className="relative min-h-[15vh] w-full " data-aos ="fade-down">
    {/* Content */}
    <div className="relative min-h-screen p-8 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-Sage via-gray-900 to-Sage overflow-hidden">
      
      <VideoProfil/>
  {/* Background decorative elements */}
  
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-SweetDaisy rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-Peach rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-SweetDaisy rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
  </div>

  {/* Header Section */}
  <div className="relative z-10 flex flex-col items-center justify-center mb-7" data-aos="fade-down">
    <div className="group mb-8 mt-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src="/Logo_Kabinet.png"
          alt="Kabinet Logo"
          className="relative w-28 h-auto drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
    
    <div className="relative">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 max-w-5xl leading-tight">
        <span className="bg-gradient-to-r from-SweetDaisy via-Peach to-SweetDaisy bg-clip-text text-transparent">
          <Typewriter
            words={['KABINET ARUNIKA NAWASENA']}
            cursor={false}
            cursorStyle="_"
            typeSpeed={70}
          />
        </span>
      </h1>
      <div className="h-1 w-32 bg-gradient-to-r from-SweetDaisy to-Peach mx-auto rounded-full"></div>
    </div>
  </div>

  {/* Hero Image Section */}
  <div className="relative z-10 w-full max-w-6xl mb-16" data-aos="fade-up">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-SweetDaisy to-Peach rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
      <Link to="/about" className="relative block">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img 
            src="/background_gaya.JPG"
            alt="Kabinet Background"
            className="w-full h-[50vh] md:h-[70vh] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-Sage/60 via-transparent to-transparent"></div>
          
          {/* Floating action button */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>

  {/* Info Cards Section */}
  <div className="relative z-10 w-full max-w-6xl" data-aos="fade-up" data-aos-delay="200">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
      
      {/* Philosophy Card */}
      <Link to="/about" className="group relative">
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-SweetDaisy/20 hover:bg-SweetDaisy/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-SweetDaisy/20 to-Peach/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-SweetDaisy to-Peach rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <img 
                src="/Logo_Hijau.png" 
                alt="Philosophy Logo" 
                className="relative w-20 h-20 object-cover rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-SweetDaisy transition-colors duration-300">
                Filosofi Logo
              </h3>
              <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                Temukan makna mendalam di balik identitas visual Kabinet kami
              </p>
              
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-SweetDaisy opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Pelajari lebih lanjut</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Ministry Card */}
      <Link to="/about" className="group relative">
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-SweetDaisy/20 hover:bg-SweetDaisy/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-Peach/20 to-SweetDaisy/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-Peach to-SweetDaisy rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <img 
                src="/background_gaya.JPG" 
                alt="Ministry Background" 
                className="relative w-20 h-20 object-cover rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-Peach transition-colors duration-300">
                Kementerian
              </h3>
              <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                Jelajahi struktur organisasi dan tim yang menggerakkan visi kami
              </p>
              
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-Peach opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Lihat tim kami</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>

</div>
  </div>
  )
}

export default Kabinet