import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Game from './components/Game';
import Background from './components/Background';
import Modes from './components/Modes';
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [gameType, setGameType] = useState(1);
  
  return (
    <>
    <Background/>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/game" element={<Game gameType={gameType}/>} />
          <Route exact path="/mode" element={<Modes setGameType={setGameType} gameType={gameType}/>} />
          <Route exact path="/gameOver" element={<Modal/>} />
        </Routes>
    </>
  );
}

export default App;
