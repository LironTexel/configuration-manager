import React, { useState } from "react";
import {Accordion, AccordionSummary, AccordionDetails, Typography, withStyles} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import AddCategory from "./AddCategory";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'left',
        padding: theme.spacing(2, 1),
    }
}));

const StyledAccordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(Accordion);

const StyledAccordionSummary = withStyles(theme => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 50,
        '&$expanded': {
            minHeight: 50,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    addCategory: {
        padding: theme.spacing()
    },
}))(AccordionSummary);

const ManageCategories = ({ brand }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className="container section brand-categories">
            <Typography className={classes.title}>Manage categories</Typography>
            <AddCategory className={classes.addCategory} brand={brand}/>
            {
                brand?.categories?.map(category => {
                    return (
                        <StyledAccordion key={ category.name } expanded={expanded === category.name}
                                         onChange={handleChange(category.name)}>
                            <StyledAccordionSummary aria-controls="category-content"
                                                    expandIcon={<ExpandMoreIcon />}>
                                <Typography>{category.name}</Typography>
                            </StyledAccordionSummary>
                            <AccordionDetails>
                                {
                                    category?.content?.map(feature =>
                                        <Typography key={ feature.id }>
                                            {feature.title}
                                        </Typography>
                                    )
                                }
                            </AccordionDetails>
                        </StyledAccordion>
                    )
                })
            }
        </div>
    )
}

export default ManageCategories;