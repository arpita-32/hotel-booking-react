import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, deleteRoomById } from '../../../../services/operations/roomAPI';
import AddRoomForm from './AddRoomForm';
import { toast } from 'react-hot-toast';

const AllRooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const handleDelete = async (roomId) => {
  if (window.confirm('Are you sure you want to delete this room?')) {
    try {
      await dispatch(deleteRoomById(roomId));
      toast.success('Room deleted successfully');
      dispatch(fetchAllRooms()); // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Failed to delete room');
    }
  }
};

  if (loading) return <div className="p-6">Loading...</div>;
  
  if (error) return (
    <div className="p-6 text-red-500">
      Error: {error.message || 'Failed to load rooms'}
      <button 
        onClick={() => dispatch(fetchAllRooms())}
        className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Rooms ({rooms?.length || 0})</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {showAddForm ? 'Hide Form' : 'Add New Room'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddRoomForm onRoomAdded={() => dispatch(fetchAllRooms())} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rooms?.map((room) => (
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
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
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