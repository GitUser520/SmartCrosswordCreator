import React from "react";
import {
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import {
    MenuIcon
} from "@mui/icons-material/Menu"

export const HomePage = () => {
    return (
        <CompleteAppBar />
    );
}

function CompleteAppBar() {
    return (
        <AppBar>
            <Toolbar>
                <IconButton
                    size={"medium"}
                    edge={"start"}
                >
                </IconButton>
                    <MenuIcon />
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={() => {
                       alert("This should be the login button.");
                    }}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}



