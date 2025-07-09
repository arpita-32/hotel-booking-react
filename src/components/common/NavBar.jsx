import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import ProfileDropdown from './ProfileDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import logo from '../../assets/Images/hotelogo.png';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Rooms", path: "/rooms" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" }
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Helper to check if route matches current location
  const matchRoute = (route) => {
    return location.pathname === route;
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   <header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-black shadow-lg' : 'bg-black'
  } py-2`}   // <─ only 8 px padding top & bottom
>
  <div className="mx-auto flex items-center justify-between px-4">
    <Link to="/" className="flex items-center">
      <img
  src={logo}
  alt="B.S.H Residency Logo"
  className="h-14 w-auto object-contain"   
/>

    </Link>

    {/* Desktop navigation */}
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.title}
          to={link.path}
          className={`font-medium transition-colors ${
            matchRoute(link.path)
              ? 'text-yellow-400 font-semibold'
              : 'text-gray-300 hover:text-yellow-400'
          }`}
        >
          {link.title}
        </Link>
      ))}

      {/* Auth buttons */}
      <div className="flex items-center space-x-4 ml-4">
        {user ? (
          <>
            <Link
              to="/book"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1.5 rounded-md font-medium transition-colors duration-300"
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
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1.5 rounded-md font-medium transition-colors duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>

    {/* Mobile hamburger */}
    <button
      className="md:hidden text-yellow-400 focus:outline-none"
      onClick={toggleMenu}
    >
      {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  </div>

  {/* Mobile menu (unchanged) */}
  {isMenuOpen && (
    <div className="md:hidden bg-gray-900 shadow-lg rounded-lg mt-2 p-4">
      {/* … */}
    </div>
  )}
</header>

  );
};

export default NavBar;