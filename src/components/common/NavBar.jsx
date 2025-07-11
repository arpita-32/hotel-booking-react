import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import ProfileDropdown from './ProfileDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import logo from '../../assets/Images/hotelogo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-black'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="B.S.H Residency Logo" 
              className="h-12 w-auto object-contain" // Adjusted size for mobile
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`font-medium transition-colors ${
                  matchRoute(link.path) 
                    ? "text-yellow-400 font-semibold" 
                    : "text-gray-300 hover:text-yellow-400"
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
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-yellow-400 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 shadow-lg rounded-lg mt-3 p-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path}
                  className={`py-2 px-3 font-medium transition-colors rounded-lg ${
                    matchRoute(link.path) 
                      ? "bg-gray-800 text-yellow-400 font-semibold" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                  }`}
                  onClick={closeMenu}
                >
                  {link.title}
                </Link>
              ))}

              <div className="border-t border-gray-800 pt-4 mt-2">
                {user ? (
                  <>
                    <Link 
                      to="/book" 
                      className="block bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-md font-medium text-center mb-3 transition-colors"
                      onClick={closeMenu}
                    >
                      Book Now
                    </Link>
                    <div className="space-y-3">
                      <Link 
                        to="/dashboard" 
                        className="block text-gray-300 hover:text-yellow-400 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block text-gray-300 hover:text-yellow-400 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={closeMenu}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logout(navigate));
                          closeMenu();
                        }}
                        className="w-full text-left text-gray-300 hover:text-yellow-400 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      className="block text-center text-gray-300 hover:text-yellow-400 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-md font-medium text-center transition-colors"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                    <Link 
                      to="/book" 
                      className="block bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-md font-medium text-center transition-colors"
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