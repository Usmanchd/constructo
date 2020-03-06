import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { getAllUsers } from '../../store/actions/authActions';

function AdminPage({ auth, getAllUsers, users }) {
  getAllUsers();

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <h1 className="center">Admin</h1>
      <h3>List Of All Users</h3>
      {users && <UserList users={users} />}
    </div>
  );
}

const UserList = ({ users }) => (
  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
    {users.map(user => (
      <li key={user.uid} style={{ margin: '10px' }}>
        <div className="card profile1">
          <div className="card-header profileName">
            {user.Name}
            <span className="isVerified">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
              </svg>
            </span>
            <div className="isOnline">
              <small>Online</small>
            </div>
          </div>
          <div className="card-body profileBody">
            <div className="profilePic">
              <img className="avatar" src={user.avatarURL} alt="Username" />
            </div>
            <div className="profileInfo">
              <p>Role: {user.title}</p>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.auth.users
  };
};

export default connect(mapStateToProps, { getAllUsers })(AdminPage);
