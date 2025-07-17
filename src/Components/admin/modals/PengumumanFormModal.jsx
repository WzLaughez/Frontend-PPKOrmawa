import React, { useState } from 'react';
import { X } from 'lucide-react';

const PengumumanFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleFileChange,
  currentPengumuman
}) => {
  if (!isOpen) return null;
const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {currentPengumuman ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await onSubmit(e);
    onClose(); // jika ingin otomatis tutup
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Konten</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Upload Gambar</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} 
                    className="w-full p-2 border rounded"
                    />
                </div>


          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Batal
            </button>
            <button
  type="submit"
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Menyimpan...
    </>
  ) : (
    currentPengumuman ? 'Perbarui' : 'Simpan'
  )}
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default PengumumanFormModal;
