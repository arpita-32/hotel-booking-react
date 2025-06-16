// src/pages/dashboard/CustomerDashboard.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { FaHistory, FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

const customerLinks = [
  { name: 'My Profile', path: '/customer/profile', icon: FaUser },
  { name: 'Booking History', path: '/customer/bookings', icon: FaHistory },
  { name: 'Settings', path: '/customer/settings', icon: MdSettings },
];

export default function CustomerDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={customerLinks} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}