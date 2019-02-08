import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin } from '../actions/auth'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import LoginPageInitial from './LoginPageInitial'
import LoginPageEmailSignUp from './LoginPageEmailSignUp'
import LoginPageEmailSignIn from './LoginPageEmailSignIn'



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "loginInitial",
            appearHome: true
        }
    };

    handleEmailLogin = () => {
        this.setState(() => ({
            display: "emailSignIn"
        }))     
    };

    handleGoogleLogin = () => {
        console.log("Logging in with google!")
        this.props.startGoogleLogin()
    };

    handleEmailSignUp= () => {
        this.setState(() => ({
            display: "emailSignUp"
        }))     
    };

    handleBackToStart = () => {
        this.setState(() => ({
            display: "loginInitial",
        }))     
    }



    displayBox = () => {
        if (this.state.display === "loginInitial") {
            return <LoginPageInitial
                handleEmailLogin={this.handleEmailLogin}
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
    startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)


