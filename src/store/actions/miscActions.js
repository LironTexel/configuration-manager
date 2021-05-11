import Notifications from 'react-notification-system-redux';

export function showErrorNotification(dispatch, msg) {
    showNotification(dispatch, msg, false);
}

export function showSuccessNotification(dispatch, msg) {
    showNotification(dispatch, msg, true)
}

function showNotification (dispatch, msg, isSuccess) {
    const notificationOpts = {
        message: msg,
        position: 'tc',
        autoDismiss: 5,
        dismissible: 'click',
        // action: {
        //     label: 'OK',
        // },
    };

    const type = isSuccess ? 'success' : 'error';
    dispatch(Notifications[type](notificationOpts));
}