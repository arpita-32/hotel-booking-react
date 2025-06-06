import React from 'react';

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
      {" "}{text}
    </span>
  );
};

export default HighlightText;