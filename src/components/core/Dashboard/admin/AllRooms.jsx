import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../../services/apiconnector';
import { adminEndpoints } from '../../../../services/apis';

const { GET_ALL_ROOMS_API } = adminEndpoints;

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiConnector("GET", GET_ALL_ROOMS_API);
        if (response.data.success) {
          setRooms(response.data.rooms);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Rooms</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rooms.map((room) => (
              <tr key={room._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{room.roomNumber}</td>
                <td className="py-3 px-4">{room.roomType}</td>
                <td className="py-3 px-4">${room.price}</td>
                <td className="py-3 px-4">{room.capacity}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {room.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRooms;