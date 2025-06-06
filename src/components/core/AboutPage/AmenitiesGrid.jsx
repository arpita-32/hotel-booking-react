import React from 'react';

const AmenitiesGrid = ({ amenities }) => {
  return (
    <div className="relative mx-auto my-12 sm:my-16 w-full max-w-6xl px-4">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
        Our Signature Amenities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((amenity, index) => (
          <div key={index} className="bg-richblack-800 p-6 rounded-lg hover:shadow-lg transition duration-300">
            <div className="text-3xl mb-4">{amenity.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
            <p className="text-richblack-200 text-sm">{amenity.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesGrid;