import React from 'react'

const FotoKetua = () => {
  return (
    <div className="flex justify-between items-center space-x-6 p-6 ">
      <div className="w-1/3 text-right  p-4 rounded-lg ">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Muhammad Revi Purnomosidi</h2>
        <p className="text-gray-600 mb-2">@revi_purnomosidi</p>
        <h3 className="text-lg font-semibold text-green-700 mb-3">Ketua BEM FK UM</h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          Selamat datang di Website Badan Eksekutif Mahasiswa FK Universitas Muhammadiyah Malang Kabinet Arunika Nawasena
        </p>
      </div>
      <img 
        src="/ketua_bg.png" 
        alt="Centered image" 
        className="w-1/3 h-auto "
      />
      <div className="w-1/3 text-left  p-4 rounded-lg ">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Taurisma Aulia</h2>
      <p className="text-gray-600 mb-2">@taurismaaulia</p>
      <h3 className="text-lg font-semibold text-green-700 mb-3">Wakil Ketua BEM FK UM</h3>
      <p className="text-sm text-gray-800 leading-relaxed">
        Selamat datang di Website Badan Eksekutif Mahasiswa FK Universitas Muhammadiyah Malang Kabinet Arunika Nawasena
      </p>
    </div>
    </div>
  )
}

export default FotoKetua