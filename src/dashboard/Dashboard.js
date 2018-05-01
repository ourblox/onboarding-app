import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Dashboard.css';

import ProgressVisualization from '../components/progress-visualization/Progress';

class Dashboard extends Component {
  static propTypes = {
    localDb: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    buildingSlug: PropTypes.string.isRequired,
    buildingName: PropTypes.string.isRequired
  };

  state = {
    checked: false,
    building: null,
    signedUp: 0
  };

  componentDidMount = () => {
    const { localDb, buildingSlug } = this.props;
    if (buildingSlug) {
      localDb
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
      localDb
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
          this.setState({
            checked: true,
            building: null
          });
          console.debug(err);
        });
    }
  };

  render() {
    const { buildingName, loggedIn } = this.props;
    const { building, signedUp, checked } = this.state;
    return (
      <div className="Dashboard">
        {!loggedIn && <Redirect to="/login" />}
        {building &&
          checked && (
            <div>
              <p>
                There are {building.flats} residences in {buildingName}. So far,{' '}
                {signedUp} flats have signed up.
              </p>
              <ProgressVisualization />
            </div>
          )}
        {!building &&
          checked && <p>No building found. Please refresh and try again.</p>}
      </div>
    );
  }
}

export default Dashboard;
