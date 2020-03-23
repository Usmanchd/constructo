import React, { Component } from 'react';

import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'react-icons-kit';
import { location } from 'react-icons-kit/icomoon/location';
import firebase from './config/fbConfig';

const Marker = ({ text }) => (
  <div style={{ width: 24, height: 24 }}>
    <Icon
      size={'100%'}
      icon={location}
      style={{ position: 'relative', top: '-22px', right: '13px' }}
    />
  </div>
);

class Map extends Component {
  componentWillMount = () => {
    const remoteConfig = firebase.remoteConfig();

    const key = remoteConfig.getValue('GOOGLE_MAP_KEY');

    const loc = this.props.location || 'Lahore';
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=7df9f26d51b54e36816ec50664d587c7`
      )
      .then(res => {
        const { lat, lng } = res.data.results[0].geometry;
        console.log(lat, lng);
        this.setState({
          ...this.state,
          center: { lat, lng },
          loading: false,
          lat,
          lng,
          key: key._value
        });
      });
  };
  componentWillUpdate = prevProps => {
    if (this.props.location === prevProps.location) return;
    const loc = this.props.location;
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=7df9f26d51b54e36816ec50664d587c7`
      )
      .then(res => {
        if (res.data.results[0] == undefined) return;
        const { lat, lng } = res.data.results[0].geometry;

        this.setState({
          ...this.state,
          center: { lat, lng },
          loading: false,
          lat,
          lng
        });
      });
  };

  state = {
    lng: null,
    lat: null,
    center: {
      lat: 59.955413,
      lng: 30.337844
    },
    zoom: 10,
    loading: false,
    key: null,
    location: this.props.location || ''
  };

  render() {
    const handleMarker = (lat, lng) => {
      if (this.props.mode !== 'view')
        this.setState({ ...this.state, lng, lat });
    };
    const mapOptions = {
      fullscreenControl: false
    };

    return (
      <div style={{ height: '280px', width: '100%' }}>
        {this.state.loading || this.state.key === null ? (
          'loading'
        ) : (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: this.state.key
            }}
            defaultCenter={this.state.center}
            center={this.state.center}
            defaultZoom={this.state.zoom}
            onClick={({ lat, lng }) => handleMarker(lat, lng)}
            options={mapOptions}
          >
            <Marker
              lat={this.state.lat}
              lng={this.state.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        )}
      </div>
    );
  }
}
export default Map;
