import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Switch, Route } from 'react-router-dom';

import Project from '../Project/Project';

import ProjectList from '../Project/ProjectList';
import ProjectDetails from '../Project/ProjectDetails';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    console.log(`${this.props.match.path}list`, 'hello');
    return (
      <div>
        <Switch>
          <Route path="/details/:id">
            <ProjectDetails />
          </Route>

          <Route path="/list">
            <ProjectList />
          </Route>

          <Route path="/">
            <Project />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
