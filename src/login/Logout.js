import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount = () => {
    this.props.db.logout((err, response) => {
      if (err) {
        console.debug(err);
      } else {
        this.props.handleLogout(response);
      }
    });
  };

  render() {
    const { loggedIn } = this.props;
    return !loggedIn && <Redirect to="/login" />;
  }
}

export default Logout;
