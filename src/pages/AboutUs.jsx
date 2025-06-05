import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Luxury Haven</h1>
          <p className="text-xl text-gray-600">Discover our story and what makes us special</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, Luxury Haven began as a small boutique hotel with just 20 rooms. 
            Our founder, James Wilson, envisioned a space where luxury meets comfort, creating 
            unforgettable experiences for every guest.
          </p>
          <p className="text-gray-600 mb-4">
            Over the years, we've expanded to become one of the most prestigious hotel chains 
            in the region, while maintaining our commitment to personalized service and 
            attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600">
              To provide exceptional hospitality experiences that exceed our guests' expectations, 
              creating memories that last a lifetime through impeccable service, luxurious 
              accommodations, and thoughtful amenities.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Values</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Excellence in service</li>
              <li>Respect for all individuals</li>
              <li>Sustainability and environmental responsibility</li>
              <li>Continuous innovation</li>
              <li>Community engagement</li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
          <p className="text-gray-600 mb-6">
            Our dedicated team of hospitality professionals is committed to making your stay 
            perfect in every way. From our concierge to our housekeeping staff, every member 
            is trained to anticipate your needs and deliver service with a smile.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'General Manager', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Michael Chen', role: 'Head Chef', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Emma Rodriguez', role: 'Guest Relations', img: 'https://randomuser.me/api/portraits/women/63.jpg' },
            ].map((member, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;