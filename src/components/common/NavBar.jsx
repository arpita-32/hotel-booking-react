import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi';
import ProfileDropdown from './ProfileDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">LuxuryHaven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Rooms
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Contact
            </Link>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <>
                  <Link 
                    to="/book" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center text-gray-700 hover:text-orange-500 font-medium transition-colors"
                  >
                    <FiLogIn className="mr-1" /> Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-3">
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
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                onClick={closeMenu}
              >
                Contact
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
                      onClick={() => {
                        dispatch(logout(navigate));
                        closeMenu();
                      }}
                      className="w-full text-left text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                    >
                      Logout
                    </button>
                    <Link 
                      to="/book" 
                      className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors text-center block mt-2"
                      onClick={closeMenu}
                    >
                      Book Now
                    </Link>
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
                    <Link 
                      to="/book" 
                      className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors text-center block mt-2"
                      onClick={closeMenu}
                    >
                      Book Now
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;