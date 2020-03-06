import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import userIcon from '../../assets/user-icon-silhouette.jpg';
import firebase from '../../config/fbConfig';
import FileUploader from 'react-firebase-file-uploader';
import { Icon } from 'react-icons-kit';
import { basic_lock_open } from 'react-icons-kit/linea/basic_lock_open';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    Name: '',
    surname: '',
    title: '',
    phone: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL:
      'https://firebasestorage.googleapis.com/v0/b/abstract-lane-269917.appspot.com/o/images%2Fuser-icon-silhouette.jpg?alt=media&token=71e1f4d0-129b-4d59-a6be-ee6fd99e2a28'
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.signUp(this.state);
  };

  //firebase file uploader

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="mycontainer">
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',

              margin: '15px'
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                color: '#fbd800'
                // margin: 'auto'
              }}
            >
              <Icon size={'100%'} icon={basic_lock_open} />
            </div>
            <span style={{ color: 'white', margin: '0 15px' }}>
              <span style={{ fontSize: '30px' }}>Sign Up</span>
              <br />
              <span>dummy text</span>
            </span>
          </div>
          <form onSubmit={this.handleSubmit} style={{ width: '480px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '0 10px', width: '100%' }}>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="Name"> Name</label>
                  <input type="text" id="Name" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Last Name</label>
                  <input
                    type="text"
                    id="surname"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div style={{ margin: '0 10px', width: '100%' }}>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" onChange={this.handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    src={this.state.avatarURL}
                    // htmlFor="image"
                    style={{
                      width: '90px',
                      height: '90px',

                      margin: '0 auto'
                    }}
                    alt="userIcon"
                  />

                  {/* <input
                    type="file"
                    id="image"
                    onChange={this.handleChange}
                    style={{ width: '200px' }}
                  /> */}
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    style={{ width: '200px' }}
                  />
                </div>
              </div>
            </div>
            <div className="input-field">
              <button className="btn mybtn1 transparent lighten-1 z-depth-0">
                Sign Up
              </button>
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
