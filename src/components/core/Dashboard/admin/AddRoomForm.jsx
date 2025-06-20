import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewRoom } from '../../../../services/operations/roomAPI';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import HighlightText from '../../../common/HighlightText';
import Modal from '../../../common/Modal'; // Assuming you have a Modal component

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [previewImages, setPreviewImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    
    // Append basic fields
    formDataToSend.append('roomNumber', formData.roomNumber);
    formDataToSend.append('roomType', formData.roomType);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('capacity', formData.capacity);
    formDataToSend.append('description', formData.description || '');
    
    // Handle amenities array
    const amenitiesArray = formData.amenities 
      ? formData.amenities.split(',').map(item => item.trim())
      : [];
    formDataToSend.append('amenities', JSON.stringify(amenitiesArray));

    // Validate and append thumbnail
    if (!formData.thumbnail) throw new Error('Thumbnail image is required');
    formDataToSend.append('thumbnailImage', formData.thumbnail);

    // Ensure images is an array before mapping
    if (formData.images && Array.isArray(formData.images)) {
      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image); // Note: Same field name for all images
      });
    }

    const result = await dispatch(addNewRoom(formDataToSend));
    
    if (result.error) throw result.error;

    // Reset form on success
    setFormData(initialFormState);
    setPreviewImages([]);
    setThumbnailPreview(null);
    setShowSuccessModal(true);
    onRoomAdded?.();
    
  } catch (error) {
    console.error('Add room error:', error);
    if (error.shouldLogout) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    toast.error(error.message || 'Failed to add room');
  } finally {
    setIsUploading(false);
  }
};

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-richblack-800 rounded-lg shadow-lg border border-richblack-700">
        
        <h2 className="text-2xl font-bold mb-6 text-richblack-5">
          Add New <HighlightText text="Room" />
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Number */}
            <div>
              <label className="block text-richblack-5 mb-2">Room Number*</label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              />
            </div>
            
            {/* Room Type */}
            <div>
              <label className="block text-richblack-5 mb-2">Room Type*</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            
            {/* Price */}
            <div>
              <label className="block text-richblack-5 mb-2">Price*</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              />
            </div>
            
            {/* Capacity */}
            <div>
              <label className="block text-richblack-5 mb-2">Capacity*</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                required
              />
            </div>
          </div>

          {/* Description and Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-richblack-5 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50 h-32"
              />
            </div>
            
            <div>
              <label className="block text-richblack-5 mb-2">Amenities (comma separated)</label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                placeholder="WiFi, TV, AC, etc."
              />
            </div>
          </div>

          {/* Image Uploads */}
          <div className="space-y-6">
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-richblack-5 mb-2">Thumbnail Image*</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-40 border-2 border-dashed border-richblack-600 rounded-lg hover:bg-richblack-700 hover:border-richblack-500 cursor-pointer transition-colors">
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
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-richblack-400">
                      Click to upload thumbnail
                    </span>
                  )}
                </label>
              </div>
            </div>
            
            {/* Additional Images Upload */}
            <div>
              <label className="block text-richblack-5 mb-2">Additional Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-40 border-2 border-dashed border-richblack-600 rounded-lg hover:bg-richblack-700 hover:border-richblack-500 cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="flex items-center justify-center h-full text-richblack-400">
                    Click to upload additional images
                  </span>
                </label>
              </div>
              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {/* ... preview images ... */}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-50 text-richblack-900 py-3 px-6 rounded-lg font-medium hover:bg-yellow-100 transition-colors disabled:opacity-70"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Add Room'}
          </button>
        </form>
      </div>
      {showSuccessModal && (
        <Modal onClose={closeSuccessModal}>
          <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-richblack-5 mb-2">
              Room Added Successfully!
            </h3>
            <p className="text-sm text-richblack-200 mb-6">
              The new room has been successfully added to the system.
            </p>
            <button
              onClick={closeSuccessModal}
              className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md hover:bg-yellow-100 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddRoomForm;