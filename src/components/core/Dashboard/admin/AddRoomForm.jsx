import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewRoom } from '../../../../services/operations/roomAPI';
import { toast } from 'react-hot-toast';

const AddRoomForm = ({ onRoomAdded }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Standard',
    price: '',
    capacity: '',
    description: '',
    amenities: '',
    thumbnail: null,
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setPreviewImages([...previewImages, ...imagePreviews]);
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setFormData({
        ...formData,
        thumbnail: file
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...previewImages];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('roomNumber', formData.roomNumber);
      formDataToSend.append('roomType', formData.roomType);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('capacity', formData.capacity);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('amenities', formData.amenities);
      formDataToSend.append('thumbnail', formData.thumbnail);
      
      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image);
      });

      await dispatch(addNewRoom(formDataToSend)).unwrap();
      
      toast.success('Room added successfully!');
      setFormData({
        roomNumber: '',
        roomType: 'Standard',
        price: '',
        capacity: '',
        description: '',
        amenities: '',
        thumbnail: null,
        images: []
      });
      setPreviewImages([]);
      setThumbnailPreview(null);
      
      if (onRoomAdded) {
        onRoomAdded();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add room');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
      <form onSubmit={handleSubmit}>
        {/* Room Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Number*</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        {/* Room Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Type*</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={(e) => setFormData({...formData, roomType: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        {/* Capacity */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Capacity*</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
          />
        </div>
        
        {/* Amenities */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amenities (comma separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={(e) => setFormData({...formData, amenities: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="WiFi, TV, AC, etc."
          />
        </div>
        
        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Thumbnail Image*</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-7">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="h-24 object-cover rounded" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400">Select thumbnail</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                className="opacity-0" 
                accept="image/*"
                onChange={handleThumbnailUpload}
                required
              />
            </label>
          </div>
        </div>
        
        {/* Additional Images Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Additional Images</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400">
                  {formData.images.length > 0 ? `${formData.images.length} files selected` : 'Select images'}
                </p>
              </div>
              <input 
                type="file" 
                className="opacity-0" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image.url} 
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;