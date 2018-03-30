import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AppRoutes from './AppRoutes';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logo from './blox.svg';

import PouchDB from 'pouchdb';
import PDAuth from 'pouchdb-authentication';

import NavBar from './components/nav-bar/NavBar';
import FooterNav from './components/nav-bar/FooterNav';
import './App.css';

PouchDB.plugin(PDAuth);

const Buildings = {
  cdh: 'Charles Dickens House',
  wph: 'Welshpool House',
  test: 'Verdigris Apartments'
};

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    buildingName: 'The Social Network for Buildings',
    buildingSlug: null,
    flatNumber: null,
    loggedIn: true,
    admin: false,
    remoteDb: null,
    localDb: null,
    loginDb: null
  };

  setBuildingName = buildingSlug => {
    if (buildingSlug === 'reset' || buildingSlug === '') {
      this.setState({
        buildingName: 'The social network for buildings'
      });
    } else if (this.props.location.pathname === '/') {
      this.setState({
        buildingName: 'The social network for buildings',
        buildingSlug: buildingSlug
      });
    } else {
      localStorage.setItem('buildingSlug', buildingSlug);
      this.setState({
        buildingName: Buildings[buildingSlug],
        buildingSlug: buildingSlug
      });
    }
  };

  setLoggedIn = () => {
    this.checkSession();
    this.setState({ loggedIn: true });
    this.initializeAuthenticatedDB();
  };

  setLoggedOut = () => {
    this.setState({ loggedIn: false });
    this.checkSession();
  };

  setupLocalPouchDB = () => {
    if (!this.state.localDb) {
      const remoteDb = this.state.remoteDb;
      const localPouch = 'ourblox';
      const localDb = new PouchDB(localPouch, { skipSetup: true });
      this.setState({
        localDb: localDb
      });
      localDb
        .sync(remoteDb, {
          live: true,
          retry: true
        })
        .on('change', function(change) {
          // yo, something changed!
          console.debug('syncing');
        })
        .on('paused', function(info) {
          // replication was paused, usually because of a lost connection
          console.debug('paused');
        })
        .on('active', function(info) {
          // replication was resumed
          console.debug('resumed');
        })
        .on('error', function(err) {
          // totally unhandled error (shouldn't happen)
        });
    }
  };

  checkSession = () => {
    const db = this.state.loginDb;
    if (db) {
      db
        .getSession((err, response) => {
          let admin = false;
          let loggedIn = true;
          let username = null;
          let flatNumber = null;
          if (err) {
            console.debug('No one logged in error', err);
            loggedIn = false;
          } else if (!response.userCtx.name) {
            console.debug('No one logged in', response);
            loggedIn = false;
          } else {
            console.debug(response.userCtx.name, 'is logged in.');
            this.initializeAuthenticatedDB();
            loggedIn = true;
            username = response.userCtx.name;
            if (username) {
              flatNumber = username.split(`-${this.state.buildingSlug}`)[0];
            }
            let role = response.userCtx.roles[0];
            if (role) {
              role = role.toString();
              if (role.indexOf('admin') > -1) {
                admin = true;
              }
            }
          }
          this.setState({
            loggedIn: loggedIn,
            admin: admin,
            flatNumber: flatNumber
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        loggedIn: false,
        admin: false,
        flatNumber: null
      });
    }
  };

  initializeAuthenticatedDB() {
    // Only run this once the user is logged in
    const remoteCouch = `${process.env.REACT_APP_COUCHDB_SERVER}/ourblox`;
    const db = new PouchDB(remoteCouch, { skipSetup: true });
    db.info().then(info => {
      this.setState({
        remoteDb: db
      });
      this.setupLocalPouchDB();
    });
  }

  componentDidMount() {
    if (localStorage.getItem('buildingSlug')) {
      const buildingSlug = localStorage.getItem('buildingSlug');
      this.setBuildingName(buildingSlug);
    }
    const loginCouch = `${process.env.REACT_APP_COUCHDB_SERVER}/bloxlogin`;
    const db = new PouchDB(loginCouch, { skipSetup: true });
    db
      .info()
      .then(info => {
        this.setState({
          loginDb: db
        });
        this.checkSession();
      })
      .catch(err => console.debug(err));
  }

  render() {
    const {
      loggedIn,
      admin,
      buildingName,
      buildingSlug,
      flatNumber,
      remoteDb,
      loginDb,
      localDb
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavLink to="/">
            <img src={logo} className="App-logo" alt="Blox" />
          </NavLink>
          <h2 className="App-BuildingName">{buildingName}</h2>
        </header>
        <NavBar loggedIn={loggedIn} admin={admin} buildingSlug={buildingSlug} />
        <AppRoutes
          loggedIn={loggedIn}
          setLoggedIn={this.setLoggedIn}
          setLoggedOut={this.setLoggedOut}
          admin={admin}
          buildingSlug={buildingSlug}
          buildingName={buildingName}
          setBuildingName={this.setBuildingName}
          remoteDb={remoteDb}
          loginDb={loginDb}
          localDb={localDb}
          flatNumber={flatNumber}
        />
        <footer>
          <FooterNav loggedIn={loggedIn} />
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
