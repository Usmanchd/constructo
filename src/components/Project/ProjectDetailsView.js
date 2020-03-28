import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { Icon } from 'react-icons-kit';

import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import axios from 'axios';

import {
  updateProject,
  getThisProject,
  createProject,
  deleteProject
} from '../../store/actions/projectActions';
import Map from '../../Map';

class ProjectDetailsView extends Component {
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
    lastupdate: '',
    estimatestart: '',
    estimatend: '',
    user: [],
    lat: '',
    lng: '',
    flag: false
  };
  componentDidMount = () => {
    if (this.props.match.params.id === 'create-project')
      this.setState({
        ...this.state,
        createdby: this.props.profile.Name,
        flag: true
      });
    else {
      this.props.getThisProject(this.props.id);
    }
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
    if (
      this.state.name === '' ||
      this.state.city === '' ||
      this.state.street === '' ||
      this.state.zip === '' ||
      this.state.state === '' ||
      this.state.location === '' ||
      this.state.projectDescription === '' ||
      this.state.createdby === ''
    ) {
      alert('Please Fill in All Details');

      return;
    }

    if (this.props.match.params.id === 'create-project') {
      if (this.state.lat || this.state.lng) {
        let newstate = {
          ...this.state,
          user: [this.props.profile.ID],
          projectCreator: this.props.profile.ID
        };

        if (this.state.createdby === undefined)
          newstate.createdby = this.props.profile.Name;

        delete newstate.flag;
        this.props.createProject(newstate);
        this.props.history.push('/list');
      } else {
        axios
          .get(
            `https://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${this.state.location}`
          )
          .then(res => {
            if (res.data.results === undefined) return;

            const { lat, lng } = res.data.results[0].locations[0].latLng;
            let newstate = {
              ...this.state,
              user: [this.props.profile.ID],
              projectCreator: this.props.profile.ID
            };
            delete newstate.flag;
            if (this.state.lat === '' || this.state.lng === '') {
              newstate.lat = lat;
              newstate.lng = lng;
            }
            if (this.state.createdby === undefined)
              newstate.createdby = this.props.profile.Name;

            this.props.createProject(newstate);
            this.props.history.push('/list');
          });
      }
    } else {
      if (this.state.lat || this.state.lng) {
        let newstate = { ...this.state, lastupdate: Date.now() };
        delete newstate.flag;
        this.props.updateProject(newstate);
      } else {
        axios
          .get(
            `https://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${this.state.location}`
          )
          .then(res => {
            if (res.data === undefined) return;

            const { lat, lng } = res.data.results[0].locations[0].latLng;
            let newstate = { ...this.state };
            delete newstate.flag;
            if (this.state.lat === '' || this.state.lng === '') {
              newstate.lat = lat;
              newstate.lng = lng;
            }
            this.props.updateProject(newstate);
          });
      }
    }

    this.setState({ flag: false });
  };

  getDate = milisecond => {
    const date = new Date(milisecond);
    return date.toString();
  };

  handleDeleteProject = () => {
    if (this.props.match.params.id === 'create-project') return;
    if (this.props.project.projectCreator === this.props.profile.ID) {
      this.props.deleteProject(this.props.project.ID);
      this.props.history.push('/list');
    }
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!profile.isEmpty && this.props.match.params.id !== 'create-project') {
      if (!profile.projects.includes(this.props.id))
        return <Redirect to="/list" />;
    }
    const handleMarker = (lat, lng) => {
      if (this.state.flag === false) return;
      axios
        .get(
          `https://open.mapquestapi.com/geocoding/v1/reverse?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`
        )
        .then(res => {
          if (res.data.results[0] === undefined) return;

          const {
            street,
            adminArea3,
            postalCode,
            adminArea5
          } = res.data.results[0].locations[0];
          this.setState({
            ...this.state,
            lng,
            lat,
            street,
            state: adminArea3,
            zip: postalCode,
            city: adminArea5,
            location: `${street} ${adminArea5}`
          });
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
        <div>
          <div className="dashboard container">
            <div className="project-main-home-nav">
              <div
                style={{
                  position: 'absolute',
                  top: '70px',
                  left: '20px',
                  color: '#fbd800'
                }}
                onClick={() => this.props.history.goBack()}
              >
                <Icon size={54} icon={arrowLeft2} />
              </div>

              {this.state.name ? (
                <h4>{`Construction of ${this.state.name}`}</h4>
              ) : (
                <h4>Projects Details</h4>
              )}

              {this.state.flag ? (
                <span>
                  <button
                    className="btn-det btn waves-effect"
                    onClick={this.handleSubmit}
                  >
                    {this.props.match.params.id === 'create-project'
                      ? 'Save'
                      : 'Update'}
                  </button>
                  {/* <button
                    className="btn-det btn waves-effect"
                    onClick={() => this.props.getThisProject(this.props.id)}
                  >
                    Discard Changes
                  </button> */}
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
              <form className="det-form" onSubmit={e => e.preventDefault()}>
                <div className="input-field">
                  <p
                    htmlFor="name"
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
                    onChange={e => {
                      this.setState({ ...this.state, lat: '', lng: '' });
                      this.handleChange(e);
                    }}
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
                    lat={this.state.lat}
                    lng={this.state.lng}
                    handleMarker={handleMarker}
                    mode={!this.state.flag ? 'view' : 'edit'}
                  />
                </div>
              </form>
            </div>

            <div className="grid">
              <h5>Management</h5>
              <form className="det-form" onSubmit={e => e.preventDefault()}>
                <div className="input-field col s12">
                  <p
                    htmlFor="name"
                    style={{
                      margin: '25px 0 0 0',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    Timing
                  </p>

                  <input
                    disabled={!this.state.flag}
                    type="date"
                    id="estimatestart"
                    name="trip-start"
                    value={this.state.estimatestart}
                    onChange={this.handleChange}
                    style={{ color: 'white', fontWeight: 'bolder' }}
                  />
                </div>
                <div className="input-field col s12">
                  <input
                    disabled={!this.state.flag}
                    type="date"
                    id="estimatend"
                    name="trip-end"
                    value={this.state.estimatend}
                    onChange={this.handleChange}
                    style={{ color: 'white', fontWeight: 'bolder' }}
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
                    type="text"
                    id="spaceUsed"
                    placeholder="Used"
                    // value={this.state.street}
                    required
                    style={{ fontWeight: 'bolder' }}
                    // onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="spaceLimit"
                    placeholder="Available"
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
                    placeholder="Used"
                    disabled
                    style={{ fontWeight: 'bolder' }}
                    type="text"
                    id="userUsed"
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
                    id="userLimit"
                    placeholder="Available"
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
                  <div className="input-field col s12">
                    <p
                      htmlFor="name"
                      style={{
                        margin: '25px 0 0 0',
                        padding: '0',
                        fontSize: '12px'
                      }}
                    >
                      List of Users
                    </p>
                    {this.props.viewUser.map(v => (
                      <p>{v.Name}</p>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="grid">
              <h5>Settings</h5>
              <form className="det-form" onSubmit={e => e.preventDefault()}>
                <div className="input-field col s12">
                  <p
                    htmlFor="name"
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
                    disabled
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
                    value={this.getDate(this.state.createdAt)}
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
                    value={this.getDate(this.state.lastupdate)}
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
                  <span>{this.state.active ? 'Active' : 'Not Active'}</span>
                  <br />
                  <button
                    className="btn-det btn waves-effect"
                    disabled={
                      !this.state.flag &&
                      this.props.match.params.id !== 'create-project'
                    }
                    style={{
                      margin: '15px 25px',
                      fontSize: '10px',
                      padding: '0 5px',
                      width: '80%'
                    }}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        active: !this.state.active
                      });
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
                  <span>{this.state.archive ? 'True' : 'False'}</span>
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
                    Delete Project
                  </span>

                  <br />
                  <button
                    className="btn-det btn waves-effect"
                    style={{
                      margin: '15px 25px',
                      fontSize: '10px',
                      padding: '0 5px',
                      width: '80%'
                    }}
                    onClick={this.handleDeleteProject}
                  >
                    Delete
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
    loading: state.project.loading,
    viewUser: state.project.viewUser
  };
};

export default connect(mapStateToProps, {
  updateProject,
  getThisProject,
  createProject,
  deleteProject
})(ProjectDetailsView);
