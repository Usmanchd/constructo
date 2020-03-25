import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import { getAllProjects } from '../../store/actions/projectActions';

import ClipLoader from 'react-spinners/ClipLoader';

import './project.css';

class Project extends Component {
  componentWillMount = () => {
    this.getProject();
  };

  getProject = () => {
    if (this.props.profile.ID === undefined) {
      setTimeout(() => {
        this.getProject();
      }, 10);
    } else {
      this.props.getAllProjects(this.props.profile.ID);
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

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
        <div className="dashboard container" style={{ height: '100vh' }}>
          <div className="project-main-home-nav">
            <h3>Home</h3>
            <Link to="/list">
              <button className="btn waves-effect">View All Projects</button>
            </Link>
          </div>
          <hr />
          <div className="project-main-home">
            <div className="project-main-heading">
              <h4>Current Project Info</h4>
            </div>
            {this.props.project ? (
              <div className="project-main-subdetails">
                <span>{this.props.project.name}</span>
                <span>{this.props.project.street}</span>
                <span>{this.props.project.city}</span>
                <Link to={`project-details/${this.props.project.ID}`}>
                  <button className="btn waves-effect">Detail</button>
                </Link>
              </div>
            ) : (
              <div className="project-main-subdetails">
                <h5>No Record Found!</h5>
              </div>
            )}
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    project: state.project.projects[0],
    profile: state.firebase.profile,
    loading: state.project.loading
  };
};

export default connect(mapStateToProps, { getAllProjects })(Project);
