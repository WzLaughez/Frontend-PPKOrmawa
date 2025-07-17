import React, { useEffect, useState } from 'react';
import supabase from './utils/supabaseClient';
import { Link } from 'react-router-dom';
import {
  Search, PlusCircle, Edit, Trash2, AlertCircle, X,
  ChevronLeft, ChevronRight, Users, FileText, Menu, GalleryHorizontal
} from 'lucide-react';
import PengurusEditModal from './modals/PengurusEditModal';
import MenteriEditModal from './modals/MenteriEditModal';
import EditDivisiModal from './modals/DivisiEditModal';
import TambahAnggotaModal from './modals/TambahAnggotaModal';
import AnggotaEditModal from './modals/AnggotaEditModal';
import DeleteAnggotaModal from './modals/DeleteAnggotaModals';
const AdminPengurus = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });


  // State for pengurus
  const [pengurusData, setPengurusData] = useState([]);
  const [currentPengurus, setCurrentPengurus] = useState(null);
  const [showEditModalPengurus, setShowEditModalPengurus] = useState(false);
  // const [showDeleteModalPengurus, setShowDeleteModalPengurus] = useState(false);

  const handleEditPengurus = (p) => {
    setCurrentPengurus(p);           // set data pengurus terpilih
    setShowEditModalPengurus(true);  // tampilkan modal edit
  };
  const handleDeletePengurus = async (id) => {
  if (!confirm('Yakin ingin menghapus pengurus ini?')) return;
  const { error } = await supabase.from('pengurus_utama').delete().eq('id', id);
  if (error) {
    showNotification('Gagal menghapus pengurus', 'error');
  } else {
    setPengurusData((prev) => prev.filter((pengurus) => pengurus.id !== id));
    showNotification('Pengurus berhasil dihapus', 'success');
  }
  };
  const handleUpdatePengurus = async () => {
  let image_url = currentPengurus.foto; // default pakai foto lama

  if (selectedFile) {
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('pengumuman')
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

  const { id, nama, jabatan } = currentPengurus;
  const { error } = await supabase
    .from('pengurus_utama')
    .update({ nama, jabatan, foto_url: image_url })
    .eq('id', id);

  if (error) {
    showNotification('Gagal memperbarui pengurus', 'error');
    console.error('Update error:', error);
  } else {
    setPengurusData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, nama, jabatan, foto: image_url } : p))
    );
    showNotification('Pengurus berhasil diperbarui', 'success');
    setShowEditModalPengurus(false);
    setSelectedFile(null); // reset file
    await fetchData();
  }
  };


  // State untuk menteri
  const [menteriData, setMenteriData] = useState([]);
  const [currentMenteri, setCurrentMenteri] = useState(null);
  const [showEditModalMenteri, setShowEditModalMenteri] = useState(false);
  // const [showDeleteModalMenteri, setShowDeleteModalMenteri] = useState(false);

  // Handler edit menteri
  const handleEditMenteri = (m) => {
    setCurrentMenteri(m);              // simpan data menteri terpilih
    setShowEditModalMenteri(true);     // tampilkan modal edit
  };
  // Handler delete menteri
  const handleDeleteMenteri = async (id) => {
    if (!confirm('Yakin ingin menghapus menteri ini?')) return;

    const { error } = await supabase
      .from('menteri')
      .delete()
      .eq('id', id);

    if (error) {
      showNotification('Gagal menghapus menteri', 'error');
    } else {
      setMenteriData((prev) => prev.filter((m) => m.id !== id));
      showNotification('Menteri berhasil dihapus', 'success');
    }
  };
  const handleUpdateMenteri = async () => {
    let image_url = currentMenteri.foto_url; // default pakai foto lama

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from('pengumuman')
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

    const { id, nama, jabatan } = currentMenteri;
    const { error } = await supabase
      .from('menteri')
      .update({ nama, jabatan, foto_url: image_url })
      .eq('id', id);

    if (error) {
      showNotification('Gagal memperbarui menteri', 'error');
      console.error('Update error:', error);
    } else {
      setMenteriData((prev) =>
        prev.map((m) => (m.id === id ? { ...m, nama, jabatan, foto_url: image_url } : m))
      );

      showNotification('Menteri berhasil diperbarui', 'success');
      setShowEditModalMenteri(false);
      setSelectedFile(null); // reset file
    }
  };


  // State untuk divisi
  const [divisiData, setDivisiData] = useState([]);
  const [currentDivisi, setCurrentDivisi] = useState(null);
  const [showEditModalDivisi, setShowEditModalDivisi] = useState(false);
  const [divisiList, setDivisiList] = useState([]);
  // Edit Divisi
  const handleEditDivisi = (d) => {
    setCurrentDivisi(d);
    setShowEditModalDivisi(true); // Tampilkan modal edit divisi
  };
  const handleUpdateDivisi = async ({ id, nama, deskripsi, file }) => {
  let imageUrl = currentDivisi.ketua_foto;

  if (file) {
    const fileExt = file.name.split('.').pop();
    const filePath = `public/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from('pengumuman')
      .upload(filePath, file);

    if (uploadError) {
      showNotification('Gagal upload gambar', 'error');
      return;
    }

    const { data: publicUrl } = supabase
      .storage
      .from('pengumuman')
      .getPublicUrl(filePath);

    imageUrl = publicUrl.publicUrl;
  }

  const { error } = await supabase
    .from('divisi')
    .update({ nama, deskripsi, ketua_foto_url: imageUrl })
    .eq('id', id);

  if (error) {
    showNotification('Gagal memperbarui divisi', 'error');
  } else {
    showNotification('Divisi berhasil diperbarui', 'success');
    fetchData();
  }
};


  // Delete Divisi
  const handleDeleteDivisi = async (id) => {
    if (!confirm('Yakin ingin menghapus divisi ini?')) return;
    const { error } = await supabase.from('divisi').delete().eq('id', id);
    if (error) {
      showNotification('Gagal menghapus divisi', 'error');
    } else {
      setDivisiData((prev) => prev.filter((divisi) => divisi.id !== id));
      showNotification('Divisi berhasil dihapus', 'success');
    }
  };
  // State untuk anggota divisi
  const [currentAnggota, setCurrentAnggota] = useState(null);
  const [showEditModalAnggota, setShowEditModalAnggota] = useState(false);
  const [showTambahModalAnggota, setShowTambahModalAnggota] = useState(false);
  const [currentDeleteAnggota, setCurrentDeleteAnggota] = useState(null);
  const [showDeleteModalAnggota, setShowDeleteModalAnggota] = useState(false);


  // Tambah Anggota Divisi
  const handleAddAnggota = async ({ nama, divisi_id,jabatan, file }) => {
    let imageUrl = '';
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from('pengumuman')
        .upload(filePath, file);
      if (uploadError) {
        showNotification('Gagal upload gambar', 'error');
        return;
      }

      const { data: publicUrl } = supabase
        .storage
        .from('pengumuman')
        .getPublicUrl(filePath);

      imageUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase
      .from('anggota_divisi')
      .insert([{ nama, divisi_id,jabatan, foto_url: imageUrl }]);
    if (error) {
      showNotification('Gagal menambahkan anggota', 'error');
    } else {
      setShowTambahModalAnggota(false);
      showNotification('Anggota berhasil ditambahkan', 'success');
      fetchData(); // refresh list divisi dan anggotanya
    }
  };
  // Edit Anggota Divisi
  const handleEditAnggota = (anggota) => {
    setCurrentAnggota(anggota);
    setShowEditModalAnggota(true); // tampilkan modal edit anggota
  };
  const handleUpdateAnggota = async ({ id,jabatan, nama, divisi_id, file }) => {
    let imageUrl = currentAnggota.foto;

    // Jika ada file baru, upload
    if (file) {
      const fileExt = file.name.split('.').pop();
      const filePath = `public/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase
        .storage
        .from('pengumuman')
        .upload(filePath, file);

      if (uploadError) {
        showNotification('Gagal upload gambar', 'error');
        return;
      }

      const { data: publicUrl } = supabase
        .storage
        .from('pengumuman')
        .getPublicUrl(filePath);

      imageUrl = publicUrl.publicUrl;
    }

    // Update di tabel anggota_divisi
    const { error } = await supabase
      .from('anggota_divisi')
      .update({ nama, jabatan, divisi_id, foto_url: imageUrl })
      .eq('id', id);

    if (error) {
      showNotification('Gagal memperbarui anggota', 'error');
    } else {
      showNotification('Anggota berhasil diperbarui', 'success');
      setShowEditModalAnggota(false);
      setCurrentAnggota(null);
      // refresh list anggota_divisi Anda
  await fetchData();
    }
  };

  // Delete Anggota Divisi
  const openDeleteModalAnggota = (anggota) => {
    setCurrentDeleteAnggota(anggota);
    setShowDeleteModalAnggota(true);
  };

  const handleConfirmDeleteAnggota = async (id) => {
    const { error } = await supabase.from('anggota_divisi').delete().eq('id', id);
    if (error) {
      showNotification('Gagal menghapus anggota', 'error');
    } else {
      setDivisiData((prev) =>
        prev.map((divisi) =>
          divisi.id === currentDeleteAnggota?.divisi_id
            ? { ...divisi, anggota_divisi: divisi.anggota_divisi.filter((a) => a.id !== id) }
            : divisi
        )
      );
      showNotification('Anggota berhasil dihapus', 'success');
    }
    setShowDeleteModalAnggota(false); // tutup modal
    setCurrentDeleteAnggota(null);    // reset
  };



  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);

    // Fetch semua data sekaligus
    const [{ data: pengurus }, { data: menteri }, { data: divisi }] = await Promise.all([
      supabase.from('pengurus_utama').select('*').order('id', { ascending: false }),
      supabase.from('menteri').select('*'),
      supabase.from('divisi').select('*, anggota_divisi(*)')
    ]);
    setPengurusData(pengurus || []);
    setMenteriData(menteri || []);
    setDivisiData(divisi || []);
    setLoading(false);
  };
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
  const itemsPerPage = 5;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const filteredDivisi = divisiData.filter((d) => d.nama.toLowerCase().includes(searchTerm.toLowerCase()));
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
          <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-700 bg-blue-900">
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

          {/* === PENGURUS SECTION === */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Pengurus</h2>
      <table className="min-w-full bg-white rounded shadow mb-6">
        <thead>
          <tr className="bg-blue-50 border-b text-left text-sm text-gray-600">
            <th className="p-2">Jabatan</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Foto</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pengurusData.map((p) => (
            <tr key={p.id} className="hover:bg-blue-50 border-b">
              <td className="p-2">{p.jabatan}</td>
              <td className="p-2">{p.nama}</td>
              <td className="p-2">
                <img src={p.foto_url || '/placeholder.png'} className="w-12 h-12 rounded-full object-cover" />
              </td>
              <td className="p-2 text-center">
                <button className="text-blue-600 hover:bg-blue-100 p-1 mr-2" onClick={() => handleEditPengurus(p)}><Edit size={18} /></button>
                {/* <button className="text-red-600 hover:bg-red-100 p-1" onClick={() => handleDeletePengurus(p.id)}>
                  <Trash2 size={18} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PengurusEditModal
          isOpen={showEditModalPengurus}
          onClose={() => setShowEditModalPengurus(false)}
          pengurus={currentPengurus}
          setPengurus={setCurrentPengurus}
          onSave={handleUpdatePengurus}
          handleFileChange={handleFileChange}
      />

      {/* === MENTERI SECTION === */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Menteri</h2>
      <table className="min-w-full bg-white rounded shadow mb-6">
        <thead>
          <tr className="bg-blue-50 border-b text-left text-sm text-gray-600">
            <th className="p-2">Kementerian</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Foto</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {menteriData.map((m) => (
            <tr key={m.id} className="hover:bg-blue-50 border-b">
              <td className="p-2">{m.jabatan}</td>
              <td className="p-2">{m.nama}</td>
              <td className="p-2"><img src={m.foto_url || '/placeholder.png'} className="w-12 h-12 rounded-full object-cover" /></td>
              <td className="p-2 text-center">
                <button className="text-blue-600 hover:bg-blue-100 p-1 mr-2" onClick={() => handleEditMenteri(m)}><Edit size={18} /></button>
                {/* <button className="text-red-600 hover:bg-red-100 p-1" onClick={() => handleDeletePengurus(p.id)}>
                  <Trash2 size={18} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MenteriEditModal
          isOpen={showEditModalMenteri}
          onClose={() => setShowEditModalMenteri(false)}
          pengurus={currentMenteri}
          setPengurus={setCurrentMenteri}
          onSave={handleUpdateMenteri}
          handleFileChange={handleFileChange}
      />
          {/* Search and Add */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Anggota..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setShowTambahModalAnggota(true)}
            >
              <PlusCircle size={18} className="mr-2" /> Tambah Anggota
            </button>
          </div>
          <TambahAnggotaModal
            isOpen={showTambahModalAnggota}
            onClose={() => setShowTambahModalAnggota(false)}
            onAdd={handleAddAnggota}
            divisiList={divisiData}
          />
      {/* === DIVISI SECTION === */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Divisi dan Anggota</h2>

        {filteredDivisi.map((d) => (
          <div key={d.id} className="bg-white p-4 rounded shadow mb-6">
            {/* Info Divisi */}
            <h3 className="text-lg font-bold mb-1">{d.nama}</h3>
            {/* <p className="text-sm text-gray-600 mb-2">{d.deskripsi}</p> */}
            <div className="flex items-center mb-4">
              {d.ketua_foto_url ? (
                <img src={d.ketua_foto_url} className="w-12 h-12 rounded-full mr-3" />
              ) : (
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3">👤</div>
              )}
                        <button className="text-blue-600 hover:bg-blue-100 p-1 rounded mr-2" onClick={() => handleEditDivisi(d)}>
                          <Edit size={18} />
                        </button>
                        {/* <button className="text-red-600 hover:bg-red-100 p-1 rounded" onClick={() => handleDeleteDivisi(d.id)}>
                          <Trash2 size={18} />
                        </button> */}
            </div>

        {/* Tabel Anggota */}
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead className="bg-blue-50 text-gray-600 text-sm">
            <tr>
              <th className="p-2 border-b border-gray-200 text-left">Jabatan</th>
              <th className="p-2 border-b border-gray-200 text-left">Nama Anggota</th>
              <th className="p-2 border-b border-gray-200 text-left">Foto</th>
              <th className="p-2 border-b border-gray-200 text-center">Aksi</th>
            </tr>
          </thead>
            <tbody>
                {d.anggota_divisi.length > 0 ? (
                   [...d.anggota_divisi] // salin array agar tidak mutasi langsung
                    .sort((a, b) => {
                      // Jika a.jabatan adalah "Ketua", posisikan paling depan
                      if (a.jabatan === "Ketua") return -1;
                      if (b.jabatan === "Ketua") return 1;
                      return 0; // urutan lainnya tetap
                    }).map((anggota) => (
                    <tr key={anggota.id} className="hover:bg-blue-50">
                        <td className="p-2 border-b border-gray-200 text-sm">{anggota.jabatan}</td>
                        <td className="p-2 border-b border-gray-200 text-sm">{anggota.nama}</td>
                      <td className="p-2 border-b border-gray-200">
                        {anggota.foto_url ? (
                          <img
                            src={anggota.foto_url}
                            className="w-10 h-10 rounded-full object-cover"
                            alt={anggota.nama}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">👥</div>
                        )}
                      </td>
                      <td className="p-2 border-b border-gray-200 text-center">
                        <button className="text-blue-600 hover:bg-blue-100 p-1 rounded mr-2" onClick={() => handleEditAnggota(anggota)}>
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:bg-red-100 p-1 rounded" onClick={() => openDeleteModalAnggota(anggota)}>
                          <Trash2 size={18} />
                        </button>
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">Belum ada anggota</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

        </div>
        <EditDivisiModal
          isOpen={showEditModalDivisi}
          onClose={() => setShowEditModalDivisi(false)}
          onSave={handleUpdateDivisi}
          divisi={currentDivisi}
        />
        <AnggotaEditModal
          isOpen={showEditModalAnggota}
          onClose={() => setShowEditModalAnggota(false)}
          anggota={currentAnggota}
          divisiList={divisiData}
          onUpdate={handleUpdateAnggota}
          />
          <DeleteAnggotaModal
        isOpen={showDeleteModalAnggota}
        onClose={() => setShowDeleteModalAnggota(false)}
        anggota={currentDeleteAnggota}
        onDelete={handleConfirmDeleteAnggota}
          />

        <footer className="bg-white p-4 shadow mt-auto">
      <p className="text-center text-gray-600">© {new Date().getFullYear()} BEM FK UM. All rights reserved.</p>
    </footer>
      </div>
    </div>
  );
};

export default AdminPengurus;
