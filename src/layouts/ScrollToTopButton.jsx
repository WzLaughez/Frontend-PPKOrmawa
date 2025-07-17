import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 bg-Peach text-white p-3 rounded-full shadow-lg hover:bg-Peach/80 transition-colors"
        >
          <ChevronUpIcon size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;