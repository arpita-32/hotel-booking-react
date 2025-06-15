// src/pages/dashboard/admin/AddRoom.jsx
import { useState } from 'react';

export default function AddRoom() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    capacity: '',
    description: '',
    amenities: [],
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to API
    console.log('Room added:', formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Room</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            >
              <option value="">Select Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hair Dryer'].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={amenity}
                    className="mr-2"
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          amenities: [...formData.amenities, amenity],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          amenities: formData.amenities.filter((a) => a !== amenity),
                        });
                      }
                    }}
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Images</label>
            <input
              type="file"
              multiple
              className="w-full p-2 border rounded"
              onChange={(e) => {
                // Handle file uploads
                const files = Array.from(e.target.files);
                setFormData({...formData, images: files});
              }}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
}