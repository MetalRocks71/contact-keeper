//!This file is to have access to state and dispatch functions by using useReducer

import React, { useReducer } from 'react';

//!Generating random ID

import { v4 as uuidv4 } from 'uuid';

//!import contact context

import ContactContext from './contactContext';

//!import Reducer

import ContactReducer from './contactReducer';

//! import {} types and  add to the contactReducer
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,

} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-1111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Joe Johnson',
        email: 'joe@gmail.com',
        phone: '111-1111-222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'James Johnson',
        email: 'james@gmail.com',
        phone: '111-1111-333',
        type: 'professional',
      },
    ],
    current: null, //! This method will help to edit whatever is inside the contact
    filtered: null, //! This method will help to filter the contact list
  };
  // Create the reducer to pass and dispatch the action to the reducer

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //!ADD_CONTACTS
  const addContact = (contact) => {
    contact.id = uuidv4(); // add userrandom user id
    dispatch({ type: ADD_CONTACT, payload: contact }); // dispatch to the reducer
  };

  //! DELETE_CONTACT
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id }); // dispatch to the reducer
  };

  //! SET_CURRENT

  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact }); // dispatch to the reducer
  };

  //!CLEAR_CURRENT

  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT }); // dispatch to the reducer
  };

  //!UPDATE_CONTACT

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact }); // dispatch to the reducer
  };

  //!FILTER_CONTACTS
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text }); // dispatch to the reducer
  };

  //! CLEAR_FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER }); // dispatch to the reducer
  };

  //Anything we want to access from other components including state and actions needs to go here below in the value
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filter,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState; //! import in App.js
