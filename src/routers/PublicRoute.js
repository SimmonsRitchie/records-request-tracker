import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

/*
CHECKING WHETHER USER IS LOGGED IN
This component is very similar to PrivateRoute but inversed. It handles
routes that a user can visit regardless of whether they're authenticated.

If a user who is authenticated goes to a public route (eg. '/', where
we currently display our LoginPage component) then they'll
be redirected to the dashboard.

If the user is not logged in, then we'll just display whatever
component they're trying to access.

*/

export const PublicRoute = ({ 
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <div>
                <Component {...props}/>
            </div>
        )
    )}/>
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid && firebase.auth().currentUser.emailVerified
})

export default connect(mapStateToProps)(PublicRoute)