import React from 'react';
import {Button, CssBaseline, TextField, Typography} from '@material-ui/core';
import { useForm } from "react-hook-form";
import { signUpUser } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const authError = useSelector((state) => state?.auth?.authError);
    const auth = useSelector((state) => state?.firebase?.auth);

    const onSubmit = (data) => {
        const { email, password, username } = data;
        console.log(password);
        console.log(username);
        console.log(email);
        dispatch(signUpUser({ email, password, username }));
    };

    if (auth.uid) return <Redirect to='/'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography>User sign up</Typography>
            <form action=""
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={errors['username']}
                    label="Username"
                    variant="outlined"
                    helperText={errors.username && "Username is mandatory"}
                    required
                    {...register("username", { required: true, maxLength: 20 })}/>
                <br/>
                <br/>
                <TextField
                    error={errors['email']}
                    label="Email"
                    variant="outlined"
                    helperText={errors?.email?.message}
                    required
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+.\S+/,
                            message: "Entered value does not match email format"
                        }
                    })}
                    type="email"/>
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
                    type="submit">Sign Up</Button>
                {authError &&
                    <div className="auth-error">
                        <p>{authError}</p>
                    </div>
                }
            </form>
        </div>
    );
};

export default SignUp;