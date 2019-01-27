import database from '../firebase/firebase'

// ADD
export const addRequest = (request) => ({
    type: 'ADD_REQUEST',
    request
});

// START ADD
export const startAddRequest = (requestData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            agency = '',
            details = '',
            createdAt = 0
        } = requestData; // destructuring expense data and setting defaults
        const request = { description, agency, details, createdAt } // reassembling expense data
        return database.ref(`users/${uid}/requests`).push(request).then((ref) => {
            dispatch(addRequest({
                id: ref.key, // setting ID as firebase key
                ...request
            }));
        });
    };
};

// EDIT
export const editRequest = (id, updates ) => ({
    type: 'EDIT_REQUEST',
    id,
    updates
});

// START EDIT

export const startEditRequest = ( id, updates ) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/requests/${id}`).update(updates).then(() => {
            dispatch(editRequest(id, updates))
        });
    };
};

// REMOVE
export const removeRequest = (id) => ({
    type: 'REMOVE_REQUEST',
    id
});

// START REMOVE

export const startRemoveRequest = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/requests/${id}`).remove().then(() => {
            dispatch(removeRequest(id))
        });
    };
};

// SET
export const setRequests = (requests) => ({
    type: 'SET_REQUESTS',
    requests
})

// START SET REQUESTS
export const startSetRequests = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/requests`).once('value').then(
            (snapshot) => {
                const requests = []
                snapshot.forEach((childSnapshot) => {
                    requests.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                })
            dispatch(setRequests(requests))
            })
    }
}