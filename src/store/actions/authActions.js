export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(loading());
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
        dispatch(end_loading());
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
        dispatch(end_loading());
        setTimeout(() => dispatch({ type: 'REMOVE_ERR' }), 2000);
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(loading());
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
        dispatch(end_loading());
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(loading());
    const firebase = getFirebase();
    const firestore = getFirestore();

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
        dispatch(end_loading());
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
        dispatch(end_loading());
        setTimeout(() => dispatch({ type: 'REMOVE_ERR' }), 2000);
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

export const loading = () => (dispatch, getState, { getFirestore }) => {
  dispatch({ type: 'LOADING' });
};
export const end_loading = () => (dispatch, getState, { getFirestore }) => {
  dispatch({ type: 'END_LOADING' });
};

export const handleTempEP = temp => (dispatch, getState, { getFirestore }) => {
  const { email, password } = temp;
  if (email === '' || password === '' || password.length <= 5) {
    let err = { message: 'Password Must be 6 characters Long' };
    dispatch({ type: 'SIGNUP_ERROR', err });
    setTimeout(() => dispatch({ type: 'REMOVE_ERR' }), 2000);
  } else {
    try {
      dispatch(loading());
      const firestore = getFirestore();
      firestore
        .collection('users')
        .get()
        .then(_users => {
          const users = _users.docs.map(doc => doc.data());
          const user = users.filter(_u => _u.email === email);
      
          if (user.length === 0) dispatch({ type: 'TEMP_E_P', payload: temp });
          else {
            let err = { message: 'Email Already Exists' };
            dispatch({ type: 'SIGNUP_ERROR', err });
          }
          dispatch(end_loading());
          setTimeout(() => dispatch({ type: 'REMOVE_ERR' }), 2000);
        });
    } catch (error) {}
  }
};
