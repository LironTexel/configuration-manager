import * as yup from 'yup';
import {useMemo} from "react";
import {FEATURE_TYPES} from '../consts'

export const CreateFeatureSchema = (account) =>
    useMemo(() => (
        yup.object().shape({
            id: yup
                .number()
                .required('ID is required')
                .test("UniqueID", "ID already exists", (value, context) => {
                    const isDirty = context.parent.originalId !== value;
                    return !isDirty ||
                        (!account || !account.categories.find(category =>
                            category.content.find(feature => feature.id === value))
                        )
                }),
            title: yup.string().required('Title is required'),
            type: yup.string().required('Feature type is required').oneOf(Object.values(FEATURE_TYPES), 'Feature type is required'),
            description: yup.string().required('Description is required'),
            url: yup.string().url().required('Feature url is required'),
            duration: yup.number().required().positive().integer().typeError('Duration is required'),
            subtitles: yup.string().required('Subtitles field is required').default(''),
            isAvailable: yup.boolean().required().default(false),
            tags: yup.array().of(yup.string()).default([]),
            // labels: yup.string().required('Labels field is required').default(''),
            labels: yup.string().default(''),
            metadata: yup.object().shape({
                cast: yup.string().default(''),
                director: yup.string().default(''),
                producer: yup.string().default(''),
                creator: yup.string().default(''),
            }),
            images: yup.object().shape({
                preview: yup.string().url().default(''),
                main: yup.string().url().default(''),
                watch_together: yup.string().url().default(''),
                invitation: yup.string().url().default(''),
            }),
        })
    ), [account]);

