import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import Map from '../../Map';

class ProjectDetails extends Component {
  state = {
    name: 'Paris',
    street: 'Lahore, Punjab, Pakistan',
    city: 'Lahore',
    zip: '11122',
    state: 'punjab',
    location: 'location',
    projectDescription: 'pd'
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    console.log(this.match);

    return (
      <div>
        <div className="dashboard container">
          <div className="project-main-home-nav">
            <h4>Projects Details</h4>
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
                    projectDescription: ''
                  })
                }
              >
                Discard Changes
              </button>
              <button className="btn-det btn waves-effect">Edit/Save</button>
              <button className="btn-det btn waves-effect">Set</button>
            </span>
          </div>
          <hr />
        </div>

        <div className="details-grid-wrapper">
          <div className="grid">
            <h5>General</h5>
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
                <Map />
              </div>
            </form>
          </div>
          <div className="grid">
            <h5>Management</h5>
          </div>
          <div className="grid">
            <h5>Settings</h5>
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

export default connect(mapStateToProps)(ProjectDetails);
