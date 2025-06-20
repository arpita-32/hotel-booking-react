import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, deleteRoomById } from '../../../../services/operations/roomAPI';
import AddRoomForm from './AddRoomForm';
import { toast } from 'react-hot-toast';
import HighlightText from '../../../common/HighlightText';

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
    <div className="p-4 sm:p-6 bg-richblack-800 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-richblack-5">
          All <HighlightText text={`Rooms (${rooms?.length || 0})`} />
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-50 text-richblack-900 py-2 px-4 rounded-lg font-medium hover:bg-yellow-100 transition-colors"
        >
          {showAddForm ? 'Hide Form' : 'Add New Room'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddRoomForm onRoomAdded={() => dispatch(fetchAllRooms())} />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-richblack-700">
        <table className="min-w-full bg-richblack-800">
          <thead className="bg-richblack-700 text-richblack-5">
            <tr>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-richblack-100 divide-y divide-richblack-700">
            {rooms?.map((room) => (
              <tr key={room._id} className="hover:bg-richblack-700 transition-colors">
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
                <td className="py-3 px-4">
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
