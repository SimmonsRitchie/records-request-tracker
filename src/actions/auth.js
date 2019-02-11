import { firebase, googleAuthProvider, database } from '../firebase/firebase'

// LOGIN IN
export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    };
};


// LOGOUT
export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};



// SIGN UP
export const signUpError = (signUpErrorCode, signUpErrorMsg) => ({
    type: 'EMAIL_SIGNUP',
    signUpErrorCode,
    signUpErrorMsg
})
export const emailSignUp = (userProfile, userLogin) => {
    return (dispatch) => {
        const {email, pass} = userLogin;
        return firebase.auth().createUserWithEmailAndPassword(email, pass).then(()=> {
            console.log("User account created")
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)   
            dispatch(signUpError(error.code, error.message))
        });
    }
}

// SIGN IN
export const signInError = (signInErrorCode, signInErrorMsg) => ({
    type: 'EMAIL_SIGNIN',
    signInErrorCode,
    signInErrorMsg
})

export const emailSignIn = (email, pass) => {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
            console.log("Sign in successful")
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch(signInError(error.code, error.message))
        })
    }
}

// RESET PASS
export const resetPassResult = (resetEmailSent, resetEmailMsg) => ({
    type: 'RESET_PASS',
    resetEmailSent,
    resetEmailMsg
})

export const emailForgotPass = (email) => {
    return (dispatch) => {
        return firebase.auth().sendPasswordResetEmail(email).then(() => {
            console.log("Reset email was sent successfully")
            const msg = "A reset email was sent to your inbox. Follow the link, reset your password, and sign in again."
            const resetEmailSent = true
            dispatch(resetPassResult(resetEmailSent, msg))
        }).catch((error) => {
            console.log("Ooooops: " + error.message)
            const resetEmailSent = false
            dispatch(resetPassResult(resetEmailSent, error.message))
        })
    }
}

// CLEAR ERRORS
/* This is to clear error messages from redux store. When called, means that when users leave sign in or sign up pages
and then return any error messages will have been cleared. */

export const clearErrors = () => ({
    type: 'CLEAR_ERRORS'
})

// GET USER PROFILE
export const getUserProfile = () => {
    let user = firebase.auth().currentUser;
    if (user != null) {
        const userProfile = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid  
        }
        console.log(userProfile)
        return userProfile
    }
}