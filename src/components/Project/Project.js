import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import './project.css';

class Project extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
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
            <select>
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label>Filter</label>
          </div>
          <div className="project-main-subdetails">
            <span>Name</span>
            <span>Street</span>
            <span>City</span>
            <button className="btn waves-effect">Detail</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Project);
