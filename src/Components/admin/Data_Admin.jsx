import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload, FaPlus, FaRegCreditCard } from "react-icons/fa";
const Data_Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchNama, setSearchNama] = useState(""); // 🔍 state untuk search nama
  const currentYear = new Date().getFullYear();
  const [sortOrder, setSortOrder] = useState(null); // null | "asc" | "desc"

  const currentMonth = new Date().getMonth() + 1;
  const navigate = useNavigate();
  const [dataKesehatan, setDataKesehatan] = useState([]);
  const [tahun, setTahun] = useState(currentYear);
  const [bulan, setBulan] = useState(null);
  const [filterBMI, setFilterBMI] = useState("");
  const [filterGula, setFilterGula] = useState("");
  const [filterTekanan, setFilterTekanan] = useState("");

  const fetchData = async () => {
    try {
      const endpoint = bulan === null
        ? `/kesehatan/bymonth?year=${tahun}`
        : `/kesehatan/bymonth?year=${tahun}&month=${bulan}`;
      const response = await axiosInstance.get(endpoint);
      setDataKesehatan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    if (tahun) {
      fetchData();
    }
  }, [tahun, bulan]);

  // Delete function
  const handleDeleteClick = (id) => {
  setSelectedId(id);
  setShowModal(true);
};
  const confirmDelete = async () => {
  try {
    await axiosInstance.delete(`/kesehatan/${selectedId}`);
    toast.success("Data berhasil dihapus");
    setDataKesehatan((prev) => prev.filter((item) => item.id !== selectedId));
  } catch (error) {
    console.error("Gagal menghapus data:", error);
  } finally {
    setShowModal(false);
    setSelectedId(null);
  }
};

  const daftarTahun = [currentYear, currentYear - 1, currentYear - 2];
  const daftarBulan = [
    { label: "Semua Bulan", value: null },
    { label: "Januari", value: 1 },
    { label: "Februari", value: 2 },
    { label: "Maret", value: 3 },
    { label: "April", value: 4 },
    { label: "Mei", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Agustus", value: 8 },
    { label: "September", value: 9 },
    { label: "Oktober", value: 10 },
    { label: "November", value: 11 },
    { label: "Desember", value: 12 },
  ];

  // Pagination logic
  useEffect(() => {
  setCurrentPage(1);
}, [searchNama, filterBMI, filterGula, filterTekanan, bulan, tahun]);// Pagination + Filtering (baru)
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 15;
const handleSortNama = () => {
  setSortOrder((prev) => {
    if (prev === "asc") return "desc";
    if (prev === "desc") return null; // klik lagi -> kembali ke default (tanpa sorting)
    return "asc";
  });
};


// 1) Filter GLOBAL ke seluruh data
let filteredData = dataKesehatan.filter((item) => {
  const matchBMI = !filterBMI || item.status_bmi?.toLowerCase() === filterBMI;
  const matchGula = !filterGula || item.status_gula_darah?.toLowerCase() === filterGula;
  const matchTekanan = !filterTekanan || item.status_tekanan_darah?.toLowerCase() === filterTekanan;
  const matchNama =
    !searchNama ||
    item.user?.nama?.toLowerCase().includes(searchNama.toLowerCase());

  return matchBMI && matchGula && matchTekanan && matchNama;
});

// >>> Tambahkan sorting disini
if (sortOrder === "asc") {
  filteredData = [...filteredData].sort((a, b) =>
    (a.user?.nama || "").localeCompare(b.user?.nama || "")
  );
} else if (sortOrder === "desc") {
  filteredData = [...filteredData].sort((a, b) =>
    (b.user?.nama || "").localeCompare(a.user?.nama || "")
  );
}

// 2) Hitung total halaman dari data yang SUDAH difilter
const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

// 3) Slice untuk halaman saat ini
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// 4) Data yang dirender di tabel
const filteredItems = currentItems;



  // Download Excel function
  const handleDownloadExcel = () => {
  if (dataKesehatan.length === 0) {
    toast.warn("Data masih kosong.");
    return;
  }

  const dataToExport = dataKesehatan.map((item, index) => ({
    No: index + 1,
    Tanggal: item.tanggal_pemeriksaan,
    Nama: item.user?.nama || "-",
    "Tinggi Badan (cm)": item.tinggi_badan,
    "Berat Badan (Kg)": item.berat_badan,
    BMI: item.status_bmi || "-",
    "Tipe Gula Darah": item.tipe_gula_darah || "-",
    "Gula Darah (mg/dL)": item.gula_darah || "-",
    "Status Gula": item.status_gula_darah || "-",
    "Tekanan Darah (mmHg)": `${item.tekanan_sistolik}/${item.tekanan_diastolik}`,
    "Status Tekanan": item.status_tekanan_darah || "-",
    Catatan: item.catatan || "-"
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kesehatan");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(file, `data_kesehatan_${tahun}${bulan ? "_" + bulan : ""}.xlsx`);
};
const getStatusColor = (status, category) => {
  const key = status?.toLowerCase();

  const colorMap = {
    gula_darah: {
      normal: { bg: "bg-green-200", text: "text-green-800" },
      pradiabetes: { bg: "bg-yellow-500", text: "text-yellow-800" },
      diabetes: { bg: "bg-red-500", text: "text-red-200" },
    },
    tekanan_darah: {
      normal: { bg: "bg-green-100", text: "text-green-700" },
      "pra-hipertensi": { bg: "bg-yellow-100", text: "text-yellow-700" },
      "hipertensi tahap 1": { bg: "bg-orange-100", text: "text-orange-700" },
      "hipertensi tahap 2": { bg: "bg-red-100", text: "text-red-700" },
      "hipertensi sistolik terisolasi": { bg: "bg-red-200", text: "text-red-800" },
    },
    bmi: {
      normal: { bg: "bg-green-200", text: "text-green-800" },
      gemuk: { bg: "bg-yellow-500", text: "text-yellow-800" },
      obesitas: { bg: "bg-red-200", text: "text-red-800" },
    },
  };

  return colorMap[category]?.[key] || { bg: "bg-gray-200", text: "text-gray-800" };
};

  return (
    <div className="p-6 bg-WhitePPK min-h-screen w-full space-y-4 shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Data Pemeriksaan Kesehatan</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
  {/* Filter Tahun & Bulan */}
  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
    <div className="w-full sm:w-auto">
      <label className="block text-sm font-medium">Tahun</label>
      <select
        className="border rounded px-3 py-2 w-full sm:w-auto"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
      >
        <option disabled value="">
          Pilih Tahun
        </option>
        {daftarTahun.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>

    <div className="w-full sm:w-auto">
      <label className="block text-sm font-medium">Bulan</label>
      <select
        className="border rounded px-3 py-2 w-full sm:w-auto"
        value={bulan === null ? "" : bulan}
        onChange={(e) => {
          const val = e.target.value;
          setBulan(val === "" ? null : parseInt(val));
        }}
      >
        {daftarBulan.map((b) => (
          <option key={b.label} value={b.value === null ? "" : b.value}>
            {b.label}
          </option>
        ))}
      </select>
    </div>
    <div>
    <label className="block text-sm font-medium">Status BMI</label>
    <select
      value={filterBMI}
      onChange={(e) => setFilterBMI(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Semua</option>
      <option value="normal">Normal</option>
      <option value="gemuk">Gemuk</option>
      <option value="obesitas">Obesitas</option>
    </select>
  </div>

  {/* Filter Gula Darah */}
  <div>
    <label className="block text-sm font-medium">Status Gula Darah</label>
    <select
      value={filterGula}
      onChange={(e) => setFilterGula(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Semua</option>
      <option value="normal">Normal</option>
      <option value="pradiabetes">Pradiabetes</option>
      <option value="diabetes">Diabetes</option>
    </select>
  </div>

  {/* Filter Tekanan Darah */}
  <div>
    <label className="block text-sm font-medium">Status Tekanan Darah</label>
    <select
      value={filterTekanan}
      onChange={(e) => setFilterTekanan(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Semua</option>
      <option value="normal">Normal</option>
      <option value="pra-hipertensi">Pra-Hipertensi</option>
      <option value="hipertensi tahap 1">Hipertensi Tahap 1</option>
      <option value="hipertensi tahap 2">Hipertensi Tahap 2</option>
      <option value="hipertensi sistolik terisolasi">Hipertensi Sistolik Terisolasi</option>
    </select>
  </div>
  </div>

  {/* Tombol Aksi */}
  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
    <button
      onClick={handleDownloadExcel}
      className="px-4 py-2 bg-green-700 text-white text-sm hover:bg-green-600 shadow w-full sm:w-auto"
    >
      <FaDownload className="inline mr-2" />
      Download Data
    </button>

    <NavLink to="/admin/data/tambah" className="w-full sm:w-auto">
      <button className="items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow w-full sm:w-auto">
        <FaPlus className="inline mr-2" />
        Tambah Data
      </button>
    </NavLink>
  </div>
</div>
{/* Filter Nama */}
<div className="w-full sm:w-auto">
  <input
    type="text"
    placeholder="Ketik nama..."
    value={searchNama}
    onChange={(e) => setSearchNama(e.target.value)}
    className="border rounded px-3 py-2 w-full sm:w-auto"
  />
</div>



      <div className="overflow-x-auto">
        <table className="min-w-full border font-dmsans text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 ">No</th>
              <th className="p-2 ">Tanggal</th>
              <th className="p-2 cursor-pointer select-none"
      onClick={handleSortNama}>Nama {sortOrder === "asc" ? " ▲" : sortOrder === "desc" ? " ▼" : " ⇅"}</th>
              <th className="p-2 ">Tinggi Badan (cm)</th>
              <th className="p-2 ">Berat Badan (Kg)</th>
              <th className="p-2 ">BMI</th>
              <th className="p-2 ">Tipe Gula Darah</th>
              <th className="p-2 ">Gula Darah (mg/dL)</th>
              <th className="p-2 ">Status Gula</th>
              <th className="p-2 ">Tekanan Darah (mmhg)</th>
              <th className="p-2 ">Status Tekanan</th>
              <th className="p-2 ">Catatan</th>
              <th className="p-2 ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item,index) => (
              <tr key={item.id} className="bg-WhitePPK hover:bg-gray-100">
                <td className="p-2 text-center">{indexOfFirstItem + index + 1}</td>
                <td className="p-2 text-center">{item.tanggal_pemeriksaan}</td>
                <td className="p-2 text-center">{item.user?.nama || "-"}</td>
                <td className="p-2 text-center">{item.tinggi_badan}</td>
                <td className="p-2 text-center">{item.berat_badan} </td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status_bmi, "bmi").bg} ${getStatusColor(item.status_bmi, "bmi").text}`}>
                    {item.status_bmi || "-"}
                  </span>
                </td>
                <td className="p-2 text-center">{item.tipe_gula_darah || "-"}</td>
                <td className="p-2 text-center">{`${item.gula_darah}` || "-"}</td>
                <td className="p-2 text-center ">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status_gula_darah, "gula_darah").bg} ${getStatusColor(item.status_gula_darah, "gula_darah").text}`}>
                    {item.status_gula_darah || "-"}
                  </span>
                </td>
                <td className="p-2 text-center">
                  {item.tekanan_sistolik}/{item.tekanan_diastolik}
                </td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status_tekanan_darah, "tekanan_darah").bg} ${getStatusColor(item.status_tekanan_darah, "tekanan_darah").text}`}>
                    {item.status_tekanan_darah || "-"}
                  </span>
                </td>
                <td className="p-2 text-center">{item.catatan || "-"}</td>
                <td className="p-2 text-center">
                    <div className="flex gap-2">
                        <button
                        onClick={() => navigate("/admin/data/edit", { state: item })}
                        className="text-blue-600 hover:underline"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="text-red-600 hover:underline"
                        >
                        Hapus
                        </button>
                    </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    className="px-3 py-1 bg-gray-200 disabled:opacity-50"
  >
    Prev
  </button>

  <div className="space-x-1">
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    className="px-3 py-1 bg-gray-200 disabled:opacity-50"
  >
    Next
  </button>
</div>
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
      <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300  hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white  hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Data_Admin;
