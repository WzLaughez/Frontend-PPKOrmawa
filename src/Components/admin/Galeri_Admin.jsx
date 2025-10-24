import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import GaleriModal from "./galeri/GaleriModal";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
const Galeri_Admin = () => {
  const [galeriList, setGaleriList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const headers = { Authorization: `Bearer ${auth?.token}` };

  const fetchGaleri = async () => {
    try {
      const res = await axiosInstance.get("/galeri", { headers });
      setGaleriList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleOpenAdd = () => {
    setEditingData(null);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setShowModal(true);
  };

const handleDeleteClick = (id) => {
  setSelectedId(id);
  setShowDeleteModal(true);
};
const confirmDelete = async () => {
  try {
    await axiosInstance.delete(`/galeri/${selectedId}`);
    toast.success("Data berhasil dihapus");
    setGaleriList((prev) => prev.filter((item) => item.id !== selectedId));
  } catch (error) {
    console.error("Gagal menghapus data:", error);
  } finally {
    setShowDeleteModal(false);
    setSelectedId(null);
  }
};

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tanggal_kegiatan", data.tanggal_kegiatan);
    if (data.image) formData.append("image", data.image);
    try{
      setLoading(true);
      if (editingData) {
        await axiosInstance.put(`/galeri/${editingData.id}`, formData, { headers });
        toast.success("Galeri berhasil diperbarui");
        setEditingData(null);
      } else {
        await axiosInstance.post("/galeri", formData, { headers });
        toast.success("Galeri berhasil ditambahkan");
      }

    setShowModal(false);
    fetchGaleri();
    } catch (error) {
      console.error("Gagal menyimpan data galeri:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="p-6 mx-auto bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Galeri</h2>
      </div>
        <div className="mb-4 flex justify-end">
                <button className="flex items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow transition-colors duration-200" onClick={handleOpenAdd}>
                                <FaPlus className="inline mr-2" />
                              Tambah Galeri
                          </button>
              </div>

      <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors duration-300">
        <thead className="bg-gray-100 dark:bg-gray-600">
          <tr>
            <th className="p-2 text-sm font-semibold text-gray-700 dark:text-white">Gambar</th>
            <th className="p-2 text-sm font-semibold text-gray-700 dark:text-white">Judul</th>
            <th className="p-2 text-sm font-semibold text-gray-700 dark:text-white">Tanggal</th>
            <th className="p-2 text-sm font-semibold text-gray-700 dark:text-white">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {galeriList.map((item) => (
            <tr key={item.id} className="border-t border-gray-200 dark:border-gray-600 items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
              <td className="p-2">
                <img
                  src={`${API}${item.image_url}`}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>
              <td className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                <Link to={`/admin/galeri/${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {item.title}
                </Link>
              </td>
              <td className="p-2 text-sm text-gray-600 dark:text-gray-300">{item.tanggal_kegiatan}</td>
              <td className="p-2">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          <GaleriModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={editingData}
        loading={loading}
          />
      {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-700 p-6 shadow-lg max-w-sm w-full rounded-lg transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Konfirmasi Hapus</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white transition-colors duration-200"
        >
          Batal
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
)}

        </div>
    
  );
};

export default Galeri_Admin;
