import React, { useState, useContext, useEffect} from 'react';

//! import AlertContext
import AlertContext from '../../context/alert/alertContext';

//! imort AuthContext in order to use the Auth reducer
import AuthContext from '../../context/auth/authContext';
const Register = (props) => {
  //!set up AlertContext here

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated} = authContext;
  

  //! CLEAR_ERRORS
  useEffect(() => {
    if (isAuthenticated) {
      
     props.history.push('/');
     
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  
  
  

  //! set up the register form and the objects that will be returned
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: ''
  });
  //! destructuring the objects from the useState
  const { name, email, password, newPassword } = user;

  //! Create the onChange method
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  //! Create Onsubmit if name email or password does not match or incorrect then submit the setAlert component
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== newPassword) {
      setAlert('The password does not match', 'danger');
    } else {
      register({ name, email, password});
       }
      
    }
 

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='newPassword'>Confirm Password</label>
          <input
            id='newPassword'
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register; //! export to App.js
