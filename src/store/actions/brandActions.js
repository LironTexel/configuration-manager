export const createBrand = (brand) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firestore = getFirebase().firestore();
        // const uid = getState().firebase.auth.uid;
        const username = getState().firebase.profile.username;
        firestore.collection('brands').add({
            ...brand,
            createdAt: new Date().getTime(),
            createdBy: username,
        }).then(() => {
            dispatch({ type: 'CREATE_BRAND', brand })
        }).catch((err) => {
            dispatch({ type: 'CREATE_BRAND_ERROR', err })
        })
    }
}

export const editBrand = (brand) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firestore = getFirebase().firestore();
        firestore.collection('brands').doc(brand.id).update({
            ...brand,
        }).then(() => {
            dispatch({ type: 'EDIT_BRAND', brand })
        }).catch((err) => {
            dispatch({ type: 'EDIT_BRAND_ERROR', err })
        })
    }
}