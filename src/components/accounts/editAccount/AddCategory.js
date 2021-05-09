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
    addForm: {
    },
    title: {
        padding: theme.spacing(0, 1)
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
            dispatch(addCategory(categoryName, {...account}));
            //TODO clear content
            setHasError(false);
            setIsExpanded(false);
            setCategoryName('');
        }
        else setHasError(true);
    };

    useEffect(() => {
        setIsExpanded(false);
        setHasError(false);
    }, [account.id])

    return (
        <div className={classes.root}>
            <CssBaseline />
                {
                    isExpanded ?
                        <>
                            <TextField
                                label="Category name"
                                variant="outlined"
                                helperText={hasError && 'Name already exists'}
                                error={hasError}
                                onChange={e => setCategoryName(e.target.value)}
                                required
                                // fullWidth
                            />
                            <Button color="primary"
                                    disabled={!categoryName}
                                    onClick={handleAddCategory}>Add</Button>
                            <Button color="primary"
                                    onClick={() => setIsExpanded(false)}>Cancel</Button>
                        </>
                    :
                        <Button color="primary"
                                onClick={() => setIsExpanded(true)}>
                            <Typography className={classes.title}>+ add category</Typography>
                        </Button>
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