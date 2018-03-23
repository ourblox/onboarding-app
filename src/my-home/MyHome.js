import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateHomeForm from '../create-home/CreateHomeForm';
import './MyHome.css';

class MyHome extends Component {
  static propTypes = {
    localDb: PropTypes.object.isRequired,
    buildingSlug: PropTypes.string.isRequired,
    buildingName: PropTypes.string.isRequired,
    flatNumber: PropTypes.string
  };

  state = {
    ready: false
  };

  componentDidMount() {
    this.setState({
      ready: true
    });
  }

  render() {
    const { localDb, buildingName, buildingSlug, flatNumber } = this.props;
    const { ready } = this.state;
    return (
      <div className="MyHome ContentContainer">
        <h2>Your information</h2>
        {ready &&
          flatNumber && (
            <CreateHomeForm
              localDb={localDb}
              buildingName={buildingName}
              buildingSlug={buildingSlug}
              flatNumber={flatNumber}
            />
          )}
      </div>
    );
  }
}

export default MyHome;
