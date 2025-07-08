import React from 'react';

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
      {" "}{text}
    </span>
  );
};

export default HighlightText;