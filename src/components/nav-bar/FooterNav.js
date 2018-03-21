import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class FooterNav extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <nav className="NavBar">
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
