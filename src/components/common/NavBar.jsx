import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiStar } from 'react-icons/fi';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo - Centered on mobile, left on desktop */}
        <div className="flex items-center mb-2 md:mb-0">
          <FiStar className="text-orange-500 text-lg md:text-2xl mr-2" />
          <Link to="/" className="text-md md:text-xl font-bold text-gray-800">Luxury Haven</Link>
        </div>
        
        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex space-x-6 md:space-x-8 mx-auto">
          <Link to="/" className="text-gray-800 hover:text-yellow-600 font-medium text-sm md:text-base">Home</Link>
          <Link to="/rooms" className="text-gray-800 hover:text-yellow-600 font-medium text-sm md:text-base">Rooms</Link>
          <Link to="/about" className="text-gray-800 hover:text-yellow-600 font-medium text-sm md:text-base">About Us</Link>
          <Link to="/contact" className="text-gray-800 hover:text-yellow-600 font-medium text-sm md:text-base">Contact Us</Link>
        </nav>

        {/* Book Now Button - Right on desktop */}
        <div className="hidden md:block">
          <Link to="/book" className="bg-orange-400 hover:bg-orange-400 text-black px-4 md:px-6 py-1 md:py-2 rounded-md font-medium transition duration-300 text-sm md:text-base">
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden absolute right-4 top-3 text-gray-800 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-800 hover:text-yellow-600 font-medium py-2" onClick={closeMenu}>Home</Link>
            <Link to="/rooms" className="text-gray-800 hover:text-yellow-600 font-medium py-2" onClick={closeMenu}>Rooms</Link>
            <Link to="/about" className="text-gray-800 hover:text-yellow-600 font-medium py-2" onClick={closeMenu}>About Us</Link>
            <Link to="/contact" className="text-gray-800 hover:text-yellow-600 font-medium py-2" onClick={closeMenu}>Contact Us</Link>
            <Link 
              to="/book" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-medium transition duration-300 w-full my-2 text-center"
              onClick={closeMenu}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;