import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import React from 'react';

const ProfileDropdown = ({ testingMode = false }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  // For testing - show dropdown even without user
  const showDropdown = testingMode || user;
  if (!showDropdown) return null;

  // Mock user data for testing
  const displayUser = testingMode 
    ? { 
        firstName: "Test", 
        image: "/default-user.png" 
      }
    : user;

  return (
    <div className="relative" ref={ref}>
      <button 
        className="flex items-center gap-x-1"
        onClick={() => setOpen(!open)}
      >
        <img
          src={displayUser?.image}
          alt={`profile-${displayUser?.firstName}`}
          className="aspect-square w-8 h-8 rounded-full object-cover"
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <FiUser className="text-lg" />
              My Profile
            </Link>
            <button
              onClick={() => {
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <VscSignOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;