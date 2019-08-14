import React from 'react';
import { connect } from 'react-redux';

import { emailForgotPass, clearErrors } from '../actions/auth'
import LoginHeader from './LoginHeader';
import { history } from '../routers/AppRouter'



class ForgotPassPage extends React.Component {
    state = {
        signInEmail: ""
    }
    
    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleEmailForgotPass = (e) => {
        e.preventDefault(); //Stops page from refreshing
        this.props.emailForgotPass(this.state.signInEmail)
    }

    handleBackButton = () => {
        this.props.clearErrors()
        history.push('/signin')
    }

    render() {

        const isInvalid = this.state.signInEmail === ''

        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <LoginHeader />
                    <div className="login__button-container">
                        <h3 className="box-layout__title">Reset password</h3>
                        <form
                            onSubmit={this.handleEmailForgotPass}
                            className="login__button-container"
                        >
                            <input
                                name="signInEmail"
                                type="text"
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
    resetEmailSent: state.auth.resetEmailSent,
    resetEmailMsg: state.auth.resetEmailMsg
})

const mapDispatchToProps = (dispatch) => ({
    emailForgotPass: (email) => dispatch(emailForgotPass(email)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassPage);