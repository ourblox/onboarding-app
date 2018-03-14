import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import logo from './blox.svg';
import Dashboard from './dashboard/Dashboard';
import CreateHome from './create-home/CreateHome';
import PouchDB from 'pouchdb';
import PDAuth from 'pouchdb-authentication';
import Login from './login/Login';
import Logout from './login/Logout';
import Signup from './signup/Signup';
import './App.css';

PouchDB.plugin(PDAuth);

class App extends Component {

  state = {
    buildingName: "Charles Dickens House",
    loggedIn: false,
    admin: false,
    db: null,
    loginDb: null,
  }

  setLoggedIn = () => {
    this.checkSession();
    this.setState({loggedIn: true});
  }

  setLoggedOut = () => {
    this.checkSession();
    this.setState({loggedIn: false});
  }

  CreateHomeWrapper = () => {
    const { buildingName, db } = this.state;
    return (
      <CreateHome db={db} buildingName={buildingName} homeCreated={this.newHomeAdded} />
    )
  }

  LoginWrapper = () => {
    const { loginDb, loggedIn } = this.state;
    return (
      <Login db={loginDb} loggedIn={loggedIn} handleLogin={this.setLoggedIn} />
    )
  }

  LogoutWrapper = () => {
    const { loginDb, loggedIn } = this.state;
    return (
      <Logout db={loginDb} loggedIn={loggedIn} handleLogout={this.setLoggedOut} />
    )
  }

  CreateUserWrapper = () => {
    const { loginDb, loggedIn } = this.state; // leaving this as db – correct?
    return (
      <Signup db={loginDb} loggedIn={loggedIn}/>
    )
  }


  newHomeAdded = (flatNumber) => {

  }

  checkSession = (loginDb) => {
    const db = loginDb ? loginDb : this.state.loginDb;
    db.getSession( (err, response) => {
      let admin = false;
      let loggedIn = false;
      if (err) {
        console.debug('No one logged in error', err)
        return false;
      } else if (!response.userCtx.name) {
        console.debug('No one logged in', response)
        return false;
      } else {
        console.log(response.userCtx.name, 'is logged in.')
        loggedIn = true;
        let role = response.userCtx.roles[0];
        if (role) {
          role = role.toString();
        }
        if (role === "admin") {
          admin = true;
        }

      }
      this.setState({
        loggedIn: loggedIn,
        admin: admin,
      })
    })
  }





  componentDidMount() {
    const loginCouch = 'https://blox-onboarding-db1.ourblox.org:6984//bloxlogin'; // Remote for login
    const remoteCouch = 'https://blox-onboarding-db1.ourblox.org:6984//ourblox';
    const localPouch = 'ourblox';

    const loginDb = new PouchDB(loginCouch, {skipSetup: true});
    loginDb.info().then( (info) => {
      const db = new PouchDB(localPouch, {skipSetup: true}); // Local for information
      this.setState({
        db: db,
        loginDb: loginDb,
      })
      this.checkSession(loginDb);
      db.info().then( (info) => {
        PouchDB.sync(localPouch, remoteCouch);

      });
    });
  }

  render() {
    const { loggedIn, admin } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Blox" />

        </header>
        {loggedIn && !admin && (
          <nav>
            <ul>
              <li><Link to='/'>Dashboard</Link></li>
              <li><Link to='/my-home'>My Home</Link></li>
              <li><Link to='/logout'>Logout</Link></li>
            </ul>
          </nav>
        )}
        {loggedIn && admin && (
          <nav>
            <ul>
              <li><Link to='/'>Dashboard</Link></li>
              <li><Link to='/add-home'>Add Home</Link></li>
              <li><Link to='/add-user'>Add User</Link></li>
              <li><Link to='/logout'>Logout</Link></li>
            </ul>
          </nav>
        )}

        <Switch>
          <Route exact path="/" render={() => (
            !loggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Dashboard />
            )
          )}/>
          {/* <Route exact path='/' component={Dashboard}/> */}
          <Route path='/login' component={this.LoginWrapper}/>
          <Route path='/add-home' render={() => {
            const CreateHomeWrapper = this.CreateHomeWrapper;
            return (
              !loggedIn ? (
                <Redirect to="/login"/>
              ) : <CreateHomeWrapper />
            )
          }}/>

            <Route path='/add-user' render={() => {
              const CreateUserWrapper = this.CreateUserWrapper;
              return (
                !loggedIn ? (
                  <Redirect to="/login"/>
                ) : <CreateUserWrapper />
              )
            }}/>


            <Route path='/logout' render={() => {
              const LogoutWrapper = this.LogoutWrapper;
              return (
                !loggedIn ? (
                  <Redirect to="/login"/>
                ) : <LogoutWrapper />
              )
            }}/>

        </Switch>

      </div>
    );
  }
}

export default App;
