import React from 'react';

export class AccountChangePass extends React.Component {
    state = {
        newPass1: "",
        newPass2: "",
        msg: ""
    }
    handleChangePass = () => {
            if (this.state.newPass1 !== this.state.newPass2) {
                this.setState(() => ({
                    msg: "Password fields don't match. Retype new password"
                }))   
            } else {
                this.props.user.updatePassword(this.state.newPass1).then(() => {
                        console.log("Password changed")    
                        this.setState(() => ({
                            msg: "Password changed"
                        }))   
                }).catch((error) => {
                        console.log("Password unchanged")
                        this.setState(() => ({
                            msg: error.message
                        }))
            })
        }
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="account__container">
                <input
                    name="newPass1"
                    type="password"
                    className="text-input"
                    placeholder="Enter new password"
                    onChange={this.handleOnChange}
                    value={this.state.newPass1}
                />
                <input
                    name="newPass2"
                    type="password"
                    className="text-input"
                    placeholder="Confirm new password"
                    onChange={this.handleOnChange}
                    value={this.state.newPass2}
                />
                {this.state.msg && <p className="form__error">{this.state.msg}</p>}
                <button
                    className="button"
                    onClick={this.handleChangePass}
                >
                    Set new password
                </button>
            </div> 
        )
    }
}
