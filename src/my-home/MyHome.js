import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateHomeForm from '../create-home/CreateHomeForm';

import './MyHome.css';

class MyHome extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    this.setState({
      ready: true
    });
  }

  render() {
    const { buildingName, buildingSlug, username } = this.props;
    let flatNumber = 1;
    const { ready } = this.state;
    if (username) {
      flatNumber = username.split(`-${buildingSlug}`)[0];
    }
    return (
      <div className="MyHome ContentContainer">
        <h2>Your information</h2>
        {!this.props.loggedIn && <Redirect to="/login" />}
        {ready &&
          username && (
            <CreateHomeForm
              db={this.props.db}
              flatNumber={flatNumber}
              buildingName={buildingName}
              buildingSlug={buildingSlug}
            />
          )}
      </div>
    );
  }
}

export default MyHome;
