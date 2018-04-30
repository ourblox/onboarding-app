import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  static propTypes = {
    flatNumber: PropTypes.number,
    buildingName: PropTypes.string
  };

  render() {
    const { buildingName, buildingNumber } = this.props;
    return (
      <header className="Header">
        <h2 className="Header-BuildingName">
          {flatNumber ? flatNumber : null} {buildingName}
        </h2>
      </header>
    );
  }
}
export default Header;
