import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm.js';

const Admins = ['ali', 'pete', 'sam', 'blox_admin', 'aliblackwell'];
class Login extends Component {
  state = {
    message: null,
    admin: false
  };

  dismissMessage = () => {
    this.setState({
      message: null
    });
  };

  logInUser = user => {
    if (user.username) {
      const db = this.props.loginDb;
      const buildingSlug = this.props.buildingSlug;
      let username = user.username.toLowerCase();
      if (Admins.indexOf(username) < 0) {
        username = `${username}-${buildingSlug}`;
      } else {
        this.setState({
          admin: true
        });
      }

      db.login(username, user.password, (err, response) => {
        if (err) {
          console.debug(err);
          this.setState({
            message: "Your access code wasn't recognised. Please try again."
          });
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
    const { message, admin } = this.state;
    return (
      <div className="Login">
        {!loggedIn && (
          <div>
            {message && (
              <div className="CreateUser-messages BoxContainer">
                <p>{message}</p>
                <button onClick={this.dismissMessage}>Dismiss</button>
              </div>
            )}
            <LoginForm formType="LOGIN" handleSubmit={this.logInUser} />
          </div>
        )}
        {loggedIn && !admin && <Redirect to="/my-home" />}
        {loggedIn && admin && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

export default Login;
