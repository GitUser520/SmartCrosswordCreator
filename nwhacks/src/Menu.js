import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, TextField
} from '@mui/material';

function Menu() {
    const [text, setText] = useState("");

    return (
        <div>
            <TextField
                id={"outlined-basic"}
                label={"Input words here."}
                onChange={event => {
                    setText(event.target.value);
                }}
            >
            </TextField>
            <br />
            <Link
                style={{ textDecoration: "none" }}
                to={{
                    pathname: "/app",
                    state: {
                        textValue: {}
                    }
                }}
            >
                <Button variant="contained">Start Learning!</Button>
            </Link>
        </div>
    );
}

export default Menu;