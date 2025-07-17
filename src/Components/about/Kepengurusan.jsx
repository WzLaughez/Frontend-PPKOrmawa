import React, { useState, useEffect } from 'react';
import { FaUser, FaUsers, FaBriefcase } from 'react-icons/fa'; // Import icons
import {  FaHandHoldingUsd, FaBalanceScale, FaFlask, FaBullhorn } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { VscCode } from "react-icons/vsc";
import supabase from '../admin/utils/supabaseClient';
const Kepengurusan = () => {
  const [President, setPresident] = useState([]);
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);
  // President
    useEffect(() => {
    const fetchPresident = async () => {
      const { data, error } = await supabase.from('pengurus_utama').select('*')
  .in('jabatan', ['Presiden BEM', 'Wakil Presiden BEM']).order('jabatan', { ascending: true });
      if (error) {
        console.error(error);
      } else {
        setPresident(data); // data = [{jabatan, nama, foto_url}, ...]
      }
      setLoading(false);
    };
    fetchPresident();
  }, []);
    useEffect(() => {
    const fetchPengurus = async () => {
      const { data, error } = await supabase.from('pengurus_utama').select('*')
      .filter('jabatan', 'not.in', '("Presiden BEM","Wakil Presiden BEM")')
      .order('jabatan', { ascending: true });
      if (error) {
        console.error(error);
      } else {
        setPengurus(data); // data = [{jabatan, nama, foto_url}, ...]
      }
      setLoading(false);
    };
    fetchPengurus();
  }, []);

  const [menteri, setMenteri] = useState([]);
  useEffect(() => {
    const fetchMenteri = async () => {
      const { data, error } = await supabase.from('menteri').select('*');
      if (error) {
        console.error(error);
      } else {
        setMenteri(data); 
      }
    };
    fetchMenteri();
  }, []);
  
  const [divisiData, setDivisiData] = useState([]);
  useEffect(() => {
    const fetchDivisi = async () => {
      const { data, error } = await supabase
        .from('divisi')
        .select(`*, anggota_divisi(*)`); // ambil relasi anggota_divisi sekaligus

      if (error) {
        console.error(error);
      } else {
        setDivisiData(data); // simpan ke state
      }
    };
    fetchDivisi();
  }, []);


  const logo = {
    ADINOVA: <FaUsers size={20} />, 
    KRENOVA: <FaHandHoldingUsd size={20} />, 
    INOVIA: <FaBalanceScale size={20} />, 
    AKSARA: <FaBalanceScale size={20} />, 
    PENGMAS: <FaBalanceScale size={20} />, 
    RIDIKPRO: <VscCode size={20} />, 
    INFOKOM: <FaBullhorn size={20} />,
    };
  const [activeDivisi, setActiveDivisi] = useState('ADINOVA');
  const currentDivisi = divisiData.find((d) => d.kode_divisi === activeDivisi);

const PersonCard = ({ name, position, photoUrl, logo }) => {
  return (
    <div className="w-64 rounded-xl overflow-hidden shadow-lg bg-black text-white transform hover:scale-[1.02] transition duration-300">
      {/* Foto Section */}
      <div className="relative h-full w-full bg-gray-900">
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Logo Watermark (Opsional) */}
        <img
          src={logo} // ganti ke logo watermark transparan
          alt="logo"
          className="absolute bottom-4 right-4 w-12 opacity-90"
        />
      </div>

      {/* Teks Section */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold leading-snug">{name}</h3>
        <p className="text-sm italic text-gray-300 mt-1">{position}</p>
      </div>
    </div>
  );
};

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
  <div className="relative z-0 min-h-screen bg-gradient-to-t from-Sage via-[#203a43] to-transparent overflow-x-hidden overflow-y-visible pb-16">
    {/* Neon Background Orbs */}
    <div className="absolute top-1/4 left-10 w-96 h-96 bg-Peach rounded-full blur-3xl opacity-20 animate-pulse mix-blend-screen"></div>
    <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FFD6A5] rounded-full blur-3xl opacity-20 animate-pulse delay-1000 mix-blend-screen"></div>

    <div className="container mx-auto relative z-10 md:p-8 max-w-6xl">
      {/* President - Responsive Grid */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Object.values(President).map((person, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center"
          >
            <PersonCard
              name={person.nama}
              position={person.jabatan}
              photoUrl={person.foto_url} 
              logo="/Logo_Kabinet.png" 
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Inti - Responsive Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Object.values(pengurus).map((person, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center"
          >
            <PersonCard
              name={person.nama}
              position={person.jabatan}
              photoUrl={person.foto_url}
              logo="/Logo_Kabinet.png"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Menteri */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Object.values(menteri).map((person, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center"
          >
            <PersonCard
              name={person.nama}
              position={person.jabatan}
              photoUrl={person.foto_url}
              logo="/Logo_Kabinet.png"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Divisi Navigation */}
      <nav className="mb-4">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
          {divisiData.map((divisi) => (
            <li
              key={divisi.kode_divisi}
              className={`group relative px-3 py-1 md:px-4 md:py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out text-sm md:text-base ${
                activeDivisi === divisi.kode_divisi
                  ? 'bg-white/20 text-white font-semibold shadow-inner backdrop-blur-sm'
                  : 'hover:bg-white/10 text-white/80 hover:text-white hover:shadow-md'
              }`}
              onClick={() => setActiveDivisi(divisi.kode_divisi)}
            >
              <span className="flex items-center gap-2 relative">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {logo[divisi.kode_divisi]}
                </span>
                <span className="transition-all duration-300 origin-left">
                  {divisi.kode_divisi}
                </span>
              </span>
              {activeDivisi !== divisi.kode_divisi && (
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A0FFDA] transition-all duration-300 group-hover:w-full" />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Divisi Detail */}
      <AnimatePresence mode='wait'>
        {currentDivisi && (
          <motion.div
            key={currentDivisi.id}
            className="text-center p-2 md:p-8 m-4 md:m-4 rounded-lg shadow-md bg-Peach/5 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#A0FFDA]">
              {currentDivisi.nama}
            </h2>
            <p className="mb-6 max-w-3xl mx-auto text-sm md:text-base text-white/80">
              {currentDivisi.deskripsi}
            </p>

            {/* Ketua Divisi */}
            <motion.div className="mb-8">
              {currentDivisi.ketua_foto_url ? (
                <img
                  src={currentDivisi.ketua_foto_url}
                  alt={currentDivisi.ketua_nama}
                  className="mx-auto mb-2 w-32 h-32 md:w-40 md:h-40 object-contain rounded-full shadow-lg border-2 border-[#A0FFDA]"
                />
              ) : (
                <FaBriefcase className="h-24 w-24 md:h-40 md:w-40 mx-auto mb-2 text-gray-500" />
              )}
              <h3 className="font-semibold text-sm md:text-base text-white">
                {currentDivisi.ketua_nama}
              </h3>
            </motion.div>

            {/* Anggota Divisi */}
            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {currentDivisi.anggota_divisi.map((anggota) => (
              <motion.div
                key={anggota.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: anggota.id * 0.1 }}
                className="flex items-center justify-center"
              >
            <PersonCard
              name={anggota.nama}
              position={anggota.jabatan}
              photoUrl={anggota.foto_url} 
              logo="/Logo_Kabinet.png" 
            />
              </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</>

  );
};

export default Kepengurusan;