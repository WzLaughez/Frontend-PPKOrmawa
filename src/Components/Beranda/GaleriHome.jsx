import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GaleriHomeGrid from './GaleriHomeGrid';
import { FaArrowRight  } from "react-icons/fa";
import supabase from '../admin/utils/supabaseClient'
import { Link } from 'react-router-dom';
const GaleriHome = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  const [galeri, setGaleri] = useState([])
    useEffect(() => {
      const fetchGaleri = async () => {
        const { data, error } = await supabase
          .from('subgaleri')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5) // Ambil 6 data terbaru
        if (error) console.error(error)
        else {
          setGaleri(data)
          setLoading(false);}
      }
  
      fetchGaleri()
    }, [])
    
    if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-2">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading data, please wait…</p>
    </div>
  )
}
  return (
    <div data-aos="fade-up" className="relative w-full">
      

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      {/* Header */}
      <header className="w-full">
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex justify-center text-center">
          <div className="mb-2">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-Peach via-purple-300 to-Peach text-transparent bg-clip-text leading-tight">
            Galeri
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Kumpulan foto-foto kegiatan BEM FK Universitas Negeri Malang
          </p>
        </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-2]">
  {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className="absolute w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 animate-neon-line"
      style={{
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        // optional override
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ))}
</div>
        <div className="max-w-6xl mx-auto">
          {loading ? (
  <div className="text-center py-10">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
    <p className="text-gray-500">Loading Galeri…</p>
  </div>
) : (
  <GaleriHomeGrid images={galeri} />
)}

        </div>
      </div>
      <div className="text-center mb-12" >
          <button className="bg-Peach  px-8 py-3 rounded-lg hover:bg-Peach/80 transition-colors duration-200 font-medium">
          <Link to="/galeri">
          <div className="flex items-center space-x-2">
            <span>View All Gallery</span>
            <FaArrowRight className="" />
          </div>
          </Link>
          </button>
          
        </div>
    </div>
  );
};

export default GaleriHome;