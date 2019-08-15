import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { firebase } from '../firebase/firebase'

/* 
AUTHENTICATION
This component determines whether user ID is on state and that the user's email address is verified.
It works as follows:
1) We destructure the props. We get isAuthenticated from our redux
store. We also destructure the component (we use component: Component)
We then use '...rest' to pull off all the other props being sent down from
AppRouter.
2) We return <Route/> component and, in it, we first pass in '...rest'
so that all the props we didn't destructure are sent onwards.
3) We then set up a 'component' prop and, in it, we create a new
function. It takes in props, checks whether 'isAuthenticated' is true.
If so, then it displays the Header, Footer components and whatever component
was passed down to it, including all the props. (ie. the user can view the 'private route')
4) If user is signed into Firebase but their email isn't verified, acess is denied.
They're redirected to 'EmailUnverifiedPage'.
5) If a user isn't signed in at all, they're redirected to the index of the app where
they can sign in or sign up.
*/


export const PrivateRoute = ({ 
    isAuthenticated,
    notVerified,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => 
        {if (notVerified) {
            return <Redirect to='/unverified' />
        } else if (isAuthenticated) {
            return <div className="main-container">
                <Header />
                <Component {...props}/>
                <Footer />
            </div>            
        } else {
            return <Redirect to='/' />
        }        
    }
    }/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid && firebase.auth().currentUser.emailVerified,
    notVerified: !!state.auth.uid && !firebase.auth().currentUser.emailVerified
})

export default connect(mapStateToProps)(PrivateRoute)

