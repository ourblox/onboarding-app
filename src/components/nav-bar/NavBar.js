import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    buildingSlug: PropTypes.string,
    flatNumber: PropTypes.string
  };

  render() {
    const { loggedIn, admin, buildingSlug, flatNumber } = this.props;
    const slugURL = `/${buildingSlug}`;
    return (
      <nav className="NavBar">
        {!loggedIn && (
          <ul>
            {buildingSlug && (
              <li>
                <NavLink exact to={slugURL}>
                  B
                </NavLink>
              </li>
            )}

            {!buildingSlug && (
              <li>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/blox-faqs">FAQs</NavLink>
            </li>

            <li>
              <NavLink to="/privacy">Privacy</NavLink>
            </li>
          </ul>
        )}
        {loggedIn &&
          !admin && (
            <ul>
              <li>
                <NavLink exact to="/dashboard">
                  B
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-home">No. {flatNumber}</NavLink>
              </li>
              <li>
                <NavLink to="/blox-faqs">FAQs</NavLink>
              </li>
              <li>
                <NavLink to="/privacy">Privacy</NavLink>
              </li>
            </ul>
          )}
        {loggedIn &&
          admin && (
            <ul>
              <li>
                <NavLink exact to="/dashboard">
                  B
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-home">+ Home</NavLink>
              </li>
              <li>
                <NavLink to="/add-user">+ User</NavLink>
              </li>
            </ul>
          )}
      </nav>
    );
  }
}
export default NavBar;
