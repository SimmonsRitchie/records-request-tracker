import React from 'react';
import { connect } from 'react-redux';
import { emailSignUp } from '../actions/auth'

class LoginPageEmailSignUp extends React.Component {
    state = {
        signUpEmail: "",
        signUpPass1: "",
        signUpPass2: "",
        error: null
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOnSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.signUpEmail === "") {
            this.setState(() => ({ error: "Please enter an email address."}))
        } else if (this.state.signUpPass1 === "") {
            this.setState(() => ({ error: "Please enter a password."}))
        } else {
            this.props.emailSignUp(this.state.signUpEmail, this.state.signUpPass1)
        }
    }

    render() {

        const isInvalid = this.state.signUpPass1 === '' ||
            this.state.signUpEmail === '' ||
            this.state.signUpPass1 !== this.state.signUpPass2


        return (
            <div className="login__button-container">
            <h3 className="box-layout__title">New account</h3>
            <input
                name="signUpEmail"
                className="text-input"
                placeholder="Enter email"
                onChange={this.handleOnChange}
                value={this.state.signUpEmail}
            />
            <input
                name="signUpPass1"
                className="text-input"
                placeholder="Choose a password"
                onChange={this.handleOnChange}
                value={this.state.signUpPass1}
            />
            <input
                name="signUpPass2"
                className="text-input"
                placeholder="Retype your password"
                onChange={this.handleOnChange}
                value={this.state.signUpPass2}
            />
            {this.props.errorMsg && <p className="form__error">Error: {this.props.errorMsg}</p>}
            <button
                className="button"
                disabled={isInvalid}
                onClick={this.handleOnSubmit}
            >
                Submit
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
    errorCode: state.auth.signUpErrorCode,
    errorMsg: state.auth.signUpErrorMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailSignUp: (email, pass) => dispatch(emailSignUp(email, pass))
});


export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignUp);