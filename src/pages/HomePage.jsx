import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaParking, FaSpa, FaSwimmingPool, FaUtensils } from 'react-icons/fa';
import { FiArrowRight, FiCoffee, FiDroplet, FiStar, FiTv, FiWifi } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import HighlightText from '../components/common/HighlightText';
import Navbar from '../components/common/NavBar';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Room Card Component
const RoomCard = ({ title, price, image, description, amenities }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col transform hover:-translate-y-2"
    >
      <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 object-cover" />
      <div className="p-4 md:p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
          <span className="text-orange-500 font-bold whitespace-nowrap">${price}<span className="text-gray-600 text-sm"> / night</span></span>
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
        <Link 
          to="/rooms" 
          className="mt-4 md:mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white py-3 rounded-md font-medium transition duration-300 text-sm md:text-base flex items-center justify-center shadow-md hover:shadow-lg"
        >
          View Details <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
};

// Amenity Card Component
const AmenityCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full transform hover:-translate-y-2"
    >
      <div className="text-center">
        {React.cloneElement(icon, { className: "text-3xl md:text-4xl text-orange-500 mb-3 md:mb-4 mx-auto" })}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  );
};

// Gallery Image Component
const GalleryImage = ({ src, alt }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full group"
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 object-cover transform transition duration-500 group-hover:scale-110"
      />
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, rating }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-lg shadow-lg h-full transform hover:-translate-y-2 transition duration-300"
    >
      <div className="mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`inline ${i < rating ? 'text-orange-500 fill-orange-500' : 'text-gray-300'} text-sm md:text-base`} 
          />
        ))}
      </div>
      <blockquote className="text-gray-600 italic mb-4 md:mb-6 text-sm md:text-base">"{quote}"</blockquote>
      <p className="font-medium text-gray-800 text-sm md:text-base">— {author}</p>
    </motion.div>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header/Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <section id="home" className="pt-22 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500 filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-500 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 lg:pr-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
            >
              Experience <br />
              <HighlightText text="Luxury Redefined" />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-10 max-w-lg"
            >
              Discover unparalleled comfort in our exquisite rooms and suites, designed to provide the perfect retreat for your stay. Our award-winning service ensures every moment is memorable.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link 
                to="/book" 
                className="bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-400 hover:to-orange-400 text-white px-8 py-4 rounded-lg font-medium transition duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Book Your Stay <FiArrowRight className="ml-3" />
              </Link>
              <Link 
                to="/rooms" 
                className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-medium transition duration-300 text-lg flex items-center justify-center transform hover:scale-105"
              >
                Explore Rooms <FiArrowRight className="ml-3" />
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Hotel Room" 
                className="w-full h-auto max-h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm sm:text-base">Our Signature Ocean View Suite</p>
                <h3 className="text-xl sm:text-2xl font-bold">Starting from $499/night</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 text-white py-4 md:py-5 shadow-lg relative z-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-3 md:mb-0 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Ready for an unforgettable stay?</h3>
              <p className="text-gray-300 text-base md:text-lg">Book directly with us for the best rates and exclusive benefits.</p>
            </div>
            <Link 
              to="/book"
              className="bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-500 hover:to-orange-300 text-white px-8 py-3 md:px-10 md:py-4 rounded-lg font-medium transition duration-300 whitespace-nowrap text-lg flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Check Availability <FiArrowRight className="ml-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Rooms Section */}
      <section id="rooms" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={letterAnimation} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <HighlightText text="Accommodations" />
            </motion.h2>
            <motion.p variants={letterAnimation} className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each of our rooms is designed to provide maximum comfort and luxury, with attention to every detail.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8 md:mb-12 overflow-x-auto pb-4"
          >
            <div className="inline-flex rounded-lg shadow-sm bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('rooms')}
                className={`px-6 py-3 rounded-lg font-medium text-base ${activeTab === 'rooms' ? 'bg-white text-orange-500 shadow-md' : 'text-gray-800 hover:text-orange-500'}`}
              >
                Rooms
              </button>
              <button
                onClick={() => setActiveTab('suites')}
                className={`px-6 py-3 rounded-lg font-medium text-base ${activeTab === 'suites' ? 'bg-white text-orange-500 shadow-md' : 'text-gray-800 hover:text-orange-500'}`}
              >
                Suites
              </button>
              <button
                onClick={() => setActiveTab('villas')}
                className={`px-6 py-3 rounded-lg font-medium text-base ${activeTab === 'villas' ? 'bg-white text-orange-500 shadow-md' : 'text-gray-800 hover:text-orange-500'}`}
              >
                Villas
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
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
                  image="https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link 
              to="/rooms" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              View All Accommodations <FiArrowRight className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={letterAnimation} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              World-Class <HighlightText text="Facilities" />
            </motion.h2>
            <motion.p variants={letterAnimation} className="text-gray-600 text-lg max-w-3xl mx-auto">
              We provide exceptional facilities to ensure your stay is comfortable and memorable.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={letterAnimation} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <HighlightText text="Gallery" />
            </motion.h2>
            <motion.p variants={letterAnimation} className="text-gray-600 text-lg max-w-3xl mx-auto">
              Take a visual journey through our luxurious accommodations and facilities.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <GalleryImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Beach View" />
            <GalleryImage src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Luxury Suite" />
            <GalleryImage src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Pool Area" />
            <GalleryImage src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Restaurant" />
            <GalleryImage src="https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Spa" />
            <GalleryImage src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Lobby" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-12"
          >
            
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={letterAnimation} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Guest <HighlightText text="Testimonials" />
            </motion.h2>
            <motion.p variants={letterAnimation} className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear what our guests have to say about their experiences.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 md:py-20 bg-gradient-to-r from-orange-400 to-orange-400 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book your stay today and experience luxury like never before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/book" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Now
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default HomePage;