import React from 'react';

const LoginPageEmailLogin = (props) => (
    <div className="login__button-container">
        <input
            className="text-input"
            placeholder="username"
        />
        <input
            className="text-input"
            placeholder="password"
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

export default LoginPageEmailLogin