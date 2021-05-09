import {showErrorNotification, showSuccessNotification} from "./miscActions";

export const loginUser = (credentials) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', credentials })
            showSuccessNotification(dispatch, 'Success logging in');
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
            showErrorNotification(dispatch, 'Error logging in');
            console.log('Login error', err);
        })
    }
}

export const logoutUser = () => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firebase = getFirebase();
        firebase.auth().signOut(
        ).then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
            showSuccessNotification(dispatch, 'Success logging out');
        }).catch((err) => {
            dispatch({ type: 'LOGOUT_ERROR', err })
            showErrorNotification(dispatch, 'Error logging out');
            console.log('Logout error', err);
        })
    }
}

//
export const signUpUser = (newUser) => {
    return (dispatch, getState, getFirebase ) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                username: newUser.username,
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
            showSuccessNotification(dispatch, 'Signup success');
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
            showErrorNotification(dispatch, 'Signup error');
            console.log('Signup error', err);
        })
    }
}