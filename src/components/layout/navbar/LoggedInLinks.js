import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import {Menu, Button, MenuItem, ListItemIcon, Typography, withStyles} from '@material-ui/core';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Colors} from "../../../styles/colors";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';

const StyledMenu = withStyles({
    paper: {
        border: `2px solid ${Colors.MID_TEAL}`,
        background: Colors.DARK_GREY,
        color: Colors.WHITE
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const useStyles = makeStyles(() =>
    createStyles({
        menuButton: {
            background: Colors.TEAL,
            transition: 'opacity 0.2s',
            opacity: '0.8',
            '&:hover': {
                background: Colors.TEAL,
                opacity: '1',
            },
        },
        menuItem: {
            '& .MuiListItemIcon-root': {
                minWidth: '40px',
            },
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: Colors.WHITE,
            },
            '&:hover': {
                backgroundColor: Colors.MID_TEAL,
            },
        },
        createAccountItem: {
            textDecoration: 'underline transparent', //override navlink underline
            color: 'inherit',
        }
    }),
);

const LoggedInLinks = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

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
                    className={classes.menuButton}
                    onClick={handleClick}>
                Menu
            </Button>
            <StyledMenu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.menuItem} onClick={handleClose}>
                    <ListItemIcon>
                        <AddBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <NavLink className={classes.createAccountItem} to='/create'>
                        <Typography>Create account</Typography>
                    </NavLink>
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={logout}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Logout</Typography>
                </MenuItem>
            </StyledMenu>
        </div>
    )
}

export default LoggedInLinks;