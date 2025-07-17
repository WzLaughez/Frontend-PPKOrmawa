import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from './utils/supabaseClient';
import { PlusCircle, Trash2,Search, Edit,ArrowLeft, 
  ChevronLeft, ChevronRight, Users,
  FileText, Menu, GalleryHorizontal } from 'lucide-react';
import SubgaleriFormModal from './modals/SubgaleriFormModal';
import heic2any from 'heic2any';

export default function GaleriDetail() {
  const { galeriDivisiId } = useParams();
  const [subgaleri, setSubgaleri] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', image_url: '', id: null });
  const [selectedFile, setSelectedFile] = useState(null);

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [showSidebar, setShowSidebar] = useState(true);
  const fetchGaleriDivisiDetail = async () => {
  const { data, error } = await supabase
    .from('galeri_divisi')
    .select('deskripsi')
    .eq('id', galeriDivisiId)
    .single();

  if (!error) setGaleriDivisiDetail(data);
  };
const [galeriDivisiDetail, setGaleriDivisiDetail] = useState(null);

  const fetchSubgaleri = async () => {
    const { data, error } = await supabase
      .from('subgaleri')
      .select('*')
      .eq('galeri_id', galeriDivisiId)
      .order('created_at', { ascending: false });

    if (!error) setSubgaleri(data);
  };

  useEffect(() => {
    fetchSubgaleri();
    fetchGaleriDivisiDetail();
  }, [galeriDivisiId]);
  const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
  };

const resetForm = () => {
  setFormData({ title: '', image_url: '', id: null });
  setSelectedFile(null);
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  
  setLoading(true);
  let image_url = formData.image_url;

  try {
    if (selectedFile) {
      let uploadBlob = selectedFile;
      let fileExt = selectedFile.name.split('.').pop();
      let fileName = `${Date.now()}.${fileExt}`;
      let contentType = selectedFile.type;
      // 👇 Cek dan konversi jika HEIC
      if (
        selectedFile.type === 'image/heic' ||
        selectedFile.name.toLowerCase().endsWith('.heic')
      ) {
        const converted = await heic2any({
          blob: selectedFile,
          toType: 'image/jpeg',
          quality: 0.9,
        });

        const finalBlob = Array.isArray(converted) ? converted[0] : converted;
        console.log('Converted Blob Type:', finalBlob.type);
        uploadBlob = new File(
          [finalBlob],
          `${Date.now()}.jpg`,
          { type: 'image/jpeg' } // Pastikan ini ada!
        );
        fileExt = 'jpg';
        fileName = `${Date.now()}.jpg`;
        contentType = 'image/jpeg';
      }

      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pengumuman')
        .upload(filePath, uploadBlob, {
          contentType, // ⬅️ ini sangat penting!
      });

      if (uploadError) throw new Error('Gagal upload gambar');

      const { data: publicUrl } = supabase
        .storage
        .from('pengumuman')
        .getPublicUrl(filePath);

      image_url = publicUrl.publicUrl;
    }

    if (formData.id) {
      const { error } = await supabase
        .from('subgaleri')
        .update({ nama_kegiatan: formData.title, image_url })
        .eq('id', formData.id);

      if (error) throw error;

      showNotification('Subgaleri berhasil diperbarui', 'success');
    } else {
      const { error } = await supabase
        .from('subgaleri')
        .insert([
          {
            nama_kegiatan: formData.title,
            image_url,
            galeri_id: galeriDivisiId,
          },
        ]);

      if (error) throw error;

      showNotification('Subgaleri berhasil ditambahkan', 'success');
    }

    fetchSubgaleri();
    setShowEditModal(false);
    resetForm();
  } catch (err) {
    console.error(err);
    showNotification(err.message || 'Terjadi kesalahan', 'error');
  } finally {
    setLoading(false); // ⬅️ Pastikan ini dipanggil terakhir
  }
};



  const handleDelete = async (id) => {
    const { error } = await supabase.from('subgaleri').delete().eq('id', id);
    if (!error) fetchSubgaleri();
  };

    const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };
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
          
  <div className="flex-1 overflow-auto">
    
      <header className="bg-white p-4 shadow">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
    </header>

    {notification.show && (
        <div className={`mb-4 px-4 py-2 rounded text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.message}
        </div>
      )}
      {/* Add Button in the right side*/}
          <div className="flex justify-between items-center m-6">
            <Link to="/admin/galeri">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <ArrowLeft size={18} className="mr-2" /> Kembali
            </button>
            </Link>
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
{galeriDivisiDetail && (
  <h3 className="text-xl font-semibold text-gray-700 px-6 pb-2">
    {galeriDivisiDetail.deskripsi}
  </h3>
)}
      {/* Daftar Subgaleri */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-4">
        {subgaleri.map((item) => (
          <div key={item.id} className="bg-white shadow rounded overflow-hidden">
            <img src={item.image_url } alt={item.nama_kegiatan} className="w-full h-48 object-cover" />
            <div className="p-3 flex justify-between items-center">
              <p className="font-medium">{item.nama_kegiatan}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <SubgaleriFormModal
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  onSubmit={handleSubmit}
  formData={formData}
  setFormData={setFormData}
  handleFileChange={handleFileChange}
  loading={loading}
/>

  </div>
  );
}
