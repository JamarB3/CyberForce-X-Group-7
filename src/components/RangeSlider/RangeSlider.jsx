import React, { useState } from 'react';

function RangeSlider() {
  const [value, setValue] = useState(50);

  const handleInputChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  return (
    <div style={{marginTop: '20px'}}>
      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={handleInputChange}
      />
      <span>Miles: {value}</span>
    </div>
  );
};

export default RangeSlider;