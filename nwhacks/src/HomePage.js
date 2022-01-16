import React from "react";
import {
    Box,
    AppBar, Button, Toolbar,
    IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const HomePage = () => {
    return (
        <CompleteAppBar />
    );
}

function CompleteAppBar() {
    return (
        <Box padding={2}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size={"large"}
                        edge={"start"}
                        onClick={() => {
                            alert("This should be the menu button.");
                        }}
                        children={<MenuIcon />}
                    >
                    </IconButton>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {
                            alert("This should be the login button.");
                        }}
                    >
                        Login
                    </Button>
                    <Typography variant={"h5"}>
                        Placeholder for Crossword Name
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



