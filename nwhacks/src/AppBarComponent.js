import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const AppBarComponent = () => {
    return (
        <CompleteAppBar />
    );
}

function CompleteAppBar() {
    return (
        <Box>
            <AppBar justifyContent={"center"}>
                <Toolbar>
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <IconButton size={"large"}
                                    edge={"start"}
                                    children={<MenuIcon />}>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}



