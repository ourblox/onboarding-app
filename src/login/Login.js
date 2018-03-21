import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm.js';

const Admins = ['ali', 'pete', 'sam', 'blox_admin', 'aliblackwell'];
class Login extends Component {
  logInUser = user => {
    if (user.username) {
      const db = this.props.loginDb;
      const buildingSlug = this.props.buildingSlug;
      let username = user.username.toLowerCase();
      if (Admins.indexOf(username) < 0) {
        username = `${username}-${buildingSlug}`;
      }

      db.login(username, user.password, (err, response) => {
        if (err) {
          console.debug(err);
          return false;
        } else {
          this.props.handleLogin();
          return true;
        }
      });
    }
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
