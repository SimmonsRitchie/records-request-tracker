import React from 'react';

const LoginPageEmailSignUp = (props) => (
        <div className="login__button-container">
            <input
                className="text-input"
                placeholder="Choose a username"
            />
            <input
                className="text-input"
                placeholder="Choose a password"
            />
            <button className="button"
            >
                Submit
            </button>
            <button
                className="button button--secondary"
                onClick={props.handleBackToStart}
            >
                Back
            </button>    
        </div>
)

export default LoginPageEmailSignUp