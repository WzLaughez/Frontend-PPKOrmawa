import React, { useEffect, useState } from 'react';
import supabase from '../admin/utils/supabaseClient';
import { Link, useParams } from 'react-router-dom';

const SubGaleri = () => {
  
  const { divisi_id } = useParams();
  const [subGaleri, setSubGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubGaleri = async () => {
      const { data, error } = await supabase
        .from('galeri_divisi')
        .select(`
          id,
          deskripsi,
          image_url
        `)
        .eq('divisi_id', divisi_id); // image_url opsional, tambahkan jika ada

      if (error) console.error(error);
      else {
        setSubGaleri(data);
        setLoading(false);
      }
    }

    fetchSubGaleri();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-2">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading data, please wait…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16 max-w-6xl">
      <div className="mb-6">
        <Link 
          to={`/galeri`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Kembali ke Galeri
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subGaleri.map((item) => (
          <Link
            key={item.id}
            to={`/galeri/${divisi_id}/${item.id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.image_url || 'https://via.placeholder.com/300x150?text=No+Image'}
              alt={item.deskripsi}
              className="w-full h-36 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.deskripsi}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubGaleri;
