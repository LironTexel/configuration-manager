import React from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import {useDispatch, useSelector} from "react-redux";
import { Colors } from '../../../styles/colors';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth } from "../../../consts";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appTitle: {
            color: Colors.WHITE,
            textDecoration: 'none',
            alignSelf: 'center'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            '& div': {
                display: 'flex',
            }
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            background: Colors.BLACK,
            borderBottom: `3px solid ${Colors.TEAL}`
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        greeting: {
            alignSelf: 'center',
            marginRight: theme.spacing(2),
        },
        menuButton: {
            marginRight: theme.spacing(2),
            opacity: 0.8,
            transition: 'transition 0.5s opacity 0.2s',
            '&:hover': {
                opacity: 1,
                background: Colors.DARK_GREY,
            },
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
    const isOpen = useSelector((state) => state.misc.isAccountsDrawerOpen);
    const isLoggedIn = auth?.uid;
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
                <Toolbar className={classes.toolbar}>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            className={clsx(classes.menuButton, isOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to='/' className={classes.appTitle}>
                            <Typography variant="h5" noWrap>
                                Configuration manager
                            </Typography>
                        </Link>
                    </div>
                    <div>
                        <Typography className={classes.greeting} variant="subtitle1" noWrap>
                            Hello {isLoggedIn ? profile.username : 'guest'}!
                        </Typography>
                        { auth.isLoaded && (isLoggedIn ?  <LoggedInLinks/> : <LoggedOutLinks/>)}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;