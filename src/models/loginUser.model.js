import * as yup from 'yup';
import {useMemo} from "react";

export const LoginUserSchema = () =>
    useMemo(() => (
        yup.object().shape({
            email: yup.string().required('Email is required').email(),
            password: yup.string().required('Password is required'),
        })
    ), []);
