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
      className={`flex items-center px-4 py-3 text-sm font-medium ${
        isActive 
          ? 'bg-orange-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon className={`mr-3 flex-shrink-0 h-6 w-6 ${
        isActive ? 'text-white' : 'text-gray-400'
      }`} />
      {link.name}
    </NavLink>
  );
};

export default SidebarLink;