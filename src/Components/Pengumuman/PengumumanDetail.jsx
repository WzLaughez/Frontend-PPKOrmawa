import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../lib/axios';

function PengumumanDetail() {
  const { id } = useParams(); // ID dari URL
  const API = import.meta.env.VITE_API_BASE_URL;
  const [pengumuman, setPengumuman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPengumuman = async () => {
      setLoading(true);
      const { data, error } = await axiosInstance.get(`/edukasi/${id}`);

      if (error) {
        setError('Edukasi tidak ditemukan.');
      } else {
        setPengumuman(data);
      }

      setLoading(false);
    };

    fetchPengumuman();
  }, [id]);


  if (error || !pengumuman) {
    return <p className="text-center text-red-500 mt-12">{error || 'Pengumuman tidak ditemukan.'}</p>;
  }

  return (
    <>
      <div className="mx-auto px-4 pt-24 bg-WhitePPK">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/edukasi" 
              className="bg-Blue text-white px-4 py-2 hover:bg-Blue-400 transition"
            >
              Kembali ke Daftar Edukasi
            </Link>
          </div>
          <div className="bg-white min-h-screen px-4 py-8 text-gray-800">
  <img 
    src={`${API}${pengumuman.image_url}`} 
    alt={pengumuman.title} 
    className="w-full h-full mb-6"
  />
  <h1 className="text-4xl font-bold mb-4 text-gray-900">
    {pengumuman.title}
  </h1>
  <div className="prose lg:prose-xl prose-slate">
    <p>{pengumuman.description}</p>
  </div>
</div>

        </div>
      </div>
    </>
  );
}

export default PengumumanDetail;
