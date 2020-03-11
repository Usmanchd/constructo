import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SignUpP2 from './components/auth/SignUpP2';
import { connect } from 'react-redux';
import * as ROUTES from './constants/routes';
import ClipLoader from 'react-spinners/ClipLoader';

class App extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <ClipLoader
            size={120}
            color={'#fbd800'}
            loading={this.props.loading}
          />
        </div>
      );
    } else
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path={ROUTES.LANDING} component={Dashboard} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.SIGN_IN} component={SignIn} />
              <Route path={ROUTES.FORWARD} component={SignUpP2} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(App);
