import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import './project.css';

class ProjectList extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    console.log('hello');

    return (
      <div className="dashboard container">
        <div className="project-main-home-nav">
          <h3>Projects</h3>
          <button className="btn waves-effect">Add New Project</button>
        </div>
        <hr />
        <div className="project-main-home">
          <div className="project-main-heading">
            <h4>List of Projects</h4>
            <p>weather</p>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <div>
              <div
                className="project-main-subdetails"
                style={{ margin: '5px 0px' }}
              >
                <span>Name</span>
                <span>Street</span>
                <span>City</span>
                <button className="btn waves-effect">Detail</button>
              </div>
              <hr />
            </div>
          ))}
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

export default connect(mapStateToProps)(ProjectList);
