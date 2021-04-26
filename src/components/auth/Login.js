import React from 'react';
import {Button, CssBaseline, TextField, Typography} from '@material-ui/core';
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const authError = useSelector((state) => state?.auth?.authError);
    const auth = useSelector((state) => state?.firebase?.auth);

    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(password);
        console.log(email);
        dispatch(loginUser({ email, password }));
    };

    if (auth.uid) return <Redirect to='/'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography>Enter User details</Typography>
            <form action=""
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={errors['email']}
                    label="Email"
                    variant="outlined"
                    helperText={errors.email && "Email is mandatory"}
                    required
                    {...register("email", { required: true, maxLength: 20 })}/>
                <br/>
                <br/>
                <TextField
                    error={errors.password}
                    label="Password"
                    type="password"
                    variant="outlined"
                    helperText={errors.password && "Invalid password"}
                    required
                    {...register("password", { required: true, maxLength: 20 })}/>
                <br/>
                <br/>
                <Button
                    color="primary"
                    type="submit">Login</Button>
                {authError &&
                    <div className="auth-error">
                        <p>{authError}</p>
                    </div>
                }
            </form>
        </div>
    );
};

export default Login;