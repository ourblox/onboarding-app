import React, { Component } from 'react';
import './Signup.css';
import { Redirect } from 'react-router-dom';
import SignupForm from '../login/LoginForm.js';

class Signup extends Component {
  createUser = user => {
    const db = this.props.remoteDb;
    db.signup(user.username, user.password, (err, response) => {
      if (err) {
        console.debug(err);
        return false;
      } else {
        return true;
      }
    });
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <div className="Signup">
        {!loggedIn && <Redirect to="/login" />}
        <SignupForm formType="SIGN_UP" handleSubmit={this.createUser} />
      </div>
    );
  }
}

export default Signup;
