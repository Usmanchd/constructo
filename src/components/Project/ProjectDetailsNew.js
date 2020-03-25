import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';

import { createProject } from '../../store/actions/projectActions';

import Map from '../../Map';

class ProjectDetailsNew extends Component {
  state = {
    name: '',
    street: '',
    city: '',
    zip: '',
    state: '',
    location: '',
    projectDescription: '',
    // starttime: "2.3",
    // endtime: "2.3",
    createdby: '',
    createdAt: '',
    lastupdate: '',
    estimatestart: '',
    estimatend: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = () => {
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${this.state.location}&key=7df9f26d51b54e36816ec50664d587c7`
      )
      .then(res => {
        if (res.data.results[0] == undefined) return;
        const { lat, lng } = res.data.results[0].geometry;
        let newstate = {
          ...this.state,
          lat,
          lng,
          user: [this.props.profile.ID],
          projectCreator: this.props.profile.ID
        };

        this.props.createProject(newstate);
        this.setState({
          name: '',
          city: '',
          street: '',
          zip: '',
          state: '',
          location: '',
          projectDescription: '',
          starttime: '',
          endtime: '',
          createdby: '',
          createdad: '',
          lastupdate: '',
          estimatestart: '',
          estimatend: ''
        });
      });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        <div className="dashboard container">
          <div className="project-main-home-nav">
            {this.state.name ? (
              <h4>{`Construction of ${this.state.name}`}</h4>
            ) : (
              <h4>Projects Details</h4>
            )}
            <span>
              <button
                className="btn-det btn waves-effect"
                onClick={() =>
                  this.setState({
                    name: '',
                    city: '',
                    street: '',
                    zip: '',
                    state: '',
                    location: '',
                    projectDescription: '',
                    starttime: '',
                    endtime: '',
                    createdby: '',
                    createdad: '',
                    lastupdate: '',
                    estimatestart: '',
                    estimatend: ''
                  })
                }
              >
                Discard Changes
              </button>
              <button className="btn-det btn waves-effect">Edit/Save</button>
              <Link to="/list">
                <button
                  className="btn-det btn waves-effect"
                  onClick={this.handleSubmit}
                >
                  Set
                </button>
              </Link>
            </span>
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
                  type="text"
                  id="projectDescription"
                  value={this.state.projectDescription}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="map">
                <Map location={this.state.location} mode="new" />
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
                  Timing
                </p>

                <input
                  type="date"
                  id="estimatestart"
                  name="trip-start"
                  value={this.state.estimatestart}
                  onChange={this.handleChange}
                  style={{ color: 'white' }}
                />
              </div>
              <div class="input-field col s12">
                <input
                  type="date"
                  id="estimatend"
                  name="trip-start"
                  value={this.state.estimatend}
                  onChange={this.handleChange}
                  style={{ color: 'white' }}
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
                  type="text"
                  id="street"
                  // value={this.state.street}
                  required
                  disabled
                  // onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="street"
                  // value={this.state.street}
                  required
                  disabled
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
                  type="text"
                  id="street"
                  // value={this.state.street}
                  required
                  // onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <input
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
                  type="text"
                  id="lastupdate"
                  value={this.state.lastupdate}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field" style={{ padding: '20px 0' }}>
                <span
                  style={{
                    margin: '25px 200px 0 0',
                    padding: '0',
                    fontSize: '12px'
                  }}
                >
                  Active
                </span>
                <span>Waiting...</span>
                <br />
                <button
                  className="btn-det btn waves-effect"
                  style={{
                    margin: '15px 25px',
                    fontSize: '10px',
                    padding: '0 5px',
                    width: '80%'
                  }}
                >
                  Activate/Deactivate
                </button>
              </div>
              <div
                className="input-field"
                style={{ padding: '20px 0', marginTop: '40px' }}
              >
                <span
                  style={{
                    margin: '25px 200px 0 0',
                    padding: '0',
                    fontSize: '12px'
                  }}
                >
                  Archive
                </span>
                <span>False</span>
                <br />
                <button
                  className="btn-det btn waves-effect"
                  style={{
                    margin: '15px 25px',
                    fontSize: '10px',
                    padding: '0 5px',
                    width: '80%'
                  }}
                >
                  Archive
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
    projects: state.project.projects
  };
};

export default connect(mapStateToProps, { createProject })(ProjectDetailsNew);
