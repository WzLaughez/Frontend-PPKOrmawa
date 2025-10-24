import React, { useState } from 'react';
import { tanyaJawabService } from '../../lib/tanyaJawabService';
import { MessageCircle, Send } from 'lucide-react';

const FooterQuestionForm = () => {
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pertanyaan.trim()) {
      setError('Pertanyaan harus diisi');
      return;
    }

    if (!formData.nama_penanya.trim()) {
      setError('Nama harus diisi');
      return;
    }

    if (!formData.email_penanya.trim()) {
      setError('Email harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await tanyaJawabService.askQuestion(formData);
      
      setSuccess(true);
      setFormData({
        pertanyaan: '',
        nama_penanya: '',
        email_penanya: ''
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Gagal mengirim pertanyaan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Ada Pertanyaan?
        </h4>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Kirim pertanyaan Anda dan kami akan segera menjawabnya.
      </p>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
          <div className="flex">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-green-800 dark:text-green-200">
                Pertanyaan berhasil dikirim! Terima kasih.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Question */}
        <div>
          <textarea
            name="pertanyaan"
            rows={3}
            value={formData.pertanyaan}
            onChange={handleChange}
            placeholder="Tuliskan pertanyaan Anda di sini..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-sm"
            required
          />
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="nama_penanya"
            value={formData.nama_penanya}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            required
          />
          <input
            type="email"
            name="email_penanya"
            value={formData.email_penanya}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
            <p className="text-xs text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Kirim Pertanyaan
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
        Pertanyaan akan ditinjau oleh admin sebelum dipublikasikan.
      </p>
    </div>
  );
};

export default FooterQuestionForm;
