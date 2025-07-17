import React, { useEffect, useState } from 'react';
import supabase from './utils/supabaseClient';
import GaleriFormModal from './modals/GaleriFormModal';
import DeleteConfirmationModal from './modals/DeleteModals';
import { Link } from 'react-router-dom';
import {
  Search, PlusCircle, Edit, Trash2,
  ChevronLeft, ChevronRight, Users,
  FileText, Menu, GalleryHorizontal
} from 'lucide-react';

const AdminGaleri = () => {
  const [subgaleri, setSubgaleri] = useState([]);
  const [divisi, setDivisi] = useState([]);
  const [galeriDivisi, setGaleriDivisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentGaleri, setCurrentGaleri] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({ deskripsi: '',divisi_id: '', image_url: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  const itemsPerPage = 5;

  const fetchGaleriData = async () => {
    setLoading(true);
    const [{ data: galeriDivisi }, { data: divisi }, { data: subgaleri }] = await Promise.all([
      supabase.from('galeri_divisi').select('*').order('id', { ascending: false }),
      supabase.from('divisi').select('id,kode_divisi'),
      supabase.from('subgaleri').select('*').order('created_at', { ascending: false }),
    ]);
    setGaleriDivisi(galeriDivisi || []);
    setDivisi(divisi || []);
    setSubgaleri(subgaleri || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchGaleriData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // const filteredGaleris = subgaleri.filter((item) =>
  //   item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredGaleris.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(filteredGaleris.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (galeri) => {
    setCurrentGaleri(galeri);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const { error } = await supabase.from('galeri_divisi').delete().eq('id', currentGaleri.id);
    if (!error) {
      showNotification('Galeri berhasil dihapus', 'success');
      fetchGaleriData();
    } else {
      showNotification('Gagal menghapus galeri', 'error');
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (galeri) => {
    setCurrentGaleri(galeri);
    setFormData({
      deskripsi: galeri.deskripsi,
      image_url: galeri.image_url
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url = formData.image_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pengumuman')
        .upload(filePath, selectedFile);

      if (uploadError) {
        showNotification('Gagal upload gambar', 'error');
        return;
      }

      const { data: publicUrl } = supabase
        .storage
        .from('pengumuman')
        .getPublicUrl(filePath);

      image_url = publicUrl.publicUrl;
    }

    if (currentGaleri) {
      const { error } = await supabase
        .from('galeri_divisi')
        .update({ ...formData, image_url })
        .eq('id', currentGaleri.id);

      if (!error) {
        showNotification('Galeri berhasil diperbarui', 'success');
        fetchGaleriData();
        setShowEditModal(false);
        resetForm();
      } else {
        console.error('Error updating galeri:', error);
        showNotification('Gagal memperbarui galeri', 'error');
      }
    } else {
      const { error } = await supabase
        .from('galeri_divisi')
        .insert([{ ...formData, image_url }]);

      if (!error) {
        showNotification('Galeri berhasil ditambahkan', 'success');
        fetchGaleriData();
        setShowEditModal(false);
        resetForm();
      } else {
        showNotification('Gagal menambahkan galeri', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({ deskripsi: '', image_url: '' });
    setSelectedFile(null);
    setCurrentGaleri(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-2">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading data, please wait…</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Render other components like sidebar, header, table list, pagination, etc. */}
        {/* Sidebar */}
  <div className={`bg-blue-800 text-white ${showSidebar ? 'w-64' : 'w-16'} transition-all`}>
    <div className="p-4 flex items-center justify-between">
      {showSidebar && <h1 className="text-xl font-bold">Admin Panel</h1>}
      <button onClick={() => setShowSidebar(!showSidebar)} className="p-1 rounded-full hover:bg-blue-700">
        <Menu size={20} />
      </button>
    </div>
    <nav className="mt-6">
      <Link to="/admin">
        <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700">
          <FileText size={20} />
          {showSidebar && <span className="ml-4">Pengumuman</span>}
        </div>
      </Link>
      <Link to="/admin/galeri">
        <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700 bg-blue-900">
          <GalleryHorizontal size={20} />
          {showSidebar && <span className="ml-4">Galeri</span>}
        </div>
      </Link>
      <Link to="/admin/pengurus">
        <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700">
          <Users size={20} />
          {showSidebar && <span className="ml-4">Pengurus</span>}
        </div>
      </Link>
      <Link to="/admin/karya">
                          <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700">
                            <FileText size={20} />
                            {showSidebar && <span className="ml-4">Karya</span>}
                          </div>
                          </Link>
    </nav>
  </div>

  {/* Main content */}
  <div className="flex-1 overflow-auto">
    <header className="bg-white p-4 shadow">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
    </header>

    <div className="p-6">
      {notification.show && (
        <div className={`mb-4 px-4 py-2 rounded text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.message}
        </div>
      )}

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari galeri..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => {
            resetForm();
            setShowEditModal(true);
          }}
        >
          <PlusCircle size={18} className="mr-2" /> Tambah Baru
        </button>
      </div>

      {/* Konten galeri */}
      {divisi.map((dvs) => {
  const galeriDivisiForThisDivisi = galeriDivisi.filter(g => g.divisi_id === dvs.id);

  return (
    <div key={dvs.id} className="mb-10">
      <h2 className="text-xl font-bold mb-4">{dvs.kode_divisi}</h2>

      {galeriDivisiForThisDivisi.length === 0 ? (
        <p className="text-gray-500 mb-6">Tidak ada galeri untuk divisi ini.</p>
      ) : (
        galeriDivisiForThisDivisi.map((galeriDivisiItem) => {

          return (
            <div key={galeriDivisiItem.id} className="mb-6">
              <table className="min-w-full table-fixed bg-white shadow rounded-md border">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-sm font-medium text-gray-600 text-left w-1/2">Judul</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center w-1/4">Gambar</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center w-1/4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={galeriDivisiItem.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-left font-medium truncate">
                      <Link to={`/admin/galeri/${galeriDivisiItem.id}`} className="hover:text-blue-600">
                        {galeriDivisiItem.deskripsi}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <img
                        src={galeriDivisiItem.image_url || "/api/placeholder/48/48"}
                        alt={galeriDivisiItem.deskripsi}
                        className="w-12 h-12 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          onClick={() => handleEdit(galeriDivisiItem)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          onClick={() => handleDelete(galeriDivisiItem)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          );
        })
      )}
    </div>
  );
})}


      
      <GaleriFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        currentGaleri={currentGaleri}
        divisiList={divisi}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        pengumuman={currentGaleri}
      />
    </div>
    <footer className="bg-white p-4 shadow mt-auto">
      <p className="text-center text-gray-600">© {new Date().getFullYear()} BEM FK UM. All rights reserved.</p>
    </footer>
  </div>
  </div>
  );
};

export default AdminGaleri;
