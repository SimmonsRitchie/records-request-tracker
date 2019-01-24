import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

/*
CHECKING WHETHER USER IS LOGGED IN
This component is very similar to PrivateRoute but inversed.
If a user who is logged in goes to this page (eg. '/', where
we currently display our LoginPage component) then they'll
be redirected to the dashboard.
If the user is not logged in, then we'll just display whatever
component they were trying to access.

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

// If a user ID is on state, then we're logged in
// and isAuthenticated returns true.
// We use the '!!' trick here, which means that
// undefined values (ie. no user ID exists) will return as
// false.
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)