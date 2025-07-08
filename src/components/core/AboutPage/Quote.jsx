import React from 'react';

const Quote = ({ text, author }) => {
  return (
    <div className="relative mx-auto my-12 sm:my-16 w-full max-w-4xl px-4">
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-medium italic text-gray-300">
          "{text}"
        </div>
        <div className="mt-4 text-richblack-300 font-medium">
          {author}
        </div>
      </div>
    </div>
  );
};

export default Quote;