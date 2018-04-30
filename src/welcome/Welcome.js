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
    const { setBuildingName } = this.props;
    return (
      <div className="Welcome ContentContainer">
        <p>We are Blox. We are going to save you money.</p>
        <ul className="Welcome-ButtonList">
          <li>
            <Link
              className="BigButton"
              to="/login"
              onClick={() => setBuildingName('wph')}
            >
              Welshpool House
            </Link>
          </li>
          <li>
            <Link
              className="BigButton"
              to="/login"
              onClick={() => setBuildingName('vdg')}
            >
              Verdigris Apartments
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Welcome;
