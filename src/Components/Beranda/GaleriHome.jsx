import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GaleriHomeGrid from './GaleriHomeGrid';
import { FaArrowRight  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axiosInstance from '../../lib/axios';

const GaleriHome = () => {
  const [loading, setLoading] = useState(true);
  const [galeri, setGaleri] = useState([])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    const fetchGaleri = async () => {
      const { data, error } = await 
      axiosInstance.get('/subgaleri/latest');
      if (error) {
        console.error('Error fetching galeri:', error);
      } else {
        setGaleri(data);
        setLoading(false);
      }
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
       {/* Enhanced Heading & Banner */}
        <header className="text-center  mt-12" data-aos="fade-down">
          <div className="relative inline-block">
            {/* Decorative Elements */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-l-4 border-t-4 border-blue-400/30 rounded-tl-3xl"></div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-4 border-b-4 border-yellow-400/30 rounded-br-3xl"></div>
            
            <div className="relative  backdrop-blur-sm rounded-3xl p-4  max-w-4xl">
              <h2 className="text-xl md:text-3xl font-bold  leading-tight ">
                <span className="text-Blue">Galeri PrimaHealth </span>
                </h2>
              
              
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