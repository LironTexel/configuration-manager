const initState = {
    isAccountsDrawerOpen: false
};

const miscReducer = ( state = initState, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER': {
            console.log('toggling drawer, initial state-', action.isAccountsDrawerOpen);
            return {
                ...state,
                isAccountsDrawerOpen: !state.isAccountsDrawerOpen,
            };
        }
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default miscReducer;