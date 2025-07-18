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
      

      {/* Header */}
      <header className="w-full">
        
        <div className="relative z-10 pt-10 " data-aos="fade-down">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <h2 className="text-1xl sm:text-2xl md:text-3xl font-bold text-Sage">
              <span className="text-Blue">
                Galeri PRIMA HEALTH
              </span>
            </h2>
          </div>
        </div>
      </div>
      </header>

      {/* Main Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
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
      <div className="text-center pt-4" >
          <Link to="/galeri">
          <button className="bg-Blue  px-8 py-3 rounded-lg hover:bg-Blue/80 transition-colors duration-200 font-medium">
          <div className="flex items-center text-WhitePPK space-x-2">
            <span>Semua Galeri</span>
            <FaArrowRight className="" />
          </div>
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default GaleriHome;