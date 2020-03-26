import React, { Component } from 'react';

import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'react-icons-kit';
import { location } from 'react-icons-kit/icomoon/location';
import firebase from './config/fbConfig';

const Marker = ({ text }) => (
  <div style={{ width: 24, height: 24, color: 'red' }}>
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

    const loc = this.props.location || 'New York';
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${loc}`
      )
      .then(res => {
        const { lat, lng } = res.data.results[0].locations[0].latLng;
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
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.location === '' &&
      (nextProps.lat === '' || nextProps.lng === '')
    )
      return;
    else if (nextProps.location === '') {
      console.log(nextProps);
      this.setState({
        ...this.state,
        // center: { lat, lng },
        loading: false,
        lat: nextProps.lat,
        lng: nextProps.lng
      });
      return;
    } else if (nextProps.lat) {
      console.log(nextProps);
      this.setState({
        ...this.state,
        // center: { lat, lng },
        loading: false,
        lat: nextProps.lat,
        lng: nextProps.lng
      });
      return;
    } else if (this.props.location === nextProps.location) {
      this.setState({
        ...this.state,
        // center: { lat, lng },
        loading: false,
        lat: nextProps.lat,
        lng: nextProps.lng
      });
      return;
    }
    const loc = nextProps.location;
    console.log(loc);
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${loc}`
      )
      .then(res => {
        if (res.data.results[0] == undefined) return;
        const { lat, lng } = res.data.results[0].locations[0].latLng;
        console.log(lat, lng);
        this.setState({
          ...this.state,
          center: { lat, lng },
          loading: false,
          lat,
          lng
        });
        console.log(this.state);
      });
  };

  state = {
    lng: null,
    lat: null,
    center: {
      lat: 59.955413,
      lng: 30.337844
    },
    zoom: 14,
    loading: false,
    key: null,
    location: this.props.location || ''
  };

  render() {
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
              key: process.env.GOOGLE_MAP_KEY || this.state.key
            }}
            defaultCenter={this.state.center}
            center={this.state.center}
            defaultZoom={this.state.zoom}
            onClick={({ lat, lng }) => this.props.handleMarker(lat, lng)}
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
