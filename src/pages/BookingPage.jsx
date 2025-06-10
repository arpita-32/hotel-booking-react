import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiCreditCard, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import React from 'react'
import Footer from '../components/common/Footer';
import HighlightText from '../components/common/HighlightText';
import NavBar from '../components/common/NavBar';


const BookingPage = () => {
  const location = useLocation();
  const { room: roomData, bookingDetails: initialBookingDetails } = location.state || {};

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: initialBookingDetails?.checkIn || '',
    checkOut: initialBookingDetails?.checkOut || '',
    adults: initialBookingDetails?.adults || 1,
    children: initialBookingDetails?.children || 0,
    roomType: roomData?.id || 'deluxe',  // Use the passed room ID
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nights, setNights] = useState(0);

  // Calculate nights when checkIn or checkOut changes
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const diffTime = new Date(formData.checkOut) - new Date(formData.checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    } else {
      setNights(0);
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    let valid = true;
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.checkIn) {
        newErrors.checkIn = 'Check-in date is required';
        valid = false;
      }
      if (!formData.checkOut) {
        newErrors.checkOut = 'Check-out date is required';
        valid = false;
      } else if (formData.checkIn && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
        newErrors.checkOut = 'Check-out must be after check-in';
        valid = false;
      }
    } else if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
        valid = false;
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        valid = false;
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
        valid = false;
      }
    } else if (step === 3) {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Valid card number is required';
        valid = false;
      }
      if (!formData.expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
        newErrors.expiry = 'Valid expiry date (MM/YY) required';
        valid = false;
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'CVV is required';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    return value;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setFormData(prev => ({ ...prev, expiry: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Booking submitted:', formData);
        setIsSubmitting(false);
        alert('Booking confirmed! Thank you for choosing Luxury Haven.');
      }, 1500);
    }
  };

  const roomTypes = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: 199,
    description: 'Spacious room with king-size bed, work desk, and luxurious bathroom amenities.'
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    price: 299,
    description: 'Elegant suite with separate living area, premium furnishings, and enhanced workspace.'
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: 499,
    description: 'The ultimate in luxury with multiple rooms, premium furnishings, and exclusive services.'
  },
  {
    id: 'family',
    name: 'Family Suite',
    price: 349,
    description: 'Spacious suite perfect for families with children, featuring separate sleeping areas.'
  },
  {
    id: 'oceanview',
    name: 'Ocean View Room',
    price: 249,
    description: 'Beautiful room with stunning ocean views and balcony access.'
  },
  {
    id: 'honeymoon',
    name: 'Honeymoon Suite',
    price: 399,
    description: 'Romantic suite with special amenities for couples, including champagne on arrival.'
  }
];

  const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* NavBar at the very top */}
      <NavBar />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 pt-22 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            <HighlightText text="Book Your Stay" /> 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600"
          >
            Experience luxury redefined at <span className="font-semibold text-orange-500">Luxury Haven</span>
          </motion.p>
        </div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between mb-12 relative"
        >
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10 mx-12">
            <div 
              className="h-full bg-orange-500 transition-all duration-500" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
          
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 
                ${step >= stepNumber ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                {stepNumber === 1 && <FiCalendar size={20} />}
                {stepNumber === 2 && <FiUser size={20} />}
                {stepNumber === 3 && <FiCreditCard size={20} />}
              </div>
              <span className={`mt-2 text-sm font-medium transition-colors duration-300 
                ${step >= stepNumber ? 'text-gray-900' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Dates & Room'}
                {stepNumber === 2 && 'Guest Info'}
                {stepNumber === 3 && 'Payment'}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Booking Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white shadow-xl rounded-xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Dates & Room Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Dates & Room</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Check-in Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border ${errors.checkIn ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                        required
                      />
                      {errors.checkIn && <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Check-out Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border ${errors.checkOut ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                        required
                      />
                      {errors.checkOut && <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Adults</label>
                    <select
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Children</label>
                    <select
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">Room Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {roomTypes.map(room => (
                      <div 
                        key={room.id} 
                        onClick={() => setFormData(prev => ({ ...prev, roomType: room.id }))}
                        className={`border rounded-xl p-4 transition-all cursor-pointer ${formData.roomType === room.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-300'}`}
                      >
                        <input
                          type="radio"
                          id={room.id}
                          name="roomType"
                          value={room.id}
                          checked={formData.roomType === room.id}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <label htmlFor={room.id} className="block cursor-pointer">
                          <div className="font-bold text-gray-900 mb-1">{room.name}</div>
                          <div className="text-orange-500 font-semibold mb-2">${room.price}/night</div>
                          <div className="text-sm text-gray-600">{room.description}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {nights > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-blue-800">Selected Stay</h3>
                        <p className="text-sm text-blue-600">
                          {nights} {nights === 1 ? 'Night' : 'Nights'} • {selectedRoom?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-800">${selectedRoom?.price * nights}</p>
                        <p className="text-xs text-blue-600">${selectedRoom?.price} × {nights} nights</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center bg-orange-500 hover:bg-orange-500 text-black px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Next: Guest Information <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Guest Information */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Guest Information</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-300"
                  >
                    <FiArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center bg-orange-500 hover:bg-orange-500 text-black px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Next: Payment <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Card Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCreditCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={`w-full pl-10 px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                      required
                    />
                  </div>
                  {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`w-full px-4 py-3 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                      required
                    />
                    {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                      required
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Booking Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium">{selectedRoom?.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dates:</span>
                      <span className="font-medium">
                        {new Date(formData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {' '}
                        {new Date(formData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {nights} {nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">
                        {formData.adults} {formData.adults === 1 ? 'Adult' : 'Adults'}
                        {formData.children > 0 && `, ${formData.children} ${formData.children === 1 ? 'Child' : 'Children'}`}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-3 pt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Room Rate:</span>
                        <span className="font-medium">${selectedRoom?.price}/night</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Nights:</span>
                        <span className="font-medium">{nights}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-lg font-bold text-orange-500">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition duration-300"
                  >
                    <FiArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center justify-center bg-orange-500 hover:bg-orange-500 text-black px-8 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>

     <Footer />
    </div>
  );
};

export default BookingPage;