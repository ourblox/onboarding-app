import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.js';
import './Login.css';

const Admins = ['ali', 'pete', 'sam', 'blox_admin', 'aliblackwell'];
class Login extends Component {
  static propTypes = {
    loginDb: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    buildingSlug: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired
  };

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
      const { loginDb, buildingSlug, handleLogin } = this.props;
      let username = user.username.toLowerCase();
      if (Admins.indexOf(username) < 0) {
        username = `${username}-${buildingSlug}`;
      } else {
        this.setState({
          admin: true
        });
      }

      loginDb.login(username, user.password, (err, response) => {
        if (err) {
          console.debug(err);
          this.setState({
            message: "Your access code wasn't recognised. Please try again."
          });
          return false;
        } else {
          handleLogin();
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
