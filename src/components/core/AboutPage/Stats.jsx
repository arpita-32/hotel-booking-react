import React from 'react';

const Stats = ({ stats }) => {
  return (
    <div className="relative mx-auto my-12 sm:my-16 w-full max-w-6xl px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-richblack-200 mt-2 text-sm sm:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;