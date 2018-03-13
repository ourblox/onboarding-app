import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import './Signup.css';
import SignupForm from '../login/LoginForm.js';

class Signup extends Component {

  createUser = (user) => {
    const db = this.props.db;
    db.signup(user.username, user.password, ( err, response) => {
      if (err) {
        console.debug(err);
        return false;
      } else {
        console.log(response);
        return true;
      }
    })
  }

  render() {
    const { loggedIn } = this.props;
    return (
    <div className="Signup">
      <div>
        <h2>Create User</h2>
        <SignupForm formType="SIGN_UP" handleSubmit={this.createUser}/>
      </div>
    </div>

    );
  }
}

export default Signup;
