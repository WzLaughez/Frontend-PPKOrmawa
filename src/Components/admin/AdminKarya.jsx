import React, { useEffect, useState } from 'react';
import supabase from './utils/supabaseClient';
import PengumumanFormModal from './modals/PengumumanFormModal';
import DeleteConfirmationModal from './modals/DeleteModals';
import { Link } from 'react-router-dom';
import {
  Search, PlusCircle, Edit, Trash2, AlertCircle, X,
  ChevronLeft, ChevronRight, Users, FileText, Menu, GalleryHorizontal
} from 'lucide-react';

const AdminKarya = () => {
  const [pengumumans, setPengumumans] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPengumuman, setCurrentPengumuman] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    image_url: ''
  });
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
  const itemsPerPage = 5;

  const fetchPengumuman = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('karya').select('*');
    if (error) setError('Gagal memuat data');
    else setPengumumans(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPengumumans = pengumumans.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPengumumans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPengumumans.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (pengumuman) => {
    setCurrentPengumuman(pengumuman);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const { error } = await supabase.from('karya').delete().eq('id', currentPengumuman.id);
    if (!error) {
      setPengumumans(pengumumans.filter(item => item.id !== currentPengumuman.id));
      showNotification('Karya berhasil dihapus', 'success');
    } else {
      showNotification('Gagal menghapus karya', 'error');
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (pengumuman) => {
    setCurrentPengumuman(pengumuman);
    setFormData({
      title: pengumuman.title,
      content: pengumuman.content,
      date: pengumuman.date,
      image_url: pengumuman.image_url
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddForm = async () => {
  let image_url = '';

  if (selectedFile) {
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('pengumuman') // sesuaikan dengan nama bucket-mu
      .upload(filePath, selectedFile);

    if (uploadError) {
      
      console.error('Upload error:', uploadError);
      showNotification('Gagal upload gambar', 'error');
      return;
    }

    const { data: publicUrl } = supabase
      .storage
      .from('pengumuman')
      .getPublicUrl(filePath);

    image_url = publicUrl.publicUrl;
  }

  const { data, error } = await supabase
    .from('karya')
    .insert([{
      ...formData,
      image_url: image_url || ''
    }])
    .select();

  if (!error) {
    setPengumumans([...pengumumans, ...data]);
    showNotification('Karya berhasil ditambahkan', 'success');
    setShowEditModal(false);
    resetForm();
  } else {
    console.error('Insert error:', error);
    showNotification('Gagal menambahkan karya', 'error');
  }
};
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (currentPengumuman) {
    // update logika tetap
    const { error } = await supabase
      .from('karya')
      .update(formData)
      .eq('id', currentPengumuman.id);

    if (!error) {
      setPengumumans(pengumumans.map(item =>
        item.id === currentPengumuman.id ? { ...item, ...formData } : item
      ));
      showNotification('Karya berhasil diperbarui', 'success');
      setShowEditModal(false);
      resetForm();
    } else {
      showNotification('Gagal memperbarui karya', 'error');
    }
  } else {
    // gunakan ini untuk tambah baru
    await handleAddForm();
  }
};

  const resetForm = () => {
    setFormData({ title: '', content: '', date: '', image_url: '' });
    setCurrentPengumuman(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-2">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading data, please wait…</p>
    </div>
  )
}
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white ${showSidebar ? 'w-64' : 'w-16'} transition-all`}>
        <div className="p-4 flex items-center justify-between">
          {showSidebar && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-1 rounded-full hover:bg-blue-700">
            <Menu size={20} />
          </button>
        </div>
        <nav className="mt-6">
          
            <Link to="/admin" >
              <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700 ">
                <FileText size={20} />
                {showSidebar && <span className="ml-4">Pengumuman</span>}
              </div>
            </Link>
          <Link to="/admin/galeri">
          <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700">
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
          <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700 bg-blue-900">
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
                placeholder="Cari pengumuman..."
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

          {/* Konten pengumuman */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Judul</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tanggal</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Konten</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gambar</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((pengumuman) => (
                    <tr key={pengumuman.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{pengumuman.title}</td>
                      <td className="px-4 py-3 text-gray-600">{formatDate(pengumuman.date)}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {pengumuman.content.length > 50
                          ? `${pengumuman.content.substring(0, 50)}...`
                          : pengumuman.content}
                      </td>
                      <td className="px-4 py-3">
                        <img
                          src={pengumuman.image_url || "/api/placeholder/48/48"}
                          alt={pengumuman.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            onClick={() => handleEdit(pengumuman)}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                            onClick={() => handleDelete(pengumuman)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Tidak ada pengumuman yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredPengumumans.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredPengumumans.length)} dari {filteredPengumumans.length} pengumuman
              </div>
              <div className="flex space-x-1">
                <button
                  className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

           {/* Edit/Add Modal */}
                <PengumumanFormModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            currentPengumuman={currentPengumuman}
          />

          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            pengumuman={currentPengumuman}
          />


        </div>

        <footer className="bg-white p-4 shadow mt-auto">
      <p className="text-center text-gray-600">© {new Date().getFullYear()} BEM FK UM. All rights reserved.</p>
    </footer>
      </div>
    </div>
  );
};

export default AdminKarya;
