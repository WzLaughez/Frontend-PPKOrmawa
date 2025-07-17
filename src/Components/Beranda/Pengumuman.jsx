import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import supabase from '../admin/utils/supabaseClient'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const ArticleCard = ({ id, title, date, description, image }) => {
  return (
    
        <Link
          to={`/pengumuman/${id}`}
          className="text-Peach hover:text-Sage font-medium transition-colors duration-300 mt-auto"
        >
          
    <div className="relative bg-white/100 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,175,145,0.3)]">
      
      {/* Glow border layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-Peach/30 to-SweetDaisy/30 blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-0" />

      {/* Image */}
      <div className="aspect-w-16 aspect-h-9 relative z-10">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow z-10">
        <div className="text-sm text-gray-500 mb-2">{date}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-Sage transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {`${description.substring(0, 100)}...`}
        </p>
        
          <p className="text-gray-600 flex-grow">
            Read More →
            </p>
      </div>
    </div>
        </Link>
  );
};


const ArticleSection = () => {
  const [pengumuman, setPengumuman] = useState([])
  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from('pengumuman')
        .select('*')
        .order('date', { ascending: false })
        .limit(3)
      if (error) console.error(error)
      else {
        setPengumuman(data)}
    }

    fetchPengumuman()
  }, [])
  
  return (
    <div className="py-8 mt-4" data-aos="fade-up">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-4xl px-6 sm:px-6 lg:px-8 py-4 flex justify-center text-center">
          <div className="mb-3">
            <h4 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-Peach via-purple-300 to-Peach text-transparent bg-clip-text pb-2">
              Pengumuman
            </h4>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-6 text-lg">
              Dapatkan Informasi Terbaru Seputar Kegiatan BEM FK Universitas Negeri Malang
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pengumuman.map((article, index) => {
            const animation = index % 3 === 1 ? "fade-down" : "fade-right";
            
            return (
              <div
                key={article.id}
                data-aos={animation}
                data-aos-duration="10000"
                className="h-full"
              >
                <ArticleCard 
                  id={article.id}
                  title={article.title}
                  date={article.date}
                  description={article.content}
                  image={article.image_url}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
            <Link to="/pengumuman">
          <button className="bg-Peach px-8 py-3 rounded-lg hover:bg-Peach/60 transition-colors duration-200 font-medium">
              <div className="flex items-center space-x-2">
                <span>View All Announcement</span>
                <FaArrowRight />
              </div>
          </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;