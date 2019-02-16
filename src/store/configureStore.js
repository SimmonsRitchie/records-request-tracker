import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth.js';
import requestsReducer from '../reducers/requests.js';
import filtersReducer from '../reducers/filters.js'

/* STORE CREATION

Note: 'window.__' allows redux to display with the Redux dev tool
when we're inspecting our code in Chrome.

We've also added 'applyMiddleware' to allow redux to work with Thunk.
Because we want to preserve Redux's ability to work with redux_devtools,
this makes the code a bit confusing.
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            requests: requestsReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


