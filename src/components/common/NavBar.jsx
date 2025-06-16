import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiStar, FiLogIn } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import ProfileDropdown from './ProfileDropdown';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth); // Changed from state.profile to state.auth
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
    closeMenu();
  };

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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm lg:text-base"
                  onClick={closeMenu}
                >
                  <FiLogIn className="mr-1" /> Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 text-sm lg:text-base"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link 
              to="/book" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 text-sm lg:text-base"
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
            <div className="border-t border-gray-200 pt-2 mt-2">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                 <button
        onClick={handleLogout}
        className="w-full text-left text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
      >
        Logout
      </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition-colors text-center block mt-2"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link 
                to="/book" 
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors text-center block mt-2"
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;