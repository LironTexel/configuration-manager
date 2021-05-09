import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import miscReducer from "./miscReducer";
import { reducer as notifications } from 'react-notification-system-redux';

const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    misc: miscReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    notifications,
})

export default rootReducer;