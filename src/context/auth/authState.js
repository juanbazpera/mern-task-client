import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOG_OUT,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    user: null,
    message: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const userRegister = async (data) => {
    try {
      const response = await axiosClient.post('/api/users', data);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      getUserAuth();
      console.log(response.data);
    } catch (err) {
      const alert = {
        msg: err.response.data.msg,
        category: 'alerta-error',
      };
      dispatch({ type: REGISTER_ERROR, payload: alert });
    }
  };

  const getUserAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get('api/auth');
      dispatch({ type: GET_USER, payload: response.data.user });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_ERROR,
      });
    }
  };

  // When user login
  const login = async (data) => {
    try {
      const response = await axiosClient.post('/api/auth', data);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      getUserAuth();
    } catch (err) {
      console.log(err.response);
      const alert = {
        msg: err.response.data.msg,
        category: 'alerta-error',
      };
      dispatch({ type: LOGIN_ERROR, payload: alert });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOG_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
        loading: state.loading,
        userRegister,
        login,
        getUserAuth,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
