//!This file is to have access to state and dispatch functions by using useReducer

import React, { useReducer } from 'react';
//! import axios
import axios from 'axios';

//!import Auth context

import AuthContext from './authContext';

//!import Reducer

import AuthReducer from './authReducer';

//! import setAuthToken

import SetAuthToken from '../../utils/setAuthToken';

//! import {} types and  add to the AuthReducer
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'), //! this will give access to our local storage
    isAuthenticated: null, //! this will tell us if we are logged in or not
    loading: true, //! before we fetch the loading method is set to true
    error: null, //!if we get an error from the reducer
    user: null, //! if the user exist in the local storage
  };

  //! Create the reducer to pass and dispatch the action to the reducer

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //! REGISTER_SUCCESS (user) formData is data to register the user and then because we post data we need to create the user so we create a headers with content-type 'application/json' The code referred to the userR.js file and the post method link to the user

  //! Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // it is the token that we need to create the user in the DB
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //! USER_LOADED (user)
  const loadUser = async () => {
    //@ todo  - load token to a global headers
    //@ todo - do not forget to create a authorization for the token setAuthToken.js

    if (localStorage.token) {
      SetAuthToken(localStorage.token); // export to App.js
    }

    try {
      const res = await axios.get('/api/auth'); // if ok then dispatch
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  //! AUTH_ERROR
  //! LOGIN_SUCCESS &&  //! LOGIN_FAIL
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', //! this where the token is send thru the headers
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // it is the token that we need to create the user in the DB
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //! LOGOUT
  const logout = () =>dispatch({
    type: LOGOUT})

  //! CLEAR_ERRORS
  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERRORS,
    });

  //Anything we want to access from other components including state and actions needs to go here below in the value
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
       
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState; //! import in App.js
