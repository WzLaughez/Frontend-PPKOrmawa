import React, { useState } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';

const QACard = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'answered':
        return 'Terjawab';
      case 'pending':
        return 'Menunggu Jawaban';
      case 'closed':
        return 'Ditutup';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(question.status)}`}>
                {getStatusText(question.status)}
              </span>
              {question.nama_penanya && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  oleh {sanitizeInput.escapeHtml(question.nama_penanya)}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {sanitizeInput.escapeHtml(question.pertanyaan)}
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg 
              className={`h-5 w-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Answer Section */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {question.jawaban ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-medium text-gray-900 dark:text-white">Jawaban:</h4>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {sanitizeInput.escapeHtml(question.jawaban)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>
                    Dijawab oleh {question.yangMenjawab ? 
                      sanitizeInput.escapeHtml(question.yangMenjawab) : 
                      (question.admin ? sanitizeInput.escapeHtml(question.admin.nama) : 'Admin')
                    }
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada jawaban</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Pertanyaan ini masih menunggu jawaban dari admin.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
          <div className="flex items-center gap-4">
            <span>Dibuat: {formatDate(question.createdAt)}</span>
            {question.answered_at && (
              <span>Dijawab: {formatDate(question.answered_at)}</span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
          >
            {isExpanded ? 'Sembunyikan' : 'Lihat Jawaban'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QACard;
