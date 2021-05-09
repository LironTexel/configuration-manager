import React, { useState } from "react";
import {makeStyles} from "@material-ui/core/styles";
import AddCategory from "./AddCategory";
import Category from "./Category";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 0, 1),
    },
    addCategory: {
        padding: theme.spacing(2, 0)
    },
    categoryContainer: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
}));



const ManageCategories = ({ account }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('');

    const handleExpanded = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.addCategory}><AddCategory account={account}/></div>
            {
                account?.categories?.map((category, categoryIndex) =>
                    <div className={classes.categoryContainer}>
                        <Category account={account}
                                  category={category}
                                  categoryIndex={categoryIndex}
                                  expanded={expanded}
                                  handleExpanded={handleExpanded}/>
                    </div>
                )
            }
        </div>
    )
}

export default ManageCategories;