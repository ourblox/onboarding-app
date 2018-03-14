import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import LoginForm from './LoginForm.js';

class Login extends Component {
  logInUser = user => {
    const db = this.props.db;
    db.login(user.username, user.password, (err, response) => {
      if (err) {
        console.debug(err);
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
            <h2>Please Login</h2>
            <LoginForm formType="LOGIN" handleSubmit={this.logInUser} />
          </div>
        )}
        {loggedIn && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

export default Login;
