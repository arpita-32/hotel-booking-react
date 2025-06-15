// src/pages/dashboard/admin/Dashboard.jsx
export default function AdminDashboard() {
  // Fetch stats from API
  const stats = {
    totalBookings: 124,
    availableRooms: 28,
    occupiedRooms: 96,
    revenue: '$45,320',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Available Rooms</h3>
          <p className="text-3xl font-bold text-green-500">{stats.availableRooms}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Occupied Rooms</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.occupiedRooms}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.revenue}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Booking ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Room</th>
                <th className="text-left py-3 px-4">Check-In</th>
                <th className="text-left py-3 px-4">Check-Out</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through recent bookings */}
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#12345</td>
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">Deluxe Suite</td>
                <td className="py-3 px-4">2023-06-15</td>
                <td className="py-3 px-4">2023-06-20</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Confirmed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}