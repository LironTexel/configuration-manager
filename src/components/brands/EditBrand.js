import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import moment from "moment";
import {Button, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {editBrand} from "../../store/actions/brandActions";
import firebase from "firebase";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    imagePreview: {
        maxWidth: '200px',
        maxHeight: '200px',
    },
}));

const EditBrand = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const [ fileUrl, setFileUrl ] = useState('');
    const [ fileToUpload, setFileToUpload ] = useState(null);
    const [ brand, setBrand ] = useState({});
    const classes = useStyles();

    useEffect(() => {
        if (id) {
            setBrand(brands?.[id]);
            setFileUrl(brand?.logoUrl);
            setValue( 'name', brands?.[id].name || '');
            setValue( 'content', brands?.[id].content || '');
            setValue( 'slogan', brands?.[id].slogan || '' );
            setValue( 'logoUrl', brands?.[id].logoUrl || '');
            setFileUrl(brands?.[id].logoUrl || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSubmit = (data) => {
        // const { name, logoUrl, content } = data;
        console.log({data});
        dispatch(editBrand({ id, ...brand, ...data }));
    };

    const uploadFile = async () => {
        console.log({fileToUpload})
        if (fileToUpload) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`brands/${id}/logos/${fileToUpload.name}`);
            await fileRef.put(fileToUpload);
            const url = await fileRef.getDownloadURL()
            setValue( 'logoUrl', url );
            setFileUrl(url);
        }
    }

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="container section brand-details">
            { !brand && <Typography>loading brand...</Typography> }
            { brand &&
                <div className="card">
                    <div className="card-content">
                        <Typography variant={"h6"}>Brand {brand.name}</Typography>
                        <Typography color={"textSecondary"}>Created at - { moment(brand.createdAt).calendar() }</Typography>
                        <Typography paragraph>
                            {brand.content}
                        </Typography>

                        <form action=""
                              noValidate
                              autoComplete="off"
                              onSubmit={handleSubmit(onSubmit)}>

                            <Controller
                                render={({ field: {onChange} }) =>
                                    <TextField
                                        error={errors['name']}
                                        label="Name"
                                        variant="outlined"
                                        key={brand.name}
                                        defaultValue={brand.name}
                                        helperText={errors.name && "Name is mandatory"}
                                        onChange={onChange}
                                        required
                                        fullWidth/>
                                }
                                name='name'
                                control={control}
                            />
                            {/*<FileField uploadDirectoryPath={`brands/${id}/logos`} input={'brand.logoUrl'}/>*/}

                            <Button
                                variant="contained"
                                component="label"
                                onClick={uploadFile}
                            >Upload File</Button>
                            <input type="file"
                                   onChange={e => setFileToUpload(e.target.files[0])}/>
                            <br/><br/>

                            <Controller
                                render={({ field: {onChange} }) =>
                                    <TextField
                                        key={fileUrl}
                                        defaultValue={fileUrl}
                                        variant="outlined"
                                        label="File url preview"
                                        fullWidth
                                        disabled
                                        onChange={onChange}/>
                                }
                                name='logoUrl'
                                control={control}
                            />
                            <div>preview
                                <img className={classes.imagePreview}
                                     alt='brand-logo'
                                     src={fileUrl || ''}/>
                            </div>

                            <Controller
                                render={({ field: {onChange} }) =>
                                    <TextField
                                        key={brand.content}
                                        defaultValue={brand.content || ''}
                                        variant="outlined"
                                        label="Content"
                                        error={errors.content}
                                        helperText={errors.content && "Invalid content"}
                                        fullWidth
                                        onChange={onChange}/>
                                }
                                name='logoUrl'
                                control={control}
                            />
                            <br/>

                            <Button
                                color="primary"
                                type="submit">Edit brand</Button>
                        </form>

                    </div>
                </div>
            }
        </div>
    )
}

export default EditBrand;