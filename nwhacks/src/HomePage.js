import React from "react";
import {
    AppBar, Button, Toolbar, IconButton, MenuIcon, Typography
} from "@mui/material";

export const HomePage = () => {
    return (
        <CompleteAppBar />
    );
}

function CompleteAppBar() {
    return (
        <AppBar>
            <Toolbar>


                <Button variant={"text"}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}



