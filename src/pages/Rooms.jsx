import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiCalendar, FiUser, FiX, FiChevronRight } from 'react-icons/fi';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

const Rooms = () => {
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

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: 199,
      size: '350 sq ft',
      beds: '1 King Bed',
      description: 'Spacious room with king-size bed, work desk, and luxurious bathroom amenities.',
      longDescription: 'Our Deluxe Rooms offer a perfect blend of comfort and functionality. Featuring a plush king-size bed with premium linens, a spacious work desk, and a marble-appointed bathroom with rain shower. Enjoy high-speed WiFi, a 55-inch Smart TV, and stunning city views.',
      amenities: ['WiFi', 'Breakfast', 'Smart TV', 'Air Conditioning', 'Work Desk', 'Marble Bathroom'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'room'
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      price: 299,
      size: '550 sq ft',
      beds: '1 King Bed + Sofa Bed',
      description: 'Elegant suite with separate living area, premium furnishings, and enhanced workspace.',
      longDescription: 'The Executive Suite provides a separate living area and bedroom for added privacy and comfort. Enjoy premium furnishings, a dedicated workspace, and a mini bar stocked with complimentary beverages. The luxurious bathroom features dual vanities and a deep soaking tub.',
      amenities: ['WiFi', 'Breakfast', 'Mini Bar', 'Smart TV', 'Air Conditioning', 'Soaking Tub', 'Separate Living Area'],
      image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'suite'
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 499,
      size: '1200 sq ft',
      beds: '1 King Bed + 1 Queen Bed',
      description: 'The ultimate in luxury with multiple rooms, premium furnishings, and exclusive services.',
      longDescription: 'Our Presidential Suite is the epitome of luxury, featuring a grand living room, formal dining area, master bedroom with walk-in closet, and a second bedroom. Enjoy personalized butler service, a private chef available upon request, and access to our exclusive executive lounge. The master bathroom boasts a steam shower and jacuzzi tub.',
      amenities: ['WiFi', 'Breakfast', 'Mini Bar', 'Smart TV', '24/7 Butler', 'Private Chef', 'Jacuzzi', 'Executive Lounge Access'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'suite'
    },
    {
      id: 'family',
      name: 'Family Suite',
      price: 349,
      size: '700 sq ft',
      beds: '1 King Bed + 2 Twin Beds',
      description: 'Spacious suite perfect for families with children, featuring separate sleeping areas.',
      longDescription: 'Designed with families in mind, this suite offers a separate bedroom with king bed and a living area with two twin beds. Includes child-friendly amenities, board games, and a PlayStation console. The bathroom features a tub/shower combo and child safety features.',
      amenities: ['WiFi', 'Breakfast', 'Smart TV', 'Air Conditioning', 'PlayStation', 'Board Games', 'Child Safety Features'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'suite'
    },
    {
      id: 'oceanview',
      name: 'Ocean View Room',
      price: 249,
      size: '400 sq ft',
      beds: '1 King Bed or 2 Queen Beds',
      description: 'Beautiful room with stunning ocean views and balcony access.',
      longDescription: 'Wake up to breathtaking ocean views from your private balcony. These rooms feature your choice of king bed or two queen beds, a sitting area, and floor-to-ceiling windows. Enjoy the sound of waves from your room and direct access to our private beach.',
      amenities: ['WiFi', 'Breakfast', 'Smart TV', 'Air Conditioning', 'Private Balcony', 'Ocean View', 'Beach Access'],
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'room'
    },
    {
      id: 'honeymoon',
      name: 'Honeymoon Suite',
      price: 399,
      size: '650 sq ft',
      beds: '1 King Bed',
      description: 'Romantic suite with special amenities for couples, including champagne on arrival.',
      longDescription: 'Celebrate your love in our romantic Honeymoon Suite, featuring a king-size canopy bed, in-room jacuzzi, and private balcony with sunset views. Includes champagne and chocolate-covered strawberries on arrival, rose petal turndown service, and couple\'s massage discount.',
      amenities: ['WiFi', 'Breakfast', 'Smart TV', 'Jacuzzi', 'Champagne', 'Balcony', 'Turndown Service'],
      image: 'https://images.unsplash.com/photo-1566669437685-5f63f8b1c0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      type: 'suite'
    }
  ];

  const filteredRooms = activeFilter === 'all' 
    ? roomTypes 
    : roomTypes.filter(room => room.type === activeFilter);

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

  return (
    <div className="overflow-x-hidden bg-richblack-900 text-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-richblack-800 py-12 sm:py-16">
        <div className="w-11/12 max-w-maxContent mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            Our <span className="text-yellow-500">Rooms</span> & Suites
          </h1>
          <p className="text-richblack-200 max-w-2xl mx-auto">
            Experience unparalleled comfort in our exquisite accommodations
          </p>
        </div>
      </div>

      {/* Room Filter Tabs */}
      <div className="flex justify-center my-6 sm:my-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-l-lg font-medium ${activeFilter === 'all' ? 'bg-yellow-600 text-black' : 'bg-richblack-700 text-black'}`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setActiveFilter('room')}
            className={`px-4 py-2 font-medium ${activeFilter === 'room' ? 'bg-yellow-600 text-black' : 'bg-richblack-700 text-black'}`}
          >
            Standard Rooms
          </button>
          <button
            onClick={() => setActiveFilter('suite')}
            className={`px-4 py-2 rounded-r-lg font-medium ${activeFilter === 'suite' ? 'bg-yellow-600 text-black' : 'bg-richblack-700 text-black'}`}
          >
            Suites
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8 sm:my-12">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-richblack-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img src={room.image} alt={room.name} className="w-full h-48 sm:h-56 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{room.name}</h3>
                <div className="text-yellow-500 font-bold">${room.price}<span className="text-richblack-300 text-sm"> / night</span></div>
              </div>
              <div className="flex items-center text-sm text-richblack-300 mb-2">
                <FiStar className="text-yellow-500 mr-1" />
                <span>{room.size} • {room.beds}</span>
              </div>
              <p className="text-richblack-200 text-sm mb-4">{room.description}</p>
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="bg-richblack-700 px-3 py-1 rounded-full text-xs">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="bg-richblack-700 px-3 py-1 rounded-full text-xs">+{room.amenities.length - 4} more</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(room)}
                  className="w-1/2 border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black py-2 rounded-lg font-medium transition duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleBookNow(room)}
                  className="w-1/2 bg-yellow-600 hover:bg-yellow-700 text-black py-2 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Details Modal */}
     {showDetailsModal && selectedRoom && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{selectedRoom.name}</h2>
        <button 
          onClick={() => setShowDetailsModal(false)} 
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src={selectedRoom.image} 
            alt={selectedRoom.name} 
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Room Features</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Size</div>
                <div className="font-medium text-gray-900">{selectedRoom.size}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Bed Type</div>
                <div className="font-medium text-gray-900">{selectedRoom.beds}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium text-yellow-600">${selectedRoom.price}/night</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Description</h3>
          <p className="text-gray-600 mb-6">{selectedRoom.longDescription}</p>
          
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Amenities</h3>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {selectedRoom.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <FiChevronRight className="text-yellow-500 mr-2" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
          
          <Link
            to="/book"
            state={{ 
              room: selectedRoom,
              bookingDetails: {
                checkIn: '',
                checkOut: '',
                adults: 1,
                children: 0
              }
            }}
            className="inline-block w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Booking Modal */}
     {showBookingModal && selectedRoom && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Book {selectedRoom.name}</h2>
        <button 
          onClick={() => setShowBookingModal(false)} 
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <form onSubmit={handleBookingSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Check-in</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="checkIn"
                value={bookingForm.checkIn}
                onChange={handleBookingChange}
                className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Check-out</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="checkOut"
                value={bookingForm.checkOut}
                onChange={handleBookingChange}
                className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Adults</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <select
                name="adults"
                value={bookingForm.adults}
                onChange={handleBookingChange}
                className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Children</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <select
                name="children"
                value={bookingForm.children}
                onChange={handleBookingChange}
                className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowBookingModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Cancel
          </button>
          <Link
            to="/book"
            state={{ 
              room: selectedRoom,
              bookingDetails: bookingForm
            }}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition duration-300 text-center"
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