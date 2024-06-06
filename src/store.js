import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './redux/reducers/userReducers';
import { jobPostReducer } from './redux/reducers/gatePassPostReducer';

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    jobpost: jobPostReducer,
});

let initialState = {
    user: {
        name: '',
        email: '',
    }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;
