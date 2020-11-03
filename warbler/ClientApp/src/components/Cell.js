import React from "react";

export default function Cell(props) {
    const handleClick = event => {
        event.target.textContent = "x";
    }

    return (
        <div
            style={
                {
                    border: "2px solid black",
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative"
                }
            }
            >
            <div
            onClick={handleClick}
                style={
                    {
                        width: "100%",
                        height: "100%",
                        top: "0",
                        paddingTop: "50%",
                        position: "absolute",
                        textAlign: "center"
                    }
                }
            ></div>
        </div>
    );
}