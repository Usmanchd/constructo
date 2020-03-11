import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import './signin.css';
import { Icon } from 'react-icons-kit';
import { basic_lock_open } from 'react-icons-kit/linea/basic_lock_open';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
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
              <span style={{ fontSize: '30px' }}>Sign In</span>
              <br />
              <span>Sign in the Constructo web app</span>
            </span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
              <p className="label-low">Your Login email</p>
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
              <p className="label-low"> Your Login password</p>
            </div>
            <div className="input-field">
              <button className="btn mybtn transparent lighten-2 z-depth-0">
                Login
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
