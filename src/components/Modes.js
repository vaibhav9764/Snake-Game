import React from 'react';
import { Link } from 'react-router-dom';

function Modes(props) {

    const handleClick = (e) => {
        props.setGameType(e);
        console.log(props.gameType);
    }

    return (
        <div className='container mode-switch'>
            <h2>Game Type</h2>
            {/* Pass a function reference to onClick, don't invoke the function immediately */}
            <Link to="/game" style={{ textDecoration: 'none' }}>
                <button className='btn' style={{ margin: "5px" }} onClick={() => handleClick(1)}>Classic</button>
            </Link>
            <Link to="/game" style={{ textDecoration: 'none' }}>
                <button className='btn' style={{ margin: "5px" }} onClick={() => handleClick(0)}>Box</button>
            </Link>
        </div>
    );
}

export default Modes;
