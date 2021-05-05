import * as yup from 'yup';
import {useMemo} from "react";

export const CreateFeatureSchema = (brand) =>
    useMemo(() => (
        yup.object().shape({
            id: yup
                .number()
                .required('ID is required')
                .test("UniqueID", "ID already exists", value => {
                    return !brand || !brand.categories.find(category =>
                        category.content.find(feature => feature.id === value))
                }),
            title: yup.string().required('Title is required'),
            // type: yup.mixed().oneOf(['VOD', 'Other']),
            description: yup.string(),
            url: yup.string().url().required('Feature url is required'),
            // duration: yup.number().positive().integer(),
            // subtitles: yup.string(),
            // isAvailable: yup.boolean()
            metadata: yup.object().shape({
                cast: yup.string(),
                director: yup.string(),
                producer: yup.string(),
            }),
            images: yup.object().shape({
                preview: yup.string().url(),
                main: yup.string().url(),
                watch_together: yup.string().url(),
                invitation: yup.string().url(),
            }),
            // tags: yup.array().of(yup.string()),
            // labels: yup.string(), //TODO?
        })
    ), [brand]);

