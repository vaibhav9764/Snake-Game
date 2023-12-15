import React from 'react'
import useSound from 'use-sound';
import eatSound from './eatSound.mp3'

function Modal() {
    const [play] = useSound(eatSound);

    const playSound = () => {
      play();
    };
  return (
    <div>
      <button onClick={playSound}>Play Sound</button>
    </div>
  )
}

export default Modal
