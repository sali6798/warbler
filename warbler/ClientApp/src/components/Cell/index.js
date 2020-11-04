import React, { useState } from "react";
import { useSelector } from "react-redux";


import "./style.css";

export default function Cell(props) {
    const [icon, setIcon] = useState();
    const playerId = useSelector(state => state.playerId);
    const cross = (
        <>
            <line x1="10%" y1="10%" x2="90%" y2="90%"></line>
            <line x1="90%" y1="10%" x2="10%" y2="90%"></line>
        </>
    );

    const circle = <circle cx="50%" cy="50%" r="40%"></circle>

    const handleClick = event => {
        event.target.style.cursor = "default";
        setIcon(playerId === 0 ? cross : circle)
    }

    return (
        <div className="Cell col-4">
            <div className="svg-container">
                <svg width="100%" height="100%" onClick={handleClick}>
                    {icon}
                </svg>
            </div>
        </div>
    );
}