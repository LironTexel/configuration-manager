import React from 'react';
import {Button, CssBaseline, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {Controller, useForm} from "react-hook-form";
import { loginUser } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginUserSchema} from "../../models/loginUser.model";
import {makeStyles} from "@material-ui/core/styles";
import {Colors} from "../../styles/colors";

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
    },
    error: {
        color: Colors.RED
    }
}));

const Login = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const authError = useSelector((state) => state?.auth?.authError);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(LoginUserSchema())
    });
    const classes = useStyles();

    const onSubmit = (data) => {
        const { email, password } = data;
        dispatch(loginUser({ email, password }));
    };

    if (auth.uid) return <Redirect to='/'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography variant={"h6"} className={classes.title}>Login</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form noValidate
                              autoComplete="off"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.formBody}>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={!!errors['email']}
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
                                            error={!!errors['password']}
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
                                type="submit">Login</Button>
                        </form>
                        {authError &&
                            <div className={classes.error}>
                                <p>{authError}</p>
                            </div>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;