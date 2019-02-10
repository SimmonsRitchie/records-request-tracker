import React from 'react';
import { connect } from 'react-redux';
import { emailSignIn, emailForgotPass } from '../actions/auth'

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

    handleEmailForgotPass = () => {
        console.log("sending email...")
        this.props.emailForgotPass(this.state.signInEmail)
        console.log("email sent")
    }

    render() {

        return (
            <div className="login__button-container">
            <p>Reset password</p>
            <input
                name="signInEmail"
                className="text-input"
                placeholder="Enter email"
                onChange={this.handleOnChange}
                value={this.state.signInEmail}
            />            
            <button
                className="button"
                onClick={this.handleEmailForgotPass}
            >
                Send reset email
            </button>
            <button
                className="button button--secondary"
                onClick={this.props.handleEmailSignIn}
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
    emailForgotPass: (email) => dispatch(emailForgotPass(email)),
    emailSignIn: (email, pass) => dispatch(emailSignIn(email, pass))
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignIn);