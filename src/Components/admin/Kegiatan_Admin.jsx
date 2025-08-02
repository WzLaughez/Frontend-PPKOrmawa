import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios"; // pastikan path sesuai
import { toast } from "react-toastify";
import KegiatanModal from "./kegiatan/KegiatanModal";
import DeleteModal from "./kegiatan/DeleteModal";
import { FaPlus } from "react-icons/fa";

const Kegiatan_Admin = () => {
  const [kegiatanList, setKegiatanList] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(kegiatanList.length / itemsPerPage);
  const paginatedData = kegiatanList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("auth") && JSON.parse(localStorage.getItem("auth")).token}`,
  };

  const fetchKegiatan = async () => {
    try {
      const res = await axiosInstance.get("/kegiatan", { headers });
      setKegiatanList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kegiatan:", error);
    }
  };

  const handleDelete = (id) => {
  setSelectedId(id);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await axiosInstance.delete(`/kegiatan/${selectedId}`, { headers });
    toast.success("Kegiatan berhasil dihapus");
    setShowDeleteModal(false);
    fetchKegiatan();
  } catch (error) {
    toast.error("Gagal menghapus kegiatan");
  }
};


  const handleOpenAdd = () => {
    setEditingData(null);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingData) {
        await axiosInstance.put(`/kegiatan/${editingData.id}`, formData, { headers });
        toast.success("Kegiatan berhasil diperbarui");
      } else {
        await axiosInstance.post("/kegiatan", formData, { headers });
        toast.success("Kegiatan berhasil ditambahkan");
      }
      setShowModal(false);
      fetchKegiatan();
    } catch (error) {
      toast.error("Gagal menyimpan kegiatan");
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  return (
    <div className="p-6 mx-auto bg-WhitePPK min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manajemen Kegiatan</h2>
      </div>
        <div className="mb-4 flex justify-end">
            <button className="flex items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow" onClick={handleOpenAdd}>
                <FaPlus className="inline mr-2" />
                  Tambah Kegiatan
            </button>
        </div>

      <div className="grid gap-4">
        <div className="grid gap-4">
  {paginatedData.map((item) => (
    <div
      key={item.id}
      className="p-4 bg-white rounded shadow flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <p className="text-sm text-gray-500 mt-1">Tanggal: {item.date}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(item)}
          className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  ))}
</div>
<div className="flex justify-center mt-4 gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Sebelumnya
  </button>

  <span className="px-3 py-1 text-gray-700">
    Halaman {currentPage} dari {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Berikutnya
  </button>
</div>


      </div>

      {showModal && (
        <KegiatanModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          initialData={editingData}
        />
      )}
<DeleteModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={confirmDelete}
/>
    </div>
  );
  
};

export default Kegiatan_Admin;
