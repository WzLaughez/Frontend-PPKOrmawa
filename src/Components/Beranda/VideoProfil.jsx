import React from 'react';

const VideoProfil = () => {
  const videoId = "ypmoHwmLPF0";

  return (
    <div className="mt-6 max-w-xl mx-auto px-4">
      <div className="bg-white shadow-md overflow-hidden">
        {/* Video Embed */}
        <div className="relative aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Deskripsi */}
        <div className="p-4">
          <p className="text-gray-700 ">
            Tonton video edukasi kami yang informatif dan inspiratif.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoProfil;
