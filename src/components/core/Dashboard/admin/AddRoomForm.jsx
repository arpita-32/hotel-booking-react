import React, { useState } from 'react';
import { apiConnector } from '../../../../services/apiconnector';
import { adminEndpoints } from '../../../../services/apis';

const { ADD_ROOM_API } = adminEndpoints;

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    capacity: '',
    description: '',
    amenities: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiConnector("POST", ADD_ROOM_API, formData);
      if (response.data.success) {
        alert('Room added successfully!');
        setFormData({
          roomNumber: '',
          roomType: '',
          price: '',
          capacity: '',
          description: '',
          amenities: '',
        });
      }
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Failed to add room');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amenities (comma separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="WiFi, TV, AC, etc."
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;