import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobFooter = () => {
  return (
    <footer className="bg-gray-100 text-black border border-t-2 py-3 px-12 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 text-sm mb-4 md:mb-0">
          <Link to='/' className="text-sm mb-4 md:mb-0">© 2024 Rightships</Link>
          <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</Link>
          <Link to="/contact-us" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact US</Link>
          <Link to="https://www.ervon.tech/" target="_blank" rel="noopener noreferrer" className="hover:underline">Power by Ervon Technology PVT LTD</Link>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/profile.php?id=61565469260372" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 text-blue-800" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-blue-800" />
          </a>
          <a href="https://www.instagram.com/rightshipsdotcom?igsh=N2Uyd3o1aDcyNHRr" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-red-500" />
          </a>
          <a href="https://www.youtube.com/@RightShips" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="w-6 h-6 text-red-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default JobFooter;
