import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import miscReducer from "./miscReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    brand: brandReducer,
    misc: miscReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer;