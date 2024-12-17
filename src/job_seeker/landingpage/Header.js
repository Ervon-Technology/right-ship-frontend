import React from 'react';
import { Link } from "react-router-dom";
import backgroundImage from '../../images/landing/background.png';
import { CircleArrowUp } from 'lucide-react';

const Header = () => {
  return (
    <section
      className="z-0 relative bg-no-repeat min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Light Blue Overlay */}
      <div className="absolute inset-0 bg-blue-300/20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl">
        {/* Header Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-16 leading-tight">
          Fill your dreams here with RIGHTSHIPS.COM
        </h1>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
          {/* Candidate Section */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link
              to="/login"
              className="group w-full max-w-xs sm:w-[258px] h-[58px] sm:h-[68px] flex justify-center items-center
                         bg-[#084C73] hover:bg-customBlue2 text-white font-medium
                         rounded-lg shadow-lg transition-all
                         relative px-4 sm:px-0"
            >
              <span className="text-lg sm:text-2xl font-medium">
                I want a Job
              </span>
              <CircleArrowUp
                className="absolute top-3 right-3 sm:top-5 sm:right-4 rotate-45 text-white/70 group-hover:text-white transition-colors"
                size={24} // Adjusted size for small screens
              />
            </Link>
            <p className="mt-3 sm:mt-4 text-white text-sm sm:text-lg font-medium">
              For Candidate
            </p>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link
              to="/company"
              className="group w-full max-w-xs sm:w-[258px] h-[58px] sm:h-[68px] flex justify-center items-center
                         bg-red-800 hover:bg-red-700 text-white font-medium
                         rounded-lg shadow-lg transition-all
                         relative px-4 sm:px-0"
            >
              <span className="text-lg sm:text-2xl font-medium">
                I want to Hire
              </span>
              <CircleArrowUp
                className="absolute top-3 right-3 sm:top-5 sm:right-4 rotate-45 text-white/70 group-hover:text-white transition-colors"
                size={24} // Adjusted size for small screens
              />
            </Link>
            <p className="mt-3 sm:mt-4 text-white text-sm sm:text-lg font-medium">
              For Company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
