import React, { useState } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';

const SimpleQACard = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const maskName = (name) => {
    if (!name) return 'Anonim';
    if (name.length <= 2) return name;
    return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      {/* Header with Avatar and Question */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
          {getInitials(question.nama_penanya)}
        </div>
        
        {/* Question */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            {sanitizeInput.escapeHtml(question.pertanyaan)}
          </h3>
        </div>
      </div>

      {/* Author and Answerer Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Oleh: {maskName(sanitizeInput.escapeHtml(question.nama_penanya))}
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          Dijawab oleh {question.yangMenjawab ? 
            sanitizeInput.escapeHtml(question.yangMenjawab) : 
            (question.admin ? sanitizeInput.escapeHtml(question.admin.nama) : 'Admin')
          }
        </p>
      </div>

      {/* Answer Preview */}
      <div className="mb-4">
        {question.jawaban ? (
          <div>
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              {isExpanded ? sanitizeInput.escapeHtml(question.jawaban) : sanitizeInput.escapeHtml(question.jawaban.substring(0, 120) + (question.jawaban.length > 120 ? '...' : ''))}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            Belum ada jawaban
          </p>
        )}
      </div>

      {/* Read More/Less Button */}
      {question.jawaban && question.jawaban.length > 120 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
        >
          {isExpanded ? 'Sembunyikan' : 'Selengkapnya →'}
        </button>
      )}

      {/* Date Info */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Dibuat: {formatDate(question.createdAt)}
          {question.answered_at && (
            <span className="ml-3">Dijawab: {formatDate(question.answered_at)}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SimpleQACard;
