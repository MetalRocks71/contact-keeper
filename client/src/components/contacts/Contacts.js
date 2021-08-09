import React, { Fragment, useContext } from 'react';
//!import CSS transition
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//! Import contactItems
import ContactItem from './ContactItem';
//! import contactContext

import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  //!initialize context and now we have access to any action assiociated with contactContext

  const contactContext = useContext(ContactContext);

  //! pull out with the destructuring methods

  const { contacts, filtered } = contactContext;

  //! if there is no contact add one to contact

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {/* create an expression to filter the contact */}
        {/* Create the expression for contact name by id*/}

        {filtered != null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts; // import to the home.js
