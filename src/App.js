import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import logo from './blox.svg';
import Dashboard from './dashboard/Dashboard';
import Welcome from './welcome/Welcome';
import MyBuilding from './my-building/MyBuilding';
import CreateHome from './create-home/CreateHome';
import MyHome from './my-home/MyHome';
import PouchDB from 'pouchdb';
import PDAuth from 'pouchdb-authentication';
import Login from './login/Login';
import Logout from './login/Logout';
import Privacy from './privacy/Privacy';
import CreateUser from './create-user/CreateUser';
import BloxFAQs from './blox-faqs/BloxFAQs';
import NavBar from './components/nav-bar/NavBar';
import FooterNav from './components/nav-bar/FooterNav';
import './App.css';

PouchDB.plugin(PDAuth);

const Buildings = {
  cdh: 'Charles Dickens House',
  qbr: '355 Queensbridge Rod'
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
    loggedIn: true,
    admin: false,
    remoteDb: null,
    localDb: null
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
    this.setupLocalPouchDB();
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

  DashboardWrapper = props => {
    const { buildingName, buildingSlug, localDb, loggedIn } = this.state;
    return (
      <div>
        {localDb && (
          <Dashboard
            {...this.props}
            loggedIn={loggedIn}
            buildingName={buildingName}
            buildingSlug={buildingSlug}
            db={localDb}
          />
        )}
        {!localDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  CreateHomeWrapper = () => {
    const { buildingName, localDb, loggedIn, buildingSlug } = this.state;
    return (
      <div className="Content">
        {localDb && (
          <CreateHome
            db={localDb}
            loggedIn={loggedIn}
            buildingSlug={buildingSlug}
            buildingName={buildingName}
          />
        )}
        {!localDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  MyHomeWrapper = () => {
    const { buildingName, localDb, loggedIn } = this.state;
    return (
      <div className="Content">
        {localDb && (
          <MyHome
            db={localDb}
            loggedIn={loggedIn}
            buildingName={buildingName}
          />
        )}
        {!localDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  WelcomeWrapper = props => {
    const { buildingSlug } = this.state;
    return (
      <div className="Content">
        <Welcome
          {...props}
          buildingSlug={buildingSlug}
          setBuildingName={this.setBuildingName}
        />
      </div>
    );
  };

  MyBuildingWrapper = props => {
    const { buildingName } = this.state;
    return (
      <div className="Content">
        <MyBuilding
          {...props}
          buildingName={buildingName}
          setBuildingName={this.setBuildingName}
        />
      </div>
    );
  };

  LoginWrapper = () => {
    const { remoteDb, loggedIn, buildingSlug } = this.state;
    return (
      <div className="Content">
        {remoteDb && (
          <Login
            remoteDb={remoteDb}
            loggedIn={loggedIn}
            buildingSlug={buildingSlug}
            handleLogin={this.setLoggedIn}
          />
        )}
      </div>
    );
  };

  LogoutWrapper = () => {
    const { remoteDb, loggedIn } = this.state;
    return (
      <div className="Content">
        {remoteDb && (
          <Logout
            remoteDb={remoteDb}
            loggedIn={loggedIn}
            handleLogout={this.setLoggedOut}
          />
        )}
      </div>
    );
  };

  CreateUserWrapper = () => {
    const { remoteDb, loggedIn } = this.state;
    return (
      <div className="Content">
        {remoteDb && <CreateUser remoteDb={remoteDb} loggedIn={loggedIn} />}
        {!remoteDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  checkSession = () => {
    const db = this.state.remoteDb;
    if (db) {
      db.getSession((err, response) => {
        let admin = false;
        let loggedIn = true;
        if (err) {
          console.debug('No one logged in error', err);
          loggedIn = false;
        } else if (!response.userCtx.name) {
          console.debug('No one logged in', response);

          loggedIn = false;
        } else {
          console.debug(response.userCtx.name, 'is logged in.');
          this.setupLocalPouchDB();
          loggedIn = true;
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
          admin: admin
        });
      });
    }
  };

  componentDidMount() {
    if (localStorage.getItem('buildingSlug')) {
      const buildingSlug = localStorage.getItem('buildingSlug');
      this.setBuildingName(buildingSlug);
    }
    const remoteCouch = `${process.env.REACT_APP_COUCHDB_SERVER}/ourblox`;
    const db = new PouchDB(remoteCouch, { skipSetup: true });
    this.setState({
      remoteDb: db
    });
    db.info().then(info => {
      this.checkSession();
    });
  }

  render() {
    const { loggedIn, admin, buildingName, buildingSlug } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavLink to="/">
            <img src={logo} className="App-logo" alt="Blox" />
          </NavLink>
          <h2 className="App-BuildingName">{buildingName}</h2>
        </header>
        <NavBar loggedIn={loggedIn} admin={admin} buildingSlug={buildingSlug} />
        <Switch>
          <Route path="/dashboard" component={this.DashboardWrapper} />
          <Route path="/blox-faqs" component={BloxFAQs} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/login" component={this.LoginWrapper} />
          <Route path="/add-home" component={this.CreateHomeWrapper} />
          <Route path="/my-home" component={this.MyHomeWrapper} />
          <Route path="/add-user" component={this.CreateUserWrapper} />
          <Route path="/logout" component={this.LogoutWrapper} />
          <Route exact path="/" component={this.WelcomeWrapper} />
          <Route
            exact
            path="/:buildingName?/"
            component={this.MyBuildingWrapper}
          />
        </Switch>
        <footer>
          <FooterNav
            loggedIn={loggedIn}
            admin={admin}
            buildingSlug={buildingSlug}
          />
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
