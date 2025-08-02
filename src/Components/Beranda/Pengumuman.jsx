import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import axiosInstance from '../../lib/axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import VideoProfil from './VideoProfil';

const ArticleCard = ({ id, title, description, image }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-blue-300/50 rounded-tl-2xl z-10"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-yellow-300/50 rounded-br-2xl z-10"></div>
        
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-600/10 z-10"></div>
          <img 
            src={image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"} 
            alt={title} 
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* Floating Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg z-20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-800">Edukasi</span>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full z-20">
            <span className="font-medium">Edukasi</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 flex-grow text-sm leading-relaxed mb-4">
            {description ? `${description.substring(0, 150)}...` : "Pelajari lebih lanjut tentang topik kesehatan penting ini untuk meningkatkan kualitas hidup Anda."}
          </p>
          
          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <div className="text-blue-600 font-semibold text-sm inline-flex items-center group-hover:text-blue-700 transition-colors duration-300">
              Selengkapnya 
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Reading Time */}
            <div className="flex items-center text-xs text-gray-400">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
              </svg>
              5 min
            </div>
          </div>
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

const ArticleSection = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPengumuman = async () => {
      const { data, error } = await axiosInstance
        .get('/edukasi/limit3');

      if (error) console.error(error);
      else setPengumuman(data);
    };

    fetchPengumuman();
  }, []);

  return (
    <div className="relative py-12 px-4 md:px-10 lg:px-20 font-dmsans max-w-8xl mx-auto " data-aos="fade-up">
      {/* Animated Background Elements */}
      <div className="absolute z-0 inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-100/20 to-emerald-100/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Enhanced Heading & Banner */}
        <div className="text-center mb-10" data-aos="fade-down">
          <div className="relative inline-block">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-blue-400/30 rounded-tl-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-yellow-400/30 rounded-br-3xl"></div>
            
            <div className="relative  backdrop-blur-sm rounded-3xl p-5  max-w-4xl">
              <h2 className="text-xl md:text-3xl font-bold leading-tight mb-6">
                <span className="text-gray-800">Edukasi Untuk Pengetahuan </span>
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Diabetes</span>
                <span className="text-gray-800"> dan </span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Hipertensi</span>
              </h2>
              
              {/* Animated Underline */}
              <div className="relative mx-auto w-56 h-2 ">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-yellow-500 to-cyan-500 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-yellow-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              
            </div>
          </div>
        </div>
              {/* Video Profile Component */}
              <VideoProfil />

      {/* Cards */}
      
            <div className="text-center mb-6 mt-4" data-aos="fade-down">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan informasi terkini tentang pencegahan dan penanganan diabetes serta hipertensi
            </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" data-aos="fade-down">
        {pengumuman.map((item) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={`${API}${item.image_url}`}
          />
        ))}
      </div>
      <div className="text-center mt-12">
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative flex items-center">
                Lihat Semua Artikel
                <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
    </div>
  );
};

export default ArticleSection;
