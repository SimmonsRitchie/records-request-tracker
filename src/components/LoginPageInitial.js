import React from 'react';

const loginPageInitial = (props) => (
    <div>
        <p>Organize your Pa. open record requests in one handy location.</p>
            <div className="login__button-container">
                <button
                    className="button"
                    onClick={props.handleEmailSignIn}
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
    </div>
)

export default loginPageInitial