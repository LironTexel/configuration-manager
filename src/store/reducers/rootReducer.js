import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import  { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    brand: brandReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer;