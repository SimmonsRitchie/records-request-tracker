import React from 'react';
import { connect } from 'react-redux';
import { emailSignIn, emailForgotPass } from '../actions/auth'

class LoginPageEmailSignIn extends React.Component {
    state = {
        signInEmail: "",
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

    handleEmailForgotPass = (e) => {
        e.preventDefault(); //Stops page from refreshing
        this.props.emailForgotPass(this.state.signInEmail)
    }

    render() {

        const isInvalid = this.state.signInEmail === ''

        return (
            <div className="login__button-container">
            <h3 className="box-layout__title">Reset password</h3>
            <form
                onSubmit={this.handleEmailForgotPass}
                class="login__button-container"
            >
                <input
                    name="signInEmail"
                    className="text-input bottom-margin"
                    placeholder="Email address"
                    onChange={this.handleOnChange}
                    value={this.state.signInEmail}
                />     
                {this.props.resetEmailMsg && <p className="form__error">{this.props.resetEmailMsg}</p>}       
                <button
                    className="button bottom-margin"
                    type="submit"
                    disabled={isInvalid}
                >
                    Send reset email
                </button>
            </form>
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
    resetEmailSent: state.auth.resetEmailSent,
    resetEmailMsg: state.auth.resetEmailMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailForgotPass: (email) => dispatch(emailForgotPass(email)),
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignIn);