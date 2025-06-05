import React, { useState } from 'react';
import { FiCalendar, FiUser, FiHome, FiCreditCard } from 'react-icons/fi';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: 'deluxe',
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking confirmed! Thank you for choosing Luxury Haven.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Stay</h1>
          <p className="text-xl text-gray-600">Experience luxury redefined at Luxury Haven</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {stepNumber === 1 && <FiCalendar size={20} />}
                {stepNumber === 2 && <FiUser size={20} />}
                {stepNumber === 3 && <FiCreditCard size={20} />}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                {stepNumber === 1 && 'Dates & Room'}
                {stepNumber === 2 && 'Guest Info'}
                {stepNumber === 3 && 'Payment'}
              </span>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
          {/* Step 1: Dates & Room Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Dates & Room</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Check-in Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Check-out Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Adults</label>
                  <select
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Children</label>
                  <select
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Room Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'deluxe', name: 'Deluxe Room', price: '$199/night' },
                    { id: 'executive', name: 'Executive Suite', price: '$299/night' },
                    { id: 'presidential', name: 'Presidential Suite', price: '$499/night' },
                  ].map(room => (
                    <div key={room.id} className="border rounded-lg p-4 hover:border-yellow-500 transition cursor-pointer">
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
                        <div className="font-medium text-gray-900">{room.name}</div>
                        <div className="text-gray-600">{room.price}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                  Next: Guest Information
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Guest Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Guest Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                  Next: Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Information */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Booking Summary</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">
                    {formData.roomType === 'deluxe' && 'Deluxe Room'}
                    {formData.roomType === 'executive' && 'Executive Suite'}
                    {formData.roomType === 'presidential' && 'Presidential Suite'}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-medium">
                    {formData.checkIn} to {formData.checkOut}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">
                    {formData.adults} Adult{formData.adults !== 1 && 's'}{formData.children > 0 && `, ${formData.children} Child${formData.children !== 1 ? 'ren' : ''}`}
                  </span>
                </div>
          <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold">
  <span>Total:</span>
  <span>
    {formData.roomType === 'deluxe' && '$199'}
    {formData.roomType === 'executive' && '$299'}
    {formData.roomType === 'presidential' && '$499'}
    {' x '}
    {Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) || 1}
    {' nights = $'}
    {formData.roomType === 'deluxe' && 199 * (Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) || 1)}
    {formData.roomType === 'executive' && 299 * (Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) || 1)}
    {formData.roomType === 'presidential' && 499 * (Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) || 1)}
  </span>
</div>
            </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-800 hover:bg-gray-800 hover:text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingPage;