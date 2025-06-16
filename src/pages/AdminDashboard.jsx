// src/pages/dashboard/AdminDashboard.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { FaHotel, FaUsers, FaBed, FaPlusCircle, FaChartBar } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

const adminLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FaChartBar },
  { name: 'Bookings', path: '/admin/bookings', icon: FaHotel },
  { name: 'Rooms', path: '/admin/rooms', icon: FaBed },
  { name: 'Add Room', path: '/admin/add-room', icon: FaPlusCircle },
  { name: 'Customers', path: '/admin/customers', icon: FaUsers },
  { name: 'Settings', path: '/admin/settings', icon: MdSettings },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={adminLinks} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}