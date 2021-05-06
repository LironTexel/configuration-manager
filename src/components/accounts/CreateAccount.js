import React from 'react';
import {Button, CssBaseline, TextField, Typography, Grid, Paper} from '@material-ui/core';
import {Controller, useForm} from "react-hook-form";
import {createAccount} from "../../store/actions/accountActions";
import { useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateAccountSchema } from '../../models/createAccount.model'

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

const CreateAccount = (props) => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state?.firestore?.data?.accounts);

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(CreateAccountSchema(accounts))
    });

    const auth = useSelector((state) => state?.firebase?.auth);
    const classes = useStyles();

    const onSubmit = (data) => {
        const { name, id } = data;
        dispatch(createAccount({ id, name }));
        props.history.push('/'); // TODO redirect only when success
    };

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography variant={"h6"} className={classes.title}>Create a new account</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>

                        <form noValidate
                              autoComplete="off"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.formBody}>
                                <Controller
                                    name='id'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['id']}
                                            className={classes.input}
                                            label="Account ID"
                                            variant="outlined"
                                            helperText={errors.id?.message}
                                            onChange={onChange}
                                            required

                                        />
                                    }
                                />

                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['name']}
                                            className={classes.input}
                                            label="Account name"
                                            variant="outlined"
                                            helperText={errors.name?.message}
                                            onChange={onChange}
                                            required
                                        />
                                    }
                                />
                            </div>
                            <Button
                                color="primary"
                                className={classes.createButton}
                                type="submit">Create Account</Button>
                        </form>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
};

export default CreateAccount;