import React, { useState} from 'react';
import {Box, Button, CssBaseline} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import {Colors} from "../../../styles/colors";
import FeatureModal from "./FeatureModal";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../../shared/AlertDialog";
import {useDispatch} from "react-redux";
import {deleteFeature} from "../../../store/actions/accountActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'baseline',
        width: '100%'
    },
    featureButton: {
        border: `1px solid ${Colors.MID_GREY}`,
        width: '100%',
        height: '200px',
        padding: 0,
        bottom: 0,
        overflow: 'hidden',
        margin: theme.spacing(1),
        opacity: 0.85,
        transition: 'bottom 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease-in-out',
        '&:hover': {
            bottom: '2px',
            opacity: 1,
            boxShadow: `1px 1px 5px 1px ${Colors.MID_GREY}`,
            '& .delete-feature-icon': {
                display: 'block',
            },
        },
        '& .delete-feature-icon': {
            display: 'none',
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
            color: Colors.WHITE,
            '&:hover': {
                color: Colors.RED,

            }
        },
    },
    preview: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    imagePreview: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '& > img': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
        },
        '& .MuiSvgIcon-root': {
            height: '50px',
            width: '50px',
            color: Colors.GREY
        },
    },
    featureTitle: {
        width: '100%',
        position: 'absolute',
        bottom: '10px',
        background: 'rgba(255,255,255,0.8)',
        color: Colors.DARK_TEAL,
        padding: theme.spacing(0, 1),
    }
}));

const FeaturePreview = ({ account, categoryIndex, feature, featureIndex, isFeaturedContent }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alertDialogProps, setAlertDialogProps] = useState({});
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFeatureDelete = e => {
        e.stopPropagation();
        setAlertDialogProps({
            isOpen: true,
            title: `Delete feature "${feature.title}"`,
            content: 'This action is irreversible. Would you like to proceed?',
            actionLeftText: 'Cancel',
            actionLeft: () => setAlertDialogProps({ isOpen: false}),
            actionRightText: 'Delete',
            actionRight: () => {
                dispatch(deleteFeature(account, categoryIndex, featureIndex));
                console.log('delete feature');
                setAlertDialogProps({ isOpen: false})
            },
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Button color="primary" className={classes.featureButton} onClick={handleOpen}>
                <div className={classes.preview}>
                    <div className={classes.imagePreview}>
                        {
                            feature ?
                                feature?.images?.preview ?
                                    <img alt='feature-preview'
                                         src={feature.images.preview}/>
                                    : <MovieCreationTwoToneIcon/>
                            :<AddBoxRoundedIcon/>
                        }
                    </div>
                    {
                        feature && !isFeaturedContent &&
                        <DeleteIcon className="delete-feature-icon" onClick={handleFeatureDelete}/>
                    }
                    <Box component="div"
                         className={classes.featureTitle}
                         textoverflow="ellipsis"
                         whiteSpace="nowrap"
                         overflow="hidden">
                        {feature?.title || 'add feature'}
                    </Box>
                </div>
            </Button>
            <FeatureModal open={open}
                          handleClose={handleClose}
                          categoryIndex={categoryIndex}
                          feature={feature}
                          featureIndex={featureIndex}
                          account={account}
                          isFeaturedContent
            />
            <AlertDialog title={alertDialogProps.title}
                         content={alertDialogProps.content}
                         isOpen={alertDialogProps.isOpen}
                         actionLeftText={alertDialogProps.actionLeftText}
                         actionLeft={alertDialogProps.actionLeft}
                         actionRightText={alertDialogProps.actionRightText}
                         actionRight={alertDialogProps.actionRight}
                         handleClose={alertDialogProps.handleClose}
            />
        </div>
    );
};

export default FeaturePreview;