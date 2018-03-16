import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm.js';

class Login extends Component {
  logInUser = user => {
    const remoteDb = this.props.remoteDb;
    remoteDb.login(user.username, user.password, (err, response) => {
      console.log('HELLO?');
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log(response);
        this.props.handleLogin();
        return true;
      }
    });
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <div className="Login">
        {!loggedIn && (
          <div>
            <LoginForm formType="LOGIN" handleSubmit={this.logInUser} />
          </div>
        )}
        {loggedIn && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

export default Login;
