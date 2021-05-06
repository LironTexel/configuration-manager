import React from "react";
import { useSelector } from "react-redux";
// import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Navbar from "./navbar/Navbar";
import AccountsList from "./AccountsDrawer";
import clsx from "clsx";
// import {Typography} from "@material-ui/core";
import { drawerWidth } from "../../consts";

// const useStyles = makeStyles((theme: Theme) =>
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);


const Layout = (props) => {
    const classes = useStyles();
    const auth = useSelector((state) => state?.firebase?.auth);
    const isOpen = useSelector((state) => state.misc.isAccountsDrawerOpen);
    const uid = auth?.uid;
    console.log({uid})

    return (
        <div className={classes.root}>
            <Navbar/>
            <AccountsList/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: isOpen,
                })}
            >
                <div className={classes.drawerHeader} />
                { props.children }
            </main>
        </div>
    )
}

export default Layout;