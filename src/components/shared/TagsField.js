import React from "react";
import {Checkbox, FormControl, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(() => ({
    root: {},
}));

const TagsField = (props) => {
    const { defaultValue, tagsDictionary, onChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl fullWidth>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={tagsDictionary}
                    getOptionSelected ={(option, value) => {
                        return option === value
                    }}
                    getOptionLabel={(option) => option}
                    defaultValue={defaultValue || []}
                    disableCloseOnSelect
                    onChange={(event, values) => onChange(values)}
                    renderOption={(option, { selected }) => (
                        <>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Feature tags" />
                    )}
                />
            </FormControl>
        </div>
    )
}

export default TagsField;