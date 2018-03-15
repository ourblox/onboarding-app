import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './blox.svg';
import Dashboard from './dashboard/Dashboard';
import CreateHome from './create-home/CreateHome';
import MyHome from './my-home/MyHome';
import PouchDB from 'pouchdb';
import PDAuth from 'pouchdb-authentication';
import Login from './login/Login';
import Logout from './login/Logout';
import Signup from './signup/Signup';
import AboutBlox from './about-blox/AboutBlox';
import NavBar from './components/nav-bar/NavBar';
import './App.css';

PouchDB.plugin(PDAuth);

class App extends Component {
  state = {
    buildingName: 'Charles Dickens House',
    loggedIn: true,
    admin: false,
    remoteDb: null,
    localDb: null
  };

  setLoggedIn = () => {
    this.checkSession();
    this.setState({ loggedIn: true });
    this.setupLocalPouchDB();
  };

  setLoggedOut = () => {
    this.setState({ loggedIn: false });
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

  CreateHomeWrapper = () => {
    const { buildingName, localDb, loggedIn } = this.state;
    return (
      <CreateHome
        db={localDb}
        loggedIn={loggedIn}
        buildingName={buildingName}
        homeCreated={this.newHomeAdded}
      />
    );
  };

  MyHomeWrapper = () => {
    const { buildingName, localDb, loggedIn } = this.state;
    return (
      <MyHome db={localDb} loggedIn={loggedIn} buildingName={buildingName} />
    );
  };

  LoginWrapper = () => {
    const { remoteDb, loggedIn } = this.state;
    return (
      <Login
        remoteDb={remoteDb}
        loggedIn={loggedIn}
        handleLogin={this.setLoggedIn}
      />
    );
  };

  LogoutWrapper = () => {
    const { remoteDb, loggedIn } = this.state;
    return (
      <Logout
        remoteDb={remoteDb}
        loggedIn={loggedIn}
        handleLogout={this.setLoggedOut}
      />
    );
  };

  CreateUserWrapper = () => {
    const { remoteDb, loggedIn } = this.state;
    return <Signup remoteDb={remoteDb} loggedIn={loggedIn} />;
  };

  newHomeAdded = flatNumber => {};

  checkSession = () => {
    const db = this.state.remoteDb;
    if (db) {
      db.getSession((err, response) => {
        let admin = false;
        let loggedIn = false;
        if (err) {
          console.debug('No one logged in error', err);
          this.setLoggedOut();
          return false;
        } else if (!response.userCtx.name) {
          console.debug('No one logged in', response);
          this.setLoggedOut();
          return false;
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
    const { loggedIn, admin } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Blox" />
        </header>
        <NavBar loggedIn={loggedIn} admin={admin} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/about-blox" component={AboutBlox} />
          <Route path="/login" component={this.LoginWrapper} />
          <Route path="/add-home" component={this.CreateHomeWrapper} />
          <Route path="/my-home" component={this.MyHomeWrapper} />
          <Route path="/add-user" component={this.CreateUserWrapper} />
          <Route path="/logout" component={this.LogoutWrapper} />
        </Switch>
      </div>
    );
  }
}

export default App;
