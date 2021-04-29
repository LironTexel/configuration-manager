import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import moment from "moment";
import {Button, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {editBrand} from "../../store/actions/brandActions";
import {makeStyles} from "@material-ui/core/styles";
import FileField from "../shared/FileField";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
}));

const EditBrand = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const [ brand, setBrand ] = useState({});

    useEffect(() => {
        if (id) {
            setBrand(brands?.[id]);
            setValue( 'name', brands?.[id].name || '');
            setValue( 'content', brands?.[id].content || '');
            setValue( 'slogan', brands?.[id].slogan || '' );
            setValue( 'logoUrl', brands?.[id].logoUrl || '');
        }
    }, [id]);

    const onSubmit = (data) => {
        console.log({data});
        dispatch(editBrand({ id, ...brand, ...data }));
    };


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
                            <br/><br/>

                            <Controller
                                render={({ field: {onChange} }) =>
                                    <FileField uploadDirectoryPath={`brands/${id}/logos`}
                                               onChange={onChange}
                                               input={brands?.[id].logoUrl}/>
                                }
                                name='logoUrl'
                                control={control}
                            />

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