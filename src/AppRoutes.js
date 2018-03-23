import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    const { localDb, loggedIn, buildingSlug, buildingName } = this.props;
    return (
      <div>
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
    const { localDb, loggedIn, buildingSlug, buildingName } = this.props;
    return (
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
    );
  };

  MyHomeWrapper = () => {
    const {
      localDb,
      loggedIn,
      buildingSlug,
      buildingName,
      flatNumber
    } = this.props;
    return (
      <div className="Content">
        {localDb && (
          <MyHome
            localDb={localDb}
            buildingSlug={buildingSlug}
            buildingName={buildingName}
            flatNumber={flatNumber}
          />
        )}
        {!localDb && !loggedIn && <Redirect to="/login" />}
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

  MyBuildingWrapper = props => {
    const { setBuildingName, buildingName } = this.props;
    return (
      <div className="Content">
        <MyBuilding
          {...props} // Needed for withRouter props
          buildingName={buildingName}
          setBuildingName={setBuildingName}
        />
      </div>
    );
  };

  LoginWrapper = () => {
    const { loginDb, loggedIn, setLoggedIn, buildingSlug } = this.props;
    return (
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

  CreateUserWrapper = () => {
    const { remoteDb, loggedIn, buildingSlug } = this.props;
    return (
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
    );
  };

  render() {
    return (
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
    );
  }
}

export default AppRoutes;
