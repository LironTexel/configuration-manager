import React from 'react';
import {Button, CssBaseline, TextField, Typography} from '@material-ui/core';
import { useForm } from "react-hook-form";
import  { createBrand } from "../../store/actions/brandActions";
import {connect, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const CreateBrand = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const auth = useSelector((state) => state?.firebase?.auth);


    const onSubmit = (data) => {
        const { name, content } = data;
        console.log(name);
        console.log(content);
        props.createBrand({ name, content });
        props.history.push('/'); // TODO redirect only when success
    };

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div>
            <CssBaseline />
            <Typography>Enter Brand details</Typography>
            <form action=""
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={errors['name']}
                    label="Brand name"
                    variant="outlined"
                    helperText={errors.name && "Title is mandatory"}
                    required
                    {...register("name", { required: true, maxLength: 20 })}/>
                <br/>
                <br/>
                <TextField
                    error={errors.content}
                    label="Content"
                    type="content"
                    variant="outlined"
                    helperText={errors.content && "Invalid content"}
                    required
                    {...register("content", { required: true, maxLength: 200 })}/>
                <br/>
                <br/>
                <Button
                    color="primary"
                    type="submit">Create Brand</Button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBrand: (brand) => dispatch(createBrand(brand))
    }
}

export default connect(null, mapDispatchToProps)(CreateBrand);