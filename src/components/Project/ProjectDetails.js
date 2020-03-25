import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';
import ProjectDetailsNew from './ProjectDetailsNew';
import ProjectDetailsView from './ProjectDetailsView';

class ProjectDetails extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (this.props.match.params.id === 'create-project') {
      return <ProjectDetailsNew {...this.props} />;
    } else {
      return (
        <ProjectDetailsView id={this.props.match.params.id} {...this.props} />
      );
    }
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
