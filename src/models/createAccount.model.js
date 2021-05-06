import * as yup from 'yup';
import {useMemo} from "react";

export const CreateAccountSchema = (accounts) =>
    useMemo(() => (
        yup.object().shape({
            name: yup
                .string()
                .required('Name is required'),
            id: yup
                .string()
                .required('ID is required')
                .test("UniqueID", "ID already exists", value => !accounts[value])
                .length(6, 'ID must be 6 characters long'),
        })
    ), [accounts]);

