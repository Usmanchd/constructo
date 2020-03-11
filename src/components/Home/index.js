import React from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

const HomePage = ({ auth }) => {
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(HomePage);
