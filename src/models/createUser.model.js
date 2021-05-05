import * as yup from 'yup';
import {useMemo} from "react";

export const CreateUserSchema = () =>
    useMemo(() => (
        yup.object().shape({
            email: yup.string().required('Email is required').email(),
            username: yup.string().required('Username is required'),
            password: yup.string().required('Password is required'),
        })
    ), []);
