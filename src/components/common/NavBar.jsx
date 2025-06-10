import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiStar } from 'react-icons/fi';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white shadow-md py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <FiStar className="text-orange-500 text-xl sm:text-2xl mr-2" />
            <Link 
              to="/" 
              className="text-lg sm:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors"
              onClick={closeMenu}
            >
              Luxury Haven
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm lg:text-base"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm lg:text-base"
              onClick={closeMenu}
            >
              Rooms
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm lg:text-base"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm lg:text-base"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Book Now Button */}
          <div className="hidden md:block">
            <Link 
              to="/book" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 text-sm lg:text-base"
              onClick={closeMenu}
            >
              Book Now
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 py-2' : 'max-h-0 py-0'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex flex-col space-y-3 py-2">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className="text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
              onClick={closeMenu}
            >
              Rooms
            </Link>
            <Link 
              to="/about" 
              className="text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Link 
              to="/book" 
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition-colors text-center mt-2"
              onClick={closeMenu}
            >
              Book Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;