import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Company1 from '../images/companies/Company 1.jpg';
import Company2 from '../images/companies/Company 2.jpg';
import Company3 from '../images/companies/Company 3.jpg';
import Company4 from '../images/companies/Company 4.jpg';
import Company5 from '../images/companies/Company 5.jpg';
import Company6 from '../images/companies/Company 6.jpeg';
import Company7 from '../images/companies/Company 7.jpg';
import Company8 from '../images/companies/Company 8.jpg';
import Company9 from '../images/companies/Company 9.jpg';
import Company10 from '../images/companies/Company 10.jpg';
import Company11 from '../images/companies/Company 11.jpg';
import Company12 from '../images/companies/Company 12.jpg';
import Company13 from '../images/companies/Company 13.jpg';
import Company14 from '../images/companies/Company 14.jpg';
import Company15 from '../images/companies/Company 15.jpeg';
import Company16 from '../images/companies/Company 16.jpg';
import Company17 from '../images/companies/Company 17.jpg';
import Company18 from '../images/companies/Company 18.jpg';
import Company19 from '../images/companies/Company 19.jpg';
import Company20 from '../images/companies/Company 20.jpg';
import Company21 from '../images/companies/Company 21.jpg';
import Company22 from '../images/companies/Company 22.jpg';
import Company23 from '../images/companies/Company 23.jpeg';
import Company24 from '../images/companies/Company 24.jpg';

// Organize images into slides with 10 images each
const imageSlides = [
  [
    { id: 1, src: Company1, alt: 'Company 1' },
    { id: 2, src: Company2, alt: 'Company 2' },
    { id: 3, src: Company3, alt: 'Company 3' },
    { id: 4, src: Company4, alt: 'Company 4' },
    { id: 5, src: Company5, alt: 'Company 5' },
    { id: 6, src: Company6, alt: 'Company 6' },
    { id: 7, src: Company7, alt: 'Company 7' },
    { id: 8, src: Company8, alt: 'Company 8' },
    { id: 9, src: Company9, alt: 'Company 9' },
    { id: 10, src: Company10, alt: 'Company 10' },
  ],
  [
    { id: 11, src: Company11, alt: 'Company 11' },
    { id: 12, src: Company12, alt: 'Company 12' },
    { id: 13, src: Company13, alt: 'Company 13' },
    { id: 14, src: Company14, alt: 'Company 14' },
    { id: 15, src: Company15, alt: 'Company 15' },
    { id: 16, src: Company16, alt: 'Company 16' },
    { id: 17, src: Company17, alt: 'Company 17' },
    { id: 18, src: Company18, alt: 'Company 18' },
    { id: 19, src: Company19, alt: 'Company 19' },
    { id: 20, src: Company20, alt: 'Company 20' },
  ],
  [
    { id: 21, src: Company21, alt: 'Company 21' },
    { id: 22, src: Company22, alt: 'Company 22' },
    { id: 23, src: Company23, alt: 'Company 23' },
    { id: 24, src: Company24, alt: 'Company 24' },
  ],
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleImageClick = () => {
    navigate('/logos', { state: { currentSlideImages: imageSlides[currentIndex] } });
  };

  return (
    <div
      className="relative overflow-hidden bg-gray-200 h-auto flex justify-center items-center rounded-lg p-6" // Added padding
      style={{ minHeight: '400px' }} // Increased the minimum height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageSlides.map((slide, index) => (
          <div className="min-w-full flex justify-center items-center" key={index}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
              {slide.map((image) => (
                <div key={image.id} className="flex justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-h-40 object-cover cursor-pointer rounded-lg" // Adjusted max height
                    onClick={handleImageClick}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + imageSlides.length) % imageSlides.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black p-2 rounded-full shadow text-white"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSlides.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black p-2 rounded-full shadow text-white"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
