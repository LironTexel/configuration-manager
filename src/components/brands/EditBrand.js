import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import moment from "moment";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {editBrand} from "../../store/actions/brandActions";
import {makeStyles} from "@material-ui/core/styles";
import FileField from "../shared/FileField";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

const EditBrand = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const classes = useStyles();

    const [ brand, setBrand ] = useState({});

    useEffect(() => {
        if (id) {
            setBrand(brands?.[id]);
            setValue( 'name', brands?.[id].name || '');
            setValue( 'content', brands?.[id].content || '');
            setValue( 'slogan', brands?.[id].slogan || '' );
            setValue( 'logoUrl', brands?.[id].logoUrl || '');
        }
    }, [brands, id, setValue]);

    const onSubmit = (data) => {
        console.log({data});
        dispatch(editBrand({ id, ...brand, ...data }));
    };


    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="container section brand-details">
            { !brand && <Typography>loading brand...</Typography> }
            { brand &&
                <div className={clsx(classes.root, "grid-container")}>
                    <Typography variant={"h6"}>Brand {brand.name}</Typography>
                    <Typography color={"textSecondary"}>Created at - { moment(brand.createdAt).calendar() }</Typography>
                    <form action=""
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit(onSubmit)}>

                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Paper className={classes.paper}>
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
                                                fullWidth
                                            />
                                        }
                                        name='name'
                                        control={control}
                                    />
                                    <Typography>Manage categories</Typography>

                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <Controller
                                        render={({ field: {onChange} }) =>
                                            <FileField uploadDirectoryPath={`brands/${id}/logos`}
                                                       isImage
                                                       fileName="logo"
                                                       onChange={onChange}
                                                       input={brands?.[id].logoUrl}/>
                                        }
                                        name='logoUrl'
                                        control={control}
                                    />
                                    <br/>
                                </Paper>
                            </Grid>
                        </Grid>
                            <Button
                                color="primary"
                                type="submit">Edit brand</Button>
                        </form>
                </div>
            }
        </div>
    )
}

export default EditBrand;