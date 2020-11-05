import React, { useEffect } from "react";

import "./style.css";

export default function Cell(props) {
    const cross = (
        <>
            <line x1="10%" y1="10%" x2="90%" y2="90%"></line>
            <line x1="90%" y1="10%" x2="10%" y2="90%"></line>
        </>
    );
    const circle = <circle cx="50%" cy="50%" r="40%"></circle>

    useEffect(() => {
        if (props.value !== -1) {
            document.querySelector("#cell-" + props.id).style.cursor = "default";
        }
    }, [props.value])

    return (
        <div className="Cell col-4">
            <div className="svg-container">
                <svg id={"cell-" + props.id} width="100%" height="100%" onClick={() => props.handleClick(props.value, props.id)}>
                    {props.value === 0 ? circle : (props.value === 1 ? cross : null)}
                </svg>
            </div>
        </div>
    );
}