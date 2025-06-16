// src/components/dashboard/Sidebar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useState } from 'react';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = ({ links }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">Luxury Haven</h1>
        </div>
        <nav className="flex-1 mt-5 px-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                matchRoute(link.path)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <div className="flex items-center">
          <div>
            <button
              onClick={() => setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })}
              className="flex items-center text-sm text-gray-300 hover:text-white"
            >
              <VscSignOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;