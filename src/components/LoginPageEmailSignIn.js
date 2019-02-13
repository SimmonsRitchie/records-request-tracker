import React from 'react';
import { connect } from 'react-redux';
import { emailSignIn } from '../actions/auth'

class LoginPageEmailSignIn extends React.Component {
    state = {
        signInEmail: "",
        signInPass: "",
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOnSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.signInEmail !== "" && this.state.signInPass !== "") {
            this.props.emailSignIn(this.state.signInEmail, this.state.signInPass)
        }
    }

    render() {

        const isInvalid = this.state.signInEmail === '' ||
            this.state.signInPass === ''

        return (
            <div className="login__button-container">
                <form
                    className="login__button-container"
                    onSubmit={this.handleOnSubmit}
                >
                    <input
                        name="signInEmail"
                        className="text-input bottom-margin"
                        placeholder="Enter email"
                        onChange={this.handleOnChange}
                        value={this.state.signInEmail}
                    />
                    <input
                        name="signInPass"
                        type="password"
                        className="text-input bottom-margin"
                        placeholder="Enter password"
                        onChange={this.handleOnChange}
                        value={this.state.signInPass}
                    />
                    {this.props.errorMsg && <p className="form__error">Error: {this.props.errorMsg}</p>}
                    <button
                        type="submit"
                        className="button bottom-margin"
                        disabled={isInvalid}
                    >
                        Sign-in
                    </button>
                </form>
                <button
                    className="button bottom-margin"
                    onClick={this.props.handleForgotPass}
                >
                    Forgot password?
                </button>

                <button
                    className="button button--secondary"
                    onClick={this.props.handleBackToStart}
                >
                    Back
                </button>    
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    errorCode: state.auth.signInErrorCode,
    errorMsg: state.auth.signInErrorMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailSignIn: (email, pass) => dispatch(emailSignIn(email, pass))
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignIn);