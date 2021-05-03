const initState = {
    brands: []
};

const brandReducer = ( state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BRAND': {
            console.log('created brand', action.brand);
            return state;
        }
        case 'CREATE_BRAND_ERROR': {
            console.log('error creating brand', action.err);
            return state;
        }
        case 'EDIT_BRAND': {
            console.log('edited brand', action.brand);
            return state;
        }
        case 'EDIT_BRAND_ERROR': {
            console.log('error editing brand', action.err);
            return state;
        }
        case 'ADD_CATEGORY': {
            console.log('added category', action.brand);
            return state;
        }
        case 'ADD_CATEGORY_ERROR': {
            console.log('error adding category brand', action.err);
            return state;
        }
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default brandReducer;