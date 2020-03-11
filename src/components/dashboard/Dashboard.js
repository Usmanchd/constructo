import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <h1>Dashboard / Landing Page </h1>
        <p>Task 1 completed!!</p>
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
