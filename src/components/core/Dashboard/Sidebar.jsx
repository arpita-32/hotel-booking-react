import React, { useState } from 'react';
import { normalUserSidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch } from 'react-redux';
import SidebarLink from "./SidebarLink";
import { VscSignOut, VscMenu, VscClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import { profileOnlyLinks } from "../../../data/dashboard-links";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      >
        {mobileSidebarOpen ? <VscClose size={24} /> : <VscMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transition-all duration-300 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full pt-5 overflow-y-auto">
          <div className="flex flex-col space-y-1 px-2">
            {profileOnlyLinks.map((link) => (
              <SidebarLink 
                key={link.id} 
                link={link} 
                iconName={link.icon} 
                onClick={() => setMobileSidebarOpen(false)}
              />
            ))}
            {normalUserSidebarLinks.map((link) => (
              <SidebarLink 
                key={link.id} 
                link={link} 
                iconName={link.icon} 
                onClick={() => setMobileSidebarOpen(false)}
              />
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
      </div>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;