import React, {useEffect, useState} from 'react';
import {Button, CssBaseline, TextField, Typography} from '@material-ui/core';
// import {Controller, useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import { useDispatch,
    // useSelector
} from "react-redux";
import {addCategory} from "../../../store/actions/accountActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'baseline',
    },
    title: {
        padding: theme.spacing(0, 1)
    },
    viewMode: {
        margin: theme.spacing(2, 0)
    },
    expandedMode: {
        margin: theme.spacing(0.8, 0),
        display: 'flex',
        alignItems: 'baseline',
    }
}));

const AddCategory = ({ account }) => {
    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const classes = useStyles();
    // const addError = useSelector((state) => state?.auth?.authError);

    const handleAddCategory = () => {
        const categoryExists = account?.categories?.find(cat =>
            cat.name.toLowerCase() === categoryName.toLowerCase())

        if (categoryName && !categoryExists) {
            dispatch(addCategory(account, categoryName));
            clearInput();
        }
        else setHasError(true);
    };

    const clearInput = () => {
        setHasError(false);
        setIsExpanded(false);
        setCategoryName('');
    }

    useEffect(() => {
        setIsExpanded(false);
        setHasError(false);
    }, [account.id])

    return (
        <div className={classes.root}>
            <CssBaseline />
                {
                    isExpanded ?
                        <div className={classes.expandedMode}>
                            <TextField
                                label="Category name"
                                variant="outlined"
                                helperText={hasError && 'Name already exists'}
                                error={hasError}
                                onChange={e => setCategoryName(e.target.value)}
                                required
                            />
                            <Button color="primary"
                                    disabled={!categoryName}
                                    onClick={handleAddCategory}>Add</Button>
                            <Button color="primary"
                                    onClick={clearInput}>Cancel</Button>
                        </div>
                    :
                        <div className={classes.viewMode}>
                            <Button color="primary"
                                    onClick={() => setIsExpanded(true)}>
                                <Typography className={classes.title}>+ add category</Typography>
                            </Button>
                        </div>
                }
                {/*{addError &&*/}
                {/*    <div className="auth-error">*/}
                {/*        <p>{addError}</p>*/}
                {/*    </div>*/}
                {/*}*/}
        </div>
    );
};

export default AddCategory;