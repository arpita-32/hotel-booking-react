import React, { useState } from 'react';

const ReviewSlider = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Review Card */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              className={`w-6 h-6 ${i < 4 ? 'text-yellow-500' : 'text-gray-600'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-200 text-lg md:text-xl italic mb-6 text-center">
          "{reviews[currentIndex].text}"
        </p>
        <p className="text-yellow-500 font-medium text-right">
          — {reviews[currentIndex].author}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={prevReview}
          className="p-3 rounded-full bg-black hover:bg-gray-900 text-black hover:text-black-200 transition-colors duration-200 shadow-md"
          aria-label="Previous review"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentIndex === index ? 'bg-yellow-500 w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextReview}
          className="p-3 rounded-full bg-black hover:bg-gray-900 text-black hover:text-black-200 transition-colors duration-200 shadow-md"
          aria-label="Next review"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;