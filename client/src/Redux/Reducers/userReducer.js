import {GET_USERS, GET_PROFILE, FILTER_USERS_BY_FULLNAME} from '../actions/ActionTypes';

const initialState = {
    users: [],  //all users
    UserString:"",
    
};


const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_USERS:
        return {
        ...state,
        users: payload
        };

        case GET_PROFILE:
        return {
        ...state,
        users: [payload]
        };

        case FILTER_USERS_BY_FULLNAME: 
        return {
        ...state, UserString: payload
    }

        default:
        return state;
    }
};

export default userReducer;