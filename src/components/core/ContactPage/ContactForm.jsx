import React from 'react';
const ContactForm = ({ title, subtitle }) => {
  return (
    <div className='w-full lg:w-[60%] bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-700'>
      <h2 className='text-2xl font-bold mb-2 text-black'>{title}</h2>
      <p className='text-gray-400 mb-6'>{subtitle}</p>
      
      <form className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-400 mb-2'>Full Name</label>
            <input 
              type='text' 
              className='w-full bg-gray-800 rounded-lg px-4 py-3 text-black border border-gray-600 focus:border-yellow-500 focus:outline-none'
              placeholder='Your Name'
            />
          </div>
          <div>
            <label className='block text-gray-400 mb-2'>Email</label>
            <input 
              type='email' 
              className='w-full bg-gray-800 rounded-lg px-4 py-3 text-black border border-gray-600 focus:border-yellow-500 focus:outline-none'
              placeholder='Your Email'
            />
          </div>
        </div>
        
        <div>
          <label className='block text-gray-400 mb-2'>Subject</label>
          <select className='w-full bg-gray-800 rounded-lg px-4 py-3 text-black border border-gray-600 focus:border-yellow-500 focus:outline-none'>
            <option>General Inquiry</option>
            <option>Reservation Question</option>
            <option>Special Request</option>
            <option>Event Planning</option>
            <option>Feedback</option>
          </select>
        </div>
        
        <div>
          <label className='block text-gray-400 mb-2'>Message</label>
          <textarea 
            className='w-full bg-gray-800 rounded-lg px-4 py-3 text-black h-32 border border-gray-600 focus:border-yellow-500 focus:outline-none'
            placeholder='How can we assist you?'
          ></textarea>
        </div>
        
        <button 
          type='submit'
          className='w-full bg-yellow-600 hover:bg-yellow-700 text-black py-3 rounded-lg font-medium mt-4 transition duration-300 border border-yellow-700'
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
export default ContactForm;