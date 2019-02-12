import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage';
import AddRequestPage from '../components/AddRequestPage';
import EditRequestPage from '../components/EditRequestPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import RtkGuidePage from '../components/RtkGuidePage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AccountPage from '../components/AccountPage';

export const history = createHistory();

// NOTE
// Router was 'BrowserRouter' in a an earlier version of this program
// We changed it and passed in history as a prop (from the history module)
// because it allows us to redirect to pages after logging in/logging out from the app.js file.
// We couldn't do that before
 const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/rtkguide" component={RtkGuidePage}/>
                <PrivateRoute path="/account" component={AccountPage}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/create" component={AddRequestPage} />
                <PrivateRoute path="/edit/:id" component={EditRequestPage} />
                <Route component={NotFoundPage}/>
            </Switch>    
        </div>
    </Router>
 );

 export default AppRouter;