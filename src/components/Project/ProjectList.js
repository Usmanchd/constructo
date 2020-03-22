import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import './project.css';

class ProjectList extends Component {
  state = {
    selected: 'all'
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const handleChange = e => {
      this.setState({ selected: e.target.value });
    };

    return (
      <div className="dashboard container">
        <div className="project-main-home-nav">
          <h4>Projects</h4>
          <Link to="/details/newproject">
            <button className="btn waves-effect">Add New Project</button>
          </Link>
        </div>
        <hr />
        <div className="project-main-home">
          <div className="project-main-heading">
            <h5>List of Projects</h5>

            <select
              id="filter"
              style={{ display: 'block', width: '30%' }}
              value={this.state.selected}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
