//!This file will use to add and update contacts
//! Bring the useState as we need for the form to bring some state

import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

function ContactForm() {
  const contactContext = useContext(ContactContext);

  //! Add contact to the list

  const { addContact, current, clearCurrentContact, updateContact } = contactContext;

  //! create a useEffect to add contact with conditions

  useEffect(
    (contactContext) => {
      if (current !== null) {
        setContact(current);
      } else {
        setContact({
          name: '',
          email: '',
          phone: '',
          type: 'personal',
        });
      }
    },
    [current]
  );

  //! create a usestate with its objects  its represent the form

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  //! we need to extract the value of the object to contact of the useState
  const { name, email, phone, type } = contact;

  //! Set the onChange thru the setContact in the useState
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  //! Set the onSubmit thru the Contact in the useState
  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();

    //! we need now to pass the object value to update the data onSubmit to the setContact

    // setContact({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   type: 'personal',
    // });
  };

  //! create clearAll method
  const clearAll = () => {
    clearCurrentContact();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit contact' : 'Add contact'}
      </h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal {''}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional {''}
      <div>
        <input
          type='submit'
          value={current ? 'update contact' : 'Add contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
