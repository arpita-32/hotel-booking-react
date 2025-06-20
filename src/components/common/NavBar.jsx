import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiStar , FiMenu, FiX, FiLogIn } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import ProfileDropdown from './ProfileDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Hotel website navigation links
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
  <FiStar className="text-orange-600 text-2xl mr-2" />
  <span className="text-2xl font-bold text-orange-500">LuxuryHaven</span>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`font-medium transition-colors ${
                  matchRoute(link.path) 
                    ? "text-orange-500" 
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {link.title}
              </Link>
            ))}

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
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path}
                  className={`py-2 px-2 font-medium transition-colors ${
                    matchRoute(link.path) 
                      ? "text-orange-500" 
                      : "text-gray-800 hover:text-orange-500"
                  }`}
                  onClick={closeMenu}
                >
                  {link.title}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-3 mt-2">
                {user ? (
                  <>
                    <Link 
                      to="/book" 
                      className="block bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors text-center mb-3"
                      onClick={closeMenu}
                    >
                      Book Now
                    </Link>
                    <div className="space-y-2">
                      <Link 
                        to="/dashboard" 
                        className="block text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                        onClick={closeMenu}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logoutUser(navigate));
                          closeMenu();
                        }}
                        className="w-full text-left text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      className="block text-center text-gray-800 hover:text-orange-500 font-medium py-2 px-2 transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition-colors text-center"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                    <Link 
                      to="/book" 
                      className="block bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium transition-colors text-center"
                      onClick={closeMenu}
                    >
                      Book Now
                    </Link>
                  </div>
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