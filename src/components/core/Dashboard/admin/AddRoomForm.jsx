import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewRoom } from '../../../../services/operations/roomAPI';
import { toast } from 'react-hot-toast';
import HighlightText from '../../../common/HighlightText';

const initialFormState = {
  roomNumber: '',
  roomType: 'Standard',
  price: '',
  capacity: '',
  description: '',
  amenities: '',
  thumbnail: null,
  images: []
};

const AddRoomForm = ({ onRoomAdded }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first');

      const formDataToSend = new FormData();
      
      formDataToSend.append('roomNumber', formData.roomNumber);
      formDataToSend.append('roomType', formData.roomType);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('capacity', formData.capacity);
      formDataToSend.append('description', formData.description || '');
      
      const amenitiesArray = formData.amenities 
        ? formData.amenities.split(',').map(item => item.trim())
        : [];
      formDataToSend.append('amenities', JSON.stringify(amenitiesArray));

      if (!formData.thumbnail) throw new Error('Thumbnail image is required');
      formDataToSend.append('thumbnailImage', formData.thumbnail);

      if (formData.images && Array.isArray(formData.images)) {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      }

      const result = await dispatch(addNewRoom(formDataToSend));
      
      if (result.error) throw result.error;

      setFormData(initialFormState);
      setPreviewImages([]);
      setThumbnailPreview(null);
      toast.success('Room added successfully');
      onRoomAdded?.();
      
    } catch (error) {
      console.error('Add room error:', error);
      toast.error(error.message || 'Failed to add room');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-serif font-bold py-7 mb-10 text-gray-800 text-center">
        Add New <HighlightText text="Room" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Room Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Room Number*</label>
            <input
              type="text"
              value={formData.roomNumber}
              onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          {/* Room Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Room Type*</label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData({...formData, roomType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price*</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>
          
          {/* Capacity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Capacity*</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
        </div>

        {/* Description and Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
              placeholder="Describe the room features and ambiance..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({...formData, amenities: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="WiFi, TV, AC, Refrigerator, etc."
            />
          </div>
        </div>

        {/* Image Uploads */}
        <div className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Thumbnail Image*</label>
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col w-full h-40 border-2 ${thumbnailPreview ? 'border-transparent' : 'border-dashed border-gray-300'} rounded-lg hover:border-amber-400 cursor-pointer transition-all overflow-hidden`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                  required
                />
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Click to upload thumbnail</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          {/* Additional Images Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Additional Images</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 cursor-pointer transition-all">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>Click to upload additional images</span>
                </div>
              </label>
            </div>
            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...previewImages];
                        newImages.splice(index, 1);
                        setPreviewImages(newImages);
                        
                        const newFormImages = [...formData.images];
                        newFormImages.splice(index, 1);
                        setFormData({...formData, images: newFormImages});
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => {
              setFormData(initialFormState);
              setPreviewImages([]);
              setThumbnailPreview(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors disabled:opacity-70"
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : 'Add Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;