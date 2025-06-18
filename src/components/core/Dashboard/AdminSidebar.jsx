import React from 'react';
import { adminSidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from "./SidebarLink";
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useState } from 'react';

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex flex-col space-y-1">
          {adminSidebarLinks.map((link) => (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>

        <div className="mt-auto p-4">
          <button
            onClick={() => setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm font-medium rounded-md text-gray-200 hover:bg-gray-700"
          >
            <VscSignOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AdminSidebar;