import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../services/operations/roomAPI';
import { FiCalendar, FiChevronRight, FiStar, FiUser, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/NavBar';
import HighlightText from '../components/common/HighlightText';
import Loading from '../components/common/Loading';

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms: backendRooms, loading, error } = useSelector((state) => state.room);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  // Map backend rooms to frontend format
  const allRooms = backendRooms?.map(room => ({
    id: room._id,
    name: `${room.roomType} Room ${room.roomNumber}`,
    price: room.price,
    size: `${Math.floor(Math.random() * 200) + 300} sq ft`, // Can be replaced with actual size if available
    beds: room.capacity <= 2 ? '1 King Bed' : `${room.capacity} Queen Beds`,
    description: room.description || 'Comfortable room with premium amenities',
    longDescription: room.description || 'Our comfortable room features premium amenities and quality service.',
    amenities: Array.isArray(room.amenities) ? room.amenities : ['WiFi', 'TV', 'Air Conditioning'],
    image: room.thumbnail || 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    type: room.roomType.toLowerCase() === 'suite' ? 'suite' : 'room',
    roomNumber: room.roomNumber,
    capacity: room.capacity,
    roomType: room.roomType,
    images: room.images || []
  })) || [];

  const filteredRooms = activeFilter === 'all' 
    ? allRooms 
    : allRooms.filter(room => room.type === activeFilter);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedRoom.name}!
Check-in: ${bookingForm.checkIn}
Check-out: ${bookingForm.checkOut}
Guests: ${bookingForm.adults} adults, ${bookingForm.children} children`);
    setShowBookingModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-richblack-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Rooms</h2>
          <p className="mb-4">{error.message || 'Failed to load rooms'}</p>
          <button 
            onClick={() => dispatch(fetchAllRooms())}
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 text-black min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-richblack-800 w-full py-12 sm:py-16">
        <div className="mx-auto pt-22 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-black">
            Our <HighlightText text="Rooms" /> & Suites
          </h1>
          <p className="text-richblack-200 max-w-2xl mx-auto text-sm sm:text-base">
            Experience unparalleled comfort in our exquisite accommodations
          </p>
        </div>
      </div>

      {/* Room Filter Tabs */}
      <div className="flex justify-center my-6 sm:my-8 px-4">
        <div className="inline-flex rounded-md shadow-sm flex-wrap justify-center gap-2 sm:gap-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 sm:rounded-l-lg font-medium text-sm sm:text-base ${
              activeFilter === 'all' 
                ? 'bg-orange-600 text-black' 
                : 'bg-richblack-700 text-black'
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setActiveFilter('room')}
            className={`px-4 py-2 font-medium text-sm sm:text-base ${
              activeFilter === 'room' 
                ? 'bg-orange-600 text-black' 
                : 'bg-richblack-700 text-black'
            }`}
          >
            Standard Rooms
          </button>
          <button
            onClick={() => setActiveFilter('suite')}
            className={`px-4 py-2 sm:rounded-r-lg font-medium text-sm sm:text-base ${
              activeFilter === 'suite' 
                ? 'bg-orange-600 text-black' 
                : 'bg-richblack-700 text-black'
            }`}
          >
            Suites
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 text-richblack-100">
            No rooms found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-richblack-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
              >
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-48 sm:h-56 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-black">{room.name}</h3>
                    <div className="text-orange-500 font-bold text-lg">
<div className="text-orange-500 font-bold text-lg">
  <div className="font-medium text-orange-600 text-sm sm:text-base">
    ₹{(room.price * 83).toLocaleString('en-IN')}/night
  </div>
</div>

                    </div>
                  </div>
                  <div className="flex items-center text-sm text-richblack-300 mb-2">
                    <FiStar className="text-orange-500 mr-1" />
                    <span>{room.size} • {room.beds}</span>
                  </div>
                  <p className="text-richblack-200 text-sm mb-4 flex-grow">{room.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="bg-richblack-700 px-2 py-1 rounded-full text-xs text-black"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="bg-richblack-700 px-2 py-1 rounded-full text-xs text-black">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black py-2 rounded-lg font-medium transition duration-300 text-sm sm:text-base"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-black py-2 rounded-lg font-medium transition duration-300 text-sm sm:text-base"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Room Details Modal */}
      {showDetailsModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedRoom.name}</h2>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedRoom.image} 
                  alt={selectedRoom.name} 
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                {/* Additional images gallery */}
                {selectedRoom.images?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md sm:text-lg font-semibold mb-2 text-gray-800">More Images</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedRoom.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedRoom.name} ${index + 1}`}
                          className="h-24 object-cover rounded cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedRoom({
                            ...selectedRoom,
                            image: image
                          })}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-md sm:text-lg font-semibold mb-2 text-gray-800">Room Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Size</div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{selectedRoom.size}</div>
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Bed Type</div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{selectedRoom.beds}</div>
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Price</div>
                      <div className="text-orange-500 font-bold text-lg">
  ₹{selectedRoom.price * 83}<span className="text-richblack-300 text-sm"> / night</span>
</div>

                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Capacity</div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{selectedRoom.capacity} people</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md sm:text-lg font-semibold mb-2 text-gray-800">Description</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{selectedRoom.longDescription}</p>
                
                <h3 className="text-md sm:text-lg font-semibold mb-2 text-gray-800">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <FiChevronRight className="text-orange-500 mr-2" />
                      <span className="text-gray-700 text-sm sm:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowBookingModal(true);
                  }}
                  className="inline-block w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition duration-300 text-center text-sm sm:text-base"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Book {selectedRoom.name}</h2>
              <button 
                onClick={() => setShowBookingModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">Check-in</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-2.5 sm:top-3 text-gray-400" />
                    <input
                      type="date"
                      name="checkIn"
                      value={bookingForm.checkIn}
                      onChange={handleBookingChange}
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">Check-out</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-2.5 sm:top-3 text-gray-400" />
                    <input
                      type="date"
                      name="checkOut"
                      value={bookingForm.checkOut}
                      onChange={handleBookingChange}
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">Adults</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-2.5 sm:top-3 text-gray-400" />
                    <select
                      name="adults"
                      value={bookingForm.adults}
                      onChange={handleBookingChange}
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none text-sm sm:text-base"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">Children</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-2.5 sm:top-3 text-gray-400" />
                    <select
                      name="children"
                      value={bookingForm.children}
                      onChange={handleBookingChange}
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none text-sm sm:text-base"
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <Link
                  to="/book"
                  state={{ 
                    room: selectedRoom,
                    bookingDetails: bookingForm
                  }}
                  className="px-4 sm:px-6 py-2 bg-orange-400 hover:bg-orange-500 text-black rounded-lg font-medium transition duration-300 text-center text-sm sm:text-base"
                >
                  Continue to Booking
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Rooms;