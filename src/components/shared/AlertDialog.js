import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
    },
}));

const AlertDialog = (props) => {
    const { isOpen, content, title, actionLeftText, actionLeft, actionRightText, actionRight, handleClose = ()=>{} } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={actionLeft} color="primary">
                        {actionLeftText}
                    </Button>
                    <Button onClick={actionRight} color="primary" autoFocus>
                        {actionRightText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertDialog;