import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Crossword from "./Crossword.js";

class CompleteAppBar extends React.Component {

    checkSolution() {
        this.props.checkSolution();
    }

    displaySolution() {
        this.props.displaySolution();
    }

    newGame() {
        this.props.newGame();
    }

    resetWords() {
        this.props.resetWords();
    }

    render() {
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
                                this.checkSolution();
                            }}
                        >
                            Check
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {
                                this.displaySolution();
                            }}
                        >
                            Display
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {
                                this.newGame();
                            }}
                        >
                            New Game
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {
                                this.resetWords();
                            }}
                        >
                            Reset
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default CompleteAppBar;



