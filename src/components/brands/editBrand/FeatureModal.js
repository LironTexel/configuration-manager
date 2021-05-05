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
    Select,
    MenuItem,
    makeStyles,
    InputLabel,
    FormControl,
    Chip,
    Input
} from '@material-ui/core';
// import {FEATURE_TYPES} from "../../../consts";
import {FEATURE_TAGS} from "../../../consts";
import FileField from "../../shared/FileField";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateFeatureSchema} from "../../../models/feature.model";

const useStyles = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            maxWidth: '750px',
        }
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '700px',
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    featureType: {
        minWidth: '40%'
    },
    featureTags: {
        minWidth: '40%'
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const FeatureModal = ({ open , handleClose, feature, brand }) => {
    const classes = useStyles();
    const isNewFeature = !feature;
    const featureDetails = { ...feature };
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(CreateFeatureSchema(brand))
    });

    const onSubmit = (data) => {
        console.log({data});
        // dispatch(({  }));
    };

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
                    <Typography>{ isNewFeature ? 'Create a new feature' : `Edit ${feature?.title}` }</Typography>
                </DialogTitle>

                    <form noValidate
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
                                            defaultValue={featureDetails?.duration || ''}
                                            type="number"
                                            helperText={errors.duration?.message}
                                            onChange={onChange}
                                            fullWidth
                                            required
                                        />
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
                                                input={featureDetails?.images?.preview}
                                                error={errors['images.preview']}
                                                className={classes.image}
                                                uploadDirectoryPath={`brands/${brand.id}/images`}
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
                                                input={featureDetails?.images?.main}
                                                error={errors['images.main']}
                                                className={classes.image}
                                                uploadDirectoryPath={`brands/${brand.id}/images`}
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
                                                input={featureDetails?.images?.main}
                                                error={errors['images.watch_together']}
                                                className={classes.image}
                                                uploadDirectoryPath={`brands/${brand.id}/images`}
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
                                                input={featureDetails?.images?.invitation}
                                                error={errors['images.invitation']}
                                                className={classes.image}
                                                uploadDirectoryPath={`brands/${brand.id}/images`}
                                                onChange={onChange}
                                                isImage
                                                fileName={'invitation'}/>
                                        }
                                    />
                                </div>
                            </div>

                    <DialogContentText>Tags</DialogContentText>
                    <FormControl className={classes.featureTags}>
                        <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            defaultValue={featureDetails?.tags || []}
                            // onChange={(e) => {
                            //     handleChange('tags', e.target.value);
                            // }}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {
                                Object.values(FEATURE_TAGS).map(value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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