import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import firebase from "firebase/app";
import WallpaperTwoToneIcon from "@material-ui/icons/WallpaperTwoTone";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    imagePreview: {
        maxWidth: '200px',
        maxHeight: '200px',
    },
}));

const FileField = (props) => {
    const { input, uploadDirectoryPath, onChange } = props;
    const [ fileToUpload, setFileToUpload ] = useState(null);
    const [ fileUrl, setFileUrl ] = useState('');
    const classes = useStyles();

    useEffect(() => {
            setFileUrl(input);
    }, [input]);

    const uploadFile = async () => {
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
            <div className={"file-upload"}>
                <Button
                    variant="contained"
                    component="label"
                    onClick={uploadFile}
                >Upload File</Button>
                <input type="file"
                       onChange={e => setFileToUpload(e.target.files[0])}/>
                <br/><br/>

                <TextField
                    key={fileUrl}
                    value={fileUrl || ''}
                    variant="outlined"
                    label="File url preview"
                    fullWidth
                    disabled
                    onChange={(val) => {
                        console.log({val});
                        onChange(val)
                    }}/>

                <div>preview
                    { fileUrl ? <img className={classes.imagePreview}
                                     alt='brand-logo' src={fileUrl}/>
                        : <WallpaperTwoToneIcon/>
                    }
                </div>
            </div>
    )
}

export default FileField;