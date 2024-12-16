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

const HomePage = () => {
  const companyImages = [
    Company1, Company2, Company3, Company4, Company5, Company6, 
    Company7, Company8, Company9, Company10, Company11, Company12, 
    Company13, Company14, Company15, Company16, Company17, Company18, 
    Company19, Company20, Company21, Company22, Company23, Company24
  ];

  const Carousel = ({ 
    title, 
    companies, 
    layout = "grid", 
    autoSlide = false, 
    autoSlideInterval = 3000,
    itemsPerSlide = 6
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSlides = Math.ceil(companies.length / itemsPerSlide);

    useEffect(() => {
      if (!autoSlide) return;

      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }, [autoSlide, totalSlides, autoSlideInterval]);

    const backgroundStyle = layout === "top" ? "bg-gray-50" : 
                            layout === "standard" ? "bg-[#EFF7FF]" : 
                            layout === "listed" ? "bg-gray-50" : 
                            "bg-white";

    const gridConfig = layout === "top" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 grid-rows-2" : 
                       layout === "standard" ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-3 grid-rows-4" : 
                       layout === "listed" ? "grid-cols-2 md:grid-cols-6 lg:grid-cols-6 grid-rows-2" : 
                       "grid-cols-2 sm:grid-cols-3 grid-rows-3";

    return (
      <div className={`py-10 ${backgroundStyle}`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1079B5] to-[#C11010]">
            {title}
          </span>
        </h2>

        <div className="relative group px-10 md:px-8 lg:px-12">
          <div className="grid gap-6 transition-all duration-300 ease-in-out">
            <div className={`grid ${gridConfig} gap-4 lg:gap-6`}>
              {companies
                .slice(currentIndex * itemsPerSlide, currentIndex * itemsPerSlide + itemsPerSlide)
                .map((company, index) => (
                  <div
                    key={index}
                    className={`px-4 py-8 ${
                      layout === "top" ? "bg-[#F6F6F6] rounded-xl" : layout === "standard" ? "bg-white rounded-xl shadow-sm" : "bg-transparent"
                    }`}
                    
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
            className="absolute left-6 top-1/2 transform -translate-y-1/2 
                       bg-white shadow-md p-2 rounded-full 
                       border-2 border-gray-300
                       hover:border-[#084C73]
                       transition-all duration-300 ease-in-out"
            onClick={() => setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))}
          >
            <ChevronLeft className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
          </button>
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 
                       bg-white shadow-md p-2 rounded-full 
                       border-2 border-gray-300
                       hover:border-[#084C73]
                       transition-all duration-300 ease-in-out"
            onClick={() => setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="text-[#C1C1C1] hover:text-[#084C73] transition-colors duration-300" />
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

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto py-6">
        <Carousel 
          title="Top Companies" 
          companies={companyImages} 
          layout="top" 
          itemsPerSlide={6}
          autoSlide={true}
        />
        <Carousel 
          title="Standard Companies" 
          companies={companyImages} 
          layout="standard" 
          itemsPerSlide={12}
          responsive={true}
        />
        <Carousel 
          title="Listed Companies" 
          companies={companyImages} 
          layout="listed" 
          itemsPerSlide={12}
          responsive={true}
        />
      </div>
    </div>
  );
};

export default HomePage;