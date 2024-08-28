import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const JobFooter = () => {
  return (
    <footer className="bg-gray-100 text-black border border-t-2 py-3 px-12 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 text-sm mb-4 md:mb-0">
          <a href='/' className="text-sm mb-4 md:mb-0">© 2024 Rightships</a>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 text-blue-800" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-blue-800" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-red-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default JobFooter;
