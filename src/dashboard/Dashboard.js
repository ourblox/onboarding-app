import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    checked: false,
    building: null,
    signedUp: 0
  };

  componentDidMount = () => {
    const { db, buildingSlug } = this.props;
    if (buildingSlug) {
      db
        .allDocs({
          include_docs: true,
          startkey: buildingSlug,
          endkey: `${buildingSlug}\ufff0`
        })
        .then(result => {
          this.setState({
            signedUp: result.rows.length
          });
        })
        .catch(err => {
          console.debug(err);
        });
      db
        .get(buildingSlug)
        .then(doc => {
          if (doc) {
            this.setState({
              building: doc,
              checked: true
            });
          } else {
            this.setState({
              checked: true,
              building: null
            });
          }
        })
        .catch(err => {
          console.debug(err);
        });
    }
  };

  render() {
    const { buildingName } = this.props;
    const { building, signedUp, checked } = this.state;
    return (
      <div className="Dashboard">
        {!this.props.loggedIn && <Redirect to="/login" />}
        {building &&
          checked && (
            <p>
              There are {building.flats} residences in {buildingName}. So far,{' '}
              {signedUp} flats have signed up.
            </p>
          )}
        {!building &&
          checked && <p>No building found. Please refresh and try again.</p>}
      </div>
    );
  }
}

export default Dashboard;
