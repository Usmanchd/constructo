import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { getAllProjects } from '../../store/actions/projectActions';
import './project.css';

class ProjectList extends Component {
  componentDidMount = () => {
    this.getProject();
  };
  state = {
    selected: 'all',
    projects: []
  };

  componentDidUpdate = prevProps => {
    if (this.props.projects !== prevProps.projects)
      this.setState({ ...this.state, projects: [...this.props.projects] });
  };

  getProject = () => {
    if (this.props.projects === []) return;
    if (this.props.profile.ID === undefined) {
      setTimeout(() => {
        this.getProject();
      }, 1000);
    } else {
      this.props.getAllProjects(this.props.profile.ID);
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const handleChange = e => {
      let active;
      if (e.target.value === 'active') active = true;
      else if (e.target.value === 'inactive') active = false;
      else if (e.target.value === 'all') {
        this.setState({
          selected: e.target.value,
          projects: this.props.projects
        });
        return;
      }
      this.setState({
        selected: e.target.value,
        projects: this.props.projects.filter(
          project => project.active === active
        )
      });
    };
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
        <div className="dashboard container">
          <div className="project-main-home-nav">
            <h4>Projects</h4>
            <Link to="/project-details/create-project">
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

            {this.state.projects.map(project => (
              <div>
                <div
                  className="project-main-subdetails"
                  style={{ margin: '5px 0px' }}
                >
                  <span>{project.name}</span>
                  <span>{project.street}</span>
                  <span>{project.city}</span>
                  <Link to={`project-details/${project.ID}`}>
                    <button className="btn waves-effect">Detail</button>
                  </Link>
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
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects,
    loading: state.project.loading
  };
};

export default connect(mapStateToProps, { getAllProjects })(ProjectList);
