import React, { Component } from 'react';
import './CreateUser.css';
import { Redirect } from 'react-router-dom';
import CreateUserForm from '../login/LoginForm.js';

class CreateUser extends Component {
  state = {
    created: false,
    message: null
  };

  dismissMessage = () => {
    this.setState({
      message: null
    });
  };

  createUser = user => {
    const buildingSlug = this.props.buildingSlug;
    if (user.username) {
      const db = this.props.remoteDb;
      const username = `${user.username}-${buildingSlug}`;

      db.signup(username, user.password, (err, response) => {
        if (err) {
          this.setState({
            message: err.message
          });
          return false;
        } else {
          this.setState({
            message: `Created user ${username} with password ${user.password}`
          });
          db
            .get(buildingSlug)
            .then(doc => {
              if (doc) {
                if (doc[username]) {
                  this.setState({
                    message: `Created user ${username} with password ${
                      user.password
                    }. Housing record for user already exists. Doing nothing more.`
                  });
                  return;
                } else {
                  doc[username] = 'created';
                }
                db
                  .post(doc)
                  .then(response => {
                    this.setState({
                      message: `Created user ${username} with password ${
                        user.password
                      }. Added user to list of doorks knocked.`
                    });
                    console.log(response);
                  })
                  .catch(err => console.debug(err));
              }
            })
            .catch(err => console.debug(err));
          return true;
        }
      });
    }
  };

  render() {
    const { loggedIn } = this.props;
    const message = this.state.message;
    return (
      <div className="CreateUser">
        {!loggedIn && <Redirect to="/login" />}
        {message && (
          <div className="CreateUser-messages BoxContainer">
            <p>{message}</p>
            <button onClick={this.dismissMessage}>Dismiss</button>
          </div>
        )}
        <CreateUserForm formType="SIGN_UP" handleSubmit={this.createUser} />
      </div>
    );
  }
}

export default CreateUser;
