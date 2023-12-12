import React, { useEffect, useState } from 'react';

function Tile(props) {
    const [gameContainer, setGameContainer] = useState({
        style: {
            aspectRatio: "1",
            float: "left",
            backgroundColor: "#112240",
            
        }
    });

    useEffect(() => {
        setGameContainer({
            style: {
                aspectRatio: "1",
                float: "left",
                backgroundColor: props.bgcolor
            }
        });
    }, [props.bgcolor]);

    return (
        <div className="game-tile" style={gameContainer.style}></div>
    );
}

export default Tile;
