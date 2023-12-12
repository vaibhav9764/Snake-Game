// GameButtons.js

import React from 'react';
import './gamebutton.css';

const GameButtons = (props) => {
  const handleButtonClick = (buttonNumber) => {
    let oldInc = props.increment; // Change to props.increment
    let newInc = [0, 1]; // Default value

    if (buttonNumber === 1) {
      newInc = [-1, 0];
    } else if (buttonNumber === 2) {
      newInc = [1, 0];
    } else if (buttonNumber === 3) {
      newInc = [0, -1];
    } else if (buttonNumber === 4) {
      newInc = [0, 1];
    }

    if (newInc[0] + oldInc[0] === 0 && newInc[1] + oldInc[1] === 0) return;
    props.setIncrement(newInc);
  };

  return (
    <div className="button-container">
      <div>   <button className='btn' onClick={() => handleButtonClick(1)}>UP</button></div>

      <div className='middle'>  <button className='btn' style={{float:"left", left:"0px"}} onClick={() => handleButtonClick(3)}>LEFT</button>
        <button className='btn' onClick={() => handleButtonClick(4)}>RIGHT</button>
      </div>
      <div><button className='btn' onClick={() => handleButtonClick(2)}>DOWN</button>
      </div>
    </div>
  );
};

export default GameButtons;
