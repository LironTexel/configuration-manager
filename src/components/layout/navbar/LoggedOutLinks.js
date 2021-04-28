import React from "react";
import { Button } from '@material-ui/core';
import {Colors} from "../../../styles/colors";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    loginButton: {
        marginRight: theme.spacing(2),
        background: Colors.TEAL,
        transition: 'opacity 0.2s',
        opacity: '0.8',
        '&:hover': {
            background: Colors.TEAL,
            opacity: '1',
        }
    },
    signupButton: {
        border: `1px solid ${Colors.LIGHT_TEAL}`,
        transition: 'opacity 0.2s',
        opacity: '0.8',
        color: Colors.LIGHT_TEAL,
        '&:hover': {
            borderColor: Colors.LIGHT_TEAL,
            color: Colors.LIGHT_TEAL,
            opacity: '1',
        }
    },
}));

const LoggedOutLinks = () => {
    const classes = useStyles();

    return (
        <div className="logged-in-links">
            <Button
                className={classes.loginButton}
                variant="contained"
                href="/login">Login
            </Button>
            <Button
                className={classes.signupButton}
                variant="outlined"
                href="/signup">
                Sign Up
            </Button>
        </div>
    )
}

export default React.memo(LoggedOutLinks);