import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import supabase from '../admin/utils/supabaseClient';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import VideoProfil from './VideoProfil';

const ArticleCard = ({ id, title, description, image }) => {
  return (
        <Link
          to={`/pengumuman/${id}`}
          // className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
        >
    <div className="bg-white  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow text-sm">{description.substring(0, 150)}...</p>
          <div className="text-blue-600 font-medium mt-4 inline-flex items-center group ">
          Selengkapnya <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
      </div>
    </div>
        </Link>
  );
};

const ArticleSection = () => {
  const [pengumuman, setPengumuman] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from('pengumuman')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (error) console.error(error);
      else setPengumuman(data);
    };

    fetchPengumuman();
  }, []);

  return (
    <div className="relative py-12 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto" data-aos="fade-up">
      {/* Decorative + Symbols */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute top-10 left-5 text-blue-100 text-4xl font-bold">+</div>
    <div className="absolute bottom-20 right-10 text-blue-100 text-5xl font-bold">+</div>
    <div className="absolute top-1/2 left-1/3 text-blue-50 text-3xl font-bold rotate-12">+</div>
    <div className="absolute bottom-10 left-1/4 text-purple-100 text-4xl font-bold">+</div>
  </div>
      {/* Heading & Banner */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold font-dmsans text-gray-800">
          Edukasi Untuk Pengetahuan <span className="text-Yellow">Diabetes</span> dan <span className="text-Blue">Hipertensi</span>
        </h2>
        <div className="my-6">
          <VideoProfil/>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pengumuman.map((item) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.content}
            image={item.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;
