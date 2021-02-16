import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utitlity";

const initialState = {
    token: null,
    error: null,
    loading: false,
    admin_priority: false,
    subscriber_priority: false,
    journalist_priority: false

}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        admin_priority: action.admin_priority,
        subscriber_priority: action.subscriber_priority,
        journalist_priority: action.journalist_priority,
        error: null,
        loading: false,
    });
}


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        admin_priority: false,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
