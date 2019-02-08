import { firebase, googleAuthProvider } from '../firebase/firebase'


export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    };
};

export const signUpError = (signUpErrorCode, signUpErrorMsg) => ({
    type: 'EMAIL_SIGNUP',
    signUpErrorCode,
    signUpErrorMsg
})

export const signInError = (signInErrorCode, signInErrorMsg) => ({
    type: 'EMAIL_SIGNIN',
    signInErrorCode,
    signInErrorMsg
})


export const emailSignUp = (email, pass) => {
    return (dispatch) => {
        return firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
            console.log("New account succesfully created")
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)   
            dispatch(signUpError(error.code, error.message))
        });
    }
}

export const emailSignIn = (email, pass) => {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(email, pass).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch(signInError(error.code, error.message))
        })
    }
}


export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};