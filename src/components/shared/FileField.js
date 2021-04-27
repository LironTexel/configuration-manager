import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import firebase from "firebase/app";

const FileField = (props) => {
    const { input, uploadDirectoryPath } = props;
    const [ fileToUpload, setFileToUpload ] = useState(null);
    const [ fileUrl, setFileUrl ] = useState('');


    const uploadFile = async () => {
        if (fileToUpload) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`${uploadDirectoryPath}/${fileToUpload.name}`);
            await fileRef.put(fileToUpload);
            const url = await fileRef.getDownloadURL()
            setFileUrl(url);
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
                       onChange={e => setFileToUpload(e.target.files[0])}
                       {...input} />
                       <br/><br/>
                       <TextField
                           value={fileUrl}
                           variant="outlined"
                           label="file url preview"
                           fullWidth
                           disabled/>
                           <div><img
                               alt='file-preview'
                               src={fileUrl}/></div>
            </div>
    )
}

export default FileField;