import React from 'react';
import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    makeStyles,
    Checkbox,
    FormControlLabel, Divider, FormControl,
} from '@material-ui/core';
import {FEATURE_TAGS, FEATURE_TYPES, INPUT_STYLE_VARIANT} from "../../../consts";
import FileField from "../../shared/FileField";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateFeatureSchema} from "../../../models/feature.model";
import TagsField from "../../shared/TagsField";
import {useDispatch} from "react-redux";
import SingleSelectField from "../../shared/SingleSelectField";
import {addFeature, addFeaturedContent, editFeature} from "../../../store/actions/accountActions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paper': {
            maxWidth: '750px',
        }
    },
    sectionTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: theme.spacing(3),
    },
    section: {
        border: '1px solid lightgray',
        padding: theme.spacing(3),
        borderRadius: '5px'
    },
    divider: {
        margin: theme.spacing(1),
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
        flexGrow: 0,
        placeItems: 'flex-start',
    },
    imagesSection: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '200px',
            height: '200px',
            margin: theme.spacing(0, 4, 8)
        }
    },
    image: {
    },
    input: {
        marginBottom: theme.spacing(1.5)
    },
    multipleInputs: {
        display: 'flex',
        justifyContent: 'space-around',
    }
}));

const FeatureModal = ({ open , handleClose, categoryIndex, feature, featureIndex, account, isFeaturedContent }) => {
    const classes = useStyles();
    const isNewFeature = !feature;
    const featureDetails = { ...feature };
    const { handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(CreateFeatureSchema(account))
    });
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // console.log({errors});
        // if (!Object.entries(errors).length) {
            let featureData = {...data};
            delete (featureData).originalId;
            console.log({featureData});

            if (isNewFeature) {
                dispatch(addFeature(account, categoryIndex, featureData));
            } else if (isFeaturedContent) {
                dispatch(addFeaturedContent(account, featureData));
            } else {
                dispatch(editFeature(account, categoryIndex, featureData, featureIndex));
            }
            handleClose();
        // }
    };

    const initForm = () => {
        setValue( 'id', feature?.id);
        setValue( 'originalId', feature?.id); // for verification
        setValue( 'title', feature?.title || '');
        setValue( 'description', feature?.description || '');
        setValue( 'url', feature?.url || '');
        setValue( 'duration', feature?.duration || '');
        setValue( 'subtitles', feature?.subtitles || '');
        setValue( 'isAvailable', feature?.isAvailable || false);
        setValue( 'labels', feature?.labels || '');
        setValue( 'metadata.cast', feature?.metadata?.cast || '');
        setValue( 'metadata.director', feature?.metadata?.director || '');
        setValue( 'metadata.producer', feature?.metadata?.producer || '');
        setValue( 'metadata.creator', feature?.metadata?.creator || '');
        setValue( 'images.preview', feature?.images?.preview || '');
        setValue( 'images.main', feature?.images?.main || '');
        setValue( 'images.watch_together', feature?.images?.watch_together || '');
        setValue( 'images.invitation', feature?.images?.invitation || '');
        setValue( 'tags', feature?.tags || []);
        setValue( 'type', feature?.type || '');
    }

    initForm();

    // useEffect(() => {
    //     initForm();
    //     console.log("initialised form", feature)
    // }, [feature, initForm])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.dialog}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Typography component={'span'}>{ isNewFeature ? 'Create a new feature' : `Edit ${feature?.title}` }</Typography>
                </DialogTitle>

                    <form
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit(onSubmit)}>

                        <DialogContent dividers className={classes.dialogContent}>
                            <div className={classes.formBody}>
                                <div className={classes.section}>
                                    <DialogContentText className={classes.sectionTitle}>
                                        <Typography>General Info</Typography>
                                    </DialogContentText>
                                    <Controller
                                        name='id'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['id']}
                                                className={classes.input}
                                                label="Feature ID"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.id}
                                                defaultValue={featureDetails?.id || ''}
                                                helperText={errors.id?.message}
                                                onChange={onChange}
                                                type="number"
                                                disabled={!isNewFeature}
                                                fullWidth
                                                required
                                            />
                                        }
                                    />
                                    <Controller
                                        name='title'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['title']}
                                                className={classes.input}
                                                label="Feature title"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.title}
                                                defaultValue={featureDetails?.title || ''}
                                                helperText={errors.title?.message}
                                                onChange={onChange}
                                                fullWidth
                                                required
                                            />
                                        }
                                    />

                                    <Controller
                                        name='description'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['description']}
                                                className={classes.input}
                                                label="Description"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.description}
                                                defaultValue={featureDetails?.description || ''}
                                                helperText={errors.description?.message}
                                                onChange={onChange}
                                                fullWidth
                                                required
                                            />
                                        }
                                    />

                                    <Controller
                                        name='url'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['url']}
                                                className={classes.input}
                                                label="Url"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.url}
                                                defaultValue={featureDetails?.url || ''}
                                                helperText={errors.url?.message}
                                                onChange={onChange}
                                                fullWidth
                                                required
                                            />
                                        }
                                    />

                                    <Controller
                                        name='subtitles'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['subtitles']}
                                                className={classes.input}
                                                label="Subtitles"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.subtitles}
                                                defaultValue={featureDetails?.subtitles || ''}
                                                helperText={errors.subtitles?.message}
                                                onChange={onChange}
                                                fullWidth
                                                required
                                            />
                                        }
                                    />

                                    <div className={clsx(classes.input, classes.multipleInputs)}>
                                        <Controller
                                            name='type'
                                            control={control}
                                            render={({ field: {onChange} }) =>
                                                <SingleSelectField
                                                    defaultValue={featureDetails?.type}
                                                    selectDictionary={FEATURE_TYPES}
                                                    error={errors['type']?.message}
                                                    label={"Feature type"}
                                                    onChange={onChange}
                                                    isRequired
                                                />
                                            }
                                        />
                                        <Controller
                                            name='duration'
                                            control={control}
                                            render={({ field: {onChange} }) =>
                                                <TextField
                                                    error={errors['duration']}
                                                    className={classes.input}
                                                    label="Duration"
                                                    variant={INPUT_STYLE_VARIANT}
                                                    // key={featureDetails.duration}
                                                    defaultValue={featureDetails?.duration || ''}
                                                    type="number"
                                                    helperText={errors.duration?.message}
                                                    onChange={onChange}
                                                    // fullWidth
                                                    required
                                                />
                                            }
                                        />
                                        <Controller
                                            name='isAvailable'
                                            control={control}
                                            render={({ field: {onChange} }) =>
                                                <FormControl component='fieldset'>
                                                    <FormControlLabel
                                                    name='isAvailable'
                                                    label='Is available'
                                                    control={<Checkbox
                                                               defaultChecked={featureDetails?.isAvailable}
                                                               onChange={(e) => onChange(e.target.checked)}/>}
                                                    />
                                                </FormControl>}
                                        />
                                    </div>
                                </div>

                                <Divider className={classes.divider} variant="middle" />
                                <div className={classes.section}>
                                    <DialogContentText className={classes.sectionTitle}>
                                        <Typography>Metadata</Typography>
                                    </DialogContentText>
                                    <Controller
                                        name='metadata.cast'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['metadata.cast']}
                                                className={classes.input}
                                                // key={featureDetails.metadata?.cast}
                                                defaultValue={featureDetails?.metadata?.cast || ''}
                                                label="Cast"
                                                variant={INPUT_STYLE_VARIANT}
                                                helperText={errors.metadata?.cast?.message}
                                                onChange={onChange}
                                                fullWidth
                                            />
                                        }
                                    />
                                    <Controller
                                        name='metadata.director'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['metadata.director']}
                                                className={classes.input}
                                                defaultValue={featureDetails?.metadata?.director || ''}
                                                label="Director"
                                                variant={INPUT_STYLE_VARIANT}
                                                helperText={errors.metadata?.director?.message}
                                                onChange={onChange}
                                                fullWidth
                                            />
                                        }
                                    />

                                    <Controller
                                        name='metadata.producer'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['metadata.producer']}
                                                className={classes.input}
                                                defaultValue={featureDetails?.metadata?.producer || ''}
                                                label="Producer"
                                                variant={INPUT_STYLE_VARIANT}
                                                helperText={errors.metadata?.producer?.message}
                                                onChange={onChange}
                                                fullWidth
                                            />
                                        }
                                    />

                                    <Controller
                                        name='metadata.creator'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['metadata.creator']}
                                                className={classes.input}
                                                defaultValue={featureDetails?.metadata?.creator || ''}
                                                label="Creator"
                                                variant={INPUT_STYLE_VARIANT}
                                                helperText={errors.metadata?.creator?.message}
                                                onChange={onChange}
                                                fullWidth
                                            />
                                        }
                                    />
                                </div>

                                <Divider className={classes.divider} variant="middle" />
                                <div className={classes.section}>
                                    <DialogContentText className={classes.sectionTitle}>
                                        <Typography>Images</Typography>
                                    </DialogContentText>
                                    <div className={classes.imagesSection}>
                                        <Controller
                                            name='images.preview'
                                            control={control}
                                            className={classes.image}
                                            render={({ field: {onChange} }) =>
                                                <FileField
                                                    defaultValue={featureDetails?.images?.preview}
                                                    error={errors['images.preview']}
                                                    // className={classes.image}
                                                    uploadDirectoryPath={`accounts/${account.id}/images`}
                                                    onChange={onChange}
                                                    fileName={'Preview'}/>
                                            }
                                        />
                                        <Controller
                                            name='images.main'
                                            control={control}
                                            className={classes.image}
                                            render={({ field: {onChange} }) =>
                                                <FileField
                                                    defaultValue={featureDetails?.images?.main}
                                                    error={errors['images.main']}
                                                    // className={classes.image}
                                                    uploadDirectoryPath={`accounts/${account.id}/images`}
                                                    onChange={onChange}
                                                    fileName={'Main'}/>
                                            }
                                        />
                                        <Controller
                                            name='images.watch_together'
                                            control={control}
                                            className={classes.image}
                                            render={({ field: {onChange} }) =>
                                                <FileField
                                                    defaultValue={featureDetails?.images?.main}
                                                    error={errors['images.watch_together']}
                                                    // className={classes.image}
                                                    uploadDirectoryPath={`accounts/${account.id}/images`}
                                                    onChange={onChange}
                                                    fileName={'Watch_together'}/>
                                            }
                                        />
                                        <Controller
                                            name='images.invitation'
                                            control={control}
                                            className={classes.image}
                                            render={({ field: {onChange} }) =>
                                                <FileField
                                                    defaultValue={featureDetails?.images?.invitation}
                                                    error={errors['images.invitation']?.message}
                                                    // className={classes.image}
                                                    uploadDirectoryPath={`accounts/${account.id}/images`}
                                                    onChange={onChange}
                                                    fileName={'invitation'}/>
                                            }
                                        />
                                    </div>
                                </div>

                                <Divider className={classes.divider} variant="middle" />
                                <div className={classes.section}>
                                    <DialogContentText className={classes.sectionTitle}>
                                        <Typography>Tags and labels</Typography>
                                    </DialogContentText>

                                    <div className={classes.input}>
                                        <Controller
                                            name='tags'
                                            control={control}
                                            render={({ field: {onChange} }) =>
                                                <TagsField
                                                    defaultValue={featureDetails?.tags || []}
                                                    tagsDictionary={FEATURE_TAGS}
                                                    error={errors['tags']?.message}
                                                    onChange={onChange}
                                                    styleVariant={'outlined'}
                                                />
                                            }
                                        />
                                    </div>

                                    <Controller
                                        name='labels'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <TextField
                                                error={errors['labels']?.message}
                                                className={classes.input}
                                                label="Labels"
                                                variant={INPUT_STYLE_VARIANT}
                                                // key={featureDetails.labels}
                                                defaultValue={featureDetails?.labels || ''}
                                                helperText={errors.labels?.message}
                                                onChange={onChange}
                                                fullWidth
                                                // required
                                            />
                                        }
                                    />
                                </div>
                            </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Save feature
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default FeatureModal;