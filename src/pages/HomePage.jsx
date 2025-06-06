import React, { useState } from 'react';
import { FiMenu, FiX, FiPhone, FiMapPin, FiMail, FiStar, FiWifi, FiCoffee, FiDroplet, FiTv } from 'react-icons/fi';
import { FaSwimmingPool, FaSpa, FaParking, FaUtensils } from 'react-icons/fa';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
// Room Card Component
const RoomCard = ({ title, price, image, description, amenities }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col">
      <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 object-cover" />
      <div className="p-4 md:p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
          <span className="text-yellow-600 font-bold whitespace-nowrap">${price}<span className="text-gray-600 text-sm"> / night</span></span>
        </div>
        <p className="text-gray-600 text-sm md:text-base mb-4">{description}</p>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Amenities:</h4>
          <ul className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <li key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs md:text-sm text-gray-700">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-4 md:mt-6 w-full bg-yellow-600 hover:bg-yellow-700 text- py-black rounded-md font-medium transition duration-300 text-sm md:text-base">
          View Details
        </button>
      </div>
    </div>
  );
};

// Amenity Card Component
const AmenityCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full">
      <div className="text-center">
        {React.cloneElement(icon, { className: "text-3xl md:text-4xl text-yellow-600 mb-3 md:mb-4" })}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

// Gallery Image Component
const GalleryImage = ({ src, alt }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 h-full">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 object-cover hover:scale-105 transition duration-500"
      />
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, rating }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md h-full">
      <div className="mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`inline ${i < rating ? 'text-yellow-500' : 'text-gray-300'} text-sm md:text-base`} 
          />
        ))}
      </div>
      <blockquote className="text-gray-600 italic mb-4 md:mb-6 text-sm md:text-base">"{quote}"</blockquote>
      <p className="font-medium text-gray-800 text-sm md:text-base">— {author}</p>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rooms');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'deluxe'
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request received!\nCheck-in: ${bookingForm.checkIn}\nCheck-out: ${bookingForm.checkOut}\nGuests: ${bookingForm.guests}\nRoom Type: ${bookingForm.roomType}`);
    setShowBookingModal(false);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header/Navigation */}
     
<Navbar/>
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-gray-100 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-4 lg:pr-8">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4">
              Experience Luxury <span className="text-yellow-600">Redefined</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
              Discover unparalleled comfort in our exquisite rooms and suites, designed to provide the perfect retreat for your stay.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 sm:px-8 sm:py-3 rounded-md font-medium transition duration-300 text-sm sm:text-base"
              >
                Book Your Stay
              </button>
              <button className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md font-medium transition duration-300 text-sm sm:text-base">
                Explore Rooms
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury Hotel Room" 
              className="rounded-lg shadow-xl w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Booking Bar */}
      <div className="bg-gray-800 text-white py-3 md:py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-3 md:mb-0 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Ready for an unforgettable stay?</h3>
              <p className="text-gray-300 text-sm md:text-base">Book directly with us for the best rates and exclusive benefits.</p>
            </div>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 md:px-8 md:py-3 rounded-md font-medium transition duration-300 whitespace-nowrap text-sm md:text-base"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <section id="rooms" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Our Rooms & Suites</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Each of our rooms is designed to provide maximum comfort and luxury, with attention to every detail.
            </p>
          </div>
          
          <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto pb-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('rooms')}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-l-lg font-medium text-sm sm:text-base ${activeTab === 'rooms' ? 'bg-yellow-600 text-black' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Rooms
              </button>
              <button
                onClick={() => setActiveTab('suites')}
                className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base ${activeTab === 'suites' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Suites
              </button>
              <button
                onClick={() => setActiveTab('villas')}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-r-lg font-medium text-sm sm:text-base ${activeTab === 'villas' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Villas
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activeTab === 'rooms' && (
              <>
                <RoomCard 
                  title="Deluxe Room" 
                  price={199} 
                  image="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Spacious room with king-size bed, work desk, and luxurious bathroom amenities."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Air Conditioning']}
                />
                <RoomCard 
                  title="Executive Room" 
                  price={249} 
                  image="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Elegant room with premium furnishings, lounge area, and enhanced workspace."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning']}
                />
                <RoomCard 
                  title="Family Room" 
                  price={299} 
                  image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Perfect for families with connecting rooms and extra space for children."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Air Conditioning', 'Extra Beds']}
                />
              </>
            )}
            
            {activeTab === 'suites' && (
              <>
                <RoomCard 
                  title="Junior Suite" 
                  price={399} 
                  image="https://images.unsplash.com/photo-1582719471387-9c060cce8e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Separate living area with luxurious bedroom and premium amenities."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe']}
                />
                <RoomCard 
                  title="Executive Suite" 
                  price={499} 
                  image="https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Spacious suite with separate living room, dining area, and premium services."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe', '24/7 Butler']}
                />
                <RoomCard 
                  title="Presidential Suite" 
                  price={999} 
                  image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="The ultimate in luxury with multiple rooms, premium furnishings, and exclusive services."
                  amenities={['WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe', '24/7 Butler', 'Private Chef']}
                />
              </>
            )}
            
            {activeTab === 'villas' && (
              <>
                <RoomCard 
                  title="Garden Villa" 
                  price={1299} 
                  image="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Private villa with garden, pool, and all the amenities for a perfect retreat."
                  amenities={['Private Pool', 'WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe', '24/7 Butler']}
                />
                <RoomCard 
                  title="Beachfront Villa" 
                  price={1599} 
                  image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="Direct beach access with stunning ocean views and premium services."
                  amenities={['Private Pool', 'WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe', '24/7 Butler', 'Private Chef']}
                />
                <RoomCard 
                  title="Royal Villa" 
                  price={2499} 
                  image="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  description="The most exclusive accommodation with multiple bedrooms, private staff, and luxury amenities."
                  amenities={['Private Pool', 'WiFi', 'Breakfast', 'TV', 'Mini Bar', 'Air Conditioning', 'Bathrobe', '24/7 Butler', 'Private Chef', 'Spa Services']}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Hotel Amenities</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              We provide world-class facilities to ensure your stay is comfortable and memorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AmenityCard 
              icon={<FaSwimmingPool />}
              title="Infinity Pool"
              description="Stunning infinity pool with panoramic views of the city and ocean."
            />
            <AmenityCard 
              icon={<FaSpa />}
              title="Luxury Spa"
              description="Rejuvenate with our range of spa treatments and massages."
            />
            <AmenityCard 
              icon={<FaUtensils />}
              title="Fine Dining"
              description="Multiple restaurants offering local and international cuisine."
            />
            <AmenityCard 
              icon={<FaParking />}
              title="Valet Parking"
              description="Complimentary valet parking for all our guests."
            />
            <AmenityCard 
              icon={<FiWifi />}
              title="High-Speed WiFi"
              description="Complimentary high-speed internet throughout the property."
            />
            <AmenityCard 
              icon={<FiCoffee />}
              title="24/7 Room Service"
              description="Round-the-clock dining available in the comfort of your room."
            />
            <AmenityCard 
              icon={<FiDroplet />}
              title="Rain Shower"
              description="Luxurious rain showers in all our rooms and suites."
            />
            <AmenityCard 
              icon={<FiTv />}
              title="Entertainment"
              description="Premium TV channels and streaming services available."
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Photo Gallery</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Take a visual journey through our luxurious accommodations and facilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <GalleryImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Beach View" />
            <GalleryImage src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Luxury Suite" />
            <GalleryImage src="https://images.unsplash.com/photo-1582719471387-9c060cce8e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Pool Area" />
            <GalleryImage src="https://images.unsplash.com/photo-1566669437685-5f63f8b1c0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Restaurant" />
            <GalleryImage src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Spa" />
            <GalleryImage src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Lobby" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Guest Reviews</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Hear what our guests have to say about their experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <TestimonialCard 
              quote="The most amazing hotel I've ever stayed at. The service was impeccable and the room was stunning."
              author="Sarah Johnson"
              rating={5}
            />
            <TestimonialCard 
              quote="Perfect location, beautiful rooms, and the staff went above and beyond to make our stay special."
              author="Michael Chen"
              rating={5}
            />
            <TestimonialCard 
              quote="The infinity pool with ocean views was worth every penny. We'll definitely be back!"
              author="Emma Rodriguez"
              rating={4}
            />
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <Footer/>

    </div>
  );
}
export default App; 