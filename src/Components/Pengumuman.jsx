import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axiosInstance from '../lib/axios'
const Pengumuman = () => {
  const [pengumuman, setPengumuman] = useState([])
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await axiosInstance.get('/edukasi')
      if (error) console.error(error)
      else {
        setPengumuman(data)
        setLoading(false);}
    }

    fetchPengumuman()
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
    <>
      <div className="container mx-auto px-4 py-16 mt-16 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {pengumuman.map((item) => (
    <Link 
      to={`/edukasi/${item.id}`} 
      key={item.id} 
    >
      <ArticleCard
        id={item.id}
        title={item.title}
        description={item.description}
        image={`${API}${item.image_url}`}
      />
    </Link>
  ))}
</div>
    </div>
    </>
  )
}
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
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
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
export default Pengumuman