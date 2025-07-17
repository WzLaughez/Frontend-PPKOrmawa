import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../admin/utils/supabaseClient';
import TitleKarya from './TitleKarya';

function KaryaDetail() {
  const { id } = useParams(); // ID dari URL
  const [karya, setKarya] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKarya = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('karya tidak ditemukan.');
      } else {
        setKarya(data);
      }

      setLoading(false);
    };

    fetchKarya();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-12">Memuat...</p>;
  }

  if (error || !karya) {
    return <p className="text-center text-red-500 mt-12">{error || 'Karya tidak ditemukan.'}</p>;
  }

  return (
    <>
      <TitleKarya />
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/karya" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Kembali ke Daftar Karya
            </Link>
          </div>
          <div className="bg-white min-h-screen px-4 py-8 text-gray-800">
  <img 
    src={karya.image_url} 
    alt={karya.title} 
    className="w-full h-96 object-cover rounded-lg mb-6"
  />
  <h1 className="text-4xl font-bold mb-4 text-gray-900">
    {karya.title}
  </h1>
  <p className="text-gray-600 mb-4">
    {new Date(karya.date).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    })}
  </p>
  <div className="prose lg:prose-xl prose-slate">
    <p>{karya.content}</p>
  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default KaryaDetail;
