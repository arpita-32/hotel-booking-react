import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { FiUser, FiSettings, FiChevronDown } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  // Close dropdown when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2 focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
          <HiOutlineUserCircle className="w-5 h-5" />
        </div>
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {user.firstName}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
        >
          <div className="py-1" role="none">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <VscDashboard className="mr-2" />
              Dashboard
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-2" />
              My Profile
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <FiSettings className="mr-2" />
              Settings
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <VscSignOut className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;