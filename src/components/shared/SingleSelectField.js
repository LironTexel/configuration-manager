import React from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {INPUT_STYLE_VARIANT} from "../../consts";

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 200,
    },
}));


const SingleSelectField = (props) => {
    const { defaultValue = null, selectDictionary, onChange, error, isRequired, label } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}
                         error={!!error}
                         variant={INPUT_STYLE_VARIANT}
                         required={isRequired}>
                <InputLabel id="single-select-label" htmlFor="single-select-field">Feature type</InputLabel>
                <Select
                    defaultValue={defaultValue || ''}
                    label={label}
                    onChange={onChange}
                    inputProps={{
                        name: label,
                        id: 'single-select-field',
                    }}
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