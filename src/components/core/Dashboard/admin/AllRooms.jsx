import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, deleteRoomById } from '../../../../services/operations/roomAPI';
import AddRoomForm from './AddRoomForm';
import UpdateRoomForm from './UpdateRoomForm'; // Add this import
import { toast } from 'react-hot-toast';
import HighlightText from '../../../common/HighlightText';


const AllRooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await dispatch(deleteRoomById(roomId));
        toast.success('Room deleted successfully');
        dispatch(fetchAllRooms()); // Refresh the list after deletion
      } catch (error) {
        toast.error(error.message || 'Failed to delete room');
      }
    }
  };

  const handleUpdate = (room) => {
    setEditingRoom(room);
  };

  const handleRoomUpdated = () => {
    setEditingRoom(null);
    dispatch(fetchAllRooms()); // Explicitly refresh the room list
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
    <div className="p-4 sm:p-6 bg-gray-900 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-yellow-50">
          All <HighlightText text={`Rooms (${rooms?.length || 0})`} />
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-50 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-yellow-100 transition-colors"
        >
          {showAddForm ? 'Hide Form' : 'Add New Room'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddRoomForm onRoomAdded={() => {
            setShowAddForm(false);
            dispatch(fetchAllRooms());
          }} />
        </div>
      )}

      {editingRoom && (
        <UpdateRoomForm 
          room={editingRoom}  // Fixed: using editingRoom instead of currentRoom
          onClose={() => setEditingRoom(null)}
          onRoomUpdated={handleRoomUpdated}
        />
      )}


      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-900">
          <thead className="bg-gray-800 text-yellow-50">
            <tr>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 divide-y divide-gray-700">
            {rooms?.map((room) => (
              <tr key={room._id} className="hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4">{room.roomNumber}</td>
                <td className="py-3 px-4">{room.roomType}</td>
                <td className="py-3 px-4">₹{(room.price * 83).toLocaleString('en-IN')}</td>
                <td className="py-3 px-4">{room.capacity}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {room.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button
                    onClick={() => handleUpdate(room)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="text-pink-400 hover:text-pink-300 transition-colors"
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