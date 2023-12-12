import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Game from './components/Game';
import Background from './components/Background';

function App() {
  return (
    <>
    <Background/>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/game" element={<Game/>} />
        </Routes>
    </>
  );
}

export default App;
