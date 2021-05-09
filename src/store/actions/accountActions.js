export const createAccount = (account) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        // const uid = getState().firebase.auth.uid;
        const username = getState().firebase.profile.username;
        firestore.collection('accounts').doc(account.id).set({
            ...account,
            categories: [],
            createdAt: new Date().getTime(),
            createdBy: username,
        }).then(() => {
            dispatch({ type: 'CREATE_ACCOUNT', account })
        }).catch((err) => {
            dispatch({ type: 'CREATE_ACCOUNT_ERROR', err })
        })
    }
}

export const editAccount = (account) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
        }).then(() => {
            dispatch({ type: 'EDIT_ACCOUNT', account })
        }).catch((err) => {
            dispatch({ type: 'EDIT_ACCOUNT_ERROR', err })
        })
    }
}

export const editCategoryName = (account, categoryIndex, newName) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        let categories =  [ ...account.categories ];
        let category = { ...categories[categoryIndex]}
        category.name = newName;
        categories.splice(categoryIndex, 1 , category)

        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'EDIT_ACCOUNT', account })
        }).catch((err) => {
            dispatch({ type: 'EDIT_ACCOUNT_ERROR', err })
        })
    }
}

export const deleteCategory = (account, categoryIndex) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        let categories =  [ ...account.categories ];
        categories.splice(categoryIndex, 1)

        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'EDIT_ACCOUNT', account })
        }).catch((err) => {
            dispatch({ type: 'EDIT_ACCOUNT_ERROR', err })
        })
    }
}

export const addCategory = (categoryName, account) => {
    return (dispatch, getState, getFirebase ) => {

        const accountCategories = [...(account.categories || [])];
        accountCategories.push({ name: categoryName, content: [] })
        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories: accountCategories
        }).then(() => {
            dispatch({ type: 'ADD_CATEGORY', account })
        }).catch((err) => {
            dispatch({ type: 'ADD_CATEGORY_ERROR', err })
        })
    }
}