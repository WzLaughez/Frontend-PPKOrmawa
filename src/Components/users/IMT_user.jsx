import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import KategoriIMT from "./Kategori/KategoriIMT";
import Card from "./layout_user/Card";


const IMT = () => {
  const [dataBMI, setDataBMI] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil user_id dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const userId = auth?.user?.id;

  useEffect(() => {
    const fetchBMI = async () => {
      try {
        const res = await axiosInstance.get(`/kesehatan/filter/bmi?user_id=${userId}`);
        setDataBMI(res.data);
      } catch (error) {
        console.error("Gagal mengambil data BMI:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBMI();
    }
  }, [userId]);

  const latest = dataBMI.length > 0 ? dataBMI[0] : {};
  
  // Ambil tanggal dan ubah formatnya bentuk dd/Month/yyyy
  const formattedDate = latest.tanggal_pemeriksaan
    ? new Date(latest?.tanggal_pemeriksaan).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

    // Mapping warna
    const getStatusColor = (bmi) => {
  if (!bmi || isNaN(bmi)) {
    return { bg: "bg-gray-200", text: "text-gray-600" };
  }

  const bmiValue = parseFloat(bmi);

  if (bmiValue < 18.5 ) {
    return { bg: "bg-blue-300", text: "text-blue-900" };
  } else if (bmiValue < 25) {
    return { bg: "bg-green-400", text: "text-green-900" };
  } else if (bmiValue < 30) {
    return { bg: "bg-yellow-300", text: "text-yellow-900" };
  } else {
    return { bg: "bg-red-500", text: "text-red-600" };
  }
};
const getStatusBMIColor = (status) => {
    switch (status?.toLowerCase()) {
      case "normal":
        return { bg: "bg-green-200", text: "text-green-800" };
      case "gemuk":
        return { bg: "bg-yellow-500", text: "text-yellow-800" };
      case "obesitas":
        return { bg: "bg-red-200", text: "text-red-800" };
      default:
        return { bg: "bg-gray-200", text: "text-gray-800" };
    }
  };

  return (
<div className="bg-WhitePPK shadow rounded-xl p-6 space-y-6">
  <div className="space-y-2">
    <h2 className="text-xl font-bold text-gray-800">Riwayat Pemeriksaan Indeks Masa Tubuh</h2>
    <p className="text-sm text-gray-500">Data pemeriksaan terakhir dan grafik perkembangan IMT Anda</p>
  </div>

  <div className="flex justify-center items-center space-x-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
    
      <Card
        icon="/BMI.png"
        title="Indeks Massa Tubuh"
        value={latest?.bmi || '-'}
        unit=""
        status={latest?.status_bmi || '-'}
        date_latest={formattedDate || '-'}
        statusColor={getStatusColor(latest?.bmi)}
        grafik="/Group 29.svg"
      />
   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
    Pemeriksaan IMT <br/> Terakhir
  </h3>
  
  <div className="space-y-3">
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">Tanggal</span>
      <span className="text-sm text-gray-900 font-medium">
        {latest?.tanggal_pemeriksaan || '-'}
      </span>
    </div>
    
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">Tinggi Badan</span>
      <span className="text-sm text-gray-900 font-medium">
        {latest?.tinggi_badan || '-'} {latest?.tinggi_badan && 'cm'}
      </span>
    </div>
    
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">Berat Badan</span>
      <span className="text-sm text-gray-900 font-medium">
        {latest?.berat_badan || '-'} {latest?.berat_badan && 'kg'}
      </span>
    </div>
    
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">BMI</span>
      <span className="text-sm text-gray-900 font-medium">
        {latest?.bmi || '-'}
      </span>
    </div>
    
    <div className="flex justify-between items-center py-2 pt-4">
      <span className="text-sm font-medium text-gray-700">Status</span>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(latest?.bmi).bg}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
        {latest?.status_bmi || '-'}
      </span>
    </div>
  </div>
</div>
  </div>
</div>


  {loading ? (
    <p className="text-gray-500 italic">Memuat data...</p>
  ) : dataBMI.length === 0 ? (
    <p className="text-gray-500 italic">Belum ada data pemeriksaan.</p>
  ) : (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px] text-sm text-gray-700 border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 border whitespace-nowrap">Tanggal</th>
            <th className="px-4 py-3 border whitespace-nowrap">Tinggi (cm)</th>
            <th className="px-4 py-3 border whitespace-nowrap">Berat (kg)</th>
            <th className="px-4 py-3 border whitespace-nowrap">BMI</th>
            <th className="px-4 py-3 border whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataBMI.map((item) => (
            <tr key={item.id} className="text-center hover:bg-gray-50 transition">
              <td className="px-4 py-2 border whitespace-nowrap">{item.tanggal_pemeriksaan}</td>
              <td className="px-4 py-2 border whitespace-nowrap">{item.tinggi_badan}</td>
              <td className="px-4 py-2 border whitespace-nowrap">{item.berat_badan}</td>
              <td className="px-4 py-2 border whitespace-nowrap">{item.bmi}</td>
              <td className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBMIColor(item?.status_bmi).bg}`}>{item.status_bmi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <div className="pt-4">
    <KategoriIMT />
  </div>
</div>

  

  );
};

export default IMT;
