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
    FormControlLabel,
} from '@material-ui/core';
// import {FEATURE_TYPES} from "../../../consts";
import {FEATURE_TAGS} from "../../../consts";
import FileField from "../../shared/FileField";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateFeatureSchema} from "../../../models/feature.model";
import TagsField from "../../shared/TagsField";

const useStyles = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            maxWidth: '750px',
        }
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '650px',
        flexGrow: 0,
        placeItems: 'flex-start',
    },
    imagesSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        flexGrow: 1,
        flexBasis: 1,
        width: '20%',
    },
    featureType: {
        minWidth: '40%'
    },
}));

const FeatureModal = ({ open , handleClose, feature, account }) => {
    const classes = useStyles();
    const isNewFeature = !feature;
    const featureDetails = { ...feature };
    const { handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(CreateFeatureSchema(account))
    });

    const onSubmit = (data) => {
        console.log({data});
        // dispatch(({  }));
    };

    setValue( 'originalId', feature?.id); // for verification
    setValue( 'id', feature?.id);
    setValue( 'title', feature?.title || '');
    setValue( 'description', feature?.description || '');
    setValue( 'url', feature?.url || '');
    setValue( 'duration', feature?.duration || '');
    setValue( 'subtitles', feature?.subtitles || '');
    setValue( 'isAvailable', feature?.isAvailable || '');
    setValue( 'labels', feature?.labels || '');
    setValue( 'metadata.cast', feature?.metadata?.cast || '');
    setValue( 'metadata.director', feature?.metadata?.director || '');
    setValue( 'metadata.producer', feature?.metadata?.producer || '');
    setValue( 'images.preview', feature?.images?.preview || '');
    setValue( 'images.main', feature?.images?.main || '');
    setValue( 'images.watch_together', feature?.images?.watch_together || '');
    setValue( 'images.invitation', feature?.images?.invitation || '');
    setValue( 'tags', feature?.tags || '');

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

                    <form action=""
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit(onSubmit)}>

                        <DialogContent dividers className={classes.dialogContent}>
                            <DialogContentText>General info</DialogContentText>
                            <div className={classes.formBody}>
                                <Controller
                                    name='id'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['id']}
                                            className={classes.input}
                                            label="Feature ID"
                                            key={featureDetails.id}
                                            defaultValue={featureDetails?.id || ''}
                                            helperText={errors.id?.message}
                                            onChange={onChange}
                                            type="number"
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
                                            key={featureDetails.title}
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
                                            key={featureDetails.description}
                                            defaultValue={featureDetails?.description || ''}
                                            helperText={errors.description?.message}
                                            onChange={onChange}
                                            fullWidth
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
                                            key={featureDetails.url}
                                            defaultValue={featureDetails?.url || ''}
                                            helperText={errors.url?.message}
                                            onChange={onChange}
                                            fullWidth
                                            required
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
                                            key={featureDetails.duration}
                                            defaultValue={featureDetails?.duration || ''}
                                            type="number"
                                            helperText={errors.duration?.message}
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
                                            key={featureDetails.subtitles}
                                            defaultValue={featureDetails?.subtitles || ''}
                                            helperText={errors.subtitles?.message}
                                            onChange={onChange}
                                            fullWidth
                                            required
                                        />
                                    }
                                />

                                <Controller
                                    name='labels'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['labels']}
                                            className={classes.input}
                                            label="Labels"
                                            key={featureDetails.labels}
                                            defaultValue={featureDetails?.labels || ''}
                                            helperText={errors.labels?.message}
                                            onChange={onChange}
                                            fullWidth
                                            required
                                        />
                                    }
                                />

                                <Controller
                                    name='isAvailable'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <FormControlLabel
                                            value={featureDetails?.isAvailable}
                                            className={classes.input}
                                            key={featureDetails.isAvailable}
                                            control={<Checkbox color="primary" />}
                                            label="Is available"
                                            labelPlacement="start"
                                            onChange={onChange}
                                            required
                                        />
                                        // <TextField
                                        //     error={errors['isAvailable']}
                                        //     className={classes.input}
                                        //     label="Is available"
                                        //     defaultValue={featureDetails?.isAvailable || ''}
                                        //     helperText={errors.isAvailable?.message}
                                        //     onChange={onChange}
                                        //     fullWidth
                                        //     required
                                        // />
                                    }
                                />

                                {/*<FormControl className={classes.featureType}*/}
                                {/*             required>*/}
                                {/*    <InputLabel id="demo-simple-select-label">Feature type</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="demo-simple-select-label"*/}
                                {/*        id="demo-simple-select-outlined"*/}
                                {/*        value={featureDetails?.type || ''}*/}
                                {/*        // onChange={(e) => handleChange('type', e.target.value)}*/}
                                {/*        label="Feature type"*/}
                                {/*    >*/}
                                {/*        <MenuItem value="">*/}
                                {/*            <em>None</em>*/}
                                {/*        </MenuItem>*/}
                                {/*        <MenuItem value={FEATURE_TYPES.VOD}>{FEATURE_TYPES.VOD}</MenuItem>*/}
                                {/*        <MenuItem value={FEATURE_TYPES.OTHER}>{FEATURE_TYPES.OTHER}</MenuItem>*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}

                                <DialogContentText>Metadata</DialogContentText>
                                <Controller
                                    name='metadata.cast'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TextField
                                            error={errors['metadata.cast']}
                                            className={classes.input}
                                            key={featureDetails.metadata?.cast}
                                            defaultValue={featureDetails?.metadata?.cast || ''}
                                            label="Cast"
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
                                            helperText={errors.metadata?.producer?.message}
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    }
                                />

                                <DialogContentText>Images</DialogContentText>
                                <div className={classes.imagesSection}>
                                    <Controller
                                        name='images.preview'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <FileField
                                                defaultValue={featureDetails?.images?.preview}
                                                error={errors['images.preview']}
                                                className={classes.image}
                                                uploadDirectoryPath={`accounts/${account.id}/images`}
                                                onChange={onChange}
                                                isImage
                                                fileName={'Preview'}/>
                                        }
                                    />
                                    <Controller
                                        name='images.main'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <FileField
                                                defaultValue={featureDetails?.images?.main}
                                                error={errors['images.main']}
                                                className={classes.image}
                                                uploadDirectoryPath={`accounts/${account.id}/images`}
                                                onChange={onChange}
                                                isImage
                                                fileName={'Main'}/>
                                        }
                                    />
                                    <Controller
                                        name='images.watch_together'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <FileField
                                                defaultValue={featureDetails?.images?.main}
                                                error={errors['images.watch_together']}
                                                className={classes.image}
                                                uploadDirectoryPath={`accounts/${account.id}/images`}
                                                onChange={onChange}
                                                isImage
                                                fileName={'Watch together'}/>
                                        }
                                    />
                                    <Controller
                                        name='images.invitation'
                                        control={control}
                                        render={({ field: {onChange} }) =>
                                            <FileField
                                                defaultValue={featureDetails?.images?.invitation}
                                                error={errors['images.invitation']}
                                                className={classes.image}
                                                uploadDirectoryPath={`accounts/${account.id}/images`}
                                                onChange={onChange}
                                                isImage
                                                fileName={'invitation'}/>
                                        }
                                    />
                                </div>

                                <DialogContentText>Tags</DialogContentText>
                                <Controller
                                    name='tags'
                                    control={control}
                                    render={({ field: {onChange} }) =>
                                        <TagsField
                                            defaultValue={featureDetails?.tags}
                                            tagsDictionary={FEATURE_TAGS}
                                            error={errors['tags']}
                                            onChange={onChange}
                                        />
                                    }
                                />
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