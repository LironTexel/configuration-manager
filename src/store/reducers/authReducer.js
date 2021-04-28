const initState = {
    authError: null,
};

const authReducer = ( state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            console.log('success logging in', action.brand);
            return {
                ...state,
                authError: null
            };
        }
        case 'LOGIN_ERROR': {
            console.log('error logging in', action.err);
            return {
                ...state,
                authError: 'login failed'
            };
        }
        case 'LOGOUT_SUCCESS': {
            console.log('success logging out');
            // state = undefined;
            return state;
        }
        case 'LOGOUT_ERROR': {
            console.log('error logging out', action.err);
            return state;
        }
        case 'SIGNUP_SUCCESS': {
            console.log('success signing up');
            return {
                ...state,
                authError: null
            };
        }
        case 'SIGNUP_ERROR': {
            console.log('error signing up', action.err);
            return {
                ...state,
                authError: action.err.message
            };
        }
        default: {
            console.log('unknown action', action.type);
            return state;
        }
    }
}

export default authReducer;