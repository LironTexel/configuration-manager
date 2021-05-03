import React from 'react';
import {Button, CssBaseline, TextField, Typography, Grid, Paper} from '@material-ui/core';
import {Controller, useForm} from "react-hook-form";
import {createBrand} from "../../store/actions/brandActions";
import { useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    title: {
        padding: theme.spacing(0, 1, 2)
    },
    formBody: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        margin: theme.spacing(1),
    },
    createButton: {
        marginTop: theme.spacing(2)
    }
}));

const CreateBrand = (props) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const auth = useSelector((state) => state?.firebase?.auth);
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const classes = useStyles();

    const onSubmit = (data) => {
        const { name, id } = data;
        console.log({name});
        console.log({id});
        if (id && name) {
            dispatch(createBrand({ id, name }));
            props.history.push('/'); // TODO redirect only when success
        }
    };

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography variant={"h6"} className={classes.title}>Create a new brand</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>

                        <form action=""
                              noValidate
                              autoComplete="off"
                              onSubmit={handleSubmit(onSubmit)}>

                            <div className={classes.formBody}>
                                <Controller
                                    name='id'
                                    control={control}
                                    render={({ field: {onChange, value} }) =>
                                        <TextField
                                            error={errors['id']}
                                            className={classes.input}
                                            label="Brand ID"
                                            variant="outlined"
                                            helperText={errors.id?.message}
                                            value={value}
                                            onChange={onChange}
                                            required
                                            {...register('id', {
                                                validate: {
                                                    uniqueId: value => {
                                                        return !brands[value] || "Brand ID already exists"
                                                    },
                                                    idLength: value => {
                                                        return value?.length === 6 || "ID should be 6 characters long"
                                                    }
                                                }
                                            })}
                                        />
                                    }
                                />

                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field: {onChange, value} }) =>
                                        <TextField
                                            error={errors['name']}
                                            className={classes.input}
                                            label="Brand name"
                                            variant="outlined"
                                            helperText={errors.name && "Name is required"}
                                            onChange={onChange}
                                            value={value}
                                            required
                                            {...register('name', { required: true })}
                                        />
                                    }
                                />
                            </div>
                            <Button
                                color="primary"
                                className={classes.createButton}
                                type="submit">Create Brand</Button>
                        </form>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
};

export default CreateBrand;