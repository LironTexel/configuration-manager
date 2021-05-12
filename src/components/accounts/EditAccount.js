import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
// import moment from "moment";
import {Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {editAccount} from "../../store/actions/accountActions";
import {makeStyles} from "@material-ui/core/styles";
import FileField from "../shared/FileField";
import clsx from "clsx";
import ManageCategories from "./editAccount/ManageCategories";
import FeaturePreview from "./editAccount/FeaturePreview";

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


const EditAccount = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state?.firestore?.data?.accounts);
    const auth = useSelector((state) => state?.firebase?.auth);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const classes = useStyles();

    const [ account, setAccount ] = useState({});

    useEffect(() => {
        if (id) {
            setAccount(accounts?.[id]);
            setValue( 'name', accounts?.[id]?.name || '');
            setValue( 'logoUrl', accounts?.[id]?.logoUrl || '');
        }
    }, [accounts, id, setValue]);

    const onSubmit = (data) => {
        console.log({data});
        dispatch(editAccount({ id, ...account, ...data }));
    };

    const onLogoChange = (logoUrl => {
        dispatch(editAccount({ id, ...account, logoUrl }));
    })

    if (!auth.uid) return <Redirect to='/login'/>;
    else return (
        <div className="container section account-details">
            { !account && <Typography>loading account...</Typography> }
            { account &&
                <div className={clsx(classes.root, "grid-container")}>
                    <div className={classes.header}>
                        <Typography variant={"h6"}>Account {account.name}</Typography>
                        {/*<Typography color={"textSecondary"}>Updated { moment(account.createdAt).calendar() }</Typography>*/}
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
                                                    error={!!errors['name']}
                                                    label="Name"
                                                    variant="outlined"
                                                    key={account.name}
                                                    defaultValue={account.name}
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
                                            type="submit">Rename account</Button>
                                    </form>
                                    <div className={classes.featuredContentContainer}>
                                        <Typography>Featured content</Typography>
                                        <FeaturePreview feature={account?.featuredContent}
                                                        account={account}
                                                        isFeaturedContent/>
                                    </div>
                                    <ManageCategories account={account}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={classes.paper}>
                                    <FileField uploadDirectoryPath={`accounts/${id}/logos`}
                                               fileName="Logo"
                                               onChange={onLogoChange}
                                               defaultValue={accounts?.[id]?.logoUrl}/>
                                </Paper>
                            </Grid>
                        </Grid>
                </div>
            }
        </div>
    )
};

export default EditAccount;