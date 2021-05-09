import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    withStyles,
    Input, Tooltip
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import FeaturePreview from "./FeaturePreview";
import {Colors} from "../../../styles/colors";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {deleteCategory, editCategoryName} from "../../../store/actions/accountActions";
import AlertDialog from "../../shared/AlertDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        // borderBottom: '1px solid rgba(0, 0, 0, .1)',
    },
    addCategory: {
        padding: theme.spacing(0, 0, 2)
    },
    featurePreview: {
        width: '25%',
        minWidth: '150px'
    },
    categorySummary: {
        display: 'flex',
    },
    editMode: {
        display: 'flex',
        alignItems: 'baseline',
    },
    displayMode :{
        display: 'flex',
    },
    hide: {
        display: 'none'
    }
}));

const StyledAccordion = withStyles({
    root: {
        // border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            // borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    // expanded: {},
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
        '& .category-action': {
            display: 'none',
            marginLeft: theme.spacing(2),
            '&:hover': {
                color: Colors.TEAL
            },
            '& .MuiSvgIcon-root': {
                fontSize: '1.15rem',
            }
        },
        '&:hover .category-action': {
            display: 'block'
        },
        '& .category-edit-action': {
            marginLeft: theme.spacing(2),
            alignSelf: 'center',
            '&:hover': {
                color: Colors.TEAL
            },
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
}))(AccordionSummary);

const StyledAccordionDetails = withStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}))(AccordionDetails);

const Category = ({ account, category, categoryIndex, expanded, handleExpanded }) => {
    const classes = useStyles();
    const [name, setName] = useState(category.name || '');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [dialogProps, setDialogProps] = useState({});
    const dispatch = useDispatch();

    const toggleEdit = (e, isEdit) => {
        e.stopPropagation();
        setIsEditMode(isEdit);
        console.log('edit',isEdit )
    }

    const handleRename = e => {
        e.stopPropagation();
        const nameExists = category.name !== name && account?.categories?.find(category => {
            return category.name.toLowerCase() === name.toLowerCase();
        })

        if (!name) {
            setNameErrorMessage('Name is required');
        }
        else if (nameExists) {
            setNameErrorMessage('Name already exists');
        }
        else {
            dispatch(editCategoryName(account, categoryIndex, name));
            setNameErrorMessage('');
            setIsEditMode(false);
            setName(category.name);
        }
    }

    const handleCancelEdit = e => {
        toggleEdit(e, false);
        setName(category.name);
        setNameErrorMessage('');
    }

    const handleDelete = e => {
        e.stopPropagation();
        setDialogProps({
            isOpen: true,
            title: `Delete category "${category.name}"`,
            content: 'This action is irreversible. Would you like to proceed?',
            actionLeftText: 'Cancel',
            actionLeft: () => setDialogProps({ isOpen: false}),
            actionRightText: 'Delete',
            actionRight: () => {
                dispatch(deleteCategory(account, categoryIndex));
                console.log('delete'); //TODO dispatch delete here
                setDialogProps({ isOpen: false})
            },
        })
    }

    useEffect(() => {
        setName(category.name);
    }, [category.name])

    return (
        <div className={classes.root}>
            <StyledAccordion key={ category.name }
                             expanded={expanded === category.name}
                             onChange={handleExpanded(category.name)}>
                <StyledAccordionSummary className={classes.categorySummary}
                                        aria-controls="category-content"
                                        expandIcon={<ExpandMoreIcon />}>
                    <div className={clsx(classes.editMode, !isEditMode && classes.hide)}>
                        <Tooltip title={nameErrorMessage} placement="bottom" arrow>
                            <Input value={name}
                               placeholder="Category name"
                               onChange={e => setName(e.target.value)}
                               onClick={e => e.stopPropagation()}
                               error={nameErrorMessage}
                               required
                               inputProps={{ 'aria-label': 'Category name' }} />
                        </Tooltip>
                        <DoneIcon className='category-edit-action'
                                  onClick={handleRename}/>
                        <CloseIcon className='category-edit-action'
                                   onClick={handleCancelEdit}/>
                    </div>
                    <div className={clsx(classes.displayMode, isEditMode && classes.hide)}>
                        <Typography>{category.name}</Typography>
                        <div className='category-action' onClick={e => toggleEdit(e,true)}><EditIcon/></div>
                        <div className='category-action' onClick={handleDelete}><DeleteIcon/></div>
                    </div>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    {
                        category?.content?.map(feature =>
                            <div className={classes.featurePreview}>
                                <FeaturePreview key={ feature.id }
                                                feature={feature}
                                                account={account}/></div>
                        )
                    }
                    <div className={classes.featurePreview}>
                        <FeaturePreview account={account}/>
                    </div>
                </StyledAccordionDetails>
            </StyledAccordion>
            <AlertDialog title={dialogProps.title}
                         content={dialogProps.content}
                         isOpen={dialogProps.isOpen}
                         actionLeftText={dialogProps.actionLeftText}
                         actionLeft={dialogProps.actionLeft}
                         actionRightText={dialogProps.actionRightText}
                         actionRight={dialogProps.actionRight}
                         handleClose={dialogProps.handleClose}
            />
        </div>
    )
}

export default Category;