import React from 'react';
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const isActive = location.pathname === link.path;

  return (
    <NavLink
      to={link.path}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 ${
        isActive 
          ? 'bg-richblack-700 text-yellow-50' 
          : 'text-richblack-200 hover:bg-richblack-700 hover:text-richblack-5'
      } transition-colors`}
    >
      <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${
        isActive ? 'text-yellow-50' : 'text-richblack-300'
      }`} />
      {link.name}
    </NavLink>
  );
};

export default SidebarLink;