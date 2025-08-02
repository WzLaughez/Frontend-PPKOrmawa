import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import Card from "./layout_user/Card";
import KategoriGulaDarah from "./Kategori/KategoriGulaDarah";

const GulaDarahUser = () => {
  const [dataGula, setDataGula] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil user_id dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const userId = auth?.user?.id;

  useEffect(() => {
    const fetchGula = async () => {
      try {
        const res = await axiosInstance.get(`/kesehatan/filter/gula_darah?user_id=${userId}`);
        setDataGula(res.data);
      } catch (error) {
        console.error("Gagal mengambil data gula darah:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchGula();
    }
  }, [userId]);

  const latest = dataGula.length > 0 ? dataGula[0] : {};

  // Format tanggal
  const formatTanggal = (tgl) =>
    tgl
      ? new Date(tgl).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "normal":
        return { bg: "bg-green-200", text: "text-green-800" };
      case "pradiabetes":
        return { bg: "bg-yellow-500", text: "text-yellow-800" };
      case "diabetes":
        return { bg: "bg-red-500", text: "text-red-200" };
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
        icon="/Group 35.svg"
        title="Gula Darah"
        value={latest?.gula_darah || '-'}
        unit="mg/dL"
        status={latest?.status_gula_darah || '-'}
        tipe={latest?.tipe_gula_darah || '-'}       
        date_latest={latest?.tanggal_pemeriksaan || '-'}
        statusColor={getStatusColor(latest?.status_gula_darah)}
        grafik="/Group 30.svg"
      />
        {/* Pemeriksaan Terakhir */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Pemeriksaan Gula <br/>Darah Terakhir
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Tanggal</span>
              <span className="text-sm text-gray-900 font-medium">{formatTanggal(latest?.tanggal_pemeriksaan)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Tipe Pemeriksaan</span>
              <span className="text-sm text-gray-900 font-medium capitalize">{latest?.tipe_gula_darah || '-'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-700">Gula Darah</span>
              <span className="text-sm text-gray-900 font-medium">{latest?.gula_darah || '-'} mg/dL</span>
            </div>

            <div className="flex justify-between py-2 pt-4">
              <span className="text-sm text-gray-700">Status</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(latest?.status_gula_darah).bg} ${getStatusColor(latest?.status_gula_darah).text}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
                {latest?.status_gula_darah || '-'}
              </span>
            </div>
          </div>
        </div>
</div>
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Memuat data...</p>
      ) : dataGula.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada data pemeriksaan.</p>
      ) : (
        <div className="w-full overflow-x-auto pt-4">
          <table className="w-full min-w-[600px] text-sm text-gray-700 border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border">Tanggal</th>
                <th className="px-4 py-3 border">Tipe Pemeriksaan</th>
                <th className="px-4 py-3 border">Gula Darah (mg/dL)</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataGula.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{formatTanggal(item.tanggal_pemeriksaan)}</td>
                  <td className="px-4 py-2 border capitalize">{item.tipe_gula_darah}</td>
                  <td className="px-4 py-2 border">{item.gula_darah}</td>
                  <td className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status_gula_darah).bg} ${getStatusColor(item?.status_gula_darah).text}`}>
                    {item.status_gula_darah}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-4">
        <KategoriGulaDarah />
      </div>
    </div>
  );
};

export default GulaDarahUser;
