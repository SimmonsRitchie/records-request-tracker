import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { login, logout } from './actions/auth';
import { startSetRequests } from './actions/requests'
import LoadingPage from './components/LoadingPage'

const store = configureStore();

// CONNECTING STORE TO PROVIDER
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

/* RENDERAPP
Function checks to see whether we have already rendered the page
if we have, it ensures we don't render it again. */
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
// We use 'login' and 'logout' actions in the function below
// because we want to login the user if they've visted the app
// before and they're already logged in. Without them, it means a
// user would have to explicitly login to the app everytime.

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
            console.log("Redirecting user to unverified page")
            renderApp()
            history.push('/unverified')
        }

    } else {
        store.dispatch(logout())
        renderApp();
        history.push('/');
    }
})

