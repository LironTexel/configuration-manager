import * as yup from 'yup';
import {useMemo} from "react";

export const CreateBrandSchema = (brands) =>
    useMemo(() => (
        yup.object().shape({
            name: yup
                .string()
                .required('Name is required'),
            id: yup
                .string()
                .required('ID is required')
                .test("UniqueID", "ID already exists", value => !brands[value])
                .length(6, 'ID must be 6 characters long'),
        })
    ), [brands]);

