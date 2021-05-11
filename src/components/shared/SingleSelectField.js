import React from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {INPUT_STYLE_VARIANT} from "../../consts";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        // width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const SingleSelectField = (props) => {
    const { defaultValue = null, selectDictionary, onChange, error, isRequired } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl} error={!!error} required={isRequired}>
                <InputLabel id="single-select-label">Feature type</InputLabel>
                <Select
                    labelId="single-select-label"
                    id="single-select-field"
                    defaultValue={defaultValue}
                    className={classes.selectEmpty}
                    variant={INPUT_STYLE_VARIANT}
                    onChange={onChange}
                >
                    <MenuItem value="" disabled>Please select type</MenuItem>
                    {
                        Object.values(selectDictionary || []).map(value => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))
                    }
                </Select>
                { error &&
                    <FormHelperText>{error}</FormHelperText>
                }
            </FormControl>
        </div>
    )
}

export default SingleSelectField;