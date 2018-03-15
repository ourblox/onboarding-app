import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateHomeForm from '../create-home/CreateHomeForm';

import './MyHome.css';

class MyHome extends Component {
  state = {
    flatNumber: 123 // Needs working out based on their username
  };

  render() {
    const { buildingName } = this.props;
    const { flatNumber } = this.state;
    return (
      <div className="MyHome ContentContainer">
        {!this.props.loggedIn && <Redirect to="/login" />}
        <CreateHomeForm
          db={this.props.db}
          flatNumber={flatNumber}
          buildingName={buildingName}
        />
      </div>
    );
  }
}

export default MyHome;
