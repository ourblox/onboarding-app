import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    const { loggedIn, admin } = this.props;
    return (
      <nav className="NavBar">
        {!loggedIn && (
          <ul>
            <li>
              <NavLink to="/about-blox">About</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        )}
        {loggedIn &&
          !admin && (
            <ul>
              <li>
                <NavLink exact to="/">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-home">My Home</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </ul>
          )}
        {loggedIn &&
          admin && (
            <ul>
              <li>
                <NavLink exact to="/">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-home">+ Home</NavLink>
              </li>
              <li>
                <NavLink to="/add-user">+ User</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </ul>
          )}
      </nav>
    );
  }
}
export default NavBar;
