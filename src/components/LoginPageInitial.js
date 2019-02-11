import React from 'react';

const loginPageInitial = (props) => (
    <div>
        <p>Organize your Pa. open record requests in one handy location.</p>
            <div className="login__button-container">
                <button
                    className="button bottom-margin"
                    onClick={props.handleEmailSignIn}
                >
                    Login with Email
                </button>
                <button className="button bottom-margin"
                    onClick={props.handleGoogleLogin}>
                    Login with Google
                </button>
                <button
                    className="button button--secondary"
                    onClick={props.handleEmailSignUp}
                >
                    Sign up
                </button>
            </div>
    </div>
)

export default loginPageInitial