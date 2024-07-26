import React from 'react';

const Footer = () => {
  return (
    <div id="footer" className="bg-white py-2 border-t">
      <footer className="max-w-screen-xl mx-auto px-4 flex flex-col items-start">
        <p className="text-sm text-black font-medium mb-1">© 2024 RightShips</p>
        <nav className="flex flex-wrap space-x-4">
          <a href="#" className="text-customGrey">
            <span className="underline underline-offset-4 text-xs">Cookies, Privacy and terms</span>
          </a>
          <a href="#" className="text-customGrey">
            <span className="font-extrabold text-xs">-</span> &nbsp;
            <span className="underline underline-offset-4 text-xs">Privacy Centre</span>
          </a>
          <a href="#" className="text-customGrey">
            <span className="font-extrabold text-xs">-</span> &nbsp;
            <span className="underline underline-offset-4 text-xs">Security</span>
          </a>
          <a href="#" className="text-customGrey">
            <span className="font-extrabold text-xs">-</span> &nbsp;
            <span className="underline underline-offset-4 text-xs">Billing</span>
          </a>
          <a href="#" className="text-customGrey">
            <span className="font-extrabold text-xs">-</span> &ensp;
            <span className="underline underline-offset-4 text-xs">Contact</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
