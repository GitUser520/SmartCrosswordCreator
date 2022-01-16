import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function Menu() {
    return (
        <div>
            <Link style={{ textDecoration: 'none' }} to="/app">
                <Button variant="contained">Start Learning!</Button>
            </Link>
        </div>
    );
}

export default Menu;