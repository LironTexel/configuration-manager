import React from "react";
import { Link } from "react-router-dom";
// import BrandSummary from "../brands/BrandSummary";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Drawer,
    List, ListItem, ListItemIcon, ListItemText,
    Divider, IconButton } from '@material-ui/core';
import { drawerWidth } from "../../consts";
import {useDispatch, useSelector} from "react-redux";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import clsx from "clsx";
import {firestoreConnect} from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
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
    brandItem: {
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
            color: 'blue',
        }
    },
    isActive: {
        background: 'red',
    }
}));

const BrandsDrawer = () => {
    // const { id } = useParams(); //TODO add active class to selected item
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.misc.isBrandsDrawerOpen);
    const brands = useSelector((state) => state?.firestore?.ordered?.brands);

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
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    { brands && brands.map(brand => (
                        <Link to={'/brands/' + brand.id} key={ brand.id }>
                            <ListItem button className={clsx(classes.brandItem, {
                                // [classes.isActive]: brand.id !== id,
                            })}>
                                {/*<BrandSummary brand={ brand }/>*/}
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={brand.name} secondary={brand.id}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default firestoreConnect([
    { collection: 'brands', orderBy: ['name', 'asc'] }
])(BrandsDrawer);