import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import EdukasiModal from './edukasi/EdukasiModal';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
const Edukasi_Admin = () => {
  const [edukasiList, setEdukasiList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const headers = { Authorization: `Bearer ${auth?.token}` };

  const fetchEdukasi = async () => {
    try {
      const res = await axiosInstance.get('/edukasi', { headers });
      setEdukasiList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data edukasi:', error);
    }
  };

  useEffect(() => {
    fetchEdukasi();
  }, []);
  const handleOpenAdd = () => {
    setEditingData(null);
    setShowModal(true);
  };
  const handleEdit = (data) => {
    setEditingData(data);
    setShowModal(true);
  };
  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    if (editingData) {
      await axiosInstance.put(`/edukasi/${editingData.id}`, formData);
      toast.success("Edukasi berhasil diperbarui");
    } else {
      await axiosInstance.post("/edukasi", formData);
      toast.success("Edukasi berhasil ditambahkan");
    }
    
    setShowModal(false);
    fetchEdukasi();
  };
  
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/edukasi/${selectedId}`);
      toast.success("Data berhasil dihapus");
      setEdukasiList((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="p-6  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Edukasi</h2>
      </div>
      <div className="mb-4 flex justify-end">
        <button className="flex items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow" onClick={handleOpenAdd}>
                        <FaPlus className="inline mr-2" />
                      Tambah Edukasi
                  </button>
      </div>
      <table className="min-w-full  bg-white border border-gray-200  overflow-hidden">
        <thead className="bg-gray-100 items-center">
            <tr className=''>
            <th className=" p-2  text-sm font-semibold text-gray-700">Gambar</th>
            <th className=" p-2  text-sm font-semibold text-gray-700">Judul</th>
            <th className=" p-2  text-sm font-semibold text-gray-700">Deskripsi</th>
            <th className=" p-2  text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
        </thead>
        <tbody className="">
            {edukasiList.map((item) => (
            <tr key={item.id} className="border-t border-gray-200 ">
                <td className="p-2 ">
                <img
                    src={`${API}${item.image_url}`}
                    alt={item.title}
                    className="w-20 h-14 object-cover "
                />
                </td>
                <td className="p-2  text-sm font-medium">{item.title}</td>
                <td className="p-2  text-sm text-gray-600 max-w-xs">{item.description}</td>
                <td className="p-2 ">
                <div className="flex gap-2 justify-center">
                        <button
                        onClick={() => handleEdit(item)}
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

      <EdukasiModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
      {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6  shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
      <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus Edukasi ini?</p>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowDeleteModal(false)}
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
  );
};


export default Edukasi_Admin;
