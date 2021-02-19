import {
    USER_LOADING,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    GET_AUTH_USER,
    AUTH_ERRORS
  } from '../actions/ActionTypes';
  
  const initialState = {
    token: localStorage.getItem('x-auth-token'), 
    user: null, //authentificated user
    isAuth: false,
    isLoading: true,
    msg: null,
  };
  
  const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };

      case REGISTER_USER:
      case LOGIN_USER:
        localStorage.setItem('x-auth-token', payload.token);
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          msg: payload.msg,
          ...payload,
        };

      case GET_AUTH_USER:
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          ...payload,
        };
      
      case AUTH_ERRORS:
      case LOGOUT_USER:
        localStorage.removeItem('x-auth-token');
        return {
          ...state,
          token: null,
          isAuth: false,
          user: null,
          isLoading: false,
        };

      default:
        return state;
    }
  };
  
  export default authReducer;