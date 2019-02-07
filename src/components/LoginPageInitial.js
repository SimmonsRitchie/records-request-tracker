import React from 'react';

const loginPageInitial = (props) => (
        <div className="login__button-container">
            <button
                className="button"
                onClick={props.handleEmailLogin}
            >
                Login with Email
            </button>
            <button className="button"
                onClick={props.handleGoogleLogin}>
                Login with Google
            </button>
            <button
                className="button button--orange"
                onClick={props.handleEmailSignUp}
            >
                Sign up
            </button>
        </div>
)

export default loginPageInitial