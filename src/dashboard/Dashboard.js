import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    building: null,
    signedUp: 0
  };

  componentDidMount = () => {
    const { db, buildingSlug } = this.props;
    db
      .allDocs({
        include_docs: true,
        startkey: 'cdh',
        endkey: 'cdh\ufff0'
      })
      .then(result => {
        this.setState({
          signedUp: result.rows.length - 1
        });
      })
      .catch(err => {
        console.debug(err);
      });
    db
      .get(buildingSlug)
      .then(doc => {
        if (doc) {
          this.setState({ building: doc });
        } else {
          this.setState({
            checked: true
          });
        }
      })
      .catch(err => {
        console.debug(err);
      });
  };

  render() {
    const { buildingName, buildingSlug, loggedIn } = this.props;
    const { building, signedUp } = this.state;
    return (
      <div className="Dashboard">
        {!this.props.loggedIn && <Redirect to="/login" />}
        {building && (
          <div>
            <p>
              There are {building.flats} residences in {buildingName}. So far,{' '}
              {signedUp} flats have signed up.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
