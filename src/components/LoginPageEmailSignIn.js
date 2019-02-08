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
            <input
                name="signInEmail"
                className="text-input"
                placeholder="Enter email"
                onChange={this.handleOnChange}
                value={this.state.signInEmail}
            />
            <input
                name="signInPass"
                className="text-input"
                placeholder="Enter password"
                onChange={this.handleOnChange}
                value={this.state.signInPass}
            />
            {this.props.errorMsg && <p className="form__error">Error: {this.props.errorMsg}</p>}
            <button
                className="button"
                onClick={this.handleOnSubmit}
                disabled={isInvalid}
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
    errorCode: state.auth.signInErrorCode,
    errorMsg: state.auth.signInErrorMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailSignIn: (email, pass) => dispatch(emailSignIn(email, pass))
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignIn);