import React from 'react'
import { Link } from 'react-router-dom'

function GameOver(props) {
    return (
        <div className='g-over'>
            <h1 style={{color:"red"}}>Game Over !</h1>
            <h3 style={{fontSize:"25px"}}>Your Score : {props.snakeList.length - 4}</h3>
            <button className='btn' onClick={props.restartGame} style={{ width: "19%",textAlign:"center" }}>Restart</button>
            <Link to="/" style={{ textDecoration: 'none',marginTop:"20px" }}>
                <button className='btn' >
                    Home
                </button>
            </Link>
          
        </div>
    )
}

export default GameOver
