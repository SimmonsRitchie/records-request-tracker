const requestsReducerDefaultState = []

export default (state = requestsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_REQUEST':
            return [
                ...state,
                action.request
            ];
        case 'EDIT_REQUEST': // Goes through requests array and replaces updates only for item with ID that matches
            return state.map((request) => {
                if (request.id === action.id) {
                    return {
                        ...request,
                        ...action.updates
                    }
                } else {
                    return request;
                };
            });
        case 'REMOVE_REQUEST':
            return state.filter(request => request.id !== action.id);
        case 'SET_REQUESTS':
            return action.requests
    default:
            return state;
    }
}