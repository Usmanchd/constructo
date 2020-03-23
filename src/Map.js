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

    this.setState({ ...this.state, key: key._value });

    const loc = '30 W 26th St, New York, NY 10010, United States';
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=7df9f26d51b54e36816ec50664d587c7`
      )
      .then(res => {
        const { lat, lng } = res.data.results[0].geometry;
        console.log(lat, lng);
        this.setState({ ...this.state, center: { lat, lng }, loading: false });
      });
  };
  state = {
    lng: null,
    lat: null,
    center: {
      lat: 37.7699298,
      lng: -122.4469157
    },
    zoom: 15,
    loading: true,
    key: null
  };

  render() {
    const handleMarker = (lat, lng) => {
      this.setState({ ...this.state, lng, lat });
    };

    return (
      <div style={{ height: '240px', width: '340px' }}>
        {this.state.loading || this.state.key === null ? (
          'loading'
        ) : (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: this.state.key
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onClick={({ lat, lng }) => handleMarker(lat, lng)}
          >
            <Marker
              lat={this.state.lat || 59.955413}
              lng={this.state.lng || 30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        )}
      </div>
    );
  }
}
export default Map;
