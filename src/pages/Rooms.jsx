import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../services/operations/roomAPI';
import { FiCalendar, FiChevronRight, FiStar, FiUser, FiX, FiSearch } from 'react-icons/fi';
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
  const [searchQuery, setSearchQuery] = useState('');
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
    size: `${Math.floor(Math.random() * 200) + 300} sq ft`,
    beds: room.capacity <= 2 ? '1 King Bed' : `${room.capacity} Queen Beds`,
    description: room.description || 'Comfortable room with premium amenities',
    longDescription: room.description || 'Our comfortable room features premium amenities and quality service.',
    amenities: Array.isArray(room.amenities) ? room.amenities : ['WiFi', 'TV', 'Air Conditioning'],
    image: room.thumbnail || 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    type: room.roomType.toLowerCase() === 'suite' ? 'suite' : 'room',
    roomNumber: room.roomNumber,
    capacity: room.capacity,
    roomType: room.roomType,
    images: room.images || [],
    isAvailable: room.isAvailable
  })) || [];

  // Filter rooms based on active filter and search query
  const filteredRooms = allRooms.filter(room => {
    const matchesFilter = activeFilter === 'all' || room.type === activeFilter;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.amenities.some(amenity => 
                           amenity.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    return matchesFilter && matchesSearch;
  });

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Rooms</h2>
          <p className="mb-4">{error.message || 'Failed to load rooms'}</p>
          <button 
            onClick={() => dispatch(fetchAllRooms())}
            className="bg-yellow-50 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-yellow-50 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gray-900 w-full py-12 sm:py-16">
        <div className="mx-auto pt-22 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-yellow-50">
            Our <HighlightText text="Rooms" /> & Suites
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Experience unparalleled comfort in our exquisite accommodations
          </p>
        </div>
      </div>

      {/* Search Bar and Filter Tabs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search rooms by name, type, amenities..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-800 text-yellow-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-center mt-2 text-sm text-gray-400">
              Found {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Room Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm flex-wrap justify-center gap-2 sm:gap-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 sm:rounded-l-lg font-medium text-sm sm:text-base ${
                activeFilter === 'all' 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-800 text-yellow-50 hover:bg-gray-700'
              }`}
            >
              All Rooms
            </button>
            <button
              onClick={() => setActiveFilter('room')}
              className={`px-4 py-2 font-medium text-sm sm:text-base ${
                activeFilter === 'room' 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-800 text-yellow-50 hover:bg-gray-700'
              }`}
            >
              Standard Rooms
            </button>
            <button
              onClick={() => setActiveFilter('suite')}
              className={`px-4 py-2 sm:rounded-r-lg font-medium text-sm sm:text-base ${
                activeFilter === 'suite' 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-800 text-yellow-50 hover:bg-gray-700'
              }`}
            >
              Suites
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 text-gray-300">
            <FiSearch className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery || activeFilter !== 'all' 
                ? `No rooms match your search criteria. Try adjusting your search or filters.`
                : 'No rooms available at the moment.'}
            </p>
            {(searchQuery || activeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
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
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-50">{room.name}</h3>
                    <div className="text-yellow-500 font-bold text-lg">
                      <div className="font-medium text-yellow-600 text-sm sm:text-base">
                        ₹{room.price.toLocaleString('en-IN')}/night
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span>{room.size} • {room.beds}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{room.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-yellow-50 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-700 px-2 py-1 rounded-full text-xs text-yellow-50"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="bg-gray-700 px-2 py-1 rounded-full text-xs text-yellow-50">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="flex-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black py-2 rounded-lg font-medium transition duration-300 text-sm sm:text-base"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleBookNow(room)}
                      disabled={!room.isAvailable}
                      className={`flex-1 py-2 rounded-lg font-medium transition duration-300 text-sm sm:text-base ${
                        room.isAvailable 
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {room.isAvailable ? 'Book Now' : 'Not Available'}
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
                      <div className="text-yellow-500 font-bold text-lg">
                        ₹{selectedRoom.price.toLocaleString('en-IN')}<span className="text-gray-300 text-sm"> / night</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Capacity</div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{selectedRoom.capacity} people</div>
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-500">Status</div>
                      <div className={`font-medium text-sm sm:text-base ${
                        selectedRoom.isAvailable ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedRoom.isAvailable ? 'Available' : 'Not Available'}
                      </div>
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
                      <FiChevronRight className="text-yellow-500 mr-2" />
                      <span className="text-gray-700 text-sm sm:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowBookingModal(true);
                  }}
                  disabled={!selectedRoom.isAvailable}
                  className={`inline-block w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition duration-300 text-center text-sm sm:text-base ${
                    selectedRoom.isAvailable
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  {selectedRoom.isAvailable ? 'Book Now' : 'Room Not Available'}
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
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
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
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
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
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none text-sm sm:text-base"
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
                      className="w-full bg-gray-50 rounded-lg pl-10 pr-3 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none text-sm sm:text-base"
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Price per night:</span>
                  <span className="text-yellow-600 font-bold">₹{selectedRoom.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-xs text-gray-500">
                  *Total cost will be calculated based on your stay duration
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
                  className="px-4 sm:px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition duration-300 text-center text-sm sm:text-base"
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