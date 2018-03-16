import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
  componentDidMount = () => {
    this.props.setBuildingName('reset');
  };
  render() {
    return (
      <div className="Welcome ContentContainer">
        <p>
          Blox is the social network for buildings. Our first tool is Blox Pool,
          enabling people to save money on their energy by working together to
          bargain collectively.
        </p>
        <p>
          We are running pilot projects at the following addresses. If you have
          met one of our team or been left a card, please choose your address to
          proceed.
        </p>
        <ul>
          <li>
            <NavLink to="/cdh">Charles Dickens House</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Welcome;
