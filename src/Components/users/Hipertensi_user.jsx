import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import Card from "./layout_user/Card";
import KategoriHipertensi from "./Kategori/KategoriHipertensi";

const HipertensiUser = () => {
  const [dataTekananDarah, setDataTekananDarah] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil user_id dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const userId = auth?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/kesehatan/filter/tekanan_darah?user_id=${userId}`);
        setDataTekananDarah(res.data);
      } catch (error) {
        console.error("Gagal mengambil data gula darah:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const latest = dataTekananDarah.length > 0 ? dataTekananDarah[0] : {};

  // Format tanggal
  const formatTanggal = (tgl) =>
    tgl
      ? new Date(tgl).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const getStatusTekananColor = (status) => {
  switch (status?.toLowerCase()) {
    case "normal":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "pra-hipertensi":
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "hipertensi tahap 1":
      return { bg: "bg-orange-100", text: "text-orange-700" };
    case "hipertensi tahap 2":
      return { bg: "bg-red-100", text: "text-red-700" };
    case "krisis hipertensi":
      return { bg: "bg-red-200", text: "text-red-800" };
    default:
      return { bg: "bg-gray-200", text: "text-gray-800" };
  }
};


  return (
    <div className="bg-WhitePPK shadow rounded-xl p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-800">Riwayat Pemeriksaan Gula Darah</h2>
        <p className="text-sm text-gray-500">Data pemeriksaan terakhir dan grafik perkembangan gula darah Anda</p>
      </div>
<div className="flex justify-center items-center space-x-10">
      <div className="grid sm:grid-cols-2 gap-4">
        <Card
          icon="/Group 31.svg"
          title="Tekanan Darah"
          value={`${latest?.tekanan_sistolik || '-'} / ${latest?.tekanan_diastolik || '-'}`}
          unit="mmHg"
          status={latest?.status_tekanan_darah || '-'}
          date_latest={latest?.tanggal_pemeriksaan || '-'}
          statusColor={getStatusTekananColor(latest?.status_tekanan_darah)}
          grafik="/Group 11.svg"
        />
        {/* Pemeriksaan Terakhir */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Pemeriksaan Tekanan <br/> 
                Darah Terakhir
            </h3>
            <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">Tanggal</span>
            <span className="text-sm text-gray-900 font-medium    capitalize">{formatTanggal(latest?.tanggal_pemeriksaan)}</span>
            </div>
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-700">Sistolik / Diastolik</span>
      <span className="text-sm text-gray-900 font-medium">
        {latest?.tekanan_sistolik} / {latest?.tekanan_diastolik} mmHg
      </span>
    </div>

    <div className="flex justify-between py-2 pt-4">
      <span className="text-sm text-gray-700">Status</span>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusTekananColor(latest?.status_tekanan_darah).bg} ${getStatusTekananColor(latest?.status_tekanan_darah).text}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
        {latest?.status_tekanan_darah || '-'}
      </span>
    </div>
  </div>
</div>

</div>
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Memuat data...</p>
      ) : dataTekananDarah.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada data pemeriksaan.</p>
      ) : (
        <div className="w-full overflow-x-auto pt-4">
          <table className="w-full min-w-[600px] text-sm text-gray-700 border border-gray-200 rounded-lg">
  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
    <tr>
      <th className="px-4 py-3 border">Tanggal</th>
      <th className="px-4 py-3 border">Sistolik / Diastolik</th>
      <th className="px-4 py-3 border">Status</th>
    </tr>
  </thead>
  <tbody>
    {dataTekananDarah.map((item) => (
      <tr key={item.id} className="text-center hover:bg-gray-50">
        <td className="px-4 py-2 border">{formatTanggal(item.tanggal_pemeriksaan)}</td>
        <td className="px-4 py-2 border">{item.tekanan_sistolik} / {item.tekanan_diastolik}</td>
        <td className={`px-4 py-2 border`}>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusTekananColor(item?.status_tekanan_darah).bg} ${getStatusTekananColor(item?.status_tekanan_darah).text}`}>
            {item.status_tekanan_darah}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}

      <div className="pt-4">
        <KategoriHipertensi />
      </div>
    </div>
  );
};

export default HipertensiUser;
