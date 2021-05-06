import React, { useState } from "react";
import {Accordion, AccordionSummary, AccordionDetails, Typography, withStyles} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import AddCategory from "./AddCategory";
import FeaturePreview from "./FeaturePreview";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 0, 1),
    },
    addCategory: {
        padding: theme.spacing(0, 0, 2)
    },
    featurePreview: {
        width: '25%',
        // maxWidth: '300px',
        // height: '100%'
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

const StyledAccordionSummary = withStyles(() => ({
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
    editCategory: {
        display: 'none',
        '&::hover': {
            display: 'block'
        }
    }
}))(AccordionSummary);

const StyledAccordionDetails = withStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}))(AccordionDetails);

const ManageCategories = ({ brand }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.addCategory}><AddCategory brand={brand}/></div>
            {
                brand?.categories?.map(category => {
                    return (
                        <StyledAccordion key={ category.name }
                                         expanded={expanded === category.name}
                                         onChange={handleChange(category.name)}>
                            <StyledAccordionSummary aria-controls="category-content" expandIcon={<ExpandMoreIcon />}>
                                <Typography>{category.name}</Typography>
                            </StyledAccordionSummary>
                            <StyledAccordionDetails>
                                {
                                    category?.content?.map(feature =>
                                        <div className={classes.featurePreview}>
                                            <FeaturePreview key={ feature.id }
                                                            feature={feature}
                                                            brand={brand}/>
                                        </div>
                                    )
                                }
                                <div className={classes.featurePreview}>
                                    <FeaturePreview brand={brand}/>
                                </div>
                            </StyledAccordionDetails>
                        </StyledAccordion>
                    )
                })
            }
        </div>
    )
}

export default ManageCategories;