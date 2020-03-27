import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import ProjectDetailsView from './ProjectDetailsView';

import ClipLoader from 'react-spinners/ClipLoader';

class ProjectDetails extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <ProjectDetailsView id={this.props.match.params.id} {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects
  };
};

export default connect(mapStateToProps)(ProjectDetails);
