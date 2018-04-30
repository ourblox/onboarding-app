import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../blox.svg';

import './Splash.css';

class Splash extends Component {
  static propTypes = {
    buildingSlug: PropTypes.string,
    setBuildingName: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    const { setBuildingName } = this.props;
    const buildingSlug = this.props.match.params.buildingSlug;
    if (buildingSlug) {
      setBuildingName(buildingSlug);
    }
  };

  render() {
    const { buildingSlug } = this.props;
    const nextPage = buildingSlug ? '/login' : '/welcome';
    return (
      <div className="Splash BoxContainer">
        <img src={logo} className="App-logo" alt="Blox" />
        <Link className="BigButton" to={nextPage}>
          Begin...
        </Link>
      </div>
    );
  }
}

export default Splash;
