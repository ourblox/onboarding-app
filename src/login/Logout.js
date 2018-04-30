import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  static propTypes = {
    loggedOut: PropTypes.bool,
    remoteDb: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const { remoteDb, handleLogout } = this.props;
    remoteDb.logout((err, response) => {
      if (err) {
        console.debug(err);
      } else {
        handleLogout(response);
      }
    });
  };

  render() {
    const { loggedIn } = this.props;
    return !loggedIn && <Redirect to="/" />;
  }
}

export default Logout;
