import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStart: true,
            existingUser: false,
            newUser: false,
            loginEmail: false
        }
    };
    handleExistingUser = () => {
        const toggle = !this.state.existingUser
        this.setState(() => ({
            loginStart: false,
            existingUser: toggle
        }))
    }

    handleNewUser = () => {
        const toggle = !this.state.newUser
        this.setState(() => ({
            loginStart: false,
            existingUser: toggle
        }))
    }
    handleLoginEmail = () => {
        const toggle = !this.state.loginEmail
        this.setState(() => ({
            existingUser: false,
            loginEmail: toggle
        }))     
    }

    handleBackToStart = () => {
        this.setState(() => ({
            loginEmail: false,
            existingUser: false,
            newUser: false,
            loginStart: true
        }))     
    }

    handleBackToExistingUser = () => {
        this.setState(() => ({
            loginEmail: false,
            existingUser: true,
            newUser: false,
            loginStart: false
        }))     
    }

    render() {
        return (
            <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Right-To-Know Tracker</h1>
                <p>Organize your open records requests in one handy location.</p>
                <div>
                    <ReactCSSTransitionGroup
                        transitionName="login-start"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        {
                        this.state.loginStart &&
                        <div className="login__button-container">
                            <button 
                                key={"loginStart-existing"}
                                className="button"
                                onClick={this.handleExistingUser}
                            >
                                Existing user
                            </button>
                            <button
                                key={"loginStart-new"}
                                className="button"
                                onClick={this.handleNewUser}
                            >
                                New user
                            </button>
                        </div>
                    }                   
                    {
                    this.state.existingUser &&
                        <div className="login__button-container">
                            <button className="button"
                                onClick={this.handleLoginEmail}
                                key={"existing-email"}
                            >
                                Login with Email
                            </button>
                            <button className="button"
                                key={"existing-google"}
                                onClick={this.props.startLogin}>
                                Login with Google
                            </button>    
                        </div>
                    }       
                    {
                    this.state.newUser &&          
                        <div className="login__button-container">
                            <button className="button"
                                key={"new-email"}
                            >
                                Sign up with Email
                            </button>    
                            <button className="button"
                                key={"new-google"}
                            >
                                Instant sign in with Google
                            </button>    
                        </div>
                    }
                    {
                    this.state.loginEmail &&
                        <div className="login__button-container">
                            <input
                                key={"existing-email-user"}
                                className="text-input"
                                placeholder="username"
                            />
                            <input
                                key={"existing-email-pass"}
                                className="text-input"
                                placeholder="password"
                            />
                            <button className="button"
                                key={"existing-email-submit"}
                            >
                                Submit
                            </button>
                            <button
                                key="back-existing"
                                className="button button--secondary"
                                onClick={this.handleBackToExistingUser}
                            >
                                Back
                            </button>
                        </div>
                    }
                    {(this.state.existingUser || this.state.newUser) &&
                        <button
                            key={"back-start"}
                            className="button button--secondary"
                            onClick={this.handleBackToStart}
                        >
                            Back
                        </button>
                    }       
                    </ReactCSSTransitionGroup>

                </div>
            </div>
        </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
