export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(newUser);
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            ID: resp.user.uid,
            Name: newUser.Name,
            surName: newUser.surname,
            initials: newUser.Name[0] + newUser.surname[0],
            title: newUser.title,
            phone: newUser.phone,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
            deleted: false,
            createdAt: Date.now()
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const getAllUsers = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore
    .collection('users')
    .get()
    .then(_users => {
      const users = _users.docs.map(doc => doc.data());
      dispatch({ type: 'GET_ALL_USERS', payload: users });
    });
};
