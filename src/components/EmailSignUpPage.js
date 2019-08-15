import React from 'react';
import { connect } from 'react-redux';

import LoginHeader from './LoginHeader';
import { emailSignUp, clearErrors } from '../actions/auth'
import { history } from '../routers/AppRouter'


const initialState = {
    username: "",
    signUpEmail: "",
    signUpPass1: "",
    signUpPass2: "",
    error: null
}

class LoginPageEmailSignUp extends React.Component {
    state = initialState

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
            const userProfile = {
                username: this.state.firstName,
            }
            const userLogin = {
                email: this.state.signUpEmail,
                pass: this.state.signUpPass1
            }
            this.props.emailSignUp(userProfile, userLogin)

        }
    }

    handleBackButton = () => {
        this.props.clearErrors()
        history.push('/')
    }

    render() {

        const isInvalid = this.state.signUpPass1 === '' ||
            this.state.signUpEmail === '' ||
            this.state.signUpPass1 !== this.state.signUpPass2


        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <LoginHeader />
                    <div className="login__button-container">
                    <h3 className="box-layout__title">New account</h3>
                    <form
                        onSubmit={this.handleOnSubmit}
                        className="login__button-container"
                    >
                        <input
                            name="signUpEmail"
                            className="text-input bottom-margin"
                            placeholder="Enter email"
                            onChange={this.handleOnChange}
                            value={this.state.signUpEmail}
                        />
                        <input
                            name="signUpPass1"
                            type="password"
                            className="text-input bottom-margin"
                            placeholder="Choose a password"
                            onChange={this.handleOnChange}
                            value={this.state.signUpPass1}
                        />
                        <input
                            name="signUpPass2"
                            type="password"
                            className="text-input bottom-margin"
                            placeholder="Retype your password"
                            onChange={this.handleOnChange}
                            value={this.state.signUpPass2}
                        />
                        {this.props.errorMsg && <p className="form__error">Error: {this.props.errorMsg}</p>}
                        <button
                            className="button bottom-margin"
                            type="submit"
                            disabled={isInvalid}
                        >
                            Sign up
                        </button>
                    </form>
                    <button
                        className="button button--secondary"
                        onClick={this.handleBackButton}
                    >
                        Back
                    </button>     
                </div>
            </div>
        </div>

            
        )
    }
};

const mapStateToProps = (state) => ({
    errorCode: state.auth.signUpErrorCode,
    errorMsg: state.auth.signUpErrorMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailSignUp: (userProfile, userLogin) => dispatch(emailSignUp(userProfile, userLogin)),
    clearErrors: () => dispatch(clearErrors())
});


export default connect(mapStateToProps,mapDispatchToProps)(LoginPageEmailSignUp);