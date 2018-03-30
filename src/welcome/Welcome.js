import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
  static propTypes = {
    buildingSlug: PropTypes.string,
    setBuildingName: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.setBuildingName('reset');
  };

  componentWillUnmount = () => {
    const { buildingSlug, setBuildingName } = this.props;
    if (buildingSlug) {
      setBuildingName(buildingSlug);
    }
  };
  render() {
    return (
      <div className="Welcome ContentContainer">
        <h2>Introducing Blox Pool</h2>
        <p>
          Our first tool is Blox Pool, enabling people to save money on their
          energy by working together to bargain collectively.
        </p>
        <p>
          We are running pilot projects at the following addresses. If you have
          met one of our team or been left a card, please choose your address to
          proceed.
        </p>
        <ul className="Welcome-ButtonList">
          <li>
            <Link className="BigButton" to="/wph">
              Welshpool House
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Welcome;
