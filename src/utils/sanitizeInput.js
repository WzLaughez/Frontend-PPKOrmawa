// Input sanitization utilities
export const sanitizeInput = {
  // Sanitize HTML content to prevent XSS attacks
  sanitizeHtml: (input) => {
    if (!input || typeof input !== 'string') return '';
    
    // Remove potentially dangerous HTML tags and attributes
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove object tags
      .replace(/<embed\b[^<]*>/gi, '') // Remove embed tags
      .replace(/<link\b[^<]*>/gi, '') // Remove link tags
      .replace(/<meta\b[^<]*>/gi, '') // Remove meta tags
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/vbscript:/gi, '') // Remove vbscript: protocols
      .replace(/data:/gi, '') // Remove data: protocols
      .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
      .trim();
  },

  // Sanitize text input (remove HTML and limit length)
  sanitizeText: (input, maxLength = 1000) => {
    if (!input || typeof input !== 'string') return '';
    
    return sanitizeInput.sanitizeHtml(input)
      .substring(0, maxLength)
      .trim();
  },

  // Sanitize name input (alphanumeric, spaces, and common characters only)
  sanitizeName: (input, maxLength = 100) => {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/[^a-zA-Z0-9\s\-'\.]/g, '') // Keep only alphanumeric, spaces, hyphens, apostrophes, and dots
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .substring(0, maxLength)
      .trim();
  },

  // Sanitize email input
  sanitizeEmail: (input) => {
    if (!input || typeof input !== 'string') return '';
    
    // Basic email validation and sanitization
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const sanitized = input.trim().toLowerCase();
    
    return emailRegex.test(sanitized) ? sanitized : '';
  },

  // Sanitize search input
  sanitizeSearch: (input, maxLength = 200) => {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/['"]/g, '') // Remove quotes
      .replace(/[;]/g, '') // Remove semicolons
      .substring(0, maxLength)
      .trim();
  },

  // Escape HTML entities for safe display
  escapeHtml: (input) => {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Validate and sanitize question content
  sanitizeQuestion: (input) => {
    if (!input || typeof input !== 'string') return '';
    
    const sanitized = sanitizeInput.sanitizeText(input, 2000);
    
    // Check for minimum length
    if (sanitized.length < 10) {
      throw new Error('Pertanyaan terlalu pendek. Minimal 10 karakter.');
    }
    
    // Check for maximum length
    if (sanitized.length > 2000) {
      throw new Error('Pertanyaan terlalu panjang. Maksimal 2000 karakter.');
    }
    
    return sanitized;
  },

  // Validate and sanitize answer content
  sanitizeAnswer: (input) => {
    if (!input || typeof input !== 'string') return '';
    
    const sanitized = sanitizeInput.sanitizeText(input, 5000);
    
    // Check for minimum length
    if (sanitized.length < 10) {
      throw new Error('Jawaban terlalu pendek. Minimal 10 karakter.');
    }
    
    // Check for maximum length
    if (sanitized.length > 5000) {
      throw new Error('Jawaban terlalu panjang. Maksimal 5000 karakter.');
    }
    
    return sanitized;
  }
};

export default sanitizeInput;
