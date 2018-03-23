import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreateUser.css';
import CreateUserForm from '../login/LoginForm.js';

class CreateUser extends Component {
  static propTypes = {
    remoteDb: PropTypes.object.isRequired,
    buildingSlug: PropTypes.string.isRequired
  };

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
    const { buildingSlug, remoteDb } = this.props;
    if (user.username) {
      const username = `${user.username}-${buildingSlug}`;
      remoteDb.signup(username, user.password, (err, response) => {
        if (err) {
          this.setState({
            message: err.message
          });
          return false;
        } else {
          this.setState({
            message: `Created user ${username} with password ${user.password}`
          });
          remoteDb
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
                remoteDb
                  .post(doc)
                  .then(response => {
                    this.setState({
                      message: `Created user ${username} with password ${
                        user.password
                      }. Added user to list of doors knocked.`
                    });
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
    const { message } = this.state;
    return (
      <div className="CreateUser">
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
