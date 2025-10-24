import React, { useState } from 'react';
import { tanyaJawabService } from '../../lib/tanyaJawabService';
import { sanitizeInput } from '../../utils/sanitizeInput';

const AskQuestion = ({ onClose, onSubmitted }) => {
  const [formData, setFormData] = useState({
    pertanyaan: '',
    nama_penanya: '',
    email_penanya: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input based on field type
    let sanitizedValue = value;
    
    switch (name) {
      case 'pertanyaan':
        sanitizedValue = sanitizeInput.sanitizeText(value, 2000);
        break;
      case 'nama_penanya':
        sanitizedValue = sanitizeInput.sanitizeName(value, 100);
        break;
      case 'email_penanya':
        sanitizedValue = sanitizeInput.sanitizeEmail(value);
        break;
      default:
        sanitizedValue = sanitizeInput.sanitizeText(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Additional validation and sanitization before submission
      const sanitizedData = {
        pertanyaan: sanitizeInput.sanitizeQuestion(formData.pertanyaan),
        nama_penanya: sanitizeInput.sanitizeName(formData.nama_penanya),
        email_penanya: sanitizeInput.sanitizeEmail(formData.email_penanya)
      };
      
      if (!sanitizedData.pertanyaan.trim()) {
        setError('Pertanyaan harus diisi');
        return;
      }

      setLoading(true);
      setError(null);
      
      await tanyaJawabService.askQuestion(sanitizedData);
      
      setSuccess(true);
      setFormData({
        pertanyaan: '',
        nama_penanya: '',
        email_penanya: ''
      });
      
      setTimeout(() => {
        onSubmitted();
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Gagal mengirim pertanyaan');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Pertanyaan Berhasil Dikirim!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Pertanyaan Anda telah dikirim dan akan segera dijawab oleh admin.
            </p>
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ajukan Pertanyaan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question */}
          <div>
            <label htmlFor="pertanyaan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pertanyaan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pertanyaan"
              name="pertanyaan"
              rows={4}
              value={formData.pertanyaan}
              onChange={handleChange}
              placeholder="Tuliskan pertanyaan Anda di sini..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Name (Optional) */}
          <div>
            <label htmlFor="nama_penanya" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama (Opsional)
            </label>
            <input
              type="text"
              id="nama_penanya"
              name="nama_penanya"
              value={formData.nama_penanya}
              onChange={handleChange}
              placeholder="Masukkan nama Anda (opsional)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label htmlFor="email_penanya" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email (Opsional)
            </label>
            <input
              type="email"
              id="email_penanya"
              name="email_penanya"
              value={formData.email_penanya}
              onChange={handleChange}
              placeholder="Masukkan email Anda (opsional)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Pertanyaan Anda akan ditinjau oleh admin sebelum dipublikasikan. 
                  Nama dan email bersifat opsional untuk pertanyaan anonim.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {loading ? 'Mengirim...' : 'Kirim Pertanyaan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
