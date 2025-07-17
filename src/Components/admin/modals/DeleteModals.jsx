import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, pengumuman }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
        <p className="mb-6">
          Apakah Anda yakin ingin menghapus pengumuman "<span className="font-semibold">{pengumuman?.deskripsi}</span>"?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
