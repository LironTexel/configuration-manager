import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import firebase from "firebase/app";
import InsertPhotoTwoToneIcon from '@material-ui/icons/InsertPhotoTwoTone';
import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "../../styles/colors";

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
        padding: theme.spacing(1),
        '&::before': {
            content: '"Image preview"',
            display: 'block',
            marginTop: -20,
            background: 'white',
            width: 'fit-content',
            padding: '5px'
            // width: '150px'
        },
        '& > img' : {
            maxWidth: '100%',
            maxHeight: '100%',
        },
        '& .MuiSvgIcon-root': {
            height: '100%',
            width: '100%',
            color: Colors.GREY
        },
    },
    uploadButton: {
        margin: theme.spacing(2, 0, 0)
    }
}));

const FileField = (props) => {
    const { defaultValue, uploadDirectoryPath, onChange, isImage, fileName } = props;
    const [ fileUrl, setFileUrl ] = useState(defaultValue || '');
    const classes = useStyles();

    useEffect(() => {
            setFileUrl(defaultValue);
    }, [defaultValue]);

    const uploadFile = async (e) => {
        const fileToUpload = e.target.files[0];
        if (fileToUpload) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`${uploadDirectoryPath}/${fileToUpload.name}`);
            await fileRef.put(fileToUpload);
            const url = await fileRef.getDownloadURL();
            setFileUrl(url);
            onChange(url);
        }
    }

    return (
            <div className={classes.root}>
                { isImage &&
                    <div className={classes.imagePreview}>
                        { fileUrl ? <img alt='upload' src={fileUrl}/> : <InsertPhotoTwoToneIcon/> }
                    </div>
                }
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