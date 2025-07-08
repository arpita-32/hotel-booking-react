import React from 'react';
const ContactDetails = ({ address, phone, email, hours }) => {
  return (
    <div className='w-full lg:w-[40%] bg-gray-900 p-6 sm:p-8 rounded-xl'>
      <h2 className='text-2xl font-bold mb-6 text-yellow-500'>Contact Information</h2>
      
      <div className='space-y-6'>
        <div>
          <h3 className='font-semibold mb-2'>Address</h3>
          <p className='text-gray-400'>{address}</p>
        </div>
        
        <div>
          <h3 className='font-semibold mb-2'>Phone</h3>
          <p className='text-gray-400'>{phone}</p>
          <p className='text-sm text-richblack-900 mt-1'>24/7 Reception</p>
        </div>
        
        <div>
          <h3 className='font-semibold mb-2'>Email</h3>
          <p className='text-gray-400'>{email}</p>
        </div>
        
        <div>
          <h3 className='font-semibold mb-2'>Concierge Hours</h3>
          <ul className='space-y-2 text-gray-400'>
            {hours.map((item, index) => (
              <li key={index} className='flex justify-between max-w-xs'>
                <span>{item.day}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;