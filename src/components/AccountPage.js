import React from 'react';
import {firebase} from '../firebase/firebase'
import PageHeader from './PageHeader'
import {AccountChangePass} from './AccountChangePass'


class AccountPage extends React.Component {
    state = {
        changePass: false
    }
    handleChangePass = () => {
        this.setState(() => ({
            changePass: !this.state.changePass
        }))   
    }

    render() {
        const user = firebase.auth().currentUser

        return (
            <div>
                <PageHeader 
                    pageTitle={"Account settings"}
                />
                <div className="content-container">
                    <h3>Email address: </h3>
                    <p>{user.email}</p>
                    <h3>Display name:</h3>
                    <p>{user.displayName ? user.displayName : "No display name set"}</p>
                    <button
                        className="button"
                        onClick={this.handleChangePass}
                    >
                        Change password
                    </button>
                    {this.state.changePass && <AccountChangePass user={user} />}
                </div>
            </div> 
        )
    }
}


export default AccountPage
