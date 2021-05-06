const initState = {
    accounts: []
};

const accountReducer = ( state = initState, action) => {
    switch (action.type) {
        case 'CREATE_ACCOUNT': {
            console.log('created account', action.account);
            return state;
        }
        case 'CREATE_ACCOUNT_ERROR': {
            console.log('error creating account', action.err);
            return state;
        }
        case 'EDIT_ACCOUNT': {
            console.log('edited account', action.account);
            return state;
        }
        case 'EDIT_ACCOUNT_ERROR': {
            console.log('error editing account', action.err);
            return state;
        }
        case 'ADD_CATEGORY': {
            console.log('added category', action.account);
            return state;
        }
        case 'ADD_CATEGORY_ERROR': {
            console.log('error adding category account', action.err);
            return state;
        }
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default accountReducer;