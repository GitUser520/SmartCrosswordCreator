import React from "react";
import {
    TextField
} from "@mui/material";

export const CrosswordComponent = (props) => {
    var indents = [];
    for (var i = 0; i < props.grid.length; i++) {
        for (var j = 0; j < props.grid[0].length; j++) {
            indents.push(<input type="text" name = "fname" id="fname" maxLength="1" key={i*3 + j} className = "input-box"/>);
        }
        indents.push(<br/>);
    }

    return (
        <div className="grid-container">
            {indents}
        </div>
    );
}

export const CrosswordComponentReact = (props) => {
    var indents = [];
    for (var i = 0; i < props.grid.length; i++) {
        for (var j = 0; j < props.grid[0].length; j++) {
            indents.push(
                <TextField id={"outlined-basic"} label={"letter"}>
                </TextField>
            );
        }
        indents.push(<br/>);
    }

    return (
        <div className="grid-container">
            {indents}
        </div>
    );
}