import React from "react";
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
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

const TagsField = (props) => {
    const { defaultValue, tagsDictionary, onChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl className={classes.featureTags}>
                <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    defaultValue={defaultValue || []}
                    onChange={onChange}
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
                        Object.values(tagsDictionary || []).map(value => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default TagsField;