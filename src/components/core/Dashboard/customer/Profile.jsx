// src/pages/dashboard/customer/Profile.jsx
import { useSelector } from 'react-redux';
import { RiEditBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={user?.image || '/default-user.png'}
              alt={`profile-${user?.firstName}`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <Link
            to="/customer/settings"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <RiEditBoxLine className="mr-1" />
            Edit
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p>{user?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p>{user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{user?.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Room Preference</p>
              <p>{user?.preferences?.roomType || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Special Requests</p>
              <p>{user?.preferences?.specialRequests || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}