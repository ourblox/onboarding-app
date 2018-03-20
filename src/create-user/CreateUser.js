import React, { Component } from 'react';
import './CreateUser.css';
import { Redirect } from 'react-router-dom';
import CreateUserForm from '../login/LoginForm.js';

class CreateUser extends Component {
  createUser = user => {
    if (user.username) {
      const db = this.props.remoteDb;

      db.signup(user.username, user.password, (err, response) => {
        if (err) {
          console.debug(err);
          return false;
        } else {
          return true;
        }
      });
    }
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <div className="CreateUser">
        {!loggedIn && <Redirect to="/login" />}
        <CreateUserForm formType="SIGN_UP" handleSubmit={this.createUser} />
      </div>
    );
  }
}

export default CreateUser;
