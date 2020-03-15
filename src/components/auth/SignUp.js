import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleTempEP } from '../../store/actions/authActions';
import { Icon } from 'react-icons-kit';
import { basic_lock_open } from 'react-icons-kit/linea/basic_lock_open';

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.props.handleTempEP(this.state);
    this.props.history.push('/forward');
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
              <span>
                Registrace do Constructo <br />
                webové aplikace
              </span>
            </span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                required
              />
              <p className="label-low">Váš registrační email</p>
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
                required
                minLength="6"
              />
              <p className="label-low">Vaše silné heslo</p>
            </div>
            <div className="input-field">
              <button
                className="btn mybtn transparent lighten-2 z-depth-0"
                onClick
              >
                Next
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
    handleTempEP: creds => dispatch(handleTempEP(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
