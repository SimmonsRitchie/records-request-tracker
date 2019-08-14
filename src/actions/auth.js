import { firebase, googleAuthProvider } from '../firebase/firebase'


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
// tells user if sign-up fails/succeeds
export const signUpError = (signUpErrorCode, signUpErrorMsg) => ({
    type: 'EMAIL_SIGNUP',
    signUpErrorCode,
    signUpErrorMsg
})

// signs up user
export const emailSignUp = (userProfile, userLogin) => {
    return (dispatch) => {
        const {email, pass} = userLogin;
        return firebase.auth().createUserWithEmailAndPassword(email, pass).then((user)=> {
            console.log("User account created")
            const actionCodeSettings = {
                url: 'https://rtk-tracker.herokuapp.com/'
            }
            console.log("Sending verification email..")
            return firebase.auth().currentUser.sendEmailVerification(actionCodeSettings).then(()=>{
                console.log("verification email sent")
            }).catch((error) => {
                console.log("error: " + error.message)
            })  
        }).catch((error) => {
            console.log(error.code, error.message)   
            dispatch(signUpError(error.code, error.message))
        });
    }
}

// SIGN IN
// tells user if sign-in fails/succeeds
export const signInError = (signInErrorCode, signInErrorMsg) => ({
    type: 'EMAIL_SIGNIN',
    signInErrorCode,
    signInErrorMsg
})

// signs user in
export const emailSignIn = (email, pass) => {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(email, pass).then((user) => {
            console.log("SIGNIN: Signed in")
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch(signInError(error.code, error.message))
        })
    }
}


// RESET PASS
// tells user if reset fails/succeeds
export const resetPassResult = (resetEmailSent, resetEmailMsg) => ({
    type: 'RESET_PASS',
    resetEmailSent,
    resetEmailMsg
})

// sends reset email
export const emailForgotPass = (email) => {
    return (dispatch) => {
        return firebase.auth().sendPasswordResetEmail(email).then(() => {
            const msg = "A reset email was sent to your inbox. Follow the link, reset your password, and sign in again."
            const resetEmailSent = true
            dispatch(resetPassResult(resetEmailSent, msg))
        }).catch((error) => {
            const resetEmailSent = false
            dispatch(resetPassResult(resetEmailSent, error.message))
        })
    }
}

// VERIFICATION EMAIL
// Resends verification email
export const resendVerificationEmail = () => {
    return (dispatch) => {
        return firebase.auth().currentUser.sendEmailVerification().then(()=>{
                        console.log("verification email resent")
                    }).catch((error) => {
                        console.log("error: " + error.message)
                    })  
    }
}

// CLEAR ERRORS
/* Clears various error messages from redux store. */
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