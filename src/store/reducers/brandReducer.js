const initState = {
    brands: [
        { id: 1, title: 'brand 1', content: 'brand 1 content' },
        { id: 2, title: 'brand 2', content: 'brand 2 content' },
        { id: 3, title: 'brand 3', content: 'brand 3 content' },
    ]
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
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default brandReducer;