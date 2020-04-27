import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOG_OUT,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        auth: true,
        message: null,
        loading: false,
      };
    case LOG_OUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        auth: null,
        loading: false,
        message: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
