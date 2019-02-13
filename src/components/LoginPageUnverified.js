import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, clearErrors } from '../actions/auth'
import {startLogout} from '../actions/auth'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    };


    render() {
        return (
            <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Right-To-Know Tracker</h1>
                <p>You have signed up but your email address hasn't been verified.</p>
                <p>Check your inbox for a verification email and click the link inside. If you don't see one, check your spam filter or resend a verification email</p>
                <button className="button">
                    Resend verification
                </button>
                <p>Or, try logging in again</p>
                <button
                    className="button"
                    onClick={this.props.startLogout}
                >
                    Sign in
                </button>
            </div>
        </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
})


export default connect(undefined,mapDispatchToProps)(LoginPage)


