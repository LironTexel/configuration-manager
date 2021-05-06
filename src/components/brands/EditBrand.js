import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import moment from "moment";
import {Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {editBrand} from "../../store/actions/brandActions";
import {makeStyles} from "@material-ui/core/styles";
import FileField from "../shared/FileField";
import clsx from "clsx";
import ManageCategories from "./editBrand/ManageCategories";
import FeaturePreview from "./editBrand/FeaturePreview";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    header: {
        padding: theme.spacing(0, 1, 2),
    },
    featuredContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(0, 'auto'),
        width: '100%',
        maxWidth: '500px',
    }
}));


const EditBrand = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const brands = useSelector((state) => state?.firestore?.data?.brands);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const classes = useStyles();
    console.log({brands})

    const [ brand, setBrand ] = useState({});

    useEffect(() => {
        if (id) {
            setBrand(brands?.[id]);
            setValue( 'name', brands?.[id]?.name || '');
            setValue( 'logoUrl', brands?.[id]?.logoUrl || '');
        }
    }, [brands, id, setValue]);

    const onSubmit = (data) => {
        console.log({data});
        dispatch(editBrand({ id, ...brand, ...data }));
    };

    const onLogoChange = (logoUrl => {
        dispatch(editBrand({ id, ...brand, logoUrl }));
    })


    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="container section brand-details">
            { !brand && <Typography>loading brand...</Typography> }
            { brand &&
                <div className={clsx(classes.root, "grid-container")}>
                    <div className={classes.header}>
                        <Typography variant={"h6"}>Brand {brand.name}</Typography>
                        <Typography color={"textSecondary"}>Created { moment(brand.createdAt).calendar() }</Typography>
                    </div>

                        <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <Paper className={classes.paper}>
                                    <form action=""
                                          noValidate
                                          autoComplete="off"
                                          onSubmit={handleSubmit(onSubmit)}>
                                        <Controller
                                            render={({ field: {onChange} }) =>
                                                <TextField
                                                    error={errors['name']}
                                                    label="Name"
                                                    variant="outlined"
                                                    key={brand.name}
                                                    defaultValue={brand.name}
                                                    helperText={errors.name && "Name is mandatory"}
                                                    onChange={onChange}
                                                    required
                                                    fullWidth
                                                />
                                            }
                                            name='name'
                                            control={control}
                                        />
                                        <Button
                                            color="primary"
                                            type="submit">Rename brand</Button>
                                    </form>
                                    <div className={classes.featuredContentContainer}>
                                        <Typography>Featured content</Typography>
                                        <FeaturePreview feature={brand?.featuredContent} brand={brand}/>
                                    </div>
                                    <ManageCategories brand={brand}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={classes.paper}>
                                    <FileField uploadDirectoryPath={`brands/${id}/logos`}
                                               isImage
                                               fileName="logo"
                                               onChange={onLogoChange}
                                               defaultValue={brands?.[id]?.logoUrl}/>
                                </Paper>
                            </Grid>
                        </Grid>
                </div>
            }
        </div>
    )
};

export default EditBrand;