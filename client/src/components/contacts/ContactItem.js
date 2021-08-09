// this file will be acting as the main entry point into the application for the contact list

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Import contactContext to delete the contact from the contact list
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  // delete contact
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrentContact } = contactContext;

  // add value to contact and pass them dynamically
  const { name, id, email, phone, type } = contact;
  //delete contact for the onClick method
  const onDelete = () => {
    deleteContact(id);
  };
  //editing the contact form and pass in  as function in the edit part of  jsx

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      {/* adding icons for contact */}
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelop-open' />
            {email}
          </li>
        )}
      </ul>
      <ul className='list'>
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {phone}
          </li>
        )}
      </ul>
      {/* adding the edit and delete button */}
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentContact(contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
ContactItem.propTypes = { contact: PropTypes.object.isRequired };
export default ContactItem;
