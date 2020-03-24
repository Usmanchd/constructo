import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { Icon } from 'react-icons-kit';

import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import {
  updateProject,
  getThisProject
} from '../../store/actions/projectActions';
import firebase from '../../config/fbConfig';
import Map from '../../Map';

class ProjectDetailsView extends Component {
  state = { flag: false };
  componentDidMount = () => {
    this.props.getThisProject(this.props.id);
  };

  componentDidUpdate = prevProps => {
    if (this.props === prevProps) return;
    this.setState({ ...this.props.project });
  };

  handleEdit = () => {
    this.setState({ ...this.state, flag: true });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = () => {
    let newState = { ...this.state };
    delete newState.flag;
    this.props.updateProject(newState);
    this.setState({ flag: false });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    // console.log(this.props.id);
    // console.log(this.props.project);
    // console.log(this.state);
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
        <div>
          <div className="dashboard container">
            <div className="project-main-home-nav">
              <div
                style={{
                  position: 'absolute',
                  top: '90px',
                  left: '50px',
                  color: '#fbd800'
                }}
                onClick={() => this.props.history.push('/list')}
              >
                <Icon size={54} icon={arrowLeft2} />
              </div>

              <h4>
                <h4>{`Construction of ${this.state.name}`}</h4>
              </h4>
              {this.state.flag ? (
                <span>
                  <button
                    className="btn-det btn waves-effect"
                    onClick={this.handleSubmit}
                  >
                    Update
                  </button>
                </span>
              ) : (
                <span>
                  <button
                    className="btn-det btn waves-effect"
                    onClick={this.handleEdit}
                  >
                    Edit
                  </button>
                </span>
              )}
            </div>
            <hr />
          </div>

          <div className="details-grid-wrapper">
            <div className="grid">
              <h5>General</h5>
              <form id="det-form">
                <div class="input-field">
                  <p
                    for="name"
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Name
                  </p>
                  <input
                    id="name"
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    value={this.state.name}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Street
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="street"
                    value={this.state.street}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    City
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="city"
                    value={this.state.city}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Zip
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="zip"
                    value={this.state.zip}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    State
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="state"
                    value={this.state.state}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Location
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="location"
                    value={this.state.location}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Project Description
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="projectDescription"
                    value={this.state.projectDescription}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="map">
                  <Map
                    location={this.state.location}
                    mode={!this.state.flag ? 'view' : 'edit'}
                  />
                </div>
              </form>
            </div>

            <div className="grid">
              <h5>Management</h5>
              <form id="det-form">
                <div class="input-field col s12">
                  <p
                    for="name"
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Timiing
                  </p>

                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="date"
                    id="estimatestart"
                    name="trip-start"
                    value={this.state.estimatestart}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="input-field col s12">
                  <input
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="date"
                    id="estimatend"
                    name="trip-start"
                    value={this.state.estimatend}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Cloud Space
                  </p>

                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="street"
                    // value={this.state.street}
                    required
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    // onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="street"
                    // value={this.state.street}
                    required
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    // onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  ></p>

                  <button
                    className="btn-det btn waves-effect"
                    style={{ marginLeft: '100px' }}
                  >
                    Request More Space
                  </button>
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Users
                  </p>
                  <input
                    placeholder="Users"
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="street"
                    // value={this.state.street}
                    required
                    // onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="street"
                    // value={this.state.street}
                    required
                    // onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  ></p>

                  <button
                    className="btn-det btn waves-effect"
                    style={{ marginLeft: '100px' }}
                  >
                    Request More Users
                  </button>
                  <div class="input-field col s12">
                    <p
                      for="name"
                      style={{
                        margin: '25px 0 0 0',
                        padding: '0',
                        fontSize: '12px'
                      }}
                    >
                      List of Users
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid">
              <h5>Settings</h5>
              <form id="det-form">
                <div class="input-field col s12">
                  <p
                    for="name"
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Created by
                  </p>
                  <input
                    id="createdby"
                    disabled={!this.state.flag}
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    value={this.state.createdby}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Created at
                  </p>

                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="createdad"
                    value={this.state.createdAt}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Last update
                  </p>

                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="lastupdate"
                    value={this.state.lastupdate}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Active
                  </p>

                  <button
                    className="btn-det btn waves-effect"
                    style={{ marginLeft: '50px' }}
                  >
                    Activate/Disactivate
                  </button>
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Archived at
                  </p>
                  <button
                    className="btn-det btn waves-effect"
                    style={{ marginLeft: '50px' }}
                  >
                    Archive
                  </button>
                </div>
                <div className="input-field">
                  <p
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Deleted At
                  </p>
                  <button
                    className="btn-det btn waves-effect"
                    style={{ marginLeft: '50px' }}
                  >
                    Delete Project
                  </button>
                </div>
              </form>
            </div>
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
    project: state.project.project,
    loading: state.project.loading
  };
};

export default connect(mapStateToProps, { updateProject, getThisProject })(
  ProjectDetailsView
);
