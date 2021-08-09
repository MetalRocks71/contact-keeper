//!This file is to have access to state and dispatch functions by using useReducer

import React, { useReducer } from 'react';

//!import UUID

import { v4 as uuidv4 } from 'uuid';

//!import Auth context

import AlertContext from './alertContext';

//!import Reducer

import AlertReducer from './alertReducer';

//! import {} types and  add to the AlertReducer
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  //! Create the reducer to pass and dispatch the action to the reducer

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //!SET_ALERT
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  //!REMOVE_ALERT;

  //Anything we want to access from other components including state and actions needs to go here below in the value
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState; //! import in App.js
