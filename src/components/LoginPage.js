import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, clearErrors } from '../actions/auth'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import LoginPageInitial from './LoginPageInitial'
import LoginPageEmailSignUp from './LoginPageEmailSignUp'
import LoginPageEmailSignIn from './LoginPageEmailSignIn'
import LoginPageForgotPass from './LoginPageForgotPass';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "loginInitial",
            appearHome: true
        }
    };

    handleEmailSignIn = () => {
        this.setState(() => ({
            display: "emailSignIn"
        }))
        this.props.clearErrors()
    };

    handleGoogleLogin = () => {
        this.props.startGoogleLogin()
    };

    handleEmailSignUp= () => {
        this.setState(() => ({
            display: "emailSignUp"
        }))
        this.props.clearErrors()     
    };

    handleBackToStart = () => {
        this.setState(() => ({
            display: "loginInitial",
        }))
        this.props.clearErrors()     
    }

    handleForgotPass = () => {
        this.setState(() => ({
            display: "emailForgot",
        }))     
    }

    displayBox = () => {
        if (this.state.display === "loginInitial") {
            return <LoginPageInitial
                handleEmailSignIn={this.handleEmailSignIn}
                handleGoogleLogin={this.handleGoogleLogin}
                handleEmailSignUp={this.handleEmailSignUp}
                />
        } else if (this.state.display === "emailSignUp") {
            return <LoginPageEmailSignUp
                handleBackToStart={this.handleBackToStart}
                />
        } else if (this.state.display === "emailSignIn") {
            return <LoginPageEmailSignIn
                handleBackToStart={this.handleBackToStart}
                handleForgotPass={this.handleForgotPass}
                />
        } else if (this.state.display === "emailForgot") {
            return <LoginPageForgotPass
                handleEmailSignIn={this.handleEmailSignIn}
                />
        }
    }

    render() {
        return (
            <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Right-To-Know Tracker</h1>
                    <TransitionGroup
                        key={this.state.display}
                    >
                        <CSSTransition
                            in={this.state.appearHome}
                            appear={true}
                            classNames="fade"
                            timeout={300}
                        >
                            {this.displayBox}
                        </CSSTransition>
                    </TransitionGroup>
            </div>
        </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    clearErrors: () => dispatch(clearErrors())
})


export default connect(undefined,mapDispatchToProps)(LoginPage)


