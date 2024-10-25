import React, { useState, useEffect } from 'react';
import Company1 from '../images/companies/Company 1.jpg';
import Company2 from '../images/companies/Company 10.jpg';
import Company3 from '../images/companies/Company 11.jpg';
import Company4 from '../images/companies/Company 12.jpg';

const images = [
  { id: 1, src: Company1, alt: 'Company 1' },
  { id: 2, src: Company2, alt: 'Company 2' },
  { id: 3, src: Company3, alt: 'Company 3' },
  { id: 4, src: Company4, alt: 'Company 4' },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // Loop through the slides
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="relative overflow-hidden bg-white h-64 flex justify-center items-center">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="min-w-full flex justify-center items-center" key={index}>
            <div className="flex justify-center space-x-4">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className="w-1/5 h-auto" // Adjust image size
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % 4)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
