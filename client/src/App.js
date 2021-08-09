import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';

import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';

import SetAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  SetAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <NavBar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
