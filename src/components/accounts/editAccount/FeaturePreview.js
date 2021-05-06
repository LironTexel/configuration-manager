import React, { useState} from 'react';
import {Box, Button, CssBaseline,
    // Typography
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import {Colors} from "../../../styles/colors";
import FeatureModal from "./FeatureModal";

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
        }
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

const FeaturePreview = ({ feature, account }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Box component="div"
                         className={classes.featureTitle}
                         textOverflow="ellipsis"
                         whiteSpace="nowrap"
                         overflow="hidden">
                        {feature?.title || 'add feature'}
                    </Box>
                    {/*<Typography variant="button" >{feature?.title || 'add feature'}</Typography>*/}
                </div>
            </Button>
            <FeatureModal open={open} handleClose={handleClose} feature={feature} account={account}/>
        </div>
    );
};

export default FeaturePreview;