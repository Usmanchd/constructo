import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import userIcon from '../../assets/user-icon-silhouette.jpg';
import firebase from '../../config/fbConfig';
import FileUploader from 'react-firebase-file-uploader';
import { Icon } from 'react-icons-kit';
import { basic_lock_open } from 'react-icons-kit/linea/basic_lock_open';
import { basic_upload } from 'react-icons-kit/linea/basic_upload';
import ClipLoader from 'react-spinners/ClipLoader';
import BarLoader from 'react-spinners/BarLoader';

class SignUp extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.authError !== this.props.authError) {
  //     this.setState({ loading: false });
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (state.loading) return { loading: false };
  }

  state = {
    email: this.props.tempEP !== undefined ? this.props.tempEP.email : '',
    password: this.props.tempEP !== undefined ? this.props.tempEP.password : '',
    Name: '',
    surname: '',
    title: '',
    phone: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    loading: false,
    avatarURL:
      'https://firebasestorage.googleapis.com/v0/b/abstract-lane-269917.appspot.com/o/images%2Fuser-icon-silhouette.jpg?alt=media&token=71e1f4d0-129b-4d59-a6be-ee6fd99e2a28'
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // this.setState({ loading: true });
    console.log(this.state);
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
    this.setState({ avatar: filename, progress: 100 });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
    setTimeout(() => {
      this.setState({ isUploading: false });
    }, 1000);
  };

  render() {
    const { auth, authError, tempEP } = this.props;
    console.log(tempEP);
    if (auth.uid) return <Redirect to="/" />;

    if (authError === 'Email Already Exists' || tempEP === undefined)
      return <Redirect to="/signup" />;
    return (
      <div className="mycontainer1">
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
              <span>Registrace do Constructo webové aplikace</span>
            </span>
          </div>
          <form onSubmit={this.handleSubmit} style={{ width: '480px' }}>
            <div className="form-ele">
              <div style={{ margin: '0 10px', width: '100%' }}>
                <div className="input-field">
                  <label htmlFor="Name"> Name</label>
                  <input type="text" id="Name" onChange={this.handleChange} />
                  <p className="label-low">Your Name</p>
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Last Name</label>
                  <input
                    type="text"
                    id="surname"
                    onChange={this.handleChange}
                  />
                  <p className="label-low">Your Last name</p>
                </div>
              </div>
              <div style={{ margin: '0 10px', width: '100%' }}>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange} />
                  <p className="label-low">Your Title</p>
                </div>
                <div className="input-field">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" onChange={this.handleChange} />
                  <p className="label-low">Your phone number</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.isUploading ? (
                <ClipLoader
                  size={120}
                  //size={"150px"} this also works
                  css={{ margin: '0 auto' }}
                  color={'#fbd800'}
                  loading={this.state.isUploading}
                />
              ) : (
                <React.Fragment>
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
                  <label>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        color: '#fbd800',
                        margin: '2px auto'
                      }}
                    >
                      <Icon size={'100%'} icon={basic_upload} />
                    </div>
                    <FileUploader
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                      style={{ width: '200px', display: 'none' }}
                    />
                    <p className="label-low" style={{ textAlign: 'center' }}>
                      Upload Your Image
                    </p>
                  </label>
                </React.Fragment>
              )}
            </div>

            {this.state.loading ? (
              <BarLoader
                size={150}
                css={{ margin: '10px 155px' }}
                //size={"150px"} this also works
                color={'#fbd800'}
                loading={this.state.loading}
              />
            ) : (
              <div className="input-field">
                <button className="btn mybtn1 transparent lighten-1 z-depth-0">
                  Sign Up
                </button>
                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    tempEP: state.auth.tempEP
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
