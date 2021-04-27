const initState = {
    isBrandsDrawerOpen: false
};

const miscReducer = ( state = initState, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER': {
            console.log('toggling drawer, initial state-', action.isBrandsDrawerOpen);
            return {
                ...state,
                isBrandsDrawerOpen: !state.isBrandsDrawerOpen,
            };
        }
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default miscReducer;