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
      <div className="flex flex-wrap justify-center gap-6">
  {pengumuman.map((item) => (
    <Link 
      to={`/edukasi/${item.id}`} 
      key={item.id} 
      className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] bg-white shadow-md  overflow-hidden transition-transform transform hover:scale-105"
    >
      <img 
        src={`${API}${item.image_url}`} 
        alt={item.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-gray-500 text-sm mb-2">{item.date}</div>
        <div className="flex flex-col">

        <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">{item.title}</h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {`${item.description.substring(0, 100)}...`}
        </p>
        </div>
      </div>
    </Link>
  ))}
</div>
    </div>
    </>
  )
}

export default Pengumuman