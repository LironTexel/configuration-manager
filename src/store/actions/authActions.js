export const loginUser = (credentials) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', credentials })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
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
        }).catch((err) => {
            dispatch({ type: 'LOGOUT_ERROR', err })
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
                // more fields if relevant
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}