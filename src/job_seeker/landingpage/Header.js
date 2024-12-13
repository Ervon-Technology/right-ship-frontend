import React from 'react';
import { Link } from "react-router-dom";
import backgroundImage from '../../images/landing/background.png';
import { ArrowUpRight } from 'lucide-react';

const Header = () => {
  return (
    <section
      className="z-0 relative bg-no-repeat min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Light Blue Overlay */}
      <div className="absolute inset-0 bg-blue-300/20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 sm:mb-16 leading-tight">
          Fill your dreams here with RIGHTSHIPS.COM
        </h1>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
          {/* Candidate Section */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link
              to="/login"
              className="group w-full sm:w-[258px] h-[58px] sm:h-[68px] flex justify-center items-center
                         bg-[#084C73] hover:bg-blue-800 text-white font-medium
                         rounded-lg shadow-lg transition-all
                         transform hover:-translate-y-2 hover:scale-105
                         relative px-4 sm:px-0"
            >
              <span className="text-xl sm:text-2xl font-semibold">
                I want a Job
              </span>
              <ArrowUpRight
                className="absolute top-3 right-3 text-white/70 group-hover:text-white transition-colors"
                size={24}
              />
            </Link>
            <p className="mt-4 text-white text-base sm:text-lg font-medium">
              For Candidate
            </p>
          </div>
          
          {/* Company Section */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link
              to="/company"
              className="group w-full sm:w-[258px] h-[58px] sm:h-[68px] flex justify-center items-center
                         bg-red-800 hover:bg-red-700 text-white font-medium
                         rounded-lg shadow-lg transition-all
                         transform hover:-translate-y-2 hover:scale-105
                         relative px-4 sm:px-0"
            >
              <span className="text-xl sm:text-2xl font-semibold">
                I want to Hire
              </span>
              <ArrowUpRight
                className="absolute top-3 right-3 text-white/70 group-hover:text-white transition-colors"
                size={24}
              />
            </Link>
            <p className="mt-4 text-white text-base sm:text-lg font-medium">
              For Company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;