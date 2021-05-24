import {showErrorNotification, showSuccessNotification} from "./miscActions";

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
            nextFeatureId: 1,
        }).then(() => {
            dispatch({ type: 'CREATE_ACCOUNT', account })
            showSuccessNotification(dispatch, 'Success create account');
        }).catch((err) => {
            dispatch({ type: 'CREATE_ACCOUNT_ERROR', err })
            showErrorNotification(dispatch, 'Failed to create account');
            console.log('Error creating account', err);
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
            showSuccessNotification(dispatch, 'Success editing account');
        }).catch((err) => {
            dispatch({ type: 'EDIT_ACCOUNT_ERROR', err })
            showErrorNotification(dispatch, 'Success editing account');
            console.log('Error editing account', err);
        })
    }
}

export const editCategoryName = (account, categoryIndex, newName) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        let categories =  [ ...account.categories ];
        let category = { ...categories[categoryIndex]}
        const oldName = category.name;
        category.name = newName;
        categories.splice(categoryIndex, 1 , category)

        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'EDIT_CATEGORY', account })
            showSuccessNotification(dispatch, `Success editing category ${newName}`);
        }).catch((err) => {
            dispatch({ type: 'EDIT_CATEGORY_ERROR', err })
            showErrorNotification(dispatch, `Error editing category ${oldName}`);
            console.log('Error editing category', err);
        })
    }
}

export const deleteCategory = (account, categoryIndex) => {
    return (dispatch, getState, getFirebase ) => {

        const firestore = getFirebase().firestore();
        let categories =  [ ...account.categories ];
        const categoryName = categories[categoryIndex].name;
        categories.splice(categoryIndex, 1)

        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'DELETE_CATEGORY', account })
            showSuccessNotification(dispatch, `Success deleting category "${categoryName}"`);
        }).catch((err) => {
            dispatch({ type: 'DELETE_CATEGORY_ERROR', err })
            showErrorNotification(dispatch, `Error deleting category "${categoryName}"`);
            console.log('Error deleting category', err);
        })
    }
}

export const addCategory = (account, categoryName) => {
    return (dispatch, getState, getFirebase ) => {

        const accountCategories = [...(account.categories || [])];
        accountCategories.push({ name: categoryName, content: [] })
        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories: accountCategories
        }).then(() => {
            dispatch({ type: 'ADD_CATEGORY', account })
            showSuccessNotification(dispatch, `Success adding category "${categoryName}"`);
        }).catch((err) => {
            dispatch({ type: 'ADD_CATEGORY_ERROR', err })
            showErrorNotification(dispatch, `Error adding category "${categoryName}"`);
            console.log('Error adding category', err);
        })
    }
}

export const deleteFeature = (account, categoryIndex, featureIndex) => {
    return (dispatch, getState, getFirebase ) => {

        let categories =  [ ...account.categories ];
        let category =  { ...categories[categoryIndex] };
        let content =  [ ...category.content ];
        const featureTitle = categories[categoryIndex].content[featureIndex].title;
        content.splice(featureIndex, 1);
        category.content = content;
        categories[categoryIndex] = category;

        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'DELETE_FEATURE', account })
            showSuccessNotification(dispatch, `Success deleting feature "${featureTitle}"`);
        }).catch((err) => {
            dispatch({ type: 'DELETE_FEATURE_ERROR', err })
            showErrorNotification(dispatch, `Error deleting feature "${featureTitle}"`);
            console.log('Error deleting feature', err);
        })
    }
}

export const addFeature = (account, categoryIndex, feature) => {
    return (dispatch, getState, getFirebase ) => {

        let categories = [ ...account.categories ];
        let category = { ...categories[categoryIndex] };
        let content = [ ...category.content ];
        const nextFeatureId = account.nextFeatureId + 1;

        content.push(feature);

        category.content = content;
        categories[categoryIndex] = category;

        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            nextFeatureId,
            categories
        }).then(() => {
            dispatch({ type: 'ADD_FEATURE', account });

            showSuccessNotification(dispatch, `Success adding feature "${feature.title}"`);
        }).catch((err) => {
            dispatch({ type: 'ADD_FEATURE_ERROR', err })
            showErrorNotification(dispatch, `Error adding feature "${feature.title}"`);
            console.log('Error adding feature', err);
        })
    }
}

export const addFeaturedContent = (account, feature) => {
    return (dispatch, getState, getFirebase ) => {

        // let categories =  [ ...account.categories ];
        // let category =  { ...categories[categoryIndex] };
        // let content =  [ ...category.content ];
        //
        // content.splice(featureIndex, 1, feature);
        //
        // category.content = content;
        // categories[categoryIndex] = category;

        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            featuredContent: feature
        }).then(() => {
            dispatch({ type: 'EDIT_FEATURED_CONTENT', account })
            showSuccessNotification(dispatch, `Success editing featured content "${feature.title}"`);
        }).catch((err) => {
            dispatch({ type: 'EDIT_FEATURED_CONTENT_ERROR', err })
            showErrorNotification(dispatch, `Error editing featured content "${feature.title}"`);
            console.log('Error editing featured content', err);
        })
    }
}

export const editFeature = (account, categoryIndex, feature, featureIndex) => {
    return (dispatch, getState, getFirebase ) => {

        let categories =  [ ...account.categories ];
        let category =  { ...categories[categoryIndex] };
        let content =  [ ...category.content ];

        content.splice(featureIndex, 1, feature);

        category.content = content;
        categories[categoryIndex] = category;

        const firestore = getFirebase().firestore();
        firestore.collection('accounts').doc(account.id).update({
            ...account,
            categories
        }).then(() => {
            dispatch({ type: 'EDIT_FEATURE', account })
            showSuccessNotification(dispatch, `Success editing feature "${feature.title}"`);
        }).catch((err) => {
            dispatch({ type: 'EDIT_FEATURE_ERROR', err })
            showErrorNotification(dispatch, `Error editing feature "${feature.title}"`);
            console.log('Error editing feature', err);
        })
    }
}