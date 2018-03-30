import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class FooterNav extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <nav className="NavBar FooterNav">
        <ul>
          <li>
            <NavLink to="/privacy">Privacy</NavLink>
          </li>
          {loggedIn && (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
export default FooterNav;
