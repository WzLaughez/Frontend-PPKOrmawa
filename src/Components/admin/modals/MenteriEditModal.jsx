import React from 'react';

const MenteriEditModal = ({ isOpen, 
  onClose, 
  pengurus, 
  setPengurus, 
  onSave,
  selectedFile,
  handleFileChange }) => {
  if (!isOpen || !pengurus) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 relative shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Pengurus</h3>


        {/* Input Jabatan */}
        <label className="block mb-2">Jabatan:</label>
        <input
          className="w-full border p-2 mb-4"
          value={pengurus.jabatan}
          onChange={(e) => setPengurus({ ...pengurus, jabatan: e.target.value })}
        />
        {/* Input Nama */}
        <label className="block mb-2">Nama:</label>
        <input
          className="w-full border p-2 mb-4"
          value={pengurus.nama}
          onChange={(e) => setPengurus({ ...pengurus, nama: e.target.value })}
        />

        {/* Input Foto (opsional) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Upload Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {selectedFile && (
            <p className="text-xs mt-1 text-gray-500">File terpilih: {selectedFile.name}</p>
          )}
          {pengurus.foto && !selectedFile && (
            <img
              src={pengurus.foto}
              alt={pengurus.nama}
              className="w-16 h-16 rounded-full mt-2 object-cover"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteriEditModal;
