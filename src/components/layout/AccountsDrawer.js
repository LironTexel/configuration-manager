import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline, Drawer,
    List, ListItem, ListItemText,
    Divider, IconButton, Box, ListItemIcon
} from '@material-ui/core';
import { drawerWidth } from "../../consts";
import {useDispatch, useSelector} from "react-redux";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import { Colors } from "../../styles/colors";
import StoreMallDirectoryTwoToneIcon from '@material-ui/icons/StoreMallDirectoryTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        background: Colors.DARK_GREY,
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    accountLink: {
        textDecoration: 'underline transparent', //override link underline
        color: 'inherit'
    },
    accountItem: {
        color: Colors.WHITE,
        whiteSpace: 'nowrap',
        '&:hover': {
            // background: Colors.BLACK,
            backgroundImage: `linear-gradient(to right, ${Colors.DARK_TEAL}, transparent)`

        },
    },
    accountItemLogo: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
    },
    accountDefaultLogo: {
        color: Colors.MID_TEAL,
        marginLeft: theme.spacing(1),
    },
    accountItemTextSecondary: {
        color: Colors.GREY,
    },
    toolbarDivider: {
        background: Colors.TEAL,
        height: '2px',
    },
    accountDivider: {
        background: Colors.MID_TEAL,
    },
    isActive: {
        background: 'red',
    },
    chevron: {
        opacity: 0.8,
        transition: 'transition 0.5s opacity 0.2s',
        '& .MuiSvgIcon-root': {
            color: Colors.LIGHT_TEAL,
        },
        '&:hover': {
            opacity: 1,
            background: Colors.BLACK,
        },
    }
}));

const AccountsDrawer = () => {
    // const { id } = useParams(); //TODO add active class to selected item
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.misc.isAccountsDrawerOpen);
    const accounts = useSelector((state) => state?.firestore?.ordered?.accounts);
    // const firestore = useSelector((state) => state?.firestore);
    // console.log({firestore})

    const toggleDrawer = () => {
        dispatch({ type: 'TOGGLE_DRAWER' });
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer} className={classes.chevron}>
                        <ChevronLeftIcon fontSize="large"/>
                    </IconButton>
                </div>
                <Divider className={classes.toolbarDivider}/>
                <List>
                    { accounts && accounts.map(account => (
                        <Link className={classes.accountLink}
                              to={'/accounts/' + account.id} key={ account.id }>
                            <ListItem button
                                      onClick={toggleDrawer}
                                      className={clsx(classes.accountItem, {
                                // [classes.isActive]: (account.id === id),
                            })}>
                                <ListItemIcon>
                                    {
                                        account.logoUrl ? <img className={classes.accountItemLogo} src={account.logoUrl} alt={"account-logo"}/>
                                        : <StoreMallDirectoryTwoToneIcon className={classes.accountDefaultLogo}/>
                                    }
                                </ListItemIcon>
                                <ListItemText textoverflow="ellipsis"
                                              primary={<Box textOverflow="ellipsis" overflow="hidden">{account.name}</Box>}
                                              secondary={
                                                  <Box className={classes.accountItemTextSecondary}
                                                       textOverflow="ellipsis"
                                                       overflow="hidden">
                                                  ID: {account.id}
                                                </Box>}
                                />
                            </ListItem>
                            <Divider className={classes.accountDivider}
                                     variant="inset"
                            />
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default AccountsDrawer;