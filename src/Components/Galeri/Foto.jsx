import React, { useEffect, useState } from 'react';
import supabase from '../admin/utils/supabaseClient';
import { Link, useParams } from 'react-router-dom';

const Foto = () => {
  
  const { divisi_id, galeri_id } = useParams();
  const [Foto, setFoto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoto = async () => {
      const { data, error } = await supabase
        .from('subgaleri')
        .select(`
          id,
          nama_kegiatan,
          tanggal_kegiatan,
          image_url
        `)
        .eq('galeri_id', galeri_id); // image_url opsional, tambahkan jika ada

      if (error) console.error(error);
      else {
        setFoto(data);
        setLoading(false);
      }
    }

    fetchFoto();
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
  {/* Tombol Kembali */}
  <div className="mb-6">
    <Link
      to={`/galeri/${divisi_id}`}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Kembali ke sub Kegiatan
    </Link>
  </div>

  {/* Judul */}
  <h2 className="text-2xl font-bold text-center text-Peach mb-8">
    Foto Kegiatan
  </h2>

  {/* Grid Foto */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {Foto.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={item.image_url || 'https://via.placeholder.com/300x150?text=No+Image'}
          alt={item.nama_kegiatan || 'Foto Kegiatan'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-800 text-center">
          {item.nama_kegiatan}
        </h3>
      </div>
    </div>
  ))}
</div>

</div>

  );
};

export default Foto;
