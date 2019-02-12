import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // We use this component to connect redux to react
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { login, logout, verifyMsg, startLogout } from './actions/auth';
import { startSetRequests } from './actions/requests'
import LoadingPage from './components/LoadingPage'

// Making some small changes to test out git branch.

// Adding a new feature!

// Adding a second, additional feature.
// Added something extra to this new feature.
// Added a final tweak to release version 0.1.0


// CALLING STORE
const store = configureStore();

// CONNECTING STORE TO PROVIDER
// By wrapping 'AppRouter' component with 'Provider' and passing in store
// We're able to access redux store across all child components in AppRouter.
// We use 'Connect' in those components to grab info from store.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// FOR TESTING PURPOSES
// store.dispatch(addRequest({description: 'Campaign finance data', agency: 'Dept of State', details: 'blah blah blah blah blah', createdAt: moment()}))
// store.dispatch(addRequest({description: 'Use of force reports', agency: 'Harrisburg PD',
//     details: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah', createdAt: moment()}))


// RENDERAPP
// Function below checks to see whether we have already rendered the page
// if we have, it ensures we don't render it again.
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true;
    }
};

// LOADING PAGE
ReactDOM.render(<LoadingPage />, document.getElementById('app'))


// AUTHENTICATION + RENDER
// NOTE: We use 'login' and 'logout' actions in the function below
// because we want to login the user if they've visted the app
// before and they're already logged in. Without them, it means that a
// user would have to explicitly login to the app everytime.
//
// This is what happens below:
// 1) Checks whether user is logged in (which would have been triggered
// by startLogin action in Login component)
// 2) If so, we dispatch 'login' action, which stores user ID in Redux store.
// 3) We then render the app after we've got
// the expenses back from the server using renderApp(). this function,
// defined above, only renders the app if we haven't rendered it before.
// 4) If the user is on the homepage (root page), then the user is
// automatically redirected to the dashboard using history.push
// (this works because of changes we made to AppRouter to use history)

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            console.log("user's email address is verified")
            store.dispatch(login(user.uid))
            store.dispatch(startSetRequests()).then(() => {
                renderApp();
                if (history.location.pathname === '/') {
                    history.push('/dashboard')
                }
            })        
        } else {
            console.log("user's email isn't verified")
            console.log("logging out user")
            store.dispatch(startLogout())
        }

    } else {
        store.dispatch(logout())
        renderApp();
        history.push('/');
    }
})

