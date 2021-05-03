export const createBrand = (brand) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const firestore = getFirebase().firestore();
        // const uid = getState().firebase.auth.uid;
        const username = getState().firebase.profile.username;
        firestore.collection('brands').doc(brand.id).set({
            ...brand,
            categories: [],
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

export const addCategory = (categoryName, brand) => {
    return (dispatch, getState, getFirebase ) => {
        // async call to DB
        const brandCategories = [...(brand.categories || [])];
        brandCategories.push({ name: categoryName, content: [] })
        const firestore = getFirebase().firestore();
        firestore.collection('brands').doc(brand.id).update({
            ...brand,
            categories: brandCategories
        }).then(() => {
            dispatch({ type: 'ADD_CATEGORY', brand })
        }).catch((err) => {
            dispatch({ type: 'ADD_CATEGORY_ERROR', err })
        })
    }
}