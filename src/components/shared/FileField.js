import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import firebase from "firebase/app";
import InsertPhotoTwoToneIcon from '@material-ui/icons/InsertPhotoTwoTone';
import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "../../styles/colors";
import LoadingIcon from '../../img/loader.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagePreview: {
        maxWidth: '300px',
        maxHeight: `calc(100% - ${theme.spacing(2)}px)`,
        height: '100%',
        width: '100%',
        border: `1px solid ${Colors.MID_GREY}`,
        borderRadius: '10px',
        padding: theme.spacing(1, 1, 2),

        '&::before': {
            content: '"Image preview"',
            display: 'block',
            marginTop: -25,
            background: 'white',
            width: 'fit-content',
            padding: '5px'
        },
        '& > img' : {
            maxWidth: '100%',
            maxHeight: '100%',
            margin: '0 auto',
            display: 'block'
        },
        '& .MuiSvgIcon-root': {
            height: '100%',
            width: '100%',
            color: Colors.GREY,
        },
    },
    uploadButton: {
        margin: theme.spacing(2, 0, 0)
    },
    loader: {
        width: '50px',
        height: '50px',
        margin: '0 auto'
    },
    loaderContainer: {
        height: '150px',
        width: '100%',
        alignItems: 'center',
        display: 'flex'
    }
}));

const FileField = (props) => {
    const { defaultValue, uploadDirectoryPath, onChange, fileName } = props;
    const [ fileUrl, setFileUrl ] = useState(defaultValue || '');
    const [ isLoading, setIsLoading ] = useState(false);
    const classes = useStyles();

    useEffect(() => {
            setFileUrl(defaultValue);
    }, [defaultValue]);

    const uploadFile = async (e) => {
        const fileToUpload = e.target.files[0];
        if (fileToUpload) {
            setIsLoading(true);
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`${uploadDirectoryPath}/${fileName}`);
            await fileRef.put(fileToUpload);
            const url = await fileRef.getDownloadURL();
            setIsLoading(false);
            setFileUrl(url);
            onChange(url);
        }
    }

    return (
            <div className={classes.root}>
                <div className={classes.imagePreview}>
                {
                    isLoading ?
                        <div className={classes.loaderContainer}>
                            <img alt='loader' className={classes.loader} src={LoadingIcon}/>
                        </div>
                    :
                    fileUrl ? <img alt='upload' src={fileUrl}/> : <InsertPhotoTwoToneIcon/>
                }
                </div>
                <Button
                    variant="contained"
                    component="label"
                    className={classes.uploadButton}
                >
                    Upload { fileName || 'file'}
                    <input
                        type="file"
                        onChange={uploadFile}
                        hidden
                    />
                </Button>
            </div>
    )
}

export default FileField;