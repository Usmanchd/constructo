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
      <ul id="dropdown1" class="dropdown-content">
        {links}
      </ul>
      <nav className="nav-wrapper" style={{ backgroundColor: '#282832' }}>
        <div className="container">
          <Link to="/" className="brand-logo hidden">
            Constructo
          </Link>
          {links}
        </div>
      </nav>
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
