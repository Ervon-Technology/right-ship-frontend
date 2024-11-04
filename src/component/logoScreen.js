import React from 'react';
import { useLocation } from 'react-router-dom';

const LogosScreen = () => {
  const location = useLocation();
  const { currentSlideImages } = location.state || {}; // Retrieve images passed in state

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Logos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentSlideImages ? (
          currentSlideImages.map((image) => (
            <div key={image.id} className="flex justify-center items-center bg-white p-2 rounded shadow-md">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto max-h-32 object-contain" // Adjusting object to prevent cropping
              />
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No logos to display</p>
        )}
      </div>
    </div>
  );
};

export default LogosScreen;
