import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import { Menu, Button, MenuItem } from '@material-ui/core';

const LoggedInLinks = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="logged-in-links">
            <Button aria-controls="menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}>
                Menu
            </Button>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><NavLink to='/create'>Create brand</NavLink></MenuItem>
                {/*TODO<MenuItem onClick={handleClose}><NavLink to='/profile'>Create brand</NavLink></MenuItem>*/}
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default LoggedInLinks;