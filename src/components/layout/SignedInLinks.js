import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import * as ROUTES from '../../constants/routes';

const SignedInLinks = props => {
  return (
    <ul className="menu">
      <li>
        <NavLink to="/list">Projects</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
      </li>
      <li>
        <a onClick={props.signOut}>Log Out</a>
      </li>
      <li>
        <NavLink to={ROUTES.ACCOUNT}>{props.profile.initials}</NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
