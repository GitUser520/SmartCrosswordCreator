import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Crossword from "./Crossword.js";

export const AppBarComponent = (props) => {
    return (
        <CompleteAppBar state={props.state} />
    );
}

function CompleteAppBar(props) {

    const [state, setState] = useState(props.state);

    const checkSolution = () => {

    }

    const displaySolution = () => {

    }

    const newGame = () => {

    }

    return (
        <Box>
            <AppBar justifyContent={"center"}>
                <Toolbar>
                    <Typography variant={"h5"} align="center" style={{width: "100%", alignItems: "center"}}>
                        Smart Crossword Creator
                    </Typography>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {
                            // state.check();
                            // alert("This should be the check button." + state.num);
                        }}
                    >
                        Check
                    </Button>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {
                            // state.solve();
                            // alert("This should be the display button." + state.num);
                        }}
                    >
                        Display
                    </Button>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {
                            // state.newGame();
                            // alert("This should be the new game button." + state.num);
                        }}
                    >
                        New Game
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



