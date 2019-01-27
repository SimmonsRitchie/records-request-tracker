import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth.js';
import requestsReducer from '../reducers/requests.js';

// STORE CREATION
// Using combineReducers allows us to unite all our reducers.
// We want to split up reducers because it makes the code easier to read.

// The 'window.__' line allows redux to display with the Redux dev tool
// when we're inspecting our code in Chrome.

// We've added 'applyMiddleware' to allow redux to work with Thunk.
// Because we want to preserve Redux's ability to work with redux_devtools,
// this makes the code a bit confusing.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            requests: requestsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


