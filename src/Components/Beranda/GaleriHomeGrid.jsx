import React from 'react';

const GaleriHomeGrid = ({ images }) => {
  return (
     <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
            <img 
              src={image.image_url} 
              alt={image.nama_kegiatan} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 className="text-white text-center text-sm font-semibold p-2">
              {image.nama_kegiatan}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GaleriHomeGrid;
