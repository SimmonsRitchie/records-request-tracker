import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


// CHECKING WHETHER USER IS LOGGED IN
// This component determines whether user ID is on state.
// It works as follows
// 1) In parameters, we destructure the props. We get isAuthenticated from our redux
// store. We also destructure the component (we use component: Component)
// because components should be capitalized. We then use '...rest' to pull
// off all the other props being sent down from AppRouter.
// 2) We return <Route/> component and, in it, we first pass in '...rest'
// so that all the props we didn't destructure are sent onwards.
// 3) We then set up a 'component' prop and, in it, we create a new
// function. It takes in props, checks whether 'isAuthenticated' is true
// if so, then it displays the Header component and whatever component
// was passed into it, including all the props.
// 4) If user isn't authenticated, then they're redirected to the root.

export const PrivateRoute = ({ 
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props}/>
                <Footer />
            </div>
        ) : (
            <Redirect to="/" />
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

export default connect(mapStateToProps)(PrivateRoute)