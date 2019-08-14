import React from 'react';
import { connect } from 'react-redux';

import { startLogout, resendVerificationEmail } from '../actions/auth'
import LoginHeader from './LoginHeader';

class EmailUnverifiedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmMsg: ''
        }
    };

    handleResendVerificationEmail = () => {
        this.props.resendVerificationEmail()
        const confirmMsg = "Email sent"
        this.setState({ confirmMsg })
    }

    render() {
        return (
            <div className="box-layout">
            <div className="box-layout__box">
                <LoginHeader />
                <div className="login__button-container">
                    <p>You've signed up but your email address hasn't been verified yet.</p>
                    <p>Check your inbox for a verification email and click the link. If you don't see one, check your spam folder or resend a verification email:</p>
                    <button
                        className="button"
                        onClick={this.handleResendVerificationEmail}
                        disabled={!!this.state.confirmMsg}
                    >
                        {this.state.confirmMsg ? this.state.confirmMsg : "Resend verification email"}
                    </button>
                    <p>Or, try logging in again:</p>
                    <button
                        className="button"
                        onClick={this.props.startLogout}
                    >
                        Home
                    </button>
                </div>

            </div>
        </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    resendVerificationEmail: () => dispatch(resendVerificationEmail())
})


export default connect(undefined,mapDispatchToProps)(EmailUnverifiedPage)


// {this.state.confirmMsg && <p className="form__error">{this.state.confirmMsg}</p>}
