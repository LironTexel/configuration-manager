import React from 'react';
import {Button, CssBaseline, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {Controller, useForm} from "react-hook-form";
import { signUpUser } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateUserSchema} from "../../models/createUser.model";

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

const SignUp = () => {
    const dispatch = useDispatch();
    const authError = useSelector((state) => state?.auth?.authError);
    const auth = useSelector((state) => state?.firebase?.auth);
    const classes = useStyles();
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(CreateUserSchema())
    });

    const onSubmit = (data) => {
        const { email, password, username } = data;
        console.log({data});
        dispatch(signUpUser({ email, password, username }));
    };

    if (auth.uid) return <Redirect to='/'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography variant={"h6"} className={classes.title}>User sign up</Typography>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form noValidate
                              autoComplete="off"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.formBody}>
                                <Controller
                                    name='username'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['username']}
                                            className={classes.input}
                                            label="Username"
                                            variant="outlined"
                                            helperText={errors.username?.message}
                                            onChange={onChange}
                                            required

                                        />
                                    }
                                />

                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['email']}
                                            className={classes.input}
                                            label="Email"
                                            variant="outlined"
                                            helperText={errors.email?.message}
                                            onChange={onChange}
                                            required

                                        />
                                    }
                                />

                                <Controller
                                    name='password'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['password']}
                                            className={classes.input}
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            helperText={errors.password?.message}
                                            onChange={onChange}
                                            required
                                        />
                                    }
                                />
                            </div>
                            <Button
                                color="primary"
                                className={classes.createButton}
                                type="submit">Sign Up</Button>
                        </form>
                        {authError &&
                            <div className="auth-error">
                                <p>{authError}</p>
                            </div>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUp;