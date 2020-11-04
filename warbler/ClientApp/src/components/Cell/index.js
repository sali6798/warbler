import React from "react";

import "./style.css";

export default function Cell(props) {
    const cross = (
        <>
            <line x1="10%" y1="10%" x2="90%" y2="90%"></line>
            <line x1="90%" y1="10%" x2="10%" y2="90%"></line>
        </>
    );

    const circle = <circle cx="50%" cy="50%" r="40%"></circle>

    const handleClick = event => {
        event.target.textContent = "x";
    }

    return (
        <div className="Cell">
            <svg width="100%" height="100%">
                {cross}
            </svg>
        </div>
    );
}