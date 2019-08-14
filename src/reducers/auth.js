// AUTHENTICATION REDUCER

// Below, if we log in, then set the user's ID to the
// user property of the object.
// If we log out, object is converted back to empty object.

export default (state = {}, action) => {
    switch (action.type) {
        case 'CLEAR_ERRORS':
            return {
                signInErrorCode: "",
                signInErrorMsg: "",
                signUpErrorCode: "",
                signUpErrorMsg: "",
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
        case 'LOGIN':
            return {
                uid: action.uid
        }
        case 'RESET_PASS':
            return {
                resetEmailSent: action.resetEmailSent,
                resetEmailMsg: action.resetEmailMsg
        }
        case 'VERIFY_MSG':
            return {
                needResendVerifyEmail: action.needResendVerifyEmail,
                verifyMsg: action.verifyMsg
            }
        default:
            return state;
    }
};