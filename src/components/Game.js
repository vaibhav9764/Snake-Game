import React, { useEffect, useRef, useState } from 'react';
import Tile from './Tile';
import './game.css';
import GameButtons from './GameButton';
import GameOver from './GameOver';
import useSound from 'use-sound';
import eatSound from './eatSound.mp3';
import endSound from './endSound.mp3'

let tcount = 0;

function Game(props) {
  const [play] = useSound(endSound);
  const [eatplay] = useSound(eatSound);
  const [gameMatrix, setGameMatrix] = useState([]);
  const [snakeList, setSnakeList] = useState([[2, 2], [2, 1], [2, 0]]);
  const [increment, setIncrement] = useState([0, 1]);
  const [forceRender, setForceRender] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState([15, 15]);
  const [isFoodVisible, setIsFoodVisible] = useState(true);

  const incrementRef = useRef(increment);
  const foodRef = useRef(food);
  const gameOverRef = useRef(gameOver);
  const buttonEndRef = useRef();
  const buttonEatRef = useRef();

  const generateFood = () => {
    return [parseInt(Math.random() * 18), parseInt(Math.random() * 18)];
  };

  const gameTick = () => {
    if (gameOverRef.current) return;
    setSnakeList((prevSnakeList) => {
      let body = [...prevSnakeList];
      tcount = (tcount + 1) % 40;
      let newInc = [...incrementRef.current];
      let newX = body[0][0] + newInc[0];
      let newY = body[0][1] + newInc[1];

      if (props.gameType && newX < 0) {
        newX = 18;
      }
      if (props.gameType && newY < 0) {
        newY = 18;
      }
      if (
        body.some((i) => i[0] === newX && i[1] === newY) ||
        (!props.gameType &&
          (newX < 0 || newX > 18 || newY < 0 || newY > 18))
      ) {
        buttonEndRef.current.click();
        setGameOver(true);
    
      } else {
        let f = [...foodRef.current];
        let ifv = isFoodVisible;

        if (tcount === 39) {
          do {
            f = generateFood();
          } while (body.some((i) => i[0] === f[0] && i[1] === f[1]));

          ifv = true;
        }

        if (body[0][0] === f[0] && body[0][1] === f[1]) {
          f = generateFood();
          ifv = true;
        //   play();
        buttonEatRef.current.click();
     
        } else {
          body.pop();
        }

        setFood(f);
        setIsFoodVisible(ifv);
      }
      body.unshift([newX % 19, newY % 19]);
      return body;
    });
  };

  const update = () => {
    let temp = Array.from({ length: 19 }, () => Array(19).fill(0));
    let f = [...foodRef.current];
    temp[f[0]][f[1]] = 2;
    snakeList.forEach((i) => {
      let [x, y] = i;
      temp[x][y] = 1;
    });
    setGameMatrix(temp);
  };

  const findbg = (cell) => {
    if (isFoodVisible && cell === 2) return "red";
    else if (cell === 1) return "#00ff0a";
    return "#112240";
  };

  const renderGame = () => {
    return gameMatrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} bgcolor={findbg(cell)} />
        ))}
      </div>
    ));
  };

  const restartGame = () => {
    setGameOver(false);
    setSnakeList([[2, 2], [2, 1], [2, 0]]);
    setIncrement([0, 1]);
  };

  useEffect(() => {
    incrementRef.current = increment;
  }, [increment]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      update();
    }
  }, [snakeList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      gameTick();
    }, 150);
    if (gameOver) {
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newInc = -1;
      if (e.key === 'ArrowUp') newInc = [-1, 0];
      else if (e.key === 'ArrowDown') newInc = [1, 0];
      else if (e.key === 'ArrowLeft') newInc = [0, -1];
      else if (e.key === 'ArrowRight') newInc = [0, 1];
      let oldInc = [...incrementRef.current];
      if (newInc[0] + oldInc[0] === 0 && newInc[1] + oldInc[1] === 0) return;
      if (newInc !== -1) {
        setIncrement(newInc);
        setForceRender((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="box">
        <div className="container">
          {gameOver ? (
            <GameOver snakeList={snakeList} restartGame={restartGame} />
          ) : (
            <>
              <div>
                <h3 style={{ textAlign: "center" }}>
                  Your Score :{snakeList.length - 3}
                </h3>
              </div>
              <div
                className="game-container"
                style={{
                  border: `5px solid ${
                    props.gameType === 0 ? "red" : "blue"
                  }`,
                }}
              >
                {renderGame()}
              </div>
            </>
          )}
        </div>
        {gameOver ? (
          ""
        ) : (
          <div className="">
            <GameButtons setIncrement={setIncrement} increment={increment} />
            {/* Button to trigger the sound */}
            <button  ref={buttonEndRef} className='play-btn' onClick={play}>Play Sound</button>
            <button  ref={buttonEatRef} className='play-btn' onClick={eatplay}>Play Sound</button>
          </div>
        )}
      </div> 
      
    </>
  );
}

export default Game;




