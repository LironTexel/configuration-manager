import React from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import {useDispatch, useSelector} from "react-redux";
// import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth } from "../../../consts";

// const useStyles = makeStyles((theme: Theme) =>
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'flex-between'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
    }),
);

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state?.firebase?.auth);
    const isOpen = useSelector((state) => state.misc.isBrandsDrawerOpen);
    const uid = auth?.uid;
    const profile = useSelector((state) => state?.firebase?.profile);

    const toggleDrawer = () => {
        dispatch({ type: 'TOGGLE_DRAWER' });
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, isOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to='/' className="brand-logo">
                        <Typography variant="h5" noWrap>
                            Configuration manager
                        </Typography>
                    </Link>
                    <Typography variant="subtitle1" noWrap>
                        hello {uid ? profile.username : 'guest'}!
                    </Typography>
                    { auth.isLoaded &&
                        (uid ?  <LoggedInLinks/> : <LoggedOutLinks/>)
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;