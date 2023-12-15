import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div style={{ height:"500px", display: "flex", color: "white", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h1  className="heading" style={{color:"yellow"}}>Welcome to Snake Game</h1>
                {/* <div><Link to="/game">Play game</Link ></div> */}
                <Link to="/mode" style={{ textDecoration: 'none' }}>
                    <button className='btn' style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: '#ff00b3', border: '4px solid #00fff1', padding: '10px 20px', cursor: 'pointer' }}>
                        Play
                    </button>
                </Link>
            </div>

        </>
    )
}

export default Home
