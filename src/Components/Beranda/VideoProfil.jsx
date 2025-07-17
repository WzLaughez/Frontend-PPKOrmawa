import React, { useEffect } from 'react'

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const VideoProfil = () => {
  const videoId = "utZQ10UBXe8";
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: false, // Run animation only once
    });
  }, []);
  const YouTubeEmbed = ({ videoId }) => (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
  return (
    <div className="font-inter mt-5" data-aos="fade-up">
  <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50">
      {/* Gradient overlay for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Video container with improved aspect ratio */}
      <div className="relative aspect-video bg-gray-900 rounded-t-2xl overflow-hidden">
        <YouTubeEmbed videoId={videoId} />
        
        {/* Play button overlay effect */}
      
      </div>
      
      {/* Content section */}
      <div className="relative p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            
            <p className="text-gray-600 leading-relaxed mb-4">
              Discover engaging content that brings ideas to life through compelling storytelling and visual excellence.
            </p>
            
            {/* Metadata tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                Featured
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                HD Quality
              </span>
            </div>
          </div>
          
          {/* Action button */}
          <a href="https://www.youtube.com/watch?v=utZQ10UBXe8" target="_blank" rel="noopener noreferrer" className="flex-shrink-0"><i className="fas fa-play mr-2"></i>
          <button className="flex-shrink-0 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Watch Now
          </button>
          </a>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}

export default VideoProfil