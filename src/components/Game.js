import React, { useEffect, useRef, useState } from 'react';
import Tile from './Tile';
import './game.css';
import GameButtons from './GameButton';
import GameOver from './GameOver';

let tcount = 0;
function Game() {
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

    const generateFood = () => {
        return [parseInt(Math.random() * 18), parseInt(Math.random() * 18)];

    }

    const gameTick = () => {
        if (gameOverRef.current) return;
        setSnakeList((prevSnakeList) => {
            let body = [...prevSnakeList];
            tcount = (tcount + 1) % 40;
            // console.log("tcount =", tcount)
            let newInc = [...incrementRef.current]; // Use the latest value
            // console.log("gameTick newInc =", newInc);
            let newX = body[0][0] + newInc[0];
            let newY = body[0][1] + newInc[1];
            // body.unshift([newX % 19, newY % 19]);
            // body.pop();


            // if (snakeList.filter(i => { return i[0] == newX % 19 && i[1] == newY % 19 }).length  || newX < 0 || newX > 18 || newY < 0 || newY > 18) {
            //     setGameOver(true);
            // }
            // if (newX < 0 || newX > 18 || newY < 0 || newY > 18) {
            //     setGameOver(true);
            // }
            if (
                body.some((i) => i[0] === newX && i[1] === newY) || // Check for collision with the body
                newX < 0 ||
                newX > 18 ||
                newY < 0 ||
                newY > 18
            ) {
                setGameOver(true);
            }
            else {
                let f = [...foodRef.current];
                let ifv = isFoodVisible;
                // if (tcount == 39) {
                //     f = generateFood();

                //     ifv = true;
                // }
                if (tcount === 39) {
                    do {
                        f = generateFood();
                    } while (body.some((i) => i[0] === f[0] && i[1] === f[1]));

                    ifv = true;
                }
                // if (!(body[0][0] === f[0] && body[0][1] === f[1])) {
                //     body.pop();
                // }
                // else {
                //     ifv = false;
                // }
                // Check if the head of the snake is on the food position
                if (body[0][0] === f[0] && body[0][1] === f[1]) {
                    f = generateFood(); // Generate new food
                    ifv = true;
                } else {
                    body.pop(); // Remove the tail only if the snake didn't eat food
                }

                // console.log("Genreated food =", f);
                setFood(f);
                setIsFoodVisible(ifv);
            }
            body.unshift([newX % 19, newY % 19]);
            return body;
        });
    };


    const update = () => {
        let temp = Array.from({ length: 19 }, () => Array(19).fill(0));
        // console.log("snakeList:", snakeList);
        let f = [...foodRef.current];
        temp[f[0]][f[1]] = 2;
        snakeList.forEach((i) => {
            let [x, y] = i;
            temp[x][y] = 1;
        });
        setGameMatrix(temp);
    };
    const findbg = (cell) => {
        if (isFoodVisible && cell === 2)
            return "red";
        else if (cell === 1)
            return "#00ff0a";
        return "#112240";
    }
    const renderGame = () => {
        return gameMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                    <Tile key={`${rowIndex}-${colIndex}`} bgcolor={findbg(cell)} />
                    // <Tile key={`${rowIndex}-${colIndex}`} bgcolor={cell ? 'blue' : 'lightgrey'} />
                ))}
            </div>
        ));
    };
    const restartGame = () => {
        setGameOver(false);
        setSnakeList([[2, 2], [2, 1], [2, 0]]);
        setIncrement([0, 1]);

    }


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
            // console.log(gameOver)
            update();
        }
    }, [snakeList]);

    useEffect(() => {
        const intervalId = setInterval(() => {

            // console.log(gameOver)
            gameTick();

        }, 150);
        if (gameOver) {
            // console.log(gameOver);
            return () => clearInterval(intervalId);
        }
        // Clear interval on component unmount
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // console.log('Key pressed:', e.key);
            let newInc = -1;
            if (e.key === 'ArrowUp') newInc = [-1, 0];
            else if (e.key === 'ArrowDown') newInc = [1, 0];
            else if (e.key === 'ArrowLeft') newInc = [0, -1];
            else if (e.key === 'ArrowRight') newInc = [0, 1];
            let oldInc = [...incrementRef.current];
            if (newInc[0] + oldInc[0] === 0 && newInc[1] + oldInc[1] === 0) return;
            if (newInc !== -1) {
                // console.log('Setting new increment:', newInc);
                setIncrement(newInc);
                setForceRender((prev) => !prev);

            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // useEffect(() => {
    //     console.log(snakeList);
    // }, [snakeList]);
    // useEffect(() => {
    //     console.log("useEffect =", increment);
    //     // Put any logic here that depends on increment or snakeList
    // }, [increment, snakeList]);
    return (
        <>
            <div className="box">
                <div className="container">
                    {gameOver?<GameOver snakeList={snakeList} restartGame={restartGame}/>: <><div><h3 style={{textAlign:"center"}}>Your Score :{snakeList.length - 3}</h3></div>
                        <div className="game-container">{renderGame()}</div></>}
                        {/* <GameOver snakeList={snakeList} restartGame={restartGame}/> */}

                </div>
                {/* <div className="btn">
                    <button>Left</button>
                    <button>right</button>
                    <button>up</button>
                    <button>down</button>
                </div> */}
                {gameOver?"":<div className="">
                    <GameButtons setIncrement={setIncrement} increment={increment} />
                </div>}
            </div>
        </>
    );
}

export default Game;



// * problems *
// 1) button arrow font awsome design
// 2) layout border , color
// 3) high score, game mode simple complex
// 4) home , navbar
// 5) mobile check
// border #00fff1