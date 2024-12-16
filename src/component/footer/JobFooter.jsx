import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const JobFooter = () => {
  return (
    <footer className="bg-[#002A42] text-white">
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Left Section */}
        <div className="text-left">
          <h2 className="text-xl font-bold mb-4">RIGHTSHIPS</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Address:</strong> Level 1, 12 Sample St, Sydney NSW 2000
            </p>
            <p>
              <strong>Contact:</strong> +91 22 4516 4128, +91 22 4516 4141
            </p>
            <p>info@rightships.com</p>
          </div>
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61565469260372"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
            >
              <FaFacebook className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com/rightshipsdotcom?igsh=N2Uyd3o1aDcyNHRr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
            >
              <FaInstagram className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
            >
              <FaLinkedin className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
            <a
              href="https://www.youtube.com/@RightShips"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
            >
              <FaYoutube className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Jobs & Courses Section */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/jobs" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:underline">
                Courses
              </a>
            </li>
          </ul>
        </div>

        {/* Apply Now Section */}
        <div className="text-left">
          <h3 className="text-lg font-bold mb-4">Apply Now</h3>
          <form className="space-y-4 w-full max-w-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea
              placeholder="Message"
              className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-600 text-sm py-4">
        <div className="container mx-auto px-4 md:px-14 flex flex-col md:flex-row justify-between text-left space-y-8 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</Link>
            <Link to="/cookie-settings" className="hover:underline">
              Cookies Settings
            </Link>
            <p>© 2024 Rightships.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default JobFooter;
