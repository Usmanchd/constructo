import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import './navbar.css';

const Navbar = props => {
  const { auth, profile } = props;

  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <React.Fragment>
      {/* <ul id="dropdown1" class="dropdown-content">
        {links}
      </ul>
      <nav className="nav-wrapper" style={{ backgroundColor: '#282832' }}>
        <div className="container">
          <Link to="/" className="brand-logo hidden">
            Constructo
          </Link>
          {links}
        </div>
      </nav> */}
      <div className="nav">
        <Link to="/" className="brand-logo">
          <h5>Constructo</h5>
        </Link>
        <label for="show-menu" class="show-menu">
          Show Menu
        </label>
        <input type="checkbox" id="show-menu" role="button" />
        {links}
        {/* <ul className="menu">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About ￬</a>
            <ul class="hidden">
              <li>
                <a href="#">Who We Are</a>
              </li>
              <li>
                <a href="#">What We Do</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Portfolio ￬</a>
            <ul class="hidden">
              <li>
                <a href="#">Photography</a>
              </li>
              <li>
                <a href="#">Web & User Interface Design</a>
              </li>
              <li>
                <a href="#">Illustration</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
