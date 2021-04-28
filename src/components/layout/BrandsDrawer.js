import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline, Drawer,
    List, ListItem, ListItemText,
    Divider, IconButton, Typography, Box
} from '@material-ui/core';
import { drawerWidth } from "../../consts";
import {useDispatch, useSelector} from "react-redux";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import { Colors } from "../../styles/colors";

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
    brandLink: {
        textDecoration: 'underline transparent', //override link underline
        color: 'inherit'
    },
    brandItem: {
        color: Colors.WHITE,
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundImage: `linear-gradient(to right, ${Colors.DARK_TEAL}, transparent)`,
        },
    },
    brandItemTextSecondary: {
        color: Colors.GREY,
    },
    toolbarDivider: {
        background: Colors.TEAL,
        height: '2px',
    },
    brandDivider: {
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

const BrandsDrawer = () => {
    // const { id } = useParams(); //TODO add active class to selected item
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.misc.isBrandsDrawerOpen);
    const brands = useSelector((state) => state?.firestore?.ordered?.brands);
    const firestore = useSelector((state) => state?.firestore);
    console.log({firestore})

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
                        <ChevronLeftIcon fontSize="medium"/>
                    </IconButton>
                </div>
                <Divider className={classes.toolbarDivider}/>
                <List>
                    { brands && brands.map(brand => (
                        <Link className={classes.brandLink}
                              to={'/brands/' + brand.id} key={ brand.id }>
                            <ListItem button
                                      onClick={toggleDrawer}
                                      className={clsx(classes.brandItem, {
                                // [classes.isActive]: (brand.id === id),
                            })}>
                                {/*<ListItemIcon><StoreIcon /></ListItemIcon>*/}
                                <ListItemText textOverflow="ellipsis"
                                              primary={<Typography>{brand.name}</Typography>}
                                              secondary={
                                                  <Box component="div"
                                                       className={classes.brandItemTextSecondary}
                                                       textOverflow="ellipsis"
                                                       overflow="hidden">
                                                  ID: {brand.id}
                                              </Box>}
                                />
                            </ListItem>
                            <Divider className={classes.brandDivider}
                                     // variant="inset"
                            />
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default BrandsDrawer;