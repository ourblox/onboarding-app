import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from './components/nav-bar/NavBar';

import Splash from './splash/Splash';
import Dashboard from './dashboard/Dashboard';
import CreateHome from './create-home/CreateHome';
import MyHome from './my-home/MyHome';
import Welcome from './welcome/Welcome';
import MyBuilding from './my-building/MyBuilding';
import Login from './login/Login';
import Logout from './login/Logout';
import Privacy from './privacy/Privacy';
import CreateUser from './create-user/CreateUser';
import BloxFAQs from './blox-faqs/BloxFAQs';

class AppRoutes extends Component {
  static propTypes = {
    localDb: PropTypes.object,
    remoteDb: PropTypes.object,
    loginDb: PropTypes.object,
    loggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    setLoggedOut: PropTypes.func.isRequired,
    admin: PropTypes.bool.isRequired,
    buildingSlug: PropTypes.string,
    buildingName: PropTypes.string,
    setBuildingName: PropTypes.func.isRequired
  };

  DashboardWrapper = () => {
    const {
      localDb,
      loggedIn,
      buildingSlug,
      buildingName,
      admin,
      flatNumber
    } = this.props;
    return (
      <div>
        <NavBar
          loggedIn={loggedIn}
          admin={admin}
          buildingSlug={buildingSlug}
          flatNumber={flatNumber}
        />
        {localDb && (
          <Dashboard
            localDb={localDb}
            loggedIn={loggedIn}
            buildingSlug={buildingSlug}
            buildingName={buildingName}
          />
        )}
        {!localDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  CreateHomeWrapper = () => {
    const { localDb, loggedIn, buildingSlug, buildingName, admin } = this.props;
    return (
      <div>
        <NavBar loggedIn={loggedIn} admin={admin} buildingSlug={buildingSlug} />
        <div className="Content">
          {localDb && (
            <CreateHome
              localDb={localDb}
              buildingSlug={buildingSlug}
              buildingName={buildingName}
            />
          )}
          {!localDb && !loggedIn && <Redirect to="/login" />}
        </div>
      </div>
    );
  };

  MyHomeWrapper = () => {
    const {
      localDb,
      loggedIn,
      buildingSlug,
      buildingName,
      flatNumber,
      admin
    } = this.props;
    return (
      <div>
        <NavBar
          loggedIn={loggedIn}
          admin={admin}
          buildingSlug={buildingSlug}
          flatNumber={flatNumber}
        />
        <div className="Content">
          {localDb &&
            loggedIn && (
              <MyHome
                localDb={localDb}
                buildingSlug={buildingSlug}
                buildingName={buildingName}
                flatNumber={flatNumber}
              />
            )}
          {!localDb && !loggedIn && <Redirect to="/login" />}
        </div>
      </div>
    );
  };

  WelcomeWrapper = () => {
    const { buildingSlug, setBuildingName } = this.props;
    return (
      <div className="Content">
        <Welcome
          buildingSlug={buildingSlug}
          setBuildingName={setBuildingName}
        />
      </div>
    );
  };

  SplashWrapper = props => {
    const { buildingSlug, setBuildingName } = this.props;
    return (
      <div className="Content">
        <Splash
          {...props} // Needed for withRouter props
          buildingSlug={buildingSlug}
          setBuildingName={setBuildingName}
        />
      </div>
    );
  };

  PrivacyWrapper = () => {
    const { loggedIn, admin, buildingSlug, flatNumber } = this.props;
    return (
      <div>
        <NavBar
          loggedIn={loggedIn}
          admin={admin}
          buildingSlug={buildingSlug}
          flatNumber={flatNumber}
        />
        <div className="Content">
          <Privacy />
        </div>
      </div>
    );
  };

  MyBuildingWrapper = props => {
    const {
      setBuildingName,
      buildingName,
      loggedIn,
      admin,
      buildingSlug,
      flatNumber
    } = this.props;
    return (
      <div>
        <NavBar
          loggedIn={loggedIn}
          admin={admin}
          buildingSlug={buildingSlug}
          flatNumber={flatNumber}
        />
        <div className="Content">
          <MyBuilding
            {...props} // Needed for withRouter props
            buildingName={buildingName}
            setBuildingName={setBuildingName}
          />
        </div>
      </div>
    );
  };

  LoginWrapper = () => {
    const { loginDb, loggedIn, setLoggedIn, buildingSlug, admin } = this.props;
    return (
      <div>
        <NavBar loggedIn={loggedIn} admin={admin} buildingSlug={buildingSlug} />
        <div className="Content">
          {loginDb && (
            <Login
              loggedIn={loggedIn}
              loginDb={loginDb}
              handleLogin={setLoggedIn}
              buildingSlug={buildingSlug}
            />
          )}
        </div>
      </div>
    );
  };

  LogoutWrapper = () => {
    const { remoteDb, loggedIn, setLoggedOut } = this.props;
    return (
      <div className="Content">
        {remoteDb && <Logout remoteDb={remoteDb} handleLogout={setLoggedOut} />}
        {!remoteDb && !loggedIn && <Redirect to="/login" />}
      </div>
    );
  };

  BloxFAQsWrapper = () => {
    const {
      buildingName,
      loggedIn,
      buildingSlug,
      admin,
      flatNumber
    } = this.props;
    return (
      <div>
        <NavBar
          loggedIn={loggedIn}
          admin={admin}
          buildingSlug={buildingSlug}
          flatNumber={flatNumber}
        />
        <BloxFAQs buildingName={buildingName} />
      </div>
    );
  };

  CreateUserWrapper = () => {
    const { remoteDb, loggedIn, buildingSlug, admin } = this.props;
    return (
      <div>
        <NavBar loggedIn={loggedIn} admin={admin} buildingSlug={buildingSlug} />
        <div className="Content">
          {remoteDb && (
            <CreateUser
              buildingSlug={buildingSlug}
              remoteDb={remoteDb}
              loggedIn={loggedIn}
            />
          )}
          {!remoteDb && !loggedIn && <Redirect to="/login" />}
        </div>
      </div>
    );
  };

  render() {
    const buildingSlug = localStorage.getItem('buildingSlug');
    return (
      <Switch>
        <Route path="/dashboard" component={this.DashboardWrapper} />
        <Route path="/blox-faqs" component={this.BloxFAQsWrapper} />
        <Route path="/privacy" component={this.PrivacyWrapper} />
        <Route path="/login" component={this.LoginWrapper} />
        <Route path="/add-home" component={this.CreateHomeWrapper} />
        <Route path="/my-home" component={this.MyHomeWrapper} />
        <Route path="/add-user" component={this.CreateUserWrapper} />
        <Route path="/logout" component={this.LogoutWrapper} />
        <Route path="/welcome" component={this.WelcomeWrapper} />
        <Route exact path="/" component={this.SplashWrapper} />
        {buildingSlug && (
          <Route
            exact
            path="/:buildingSlug?/"
            component={this.MyBuildingWrapper}
          />
        )}
        {!buildingSlug && (
          <Route exact path="/:buildingSlug?/" component={this.SplashWrapper} />
        )}
      </Switch>
    );
  }
}

export default AppRoutes;
