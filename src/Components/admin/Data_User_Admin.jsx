import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload, FaPlus, FaRegCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";
const Data_User_Admin = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchNama, setSearchNama] = useState(""); // 🔍 state untuk search nama
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [tahun, setTahun] = useState(currentYear);
  const [bulan, setBulan] = useState(null);

  // Ambil auth dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const fetchData = async () => {
    try {
       const res = await axiosInstance.get("/users", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setDataUser(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    if (tahun) {
      fetchData();
    }
  }, [tahun, bulan]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
    const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${selectedId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      toast.success("Data berhasil dihapus");
      setDataUser((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (error) {
      toast.error("Gagal menghapus data");
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const filteredData = dataUser.filter((user) =>
  searchNama === "" ? true : user.nama?.toLowerCase().includes(searchNama.toLowerCase())
);

const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);


const handleDownloadUserExcel = () => {
  if (dataUser.length === 0) {
    toast.warn("Data pengguna kosong.");
    return;
  }

  const dataToExport = dataUser.map((user, index) => ({
    No: index + 1,
    NIK: user.nik || "-",
    Nama: user.nama || "-",
    "Tempat Lahir": user.tempat_lahir || "-",
    "Tanggal Lahir": user.tanggal_lahir || "-",
    "Jenis Kelamin": user.jenis_kelamin || "-",
    Agama: user.agama || "-",
    "No HP": user.no_hp || "-",
    RT: user.rt || "-",
    RW: user.rw || "-",
    Alamat: user.alamat || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data User");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(file, "data_pengguna.xlsx");
};
  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Data Pengguna</h1>

      <div className="flex justify-end items-end mb-6">

    <div className="flex gap-2">
          <button
            onClick={handleDownloadUserExcel}
            className="px-4 py-2 bg-green-700 text-white text-sm hover:bg-green-600 shadow"
          >
            <FaDownload className="inline mr-2" />
            Download Data
          </button>
    
        {/* Tombol Tambah Data */}
          <NavLink to="/admin/pengguna/tambah">
              <button className="flex items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow">
                <FaPlus className="inline mr-2" />
              Tambah Pengguna
              </button>
          </NavLink>
          </div>
          
        </div>
        
{/* Filter Nama */}
<div className="w-full sm:w-auto mb-2">
  <input
    type="text"
    placeholder="Ketik nama..."
    value={searchNama}
    onChange={(e) => setSearchNama(e.target.value)}
    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-auto bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
  />
</div>
    


      <div className="overflow-x-auto">
       <table className="min-w-full border border-gray-300 dark:border-gray-600 font-dmsans text-sm bg-white dark:bg-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-600">
            <th className="p-2 text-gray-900 dark:text-white">No</th>
            <th className="p-2 text-gray-900 dark:text-white">NIK</th>
            <th className="p-2 text-gray-900 dark:text-white">Nama</th>
            <th className="p-2 text-gray-900 dark:text-white">Tempat, Tgl Lahir</th>
            <th className="p-2 text-gray-900 dark:text-white">Agama</th>
            <th className="p-2 text-gray-900 dark:text-white">Alamat</th>
            <th className="p-2 text-gray-900 dark:text-white">Jenis Kelamin</th>
            <th className="p-2 text-gray-900 dark:text-white">RW</th>
            <th className="p-2 text-gray-900 dark:text-white">RT</th>
            <th className="p-2 text-gray-900 dark:text-white">No HP</th>
            <th className="p-2 text-gray-900 dark:text-white">Email</th>
            <th className="p-2 text-gray-900 dark:text-white">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
              <td className="p-2 text-center text-gray-900 dark:text-white">{indexOfFirstItem + index + 1}</td>
              <td className="p-2 text-gray-900 dark:text-white">{user.nik}</td>
              <td className="p-2 text-gray-900 dark:text-white">{user.nama}</td>
              <td className="p-2 text-gray-900 dark:text-white">
                {user.tempat_lahir}, {user.tanggal_lahir}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-white">
                {user.agama || "-"}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-white">
                {user.alamat || "-"}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-white">
                {user.jenis_kelamin || "-"}
              </td>
              <td className="p-2 text-gray-900 dark:text-white">{user.rw}</td>
              <td className="p-2 text-gray-900 dark:text-white">{user.rt}</td>
              <td className="p-2 text-gray-900 dark:text-white">{user.no_hp}</td>
              <td className="p-2 text-gray-900 dark:text-white">{user.email}</td>
              <td className="p-2 text-center">
                    <div className="flex gap-2">
                      <NavLink to={`/admin/pengguna/edit/${user.id}`}>
                        <button
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                        Edit
                        </button>
                      </NavLink>
                        <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-600 dark:text-red-400 hover:underline ml-2"
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
    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 disabled:opacity-50 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
  >
    Prev
  </button>

  <div className="space-x-1">
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 transition-colors duration-200 ${currentPage === i + 1 ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 disabled:opacity-50 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
  >
    Next
  </button>
</div>
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg max-w-sm w-full transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Konfirmasi Hapus</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white transition-colors duration-200"
        >
          Batal
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
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

export default Data_User_Admin;
