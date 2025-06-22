import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRoomDetails } from '../../../../services/operations/roomAPI';
import { toast } from 'react-hot-toast';
import HighlightText from '../../../common/HighlightText';

const UpdateRoomForm = ({ room, onClose, onRoomUpdated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Standard',
    price: '',
    capacity: '',
    description: '',
    amenities: '',
    thumbnailImage: null,
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        price: room.price,
        capacity: room.capacity,
        description: room.description,
        amenities: room.amenities.join(', '),
        thumbnailImage: null,
        images: []
      });
      setThumbnailPreview(room.thumbnail);
      setPreviewImages(room.images.map(url => ({ url })));
    }
  }, [room]);

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
        thumbnailImage: file
      });
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsUploading(true);
  
  try {
    const formDataToSend = new FormData();
    
    // Append roomId to the form data
    formDataToSend.append('roomId', room._id);
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

    // Append thumbnail if changed
    if (formData.thumbnailImage) {
      formDataToSend.append('thumbnailImage', formData.thumbnailImage);
    }

    // Append additional images
    if (formData.images && Array.isArray(formData.images)) {
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
    }

    // Debug: Log form data before sending
    console.log('FormData contents:');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    const result = await dispatch(updateRoomDetails({
      roomId: room._id,
      formData: formDataToSend
    }));


       if (updateRoomDetails.fulfilled.match(result)) {
      toast.success('Room updated successfully');
      onRoomUpdated();  // This should trigger parent component refresh
      onClose();
    } else {
      throw result.error;
    }
    
  } catch (error) {
    console.error('Update room error:', error);
    toast.error(error.message || 'Failed to update room');
  } finally {
    setIsUploading(false);
  }
};

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-gray-800">
            Update <HighlightText text="Room" />
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
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
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
              <div className="flex items-center gap-4">
                {thumbnailPreview && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={thumbnailPreview}
                      alt="Current thumbnail"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col w-full h-24 border-2 ${thumbnailPreview ? 'border-transparent' : 'border-dashed border-gray-300'} rounded-lg hover:border-amber-400 cursor-pointer transition-all overflow-hidden`}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailUpload}
                      />
                      {thumbnailPreview ? (
                        <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
                          Change Thumbnail
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>Upload thumbnail</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Images Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Additional Images</label>
              
              {/* Current Images */}
              {previewImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Room ${index}`}
                          className="w-full h-24 object-cover rounded-md border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upload New Images */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 cursor-pointer transition-all">
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
                    <span>Upload additional images</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-500 transition-colors disabled:opacity-70"
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Update Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomForm;