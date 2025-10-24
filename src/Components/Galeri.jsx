import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import SEO from './SEO';

const Galeri = () => {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchGaleri = async () => {
      const { data, error } = await axiosInstance.get('/galeri')
      if (error) console.error(error)
      else {
        setGaleri(data)
        setLoading(false);}
    };

    fetchGaleri();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-2">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading data, please wait…</p>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Galeri PrimaHealth",
    "description": "Koleksi foto kegiatan kesehatan dan edukasi PrimaHealth FK UM",
    "url": "https://primahealth.my.id/galeri",
    "image": galeri.map(item => ({
      "@type": "ImageObject",
      "url": `${API}${item.image_url}`,
      "name": item.nama,
      "description": item.deskripsi
    }))
  };

  return (
    <>
      <SEO 
        title="Galeri Kegiatan Kesehatan"
        description="Lihat koleksi foto kegiatan kesehatan, edukasi, dan program PrimaHealth FK Universitas Negeri Malang."
        keywords="galeri kesehatan, foto kegiatan kesehatan, PrimaHealth galeri, FK UM galeri, kegiatan mahasiswa kesehatan"
        url="/galeri"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-16 mt-16 max-w-6xl ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {galeri.map((item) => (
          <Link
            key={item.id}
            to={`/galeri/${item.id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={`${API}${item.image_url}` || 'https://via.placeholder.com/300x150?text=No+Image'}
              alt={item.kode_divisi}
              className="w-full h-fit object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              {/* <p className="text-sm text-gray-500">{item.deskripsi}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Galeri;
