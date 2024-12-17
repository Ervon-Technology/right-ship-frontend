import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from "./Header";

// Import images for carousel
import Company1 from '../../images/companies/Company 1.jpg';
import Company2 from '../../images/companies/Company 2.jpg';
import Company3 from '../../images/companies/Company 3.jpg';
import Company4 from '../../images/companies/Company 4.jpg';
import Company5 from '../../images/companies/Company 5.jpg';
import Company6 from '../../images/companies/Company 6.jpeg';
import Company7 from '../../images/companies/Company 7.jpg';
import Company8 from '../../images/companies/Company 8.jpg';
import Company9 from '../../images/companies/Company 9.jpg';
import Company10 from '../../images/companies/Company 10.jpg';
import Company11 from '../../images/companies/Company 11.jpg';
import Company12 from '../../images/companies/Company 12.jpg';
import Company13 from '../../images/companies/Company 13.jpg';
import Company14 from '../../images/companies/Company 14.jpg';
import Company15 from '../../images/companies/Company 15.jpeg';
import Company16 from '../../images/companies/Company 16.jpg';
import Company17 from '../../images/companies/Company 17.jpg';
import Company18 from '../../images/companies/Company 18.jpg';
import Company19 from '../../images/companies/Company 19.jpg';
import Company20 from '../../images/companies/Company 20.jpg';
import Company21 from '../../images/companies/Company 21.jpg';
import Company22 from '../../images/companies/Company 22.jpg';
import Company23 from '../../images/companies/Company 23.jpeg';
import Company24 from '../../images/companies/Company 24.jpg';

const TopCompaniesCarousel = () => {
  const companyImages = [
    Company1, Company2, Company3, Company4, Company5, Company6, 
    Company7, Company8, Company9, Company10, Company11, Company12, 
    Company13, Company14, Company15, Company16, Company17, Company18, 
    Company19, Company20, Company21, Company22, Company23, Company24
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(companyImages.length / itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1079B5] to-[#C11010]">
          Top Companies
        </span>
      </h2>

      <div className="relative group px-6 md:px-8 lg:px-12">
        <div className="grid gap-6 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-rows-2 gap-4 lg:gap-6 py-6">
            {companyImages
              .slice(currentIndex * itemsPerSlide, currentIndex * itemsPerSlide + itemsPerSlide)
              .map((company, index) => (
                <div
                  key={index}
                  className="px-4 py-8 bg-[#F6F6F6] rounded-xl"
                >
                  <img
                    src={company}
                    alt={`Company ${index + 1}`}
                    className="w-full max-h-20 object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 
                     bg-white shadow-md p-2 rounded-full 
                     border-2 border-gray-300
                     hover:border-[#084C73]
                     transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))}
        >
          <ChevronLeft size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>
        <button
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 
                     bg-white shadow-md p-2 rounded-full 
                     border-2 border-gray-300
                     hover:border-[#084C73]
                     transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))}
        >
          <ChevronRight size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              } transition-all duration-300`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StandardCompaniesCarousel = () => {
  const companyImages = [
    Company1, Company2, Company3, Company4, Company5, Company6, 
    Company7, Company8, Company9, Company10, Company11, Company12, 
    Company13, Company14, Company15, Company16, Company17, Company18, 
    Company19, Company20, Company21, Company22, Company23, Company24
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 12;
  const totalSlides = Math.ceil(companyImages.length / itemsPerSlide);

  return (
    <div className="py-10 bg-[#EFF7FF]">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1079B5] to-[#C11010]">
          Standard Companies
        </span>
      </h2>

      <div className="relative group px-6 md:px-8 lg:px-12">
        <div className="grid gap-6 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 grid-rows-4 gap-4 lg:gap-6 py-6">
            {companyImages
              .slice(currentIndex * itemsPerSlide, currentIndex * itemsPerSlide + itemsPerSlide)
              .map((company, index) => (
                <div
                  key={index}
                  className="px-4 py-4 md:py-6 lg:py-8 bg-white rounded-xl shadow-sm"
                >
                  <img
                    src={company}
                    alt={`Company ${index + 1}`}
                    className="w-full max-h-20 object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 
                     bg-white shadow-md p-2 rounded-full 
                     border-2 border-gray-300
                     hover:border-[#084C73]
                     transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))}
        >
          <ChevronLeft size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>
        <button
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 
                     bg-white shadow-md p-2 rounded-full 
                     border-2 border-gray-300
                     hover:border-[#084C73]
                     transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))}
        >
          <ChevronRight size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              } transition-all duration-300`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ListedCompaniesCarousel = () => {
  const companyImages = [
    Company1, Company2, Company3, Company4, Company5, Company6, 
    Company7, Company8, Company9, Company10, Company11, Company12, 
    Company13, Company14, Company15, Company16, Company17, Company18, 
    Company19, Company20, Company21, Company22, Company23, Company24
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 12; // Number of items per slide (2 rows * 6 columns)
  const totalSlides = Math.ceil(companyImages.length / itemsPerSlide);

  return (
    <div className="py-14 bg-white">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1079B5] to-[#C11010]">
          Listed <span className="text-[#C11010]">Companies</span>
        </span>
      </h2>

      {/* Carousel Container */}
      <div className="relative group px-6 md:px-12 lg:px-16">
        {/* Company Logos Grid */}
        <div className="grid gap-4 sm:gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-2 transition-transform duration-300 ease-in-out py-6">
          {companyImages
            .slice(currentIndex * itemsPerSlide, currentIndex * itemsPerSlide + itemsPerSlide)
            .map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                <img
                  src={company}
                  alt={`Company ${index + 1}`}
                  className="max-w-[110px] md:max-w-[120px] max-h-16 sm:max-h-20 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute  left-2 md:left-6 top-1/2 size={32} transform -translate-y-1/2 
                    bg-white shadow-md p-2 rounded-full 
                    border-2 border-gray-300
                    hover:border-[#084C73]
                    transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))}
        >
          <ChevronLeft size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>
        <button
          className="absolute  right-2 md:right-6 top-1/2 size={32} transform -translate-y-1/2 
                      bg-white shadow-md p-2 rounded-full 
                      border-2 border-gray-300
                      hover:border-[#084C73]
                      transition-all duration-300 ease-in-out"
          onClick={() => setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))}
        >
          <ChevronRight size={32} className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 sm:mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex
                  ? "bg-[#1079B5] scale-110"
                  : "bg-gray-400 hover:bg-gray-500"
              } transition-all duration-300`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};



const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto py-6">
        <TopCompaniesCarousel />
        <StandardCompaniesCarousel />
        <ListedCompaniesCarousel />
      </div>
    </div>
  );
};

export default HomePage;