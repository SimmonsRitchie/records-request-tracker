import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { startGoogleLogin } from '../actions/auth'
import Loginheader from './LoginHeader'
import LoginHeader from './LoginHeader';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <LoginHeader />
                    <p>Organize your Pa. open record requests in one handy location.</p>
                    <div className="login__button-container">
                        <Link
                            to="/signin"
                            className="button bottom-margin"
                        >
                            Login with Email
                        </Link>
                        <button 
                            className="button bottom-margin"
                            onClick={this.props.startGoogleLogin}
                        >
                            Login with Google
                        </button>

                        <Link
                            to="/signup"
                            className="button button--secondary"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
})


export default connect(undefined,mapDispatchToProps)(LoginPage)


