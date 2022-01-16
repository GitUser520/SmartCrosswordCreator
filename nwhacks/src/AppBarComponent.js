import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Crossword from "./Crossword.js";

// export const AppBarComponent = (props) => {
//     return (
//         <CompleteAppBar state={props.state} />
//     );
// }

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

    render() {
        return (
            <Box>
                <AppBar justifyContent={"center"}>
                    <Toolbar>
                        <Link style={{textDecoration: 'none'}} to="/">
                            <IconButton size={"large"}
                                        edge={"start"}
                                        children={<MenuIcon/>}>
                            </IconButton>
                        </Link>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => {
                                alert("This should be the login button.");
                            }}
                        >
                            Login
                        </Button>
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
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default CompleteAppBar;



