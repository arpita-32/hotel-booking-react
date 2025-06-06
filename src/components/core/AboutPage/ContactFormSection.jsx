import React from 'react';

const ContactFormSection = ({ title, subtitle }) => {
  return (
    <div className="relative mx-auto my-12 sm:my-16 w-full max-w-4xl px-4">
      <div className="bg-richblack-800 rounded-xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">{title}</h2>
        <p className="text-richblack-200 text-center mb-6">{subtitle}</p>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-richblack-200 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-richblack-700 rounded-lg px-4 py-3 text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-richblack-200 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-richblack-700 rounded-lg px-4 py-3 text-white"
                placeholder="Your Email"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-richblack-200 mb-2">Message</label>
            <textarea 
              className="w-full bg-richblack-700 rounded-lg px-4 py-3 text-white h-32"
              placeholder="How can we assist you?"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white py-3 rounded-lg font-medium mt-4"
          >
            Contact Concierge
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;