// AUTHENTICATION REDUCER
// Reducers determine what happens when 'type' matches. Uses 'action.THING'
// in some way.

// Setting state up as an object, default state as blank object.
// We don't have to store it the prop of an object but we are doing
// so in this case so that, if we want, we can store other props on that
// object in future.
// Below, if we log in, then set the user's ID to the
// user property of the object.
// If we log out, object is converted back to empty object.
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
        }
        case 'EMAIL_SIGNUP':
            return {
                signUpErrorCode: action.signUpErrorCode,
                signUpErrorMsg: action.signUpErrorMsg
        }
        case 'EMAIL_SIGNIN':
            return {
                signInErrorCode: action.signInErrorCode,
                signInErrorMsg: action.signInErrorMsg
        }
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};