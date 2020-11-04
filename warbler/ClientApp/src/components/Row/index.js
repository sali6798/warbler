import React from "react";
import Cell from "../Cell";

export default function Row() {
    return (
        <div className="row no-gutters">
            <div className="col-4"><Cell /></div>
            <div className="col-4"><Cell /></div>
            <div className="col-4"><Cell /></div>
        </div>
    );
}